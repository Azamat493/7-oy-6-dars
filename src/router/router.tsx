import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/home/Home";
import Blog from "../pages/blog/Blog";
import Profile from "../pages/Profile";
import ProductPage from "../pages/ProductPage";
import Shop from "../pages/shop/Shop";
import BlogDetail from "../pages/BlogDetail";
import CheckoutPage from "../pages/CheckoutPage";

import ErrorPage from "../components/NotFound/NotFound";
import ProtectedRoute from "../routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog", element: <Blog /> },
      
      // --- PROFILE ROUTE (O'ZGARISH SHU YERDA) ---
      // 1. Asosiy profile sahifasi (default)
      { 
        path: "/profile", 
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ) 
      },
      // 2. Tablar uchun dinamik route (/profile/address, /profile/wishlist va h.k.)
      { 
        path: "/profile/:tab", 
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ) 
      },
      
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category/:id", element: <ProductPage /> },
      { path: "/blog/:id", element: <BlogDetail /> },
      
      { 
        path: "/checkout", 
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ) 
      },
      
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);