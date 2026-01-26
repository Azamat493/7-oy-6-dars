import { useSelector } from "react-redux";
import type { ShopCartType } from "../../../@types/AuthType";

const Prices = () => {
  const shopState = useSelector((state: any) => state.shopSlice);

  const data: ShopCartType[] = shopState?.data || [];

  const subtotal = data.reduce((acc: number, item: ShopCartType) => {
    return acc + (item.userPrice || 0);
  }, 0);

  const shipping = subtotal > 0 ? 16.0 : 0;

  const couponDiscount = 0;

  const total = subtotal + shipping - couponDiscount;

  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between mt-3 items-center">
        <h3 className={`${cupon_title_style}`}>Subtotal</h3>
        <h2 className="text-[#3D3D3D] text-[18px] font-medium">
          ${subtotal.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
        <h2 className="text-[#3D3D3D] text-[15px] font-normal">
          -${couponDiscount.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <h3 className={`${cupon_title_style}`}>Shipping</h3>
        <h2 className="text-[#3D3D3D] text-[18px] font-medium">
          ${shipping.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#46A358]/50">
        <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total</h2>
        <h1 className="text-[#46A358] text-[20px] font-bold">
          ${total.toFixed(2)}
        </h1>
      </div>
    </div>
  );
};

export default Prices;
