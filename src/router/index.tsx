import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AppLayout } from "../components/Layout/AppLayout";
import CategoryForm from "../pages/Categories/CategoryForm";
import CategoryList from "../pages/Categories/CategoryList";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LoginPage from "../pages/Login/LoginPage";
import OrderList from "../pages/Orders/OrderList";
import ProductForm from "../pages/Products/ProductForm";
import ProductList from "../pages/Products/ProductList";
import UserList from "../pages/Users/UserList";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          {
            path: "/categories",
            element: <CategoryList />,
          },
          {
            path: "/categories/add",
            element: <CategoryForm />,
          },
          { path: "/products", element: <ProductList /> },
          {
            path: "/orders",
            element: <OrderList />,
          },
          {
            path: "/users",
            element: <UserList />,
          },
          {
            path: "/products/add",
            element: <ProductForm mode="add" />,
          },
          {
            path: "/products/edit/:id",
            element: <ProductForm mode="edit" />,
          },
        ],
      },
    ],
  },
]);
