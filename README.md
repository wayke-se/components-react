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
    ecomUrl="OPTION_ECOM_URL"
  >
    <WaykeSearch />
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
```
Then
```
npm install
cd example
npm install
npm start
```