# Components React

## Usage

Install
```
  npm install @wayke-se/components-react
```

```javascript
import WaykeComposite from '@wayke-se/components-react'

const App = () => (
  <WaykeComposite
    provider={{
      graphQlUrl: "https://gql.wayketech.se/query",
      url: "https://test-ext-api.wayketech.se/vehicles",
      apiKey: "YOUR_API_KEY",
      ecomSettings: {
        url: "OPTIONAL_ECOM_URL",
      },
      googleMapsApiKey: "OPTIONAL_GOOGLE_MAPS_API_KEY",
    }}
  />
)
```


### I only want to use the search component

```javascript
import { WaykeProvider, WaykeSearch } from '@wayke-se/components-react'

const App = () => (
  <WaykeProvider
    provider={{
      graphQlUrl: "https://gql.wayketech.se/query",
      url: "https://test-ext-api.wayketech.se/vehicles",
      apiKey: "YOUR_API_KEY",
      ecomSettings: {
        url: "OPTIONAL_ECOM_URL",
      },
      googleMapsApiKey: "OPTIONAL_GOOGLE_MAPS_API_KEY",
    }}
   >
    <WaykeSearch
      filterList={filterList}
      intialQueryParams={intialQueryParams}
      onClickSearchItem={(id: string) => console.log(id)}
    />
  </WaykeProvider>
)
```

### WaykeComposite
| Property          | Type          | Required |
|-------------------|---------------|----------|
| provider          | WaykeProvider | true     |
| base              | WaykeSearch   | true     |

### WaykeProvider
| Property          | Type         | Required |
|-------------------|--------------|----------|
| url               | String       | true     |
| apiKey            | String       | true     |
| ecomUrl           | String       | false    |
| googleMapsApiKey  | String       | false    |
| ecomSettings      | EcomSettings | false    |

#### EcomSettings
| Property           | Type         | Required |
|--------------------|--------------|----------|
| url                | String       | true     |
| useBankId          | boolean      | false    |
| displayBankIdAlert | boolean      | false    |


Google maps will be used if a `googleMapsApiKey` is provided, else the map will open in another tab (google maps)

### WaykeSearch
| Property           | Type              | Default                  | Values                                                                                                                                         |
|--------------------|-------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| filterList         | String[]          | undefined (all included) | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear |
| initialQueryParams | URLSearchParams   | undefined                | query, manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price.min, price.max, mileage.min, mileage.max, modelYear.min, modelYear.max |


#### Note
By default all filters will be visible. If `filterList` is provided, the order will have effect.


### Set initial query filter
```javascript
import WaykeComposite from '@wayke-se/components-react'

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('query', 't roc');

const App = () => (
  <WaykeComposite
    base={{,
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
    base={{,
      filterList={['price', 'modelSeries']}
    }}
  />
)
```

## Run example from repo
This repository contains a example app that uses @wayke-se/components-react.

To start the example create a .env file in ./example
```
WAYKE_SEARCH_URL=https://test-ext-api.wayketech.se/vehicles
WAYKE_SEARCH_X_API_KEY=YOUR_API_KEY
WAYKE_GRAPH_QL_URL=https://gql.wayketech.se/query
WAYKE_ECOM_URL=https://ecom.wayketech.se
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```
Then
```
npm install
cd example
npm install
npm start
```