import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Snowflakes from 'magic-snowflakes';
const snowflakes = new Snowflakes({
    color: '#fff',
    count: 90, // 100 snowflakes. Default: 50
    minOpacity: 0.8, // From 0 to 1. Default: 0.6
    maxOpacity: 1, // From 0 to 1. Default: 1
    minSize: 10, // Default: 10
    maxSize: 40, // Default: 25
    rotation: true, // Default: true
    speed: 2, // The property affects the speed of falling. Default: 1
    wind: true, // Without wind. Default: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
