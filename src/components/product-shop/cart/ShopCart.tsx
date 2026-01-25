import type { ShopCartType } from "../../../@types/AuthType";
import type { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useReduxDispatch } from "../../../hooks/useRedux/useRedux";
import { decrement, deleteData, increment } from "../../../redux/shop-slice";

const ShopCart: FC<ShopCartType> = (props) => {
  const { main_image, title, _id, price, counter, userPrice } = props;
  const dispatch = useReduxDispatch();

  return (
    <div className="grid grid-cols-[40%_20%_20%_15%_5%] items-center bg-[#FBFBFB] p-4 rounded-lg transition-transform hover:bg-[#F5F5F5]">
      <div className="flex items-center gap-4">
        <img
          className="w-[70px] h-[70px] object-cover rounded-md"
          src={main_image}
          alt={title}
        />
        <div>
          <h3
            className="text-[16px] font-medium text-[#3D3D3D] line-clamp-1 pr-2"
            title={title}
          >
            {title}
          </h3>
          <p className="text-[14px] font-normal pt-1">
            <span className="text-[#A5A5A5]">SKU:</span>{" "}
            <span className="text-[#727272]">{_id}</span>
          </p>
        </div>
      </div>

      <div className="text-[#727272] text-[16px] font-medium text-center">
        ${price}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => dispatch(decrement(_id))}
          className="w-[25px] cursor-pointer h-[25px] bg-[#46a358] rounded-full text-white flex items-center justify-center hover:bg-[#357a40] transition-colors pb-1 active:scale-95"
        >
          -
        </button>
        <span className="text-[17px] w-[20px] text-center font-medium">
          {counter}
        </span>
        <button
          onClick={() => dispatch(increment(_id))}
          className="w-[25px] cursor-pointer h-[25px] bg-[#46a358] rounded-full text-white flex items-center justify-center hover:bg-[#357a40] transition-colors pb-1 active:scale-95"
        >
          +
        </button>
      </div>

      <div className="text-[#46a358] text-[16px] font-bold text-center">
        ${userPrice?.toFixed(2)}
      </div>

      <div className="flex justify-end">
        <DeleteOutlined
          onClick={() => dispatch(deleteData(_id))}
          className="text-[#727272] hover:text-red-500 text-[20px] cursor-pointer transition-colors"
        />
      </div>
    </div>
  );
};

export default ShopCart;
