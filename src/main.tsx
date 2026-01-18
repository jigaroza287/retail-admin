import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ErrorBoundary } from "./components/Error/ErrorBoundary";
import { queryClient } from "./lib/react-query";
import { router } from "./router";
import { AppThemeProvider } from "./theme/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <AuthProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppThemeProvider>
    </AuthProvider>
  </ErrorBoundary>,
);
