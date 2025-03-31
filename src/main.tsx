import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { GlobalStyle, ThemeProvider } from '@bcp-nextgen-dx-component-factory/design-system';
import { Accolade } from '@bcp-nextgen-dx-component-factory/theme-accolade';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Accolade}>
    <GlobalStyle />
    <App />
    </ThemeProvider>
  </StrictMode>
);
