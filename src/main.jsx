import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DrawerProvider from "./providers/DrawerProvider.jsx";
import AppThemeProvider from "./providers/AppThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
        <App />
      </DrawerProvider>
    </AppThemeProvider>
    <CssBaseline />
  </React.StrictMode>
);
