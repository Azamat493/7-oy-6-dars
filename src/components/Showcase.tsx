import { Button, Carousel } from "antd";
import { useState } from "react";
import flower1 from "../assets/images/flower1.png";
import heroflower1 from "../assets/images/heroflower1.png";
import heroflower2 from "../assets/images/heroflower2.png";

const Showcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const contentStyle: React.CSSProperties = {
    height: "450px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#F5F5F5",
  };

  const slides = [
    {
      id: 1,
      subTitle: "WELCOME TO GREENSHOP",
      title: "LET'S MAKE A BETTER",
      highlight: "PLANET",
      description:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
      buttonText: "SHOP NOW",
      image: flower1,
    },
    {
      id: 2,
      subTitle: "WELCOME TO GREENSHOP",
      title: "LET'S LIVE IN A BETTER",
      highlight: "PLANET",
      description:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
      buttonText: "LET'S START",
      image: heroflower1,
    },
    {
      id: 3,
      subTitle: "WELCOME TO GREENSHOP",
      title: "LET'S OBSERVE A BETTER",
      highlight: "PLANET",
      description:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
      buttonText: "GET CREDITS",
      image: heroflower2,
    },
  ];

  return (
    <div className="w-[95%] max-w-[1550px] md:w-[90%] m-auto mt-4 rounded-2xl md:rounded-3xl overflow-hidden relative bg-[#F5F5F5]">
      <Carousel
        dots={false}
        autoplay
        pauseOnHover={true}
        dotPlacement="bottom"
        afterChange={(current) => setActiveSlide(current)}
        swipeToSlide={true}
        draggable={true}
      >
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              style={contentStyle}
              className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 md:px-16 !h-auto min-h-[450px] md:!h-[450px] py-6 md:py-0"
            >
              <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left w-full md:max-w-[60%] z-10">
                <p className="font-family font-medium text-[11px] sm:text-[14px] leading-[114%] tracking-widest uppercase text-[#3d3d3d] mb-1">
                  {slide.subTitle}
                </p>

                <h1 className="font-family text-[#3d3d3d] font-black text-[28px] sm:text-[50px] xl:text-[70px] leading-[110%] uppercase">
                  {slide.title}{" "}
                  <span className="text-[#46A358]">{slide.highlight}</span>
                </h1>
                <p className="text-[#727272] text-[12px] sm:text-[14px] w-[95%] md:w-[80%] mb-4 md:mb-6 leading-5 sm:leading-6">
                  {slide.description}
                </p>
                <Button
                  type="primary"
                  className="bg-[#46a358]! md:mb-0! mb-3! hover:bg-[#357a40]! w-35! h-10! rounded-md! font-family! font-bold! text-[14px]! md:text-[16px]! leading-[125%]! uppercase! text-[#fff]!"
                >
                  {slide.buttonText}
                </Button>
              </div>

              <div className="flex md:flex items-center justify-center w-full md:w-[40%] relative mt-6 md:mt-0 order-first md:order-last">
                <div className="absolute w-[80%] h-[80%] rounded-full blur-2xl z-0"></div>
                <img
                  src={slide.image}
                  alt="Flower"
                  className="relative z-10 w-full max-h-[180px] sm:max-h-[300px]  md:max-h-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-[10px] h-[10px] rounded-full transition-all duration-300
              ${
                activeSlide === index
                  ? "bg-[#46A358]"
                  : "bg-[#3d3d3d] opacity-30"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Showcase;
