import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Rate, message } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { Skeleton } from "antd";
import { useReduxDispatch, useReduxSelector } from "../hooks/useRedux/useRedux";
import { getData } from "../redux/shop-slice";
import Cookies from "js-cookie";
import { setAuthorizationModalVisibility } from "../redux/modal-store";

import type { ProductType, QueryType } from "../@types/AuthType";

const ProductSkeleton = () => {
  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20">
      <Skeleton.Input active size="small" style={{ width: 220 }} />

      <div className="flex flex-col md:flex-row gap-12 mt-10">
        <div className="flex flex-1 gap-4 h-[450px] items-start">
          <div className="flex flex-col gap-4 w-[20%] h-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton.Image
                key={i}
                active
                style={{ width: "100%", height: 90 }}
              />
            ))}
          </div>

          <div className="w-[80%]" style={{ height: 450 }}>
            <Skeleton.Image active style={{ width: 450, height: 450 }} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <Skeleton.Avatar active size={70} shape="circle" />
            <Skeleton.Input active style={{ width: 120 }} />
          </div>

          <Skeleton.Input active style={{ width: "70%", height: 32 }} />

          <div className="mt-4">
            <Skeleton paragraph={{ rows: 3 }} active />
          </div>

          <div className="flex gap-3 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton.Button
                key={i}
                active
                shape="circle"
                style={{ width: 36, height: 36 }}
              />
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Skeleton.Button active size="large" style={{ width: 160 }} />
            <Skeleton.Button active size="large" style={{ width: 160 }} />
            <Skeleton.Button active size="large" style={{ width: 44 }} />
          </div>

          <div className="mt-8">
            <Skeleton paragraph={{ rows: 3 }} active />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Skeleton paragraph={{ rows: 6 }} active />
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();

  const { data: cartData } = useReduxSelector((state) => state.shopSlice);
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [isInWishlist, setIsInWishlist] = useState(false);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  }: QueryType<ProductType> = useQueryHandler({
    url: `flower/category/${category}/${id}`,
    pathname: `product-details-${id}`,
  });

  const { data: sellerInfo } = useQueryHandler({
    pathname: `seller-info-${product?.created_by}`,
    url: product?.created_by ? `user/by_id/${product.created_by}` : "",
  });

  const isLoggedIn = !!user || !!Cookies.get("token");

  useEffect(() => {
    if (isLoggedIn && product) {
      checkIfInWishlist();
    } else {
      setIsInWishlist(false);
    }
  }, [product, isLoggedIn, user]);

  const isInCart = useMemo(() => {
    if (!product || !cartData) return false;
    return cartData.some((item) => item._id === product._id);
  }, [cartData, product]);

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
            (item: any) => item._id === product?._id,
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

  if (isProductLoading) {
    return <ProductSkeleton />;
  }

  if (isProductError || !product)
    return (
      <div className="text-center mt-20 text-red-500 font-bold text-xl">
        Product not found!
      </div>
    );

  const images = [product.main_image, ...(product.detailed_images || [])];
  const currentImage = selectedImage || product.main_image;

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
        (item: any) => item._id === product._id,
      );

      if (productIndex > -1) {
        wishlistArray.splice(productIndex, 1);
        setIsInWishlist(false);
        message.success("Saralanganlardan o'chirildi");
      } else {
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
        message.success("Saralanganlarga qo'shildi");
      }

      userObj.wishlist = wishlistArray;
      Cookies.set("user", JSON.stringify(userObj));

      const userId = userObj._id || userObj.id || userObj.email || "default";
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlistArray));

      window.dispatchEvent(new Event("wishlist-updated"));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "wishlist",
          oldValue: JSON.stringify(userObj.wishlist),
          newValue: JSON.stringify(wishlistArray),
        }),
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
      message.error("Xatolik yuz berdi");
    }
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      message.warning("Iltimos, avval tizimga kiring!");
      dispatch(setAuthorizationModalVisibility());
      return;
    }

    updateWishlist();
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (isInCart) {
      navigate("/shop");
      return;
    }

    dispatch(getData(product));
    message.success("Mahsulot savatga qo'shildi!");
  };

  const getSellerName = () => {
    if (sellerInfo) {
      return sellerInfo.name || sellerInfo.username || "Unknown Seller";
    }
    return "Unknown Seller";
  };

  const getSellerPhoto = () => {
    return sellerInfo?.profile_photo || null;
  };

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20">
      <div className="mb-10 text-sm">
        <span
          onClick={() => navigate("/")}
          className="font-bold cursor-pointer hover:text-[#46A358]"
        >
          Home
        </span>{" "}
        /{" "}
        <span className="ml-1 text-[#46A358] font-medium">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex flex-1 gap-4 h-[450px] items-start">
          <div className="flex flex-col gap-4 w-[20%] h-full overflow-y-auto custom-scroll pr-1">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-full aspect-square p-2 bg-[#fbfbfb] cursor-pointer border transition-all duration-300 flex justify-center items-center rounded-md ${
                  currentImage === img
                    ? "border-[#46A358]"
                    : "border-transparent hover:border-[#46A358]"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className="w-[80%] h-full flex justify-center items-center bg-[#fbfbfb] rounded-lg overflow-hidden border border-gray-100 relative group">
            <div className="w-full h-full p-6 transition-transform duration-500 hover:scale-110 cursor-zoom-in flex items-center justify-center">
              <Image
                src={currentImage}
                alt={product.title}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start border-b border-[#46A358]/20 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden border border-gray-200">
                {getSellerPhoto() ? (
                  <img
                    src={getSellerPhoto()}
                    alt="Seller"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <UserOutlined style={{ fontSize: "24px" }} />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="text-[18px] font-bold text-[#3D3D3D] m-0 leading-tight">
                  {getSellerName()}
                </h2>
                <span className="text-[#46A358] text-[18px] font-bold mt-1">
                  ${product.price}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 mt-2">
              <Rate
                disabled
                allowHalf
                defaultValue={product.rate || 0}
                className="text-[#FFAC0C] text-lg"
              />
              <span className="text-[13px] text-[#3D3D3D]">
                {product.comments?.length || 0} customer review
              </span>
            </div>
          </div>

          <h1 className="text-[28px] font-bold text-[#3D3D3D]">
            {product.title}
          </h1>

          <div className="mt-4">
            <h3 className="font-medium text-[#3D3D3D] text-[15px]">
              Short Description:
            </h3>
            <p className="text-[#727272] text-[14px] leading-6 mt-2">
              {product.short_description || "No description available."}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-[#3D3D3D] text-[15px]">Size:</h3>
            <div className="flex gap-3 mt-2">
              {["S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border cursor-pointer text-[14px] font-bold transition-all ${
                    selectedSize === size
                      ? "border-[#46A358] text-[#46A358]"
                      : "border-[#EAEAEA] text-[#727272] hover:border-[#46A358]"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button className="bg-[#46A358] w-[160px] cursor-pointer text-white px-8 py-3 rounded-[6px] font-bold hover:bg-[#357a40] transition-colors uppercase text-sm">
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className={`w-[160px] cursor-pointer px-8 py-3 rounded-[6px] font-bold uppercase text-sm transition-colors border
                ${
                  isInCart
                    ? "bg-[#46A358] text-white border-[#46A358] hover:bg-[#357a40]"
                    : "border-[#46A358] text-[#46A358] hover:bg-[#46A358] hover:text-white"
                }
              `}
            >
              {isInCart ? "View Cart" : "Add to Cart"}
            </button>

            <button
              onClick={handleWishlist}
              className={`w-11 h-11 cursor-pointer border rounded-[6px] flex items-center justify-center transition-all 
                ${isInWishlist ? "border-[#46A358] text-[#46A358]" : "border-[#EAEAEA] text-[#3D3D3D] hover:text-[#46A358] hover:border-[#46A358]"}
              `}
            >
              {isInWishlist ? (
                <HeartFilled style={{ fontSize: "20px", color: "#46A358" }} />
              ) : (
                <HeartOutlined style={{ fontSize: "20px" }} />
              )}
            </button>
          </div>

          <div className="mt-8 text-[15px] text-[#727272] flex flex-col gap-2.5">
            <p>
              <span className="text-[#A5A5A5]">SKU:</span> {product._id}
            </p>
            <p>
              <span className="text-[#A5A5A5]">Category:</span>{" "}
              <span className="capitalize">{product.category}</span>
            </p>
            <p>
              <span className="text-[#A5A5A5]">Tags:</span>{" "}
              {product.tags?.length > 0
                ? product.tags.join(", ")
                : "Home, Garden, Plants"}
            </p>
          </div>

          <div className="mt-6 flex gap-4 items-center text-[#3D3D3D]">
            <span className="font-medium text-[15px]">Share this product:</span>
            <div className="flex gap-4 text-lg">
              <i className="fa-brands fa-facebook-f hover:text-[#46A358] cursor-pointer transition-colors"></i>
              <i className="fa-brands fa-twitter hover:text-[#46A358] cursor-pointer transition-colors"></i>
              <i className="fa-brands fa-linkedin-in hover:text-[#46A358] cursor-pointer transition-colors"></i>
              <i className="fa-regular fa-envelope hover:text-[#46A358] cursor-pointer transition-colors"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="border-b-2 border-[#46A358] mb-6">
          <h3 className="text-[#46A358] font-bold text-[17px] cursor-pointer pb-4 inline-block">
            Product Description
          </h3>
        </div>
        <div
          className="text-[#727272] leading-7 text-sm md:text-base"
          dangerouslySetInnerHTML={{
            __html: product.description || "No detailed description available.",
          }}
        />
      </div>
    </div>
  );
};

export default ProductPage;
