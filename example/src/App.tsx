import React from 'react';

import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
