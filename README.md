# Wayke Components React

Vehicle search and vehicle pages from Wayke, ready to add to a dealer or partner website. Visitors can search and filter the vehicles, open a vehicle, contact the dealer and buy the vehicle online.

Upgrading from 5.x? See [Migrating from 5.x to 6.0](#migrating-from-5x-to-60).

## Quick start

Add this where the vehicles should be shown, for example in an HTML block in your CMS, such as WordPress:

```html
<div id="wayke"></div>
<script type="module">
  import { mount } from 'https://cdn.wayke.se/public-assets/wayke-components-react/6.0.0/index.js';

  mount('#wayke');
</script>
```

<details>
<summary>The same snippet for Wayke's test environment</summary>

For a staging site or `localhost`, registered in Wayke's test environment. It shows test vehicles, and leads and orders go to test. See [Environments](#environments).

```html
<div id="wayke"></div>
<script type="module">
  import { mount } from 'https://cdn.wayke.se/public-assets/wayke-components-react/6.0.0/index.js';

  mount('#wayke', {
    provider: { environment: 'test' },
  });
</script>
```

</details>

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
* [Migrating from 5.x to 6.0](#migrating-from-5x-to-60)

## Add to your site

| Your site | Use |
|-----------|-----|
| Any website, without a build step, such as a CMS or static HTML | [CDN](#cdn) |
| A React app | [React](#react) |
| A website with its own bundler (webpack, Vite, ...) but no React | [Without React](#without-react) |

### CDN

Every release is published to the Wayke CDN with everything included: React, the styles and the buy online flow. Nothing needs to be installed.

```
https://cdn.wayke.se/public-assets/wayke-components-react/<version>/index.js
```

Use an exact version. The files of a version never change, so your site only changes when you update the version in the snippet. The latest version is shown on [npm](https://www.npmjs.com/package/@wayke-se/components-react).

There are two ways to load the script. They show the same thing and take the same settings.

**Option A: import** (recommended) is the snippet in [Quick start](#quick-start).

**Option B: script tag.** The script sets `window.WaykeComponents` when it has loaded. Module scripts run after the page has been read, so wait for `DOMContentLoaded` before you use it. If the snippet is added after the page has loaded, for example by a tag manager, `DOMContentLoaded` has already happened, so use option A.

```html
<div id="wayke"></div>
<script type="module" src="https://cdn.wayke.se/public-assets/wayke-components-react/6.0.0/index.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    WaykeComponents.mount('#wayke');
  });
</script>
```

#### Functions

| Function      | Settings                       | Shows                                     |
|---------------|--------------------------------|-------------------------------------------|
| `mount`       | `{ provider?, composite? }`    | Search, and the vehicle page when a vehicle is opened ([WaykeComposite](#waykecomposite)) |
| `mountSearch` | `{ provider?, search? }`       | Only the search ([WaykeSearch](#waykesearch)) |
| `mountItem`   | `{ provider?, item }`          | Only one vehicle page, `item.id` is required ([WaykeSearchItem](#waykesearchitem)) |

* The first argument is a CSS selector, such as `'#wayke'`, or an element.
* `provider` is [WaykeProviderSettings](#waykeprovidersettings), the same for all three.
* Each function returns `{ unmount }`, which removes the components again.
* `WaykePubSub` is exported too, and is available as `WaykeComponents.WaykePubSub` in option B. See [Events](#events).

#### Stylesheet

The script adds its stylesheet, `index.css` in the same folder, to the top of `<head>`, and shows the components when it has loaded. Since it is added first, the styles of your site override it.

To load the stylesheet yourself, add a `<link>` to it with the same URL. The script finds it and does not add it again. This works with both options.

```html
<link rel="stylesheet" href="https://cdn.wayke.se/public-assets/wayke-components-react/6.0.0/index.css">
```

To not load the stylesheet at all, add `disablecssinjection` to the script tag in option B. The image carousel, the 360 viewer and buy online are then unstyled.

```html
<script type="module" src="https://cdn.wayke.se/public-assets/wayke-components-react/6.0.0/index.js" disablecssinjection></script>
```

### React

Install the package and its peer dependencies, and import its stylesheet once. The stylesheet covers everything, buy online included, and the code for buy online is only loaded when a buyer opens it. No bundler setup is needed.

```bash
npm install @wayke-se/components-react react react-dom styled-components
```

```tsx
import React from 'react';
import WaykeComposite, { type WaykeProviderSettings } from '@wayke-se/components-react';
import '@wayke-se/components-react/style.css';

// All settings are optional, see WaykeProviderSettings.
const ProviderSettings: WaykeProviderSettings = {};

const App = () => <WaykeComposite provider={ProviderSettings} />;
```

The React examples further down use this `ProviderSettings`.

The package is ESM only, with `@wayke-se/components-react` and `@wayke-se/components-react/style.css` as its entry points.

### Without React

The components can be added to any element on any website. React is then bundled with your JavaScript. If you don't already use a bundler, the [CDN](#cdn) is easier.

```bash
npm install @wayke-se/components-react react react-dom styled-components
```

```html
<div id="wayke"></div>
<script src="your-bundle.js"></script>
```

```javascript
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import WaykeComposite from '@wayke-se/components-react';
import '@wayke-se/components-react/style.css';

createRoot(document.getElementById('wayke')).render(createElement(WaykeComposite));
```

`createElement` is used instead of JSX, so no JSX setup is needed.

## Environments

The components use production by default. Set `environment: 'test'` while you develop, to work with test data:

```javascript
mount('#wayke', {
  provider: { environment: 'test' },
});
```

| `environment`          | Vehicles and loans                          | Leads                           | Buy online                  |
|------------------------|---------------------------------------------|---------------------------------|-----------------------------|
| `production` (default) | `https://public-api.wayke.com/graphql`      | `https://api.wayke.se/lead`     | `https://ecom.wayke.se`     |
| `test`                 | `https://public-test-api.wayke.com/graphql` | `https://api.wayketech.se/lead` | `https://ecom.wayketech.se` |

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

Buy online (ecom) has its own styles, scoped under `.waykeecom-root` and built on CSS custom properties. To change its colors, override them in a stylesheet that is loaded after `@wayke-se/components-react/style.css`. On the CDN, that is any stylesheet on your page.

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
| `ecom`        | Buy online            | primary       | The dealer sells the vehicle online, unless `ecom.enabled` is `false` |
| `leadMessage` | Send message (form)   | primary       | Always                                             |
| `leadCallMe`  | Get a callback (form) | primary       | Always                                             |
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

Choose which filters are shown, in the order they are listed. `displayName` changes the title of a filter. See [SearchFilterTypes](#searchfiltertypes) for all filters. A filter with nothing to pick, such as business leasing on a site without leasing cars, is left out.

```javascript
composite: {
  filterList: [
    { filterName: 'price' },
    { filterName: 'modelSeries', displayName: 'Modell' },
  ],
}
```

To set the filters that are applied when the search loads, use `initialQueryParams`. It takes the same parameters as the url, see [Search parameters](#search-parameters).

```javascript
const initialQueryParams = new URLSearchParams();
initialQueryParams.set('modelYear.min', '2018');
initialQueryParams.append('modelSeries', 'A5');

// ...
composite: {
  initialQueryParams,
}
```

The search field suggests makes and models while the visitor types. Picking one, or typing one exactly, such as "volvo v60", filters on it instead of searching the text.

### Language

The components are in Swedish by default. For Norwegian, set `marketCode: 'NO'` in `provider`.

* The mileage filter is in Swedish miles (1 mil = 10 km) in Swedish, and in kilometers in Norwegian.
* The language is set once, by the first provider that is shown.

### Search or vehicle page only

To show only the search or only one vehicle page, use `mountSearch` or `mountItem` on the CDN, see [Functions](#functions). In React, use the component with `WaykeProvider`. Place the provider close to the root of your app, so that its cache is kept.

Search only:

```tsx
import React from 'react';
import { WaykeProvider, WaykeSearch } from '@wayke-se/components-react';

const App = () => (
  <WaykeProvider {...ProviderSettings} routing={{ mode: 'none' }}>
    <WaykeSearch />
  </WaykeProvider>
);
```

With `routing.mode: 'none'`, the vehicles in the search are not links. Subscribe to the `ItemClicked` [event](#events) to open the vehicle yourself.

Vehicle page only:

```tsx
import React from 'react';
import { WaykeProvider, WaykeSearchItem } from '@wayke-se/components-react';

const App = () => (
  <WaykeProvider {...ProviderSettings}>
    <WaykeSearchItem id="019cd398-f71a-7ee6-893f-4684c0104a60" />
  </WaykeProvider>
);
```

Older vehicle ids still work: the vehicle is found and the id in the url is replaced with the current one.

## Routing

Routing is set in `provider.routing`.

`mount` and `WaykeComposite` show the search, and switch to the vehicle page when a vehicle is opened. By default the vehicle is added to the url after a `#`, such as `/vehicles#019cd398-f71a-7ee6-893f-4684c0104a60`. This works on any page, without any server setup, and the url can be shared. Other hashes, such as `#content`, are ignored and show the search.

To use a path instead, such as `/vehicles/019cd398-f71a-7ee6-893f-4684c0104a60`, set `mode: 'path'` and `basePath`:

```javascript
provider: {
  routing: { mode: 'path', basePath: '/vehicles' },
}
```

Your server then has to show the same page for `/vehicles` and `/vehicles/<vehicle id>`, so that a vehicle page still works when it is reloaded or shared. The vehicle id is added after a `/`, so `basePath` should not end with a `/`. A relative `basePath` is resolved from the page the components are shown on, and an absolute url is used as it is. With the page at `/search/vehicles`:

| `basePath`                     | Vehicle url                                    |
|--------------------------------|------------------------------------------------|
| `/search/vehicles`             | `yoursite.com/search/vehicles/<vehicle id>`    |
| `/item`                        | `yoursite.com/item/<vehicle id>`               |
| `item`                         | `yoursite.com/search/item/<vehicle id>`        |
| `https://www.example.se/bilar` | `https://www.example.se/bilar/<vehicle id>`    |

Links on the same site open without reloading the page. Ctrl- or cmd-click opens them in a new tab.

To keep the filters in the url, so that a search can be shared and the back button returns to it, set `syncUrl: true`. The filters in the url then win over `initialQueryParams`, which only add what the url doesn't have.

```javascript
provider: {
  routing: { syncUrl: true },
}
```

### Search parameters

The url, `initialQueryParams` and the `onFilterUpdate` action use the same parameters as wayke.se:

| Parameter | Example | Filters on |
|-----------|---------|------------|
| `q` | `q=drag` | Free text |
| `manufacturer`, `model`, `modelSeries`, `fuelType`, `gearboxType`, `branchDisplayName`, `branchCity`, `colorName`, `environmentClass`, `segment`, `bodyStyle`, `trimLevel`, `inventoryStatus`, `drivetrainType`, `engineBaseType` | `manufacturer=Volvo&manufacturer=Audi` | One or more values |
| `price.min`, `price.max` | `price.max=300000` | Price in kr |
| `odometer.min`, `odometer.max` | `odometer.max=8000` | Mileage, in mil in Swedish and in km in Norwegian |
| `modelYear.min`, `modelYear.max` | `modelYear.min=2018` | Model year |
| `privateLease.min`, `privateLease.max` | `privateLease.max=5000` | Private leasing per month |
| `businessLease.min`, `businessLease.max` | `businessLease.max=5000` | Business leasing per month |
| `certifiedPreOwned`, `isDemoVersion`, `deductibleVat`, `ecom`, `leasing`, `businessLeasing` | `ecom=true` | Yes or no |
| `sort` | `sort=price-asc` | `published-desc` (default), `published-asc`, `price-asc`, `price-desc`, `modelYear-desc`, `modelYear-asc`, `odometer-asc`, `odometer-desc` |

The parameters from before 6.0, such as `query`, `color`, `mileage.max` and `sort=mileage-asc`, still work: they are translated, a warning in the console names the new ones, and with `syncUrl` the url is updated to them.

## Events

The components publish events when visitors use them, for example to send to your analytics. Subscribe with `WaykePubSub`, before you show the components, so that you also get the events that happen when they load, such as `View`.

On the CDN:

```html
<script type="module">
  import { mount, WaykePubSub } from 'https://cdn.wayke.se/public-assets/wayke-components-react/6.0.0/index.js';

  WaykePubSub.subscribe({
    eventName: 'ItemClicked',
    callback: (data) => console.log('ItemClicked', data),
  });

  mount('#wayke');
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

To change the filters from your own code, publish the `onFilterUpdate` action with the [search parameters](#search-parameters):

```javascript
WaykePubSub.publishAction('onFilterUpdate', 'manufacturer=Volvo&sort=price-asc');
```

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
| `Search`                | A search text or a suggestion is submitted                     | [SearchData](#searchdata)              |
| `SearchInitiated`       | A search starts: when the search loads, and after the search text or a filter changes | [SearchData](#searchdata) |
| `SearchCompleted`       | A search has returned its results                              | [SearchCompletedData](#searchcompleteddata) |
| `SearchClearQuery`      | The search text is cleared                                     | [SearchClearQueryData](#searchclearquerydata) |
| `SearchClearAllFilters` | All filters are cleared                                        | [SearchData](#searchdata)              |
| `FilterApply`           | A filter is changed                                            | [FilterApplyData](#filterapplydata)    |

The data types below describe the payloads. In TypeScript they are exported with the events, as `CallbackItem`, `CallbackLeadData`, `CallbackSearchCompletedData` and so on. Every `query` uses the [search parameters](#search-parameters).

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

`EcomView`, `EcomEvent` and `EcomStep` are string enums from `@wayke-se/ecom-web`, which is installed with the package. Compare with their values, such as `data.view === 'SUMMARY'`, so buy online is not loaded with your own code.

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
| filter   | string, a [filter name](#searchfiltertypes) |
| value    | string \| undefined (checkbox only)   |
| checked  | boolean \| undefined (checkbox only)  |
| min      | number \| undefined (range only)      |
| max      | number \| undefined (range only)      |

## Reference

### WaykeComposite

The search, and the vehicle page when a vehicle is opened. This is what `mount` shows on the CDN.

| Property  | Type                                            | Required |
|-----------|-------------------------------------------------|----------|
| provider  | [WaykeProviderSettings](#waykeprovidersettings) | No       |
| composite | WaykeCompositeProps                             | No       |

`WaykeCompositeProps` takes the settings of [WaykeSearch](#waykesearch) and [WaykeSearchItem](#waykesearchitem), except `id`.

### WaykeSearch

| Property                  | Type                                      | Description |
|---------------------------|-------------------------------------------|-------------|
| filterList                | [SearchFilterTypes](#searchfiltertypes)[] | The filters to show, in this order. By default all filters. |
| initialQueryParams        | URLSearchParams \| string                 | Filters applied when the search loads, see [Search parameters](#search-parameters). |
| removeSearchBar           | boolean                                   | Hides the search field. |
| removeFilterOptions       | boolean                                   | Hides the filters. |
| placeholderImage          | string                                    | Url to an image for vehicles without images. |
| modifyDocumentTitleSearch | string                                    | Sets the page title. |
| displayBranchName         | boolean                                   | Shows the branch name on the vehicles. |

### WaykeSearchItem

| Property                 | Type                       | Description |
|--------------------------|----------------------------|-------------|
| id                       | string                     | **Required.** The id of the vehicle. Older ids work too. |
| conversionOptions        | ConversionOption[]         | The buttons on the vehicle page, see [Contact buttons](#contact-buttons). |
| modifyDocumentTitleItem  | boolean                    | Sets the page title to the vehicle (registration number, title and short description). |
| displayBranchName        | boolean                    | Shows the branch name on related vehicles and where the vehicle is located. |
| placeholderImage         | string                     | Url to an image for vehicles without images. |
| disableResetScrollOnInit | boolean                    | Keeps the scroll position when the vehicle page opens. By default it scrolls to the top. |

### WaykeProviderSettings

All settings are optional.

| Property         | Type                                  | Description |
|------------------|---------------------------------------|-------------|
| environment      | `'production' \| 'test'`              | Which Wayke environment to use, see [Environments](#environments). Default `'production'`. |
| marketCode       | `'SE' \| 'NO'`                        | Language and market, see [Language](#language). Default `'SE'`. |
| routing          | [RoutingSettings](#routingsettings)   | How vehicles are opened, see [Routing](#routing). |
| ecom             | [EcomSettings](#ecomsettings)         | Buy online. On by default for the vehicles the dealer sells online. |
| apiKey           | string                                | Identifies the site instead of its domain. Sent as `x-api-key`. |
| branchGroupId    | string                                | Limits the vehicles to a group of branches. By default the domain or `apiKey` decides which vehicles are shown. |
| googleMapsApiKey | string                                | A Google Maps Static API key. With it, the map button on the vehicle page shows a map. Without it, the button opens Google Maps. |
| googleMapsMarker | string                                | Url to a custom marker for the map. |
| publicApiUrl     | string                                | Replaces the vehicle API of `environment`. |
| leadUrl          | string                                | Replaces the lead API of `environment`. |

### RoutingSettings

| Property | Type                         | Description |
|----------|------------------------------|-------------|
| mode     | `'hash' \| 'path' \| 'none'` | `hash` (default) opens a vehicle at `#<id>`, `path` at `<basePath>/<id>`, `none` makes the vehicles plain cards that only publish `ItemClicked`. |
| basePath | string                       | **Required for `path`.** Where the vehicle pages are, see [Routing](#routing). |
| syncUrl  | boolean                      | Reads and writes the search filters in the url. |

### EcomSettings

| Property           | Type    | Description |
|--------------------|---------|-------------|
| enabled            | boolean | `false` hides buy online on your site, for example when you sell online in another way. Default `true`. |
| url                | string  | Replaces the ecom API of `environment`. |
| serviceLogotypeUrl | string  | Url to the logo at the top of buy online, as an image file (not a `data:` url). Wayke's logo by default. |
| bankIdThumbprint   | string  | A custom BankID certificate thumbprint. |

See [wayke-ecom-web](https://github.com/wayke-se/wayke-ecom-web) for more about buy online.

### SearchFilterTypes

| Property    | Type   | Description |
|-------------|--------|-------------|
| filterName  | string | **Required.** One of `manufacturer`, `model`, `modelSeries`, `fuelType`, `gearboxType`, `branchDisplayName`, `branchCity`, `colorName`, `environmentClass`, `segment`, `bodyStyle`, `trimLevel`, `inventoryStatus`, `drivetrainType`, `engineBaseType`, `price`, `odometer`, `modelYear`, `privateLease`, `businessLease`. |
| displayName | string | The title of the filter. The translated title by default. |

By default the list is `manufacturer`, `modelSeries`, `fuelType`, `gearboxType`, `branchDisplayName`, `colorName`, `environmentClass`, `segment`, `drivetrainType`, `price`, `privateLease`, `businessLease`, `odometer` and `modelYear`.

## Migrating from 5.x to 6.0

6.0 gets the vehicles from Wayke's public API (`public-api.wayke.com`) instead of `api.wayke.se` and `gql.wayke.se`, and has fewer settings: most sites only set what is different from the defaults. Leads and buy online work as before, but buy online is now on by default.

The old filter names, url parameters and vehicle ids keep working, with a warning in the console, so a site that only changes its settings keeps its links and saved searches. A removed setting also gives a warning, naming what replaces it.

### 1. Provider settings

Remove the API urls and `ecomSettings`. Production is the default; set `environment: 'test'` for test.

```javascript
// 5.x
provider: {
  url: 'https://api.wayke.se/vehicles',
  graphQlUrl: 'https://gql.wayke.se/query',
  urlMlt: 'https://api.wayke.se/vehicles-mlt-ext',
  ecomSettings: { url: 'https://ecom.wayke.se' },
},

// 6.0: nothing to set
```

| 5.x | 6.0 |
|-----|-----|
| `url`, `graphQlUrl`, `urlMlt` | Removed. Use `environment` (`publicApiUrl` and `leadUrl` replace single urls if you need to) |
| `ecomSettings` set: buy online on | `ecom` (optional): buy online is on by default for the vehicles the dealer sells online |
| No `ecomSettings`: buy online off | `ecom: { enabled: false }` |
| `ecomSettings.url` | `ecom.url`, optional, follows `environment` |
| `ecomSettings.serviceLogotypeUrl`, `ecomSettings.bankIdThumbprint` | `ecom.serviceLogotypeUrl`, `ecom.bankIdThumbprint` |
| `ecomSettings.useBankId`, `ecomSettings.displayBankIdAlert` | Removed, no effect since 3.0.0 |
| `useQueryParamsFromUrl` | `routing.syncUrl` |
| `pathRoute` (provider and composite) | `routing: { mode: 'path', basePath }` |
| `marketCode` (composite, search, item) | `provider.marketCode` |
| `apiKey` | Unchanged; now also identifies the site to the vehicle API |
| `WaykeItemProvider`, `WaykeItemProviderSettings` | `WaykeProvider`, `WaykeProviderSettings` |

### 2. Install and stylesheet (React and bundlers)

The CDN needs no change other than the version in the url.

| 5.x | 6.0 |
|-----|-----|
| `import '@wayke-se/components-react/dist/assets/default.css'` | `import '@wayke-se/components-react/style.css'`, which also covers buy online |
| `import '@wayke-se/ecom-web/dist/index.css'` | Remove; it is in `style.css` |
| `npm install @wayke-se/ecom-web` | Not needed; `npm uninstall @wayke-se/ecom-web` unless you use it yourself |
| `define` for `process.env` in the bundler, for buy online | Not needed |
| Imports from `@wayke-se/components-react/dist/...` | Only `@wayke-se/components-react` and `@wayke-se/components-react/style.css` can be imported; the package is ESM only |

### 3. Routing and clicks

| 5.x | 6.0 |
|-----|-----|
| Hash routing (`#<id>`) by default in `mount` and `WaykeComposite` | Unchanged |
| `hashRoute` | Removed; hash is the default |
| `WaykeSearch` alone without `hashRoute` or `pathRoute`: plain cards | Set `routing: { mode: 'none' }`; the default is now hash links |
| `onClickSearchItem` (search and item) | Removed; subscribe to the `ItemClicked` event |

### 4. Filters and parameters

`filterList`, `initialQueryParams`, the `onFilterUpdate` action and the url take the names in [Search parameters](#search-parameters). The old names are translated:

| 5.x | 6.0 |
|-----|-----|
| `query` | `q` |
| `branch` | `branchDisplayName` |
| `color` | `colorName` |
| `properties.segment` | `segment` |
| `drivingWheel` | `drivetrainType` |
| `mileage`, `odometerValueAsKm` | `odometer` (mil in Swedish, km in Norwegian) |
| `leasingPrice` | `privateLease` |
| `businessLeasingPrice` | `businessLease` |
| `sort=model-asc`, `model-desc`, `mileage-asc`, `mileage-desc` | `modelYear-asc`, `modelYear-desc`, `odometer-asc`, `odometer-desc` |
| `hits`, `offset` | Removed; 30 vehicles per page, "Show more" loads the next |

The search field now suggests makes and models. A free text that is exactly a make or model, such as "audi", filters on it.

### 5. Events

The event names and data are the same. What changes:

* `query` in `Search`, `SearchInitiated`, `SearchCompleted`, `SearchClearAllFilters` uses the new parameter names.
* `filter` in `FilterApply` is the new filter name, for example `colorName` instead of `color`.
* `id` is the vehicle's id in the public API. New vehicles have new ids; older ones mostly keep theirs.

### 6. Removed

* Central storage (switching to another branch on the vehicle page).
* The campaign filter. Dealer packages are still shown on the vehicle page.
* Related vehicles are now the latest vehicles of the same make.
* A vehicle without a cash price, such as a leasing-only car, shows no price instead of 0 kr.
