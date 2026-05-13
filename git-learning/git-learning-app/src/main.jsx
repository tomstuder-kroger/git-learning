import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { defineCustomElements } from 'mx-web-components/dist/loader';
import 'mx-web-components/dist/kds-reset.css';
import 'mx-web-components/dist/kds-utils.css';
import 'mx-web-components/dist/kds-components.css';
import 'mx-web-components/dist/light.css';
import 'mx-web-components/dist/mx-web-components/mx-web-components.css';
import './App.css';

defineCustomElements();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
