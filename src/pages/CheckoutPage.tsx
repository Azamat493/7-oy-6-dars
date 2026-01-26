import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { ShopCartType } from "../@types/AuthType";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { data } = useSelector((state: any) => state.shopSlice);

  const subtotal =
    data?.reduce(
      (acc: number, item: ShopCartType) => acc + (item.userPrice || 0),
      0,
    ) || 0;
  const shipping = 16.0;
  const total = subtotal + shipping;

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.length === 0) {
      message.error("Your cart is empty!");
      return;
    }

    setIsModalOpen(true);
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
                type="text"
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
                type="text"
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
                type="text"
                placeholder="Enter your country / region..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Town / City <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter your town / city..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
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
                type="text"
                placeholder="Enter your street..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">&nbsp;</label>
              <input
                type="text"
                placeholder="Enter your apartment..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
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
                type="text"
                placeholder="Enter your state..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Zip <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter your zip code..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
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
                type="email"
                placeholder="Enter your email..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-[#EAEAEA] rounded overflow-hidden">
                <span className="p-2 border border-[#46A358]  bg-[#d2efd7] text-gray-500">
                  +998
                </span>
                <input
                  required
                  type="number"
                  placeholder="Enter your phone number..."
                  className="p-2 w-full focus:outline-[#46A358] placeholder:text-gray-400 placeholder:text-sm"
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
                className="border border-[#46A358] mb-2! p-3! rounded-[12px] flex items-center w-[50%] "
              >
                <div className="flex gap-2 ml-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-4"
                  />

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="MasterCard"
                    className="h-4"
                  />

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-4"
                  />

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="Amex"
                    className="h-4"
                  />
                </div>
              </Radio>

              <Radio
                value="bank"
                className="border border-[#46A358] mb-2! p-3! rounded-[12px] flex items-center w-[50%]"
              >
                Direct bank transfer
              </Radio>

              <Radio
                value="cash"
                className="border border-[#46A358] mb-2! p-3! rounded-[12px] flex items-center w-[50%]"
              >
                Cash on delivery
              </Radio>
            </Radio.Group>
          </div>

          <div className="md:flex hidden flex-col gap-2 mb-6">
            <label className="text-[15px] text-[#3D3D3D]">
              Enter your comment
            </label>
            <textarea className="border border-[#EAEAEA] rounded p-2 h-[100px] focus:outline-[#46A358]" />
          </div>
          <button
            type="submit"
            className="w-full md:flex hidden items-center justify-center cursor-pointer bg-[#46A358] text-white py-3 rounded text-[16px] font-bold hover:bg-[#357c44] transition-all"
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

          <div className="flex flex-col gap-3 border-t border-b py-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[#3D3D3D]">Subtotal</span>
              <span className="font-medium text-[#3D3D3D]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#3D3D3D]">Coupon Discount</span>
              <span className="font-medium text-[#3D3D3D]">-$0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#3D3D3D]">Shipping</span>
              <span className="font-medium text-[#3D3D3D]">
                ${shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[#3D3D3D] font-bold text-[16px]">
                Total
              </span>
              <span className="font-bold text-[#46A358] text-[18px]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </form>
      <form onSubmit={handlePlaceOrder} className="flex flex-col md:flex-row ">
        <div className="md:hidden flex flex-col gap-2 mb-6">
          <label className="text-[15px] text-[#3D3D3D]">
            Enter your comment
          </label>
          <textarea className="border border-[#EAEAEA] rounded p-2 h-[100px] focus:outline-[#46A358]" />
        </div>
        <button
          type="submit"
          className="w-full md:hidden flex items-center justify-center cursor-pointer bg-[#46A358] text-white py-3 rounded text-[16px] font-bold hover:bg-[#357c44] transition-all"
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
        maskStyle={{
          backdropFilter: "none",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <div className="flex flex-col items-center pt-6 pb-2">
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
          <div className="border-r last:border-0 md:pr-4">
            <p className="text-[12px] text-[#727272]">Order Number</p>
            <p className="text-[14px] font-bold text-[#3D3D3D]">19586687</p>
          </div>
          <div className="border-r last:border-0 md:pr-4">
            <p className="text-[12px] text-[#727272]">Date</p>
            <p className="text-[14px] font-bold text-[#3D3D3D]">
              {formattedDate}
            </p>
          </div>
          <div className="border-r last:border-0 md:pr-4">
            <p className="text-[12px] text-[#727272]">Total</p>
            <p className="text-[14px] font-bold text-[#3D3D3D]">
              ${total.toFixed(2)}
            </p>
          </div>
          <div className="">
            <p className="text-[12px] text-[#727272]">Payment Method</p>
            <p className="text-[14px] font-bold text-[#3D3D3D]">
              {paymentMethod === "cash" ? "Cash on delivery" : paymentMethod}
            </p>
          </div>
        </div>

        <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
          Order Details
        </h3>

        <div className="flex flex-col gap-3 mb-4 max-h-[250px] overflow-y-auto">
          {data?.map((item: ShopCartType) => (
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
              <div className="flex sm:flex-row flex-col gap-2 sm:gap-10">
                <span className="text-[#727272]">(x{item.counter})</span>
                <span className="font-bold text-[#46A358]">
                  ${(item.price * item.counter).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#3D3D3D]">Shipping</span>
            <span className="font-medium text-[#3D3D3D]">
              ${shipping.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#3D3D3D] font-bold">Total</span>
            <span className="font-bold text-[#46A358] text-[18px]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-center text-[13px] text-[#727272] mb-6">
          Your order is currently being processed. You will receive an order
          confirmation email shortly with the expected delivery date for your
          items.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[#46A358] cursor-pointer text-white font-bold py-3 px-10 rounded-full hover:bg-[#357c44] transition-all"
          >
            Track your order
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
