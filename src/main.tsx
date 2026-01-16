import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppThemeProvider } from "./theme/ThemeContext";
import { AuthProvider } from "./auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </AuthProvider>,
);
