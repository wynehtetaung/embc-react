import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import i18next from "i18next";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DrawerProvider from "./providers/DrawerProvider.jsx";
import AppThemeProvider from "./providers/AppThemeProvider.jsx";
import translate_en from "../public/localization/en/translate.json";
import translate_my from "../public/localization/my/translate.json";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translate: translate_en,
    },
    my: {
      translate: translate_my,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </DrawerProvider>
    </AppThemeProvider>
    <CssBaseline />
  </React.StrictMode>
);
