import React from "react";
import blogheaderhi2KeX2m from "../assets/images/blog-header-hi2KeX2m.png";
import { useReduxDispatch } from "../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../redux/modal-store";

const MonetizeSection: React.FC = () => {
  const dispatch = useReduxDispatch(); // Dispatch ni chaqiramiz
  const openAuthModal = () => {
    dispatch(setAuthorizationModalVisibility());
  };
  return (
    <section className="py-7 bg-white font-sans">
      <div className="w-[90%] mx-auto ">
        <img
          src={blogheaderhi2KeX2m}
          alt=""
          className="rounded-[12px] mx-auto"
        />

        {/* 2-QISM: Matnlar va Button */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Monetize your content <br />
            with <span className="text-[#46A358]">GreenShop</span>
          </h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 px-4">
            GreenShop - a platform for buying and selling, publishing and
            monetizing all types of flowers: articles, notes, video, photos,
            podcasts or songs.
          </p>

          <button
            onClick={openAuthModal}
            className="bg-[#46a358] cursor-pointer hover:bg-[#3d8f4d] text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-green-500/30"
          >
            Join GreenShop
          </button>
        </div>
      </div>
    </section>
  );
};

export default MonetizeSection;
