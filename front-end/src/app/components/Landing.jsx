"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useAuthStore } from "../store/useAuthStore";
import { useLangStore } from "../store/useLangStore";
import useT from "../lib/useT";

export const Landing = () => {
  const { authUser } = useAuthStore();
  const { locale } = useParams();
  const setLang = useLangStore((s) => s.setLang);
  const t = useT();

  // sync locale with zustand
  useEffect(() => {
    if (!locale) return;
    setLang(locale);
  }, [locale, setLang]);

  return (
    <div className={`text-center w-full flex flex-col min-h-screen bg-[#D1D1D1]`}>
      <div className="relative overflow-hidden w-full flex-1 flex flex-col">
        
        {/* Background Shapes */}
        <div className={`${locale === "ar" ? "md:w-125 2xl:-bottom-50 xl:-right-60 lg:-right-50 lg:-bottom-70 md:-bottom-70 md:-right-50 -right-30 -bottom-30" :  "md:w-125 2xl:-bottom-50 xl:-left-60 lg:-left-50 lg:-bottom-70 md:-bottom-70 md:-left-50 -left-30 -bottom-30"} absolute  w-70`}>
          <Image
            src="/Group 1.svg"
            alt="Group 1"
            width={500}
            height={500}
          />
        </div>

        <div className={`${locale === "ar" ? "2xl:top-105 2xl:-left-4 xl:top-30 xl:-left-15 lg:top-70 lg:-left-15" : "2xl:top-105 2xl:-right-4 xl:top-30 xl:-right-15 lg:top-70 lg:-right-15" }  absolute  xl:w-[750px] lg:w-[600px] xl:h-[750px] lg:h-[600px] lg:block hidden`}>
          <Image
            src="/Ellipse 3 (1).svg"
            alt="Ellipse"
            width={750}
            height={750}
          />
        </div>

        {/* Hero */}
        <div className={`hero w-full flex-1 flex justify-between mx-auto items-stretch`}>
          
          {/* Left Part */}
          <div className={`part1 flex flex-col ${locale === "ar" ? "lg:items-end" : "lg:items-start"} items-center justify-center gap-5 w-full md:p-20 md:mt-0 -mt-15`}>
            
            <h1 className={` ${locale === "ar" ? "text-[#FC530A] xl:text-2xl lg:text-md md:text-xl font-bold text-xl" : "text-[#FC530A] xl:text-lg lg:text-md md:text-xl font-bold text-xl"}`} dir={locale === "ar" ? "rtl" : "ltr"}>
              {t("landing.badge")}
            </h1>

            <h2 className={` ${locale === "ar" ? "2xl:text-7xl xl:text-5xl lg:text-3xl md:text-5xl font-semibold text-black text-[32px] whitespace-nowrap" : "2xl:text-6xl xl:text-5xl lg:text-3xl md:text-5xl font-semibold text-black text-[32px] whitespace-nowrap"}`}>
              {t("landing.headline1")}
            </h2>

            <h3 className={`${locale === "ar" ? "2xl:text-9xl" : "2xl:text-8xl"} font-bold 2xl:text-8xl xl:text-7xl lg:text-5xl md:text-5xl text-black text-[36px] whitespace-nowrap md:mt-0 -mt-5`}>
              {t("landing.headline2")}{" "}
              <span className="text-[#FC530A]">
                {t("landing.Place")}
              </span>
            </h3>

            <p className={`${locale === "ar" ? "text-black/80 2xl:text-xl xl:text-sm lg:text-xs md:text-lg text-xs whitespace-nowrap" : "text-black/80 2xl:text-lg xl:text-sm lg:text-xs md:text-lg text-xs whitespace-nowrap"}`}>
              {t("landing.sub1")}
            </p>

            <p className={`${locale === "ar" ? "text-black/80 -mt-5 2xl:text-xl xl:text-sm lg:text-xs md:text-lg text-xs" : "text-black/80 -mt-5 2xl:text-lg xl:text-sm lg:text-xs md:text-lg text-xs"}`}>
              {t("landing.sub2")}
            </p>

            {/* Buttons */}
            <div className="flex gap-5 2xl:mt-5 xl:mt-2 justify-between">
              
            <Link href={`/${locale}/Services`}>
              <button
                className={`
                  ${locale === "ar" ? "xl:px-18 xl:py-5 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-lg lg:text-sm px-6 py-2 text-xs" : "xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4xl:text-md lg:text-sm px-6 py-2 text-xs"}
                  bg-[#FC530A] text-white
                  xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4
                  xl:text-md lg:text-sm px-6 py-2 text-xs
                  font-bold rounded-xl
                  transition-all duration-300
                  hover:bg-[#e84a08] hover:scale-105
                  active:scale-95
                  cursor-pointer
                `}
              >
                {t("landing.ctaPrimary")}
              </button>
              </Link>

              <Link href={`/${locale}/About`}>
                <button
                  className={`
                    ${locale === "ar" ? "xl:px-18 xl:py-5 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-lg lg:text-sm px-6 py-2 text-xs" : "xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-md lg:text-sm px-6 py-2 text-xs"}
                    border-2 border-[#FC530A]
                    xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4
                    xl:text-md lg:text-sm px-6 py-2 text-xs
                    text-black font-bold rounded-xl
                    transition-all duration-300
                    hover:bg-[#FC530A] hover:text-white
                    hover:scale-105
                    active:scale-95
                    cursor-pointer
                  `}
                >
                  {t("landing.ctaSecondary")}
                </button>
              </Link>

            </div>
          </div>

          {/* Right Part */}
          <div className={`${locale === "ar" ?"left-0  -scale-x-100":"right-0"} part2 lg:flex items-end 2xl:w-200 xl:w-175 lg:w-125 md:hidden absolute bottom-0 w-70 right-0`}>
            <Image
              src="/anime.svg"
              alt="Anime"
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
