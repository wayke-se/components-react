import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WaykePubSub } from '../../src';
import Routes from './routes';

WaykePubSub.subscribe({
  eventName: 'ItemClicked',
  callback: (data) => console.log('subscribed ItemClicked:', data),
});

WaykePubSub.subscribe({
  eventName: 'HashRouteChange',
  callback: (data) => console.log('subscribed HashRouteChange:', data),
});

WaykePubSub.subscribe({
  eventName: 'Ecom',
  callback: (data) => console.log('subscribed Ecom:', data),
});

WaykePubSub.subscribe({
  eventName: 'ImagesClick',
  callback: (data) => console.log('subscribed ImagesClick:', data),
});

WaykePubSub.subscribe({
  eventName: 'OptionsClick',
  callback: (data) => console.log('subscribed OptionsClick:', data),
});

WaykePubSub.subscribe({
  eventName: 'FilterApply',
  callback: (data) => console.log('subscribed EventFilterApply:', data),
});

WaykePubSub.subscribe({
  eventName: 'InsuranceOpen',
  callback: (data) => console.log('subscribed InsuranceOpen:', data),
});

WaykePubSub.subscribe({
  eventName: 'InsuranceClose',
  callback: (data) => console.log('subscribed InsuranceClose:', data),
});

WaykePubSub.subscribe({
  eventName: 'InsuranceInterest',
  callback: (data) => console.log('subscribed InsuranceInterest:', data),
});

WaykePubSub.subscribe({
  eventName: 'FinanceOpen',
  callback: (data) => console.log('subscribed FinanceOpen:', data),
});

WaykePubSub.subscribe({
  eventName: 'FinanceClose',
  callback: (data) => console.log('subscribed FinanceClose:', data),
});

WaykePubSub.subscribe({
  eventName: 'FinanceInterest',
  callback: (data) => console.log('subscribed FinanceInterest:', data),
});

WaykePubSub.subscribe({
  eventName: 'Search',
  callback: (data) => console.log('subscribed Search:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchClearQuery',
  callback: (data) => console.log('subscribed SearchClearQuery:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchClearAllFilters',
  callback: (data) => console.log('subscribed SearchClearAllFilters:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchInitiated',
  callback: (data) => console.log('subscribed SearchInitiated:', data),
});

WaykePubSub.subscribe({
  eventName: 'SearchCompleted',
  callback: (data) => console.log('subscribed SearchCompleted:', data),
});

WaykePubSub.subscribe({
  eventName: 'PhonenumberVisible',
  callback: (data) => console.log('subscribed PhonenumberVisible:', data),
});

WaykePubSub.subscribe({
  eventName: 'PhonenumberCall',
  callback: (data) => console.log('subscribed PhonenumberCall:', data),
});

WaykePubSub.subscribe({
  eventName: 'MailVisible',
  callback: (data) => console.log('subscribed MailVisible:', data),
});

WaykePubSub.subscribe({
  eventName: 'All',
  callback: (eventName, data) => console.log('subscribed All:', eventName, data),
});

window.WaykePubSub = WaykePubSub;

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
