# Components React

## Usage

Install
```
  npm install @wayke-se/components-react
```


```javascript
import WaykeSearch { WaykeSearchProvider } from '@wayke-se/components-react'

const App = () => (
  <WaykeSearchProvider
    url="https://test-ext-api.wayketech.se/vehicles"
    apiKey="YOUR_API_KEY"
  >
    <WaykeSearch />
  </WaykeSearchProvider>
)

```

## Run example from repo
This repository contains a example app that uses @wayke-se/components-react.

To start the example create a .env file in ./example
```
WAYKE_SEARCH_URL=https://test-ext-api.wayketech.se/vehicles
WAYKE_SEARCH_X_API_KEY=YOUR_API_KEY
```
Then
```
npm install
cd example
npm install
npm start
```