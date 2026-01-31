// Card.tsx
import { Heart, Search, ShoppingCart } from "lucide-react";
import type { ProductType } from "../../@types/AuthType";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../hooks/useRedux/useRedux";
import { getData } from "../../redux/shop-slice";
import Cookies from "js-cookie";
import { setAuthorizationModalVisibility } from "../../redux/modal-store";

const Card = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [likedAnimation, setLikedAnimation] = useState(false);
  const dispatch = useReduxDispatch();

  const { data } = useReduxSelector((state) => state.shopSlice);
  const user = useReduxSelector((state: any) => state.userSlice.user);

  // User login holatini aniqlash
  const isLoggedIn = !!user || !!Cookies.get("token");

  // Komponent yuklanganda wishlist holatini tekshirish
  useEffect(() => {
    if (isLoggedIn) {
      checkIfInWishlist();
    } else {
      setIsInWishlist(false);
    }
  }, [product._id, isLoggedIn, user]);

  const handleViewDetails = () => {
    navigate(`/shop/${product.category}/${product._id}`);
  };

  const isInCart = data.some((item: ProductType) => item._id === product._id);

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isInCart) {
      dispatch(getData(product));
    }
  };

  // Wishlistda bor/yo'qligini tekshirish
  const checkIfInWishlist = () => {
    if (!isLoggedIn) {
      setIsInWishlist(false);
      return;
    }

    try {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userObj = JSON.parse(userCookie);
        if (userObj.wishlist && Array.isArray(userObj.wishlist)) {
          const exists = userObj.wishlist.some(
            (item: any) => item._id === product._id
          );
          setIsInWishlist(exists);
        } else {
          setIsInWishlist(false);
        }
      } else {
        setIsInWishlist(false);
      }
    } catch (error) {
      console.error("Error checking wishlist:", error);
      setIsInWishlist(false);
    }
  };

  // Like bosilganda - modal ochish yoki wishlistga qo'shish
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Agar login qilmagan bo'lsa, modal ochish
    if (!isLoggedIn) {
      dispatch(setAuthorizationModalVisibility());
      return;
    }

    // Animatsiyani boshlash
    setLikedAnimation(true);
    setTimeout(() => setLikedAnimation(false), 300);

    // Wishlistni yangilash
    updateWishlist();
  };

  // Wishlistni yangilash (faqat login bo'lganlar uchun)
  const updateWishlist = () => {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        dispatch(setAuthorizationModalVisibility());
        return;
      }

      const userObj = JSON.parse(userCookie);
      let wishlistArray: any[] = userObj.wishlist || [];

      const productIndex = wishlistArray.findIndex(
        (item: any) => item._id === product._id
      );

      if (productIndex > -1) {
        // Olib tashlash
        wishlistArray.splice(productIndex, 1);
        setIsInWishlist(false);
      } else {
        // Qo'shish - oddiy ma'lumotlar bilan
        wishlistArray.push({
          _id: product._id,
          title: product.title || "",
          price: product.price || 0,
          main_image: product.main_image || "",
          category: product.category || "",
          discount_price: product.discount_price,
          discount: product.discount || false,
        });
        setIsInWishlist(true);
      }

      // Yangilangan wishlistni cookie'ga saqlash
      userObj.wishlist = wishlistArray;
      Cookies.set("user", JSON.stringify(userObj));

      // LocalStorage'ga ham saqlash (tezroq o'qish uchun)
      const userId = userObj._id || userObj.id || userObj.email || "default";
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlistArray));

      // Storage event yuborish
      window.dispatchEvent(new Event("wishlist-updated"));
      window.dispatchEvent(new StorageEvent("storage", {
        key: "wishlist",
        oldValue: JSON.stringify(userObj.wishlist),
        newValue: JSON.stringify(wishlistArray)
      }));

    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="group">
      <div
        onClick={() => {
          if (window.innerWidth < 1024) {
            setIsMobileOpen((prev) => !prev);
          }
        }}
        className="
          relative w-full h-[300px] bg-[#fbfbfb]
          flex items-center justify-center
          overflow-hidden transition-all duration-300
          group-hover:border-t-[2px] group-hover:border-[#46A358]
          rounded-sm
        "
      >
        <img
          src={product.main_image}
          alt={product.title}
          className="w-[80%] h-[80%] object-contain mix-blend-multiply"
        />

        <div
          className={`
            absolute left-1/2 -translate-x-1/2 flex gap-4 z-20
            transition-all duration-300
            ${isMobileOpen ? "opacity-100 bottom-6" : "opacity-0 -bottom-10"}
            lg:opacity-0
            lg:-bottom-10
            lg:group-hover:opacity-100
            lg:group-hover:bottom-6
          `}
        >
          <div
            onClick={addToCart}
            className={`
              w-[35px] h-[35px] rounded-md flex items-center justify-center
              cursor-pointer shadow-md hover:-translate-y-[2px] transition-all
              ${
                isInCart
                  ? "bg-[#46A358] text-white"
                  : "bg-white text-[#3D3D3D] hover:text-[#46A358]"
              }
            `}
            title={isInCart ? "Added to Cart" : "Add to Cart"}
          >
            <ShoppingCart size={20} />
          </div>

          <div
            onClick={handleLike}
            className={`
              w-[35px] h-[35px] rounded-md flex items-center justify-center
              cursor-pointer shadow-md hover:-translate-y-[2px] transition-all
              ${likedAnimation ? 'scale-110' : ''}
              ${
                !isLoggedIn
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
                  : isInWishlist
                  ? "bg-red-50 text-red-500 hover:text-red-600 hover:bg-red-100"
                  : "bg-white text-[#3D3D3D] hover:text-[#46A358] hover:bg-gray-50"
              }
            `}
            title={
              !isLoggedIn
                ? "Login to add to wishlist"
                : isInWishlist
                ? "Remove from Wishlist"
                : "Add to Wishlist"
            }
          >
            <Heart
              size={20}
              fill={
                !isLoggedIn
                  ? "none"
                  : isInWishlist
                  ? "#ef4444"
                  : "none"
              }
              strokeWidth={isInWishlist ? 0 : 2}
              className={`
                transition-all duration-300
                ${likedAnimation ? 'scale-125' : ''}
                ${!isLoggedIn ? "opacity-50" : ""}
              `}
            />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center
                       text-[#3D3D3D] hover:text-[#46A358] hover:bg-gray-50
                       cursor-pointer shadow-md hover:-translate-y-[2px] transition-all"
          >
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center lg:items-start">
        <h3 className="text-[#3D3D3D] text-[16px] font-normal truncate w-full lg:text-start text-center">
          {product.title}
        </h3>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-[#46A358] font-bold text-[16px]">
            ${product.price}
          </span>

          {product.discount_price && product.discount_price > 0 && (
            <span className="text-[#A5A5A5] text-[14px] line-through">
              ${product.discount_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;