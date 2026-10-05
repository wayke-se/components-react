# Components React

> This repository contains components for search and items to use on external websites.

## Notes

* Starting from version `2.0.0` and above will require import of `@wayke-se/components-react/dist/assets/default.css` in order to apply basic styling to the gallery.

## Usage

Install
```bash
npm install @wayke-se/components-react
```

Install peer dependencies
```bash
npm install react react-dom styled-components
```

Install the ecom stylesheet (optional, only if you use `ecomSettings`, see [Ecom theme](#ecom-theme))
```bash
npm install @wayke-se/ecom-web
```

```javascript
import React from 'react';
import WaykeComposite, { WaykeProviderSettings } from '@wayke-se/components-react'
import '@wayke-se/components-react/dist/assets/default.css';
// Optional, only if you use ecomSettings
import '@wayke-se/ecom-web/dist/index.css';

const ProviderSettings: WaykeProviderSettings = {
  graphQlUrl: "https://gql.wayketech.se/query",
  url: "https://api.wayketech.se/vehicles",
  urlMlt: "https://api.wayketech.se/vehicles-mlt-ext",
  ecomSettings: {
    url: "OPTIONAL_ECOM_URL",
  },
  googleMapsApiKey: "OPTIONAL_GOOGLE_MAPS_STATIC_API_KEY",
}

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
  />
);
```

### Environments for test
```javascript
const ProviderSettings: WaykeProviderSettings = {
  graphQlUrl: "https://gql.wayketech.se/query",
  url: "https://api.wayketech.se/vehicles",
  urlMlt: "https://api.wayketech.se/vehicles-mlt-ext",
  ecomSettings: {
    url: "https://ecom.wayketech.se",
  },
}
```

### Environments for production
```javascript
const ProviderSettings: WaykeProviderSettings = {
  graphQlUrl: "https://gql.wayke.se/query",
  url: "https://api.wayke.se/vehicles",
  urlMlt: "https://api.wayke.se/vehicles-mlt-ext",
  ecomSettings: {
    url: "https://ecom.wayke.se",
  },
}
```


### WaykeComposite uses hash-route, i want to use path-route

In this case you need to make sure that you are in control of the routing, if the user reloads the page, where same html file is
served for `/your/path/to/this/component` and `/your/path/to/this/component/00000000-0000-0000-0000-000000000000`.

Examples given the application is located in `/search/vehicles`:

1) pathRoute is `/search/vehicles` => `//yoursite.com/search/vehicles/00000000-0000-0000-0000-000000000000`
2) pathRoute is `/item` => `//yoursite.com/item/00000000-0000-0000-0000-000000000000`
3) pathRoute is `/a/b` => `//yoursite.com/a/b/00000000-0000-0000-0000-000000000000`
4) pathRoute is `item` => `//yoursite.com/search/item/00000000-0000-0000-0000-000000000000`
5) pathRoute is `a/b` => `//yoursite.com/search/a/b/00000000-0000-0000-0000-000000000000`
6) pathRoute is `https://www.wayke.se/objekt` => `https://www.wayke.se/objekt/00000000-0000-0000-0000-000000000000`

The id is appended with a `/`, so `pathRoute` should not end with a slash.

```javascript
import React from 'react';
import WaykeComposite from '@wayke-se/components-react'
import '@wayke-se/components-react/dist/assets/default.css';
// Optional, only if you use ecomSettings
import '@wayke-se/ecom-web/dist/index.css';

const App = () => (
  <WaykeComposite
    composite={{
      // ...other composite props
      pathRoute: "/your/path/to/this/component"
    }}
    provider={ProviderSettings}
  />
);
```

### I only want to use the search component

It's recomended to place WaykeProvider close to app-root in order to keep the cache

```javascript
import React, { useCallback } from 'react';
import { WaykeProvider, WaykeSearch } from '@wayke-se/components-react'

const App = () => {
  const onClickSearchItem = useCallback((data) => {
    console.log(data.id, data.branchId, data.branchName);
  }, []);

  return (
    <WaykeProvider {...ProviderSettings}>
      <WaykeSearch onClickSearchItem={onClickSearchItem} />
    </WaykeProvider>
  );
};
```

If neither `hashRoute` nor `pathRoute` is set, the vehicle cards are not links. Use `onClickSearchItem` to handle navigation to the vehicle yourself.

### I only want to use the Search Item component

It's recomended to place WaykeItemProvider close to app-root in order to keep the cache

```javascript
import React, { useCallback } from 'react';
import { WaykeItemProvider, WaykeSearchItem } from '@wayke-se/components-react'
import '@wayke-se/components-react/dist/assets/default.css';
// Optional, only if you use ecomSettings
import '@wayke-se/ecom-web/dist/index.css';

const App = ({}) => {
  const id = 'd01f79a3-7552-49c4-9d4d-deb3aa581c31';

  // Optional, triggered when a related vehicle is clicked
  const onClickSearchItem = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <WaykeItemProvider {...ProviderSettings}>
      <WaykeSearchItem id={id} onClickSearchItem={onClickSearchItem} />
    </WaykeItemProvider>
  );
};
```

### I want to use the components on a site that doesn't use React

The components are built with React, but they can be mounted into any element on any website. React is then bundled with your JavaScript, which adds to the loading time of the site.

You need a bundler (for example webpack, esbuild, Rollup or Vite) that can bundle the JavaScript and the imported CSS files.

Install the package and its peer dependencies
```bash
npm install @wayke-se/components-react react react-dom styled-components
# Optional, only if you use ecomSettings
npm install @wayke-se/ecom-web
```

Add an element where the components should be rendered
```html
<div id="wayke-components"></div>
<script src="your-bundle.js"></script>
```

Mount the component into the element. `createElement` is used instead of JSX, so no JSX transform is needed.
```javascript
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import WaykeComposite from '@wayke-se/components-react';
import '@wayke-se/components-react/dist/assets/default.css';
// Optional, only if you use ecomSettings
import '@wayke-se/ecom-web/dist/index.css';

const settings = {
  provider: ProviderSettings,
  composite: {
    modifyDocumentTitleItem: true,
  },
};

const container = document.getElementById('wayke-components');
createRoot(container).render(createElement(WaykeComposite, settings));
```

`WaykeComposite` uses hash routing by default, so it works on a single page without any server configuration. See [path-route](#waykecomposite-uses-hash-route-i-want-to-use-path-route) if you want to use path routing instead.

## Components

### WaykeComposite
| Property          | Type                   | Required |
|-------------------|------------------------|----------|
| provider          | WaykeProviderSettings  | true     |
| composite         | WaykeCompositeProps    | false    |

`WaykeComposite` shows `WaykeSearch` and switches to `WaykeSearchItem` when a vehicle id is found in the url. It uses hash routing unless `composite.pathRoute` is set.

### WaykeSearchItem
| Property                 | Type       | Required | Value                |
|--------------------------|------------|----------|----------------------|
| id                       | string     | true     |                      |
| marketCode               | MarketCode | false    | SE \| NO             |
| pathRoute                | string     | false    |                      |
| hashRoute                | boolean    | false    |                      |
| disableResetScrollOnInit | boolean    | false    |                      |
| placeholderImage         | string     | false    |                      |
| onClickSearchItem        | function   | false    | (id: string) => void |
| modifyDocumentTitleItem  | boolean    | false    |                      |
| displayBranchName        | boolean    | false    |                      |

* Required
  * `id` - Guid that represents a vehicle.
* Optional
  * `marketCode` - Set the language, available options are SE and NO, default to SE.
  * `pathRoute` - If set, then if a item is clicked it will use the provided url and append the guid. Supports both relative and absolute.
  * `hashRoute` - If set to true, then if a item is clicked it will append #guid to the url (is not used if `pathRoute` is set).
  * `disableResetScrollOnInit` - Loading the item page resets the scroll, here it's possible to disable it.
  * `placeholderImage` - Provide custom placeholder image when image is missing.
  * `onClickSearchItem` - Function that will be triggered when a related vehicle is clicked.
  * `modifyDocumentTitleItem` - Update document title with vehicle data (registration number, title and short description).
  * `displayBranchName` - Displays branch name on related product cards and using branch name in presentation of where the vehicle exist

### WaykeSearch
| Property                  | Type                      | Values                    |
|---------------------------|---------------------------|---------------------------|
| marketCode                | MarketCode                | SE \| NO                  |
| pathRoute                 | string                    |                           |
| hashRoute                 | boolean                   |                           |
| filterList                | SearchFilterTypes[]       |                           |
| initialQueryParams        | URLSearchParams or string | query, manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price.min, price.max, mileage.min, mileage.max, odometerValueAsKm.min, odometerValueAsKm.max, modelYear.min, modelYear.max, leasingPrice.min, leasingPrice.max, businessLeasingPrice.min, businessLeasingPrice.max, sort, hits |
| removeSearchBar           | boolean                   |                           |
| removeFilterOptions       | boolean                   |                           |
| placeholderImage          | string                    |                           |
| onClickSearchItem         | function                  | (data: { id: string, branchId?: string, branchName?: string }) => void |
| modifyDocumentTitleSearch | string                    |                           |
| displayBranchName         | boolean                   |                           |

* Optional
  * `marketCode` - Set the language, available options are SE and NO, default to SE.
  * `pathRoute` - If set, then if a item is clicked it will use the provided url and append the guid. Supports both relative and absolute.
  * `hashRoute` - If set to true, then if a item is clicked it will append #guid to the url (is not used if `pathRoute` is set).
  * `filterList` - Select which filters should be visible and in which order. See [SearchFilterTypes](#searchfiltertypes) for available filters. If not set, all filters are shown (see [Notes on MarketCode](#notes-on-marketcode)).
  * `initialQueryParams` - Set the default filter that should be applied upon init. The parameters are passed on to the search API. `hits` defaults to `30` and `sort` to `published-desc`.
  * `removeSearchBar` - Removes search bar.
  * `removeFilterOptions` - Removes filter options.
  * `placeholderImage` - Provide custom placeholder image when image is missing.
  * `onClickSearchItem` - Function that will be triggered when a vehicle is clicked.
  * `modifyDocumentTitleSearch` - Set custom document title
  * `displayBranchName` - Displays branch name on product cards

### Notes on MarketCode
`marketCode` defines what language that will be used, `SE` - Swedish (default) or `NO` - Norwegian. Other things that `marketCode` will affect:
- If no `filterList` is set, `SE` will exclude the filter `odometerValueAsKm` and instead use `mileage`, while `NO` will do the opposite. The difference between the two filters is the unit used. For `odometerValueAsKm` the unit is kilometer, while `mileage` is kilometer/10 (Scandinavian miles).
- The language is set once, by the first component that is rendered.


## Types

### WaykeCompositeProps
WaykeSearchItem & WaykeSearch combined without `id`. `hashRoute` and `onClickSearchItem` are deprecated and have no effect, since `WaykeComposite` handles routing itself. Subscribe to the `ItemClicked` event with [WaykePubSub](#subscribe-to-events) to know when a vehicle is clicked.

### WaykeProviderSettings
| Property              | Type         | Required |
|-----------------------|--------------|----------|
| url                   | string       | true     |
| urlMlt                | string       | false    |
| graphQlUrl            | string       | true     |
| apiKey                | string       | false    |
| googleMapsApiKey      | string       | false    |
| googleMapsMarker      | string       | false    |
| ecomSettings          | EcomSettings | false    |
| useQueryParamsFromUrl | boolean      | false    |
| pathRoute             | string       | false    |

* Required
  * `url` - Url to Wayke ext-api.
  * `graphQlUrl` - Url to the GraphQl endpoint.
* Optional
  * `urlMlt` - Url to Wayke ext-api for related vehicles. Used when displaying related vehicles for a given vehicle. If not provided `url` will be used, but then the latest added vehicles are shown instead of related vehicles.
  * `apiKey` - Sent as `x-api-key` to Wayke ext-api. If no api key is provided, then the origin of the request is used as api key.
  * `googleMapsApiKey` - Provide a Google Maps Static API key. The vehicle page shows a button for the map. With a `googleMapsApiKey` the button shows a static map, otherwise it opens Google Maps in another tab.
  * `googleMapsMarker` - Url to a custom map marker for the static map.
  * `ecomSettings` - Enables ecom.
  * `useQueryParamsFromUrl` - Reading/writing query strings from/to the url. If true and `initialQueryParams` also exist, then each value in `initialQueryParams` is added unless the url already contains the same key with the same value.
  * `pathRoute` - Used with `useQueryParamsFromUrl`. When the search query is written to the url, the part of the path from `pathRoute` and onwards is removed. `WaykeComposite` does not pass `composite.pathRoute` on, so set it here as well.

### EcomSettings
| Property           | Type         | Required |
|--------------------|--------------|----------|
| url                | string       | true     |
| useBankId          | boolean      | false    |
| displayBankIdAlert | boolean      | false    |
| serviceLogotypeUrl | string       | false    |
| bankIdThumbprint   | string       | false    |

* Required
  * `url` - Wayke ecom url.
* Optional
  * `useBankId`: Deprecated, not used since 3.0.0.
  * `displayBankIdAlert`: Deprecated, not used since 3.0.0.
  * `serviceLogotypeUrl`: Url to the logo shown in ecom. By default the manufacturers logo will be used. Use a url to an image file, a `data:` url is not supported.
  * `bankIdThumbprint`: Custom BankID certificate thumbprint.

> For more information about ecom see https://github.com/wayke-se/wayke-ecom-web.

### WaykeItemProviderSettings
| Property              | Type         | Required |
|-----------------------|--------------|----------|
| url                   | string       | true     |
| urlMlt                | string       | false    |
| graphQlUrl            | string       | true     |
| apiKey                | string       | false    |
| googleMapsApiKey      | string       | false    |
| googleMapsMarker      | string       | false    |
| ecomSettings          | EcomSettings | false    |

* Required
  * `url` - Url to Wayke ext-api.
  * `graphQlUrl` - Url to the GraphQl endpoint.
* Optional
  * `urlMlt` - Url to Wayke ext-api for related vehicles. Used when displaying related vehicles for a given vehicle. If not provided `url` will be used, but then the latest added vehicles are shown instead of related vehicles.
  * `apiKey` - Sent as `x-api-key` to Wayke ext-api. If no api key is provided, then the origin of the request is used as api key.
  * `googleMapsApiKey` - Provide a Google Maps Static API key. The vehicle page shows a button for the map. With a `googleMapsApiKey` the button shows a static map, otherwise it opens Google Maps in another tab.
  * `googleMapsMarker` - Url to a custom map marker for the static map.
  * `ecomSettings` - Enables ecom.

### SearchFilterTypes
| Property    | Type                  | Required | Values                                                                                                                                         |
|-------------|-----------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| filterName  | SearchFilterNameTypes | true     | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, odometerValueAsKm, modelYear, leasingPrice, businessLeasingPrice |
| displayName | string                | false    |                                                                                                                                                |

* `displayName` - Override the default translation of the filter title.

### Set initial query filter
```javascript
import WaykeComposite from '@wayke-se/components-react'

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('modelYear.min', '2018');
initialQueryParams.append('modelSeries', 'A5');

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
    composite={{
      initialQueryParams,
    }}
  />
)
```

## Custom usage examples

### Select only some of the filters
Order will have effect

```javascript
import WaykeComposite, { SearchFilterTypes } from '@wayke-se/components-react'

const filterList: SearchFilterTypes[] = [
  {
    filterName: 'price',
  },
  {
    filterName: 'modelSeries',
    displayName: 'MODEL SERIES',
  },
];

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
    composite={{
      filterList,
    }}
  />
)
```

## Subscribe to events

```javascript
import { WaykePubSub } from '@wayke-se/components-react';

const event = {
  eventName: 'ItemClicked',
  callback: (data) => console.log('subscribed ItemClicked:', data),
};

WaykePubSub.subscribe(event);
WaykePubSub.unsubscribe(event);
```

| Method       | Arguments                                                      |
|--------------|----------------------------------------------------------------|
| subscribe    | event: EventType                                               |
| unsubscribe  | event: EventType (the same object that was passed to `subscribe`) |
| publish      | eventName: EventNames, data                                    |

### EventType
| eventName             | callback                  | Data                                                                                                                            |
|-----------------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| HashRouteChange       | (data) => void            | CallbackHashRouteChangeData                                                                                                     |
| ItemClicked           | (data) => void            | CallbackItemData                                                                                                                |
| Ecom                  | (data) => void            | CallbackEcomData                                                                                                                |
| ImagesClick           | (data) => void            | CallbackItemData                                                                                                                |
| OptionsClick          | (data) => void            | CallbackItemData                                                                                                                |
| PhonenumberVisible    | (data) => void            | CallbackItemData                                                                                                                |
| PhonenumberCall       | (data) => void            | CallbackItemData                                                                                                                |
| MailVisible           | (data) => void            | CallbackItemData                                                                                                                |
| MailClick             | (data) => void            | CallbackItemData                                                                                                                |
| InsuranceInterest     | (data) => void            | CallbackItemData                                                                                                                |
| InsuranceOpen         | (data) => void            | CallbackItemData                                                                                                                |
| InsuranceClose        | (data) => void            | CallbackItemData                                                                                                                |
| FinanceInterest       | (data) => void            | CallbackItemData                                                                                                                |
| FinanceOpen           | (data) => void            | CallbackItemData                                                                                                                |
| FinanceClose          | (data) => void            | CallbackItemData                                                                                                                |
| SearchClearQuery      | (data) => void            | CallbackSearchClearQueryData                                                                                                    |
| SearchClearAllFilters | (data) => void            | CallbackSearchClearAllFiltersQueryData                                                                                          |
| SearchInitiated       | (data) => void            | CallbackSearchInitiatedData                                                                                                     |
| SearchCompleted       | (data) => void            | CallbackSearchCompletedData                                                                                                     |
| Search                | (data) => void            | CallbackSearchData                                                                                                              |
| FilterApply           | (data) => void            | CallbackFilterApplyData                                                                                                         |
| All                   | (eventName, data) => void | CallbackHashRouteChangeData \| CallbackItemData \| CallbackEcomData \| CallbackSearchClearQueryData \| CallbackSearchClearAllFiltersQueryData \| CallbackSearchInitiatedData \| CallbackSearchCompletedData \| CallbackSearchData \| CallbackFilterApplyData |
* `All` - Subscribes to all events.

> The `Callback*Data` names below describe the payloads. They are not exported from the package.

#### CallbackHashRouteChangeData
| Property  | Type                  |
|-----------|-----------------------|
| id        | string \| undefined   |

`id` is `undefined` when the hash is removed.

#### CallbackItemData
| Property      | Type                  |
|---------------|-----------------------|
| id            | string                |
| branchName    | string \| undefined   |
| branchId      | string \| undefined   |

#### CallbackEcomData
| Property      | Type                  |
|---------------|-----------------------|
| id            | string                |
| branchName    | string \| undefined   |
| branchId      | string \| undefined   |
| view          | EcomView              |
| event         | EcomEvent             |
| currentStep   | EcomStep \| undefined |
| data          | any \| undefined      |

`EcomView`, `EcomEvent` and `EcomStep` are exported from `@wayke-se/ecom-web`.

#### CallbackSearchClearQueryData
| Property  | Type             |
|-----------|------------------|
| query     | string \| null   |

#### CallbackSearchClearAllFiltersQueryData
| Property  | Type      |
|-----------|-----------|
| query     | string    |

#### CallbackSearchInitiatedData
| Property  | Type      |
|-----------|-----------|
| query     | string    |

#### CallbackSearchCompletedData
| Property  | Type      |
|-----------|-----------|
| query     | string    |
| hits      | number    |
| totalHits | number    |

#### CallbackSearchData
| Property  | Type      |
|-----------|-----------|
| query     | string    |

#### CallbackFilterApplyData
| Property  | Type                  |
|-----------|-----------------------|
| type      | "checkbox" \| "range" |
| filter    | string                |
| value     | string \| undefined (checkbox only)  |
| checked   | boolean \| undefined (checkbox only) |
| min       | number \| undefined (range only)     |
| max       | number \| undefined (range only)     |

## Theme
It is possible to apply a custom theme using *CSS*. The things that can be styled are:
- Primary brand color
- Secondary brand color
- Accent color
- Font (regular)
- Font (bold)

To style the components, copy the following snippet into your *CSS* file and modify it to your needs.

```css
/* === Color === */

/*
  Primary (background-color)
  Used to add primary background-color to elements. Should also include
  a color for text placed on top of the primary color.
*/
.wayke__theme.wayke__color--primary-bg {
  background-color: #ff5a1c;
  color: #fff;
}

/*
  Primary (text color)
  Used to add primary color to text. Make sure to add the same color as
  in the background-color selector above.
*/
.wayke__theme.wayke__color--primary-text {
  color: #ff5a1c;
}

/*
  Secondary (background-color)
  Used to add secondary background-color to elements. Should also include
  a color for text placed on top of the primary color.
*/
.wayke__theme.wayke__color--secondary-bg {
  background-color: #ebebeb;
  color: #ff5a1c;
}

/*
  Accent (background-color)
  Used to add accent background-color to elements. Should also include
  a color for text placed on top of the primary color.
*/
.wayke__theme.wayke__color--accent-bg {
  background-color: #f8f8f8;
  color: #000;
}

/* === Font === */

/*
  Regular
  This is the regular font used on most text elements. It is recommended
  to use a light (300) or regular (400) font for this type.
*/
.wayke__theme.wayke__font--regular {
  font-family: sans-serif;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.02em;
}

/*
  Bold
  This font will be applied to headings and some other elements using
  the same styling.
*/
.wayke__theme.wayke__font--bold {
  font-family: sans-serif;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.02em;
}
```

...or if you want to use it as Sass (.scss):

```scss
.wayke__theme {
  $c-primary: #ff5a1c;
  $c-primaryText: #fff; // Text placed on top of $c-primary

  &.wayke__color {
    &--primary-bg {
      background-color: $c-primary;
      color: $c-primaryText;
    }

    &--primary-text {
      color: $c-primary;
    }
  }

  &.wayke__font {
    &--regular {
      font-family: sans-serif;
      font-weight: 300;
    }

    &--bold {
      font-family: sans-serif;
      font-weight: 700;
    }
  }
}
```

> **It is highly recommended to *NOT* add or remove any properties defined above in the color selectors**. However, since fonts usually requires more configuration we encourage you to add the necessary font styling required to match your current profile. If you add new properties to the font selectors, please be careful and ensure everything looks as intended before going into production.

### Ecom theme
The ecom JavaScript is bundled with this package, but its stylesheet is not. If you use `ecomSettings`, install `@wayke-se/ecom-web` and import its stylesheet:

```bash
npm install @wayke-se/ecom-web
```

```javascript
import '@wayke-se/ecom-web/dist/index.css';
```

The ecom styles are scoped under `.waykeecom-root` and are built on CSS custom properties prefixed with `--waykeecom-`. To change the ecom colors, override the custom properties in a stylesheet loaded after the ecom stylesheet:

```css
.waykeecom-root {
  --waykeecom--color-primary-main: #ff5a1c;
  --waykeecom--color-primary-alt: #ffe6dc;
  --waykeecom--color-link-main: #ff5a1c;
  --waykeecom--color-action-main: #ff5a1c;
  --waykeecom--color-action-alt: #ffe6dc;
}
```

See `@wayke-se/ecom-web/dist/index.css` for the full list of custom properties.

## Run example from repo
This repository contains an example app in `example/` that uses the components straight from `src/`.

Create an `.env` file in the repository root:
```
WAYKE_SEARCH_URL=https://api.wayketech.se/vehicles
WAYKE_SEARCH_MLT_URL=https://api.wayketech.se/vehicles-mlt-ext
WAYKE_GRAPH_QL_URL=https://gql.wayketech.se/query
WAYKE_ECOM_URL=https://ecom.wayketech.se
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_STATIC_API_KEY
```

* `WAYKE_SEARCH_MLT_URL` - *Optional*. Fetches vehicles related to the current vehicle. If not provided, `WAYKE_SEARCH_URL` is used instead and the latest vehicles are shown.
* `GOOGLE_MAPS_API_KEY` - *Optional*. See `googleMapsApiKey`.

Then run the following from the repository root:
```bash
npm install
npm start
```

The example is served on port `5000`. Set `PORT` to use another port, for example `PORT=5010 npm start`.

The example does not set an `apiKey`, so the origin of the request is used as API key. To use the API key of a specific site, add a host such as `test.com.localhost` to your hosts file:
```
127.0.0.1   test.com.localhost
```
Then open `test.com.localhost:5000`. This changes the origin while still pointing to localhost.

### Available Routes (Independent)

#### WaykeComposite
[http://localhost:5000](http://localhost:5000)

#### WaykeComposite with hash route
[http://localhost:5000/hash](http://localhost:5000/hash)

#### WaykeComposite with path route
[http://localhost:5000/a/b](http://localhost:5000/a/b)

#### WaykeSearch With WaykeProvider
[http://localhost:5000/search](http://localhost:5000/search)

#### WaykeSearchItem With WaykeProvider
[http://localhost:5000/search-item/d01f79a3-7552-49c4-9d4d-deb3aa581c31](http://localhost:5000/search-item/d01f79a3-7552-49c4-9d4d-deb3aa581c31)
