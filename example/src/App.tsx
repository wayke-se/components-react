import React from 'react';

import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';

import { WaykePubSub } from '../../src/index';

WaykePubSub.subscribe({
  eventName: 'ItemClicked',
  // eslint-disable-next-line
  callback: (id) => console.log('subscribed ItemClicked:', id),
});

WaykePubSub.subscribe({
  eventName: 'HashRouteChange',
  // eslint-disable-next-line
  callback: (id) => console.log('subscribed HashRouteChange:', id),
});

WaykePubSub.subscribe({
  eventName: 'EcomOnUserEvent',
  callback: (userEvent, currentStep) =>
    // eslint-disable-next-line
    console.log('subscribed EcomOnUserEvent:', userEvent, currentStep),
});

WaykePubSub.subscribe({
  eventName: 'EcomOnExit',
  // eslint-disable-next-line
  callback: () => console.log('subscribed EcomOnExit:'),
});

WaykePubSub.subscribe({
  eventName: 'ImagesClick',
  // eslint-disable-next-line
  callback: () => console.log('subscribed ImagesClick:'),
});

WaykePubSub.subscribe({
  eventName: 'OptionsClick',
  // eslint-disable-next-line
  callback: () => console.log('subscribed OptionsClick:'),
});

WaykePubSub.subscribe({
  eventName: 'PhonenumberVisible',
  // eslint-disable-next-line
  callback: () => console.log('subscribed PhonenumberVisible:'),
});

WaykePubSub.subscribe({
  eventName: 'PhonenumberCall',
  // eslint-disable-next-line
  callback: () => console.log('subscribed PhonenumberCall:'),
});

WaykePubSub.subscribe({
  eventName: 'MailVisible',
  // eslint-disable-next-line
  callback: () => console.log('subscribed MailVisible:'),
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
