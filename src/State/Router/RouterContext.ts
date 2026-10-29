import { createContext } from 'react';

export interface RouterContextProps {
  /** The vehicle that is open, from the hash or the path */
  id?: string;
  /** The query string in the address bar, without `?` */
  search: string;
  /** Link to a vehicle; undefined when routing is `none` */
  itemHref: (id: string) => string | undefined;
  /** Link back to the search from a vehicle; undefined when there is none */
  searchHref?: string;
  /** Click handler for the links above: same-site path links open without a reload */
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  /** Writes the search filters to the address bar when routing.syncUrl is on */
  writeSearch: (params: URLSearchParams, replace?: boolean) => void;
}

export const RouterContext = createContext<RouterContextProps>({
  search: '',
  itemHref: () => undefined,
  onLinkClick: () => undefined,
  writeSearch: () => undefined,
});
