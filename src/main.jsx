import { QueryClient, QueryClientProvider } from "react-query";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import MuiContext from "./context/MuiContext.jsx";
import store from "./app/store.js";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MuiContext>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </MuiContext>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
