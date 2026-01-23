import { useState, useEffect } from "react";
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

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("S");

  const {
    data: product,
    isLoading,
    isError,
  }: QueryType<ProductType> = useQueryHandler({
    url: `flower/category/${category}/${id}`,
    pathname: `product-details-${id}`,
  });

  useEffect(() => {
    if (product?.main_image) {
      setSelectedImage(product.main_image);
    }
  }, [product]);

  if (isLoading)
    return <div className="flex justify-center mt-20">{cateGoryLoader()}</div>;

  if (isError || !product)
    return (
      <div className="text-center mt-20 text-red-500">Product not found!</div>
    );
  const images = product.detailed_images?.length
    ? product.detailed_images
    : [product.main_image];

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20">
      <div className="mb-10 text-sm">
        <span
          onClick={() => navigate("/")}
          className="font-bold cursor-pointer hover:text-[#46A358]"
        >
          Home
        </span>{" "}
        / <span className="ml-1 text-[#46A358]">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex flex-1 gap-4 h-[450px] items-center">
          <div className="flex flex-col gap-4 w-[20%] h-full overflow-y-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-[90px] h-[90px] p-[10px] max-[600px]:h-[60px] max-[600px]:w-[60px]  bg-[#e5e5e5] cursor-pointer border border-[#3d3d3d2f] hover:border-[#46A358] transition-colors flex justify-center items-center
                  ${selectedImage === img ? "border-[#46A358]" : "border-transparent hover:border-[#46A358]"}
                `}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>

          <div className="w-[80%] max-w-[400px] h-[250px] flex-1 flex justify-center items-center bg-[#fbfbfb] border border-transparent hover:scale-105 transition-transform duration-500 cursor-zoom-in">
            <Image
              src={selectedImage || product.main_image}
              alt={product.title}
              className="object-contain h-full w-full"
              preview={{
                mask: <div className="text-white text-lg">Click to Zoom</div>,
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-[28px] font-bold text-[#3D3D3D]">
            {product.title}
          </h1>

          <div className="flex items-center justify-between border-b border-[#46A358]/50 pb-4 mt-2">
            <span className="text-[#46A358] text-[22px] font-bold">
              ${product.price}
            </span>
            <div className="flex flex-col items-center gap-2">
              <Rate
                disabled
                defaultValue={Math.round(product.rate)}
                style={{ fontSize: 14, color: "#FFAC0C" }}
              />
              <span className="text-[13px] text-[#3D3D3D]">
                {product.views} Customer Review
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-[#3D3D3D]">Short Description:</h3>
            <p className="text-[#727272] text-[14px] leading-6 mt-2">
              {product.short_description || "No description available."}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-[#3D3D3D]">Size:</h3>
            <div className="flex gap-3 mt-2">
              {["S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer text-[14px] font-bold transition-all
                    ${selectedSize === size ? "border-[#46A358] text-[#46A358]" : "border-[#EAEAEA] text-[#727272] hover:border-[#46A358]"}`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button className="bg-[#46A358] cursor-pointer text-white px-8 py-2.5 rounded-[6px] font-bold hover:bg-[#357a40] transition-colors uppercase">
              Buy Now
            </button>

            <button className="border cursor-pointer border-[#46A358] text-[#46A358] px-8 py-2.5 rounded-[6px] font-bold hover:bg-[#46A358] hover:text-white transition-colors uppercase">
              Add to Cart
            </button>

            <button className="w-10 h-10 cursor-pointer border border-[#46A358] rounded-[6px] flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white transition-colors">
              <HeartOutlined />
            </button>
          </div>

          <div className="mt-8 text-[15px] text-[#727272] flex flex-col gap-2">
            <p>
              <span className="text-[#A5A5A5]">SKU:</span> {product._id}
            </p>
            <p>
              <span className="text-[#A5A5A5]">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="text-[#A5A5A5]">Tags:</span>{" "}
              {product.tags.join(", ") || "Home, Garden, Plants"}
            </p>
          </div>

          <div className="mt-4 flex gap-4 items-center text-[#3D3D3D]">
            <span className="font-medium">Share this product:</span>
            <i className="fa-brands fa-facebook-f hover:text-[#46A358] cursor-pointer"></i>
            <i className="fa-brands fa-twitter hover:text-[#46A358] cursor-pointer"></i>
            <i className="fa-brands fa-linkedin-in hover:text-[#46A358] cursor-pointer"></i>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="border-b border-[#46A358] pb-4 mb-6">
          <h3 className="text-[#46A358] font-bold text-[18px] cursor-pointer">
            Product Description
          </h3>
        </div>
        <div
          className="text-[#727272] leading-7"
          dangerouslySetInnerHTML={{
            __html: product.description || "No detailed description available.",
          }}
        />
      </div>
    </div>
  );
};

export default ProductPage;
