import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSettings from '../Settings/useSettings';
import { RouterContext, RouterContextProps } from './RouterContext';

// Any UUID version: ads from the public API have UUID v7 ids.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const snapshot = () => ({
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
});

/** A hash that is not a vehicle id (`#content` from a skip link) leaves the search showing. */
const idFromHash = (hash: string) => {
  const value = hash.slice(1);
  return UUID.test(value) ? value : undefined;
};

/** The vehicle id is a whole path segment, so a slug after it (`/<id>/volvo-v60`) is fine. */
const idFromPath = (pathname: string) =>
  pathname
    .split('/')
    .filter((s) => UUID.test(s))
    .pop();

interface RouterProviderProps {
  children: React.ReactNode;
}

const RouterProvider = ({ children }: RouterProviderProps) => {
  const { routing } = useSettings();
  const [location, setLocation] = useState(snapshot);

  useEffect(() => {
    const update = () => setLocation(snapshot());
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);

  // Resolved once, from the page the components were mounted on, like a relative link.
  const base = useMemo(
    () =>
      routing.mode === 'path' && routing.basePath
        ? new URL(routing.basePath.replace(/\/+$/, ''), window.location.href)
        : undefined,
    [routing.mode, routing.basePath]
  );

  const id =
    routing.mode === 'hash'
      ? idFromHash(location.hash)
      : routing.mode === 'path'
        ? idFromPath(location.pathname)
        : undefined;

  const itemHref = useCallback(
    (itemId: string) => {
      if (routing.mode === 'hash') return `#${itemId}`;
      if (base) {
        return base.origin === window.location.origin
          ? `${base.pathname}/${itemId}`
          : `${base.href}/${itemId}`;
      }
      return undefined;
    },
    [routing.mode, base]
  );

  const onLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // A new tab, a hash or another site: the browser does it.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (href.startsWith('#')) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();
    history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
    setLocation(snapshot());
  }, []);

  const writeSearch = useCallback(
    (params: URLSearchParams, replace?: boolean) => {
      if (!routing.syncUrl) return;
      const query = params.toString();
      const next = query ? `?${query}` : '';
      if (next === window.location.search) return;
      const url = `${window.location.pathname}${next}${window.location.hash}`;
      if (replace) {
        history.replaceState(history.state, '', url);
      } else {
        history.pushState(null, '', url);
      }
      setLocation(snapshot());
    },
    [routing.syncUrl]
  );

  const value = useMemo<RouterContextProps>(
    () => ({
      id,
      search: location.search.replace(/^\?/, ''),
      itemHref,
      // Hash routing keeps the search on the same page: an empty hash goes back to it
      // without a reload, and the filters in the query string stay.
      searchHref: routing.mode === 'hash' ? '#' : undefined,
      onLinkClick,
      writeSearch,
    }),
    [id, location, itemHref, onLinkClick, writeSearch, routing.mode]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export default RouterProvider;
