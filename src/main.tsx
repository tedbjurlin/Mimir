import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SettingsProvider from "./state/SettingsContext";
import TextEditor from "./components/TextEditor";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <SettingsProvider>
      <App />
    </SettingsProvider> */}
    <TextEditor />
  </React.StrictMode>
);
