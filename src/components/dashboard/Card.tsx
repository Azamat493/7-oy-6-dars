import { Heart, Search, ShoppingCart } from "lucide-react";
import type { ProductType } from "../../@types/AuthType";
import { useNavigate } from "react-router-dom";

const Card = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate();


 const handleViewDetails = () => {
  navigate(`/shop/${product.category}/${product._id}`);
};

  return (
    <div className="group">
   
      <div className="relative w-full h-[300px] bg-[#f2f2f2] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-t-[2px] group-hover:border-[#46A358]">
        <img
          src={product.main_image}
          alt={product.title}
          className="w-[80%] h-[80%] object-contain mix-blend-multiply"
        />

 
        <div className="absolute -bottom-10 group-hover:bottom-6 left-1/2 -translate-x-1/2 flex gap-4 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
          <div className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer shadow-md hover:translate-y-[-2px] transition-all">
            <ShoppingCart size={20} />
          </div>

          <div className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer shadow-md hover:translate-y-[-2px] transition-all">
            <Heart size={20} />
          </div>

          <div
            onClick={handleViewDetails}
            className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer shadow-md hover:translate-y-[-2px] transition-all"
          >
            <Search size={20} />
          </div>
        </div>
      </div>


      <div className="mt-3 flex flex-col items-center lg:items-start">
        <h3 className="text-[#3D3D3D] text-[16px] font-normal">{product.title}</h3>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-[#46A358] font-bold text-[16px]">${product.price}</span>

          {product.discount_price && (
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
