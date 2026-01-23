import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Blog from "../pages/blog/Blog";
import Profile from "../pages/Profile";
import ProductPage from "../pages/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
   {
    path: "/shop/:category/:id", 
    element: <ProductPage />,
  },
]);

