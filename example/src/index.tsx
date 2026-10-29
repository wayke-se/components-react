import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/style.css';
import './assets/style/theme.css';
import './assets/style/ecom.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
