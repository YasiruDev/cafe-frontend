import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
// import createSagaMiddleware from "redux-saga";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reducers from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Notification from "./components/Notification";
import AddNewCafeModal from "./containers/Cafe/AddNewCafeModal";
import theme from "./styles/theme/theme";

import "./index.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Notification />
      <App />
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
