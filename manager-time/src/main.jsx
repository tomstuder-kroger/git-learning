// MX Web Components - Load web components first
import { defineCustomElements } from 'mx-web-components/dist/loader';

// MX Web Components CSS - MUST be in this order
import 'mx-web-components/dist/kds-reset.css';
import 'mx-web-components/dist/kds-utils.css';
import 'mx-web-components/dist/kds-components.css';
import 'mx-web-components/dist/light.css'; // Default light theme
import 'mx-web-components/dist/mx-web-components/mx-web-components.css';

// Custom styles
import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './context/NotificationContext';

// Register custom elements
defineCustomElements(window);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);
