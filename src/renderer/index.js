import "@babel/polyfill";
import React from "react";
import { unstable_createRoot as createRoot } from "react-dom";
import { ipcRenderer, shell } from "electron";

import "./setup-live-common";
import GlobalStyle from "./global-style";
import App from "../components/App";

// disable annoying electron dev warning
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

const root = createRoot(document.getElementById("app"));

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);

const HELP_CENTER_URL = "https://google.com";

ipcRenderer.on("helpCenter", async () => {
  shell.openExternal(HELP_CENTER_URL);
});
