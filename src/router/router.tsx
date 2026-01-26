import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/home/Home";
import Blog from "../pages/blog/Blog";
import Profile from "../pages/Profile";
import ProductPage from "../pages/ProductPage";
import Shop from "../pages/shop/Shop";
import BlogDetail from "../pages/BlogDetail";
import CheckoutPage from "../pages/CheckoutPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog", element: <Blog /> },
      { path: "/profile", element: <Profile /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category/:id", element: <ProductPage /> },
      { path: "/blog/:id", element: <BlogDetail /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ],
  },
]);
