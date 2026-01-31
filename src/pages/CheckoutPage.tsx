import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ShopCartType, AuthType } from "../@types/AuthType";

import { useMakeOrderMutation } from "../hooks/useQuery/useQueryAction/useQueryAction"; // Yo'lni o'zingizniki bo'yicha to'g'rilab olasiz
import { clearCart } from "../redux/shop-slice";

interface OrderDataType {
  shop_list: ShopCartType[];
  order_list: string[];
  billing_address: {
    name: string;
    surname: string;
    email?: string;
    phone?: string;
    country?: string;
    town?: string;
    street?: string;
    state?: string;
    zip?: string;
  };
  extra_shop_info: {
    total: number;
    method: string;
    date: string;
  };
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMakeOrderMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");

  const [tempOrderData, setTempOrderData] = useState<OrderDataType | null>(
    null,
  );

  const userCookie = Cookies.get("user");
  const user: AuthType | null = userCookie ? JSON.parse(userCookie) : null;

  const { data, coupon } = useSelector((state: any) => state.shopSlice);

  const cartTotal =
    data?.reduce(
      (acc: number, item: ShopCartType) =>
        acc + (item.userPrice || item.price * item.counter),
      0,
    ) || 0;

  const shippingCost = 16.0;
  const couponPercentage = Number(coupon) || 0;
  const discountAmount = (cartTotal * couponPercentage) / 100;
  const finalTotal = cartTotal - discountAmount + shippingCost;

  const dateObj = new Date();
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data || data.length === 0) {
      message.error("Sizning savatingiz bo'sh!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const order_list = data.map((item: ShopCartType) => item._id);

    const newOrderPayload: OrderDataType = {
      shop_list: data,
      order_list: order_list,
      billing_address: {
        name: (formData.get("firstname") as string) || user?.name || "",
        surname: (formData.get("lastname") as string) || user?.surname || "",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        country: formData.get("country") as string,
        town: formData.get("town") as string,
        street: formData.get("street") as string,
        state: formData.get("state") as string,
        zip: formData.get("zip") as string,
      },
      extra_shop_info: {
        total: finalTotal,
        method: paymentMethod,
        date: dateObj.toISOString().split("T")[0],
      },
    };

    setTempOrderData(newOrderPayload);
    setIsModalOpen(true);
  };

  const handleTrackOrder = () => {
    if (!tempOrderData) return;

    mutate(tempOrderData, {
      onSuccess: () => {
        dispatch(clearCart());

        localStorage.removeItem("shop");

        message.success("Buyurtma muvaffaqiyatli joylashtirilgan!");

        setIsModalOpen(false);
        navigate("/profile/track-order");
      },
      onError: () => {
        message.error("Xatolik yuz berdi. Qayta urinib ko'ring.");
      },
    });
  };

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20">
      <form
        onSubmit={handlePlaceOrder}
        className="flex flex-col md:flex-row gap-10"
      >
        <div className="w-full md:w-[60%]">
          <h2 className="text-[17px] font-bold text-[#3D3D3D] mb-6">
            Billing Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="firstname"
                type="text"
                defaultValue={user?.name}
                placeholder="Enter your first name..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] placeholder:text-gray-400 placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="lastname"
                type="text"
                defaultValue={user?.surname}
                placeholder="Enter your last name..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="country"
                type="text"
                defaultValue={user?.billing_address?.country}
                placeholder="Enter country..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Town / City <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="town"
                type="text"
                defaultValue={user?.billing_address?.town}
                placeholder="Enter town..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="street"
                type="text"
                defaultValue={user?.billing_address?.street_address}
                placeholder="House number and street name"
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">&nbsp;</label>
              <input
                name="apartment"
                type="text"
                defaultValue={user?.billing_address?.extra_address}
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                State <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="state"
                type="text"
                defaultValue={user?.billing_address?.state}
                placeholder="Select state"
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Zip <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="zip"
                type="text"
                defaultValue={user?.billing_address?.zip}
                placeholder="Zip code"
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="email"
                type="email"
                defaultValue={user?.email}
                placeholder="Enter email..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-[#EAEAEA] rounded overflow-hidden">
                <span className="p-2 border-r border-[#46A358] bg-[#d2efd7] text-gray-500">
                  +998
                </span>
                <input
                  required
                  name="phone"
                  type="text"
                  defaultValue={user?.phone_number}
                  className="p-2 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-[#3D3D3D] mb-3">
              Payment Method <span className="text-red-500">*</span>
            </h3>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              className="flex flex-col gap-4"
            >
              <Radio
                value="paypal"
                className="border-2 border-[#46A358] p-3! rounded-[12px]! w-full! md:w-[70%]! xl:w-[50%]!"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-4 w-[30%] sm:w-full"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="MasterCard"
                    className="h-6 w-[30%] sm:w-full"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-6 w-[30%] sm:w-full"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="Amex"
                    className="h-6 w-[30%] sm:w-full"
                  />
                </div>
              </Radio>

              <Radio
                value="bank-transfer"
                className="border-2 mt-3! border-[#46A358] !p-3 rounded-[12px]! flex items-center w-full! md:w-[70%]! xl:w-[50%]!"
              >
                Direct bank transfer
              </Radio>
              <Radio
                value="cash-on-delivery"
                className="border-2 mt-3! border-[#46A358] !p-3 rounded-[12px]! flex items-center w-full! md:w-[70%]! xl:w-[50%]!"
              >
                Cash on delivery
              </Radio>
            </Radio.Group>
          </div>
          <textarea
            placeholder="Comment..."
            className="
    w-full
    mb-4
    p-3
    border
    border-[#EAEAEA]
    rounded
    resize-none
    focus:outline-none
    focus:border-[#46A358]
    text-[14px]
  "
            rows={4}
          />
          <button
            type="submit"
            className="w-full hidden md:flex items-center justify-center bg-[#46A358] text-white py-3 rounded text-[16px] font-bold hover:bg-[#357c44] transition-all cursor-pointer"
          >
            Place Order
          </button>
        </div>

        <div className="w-full md:w-[40%]">
          <h2 className="text-[17px] font-bold text-[#3D3D3D] mb-6">
            Your Order
          </h2>
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
            {data?.map((item: ShopCartType) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-[#FBFBFB] p-2 rounded"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.main_image}
                    alt={item.title}
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                  <div>
                    <h4 className="text-[14px] font-medium text-[#3D3D3D] line-clamp-1 w-[130px]">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-[#727272]">
                      SKU: {item._id.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#727272] text-[13px]">
                    (x{item.counter})
                  </p>
                  <p className="text-[#46A358] font-bold text-[14px]">
                    ${(item.price * item.counter).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-b py-4 mb-6">
            <div className="flex justify-between items-center">
              <h3 className={cupon_title_style}>Subtotal</h3>
              <h2 className="text-[#3D3D3D] text-[18px] font-medium">
                ${cartTotal.toFixed(2)}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <h3 className={cupon_title_style}>Coupon Discount</h3>
              <h2 className="text-[#3D3D3D] text-[15px] font-normal">
                {coupon ? `${coupon}%` : "0%"}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <h3 className={cupon_title_style}>Shipping</h3>
              <h2 className="text-[#3D3D3D] text-[18px] font-medium">$16.00</h2>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#46A358]/50">
              <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total</h2>
              <h1 className="text-[#46A358] text-[20px] font-bold">
                ${finalTotal.toFixed(2)}
              </h1>
            </div>
            <div className="flex justify-end">
              {Boolean(coupon) && (
                <h1 className={`text-red-500 text-[14px] font-bold `}>
                  -${((finalTotal * coupon) / 100).toFixed(2)}
                </h1>
              )}
            </div>
          </div>
        </div>
        <textarea
          placeholder="Comment..."
          className="
    w-full mb-4 p-3 border md:hidden block
    border-[#EAEAEA]
    rounded 
    resize-none
    focus:outline-none
    focus:border-[#46A358]
    text-[14px]
  "
          rows={4}
        />
        <button
          type="submit"
          className="w-full md:hidden flex items-center justify-center bg-[#46A358] text-white py-3 rounded text-[16px] font-bold hover:bg-[#357c44] transition-all cursor-pointer"
        >
          Place Order
        </button>
      </form>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
        centered
        mask={true}
        styles={{
          mask: {
            backdropFilter: "none",
            backgroundColor: "rgba(0,0,0,0.45)",
          },
        }}
      >
        <div className="flex flex-col items-center pt-6 pb-2 text-center">
          <div className="w-[80px] h-[80px] bg-[#46A358]/20 rounded-full flex items-center justify-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="success"
              className="w-10 opacity-60"
            />
          </div>
          <h2 className="text-[#727272] text-[16px] font-medium">
            Your order has been received
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b pb-4 mb-4 mt-4 text-center md:text-left">
          <div>
            <p className="text-[12px] text-[#727272]">Order Number</p>

            <p className="text-[14px] font-bold text-[#3D3D3D]">
              {(Math.random() * 100000000).toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#727272]">Date</p>
            <p className="text-[14px] font-bold text-[#3D3D3D]">
              {formattedDate}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#727272]">Total</p>
            <p className="text-[14px] font-bold text-[#3D3D3D]">
              ${tempOrderData?.extra_shop_info?.total.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#727272]">Payment Method</p>
            <p className="text-[14px] font-bold text-[#3D3D3D] capitalize">
              {tempOrderData?.extra_shop_info?.method.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
          Order Details
        </h3>
        <div className="flex flex-col gap-3 mb-4 max-h-[250px] overflow-y-auto">
          {tempOrderData?.shop_list?.map((item: ShopCartType) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-[#FBFBFB] p-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.main_image}
                  alt={item.title}
                  className="w-[50px] h-[50px] object-contain"
                />
                <div>
                  <h4 className="font-bold text-[14px] text-[#3D3D3D]">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#727272]">
                    SKU: {item._id.slice(0, 8)}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[#727272]">(x{item.counter})</span>
                <span className="font-bold text-[#46A358]">
                  ${(item.price * item.counter).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className={cupon_title_style}>Shipping</h3>
            <h2 className="text-[#3D3D3D] text-[18px] font-medium">$16.00</h2>
          </div>
          <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#46A358]/50">
            <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total</h2>
            <h1 className="text-[#46A358] text-[20px] font-bold">
              ${tempOrderData?.extra_shop_info?.total.toFixed(2)}
            </h1>
          </div>
          <div className="flex justify-end">
            {Boolean(coupon) && (
              <h1 className={`text-red-500 text-[14px] font-bold `}>
                -${((finalTotal * coupon) / 100).toFixed(2)}
              </h1>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleTrackOrder}
            disabled={isPending}
            className={`bg-[#46A358] text-white font-bold py-3 px-10 rounded-full
              transition-all cursor-pointer
              ${!isPending ? "hover:bg-[#357c44]" : ""}
              disabled:bg-[#46A358] disabled:cursor-not-allowed`}
          >
            {isPending ? "Processing..." : "Track your order"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
