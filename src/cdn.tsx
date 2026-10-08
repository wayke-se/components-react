import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/default.css';
import '@wayke-se/ecom-web/dist/index.css';

import WaykeSearch, { WaykeSearchProps } from './layouts/search';
import WaykeSearchItem, { WaykeSearchItemProps } from './layouts/searchItem';
import WaykeComposite, {
  WaykeCompositeWithProviderProps,
} from './layouts/WaykeCompositeWithProvider';
import WaykeItemProvider, { WaykeItemProviderSettings } from './providers/WaykeItemProvidet';
import WaykeProvider, { WaykeProviderSettings } from './providers/WaykeProvider';
import WaykePubSub from './utils/pubsub/pubsub';

/**
 * Entry point for the CDN build (dist-cdn/index.js). Bundles React and all dependencies so a
 * site can mount the components with a single <script type="module">, without a bundler.
 */

export interface WaykeSearchMountSettings {
  provider: WaykeProviderSettings;
  search?: WaykeSearchProps;
}

export interface WaykeItemMountSettings {
  provider: WaykeItemProviderSettings;
  item: WaykeSearchItemProps;
}

export interface WaykeInstance {
  unmount: () => void;
}

const cssHref = new URL('./index.css', import.meta.url).href;

const hasStylesheet = () =>
  Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')).some(
    (link) => link.href === cssHref
  );

const isCssInjectionDisabled = () =>
  Array.from(document.querySelectorAll<HTMLScriptElement>('script[disablecssinjection]')).some(
    (script) => script.src === import.meta.url
  );

let cssLoaded: Promise<void> | undefined;

// Prepended to <head> so the site's own stylesheets, loaded later, can override the theme.
// Rendering waits for the stylesheet so the components never show unstyled.
const injectCss = () => {
  if (!cssLoaded) {
    cssLoaded =
      hasStylesheet() || isCssInjectionDisabled()
        ? Promise.resolve()
        : new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssHref;
            link.onload = () => resolve();
            link.onerror = () => resolve();
            document.head.prepend(link);
          });
  }
  return cssLoaded;
};

const resolveTarget = (target: string | Element) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) {
    throw new Error(`Wayke: no element matches "${target}"`);
  }
  return element;
};

const render = (target: string | Element, node: React.ReactNode): WaykeInstance => {
  const element = resolveTarget(target);
  let unmounted = false;
  let root: ReturnType<typeof createRoot> | undefined;

  injectCss().then(() => {
    if (!unmounted) {
      root = createRoot(element);
      root.render(node);
    }
  });

  return {
    unmount: () => {
      unmounted = true;
      root?.unmount();
    },
  };
};

export const mount = (target: string | Element, settings: WaykeCompositeWithProviderProps) =>
  render(target, <WaykeComposite {...settings} />);

export const mountSearch = (
  target: string | Element,
  { provider, search }: WaykeSearchMountSettings
) =>
  render(
    target,
    <WaykeProvider {...provider}>
      <WaykeSearch {...search} />
    </WaykeProvider>
  );

export const mountItem = (target: string | Element, { provider, item }: WaykeItemMountSettings) =>
  render(
    target,
    <WaykeItemProvider {...provider}>
      <WaykeSearchItem {...item} />
    </WaykeItemProvider>
  );

export { WaykePubSub };

const WaykeComponents = { mount, mountSearch, mountItem, WaykePubSub };

declare global {
  interface Window {
    WaykeComponents: typeof WaykeComponents;
  }
}

window.WaykeComponents = WaykeComponents;

// Start loading the stylesheet right away instead of waiting for the first mount.
injectCss();
