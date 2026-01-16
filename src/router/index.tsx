import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/Layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import ProductList from "../pages/Products/ProductList";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/products", element: <ProductList /> },
    ],
  },
]);
