import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Provider } from "mobx-react";
import { authStore } from "./utilities/storeOb";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider authStore={authStore}>
        <AuthProvider>
          <ShoppingCartProvider>
            <App />
          </ShoppingCartProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
