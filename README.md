# Wayke Components React

Vehicle search and vehicle pages from Wayke, ready to add to a dealer or partner website. Visitors can search and filter the vehicles, open a vehicle, contact the dealer and buy the vehicle online.

## Quick start

Add this where the vehicles should be shown, for example in an HTML block in your CMS, such as WordPress:

```html
<div id="wayke"></div>
<script type="module">
  import { mount } from 'https://cdn.wayke.se/public-assets/wayke-components-react/5.2.0/index.js';

  mount('#wayke', {
    provider: {
      graphQlUrl: 'https://gql.wayke.se/query',
      url: 'https://api.wayke.se/vehicles',
      urlMlt: 'https://api.wayke.se/vehicles-mlt-ext',
      ecomSettings: { url: 'https://ecom.wayke.se' },
    },
  });
</script>
```

Two things to know:

* **Your domain has to be registered with Wayke.** Wayke shows the vehicles that belong to your site, and recognizes the site by its domain. Until the domain is registered, the search loads but shows no vehicles. Ask your contact at Wayke to register it, and see [Environments](#environments) for development.
* **Set the colors and font** to match your site, see [Colors and fonts](#colors-and-fonts).

That is all you need on most sites. The rest of this page covers other ways to add the components, the settings and the details.

## Contents

* [Add to your site](#add-to-your-site): [CDN](#cdn), [React](#react), [Without React](#without-react)
* [Environments](#environments)
* [Customize](#customize): [colors and fonts](#colors-and-fonts), [buy online colors](#buy-online-colors), [contact buttons](#contact-buttons), [filters](#filters), [language](#language), [search or vehicle page only](#search-or-vehicle-page-only)
* [Routing](#routing)
* [Events](#events)
* [Reference](#reference)

## Add to your site

| Your site | Use |
|-----------|-----|
| Any website, without a build step, such as a CMS or static HTML | [CDN](#cdn) |
| A React app | [React](#react) |
| A website with its own bundler (webpack, Vite, ...) but no React | [Without React](#without-react) |

### CDN

Every release from `5.2.0` is published to the Wayke CDN with everything included: React, the styles and the buy online flow. Nothing needs to be installed.

```
https://cdn.wayke.se/public-assets/wayke-components-react/<version>/index.js
```

Use an exact version. The files of a version never change, so your site only changes when you update the version in the snippet. The latest version is shown on [npm](https://www.npmjs.com/package/@wayke-se/components-react).

There are two ways to load the script. They show the same thing and take the same settings.

**Option A: import** (recommended) is the snippet in [Quick start](#quick-start).

**Option B: script tag.** The script sets `window.WaykeComponents` when it has loaded. Module scripts run after the page has been read, so wait for `DOMContentLoaded` before you use it. If the snippet is added after the page has loaded, for example by a tag manager, `DOMContentLoaded` has already happened, so use option A.

```html
<div id="wayke"></div>
<script type="module" src="https://cdn.wayke.se/public-assets/wayke-components-react/5.2.0/index.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    WaykeComponents.mount('#wayke', {
      provider: {
        graphQlUrl: 'https://gql.wayke.se/query',
        url: 'https://api.wayke.se/vehicles',
        urlMlt: 'https://api.wayke.se/vehicles-mlt-ext',
        ecomSettings: { url: 'https://ecom.wayke.se' },
      },
    });
  });
</script>
```

#### Functions

| Function      | Settings                                  | Shows                                     |
|---------------|-------------------------------------------|-------------------------------------------|
| `mount`       | `{ provider, composite? }`                | Search, and the vehicle page when a vehicle is opened ([WaykeComposite](#waykecomposite)) |
| `mountSearch` | `{ provider, search? }`                   | Only the search ([WaykeSearch](#waykesearch)) |
| `mountItem`   | `{ provider, item }`                      | Only one vehicle page, `item.id` is required ([WaykeSearchItem](#waykesearchitem)) |

* The first argument is a CSS selector, such as `'#wayke'`, or an element.
* `provider` is [WaykeProviderSettings](#waykeprovidersettings) (for `mountItem`: [WaykeItemProviderSettings](#waykeitemprovidersettings)).
* Each function returns `{ unmount }`, which removes the components again.
* `WaykePubSub` is exported too, and is available as `WaykeComponents.WaykePubSub` in option B. See [Events](#events).

#### Stylesheet

The script adds its stylesheet, `index.css` in the same folder, to the top of `<head>`, and shows the components when it has loaded. Since it is added first, the styles of your site override it.

To load the stylesheet yourself, add a `<link>` to it with the same URL. The script finds it and does not add it again. This works with both options.

```html
<link rel="stylesheet" href="https://cdn.wayke.se/public-assets/wayke-components-react/5.2.0/index.css">
```

To not load the stylesheet at all, add `disablecssinjection` to the script tag in option B. The image carousel, the 360 viewer and buy online are then unstyled.

```html
<script type="module" src="https://cdn.wayke.se/public-assets/wayke-components-react/5.2.0/index.js" disablecssinjection></script>
```

### React

Install the package and its peer dependencies. Install `@wayke-se/ecom-web` too if you use buy online (`ecomSettings`), since the package does not include its stylesheet.

```bash
npm install @wayke-se/components-react react react-dom styled-components
npm install @wayke-se/ecom-web
```

```tsx
import React from 'react';
import WaykeComposite, { type WaykeProviderSettings } from '@wayke-se/components-react';
import '@wayke-se/components-react/dist/assets/default.css';
import '@wayke-se/ecom-web/dist/index.css'; // Only with ecomSettings

const ProviderSettings: WaykeProviderSettings = {
  graphQlUrl: 'https://gql.wayke.se/query',
  url: 'https://api.wayke.se/vehicles',
  urlMlt: 'https://api.wayke.se/vehicles-mlt-ext',
  ecomSettings: { url: 'https://ecom.wayke.se' },
};

const App = () => <WaykeComposite provider={ProviderSettings} />;
```

The React examples further down use this `ProviderSettings`.

With `ecomSettings`, your bundler has to replace `process.env`, since the bundled buy online code reads `process.env.WAYKE_ECOM_API_ADDRESS`. With esbuild: `--define:process.env='{"NODE_ENV":"production"}'`. With Vite: `define: { 'process.env': {} }`.

### Without React

The components can be added to any element on any website. React is then bundled with your JavaScript. If you don't already use a bundler, the [CDN](#cdn) is easier.

```bash
npm install @wayke-se/components-react react react-dom styled-components
npm install @wayke-se/ecom-web # Only with ecomSettings
```

```html
<div id="wayke"></div>
<script src="your-bundle.js"></script>
```

```javascript
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import WaykeComposite from '@wayke-se/components-react';
import '@wayke-se/components-react/dist/assets/default.css';
import '@wayke-se/ecom-web/dist/index.css'; // Only with ecomSettings

createRoot(document.getElementById('wayke')).render(
  createElement(WaykeComposite, {
    provider: {
      graphQlUrl: 'https://gql.wayke.se/query',
      url: 'https://api.wayke.se/vehicles',
      urlMlt: 'https://api.wayke.se/vehicles-mlt-ext',
      ecomSettings: { url: 'https://ecom.wayke.se' },
    },
  })
);
```

`createElement` is used instead of JSX, so no JSX setup is needed. With `ecomSettings`, set up `process.env` in your bundler as described under [React](#react).

## Environments

The examples on this page use production. Use test while you develop, to work with test data.

| Setting            | Test                                        | Production                              |
|--------------------|---------------------------------------------|-----------------------------------------|
| `graphQlUrl`       | `https://gql.wayketech.se/query`            | `https://gql.wayke.se/query`            |
| `url`              | `https://api.wayketech.se/vehicles`         | `https://api.wayke.se/vehicles`         |
| `urlMlt`           | `https://api.wayketech.se/vehicles-mlt-ext` | `https://api.wayke.se/vehicles-mlt-ext` |
| `ecomSettings.url` | `https://ecom.wayketech.se`                 | `https://ecom.wayke.se`                 |

Each environment shows the vehicles of the domain the request comes from, so the domain has to be registered in that environment. To develop on `localhost` or a staging domain, have it registered in test. Instead of the domain, a site can be identified with `apiKey`, see [WaykeProviderSettings](#waykeprovidersettings).

## Customize

Most settings go in `composite`, next to `provider`. They work the same way with `mount` on the CDN and with `<WaykeComposite composite={...}>` in React:

```javascript
mount('#wayke', {
  provider: { /* ... */ },
  composite: {
    modifyDocumentTitleItem: true,
    displayBranchName: true,
  },
});
```

All settings are listed in the [Reference](#reference).

### Colors and fonts

The components have no font of their own and inherit the font of your page. Copy this CSS to your site and change the values:

```css
/* Primary color, on buttons and other highlighted elements. Set a text color that is readable on it. */
.wayke__theme.wayke__color--primary-bg {
  background-color: #ff5a1c;
  color: #fff;
}

/* Primary color on text. Use the same color as above. */
.wayke__theme.wayke__color--primary-text {
  color: #ff5a1c;
}

/* Secondary background, with the text color used on it. */
.wayke__theme.wayke__color--secondary-bg {
  background-color: #ebebeb;
  color: #ff5a1c;
}

/* Accent background, with the text color used on it. */
.wayke__theme.wayke__color--accent-bg {
  background-color: #f8f8f8;
  color: #000;
}

/* Regular text. A light (300) or regular (400) weight is recommended. */
.wayke__theme.wayke__font--regular {
  font-family: sans-serif;
  font-weight: 300;
}

/* Headings and other bold text. Without a font-weight here, headings are not bold. */
.wayke__theme.wayke__font--bold {
  font-family: sans-serif;
  font-weight: 700;
}
```

Only change the values in the color rules. Adding or removing properties there can break the layout. The font rules can take more properties, such as `letter-spacing`, but check the result before you go live.

### Buy online colors

Buy online (ecom) has its own styles, scoped under `.waykeecom-root` and built on CSS custom properties. To change its colors, override them in a stylesheet that is loaded after the ecom stylesheet. On the CDN, that is any stylesheet on your page.

```css
.waykeecom-root {
  --waykeecom--color-primary-main: #ff5a1c;
  --waykeecom--color-primary-alt: #ffe6dc;
  --waykeecom--color-link-main: #ff5a1c;
  --waykeecom--color-action-main: #ff5a1c;
  --waykeecom--color-action-alt: #ffe6dc;
}
```

See `@wayke-se/ecom-web/dist/index.css` for all custom properties.

### Contact buttons

The buttons on the vehicle page are set with `conversionOptions`, in the order they are listed. A button is left out when the vehicle doesn't have what it needs.

```javascript
composite: {
  conversionOptions: [
    { type: 'leadMessage' },
    { type: 'leadCallMe' },
    { type: 'ecom' },
    { type: 'phone' },
    // 'email' is left out, so "Show email address" is hidden
  ],
}
```

| type          | Button                | Default style | Shown when                                         |
|---------------|-----------------------|---------------|----------------------------------------------------|
| `ecom`        | Buy online            | primary       | `ecomSettings` is set and the vehicle can be bought online |
| `leadMessage` | Send message (form)   | primary       | The vehicle belongs to a branch                    |
| `leadCallMe`  | Get a callback (form) | primary       | The vehicle belongs to a branch                    |
| `email`       | Show email address    | secondary     | The branch or contact has an email address         |
| `phone`       | Show phone number     | secondary     | The branch or contact has a phone number           |

Without `conversionOptions`, the buttons are `ecom`, `email` and `phone`.

Every button takes:
* `name` - Button text. Defaults to the translated text for the type.
* `primary` - `true` for a primary button, `false` for a secondary one.

`leadMessage` and `leadCallMe` open a form and send the lead to Wayke Dealer, to the branch that owns the vehicle. The lead is tagged with the domain of the page it was sent from (`source`), the button used (`sourceMechanism`: `cta.email` or `cta.callme`) and this package (`client`: `components-react`, and `clientVersion`).

`email` opens the visitor's mail program with a subject and body filled in, so that the dealer can see where the request came from. The texts follow the language, for example in Swedish:
* Subject: `<domain> – Jag är intresserad av <reg no>, <make> <model>`
* Body: `Länk till bilen: <url of the current page>`

Both can be changed, as a text or a function of the vehicle. The vehicle has `id`, `title`, `registrationNumber`, `manufacturer` and `modelSeries`.

```javascript
{
  type: 'email',
  subject: (vehicle) => `Inquiry from example.com – ${vehicle.registrationNumber}`,
  body: false, // No body
}
```

### Filters

Choose which filters are shown, in the order they are listed. `displayName` changes the title of a filter. See [SearchFilterTypes](#searchfiltertypes) for all filters.

```javascript
composite: {
  filterList: [
    { filterName: 'price' },
    { filterName: 'modelSeries', displayName: 'Modell' },
  ],
}
```

To set the filters that are applied when the search loads, use `initialQueryParams`. See [WaykeSearch](#waykesearch) for the available parameters.

```javascript
const initialQueryParams = new URLSearchParams();
initialQueryParams.set('modelYear.min', '2018');
initialQueryParams.append('modelSeries', 'A5');

// ...
composite: {
  initialQueryParams,
}
```

### Language

The components are in Swedish by default. For Norwegian, set `marketCode: 'NO'` in `composite`.

* The mileage filter is shown in Swedish miles (`mileage`, 1 mil = 10 km) in Swedish, and in kilometers (`odometerValueAsKm`) in Norwegian, unless `filterList` is set.
* The language is set once, by the first component that is shown.

### Search or vehicle page only

To show only the search or only one vehicle page, use `mountSearch` or `mountItem` on the CDN, see [Functions](#functions). In React, use the component with its provider. Place the provider close to the root of your app, so that its cache is kept.

Search only:

```tsx
import React from 'react';
import { WaykeProvider, WaykeSearch } from '@wayke-se/components-react';

const App = () => (
  <WaykeProvider {...ProviderSettings}>
    <WaykeSearch onClickSearchItem={(data) => console.log(data.id, data.branchId, data.branchName)} />
  </WaykeProvider>
);
```

Without `hashRoute` or `pathRoute`, the vehicles in the search are not links. Use `onClickSearchItem` to open the vehicle yourself.

Vehicle page only:

```tsx
import React from 'react';
import { WaykeItemProvider, WaykeSearchItem } from '@wayke-se/components-react';

const App = () => (
  <WaykeItemProvider {...ProviderSettings}>
    <WaykeSearchItem
      id="d01f79a3-7552-49c4-9d4d-deb3aa581c31"
      onClickSearchItem={(id) => console.log(id)} // A related vehicle is clicked
    />
  </WaykeItemProvider>
);
```

## Routing

`mount` and `WaykeComposite` show the search, and switch to the vehicle page when a vehicle is opened. By default the vehicle is added to the url after a `#`, such as `/vehicles#01a09074-dfab-7e61-9b78-b816c8233b27`. This works on any page, without any server setup, and the url can be shared. Other hashes, such as `#content`, are ignored and show the search.

To use a path instead, such as `/vehicles/01a09074-dfab-7e61-9b78-b816c8233b27`, set `pathRoute`:

```javascript
composite: {
  pathRoute: '/vehicles',
}
```

Your server then has to show the same page for `/vehicles` and `/vehicles/<vehicle id>`, so that a vehicle page still works when it is reloaded or shared. The vehicle id is added after a `/`, so `pathRoute` should not end with a `/`. A relative `pathRoute` is resolved from the current page, and an absolute url is used as it is. With the page at `/search/vehicles`:

| `pathRoute`                   | Vehicle url                                    |
|-------------------------------|------------------------------------------------|
| `/search/vehicles`            | `yoursite.com/search/vehicles/<vehicle id>`    |
| `/item`                       | `yoursite.com/item/<vehicle id>`               |
| `item`                        | `yoursite.com/search/item/<vehicle id>`        |
| `https://www.example.se/bilar` | `https://www.example.se/bilar/<vehicle id>`   |

## Events

The components publish events when visitors use them, for example to send to your analytics. Subscribe with `WaykePubSub`, before you show the components, so that you also get the events that happen when they load, such as `View`.

On the CDN:

```html
<script type="module">
  import { mount, WaykePubSub } from 'https://cdn.wayke.se/public-assets/wayke-components-react/5.2.0/index.js';

  WaykePubSub.subscribe({
    eventName: 'ItemClicked',
    callback: (data) => console.log('ItemClicked', data),
  });

  mount('#wayke', { provider: { /* ... */ } });
</script>
```

With npm:

```javascript
import { WaykePubSub } from '@wayke-se/components-react';

const event = {
  eventName: 'ItemClicked',
  callback: (data) => console.log('ItemClicked', data),
};

WaykePubSub.subscribe(event);
WaykePubSub.unsubscribe(event); // The same object that was passed to subscribe
```

Use `eventName: 'All'` to get every event, with the callback `(eventName, data) => void`.

| Event                   | When                                                           | Data                                   |
|-------------------------|----------------------------------------------------------------|----------------------------------------|
| `View`                  | The search or a vehicle page is shown                          | [ViewData](#viewdata)                  |
| `HashRouteChange`       | The page loads, and a vehicle is opened or closed (hash routing) | [HashRouteChangeData](#hashroutechangedata) |
| `ItemClicked`           | A vehicle is clicked in the search, or a related vehicle on a vehicle page | [ItemData](#itemdata)      |
| `ImagesClick`           | The images on a vehicle page are clicked                       | [ItemData](#itemdata)                  |
| `OptionsClick`          | "Show more" is clicked in the equipment list                   | [ItemData](#itemdata)                  |
| `MailVisible`           | "Show email address" is clicked                                | [ItemData](#itemdata)                  |
| `MailClick`             | The email address is clicked                                   | [ItemData](#itemdata)                  |
| `PhonenumberVisible`    | "Show phone number" is clicked                                 | [ItemData](#itemdata)                  |
| `PhonenumberCall`       | The phone number is clicked                                    | [ItemData](#itemdata)                  |
| `LeadOpen`              | A contact form is opened                                       | [LeadData](#leaddata)                  |
| `LeadSent`              | A contact form is sent                                         | [LeadData](#leaddata)                  |
| `Ecom`                  | Something happens in buy online, such as a step being completed | [EcomData](#ecomdata)                 |
| `FinanceOpen`           | The financing details are opened                               | [ItemData](#itemdata)                  |
| `FinanceClose`          | The financing details are closed                               | [ItemData](#itemdata)                  |
| `FinanceInterest`       | The financing calculation is expanded or changed               | [ItemData](#itemdata)                  |
| `InsuranceOpen`         | The insurance details are opened                               | [ItemData](#itemdata)                  |
| `InsuranceClose`        | The insurance details are closed                               | [ItemData](#itemdata)                  |
| `InsuranceInterest`     | Insurance prices are requested                                 | [ItemData](#itemdata)                  |
| `Search`                | A search text is submitted                                     | [SearchData](#searchdata)              |
| `SearchInitiated`       | A search starts: when the search loads, and after the search text or a filter changes | [SearchData](#searchdata) |
| `SearchCompleted`       | A search has returned its results                              | [SearchCompletedData](#searchcompleteddata) |
| `SearchClearQuery`      | The search text is cleared                                     | [SearchClearQueryData](#searchclearquerydata) |
| `SearchClearAllFilters` | All filters are cleared                                        | [SearchData](#searchdata)              |
| `FilterApply`           | A filter is changed                                            | [FilterApplyData](#filterapplydata)    |

The data types below describe the payloads. They are not exported from the package.

#### ViewData
| Property | Type                 |
|----------|----------------------|
| type     | `"search" \| "item"` |
| id       | string (item only)   |

#### HashRouteChangeData
| Property | Type                  |
|----------|-----------------------|
| id       | string \| undefined   |

`id` is `undefined` when no vehicle is open.

#### ItemData
| Property   | Type                |
|------------|---------------------|
| id         | string              |
| branchName | string \| undefined |
| branchId   | string \| undefined |

#### LeadData
| Property      | Type                    |
|---------------|-------------------------|
| id            | string                  |
| branchName    | string \| undefined     |
| branchId      | string \| undefined     |
| communication | `"email" \| "callme"`   |

#### EcomData
| Property    | Type                  |
|-------------|-----------------------|
| id          | string                |
| branchName  | string \| undefined   |
| branchId    | string \| undefined   |
| view        | EcomView              |
| event       | EcomEvent             |
| currentStep | EcomStep \| undefined |
| data        | any \| undefined      |

`EcomView`, `EcomEvent` and `EcomStep` are exported from `@wayke-se/ecom-web`.

#### SearchData
| Property | Type   |
|----------|--------|
| query    | string |

#### SearchCompletedData
| Property  | Type   |
|-----------|--------|
| query     | string |
| hits      | number |
| totalHits | number |

#### SearchClearQueryData
| Property | Type           |
|----------|----------------|
| query    | string \| null |

#### FilterApplyData
| Property | Type                                  |
|----------|---------------------------------------|
| type     | `"checkbox" \| "range"`               |
| filter   | string                                |
| value    | string \| undefined (checkbox only)   |
| checked  | boolean \| undefined (checkbox only)  |
| min      | number \| undefined (range only)      |
| max      | number \| undefined (range only)      |

## Reference

### WaykeComposite

The search, and the vehicle page when a vehicle is opened. This is what `mount` shows on the CDN.

| Property  | Type                                          | Required |
|-----------|-----------------------------------------------|----------|
| provider  | [WaykeProviderSettings](#waykeprovidersettings) | Yes    |
| composite | WaykeCompositeProps                           | No       |

`WaykeCompositeProps` takes the settings of [WaykeSearch](#waykesearch) and [WaykeSearchItem](#waykesearchitem), except `id`. `hashRoute` and `onClickSearchItem` have no effect here, since `WaykeComposite` handles the routing itself. To know when a vehicle is clicked, subscribe to the `ItemClicked` [event](#events).

### WaykeSearch

| Property                  | Type                                    | Description |
|---------------------------|-----------------------------------------|-------------|
| marketCode                | `'SE' \| 'NO'`                          | Language, see [Language](#language). Default `'SE'`. |
| filterList                | [SearchFilterTypes](#searchfiltertypes)[] | The filters to show, in this order. By default all filters, with the mileage filter depending on [Language](#language). |
| initialQueryParams        | URLSearchParams \| string               | Filters applied when the search loads, see below. |
| removeSearchBar           | boolean                                 | Hides the search field. |
| removeFilterOptions       | boolean                                 | Hides the filters. |
| placeholderImage          | string                                  | Url to an image for vehicles without images. |
| pathRoute                 | string                                  | Makes the vehicles links to `pathRoute/<vehicle id>`, see [Routing](#routing). |
| hashRoute                 | boolean                                 | Makes the vehicles links to `#<vehicle id>`. Not used if `pathRoute` is set. |
| onClickSearchItem         | `(data: { id, branchId?, branchName? }) => void` | Called when a vehicle is clicked. |
| modifyDocumentTitleSearch | string                                  | Sets the page title. |
| displayBranchName         | boolean                                 | Shows the branch name on the vehicles. |

`initialQueryParams` is passed on to the search API. The parameters are `query`, `manufacturer`, `modelSeries`, `fuelType`, `gearboxType`, `branch`, `color`, `environmentClass`, `properties.segment`, `drivingWheel`, `price.min`, `price.max`, `mileage.min`, `mileage.max`, `odometerValueAsKm.min`, `odometerValueAsKm.max`, `modelYear.min`, `modelYear.max`, `leasingPrice.min`, `leasingPrice.max`, `businessLeasingPrice.min`, `businessLeasingPrice.max`, `sort` (default `published-desc`) and `hits` (default `30`).

### WaykeSearchItem

| Property                 | Type                       | Description |
|--------------------------|----------------------------|-------------|
| id                       | string                     | **Required.** The id of the vehicle. |
| marketCode               | `'SE' \| 'NO'`             | Language, see [Language](#language). Default `'SE'`. |
| conversionOptions        | ConversionOption[]         | The buttons on the vehicle page, see [Contact buttons](#contact-buttons). |
| modifyDocumentTitleItem  | boolean                    | Sets the page title to the vehicle (registration number, title and short description). |
| displayBranchName        | boolean                    | Shows the branch name on related vehicles and where the vehicle is located. |
| placeholderImage         | string                     | Url to an image for vehicles without images. |
| disableResetScrollOnInit | boolean                    | Keeps the scroll position when the vehicle page opens. By default it scrolls to the top. |
| pathRoute                | string                     | Makes related vehicles links to `pathRoute/<vehicle id>`, see [Routing](#routing). |
| hashRoute                | boolean                    | Makes related vehicles links to `#<vehicle id>`. Not used if `pathRoute` is set. |
| onClickSearchItem        | `(id: string) => void`     | Called when a related vehicle is clicked. |

### WaykeProviderSettings

| Property              | Type                          | Description |
|-----------------------|-------------------------------|-------------|
| url                   | string                        | **Required.** The vehicle search API, see [Environments](#environments). |
| graphQlUrl            | string                        | **Required.** The GraphQL API, see [Environments](#environments). |
| urlMlt                | string                        | The API for related vehicles. Without it, the latest vehicles are shown as related vehicles. |
| ecomSettings          | [EcomSettings](#ecomsettings) | Turns on buy online. |
| apiKey                | string                        | Identifies the site instead of its domain. Sent as `x-api-key`. |
| googleMapsApiKey      | string                        | A Google Maps Static API key. With it, the map button on the vehicle page shows a map. Without it, the button opens Google Maps. |
| googleMapsMarker      | string                        | Url to a custom marker for the map. |
| useQueryParamsFromUrl | boolean                       | Reads and writes the search filters in the url. Values in `initialQueryParams` are added unless the url already has them. |
| pathRoute             | string                        | Used with `useQueryParamsFromUrl`: the part of the path from `pathRoute` is removed when the filters are written to the url. `composite.pathRoute` is not passed on, so set it here as well. |

### WaykeItemProviderSettings

The same as [WaykeProviderSettings](#waykeprovidersettings), without `useQueryParamsFromUrl` and `pathRoute`. Used with `WaykeItemProvider` and `mountItem`.

### EcomSettings

| Property           | Type    | Description |
|--------------------|---------|-------------|
| url                | string  | **Required.** The ecom API, see [Environments](#environments). |
| serviceLogotypeUrl | string  | Url to the logo shown in buy online, as an image file (not a `data:` url). The logo of the make is used by default. |
| bankIdThumbprint   | string  | A custom BankID certificate thumbprint. |
| useBankId          | boolean | Deprecated, has no effect since 3.0.0. |
| displayBankIdAlert | boolean | Deprecated, has no effect since 3.0.0. |

See [wayke-ecom-web](https://github.com/wayke-se/wayke-ecom-web) for more about buy online.

### SearchFilterTypes

| Property    | Type   | Description |
|-------------|--------|-------------|
| filterName  | string | **Required.** One of `manufacturer`, `modelSeries`, `fuelType`, `gearboxType`, `branch`, `color`, `environmentClass`, `properties.segment`, `drivingWheel`, `price`, `mileage`, `odometerValueAsKm`, `modelYear`, `leasingPrice`, `businessLeasingPrice`. |
| displayName | string | The title of the filter. The translated title by default. |
