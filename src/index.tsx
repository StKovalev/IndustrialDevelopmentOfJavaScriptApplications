import { App }  from './app';
import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById("app")
const root = ReactDOM.createRoot(rootElement as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





