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
  >
    <WaykeSearch />
  </WaykeProvider>
)

```

### WaykeProvider
| Property          | Type   | Required |
|-------------------|--------|----------|
| url               | String | true     |
| apiKey            | String | true     |
| ecomUrl           | String | false    |
| googleMapsApiKey  | String | false    |


Google maps will be used if a googleMapsApiKey is provided, else the map will open in another tab (google maps)


## WaykeSearch
| Property   | Type     | Default                  | Values                                                                                                                                         |
|------------|----------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| filterList | String[] | undefined (all included) | manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear |

By default all filters will be visible, but you can provide a list with the following types:

manufacturer, modelSeries, fuelType, gearboxType, branch, color, environmentClass, properties.segment, drivingWheel, price, mileage, modelYear

order have effect

example:
```javascript
import WaykeSearch { WaykeProvider } from '@wayke-se/components-react'
const App = () => (
  <WaykeProvider>
    <WaykeSearch  filterList={['price', 'modelSeries']}/>
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