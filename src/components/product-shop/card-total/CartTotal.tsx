import { Link, useNavigate } from "react-router-dom";
import Prices from "../prices/Prices";
import { useGetCoupon } from "../../../hooks/useQuery/useQueryAction/useQueryAction";
import { useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import Cookies from "js-cookie";

const CartTotal = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useGetCoupon();

  const getCoupon = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const coupon: string = inputRef.current?.value || "";

    if (!coupon.trim()) return;

    mutate({ coupon_code: coupon });
  };

  const handleCheckout = () => {
    const token = Cookies.get("token");

    if (!token) {
      message.warning("Iltimos, avval ro'yxatdan o'ting!");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="w-full bg-[#fbfbfb] p-0 md:bg-transparent">
      <h3 className="pb-3 text-[#3D3D3D] border-b border-[#46A358]/50 font-bold text-[18px]">
        Cart Total
      </h3>

      <p className="text-[#3D3D3D] text-sm mt-6 mb-2">Coupon Apply</p>

      <form onSubmit={getCoupon} className="flex w-full mb-6 relative">
        <input
          ref={inputRef}
          name="coupon"
          placeholder="Enter coupon..."
          className="
            h-10 w-full min-w-0
            border border-[#46A358]
            pl-3 pr-24 
            placeholder:font-light placeholder:text-sm
            rounded-md
            outline-none
            focus:border-[#357a40]
          "
        />
        <button
          type="submit"
          className="
            absolute right-0 top-0
            h-10
            bg-[#46A358]
            cursor-pointer
            text-white
            px-4 sm:px-6
            font-medium
            text-sm sm:text-base
            rounded-r-md
            hover:bg-[#357a40]
            transition-colors
          "
        >
          {isPending ? <LoadingOutlined /> : <span>Apply</span>}
        </button>
      </form>

      <Prices />

      <button
        onClick={handleCheckout}
        className="bg-[#46A358] w-full cursor-pointer h-[45px] rounded-md text-white font-bold text-[15px] sm:text-[16px] mt-8 hover:bg-[#357a40] transition-colors uppercase shadow-md shadow-[#46a3584d]"
      >
        Proceed To Checkout
      </button>

      <Link to={"/"} className="block mt-4">
        <button
          className="
            bg-[#46a3591e] cursor-pointer
            flex items-center justify-center gap-1
            text-base text-[#46a358]
            w-full h-[40px] rounded-md
            hover:bg-[#46a358]
            hover:text-white
            transition-all duration-200
          "
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default CartTotal;
