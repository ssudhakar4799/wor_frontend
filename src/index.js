import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import { store, persistStores } from "./pages/Store/Redux/Store"
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStores}>
      <StrictMode>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </StrictMode>
    </PersistGate>
  </Provider>
);
