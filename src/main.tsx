import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { darkTheme } from "./styles/theme.ts";
import "./i18n/i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle theme={darkTheme} />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
