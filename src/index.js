import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Weather from './Weather';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Weather/>  
  </React.StrictMode>
);


