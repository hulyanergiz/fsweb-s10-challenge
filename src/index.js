import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { reducer } from "./reducers";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <>
        <ToastContainer
          autoClose={3000}
          position="bottom-center"
          closeOnClick
          rtl={true}
        />
        <App />
      </>
    </BrowserRouter>
  </Provider>
);
