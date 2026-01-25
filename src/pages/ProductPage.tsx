import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { loaderApi } from "../generic/loader/loaderApi";
import type { ProductType, QueryType } from "../@types/AuthType";

const ProductPage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { cateGoryLoader } = loaderApi();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("S");

  const {
    data: product,
    isLoading,
    isError,
  }: QueryType<ProductType> = useQueryHandler({
    url: `flower/category/${category}/${id}`,
    pathname: `product-details-${id}`,
  });

  if (isLoading)
    return <div className="flex justify-center mt-20">{cateGoryLoader()}</div>;

  if (isError || !product)
    return (
      <div className="text-center mt-20 text-red-500 font-bold text-xl">
        Product not found!
      </div>
    );

  const images = product.detailed_images?.length
    ? product.detailed_images
    : [product.main_image];

  const currentImage = selectedImage || product.main_image;

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
                className={`
                  w-full aspect-square p-2 bg-[#fbfbfb] cursor-pointer 
                  border transition-all duration-300 flex justify-center items-center rounded-md
                  ${
                    currentImage === img
                      ? "border-[#46A358]"
                      : "border-transparent hover:border-[#46A358]"
                  }
                `}
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
                preview={{
                  mask: (
                    <div className="text-white text-sm font-medium">
                      Zoom Image
                    </div>
                  ),
                }}
              />
            </div>

            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-[28px] font-bold text-[#3D3D3D]">
            {product.title}
          </h1>

          <div className="flex items-center justify-between border-b border-[#46A358]/20 pb-4 mt-4">
            <span className="text-[#46A358] text-[22px] font-bold">
              ${product.price}
            </span>
            <div className="flex flex-col items-center gap-2">
              <Rate
                disabled
                allowHalf
                defaultValue={product.rate}
                className="text-[#FFAC0C] text-sm"
              />
              <span className="text-[13px] text-[#3D3D3D]">
                ({product.views} Customer Reviews)
              </span>
            </div>
          </div>

          <div className="mt-6">
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
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center border cursor-pointer text-[14px] font-bold transition-all
                    ${
                      selectedSize === size
                        ? "border-[#46A358] text-[#46A358]"
                        : "border-[#EAEAEA] text-[#727272] hover:border-[#46A358]"
                    }
                  `}
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

            <button className="border w-[160px] cursor-pointer border-[#46A358] text-[#46A358] px-8 py-3 rounded-[6px] font-bold hover:bg-[#46A358] hover:text-white transition-colors uppercase text-sm">
              Add to Cart
            </button>

            <button className="w-11 h-11 cursor-pointer border border-[#EAEAEA] rounded-[6px] flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] hover:border-[#46A358] transition-all">
              <HeartOutlined style={{ fontSize: "20px" }} />
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
              {product.tags.length > 0
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
