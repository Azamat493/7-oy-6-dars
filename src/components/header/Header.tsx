import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { Bell, Menu, X } from "lucide-react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../../redux/modal-store";
import { Drawer } from "antd";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useReduxDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuth } = useReduxSelector((state) => state.userSlice);

  return (
    <div className="py-3 border-b border-[#00800043] sticky top-0 bg-white z-50">
      <div className="w-[90%] max-w-[1550px] m-auto flex items-center justify-between">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-[120px] sm:w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-5">
          <Link
            to={"/"}
            className={`${pathname === "/" && "text-[#46A358] font-bold"} font-normal text-[16px] text-[#3d3d3d] hover:text-[#46A358] transition-colors`}
          >
            Home
          </Link>
          <Link
            to={"/blog"}
            className={`${pathname === "/blog" && "text-[#46A358] font-bold"} font-normal text-[16px] text-[#3d3d3d] hover:text-[#46A358] transition-colors`}
          >
            Blog
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="cursor-pointer hover:fill-[#46A358]"
          >
            <path
              d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z"
              fill="#3D3D3D"
            />
          </svg>
          <Bell className="cursor-pointer hover:text-[#46A358]" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="cursor-pointer hover:fill-[#46A358]"
          >
            <path
              d="M17.1558 20.25H9.89066C6.78905 20.25 4.26569 17.7267 4.26569 14.6251V8.85947C4.26569 5.9762 2.82861 3.30739 0.421544 1.72031C-0.0107343 1.43531 -0.130077 0.853876 0.154921 0.421598C0.439919 -0.0107278 1.02131 -0.130118 1.45368 0.154974C2.82776 1.06097 3.94254 2.2559 4.73969 3.63167C4.91195 3.82466 6.30104 5.29699 8.57821 5.29699H19.3738C22.3191 5.24191 24.6245 8.19769 23.8544 11.0406L22.6117 15.9939C21.9829 18.4998 19.7394 20.25 17.1558 20.25ZM5.90415 6.64234C6.06001 7.36238 6.14068 8.10483 6.14068 8.85947V14.6251C6.14068 16.6928 7.82292 18.375 9.89066 18.375H17.1558C18.8782 18.375 20.3739 17.2082 20.793 15.5376L22.0358 10.5844C22.4933 8.89509 21.1233 7.13931 19.3738 7.17198H8.57817C7.54828 7.17198 6.65185 6.94993 5.90415 6.64234ZM9.42191 22.8281C9.42191 22.1809 8.89724 21.6563 8.25004 21.6563C6.69511 21.7182 6.69647 23.9387 8.25004 24C8.89724 24 9.42191 23.4753 9.42191 22.8281ZM18.75 22.8281C18.75 22.1809 18.2253 21.6563 17.5781 21.6563C16.0232 21.7182 16.0245 23.9387 17.5781 24C18.2253 24 18.75 23.4753 18.75 22.8281ZM20.3113 9.98446C20.3113 9.46668 19.8916 9.04697 19.3738 9.04697H8.95316C7.7093 9.09647 7.71023 10.8729 8.95316 10.922H19.3738C19.8916 10.922 20.3113 10.5022 20.3113 9.98446Z"
              fill="#3D3D3D"
            />
          </svg>
          <button
            onClick={() => {
              if (isAuth) {
                return navigate("/profile");
              }
              dispatch(setAuthorizationModalVisibility());
            }}
            className="bg-[#46a358] hover:bg-[#3d8f4d] hover:-translate-y-[1px] hover:shadow-md transition-all duration-200 rounded-md cursor-pointer font-medium text-base text-white p-[7px_25px]"
          >
            {user ? user.name : "Login"}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z"
              fill="#3D3D3D"
            />
          </svg>
          <Menu
            className="w-7 h-7 text-[#3D3D3D] cursor-pointer"
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>
      </div>

      <Drawer
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        closable={false}
        styles={{ body: { padding: 0 } }}
        size={280}
        title={
          <div className="flex items-center justify-between w-full">
            <img src={Logo} alt="Logo" className="w-[100px]" />
            <X
              className="w-6 h-6 text-[#3d3d3d] cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setIsDrawerOpen(false)}
            />
          </div>
        }
      >
        <div className="flex flex-col p-5 gap-4">
          <Link
            to={"/"}
            onClick={() => setIsDrawerOpen(false)}
            className={`${pathname === "/" ? "bg-[#46A358] text-white" : "text-[#3d3d3d]"} p-3 rounded-md font-medium text-[16px] transition-all`}
          >
            Home
          </Link>
          <Link
            to={"/blog"}
            onClick={() => setIsDrawerOpen(false)}
            className={`${pathname === "/blog" ? "bg-[#46A358] text-white" : "text-[#3d3d3d]"} p-3 rounded-md font-medium text-[16px] transition-all`}
          >
            Blog
          </Link>

          <div className="h-[1px] bg-gray-200 my-2"></div>

          <div className="flex items-center gap-4 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md">
            <Bell size={20} />
            <span className="text-[#3d3d3d] font-medium">Notifications</span>
          </div>

          <div className="flex items-center gap-4 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.1558 20.25H9.89066C6.78905 20.25 4.26569 17.7267 4.26569 14.6251V8.85947C4.26569 5.9762 2.82861 3.30739 0.421544 1.72031C-0.0107343 1.43531 -0.130077 0.853876 0.154921 0.421598C0.439919 -0.0107278 1.02131 -0.130118 1.45368 0.154974C2.82776 1.06097 3.94254 2.2559 4.73969 3.63167C4.91195 3.82466 6.30104 5.29699 8.57821 5.29699H19.3738C22.3191 5.24191 24.6245 8.19769 23.8544 11.0406L22.6117 15.9939C21.9829 18.4998 19.7394 20.25 17.1558 20.25ZM5.90415 6.64234C6.06001 7.36238 6.14068 8.10483 6.14068 8.85947V14.6251C6.14068 16.6928 7.82292 18.375 9.89066 18.375H17.1558C18.8782 18.375 20.3739 17.2082 20.793 15.5376L22.0358 10.5844C22.4933 8.89509 21.1233 7.13931 19.3738 7.17198H8.57817C7.54828 7.17198 6.65185 6.94993 5.90415 6.64234ZM9.42191 22.8281C9.42191 22.1809 8.89724 21.6563 8.25004 21.6563C6.69511 21.7182 6.69647 23.9387 8.25004 24C8.89724 24 9.42191 23.4753 9.42191 22.8281ZM18.75 22.8281C18.75 22.1809 18.2253 21.6563 17.5781 21.6563C16.0232 21.7182 16.0245 23.9387 17.5781 24C18.2253 24 18.75 23.4753 18.75 22.8281ZM20.3113 9.98446C20.3113 9.46668 19.8916 9.04697 19.3738 9.04697H8.95316C7.7093 9.09647 7.71023 10.8729 8.95316 10.922H19.3738C19.8916 10.922 20.3113 10.5022 20.3113 9.98446Z"
                fill="#3D3D3D"
              />
            </svg>
            <span className="text-[#3d3d3d] font-medium">My Cart</span>
          </div>

          <button
            onClick={() => {
              if (isAuth) {
                return navigate("/profile");
              }
              dispatch(setAuthorizationModalVisibility());
            }}
            className="bg-[#46a358] hover:bg-[#3d8f4d] active:scale-95 transition-all mt-4 rounded-md cursor-pointer font-medium text-base text-white py-2 w-full flex items-center justify-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            {user ? user.name : "Login"}
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
