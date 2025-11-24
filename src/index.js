import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-icons/iconfont/material-icons.css';
import Toaster from './Shared/Utils/Toaster';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

reportWebVitals();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => {
      console.log("SW registered")
      Toaster.success('SW Registered', 'success')
    })
    .catch((err) => {
      console.log("SW registration failed", err)
      Toaster.error('SW registration failed', 'error')
    });
}

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {

//     // PWA SERVICE WORKER (new)
//     navigator.serviceWorker.register("/pwa-sw.js").then(() => {
//       Toaster.success("PWA Service Worker registered", "success");
//     }).catch((err) => {
//       Toaster.error("PWA SW registration failed", "error");
//     });

//     // PUSH NOTIFICATION SERVICE WORKER (existing sw.js)
//     navigator.serviceWorker.register("/sw.js").then(() => {
//       Toaster.success("Push Notification SW registered", "success");
//     }).catch((err) => {
//       Toaster.error("Push Notification SW registration failed", "error");
//     });
//   });
// }