# Components React

## Usage

Install
```bash
npm install @wayke-se/components-react
```

```javascript
const ProviderSettings: WaykeProviderSettings = {
  graphQlUrl: "https://gql.wayketech.se/query",
  url: "https://test-ext-api.wayketech.se/vehicles",
  apiKey: "YOUR_API_KEY",
  ecomSettings: {
    url: "OPTIONAL_ECOM_URL",
  },
  googleMapsApiKey: "OPTIONAL_GOOGLE_MAPS_API_KEY",
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
| Property           | Type     | Required | Value                |
|--------------------|----------|----------|----------------------|
| id                 | String   | true     |                      |
| hashRoute          | boolean  | false    |                      |
| onClickSearchItem  | Function | false    | (id: string) => void |

* `id` - Guid that represents a vehicle.
* `hashRoute` - An *optional* flag. If set to true, then if a item is clicked it will append #guid to the url.
* `onClickSearchItem` - An *optional* flag. Function that can be provided that will be triggered once a item is clicked.

### WaykeSearch
| Property           | Type              | Default                  | Values                                                                                                                                         |
|--------------------|-------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| onClickSearchItem  | Function          | undefined                | (id: string) => void                                                                                                                           |
| hashRoute          | Boolean           | undefined (false)        | Boolean                                                                                                                                        |
| filterList         | String[]          | undefined (all included) | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear |
| initialQueryParams | URLSearchParams   | undefined                | query, manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price.min, price.max, mileage.min, mileage.max, modelYear.min, modelYear.max |

* `onClickSearchItem` - An *optional* flag. Function that can be provided that will be triggered once a item is clicked.
* `hashRoute` - An *optional* flag. If set to true, then if a item is clicked it will append #guid to the url.
* `filterList` - An *optional* flag. Select what filters that should be visible and in whiched order.
* `initialQueryParams` - An *optional* flag. Set the default filter that should be applid upon init.

## Types

### WaykeProviderSettings
| Property          | Type         | Required |
|-------------------|--------------|----------|
| url               | String       | true     |
| apiKey            | String       | true     |
| graphQlUrl        | String       | true     |
| googleMapsApiKey  | String       | false    |
| ecomSettings      | EcomSettings | false    |

* `url` - Url to Wayke ext-api.
* `apiKey` - Api key to use with "ayke ext-api.
* `graphQlUrl` - Url to the GraphQl endpoint.
* `googleMapsApiKey` - An *optional* flag. Google maps will be used if a `googleMapsApiKey` is provided, else the map will open in another tab (google maps)
* `ecomSettings` - An *optional* flag. Allow the use of ecom.

### EcomSettings
| Property           | Type         | Required |
|--------------------|--------------|----------|
| url                | String       | true     |
| useBankId          | boolean      | false    |
| displayBankIdAlert | boolean      | false    |

* `url` - Wayke ecom url.
* `useBankId`: An *optional* flag. If you want to use _Swedish Bank Id_ to identify the user and fetch their personal information, set this to true _(`false` by default)_.
* `displayBankIdAlert`: An *optional* flag. By default, the user is identified with BankId to _Wayke_. To clarify that the purchase is to another retailer, an optional alert can be displayed in the BankId identification step _(`false` by default)_.


### WaykeSearchSettings
| Property           | Type              | Default                  | Values                                                                                                                                         |
|--------------------|-------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| filterList         | String[]          | undefined (all included) | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear |
| initialQueryParams | URLSearchParams   | undefined                | query, manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price.min, price.max, mileage.min, mileage.max, modelYear.min, modelYear.max |

* `filterList` - An *optional* flag. Select what filters that should be visible and in whiched order.
* `initialQueryParams` - An *optional* flag. Set the default filter that should be applid upon init.

### Set initial query filter
```javascript
import WaykeComposite from '@wayke-se/components-react'

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('price.min', '2000');

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
    composite={{,
      intialQueryParams,
    }}
  />
)
```

### Select only some of the filters
Order will have effect

```javascript
import WaykeComposite from '@wayke-se/components-react'

const App = () => (
  <WaykeComposite
    provider={ProviderSettings}
    composite={{,
      filterList={['price', 'modelSeries']}
    }}
  />
)
```

## Theme
It is possible to apply a custom theme using *CSS*. The things that can be styled are:
- Brand color
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

## Run example from repo
This repository contains a example app that uses [@wayke-se/components-react](https://www.npmjs.com/package/@wayke-se/components-react).

To start the example create an `.env` file in `./example`.
```
WAYKE_SEARCH_URL=https://test-ext-api.wayketech.se/vehicles
WAYKE_SEARCH_X_API_KEY=YOUR_API_KEY
WAYKE_GRAPH_QL_URL=https://gql.wayketech.se/query
WAYKE_ECOM_URL=https://ecom.wayketech.se
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

Then run the following:
```bash
npm install
cd example
npm install
npm start
```

### Available Routes (Independent)

#### WaykeComposite
[http://localhost:5000](http://localhost:5000)

#### WaykeSearch With WaykeProvider
[http://localhost:5000/search](http://localhost:5000/search)

#### WaykeSearchItem With WaykeProvider
[http://localhost:5000/search-item/d01f79a3-7552-49c4-9d4d-deb3aa581c31](http://localhost:5000/search-item/d01f79a3-7552-49c4-9d4d-deb3aa581c31)
