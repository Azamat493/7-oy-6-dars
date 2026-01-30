import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ShopCartType, AuthType } from "../@types/AuthType";

// Interfeyslar
interface OrderDataType {
  shop_list: ShopCartType[];
  billing_address: {
    name: string;
    surname: string;
    // Boshqa maydonlar
  };
  extra_shop_info: {
    total: number;
    method: string;
  };
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");

  // Modalda ko'rsatish uchun state
  const [orderDetails, setOrderDetails] = useState<OrderDataType | null>(null);

  // 1. COOKIE DAN USER MA'LUMOTLARINI OLISH
  const userCookie = Cookies.get("user");
  const user: AuthType | null = userCookie ? JSON.parse(userCookie) : null;

  // Redux ma'lumotlari
  const { data, coupon } = useSelector((state: any) => state.shopSlice);

  // --- HISOB-KITOB LOGIKASI (Prices komponentiga moslashtirildi) ---
  const cartTotal =
    data?.reduce(
      (acc: number, item: ShopCartType) => acc + (item.userPrice || 0),
      0,
    ) || 0;

  const shippingCost = 16.0;
  const couponPercentage = Number(coupon) || 0;

  // Chegirma summasi
  const discountAmount = (cartTotal * couponPercentage) / 100;

  // Yakuniy summa: (Subtotal - Chegirma) + Dostavka
  const finalTotal = cartTotal - discountAmount + shippingCost;

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // --- STYLES (Prices komponentidan olindi) ---
  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";

  // --- FORM SUBMIT ---
  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data || data.length === 0) {
      message.error("Sizning savatingiz bo'sh!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstname") as string;
    const lastName = formData.get("lastname") as string;

    const newOrderPayload: OrderDataType = {
      shop_list: data,
      billing_address: {
        name: firstName || user?.name || "",
        surname: lastName || user?.surname || "",
      },
      extra_shop_info: {
        total: finalTotal, // Aniq hisoblangan summa
        method: paymentMethod,
      },
    };

    localStorage.setItem("latest_order", JSON.stringify(newOrderPayload));
    setOrderDetails(newOrderPayload);
    setIsModalOpen(true);
  };

  const handleTrackOrder = () => {
    localStorage.clear();
    // dispatch(clearCart()); // Agar redux tozalanadigan bo'lsa
    message.success("Buyurtma muvaffaqiyatli joylashtirilgan!");
    navigate("/");
  };

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20">
      <form
        onSubmit={handlePlaceOrder}
        className="flex flex-col md:flex-row gap-10"
      >
        {/* Billing Address qismi */}
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
                name="town"
                type="text"
                defaultValue={user?.billing_address?.town}
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
                name="street"
                type="text"
                defaultValue={user?.billing_address?.street_address}
                placeholder="Enter your street..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">&nbsp;</label>
              <input
                type="text"
                name="apartment"
                defaultValue={user?.billing_address?.extra_address}
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
                name="state"
                type="text"
                defaultValue={user?.billing_address?.state}
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
                name="zip"
                type="text"
                defaultValue={user?.billing_address?.zip}
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
                name="email"
                type="email"
                defaultValue={user?.email}
                placeholder="Enter your email..."
                className="border border-[#EAEAEA] rounded p-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-[#46A358]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-[#EAEAEA] rounded overflow-hidden">
                <span className="p-2 border border-[#46A358] bg-[#d2efd7] text-gray-500">
                  +998
                </span>
                <input
                  required
                  name="phone"
                  type="text"
                  defaultValue={user?.phone_number}
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
                className="border border-[#46A358] mb-2! p-3! rounded-[12px] flex items-center w-full sm:w-[50%]"
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
                value="bank-transfer"
                className="border border-[#46A358] mb-2! p-3! rounded-[12px] flex items-center w-full sm:w-[50%]"
              >
                Direct bank transfer
              </Radio>

              <Radio
                value="cash-on-delivery"
                className="border border-[#46A358] mb-2! p-3! rounded-[12px] flex items-center w-full sm:w-[50%]"
              >
                Cash on delivery
              </Radio>
            </Radio.Group>
          </div>

          <div className="md:flex hidden flex-col gap-2 mb-6">
            <label className="text-[15px] text-[#3D3D3D]">
              Enter your comment
            </label>
            <textarea
              name="comment"
              className="border border-[#EAEAEA] rounded p-2 h-[100px] focus:outline-[#46A358]"
            />
          </div>
          <button
            type="submit"
            className="w-full md:flex hidden items-center justify-center cursor-pointer bg-[#46A358] text-white py-3 rounded text-[16px] font-bold hover:bg-[#357c44] transition-all"
          >
            Place Order
          </button>
        </div>

        {/* --- YOUR ORDER QISMI (Prices dizayni bilan) --- */}
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

          {/* PRICES BO'LIMI (Prices.tsx kodi asosida) */}
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
                <h1 className="text-red-500 text-[14px] font-bold">
                  -${discountAmount.toFixed(2)}
                </h1>
              )}
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handlePlaceOrder} className="flex flex-col md:flex-row ">
        <button
          type="submit"
          className="w-full md:hidden flex items-center justify-center cursor-pointer bg-[#46A358] text-white py-3 rounded text-[16px] font-bold hover:bg-[#357c44] transition-all"
        >
          Place Order
        </button>
      </form>

      {/* --- MODAL QISMI (YANGILANGAN) --- */}
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
              ${orderDetails?.extra_shop_info?.total.toFixed(2)}
            </p>
          </div>
          <div className="">
            <p className="text-[12px] text-[#727272]">Payment Method</p>
            <p className="text-[14px] font-bold text-[#3D3D3D] capitalize">
              {orderDetails?.extra_shop_info?.method.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
          Order Details
        </h3>

        <div className="flex flex-col gap-3 mb-4 max-h-[250px] overflow-y-auto">
          {orderDetails?.shop_list?.map((item: ShopCartType) => (
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

        {/* --- MODAL ICHIDAGI PRICELAR (Prices.tsx uslubida) --- */}
        <div className="border-t pt-4 flex flex-col gap-3">
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

          <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#46A358]/50">
            <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total</h2>
            <h1 className="text-[#46A358] text-[20px] font-bold">
              ${orderDetails?.extra_shop_info?.total.toFixed(2)}
            </h1>
          </div>

          <div className="flex justify-end">
            {Boolean(coupon) && (
              <h1 className="text-red-500 text-[14px] font-bold">
                -${discountAmount.toFixed(2)}
              </h1>
            )}
          </div>
        </div>

        <p className="text-center text-[13px] text-[#727272] my-6">
          Your order is currently being processed. You will receive an order
          confirmation email shortly with the expected delivery date for your
          items.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleTrackOrder}
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
