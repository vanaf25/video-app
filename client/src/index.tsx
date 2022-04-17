import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ContextProvider} from "./socket/socket";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ContextProvider>
          <App />
      </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
