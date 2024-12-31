import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
// import store from "./redux/store.js";
// import "./assets/css/css/loading.css"
// import "./assets/css/css/style.bundle.css";



import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastProvider } from './components/ToastMessage.jsx';
import { store, persistor } from './redux/persist.js';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider>
        <App />
      </ToastProvider>
      </PersistGate>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
