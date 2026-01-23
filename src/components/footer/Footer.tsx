import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Ctm6W3Jq from "../../assets/images/1-Ctm6W3Jq.png";
import BF1Oo3xK from "../../assets/images/2-BF1Oo3xK.png";
import BispicH from "../../assets/images/3-Bi-spicH.png";
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-20 border-gray-100 pt-10 font-sans">
      <div className="w-[90%] max-w-[1550px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-gray-100 ">
          <div className="flex flex-col items-start pr-4 border-r-0 lg:border-r border-gray-100 last:border-r-0">
            <div className="mb-4 relative">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <img src={Ctm6W3Jq} alt="" className="mb-3" />
              </div>
            </div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-2">
              Garden Care
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          <div className="flex flex-col items-start pr-4 border-r-0 lg:border-r border-gray-100 last:border-r-0">
            <div className="mb-4 relative">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <img src={BF1Oo3xK} alt="" className="mb-3" />
              </div>
            </div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-2">
              Plant Renovation
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          <div className="flex flex-col items-start pr-4">
            <div className="mb-4 relative">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <img src={BispicH} alt="" className="mb-3" />
              </div>
            </div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-2">
              Watering Garden
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-4">
              Would you like to join newsletters?
            </h4>
            <div className="flex w-full mb-4 shadow-sm rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="enter your email address..."
                className="flex-1 min-w-[120px] p-3 text-sm border border-gray-200 focus:outline-none focus:border-green-500 rounded-l-md"
              />
              <button className="bg-[#46a358] cursor-pointer text-white px-6 py-3 font-bold text-sm rounded-r-md hover:bg-[#357a40] transition-colors">
                Join
              </button>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              We usually post offers and challenges in newsletter. We're your
              online houseplant destination. We offer a wide range of
              houseplants and accessories shipped directly from our (green)house
              to yours!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  border-b border-gray-100">
          <div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-4">
              MY ACCOUNT
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Brand Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-4">
              HELP & GUIDE
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-4">
              CATEGORIES
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#46A358]">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-4">
              SOCIAL MEDIA
            </h4>
            <div className="flex space-x-3 mb-8">
              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 cursor-pointer transition">
                <Facebook size={16} />
              </div>
              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 cursor-pointer transition">
                <Instagram size={16} />
              </div>
              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 cursor-pointer transition">
                <Twitter size={16} />
              </div>
              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 cursor-pointer transition">
                <Linkedin size={16} />
              </div>
              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 cursor-pointer transition">
                <Youtube size={16} />
              </div>
            </div>

            <h4 className="font-bold text-[17px] leading-[94%] text-[#3d3d3d] font-family mb-4">
              WE ACCEPT
            </h4>
            <div className="flex items-center gap-4">
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-6"
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="MasterCard"
                  className="h-6"
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-6"
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                  alt="Amex"
                  className="h-6"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 GreenShop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
