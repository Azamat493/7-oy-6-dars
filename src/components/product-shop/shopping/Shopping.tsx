import { useNavigate } from "react-router-dom";
import ShopCart from "../cart/ShopCart";
import { Empty } from "antd";
import { useReduxSelector } from "../../../hooks/useRedux/useRedux";

const Shopping = () => {
  const navigate = useNavigate();
  const { data } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="w-full">
 
      <div className="w-full overflow-x-auto pb-4">
        
     
        <div className="min-w-[700px]">
      
          <div className="grid grid-cols-[40%_20%_20%_15%_5%] items-center border-b border-[#46a358] pb-3 mb-4">
            <h2 className="text-[#3D3D3D] text-[16px] font-bold text-start pl-2">
              Products
            </h2>
            <h2 className="text-[#3D3D3D] text-[16px] font-bold text-center">
              Price
            </h2>
            <h2 className="text-[#3D3D3D] mr-3 text-[16px] font-bold text-center">
              Quantity
            </h2>
            <h2 className="text-[#3D3D3D] mr-7 text-[16px] font-bold text-center">
              Total
            </h2>
            <div></div>
          </div>

   
          {data.length ? (
            <div className="flex flex-col gap-4">
              {data.map((value) => (
                <ShopCart key={value._id} {...value} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center flex-col items-center mt-10">
              <Empty description="Your cart is empty" />
              <button
                onClick={() => navigate("/")}
                className="bg-[#46a358] mt-4 cursor-pointer rounded-md text-white h-[40px] px-6 font-medium hover:bg-[#357a40] transition-colors"
              >
                Go to Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shopping;