import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { message, Modal } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SolutionOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { AuthType } from "../@types/AuthType";
import Wishlist from "../components/profile/Wishlist";
import { useReduxDispatch } from "../hooks/useRedux/useRedux";
import { logout } from "../redux/user-slice";
import Address from "../components/profile/Address";
import MyProducts from "../components/profile/MyProducts";
import TrackOrder from "../components/profile/TrackOrder";
import { useUpdateUser } from "../hooks/useQuery/useQueryAction/useQueryAction";
import CreateBlog from "../components/CreateBlog";

const DEFAULT_PROFILE_IMG =
  "https://github.com/Azamat493/images/blob/main/dc929a7e76e94b7db700caab31e58cdb.jpg?raw=true";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { tab } = useParams();

  const { mutate: updateUserMutation, isPending } = useUpdateUser();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const activeTab = tab || "account-details";

  const [userData, setUserData] = useState<AuthType | null>(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [photoUrlInput, setPhotoUrlInput] = useState<string>("");

  const [previewImage, setPreviewImage] = useState<string>(
    userData?.profile_photo || DEFAULT_PROFILE_IMG,
  );

  useEffect(() => {
    if (userData?.profile_photo) {
      setPreviewImage(userData.profile_photo);
      setPhotoUrlInput(userData.profile_photo);
    }
  }, [userData]);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Faqat rasm yuklash mumkin!");
      return;
    }

    if (file.size > 1024 * 1024) {
      message.warning("Rasm hajmi 1MB dan kichik bo'lishi kerak.");
    }

    setProfileFile(file);

    setPhotoUrlInput("");
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPhotoUrlInput(url);
    setProfileFile(null);

    if (url.trim() !== "") {
      setPreviewImage(url);
    } else {
      setPreviewImage(DEFAULT_PROFILE_IMG);
    }
  };

  const handleAccountDetailsSave = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!userData?._id) return;

    const form = e.currentTarget;
    const rawFormData = new FormData(form);

    try {
      let finalPhotoString = userData.profile_photo || DEFAULT_PROFILE_IMG;

      if (profileFile) {
        finalPhotoString = await getBase64(profileFile);
      } else if (photoUrlInput && photoUrlInput !== userData.profile_photo) {
        finalPhotoString = photoUrlInput;
      }

      const payload = {
        _id: userData._id,
        name: rawFormData.get("firstname") as string,
        surname: rawFormData.get("lastname") as string,
        email: rawFormData.get("email") as string,
        phone_number: rawFormData.get("phone") as string,
        username: rawFormData.get("username") as string,
        profile_photo: finalPhotoString,
      };

      updateUserMutation(payload, {
        onSuccess: () => {
          message.success("O'zgarishlar saqlandi!");
          const updatedUser = { ...userData, ...payload } as AuthType;
          setUserData(updatedUser);
          Cookies.set("user", JSON.stringify(updatedUser));
          setProfileFile(null);
        },
        onError: (err: any) => {
          console.error("Error:", err);
          message.error("Xatolik yuz berdi!");
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const menuItems = [
    {
      key: "account-details",
      label: "Account Details",
      icon: <UserOutlined />,
    },
    { key: "my-products", label: "My Products", icon: <ShoppingOutlined /> },
    { key: "address", label: "Address", icon: <EnvironmentOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { key: "create-blog", label: "Create Blog", icon: <EditOutlined /> },
    { key: "track-order", label: "Track Order", icon: <SolutionOutlined /> },
  ];

  const handleTabClick = (path: string) => navigate(`/profile/${path}`);

  const confirmLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    dispatch(logout());
    message.success("Tizimdan chiqildi!");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-[30%] lg:w-[25%] bg-[#FBFBFB] h-fit py-4 rounded-md">
        <h2 className="text-[18px] font-bold text-[#3D3D3D] px-6 mb-4">
          My Account
        </h2>
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={`cursor-pointer flex items-center gap-3 px-6 py-3 text-[15px] transition-all ${
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
            className="cursor-pointer flex items-center gap-3 px-6 py-3 text-[#727272] hover:text-red-500 border-t mt-4 pt-4"
          >
            <span className="text-[18px]">
              <LogoutOutlined />
            </span>{" "}
            Log out
          </li>
        </ul>
      </div>

      <div className="w-full md:w-[70%] lg:w-[75%]">
        {activeTab === "account-details" && (
          <div>
            <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-8">
              Personal Information
            </h2>
            <form onSubmit={handleAccountDetailsSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label>First Name *</label>
                  <input
                    required
                    name="firstname"
                    defaultValue={userData?.name}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Last Name *</label>
                  <input
                    required
                    name="lastname"
                    defaultValue={userData?.surname}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Email *</label>
                  <input
                    required
                    name="email"
                    type="email"
                    defaultValue={userData?.email}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Phone Number *</label>
                  <div className="flex border border-[#EAEAEA] rounded overflow-hidden">
                    <span className="p-2 bg-[#F9F9F9] border-r">+998</span>
                    <input
                      required
                      name="phone"
                      defaultValue={userData?.phone_number}
                      className="p-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label>Username *</label>
                  <input
                    required
                    name="username"
                    defaultValue={userData?.username}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    Photo URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={photoUrlInput}
                    onChange={handleUrlInputChange}
                    className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[15px] text-[#3D3D3D]">
                    Photo Preview
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_PROFILE_IMG;
                        }}
                      />
                    </div>

                    <label className="cursor-pointer bg-[#F9F9F9] border border-[#EAEAEA] text-[#3D3D3D] px-4 py-2 rounded text-sm hover:bg-gray-100 transition-all">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="text-[13px] text-black">
                      Yoki rasm URLini yuqoriga yozing
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-[#46A358] text-white font-bold py-3 px-8 rounded hover:bg-[#357c44] disabled:opacity-70"
              >
                {isPending ? "Saving..." : "Save changes"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "address" && (
          <Address user={userData} setUser={setUserData} />
        )}
        {activeTab === "my-products" && <MyProducts />}
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "create-blog" && <CreateBlog />}
        {activeTab === "track-order" && <TrackOrder />}
      </div>

      <Modal
        open={showLogoutModal}
        onOk={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        okText="Log out"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        styles={{
          mask: {
            backdropFilter: "none",
            backgroundColor: "rgba(0,0,0,0.45)",
          },
        }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default Profile;
