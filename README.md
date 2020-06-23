# Components React

## Usage

Install
```
  npm install @wayke-se/components-react
```


```javascript
import WaykeSearch { WaykeProvider } from '@wayke-se/components-react'

const App = () => (
  <WaykeProvider
    url="https://test-ext-api.wayketech.se/vehicles"
    apiKey="YOUR_API_KEY"
    ecomUrl="OPTIONAL_ECOM_URL"
    googleMapsApiKey="OPTIONAL_GOOGLE_MAPS_API_KEY"
    ecomSettings={ecomSettings}
  >
    <WaykeSearch />
  </WaykeProvider>
)
```

Or

```javascript
import { WaykeSearchWithProvider } from '@wayke-se/components-react'

const filterList = [...]
const intialQueryParams = new URLSearchParams();

const App = () => (
  <WaykeSearchWithProvider
    url="https://test-ext-api.wayketech.se/vehicles"
    apiKey="YOUR_API_KEY"
    ecomUrl="OPTIONAL_ECOM_URL"
    googleMapsApiKey="OPTIONAL_GOOGLE_MAPS_API_KEY"
    ecomSettings={ecomSettings}
    filterList={filterList}
    initialQueryParams={intialQueryParams}
  />
)
```


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

### WaykeSearchWithProvider
Consumes both properties from `WaykeProvider` and `WaykeSearch`

#### Note
By default all filters will be visible. If `filterList` is provided, the order will have effect.

example:
```javascript
import WaykeSearch { WaykeProvider } from '@wayke-se/components-react'

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('query', 't roc');

const App = () => (
  <WaykeProvider>
    <WaykeSearch 
      filterList={['price', 'modelSeries']}
      initialQueryParams={initialQueryParams}
    />
  </WaykeProvider>
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