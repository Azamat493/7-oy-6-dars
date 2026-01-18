import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import ProviderConfig from "./router/provider-config/ProviderConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderConfig>
      <RouterProvider router={router} />
    </ProviderConfig>
  </StrictMode>,
);
