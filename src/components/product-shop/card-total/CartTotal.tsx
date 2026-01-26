import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Prices from "../prices/Prices";

const CartTotal = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#fbfbfb] p-0 md:bg-transparent">
      <h3 className="pb-3 text-[#3D3D3D] border-b border-[#46A358]/50 font-bold text-[18px]">
        Cart Total
      </h3>

      <p className="text-[#3D3D3D] text-sm mt-6 mb-2">Coupon Apply</p>

      <Form className="flex w-full mb-6 relative">
        <input
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
          Apply
        </button>
      </Form>

      <Prices />

      <button
        onClick={() => navigate("/checkout")}
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
