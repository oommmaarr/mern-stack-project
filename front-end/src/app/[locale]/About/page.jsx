"use client";
import Image from "next/image";
import useT from "../../lib/useT";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect, useState } from "react";
export const About = () => {
  const { authUser } = useAuthStore();
  const t = useT();
  const { locale } = useParams();

  return (
    <div className="relative w-full min-h-screen bg-linear-to-br from-[#2D1810] via-[#3D2418] to-[#1A0F0A] overflow-hidden">
      {/* Background decorative elements */}
      <div
        className={`absolute md:w-125 2xl:-bottom-50 ${locale === "ar" ? "xl:-right-60 lg:-right-50 md:-right-50 -right-30" : "xl:-left-60 lg:-left-50 md:-left-50 -left-30"} lg:-bottom-70 md:-bottom-70 -bottom-30 w-70`}
      >
        <Image src={"/Group 1.svg"} alt="Decoration" width={500} height={500} />
      </div>

      <div
        className={`absolute 2xl:top-105 ${locale === "ar" ? "2xl:-left-10 xl:-left-15 lg:-left-10" : "2xl:-right-10 xl:-right-15 lg:-right-10"} xl:top-90 lg:top-80 xl:w-[750px] lg:w-[550px] xl:h-[750px] lg:h-[600px] lg:block hidden`}
      >
        <Image
          src={"/Ellipse 3 (1).svg"}
          alt="Light Effect"
          width={750}
          height={750}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto">
        <div
          className={`flex flex-col lg:flex-row gap-12 items-center min-h-screen md:px-16 px-6 ${locale === "ar" ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Left side - Content */}
          <div
            className={`text-white space-y-8 md:mt-40 mt-30 ${locale === "ar" ? "text-right" : "text-left"}`}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {/* Badge */}
            <div
              className={`flex ${locale === "ar" ? "flex-row-reverse" : ""} items-center gap-3 bg-white w-fit px-3 py-1.5 rounded-md`}
            >
              <span className="bg-orange-500 text-white px-4 py-1.5 xl:text-sm md:text-xs text-[8px] sm:whitespace-nowrap font-bold rounded uppercase tracking-wider">
                {t("about.badgeLabel")}
              </span>
              <span className="text-gray-600 xl:text-sm md:text-xs text-[8px] sm:whitespace-nowrap font-semibold">
                {t("about.badgeSub")}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-2xl  md:text-4xl lg:text-2xl 2xl:text-4xl xl:text-3xl font-bold leading-tight">
              {t("about.heading")}
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-[11px] md:text-sm lg:text-sm leading-relaxed max-w-2xl">
              {t("about.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center lg:justify-start justify-center gap-4 pt-4">
              {authUser.role === "admin" ? (
                <Link href={`/${locale}/Dashboard`}>
                  <button
                    className={`${locale === "ar" ? "xl:px-18 xl:py-5 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-lg lg:text-sm px-6 py-2 text-xs" : "xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4xl:text-md lg:text-sm px-6 py-2 text-xs"} bg-[#FC530A] text-white xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 whitespace-nowrap md:py-4 xl:text-md lg:text-sm px-6 py-2 text-xs font-bold rounded-xl
                cursor-pointer z-10
                transition-all duration-300 ease-in-out
                hover:bg-[#e84a08]
                hover:scale-105
                hover:shadow-xl
                active:scale-95`}
                  >
                    {t("about.dashboard")}
                  </button>
                </Link>
              ) : (
                <Link href={`/${locale}/Orders`}>
                  <button
                    className={`${locale === "ar" ? "xl:px-18 xl:py-5 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-lg lg:text-sm px-6 py-2 text-xs" : "xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4xl:text-md lg:text-sm px-6 py-2 text-xs"} bg-[#FC530A] text-white xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 whitespace-nowrap md:py-4 xl:text-md lg:text-sm px-6 py-2 text-xs font-bold rounded-xl
                cursor-pointer z-10
                transition-all duration-300 ease-in-out
                hover:bg-[#e84a08]
                hover:scale-105
                hover:shadow-xl
                active:scale-95`}
                  >
                    {t("about.placeOrder")}
                  </button>
                </Link>
              )}

              <Link href={`/${locale}/Services`}>
                <button
                  className={`  ${locale === "ar" ? "xl:px-18 xl:py-5 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-lg lg:text-sm px-6 py-2 text-xs" : "xl:px-12 xl:py-4 lg:px-8 lg:py-3 md:px-12 md:py-4 xl:text-md lg:text-sm px-6 py-2 text-xs"} border-2 border-[#FC530A] xl:px-12 xl:py-4 lg:px-8 lg:py-3 xl:text-md whitespace-nowrap lg:text-sm text-xs md:px-12 md:py-4 px-6  py-2 text-white font-bold rounded-xl
                  cursor-pointer z-10
                  transition-all duration-300 ease-in-out
                  hover:bg-[#FC530A]
                  hover:text-white
                  hover:scale-105
                  hover:shadow-xl
                  active:scale-95`}
                >
                  {t("about.viewServices")}
                </button>
              </Link>
            </div>

            {/* Features list */}
            <div className="space-y-4 pt-8 border-t xl:text-base md:text-sm text-xs border-white/10">
              {t("about.features").map((feature, index) => (
                <div
                  key={index}
                  className={`flex ${locale === "ar" ? "flex-row-reverse" : ""} items-center gap-3`}
                >
                  <div className="xl:w-6 xl:h-6 w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visuals */}
          <div
            className={`part2 md:flex items-end 2xl:w-200 xl:w-175 lg:w-125 absolute sm:opacity-100 hidden bottom-0 w-70 ${locale === "ar" ? "left-0 -scale-x-100" : "right-0"}`}
          >
            {/* Anime character image */}
            <Image
              src={"/anime.svg"}
              alt="Service Character"
              width={1300}
              height={1300}
              className="object-contain"
            />
          </div>

          {/* Status Card 1 */}
          <div
            className={`absolute 2xl:top-70 xl:top-50 lg:top-70 ${locale === "ar" ? "lg:left-5" : "lg:right-5"} lg:block hidden bg-white/55 backdrop-blur-md rounded-2xl shadow-2xl 2xl:p-6 2xl:max-w-1/6 xl:max-w-1/5 xl:p-5 lg:max-w-1/4 lg:p-4 transform ${locale === "ar" ? "-translate-x-8" : "translate-x-8"}`}
          >
            <div
              className={`flex ${locale === "ar" ? "flex-row-reverse" : ""} items-start gap-3`}
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {t("about.status1_title")}
                </h3>
                <p className="text-xs text-gray-600">
                  {t("about.status1_desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Status Card 2 */}
          <div
            className={`absolute xl:bottom-32 ${locale === "ar" ? "xl:left-130 lg:left-80" : "xl:right-130 lg:right-80"} lg:bottom-5 lg:block hidden bg-white/55 backdrop-blur-md rounded-2xl shadow-2xl 2xl:p-6 2xl:max-w-1/6 xl:p-5 xl:max-w-1/5 lg:max-w-1/4 lg:p-4 transform ${locale === "ar" ? "translate-x-8" : "-translate-x-8"}`}
          >
            <div
              className={`flex ${locale === "ar" ? "flex-row-reverse" : ""} items-start gap-3`}
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {t("about.status2_title")}
                </h3>
                <p className="text-xs text-gray-600">
                  {t("about.status2_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
