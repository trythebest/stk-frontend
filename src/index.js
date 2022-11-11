import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers";

const container = document.getElementById("root");
const root = createRoot(container);

// NOTE: creating a store which contains all the reducers
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) //Redux debugging tool, connecting it to the app via redux-thunk
);

root.render(
  // Wrapping the entire app under the store as HOC
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);