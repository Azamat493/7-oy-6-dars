import { useReduxSelector } from "../../../hooks/useRedux/useRedux";
import type { ShopCartType } from "../../../@types/AuthType";

const Prices = () => {
  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";

  const { data, coupon } = useReduxSelector((state) => state.shopSlice);

  
  const total =
    data?.reduce((acc: number, item: ShopCartType) => {
      return acc + (item.userPrice || 0);
    }, 0) || 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between mt-3 items-center">
        <h3 className={`${cupon_title_style}`}>Subtotal</h3>
        <h2 className="text-[#3D3D3D] text-[18px] font-medium">
          ${total.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
        <h2 className="text-[#3D3D3D] text-[15px] font-normal">
          {coupon ? coupon : 0}%
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <h3 className={`${cupon_title_style}`}>Shipping</h3>
        <h2 className="text-[#3D3D3D] text-[18px] font-medium">$16.00</h2>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#46A358]/50">
        <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total</h2>

        <h1 className={`text-[#46A358] text-[20px] font-bold`}>
          ${" "}
          {coupon
            ? ((total - (total * coupon) / 100) + 16).toFixed(2) 
            : (total + 16).toFixed(2)}{" "}
        </h1>
      </div>

      <div className="flex justify-end">
        {Boolean(coupon) && (
          <h1 className={`text-red-500 text-[14px] font-bold `}>
            -${((total * coupon) / 100).toFixed(2)}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Prices;