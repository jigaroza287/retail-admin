import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AppLayout } from "../components/Layout/AppLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LoginPage from "../pages/Login/LoginPage";
import ProductForm from "../pages/Products/ProductForm";
import ProductList from "../pages/Products/ProductList";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/products/add",
    element: <ProductForm mode="add" />,
  },
  {
    path: "/products/edit/:id",
    element: <ProductForm mode="edit" />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/products", element: <ProductList /> },
        ],
      },
    ],
  },
]);
