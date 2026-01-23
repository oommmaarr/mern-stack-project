import Image from "next/image";
export const Landing = () => {
  return (
    <div className="text-center w-full flex flex-col min-h-screen bg-[#D1D1D1]">
      <div className="relative overflow-hidden w-full flex-1 flex flex-col">
        <div className="absolute md:w-125 2xl:-bottom-50 xl:-left-60 lg:-left-50 lg:-bottom-70 md:-bottom-70 md:-left-50 -left-30 -bottom-30 w-70">
          <Image
            src={"./Group 1.svg"}
            alt="Group1.svg"
            width={500}
            height={500}
          />
        </div>

        <div className="absolute 2xl:top-65 2xl:-right-4 xl:top-30 xl:-right-15 lg:top-70 lg:-right-15 xl:w-[750px] lg:w-[600px] xl:h-[750px] lg:h-[600px] lg:block hidden">
          <Image
            src={"./Ellipse 3 (1).svg"}
            alt="Ellipse3.svg"
            width={750}
            height={750}
          />
        </div>

        <div className="hero w-full flex-1 flex justify-between mx-auto items-stretch">
          <div className="part1 flex flex-col lg:items-start items-center justify-center gap-5 w-full md:p-20 md:mt-0 -mt-15">
            <h1 className="text-[#FC530A] xl:text-lg lg:text-md md:text-xl font-bold text-xl">#1 in Egypt</h1>
            <h2 className="2xl:text-6xl xl:text-5xl lg:text-3xl md:text-5xl font-semibold text-black text-[32px] whitespace-nowrap">
              All Your Services
            </h2>
            <h3 className="font-bold 2xl:text-8xl xl:text-7xl lg:text-5xl md:text-5xl text-black text-[36px] whitespace-nowrap md:mt-0 -mt-5">
              In <span className="text-[#FC530A]">One Place.</span>
            </h3>
            <p className="text-black/80 2xl:text-lg xl:text-sm lg:text-xs md:text-lg text-xs whitespace-nowrap ">
              Game Top-Ups – Social Media Services – Digital Solutions
            </p>
            <p className="text-black/80 -mt-5 2xl:text-lg xl:text-sm lg:text-xs md:text-lg text-xs">
              Fast Delivery & 24/7 Support
            </p>
            <div className="flex gap-5 2xl:mt-5 xl:mt-2 justify-between">
              <button
                className="
                bg-[#FC530A] text-white xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 whitespace-nowrap md:py-4 xl:text-md lg:text-sm px-6 py-2 text-xs font-bold rounded-xl
                cursor-pointer z-10
                transition-all duration-300 ease-in-out
                hover:bg-[#e84a08]
                hover:scale-105
                hover:shadow-xl
                active:scale-95
              "
              >
                Get Started
              </button>

              <button
                className="
                  border-2 border-[#FC530A] xl:px-12 xl:py-4 lg:px-8 lg:py-3 xl:text-md whitespace-nowrap lg:text-sm text-xs md:px-12 md:py-4 px-6  py-2 text-black font-bold rounded-xl
                  cursor-pointer z-10
                  transition-all duration-300 ease-in-out
                  hover:bg-[#FC530A]
                  hover:text-white
                  hover:scale-105
                  hover:shadow-xl
                  active:scale-95
                "
              >
                Learn More
              </button>

            </div>
          </div>

          <div className="part2 lg:flex items-end 2xl:w-200 xl:w-175 lg:w-125 md:hidden absolute bottom-0 w-70 right-0">
            <Image
              src={"./anime.svg"}
              alt="anime.svg"
              width={1300}
              height={1300}
              className="object-contain z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
