import React from "react";
import blogheaderhi2KeX2m from "../assets/images/blog-header-hi2KeX2m.png";
import { useReduxDispatch } from "../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../redux/modal-store";

const MonetizeSection: React.FC = () => {
  const dispatch = useReduxDispatch();
  const openAuthModal = () => {
    dispatch(setAuthorizationModalVisibility());
  };
  return (
    <section className="py-5 sm:py-7 bg-white font-sans overflow-hidden">
      <div className="w-[95%] max-w-[1550px] sm:w-[90%] mx-auto">
        <img
          src={blogheaderhi2KeX2m}
          alt="GreenShop Banner"
          className="w-full h-auto object-cover rounded-[12px] mx-auto"
        />

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl mt-4 sm:mt-5 font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Monetize your content <br className="hidden sm:block" />
            with <span className="text-[#46A358]">GreenShop</span>
          </h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 sm:mb-8 px-0 sm:px-4">
            GreenShop - a platform for buying and selling, publishing and
            monetizing all types of flowers: articles, notes, video, photos,
            podcasts or songs.
          </p>

          <button
            onClick={openAuthModal}
            className="bg-[#46a358] cursor-pointer hover:bg-[#3d8f4d] text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 text-sm sm:text-base rounded-lg transition duration-300 shadow-lg shadow-green-500/30 w-full sm:w-auto"
          >
            Join GreenShop
          </button>
        </div>
      </div>
    </section>
  );
};

export default MonetizeSection;