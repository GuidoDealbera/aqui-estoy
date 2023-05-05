// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/Store/store.js";
import { Toaster } from "sonner";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import "./main.css"

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

let theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(',')
  }
})
theme = responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="bottom-right" duration={3000} expand={true} />
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>

);
