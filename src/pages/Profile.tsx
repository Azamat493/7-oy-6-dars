import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { message, Upload, Button, Modal } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SolutionOutlined,
  LogoutOutlined,
  UploadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import type { AuthType } from "../@types/AuthType";

// --- REDUX IMPORTLARI ---
import { useReduxDispatch } from "../hooks/useRedux/useRedux";
import { logout } from "../redux/user-slice";
import Address from "../components/Address";

// --- ADDRESS KOMPONENTINI IMPORT QILISH ---
// Agar alohida fayl qilib yaratgan bo'lsangiz:

// Agar yaratmagan bo'lsangiz, uni ushbu faylning eng pastiga yozib qo'yish mumkin,
// lekin alohida fayl tavsiya etiladi.

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { tab } = useParams();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const activeTab = tab || "account-details";

  // 1. STATE ORQALI USERNI BOSHQARISH (MUHIM O'ZGARISH)
  // Cookie dan boshlang'ich qiymatni olamiz
  const [userData, setUserData] = useState<AuthType | null>(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const menuItems = [
    { key: "account-details", label: "Account Details", icon: <UserOutlined /> },
    { key: "my-products", label: "My Products", icon: <ShoppingOutlined /> },
    { key: "address", label: "Address", icon: <EnvironmentOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { key: "track-order", label: "Track Order", icon: <SolutionOutlined /> },
  ];

  const confirmLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    dispatch(logout());
    message.success("Muvaffaqiyatli tizimdan chiqildi!");
    setShowLogoutModal(false);
    navigate("/");
  };

  // --- ACCOUNT DETAILS UCHUN SAVE FUNCTION ---
  const handleAccountDetailsSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedUser = {
      ...userData, // Eski ma'lumotlarni saqlab qolish
      name: formData.get("firstname"),
      surname: formData.get("lastname"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
      username: formData.get("username"),
    } as AuthType;

    // Cookieni yangilash
    Cookies.set("user", JSON.stringify(updatedUser));
    // Stateni yangilash (sahifa yangilanmasdan o'zgarishi uchun)
    setUserData(updatedUser);
    
    message.success("Changes saved successfully!");
  };

  const handleTabClick = (path: string) => {
    navigate(`/profile/${path}`);
  };

  return (
    <div className="w-[90%] max-w-[1200px] m-auto mt-10 mb-20 flex flex-col md:flex-row gap-10">
      {/* SIDEBAR */}
      <div className="w-full md:w-[30%] lg:w-[25%] bg-[#FBFBFB] h-fit py-4 rounded-md">
        <h2 className="text-[18px] font-bold text-[#3D3D3D] px-6 mb-4">
          My Account
        </h2>
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={`cursor-pointer flex items-center gap-3 px-6 py-3 text-[15px] transition-all 
                ${
                  activeTab === item.key
                    ? "text-[#46A358] font-bold border-l-[5px] border-[#46A358] bg-white pl-[19px]"
                    : "text-[#727272] hover:text-[#46A358]"
                }`}
            >
              <span className="text-[18px]">{item.icon}</span>
              {item.label}
            </li>
          ))}

          <li
            onClick={() => setShowLogoutModal(true)}
            className="cursor-pointer flex items-center gap-3 px-6 py-3 text-[15px] text-[#727272] hover:text-red-500 transition-all border-t mt-4 pt-4"
          >
            <span className="text-[18px]">
              <LogoutOutlined />
            </span>
            Log out
          </li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="w-full md:w-[70%] lg:w-[75%]">
        
        {/* --- ACCOUNT DETAILS (SIZNING KODINGIZ QAYTARILDI) --- */}
        {activeTab === "account-details" && (
          <div>
            <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-8">
              Personal Information
            </h2>

            <form onSubmit={handleAccountDetailsSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="firstname"
                    type="text"
                    // user?.name o'rniga userData?.name ishlatilmoqda
                    defaultValue={userData?.name} 
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
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
                    defaultValue={userData?.surname}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    defaultValue={userData?.email}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-[#EAEAEA] rounded overflow-hidden hover:border-[#46A358]">
                    <span className="p-2 border-r border-[#EAEAEA] bg-[#F9F9F9] text-gray-500">
                      +998
                    </span>
                    <input
                      required
                      name="phone"
                      type="text"
                      defaultValue={userData?.phone_number}
                      className="p-2 w-full focus:outline-none text-[#3D3D3D]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="username"
                    type="text"
                    defaultValue={userData?.username || ""}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <Upload
                      maxCount={1}
                      showUploadList={false}
                      beforeUpload={() => false}
                    >
                      <Button
                        icon={<UploadOutlined />}
                        className="text-[#46A358] border-[#46A358] hover:text-white! hover:bg-[#46A358]!"
                      >
                        Upload
                      </Button>
                    </Upload>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#46A358] text-white font-bold py-3 px-8 rounded mt-4 hover:bg-[#357c44] transition-all cursor-pointer"
              >
                Save changes
              </button>
            </form>
          </div>
        )}

        {/* --- YANGI ADDRESS COMPONENT --- */}
        {activeTab === "address" && (
           <Address user={userData} setUser={setUserData} />
        )}

        {activeTab === "my-products" && (
          <div>My Products component will be here</div>
        )}
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 text-red-500">
            <ExclamationCircleFilled /> Confirm Logout
          </div>
        }
        open={showLogoutModal}
        onOk={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
        okText="Log out"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        centered
      >
        <p className="text-[#3D3D3D]">
          Are you sure you want to log out from your account?
        </p>
      </Modal>
    </div>
  );
};

export default Profile;