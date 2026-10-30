
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { ApplicationProvider } from "./context/ApplicationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </StrictMode>
);
