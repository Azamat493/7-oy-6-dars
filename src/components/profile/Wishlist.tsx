import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "../../@types/AuthType";
import Card from "../dashboard/Card";
import { ShoppingBag } from "lucide-react";
import Cookies from "js-cookie";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../../redux/modal-store";

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();

  const user = useReduxSelector((state: any) => state.userSlice.user);

  useEffect(() => {
    if (!user && !Cookies.get("token")) {
      dispatch(setAuthorizationModalVisibility());
      navigate("/");
      return;
    }

    loadWishlist();

    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, [user, navigate, dispatch]);

  const loadWishlist = () => {
    try {
      setIsLoading(true);
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userObj = JSON.parse(userCookie);
        if (userObj.wishlist && Array.isArray(userObj.wishlist)) {
          setWishlistProducts(userObj.wishlist);
        } else {
          setWishlistProducts([]);
        }
      } else {
        setWishlistProducts([]);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      setWishlistProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const goToShop = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#46A358] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4  min-h-screen">
      {wishlistProducts.length === 0 ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You haven't added any products to your wishlist yet. Start exploring
            our collection!
          </p>
          <button
            onClick={goToShop}
            className="px-8 cursor-pointer py-3 bg-[#46A358] text-white font-medium rounded-md hover:bg-[#3d8c4d] transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag size={20} />
            Go to shop
          </button>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => {
                return (
                  <div key={product._id} className="relative">
                    <Card product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
