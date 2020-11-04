# Components React

> This repository contains components for search and items to use on external websites.

## Usage

Install
```bash
npm install @wayke-se/components-react
```

Install peer dependencies
```bash
npm install react react-dom styled-components
```

```javascript
const ProviderSettings: WaykeProviderSettings = {
  graphQlUrl: "https://gql.wayketech.se/query",
  url: "https://test-ext-api.wayketech.se/vehicles",
  ecomSettings: {
    url: "OPTIONAL_ECOM_URL",
  },
  googleMapsApiKey: "OPTIONAL_GOOGLE_MAPS_STATIC_API_KEY",
}
```

```javascript
import React from 'react';
import WaykeComposite from '@wayke-se/components-react'

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
  />
);
```

### WaykeComposite uses hash-route, i want to use path-route

In this case you need to make sure that you are in control of the routing where same html file is 
served for `/your/path/to/this/component` and `/your/path/to/this/component/00000000-0000-0000-0000-000000000000`.

```javascript
import React from 'react';
import { WaykeCompositePath } from '@wayke-se/components-react'

const App = () => (
  <WaykeCompositePath
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
  const onClickSearchItem = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <WaykeProvider {...ProviderSettings}>
      <WaykeSearch onClickSearchItem={onClickSearchItem} />
    </WaykeProvider>
  );
};
```

### I only want to use the Search Item component

It's recomended to place WaykeProvider close to app-root in order to keep the cache

```javascript
import React, { useCallback } from 'react';
import { WaykeProvider, WaykeSearchItem } from '@wayke-se/components-react'

const App = ({}) => {
  const id = 'd01f79a3-7552-49c4-9d4d-deb3aa581c31';

  // Optional, get id when related vehicles are clicked
  const onClickSearchItem = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <WaykeProvider {...ProviderSettings}>
      <WaykeSearchItem id={id} onClickSearchItem={onClickSearchItem} />
    </WaykeProvider>
  );
};
```

## Components

### WaykeComposite
| Property          | Type                   | Required |
|-------------------|------------------------|----------|
| provider          | WaykeProviderSettings  | true     |
| composite         | WaykeSearchSettings    | false    |

### WaykeSearchItem
| Property                 | Type     | Required | Value                |
|--------------------------|----------|----------|----------------------|
| id                       | String   | true     |                      |
| pathRoute                | boolean  | false    |                      |
| hashRoute                | boolean  | false    |                      |
| onClickSearchItem        | Function | false    | (id: string) => void |
| disableResetScrollOnInit | boolean  | false    |                      |
| placeholderImage         | String   | false    |                      |

* `id` - Guid that represents a vehicle.
* `pathRoute` - An *optional* flag. If set to true, then if a item is clicked it will append /guid to the url.
* `hashRoute` - An *optional* flag. If set to true, then if a item is clicked it will append #guid to the url (is not used if `pathRoute` is set).
* `onClickSearchItem` - An *optional* flag. Function that can be provided that will be triggered once a item is clicked.
* `disableResetScrollOnInit` - An *optional* flag. Loading the item page resets the scroll, here it's possible to disable it.
* `placeholderImage` - An *optional* flag. Provide custom placeholder image when image is missing.

### WaykeSearch
| Property                       | Type              | Default                  | Values                                                                                                                                         |
|--------------------------------|-------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| onClickSearchItem              | Function          | undefined                | (id: string) => void                                                                                                                           |
| pathRoute                      | Boolean           | undefined (false)        | Boolean                                                                                                                                        |
| hashRoute                      | Boolean           | undefined (false)        | Boolean                                                                                                                                        |
| filterList                     | String[]          | undefined (all included) | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear |
| initialQueryParams             | URLSearchParams or string  | undefined                | query, manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price.min, price.max, mileage.min, mileage.max, modelYear.min, modelYear.max |
| placeholderImage               | string            | undefined                | String                                                                                                                                         |

* `onClickSearchItem` - An *optional* flag. Function that can be provided that will be triggered once a item is clicked.
* `pathRoute` - An *optional* flag. If set to true, then if a item is clicked it will append /guid to the url.
* `hashRoute` - An *optional* flag. If set to true, then if a item is clicked it will append #guid to the url (is not used if `pathRoute` is set).
* `filterList` - An *optional* flag. Select what filters that should be visible and in whiched order.
* `initialQueryParams` - An *optional* flag. Set the default filter that should be applid upon init.
* `placeholderImage` - An *optional* flag. Provide custom placeholder image when image is missing.

## Types

### WaykeProviderSettings
| Property              | Type         | Required |
|-----------------------|--------------|----------|
| url                   | String       | true     |
| urlMlt                | String       | false    |
| graphQlUrl            | String       | true     |
| apiKey                | String       | false    |
| googleMapsApiKey      | String       | false    |
| googleMapsMarker      | String       | false    |
| ecomSettings          | EcomSettings | false    |
| useQueryParamsFromUrl | boolean      | false    |
| compressQueryParams   | boolean      | false    |

* `url` - Url to Wayke ext-api.
* `urlMlt` - Url to Wayke ext-api for related vehicles. Used when displaying related vehicles for a given vehicle. If not provided `url` will be used, but then related vehicles are change to latest added.
* `graphQlUrl` - Url to the GraphQl endpoint.
* `apiKey` -An *optional* flag. To use with wayke ext-api. If no api key is provided, then the origin of the request is used as a api key.
* `googleMapsApiKey` - An *optional* flag. Google Maps Static will be used if a `googleMapsApiKey` is provided, else the map will open in another tab (Google Maps). Provide a Google Maps Static API key.
* `googleMapsMarker` - An *optional* flag. Provide a custom marker, url.
* `ecomSettings` - An *optional* flag. Allow the use of ecom.
* `useQueryParamsFromUrl` - An *optional* flag. Reading/writing query strings from/to the url. If true and `initialQueryParams` also exist, then initialQueryParams is added if the key doesnt exist in the url.
* `compressQueryParams` - An *optional* flag. Instead of using several query strings that are human readable, all query string will be encoded to base64 into a single value and only allocate query string `f`. `useQueryParamsFromUrl` must be set to true in order to apply this option.

### EcomSettings
| Property           | Type         | Required |
|--------------------|--------------|----------|
| url                | String       | true     |
| useBankId          | boolean      | false    |
| displayBankIdAlert | boolean      | false    |
| serviceLogotypeUrl | string       | false    |
| bankIdThumbprint   | string       | false    |

* `url` - Wayke ecom url.
* `useBankId`: An *optional* flag. If you want to use _Swedish Bank Id_ to identify the user and fetch their personal information, set this to true _(`false` by default)_.
* `displayBankIdAlert`: An *optional* flag. By default, the user is identified with BankId to _Wayke_. To clarify that the purchase is to another retailer, an optional alert can be displayed in the BankId identification step _(`false` by default)_.
* `serviceLogotypeUrl`: An *optional* flag. Set the logo. By default the manufacturers logo will be used.
* `bankIdThumbprint`: An *optional* flag. Custom bank id certificate thumbprint .

> For more information about settings and styling regarding *@wayke-se/ecom* see https://github.com/wayke-se/wayke-ecom-react.

### WaykeSearchSettings
| Property                       | Type                | Required             | Values                                                                                                                                         |
|--------------------------------|---------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| filterList                     | SearchFilterTypes[] | false (all included) |                                                                                                                                                |
| initialQueryParams             | URLSearchParams or string     | false                | query, manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price.min, price.max, mileage.min, mileage.max, modelYear.min, modelYear.max |
| removeSearchBar                | boolean             | false                | Boolean                                                                                                                                        |
| placeholderImage               | string              | false                | String                                                                                                                                         |
* `filterList` - An *optional* flag. Select what filters that should be visible and in whiched order.
* `initialQueryParams` - An *optional* flag. Set the default filter that should be applid upon init.
* `placeholderImage` - An *optional* flag. Provide custom placeholder image when image is missing.

### SearchFilterTypes
| Property    | Type                  | Required | Values                                                                                                                                         |
|-------------|-----------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| filterName  | SearchFilterNameTypes | true     | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear |
| displayName | string                | false    |                                                                                                                                                |

* `displayName` override default translation of title

### Set initial query filter
```javascript
import WaykeComposite from '@wayke-se/components-react'

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
    composite={{,
      intialQueryParams,
    }}
  />
)
```

### Read/write query strings from/to url
```javascript
import WaykeComposite from '@wayke-se/components-react'

const App = () => (
  <WaykeComposite
    provider={
      ...ProviderSettings,
      useQueryParamsFromUrl: true,
      compressQueryParams: true,
    }
  />
)
```

### Read/write compressed query string from/to url
```javascript
import WaykeComposite from '@wayke-se/components-react'

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('price.min', '2000');

const App = () => (
  <WaykeComposite
    provider={
      ...ProviderSettings,
      useQueryParamsFromUrl: true,

    }
  />
)
```

### Select only some of the filters
Order will have effect

```javascript
import WaykeComposite from '@wayke-se/components-react'

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
    composite={{,
      filterList={filterList}
    }}
  />
)
```

## Subscribe to events

```javascript
import { WaykePubSub}  from '@wayke-se/components-react';

const event = {
  eventName: 'ItemClicked',
  callback: (id) => <('subscribed ItemClicked:', id),
};

WaykePubSub.subscribe(event);
WaykePubSub.unsubscribe(event);

```

| Method       | Arguments                      |
|--------------|--------------------------------|
| subscribe    | EventBase                      |
| unsubscribe  | -                              |
| publish      | eventName: string, ...arg: any |

### EventBase
| eventName          | callback                                         |
|--------------------|--------------------------------------------------|
| HashRouteChange    | (id: string) => void                             |
| ItemClicked        | (id: string) => void                             |
| EcomOnInit         | () => void                                       |
| EcomOnUserEvent    | (userEvent: string, currentStep: string) => void |
| EcomOnExit         | () => void                                       |
| ImagesClick        | () => void                                       |
| InformationClick   | () => void                                       |
| OptionsClick       | () => void                                       |
| PhonenumberVisible | () => void                                       |
| PhonenumberCall    | () => void                                       |
| MailVisible        | () => void                                       |
| InsuranceInterest  | () => void                                       |
| FinanceInterest    | () => void                                       |
| All                | (eventName: string, data: any[]) => void         |

* `All` - Subscribes to all events.

## Theme
It is possible to apply a custom theme using *CSS*. The things that can be styled are:
- Primary brand color
- Secondary brand color
- Font (regular)
- Font (bold)

To style the components, copy the following snippet into your *CSS* file and modify are your needs.

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

### Ecom theme
The default ecom css can be found and imported `node_module/@wayke-se/ecom-react/assets/styles/default.css`.

> **It is highly recommended to *NOT* add or remove any properties defined above in the color selectors**. However, since fonts usually requires more configuration we encourage you to add the necessary font styling required to match your current profile. If you add new properties to the font selectors, please be careful and ensure everything looks as intended before going into production.

## Run example from repo
This repository contains a example app that uses [@wayke-se/components-react](https://www.npmjs.com/package/@wayke-se/components-react).



To start the example create an `.env` file in root.
```
WAYKE_HOST=YOUR_HOST_1,YOUR_HOST_2
WAYKE_SEARCH_URL=https://test-ext-api.wayketech.se/vehicles
WAYKE_SEARCH_MLT_URL=https://test-ext-api.wayketech.se/vehicles-mlt
WAYKE_SEARCH_X_API_KEY=YOUR_API_KEY
WAYKE_GRAPH_QL_URL=https://gql.wayketech.se/query
WAYKE_ECOM_URL=https://ecom.wayketech.se
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_STATIC_API_KEY
```

* `WAYKE_SEARCH_MLT_URL` - An *optional* flag. Will fetch related vehicles to current vehicle. If not provided 
`WAYKE_SEARCH_URL` will be used instead, but will fetch latest vehicles.

Then run the following:
```bash
npm install
cd example
npm install
npm start
```

`WAYKE_HOST` can be used instead of using and exposing the `WAYKE_SEARCH_X_API_KEY`. If, for example, your development host is `test.com.localhost`
Update your local host file and add:
127.0.0.1   test.com.localhost
This will change the origin, while still pointing to localhost.
Start the example and open `test.com.localhost:5000`.

To add more hosts, add all to your local host file and then update `WAYKE_HOST` (comma separated):
```
WAYKE_HOST=a.com.localhost,b.com.localhost
```
`a.com.localhost:5000` and `b.com.localhost:5000` can now be accessed.


### Available Routes (Independent)

#### WaykeComposite
[http://localhost:5000](http://localhost:5000)

#### WaykeSearch With WaykeProvider
[http://localhost:5000/search](http://localhost:5000/search)

#### WaykeSearchItem With WaykeProvider
[http://localhost:5000/search-item/d01f79a3-7552-49c4-9d4d-deb3aa581c31](http://localhost:5000/search-item/d01f79a3-7552-49c4-9d4d-deb3aa581c31)


## Example repositories

### React and Typescript example
[https://github.com/wayke-se/components-react-boilerplate](https://github.com/wayke-se/components-react-boilerplate)

### Non-React with/without Typescript example
[https://github.com/wayke-se/components-react-example](https://github.com/wayke-se/components-react-example)
