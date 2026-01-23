import React from "react";
import x9mMEaU from "../assets/images/2-6x9mMEaU.png";
import Bhbx3ro7 from "../assets/images/1-Bhbx3ro7.png";
import Ellipse8 from "../assets/images/Ellipse8.png";
import Ellipse7 from "../assets/images/Ellipse7.png";

interface PlantData {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface PlantPromoCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const promoData: PlantData[] = [
  {
    id: 1,
    title: "SUMMER CACTUS & SUCCULENTS",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants",
    image: Bhbx3ro7,
    link: "/shop/cactus",
  },
  {
    id: 2,
    title: "STYLING TRENDS & MUCH MORE",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants",
    image: x9mMEaU,
    link: "/shop/styling",
  },
];

const PlantPromoCard: React.FC<PlantPromoCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="relative  flex flex-col sm:flex-row items-center justify-between border border-gray-100 rounded bg-[#fbfbfb] p-6 shadow-sm overflow-hidden h-full">
      <div className="absolute z-20 bottom-[-20px] left-[-0px]">
        <img src={Ellipse8} alt="" />
      </div>
      <div className="absolute z-20 bottom-[-20px] left-[2px]">
        <img src={Ellipse7} alt="" />
      </div>
      <div className="absolute z-20 bottom-[-10px] left-[-10px]" />

      <div className="z-0 w-full sm:w-1/3 flex justify-center sm:justify-start mb-4 sm:mb-0">
        <img
          src={image}
          alt={title}
          className="  object-contain transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="z-10 w-full sm:w-2/3 flex flex-col items-center sm:items-end text-center sm:text-right pl-0 sm:pl-4">
        <h3 className="font-family font-black text-[18px] leading-[133%] uppercase text-right text-[#3d3d3d] mb-2  max-w-[200px]">
          {title}
        </h3>
        <p className="font-family font-normal text-[14px] leading-[171%] text-right text-[#727272] mb-5  max-w-[280px]">
          {description}
        </p>

        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 bg-[#46a358] hover:bg-[#357a40] transition-colors font-family font-medium text-[14px] leading-[143%] text-[#fff] px-5 py-2.5 rounded-md min-w-[140px]"
        >
          Find More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const PlantPromoSection: React.FC = () => {
  return (
    <section className="w-[90%] max-w-[1550px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {promoData.map((item) => (
          <PlantPromoCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};

export default PlantPromoSection;
