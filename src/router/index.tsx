import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/Layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import ProductList from "../pages/Products/ProductList";
import LoginPage from "../pages/Login/LoginPage";
import { ProtectedRoute } from "../auth/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/products", element: <ProductList /> },
        ],
      },
    ],
  },
]);
