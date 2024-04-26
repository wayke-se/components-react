import React from 'react';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

import { WaykePubSub } from '../../src';

WaykePubSub.subscribe({
  eventName: 'View',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed View:', data),
});

WaykePubSub.subscribe({
  eventName: 'ItemClicked',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed ItemClicked:', data),
});

WaykePubSub.subscribe({
  eventName: 'HashRouteChange',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed HashRouteChange:', data),
});

WaykePubSub.subscribe({
  eventName: 'Ecom',
  callback: (data) =>
    // eslint-disable-next-line
    console.log('subscribed Ecom:', data),
});

WaykePubSub.subscribe({
  eventName: 'ImagesClick',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed ImagesClick:', data),
});

WaykePubSub.subscribe({
  eventName: 'OptionsClick',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed OptionsClick:', data),
});

WaykePubSub.subscribe({
  eventName: 'FilterApply',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed EventFilterApply:', data),
});

WaykePubSub.subscribe({
  eventName: 'InsuranceOpen',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed InsuranceOpen:', data),
});

WaykePubSub.subscribe({
  eventName: 'InsuranceClose',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed InsuranceClose:', data),
});

WaykePubSub.subscribe({
  eventName: 'InsuranceInterest',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed InsuranceInterest:', data),
});

WaykePubSub.subscribe({
  eventName: 'FinanceOpen',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed FinanceOpen:', data),
});

WaykePubSub.subscribe({
  eventName: 'FinanceClose',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed FinanceClose:', data),
});

WaykePubSub.subscribe({
  eventName: 'FinanceInterest',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed FinanceInterest:', data),
});

WaykePubSub.subscribe({
  eventName: 'Search',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed Search:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchClearQuery',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed SearchClearQuery:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchClearAllFilters',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed SearchClearAllFilters:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchInitiated',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed SearchInitiated:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchCompleted',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed SearchCompleted:', data),
});

WaykePubSub.subscribe({
  eventName: 'PhonenumberVisible',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed PhonenumberVisible:', data),
});

WaykePubSub.subscribe({
  eventName: 'PhonenumberCall',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed PhonenumberCall:', data),
});

WaykePubSub.subscribe({
  eventName: 'MailVisible',
  // eslint-disable-next-line
  callback: (data) => console.log('subscribed MailVisible:', data),
});

WaykePubSub.subscribe({
  eventName: 'All',
  // eslint-disable-next-line
  callback: (eventName, data) => console.log('subscribed All:', eventName, data),
});

window.WaykePubSub = WaykePubSub;

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
