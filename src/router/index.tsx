import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AppLayout } from "../components/Layout/AppLayout";
import CategoryForm from "../pages/Categories/CategoryForm";
import CategoryList from "../pages/Categories/CategoryList";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LoginPage from "../pages/Login/LoginPage";
import OrderList from "../pages/Orders/OrderList";
import ProductDetailPage from "../pages/Products/ProductDetailPage";
import ProductForm from "../pages/Products/ProductForm";
import ProductList from "../pages/Products/ProductList";
import VariantForm from "../pages/Products/VariantForm";
import UserList from "../pages/Users/UserList";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
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
            element: <ProductForm />,
          },
          {
            path: "/products/:productId",
            element: <ProductDetailPage />,
          },
          {
            path: "/products/:productId/variants/add",
            element: <VariantForm />,
          },
          {
            path: "/products/:productId/variants/:variantId/edit",
            element: <VariantForm />,
          },
        ],
      },
    ],
  },
]);
