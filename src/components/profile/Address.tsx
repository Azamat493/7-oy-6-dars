import React from "react";
import Cookies from "js-cookie";
import { message } from "antd";
import type { AuthType } from "../../@types/AuthType";

interface AddressProps {
  user: AuthType | null;
  setUser: (user: AuthType) => void;
}

const Address: React.FC<AddressProps> = ({ user, setUser }) => {
  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newAddress = {
      country: formData.get("country") as string,
      town: formData.get("town") as string,
      street_address: formData.get("street") as string,
      extra_address: formData.get("extra_address") as string,
      state: formData.get("state") as string,
      zip: formData.get("zip") as string,
    };

    const updatedUser = {
      ...user,
      billing_address: {
        ...user?.billing_address,
        ...newAddress,
      },
    } as AuthType;

    Cookies.set("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    message.success("Address saved successfully!");
  };

  return (
    <div>
      <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-8">
        Billing Address
      </h2>

      <form onSubmit={handleSaveAddress}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-[#3D3D3D]">
              Country / Region <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="country"
              type="text"
              defaultValue={user?.billing_address?.country}
              placeholder="Select your country / region..."
              className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
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
              placeholder="Type your town / city..."
              className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-[#3D3D3D]">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="street"
              type="text"
              defaultValue={user?.billing_address?.street_address}
              placeholder="Type your street address..."
              className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-[#3D3D3D]">Extra address</label>
            <input
              name="extra_address"
              type="text"
              defaultValue={user?.billing_address?.extra_address}
              placeholder="Type your extra address..."
              className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-[#3D3D3D]">
              State <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="state"
              type="text"
              defaultValue={user?.billing_address?.state}
              placeholder="Type your state..."
              className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
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
              placeholder="Type your zip..."
              className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#46A358] text-white font-bold py-3 px-8 rounded mt-4 hover:bg-[#357c44] transition-all cursor-pointer w-full md:w-auto"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default Address;
