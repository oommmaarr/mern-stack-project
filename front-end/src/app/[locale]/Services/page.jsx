"use client";
import { useEffect, useState } from "react";
import useT from "../../lib/useT";
import { useServiceStore } from "@/app/store/serviceStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProfileCard from "@/app/components/ProfileCard/ProfileCard";

const Services = () => {
  const t = useT();
  const { locale } = useParams();

  const { services, fetchServices, isLoading } = useServiceStore();
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1D1D1]">
        <div className="w-[60px] h-[60px] border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen bg-[#D1D1D1] font-['Cairo'] overflow-x-hidden"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {/* CTA Section */}
        <section className="py-24 px-5 relative z-[2] mt-20">
          <div className="max-w-3xl mx-auto text-center py-20 px-10 bg-white backdrop-blur-lg border border-gray-300 rounded-[32px] relative overflow-hidden shadow-xl">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,87,34,0.1),transparent_90%)] animate-[rotate_20s_linear_infinite]"></div>

            <h2 className="font-['Tajawal'] lg:text-5xl text-3xl font-black text-gray-900 mb-5 relative z-10">
              {t("services.cta.title")}
            </h2>
            <p className="lg:text-xl text-sm text-gray-700 mb-10 relative z-10 font-medium">
              {t("services.cta.description")}
            </p>
            <button className="cursor-pointer lg:px-12 lg:py-4 px-8 py-3 bg-linear-to-r from-orange-500 to-orange-400 rounded-full text-white font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,87,34,0.5)] relative overflow-hidden z-10"
            onClick={()=>window.open("https://wa.me/+201040489093", "_blank")}>
              <span className="relative z-10">{t("services.cta.button")}</span>
              <div className="absolute -top-1/2 -left-[60%] w-1/5 h-[200%] bg-linear-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] animate-[shine_3s_infinite]"></div>
            </button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-5 relative z-[2]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service._id}
                  className="relative bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-0 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_60px_rgba(255,87,34,0.3)] group animate-[slideInUp_0.6s_ease-out_backwards]"
                  onMouseEnter={() => setHoveredCard(service._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,87,34,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>

                  {/* Gradient Overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 to-orange-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>

                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    {service.serviceImage ? (
                      <Image
                        src={service.serviceImage}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={600}
                        height={600}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(255,87,34,0.5)"
                          className="w-12 h-12"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            strokeWidth="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
                          <polyline points="21 15 16 10 5 21" strokeWidth="2" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-orange-500/90 border border-orange-600 rounded-full text-xs font-bold text-white shadow-lg">
                      {t("services.card.badge")}
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-['Tajawal'] text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                      {service.serviceName}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-700 mb-6 font-medium">
                      {service.serviceDescription}
                    </p>

                    <div className="flex flex-col gap-3 mb-7">
                      <div className="flex items-center gap-2.5 text-sm text-gray-700 font-semibold">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ff5722"
                          className="shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{t("services.card.features.fastDelivery")}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-700 font-semibold">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ff5722"
                          className="shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{t("services.card.features.support247")}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-700 font-semibold">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ff5722"
                          className="shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>
                          {t("services.card.features.qualityGuarantee")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 gap-4">
                      {!service.servicePrice ? (
                        <div className="text-gray-800 font-bold">
                          {t("services.card.pricing.multipleRates")}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.85rem] text-gray-600 font-semibold">
                            {t("services.card.pricing.label")}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-['Tajawal'] text-3xl font-black text-orange-500 leading-none">
                              {service.servicePrice}
                            </span>
                            <span className="text-base text-gray-700 font-bold">
                              {t("services.card.pricing.currency")}
                            </span>
                          </div>
                        </div>
                      )}

                      <Link
                        href={`/${locale}/Services/${service._id}`}
                        className="flex items-center gap-2 px-7 py-3.5 bg-linear-to-r from-orange-500 to-orange-400 rounded-full text-white font-bold lg:text-base text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(255,87,34,0.4)] relative overflow-hidden group/btn"
                      >
                        <span className="relative cursor-pointer z-10">
                          {t("services.card.detailsButton")}
                        </span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className={`relative z-10 transition-transform duration-300 ${
                            locale === "ar"
                              ? "group-hover/btn:-translate-x-1"
                              : "group-hover/btn:translate-x-1"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                              locale === "ar"
                                ? "M14 5l7 7m0 0l-7 7m7-7H3"
                                : "M10 19l-7-7m0 0l7-7m-7 7h18"
                            }
                          />
                        </svg>
                        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover/btn:left-full"></div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-16 px-5 relative z-[2]">
          <div className="max-w-[1400px]  mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-['Tajawal'] text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {locale === "ar" ? "تم إنشاء هذا الموقع بواسطة" : "This Website Was Created By"}
              </h2>
              <p className="text-gray-600 text-lg">
                {locale === "ar" ? "مطور محترف متخصص في تطوير المواقع الحديثة" : "A professional developer specialized in modern web development"}
              </p>
            </div>
            <div className="flex justify-center">
              <ProfileCard
                name="Omar Madkour"
                title="Software Engineer"
                handle="omar_madkour14"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/AdobeExpress.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => {
                  window.open("https://wa.me/201090135044", "_blank");
                }}
                showIcon
                showBehindGlow
                behindGlowColor="rgba(200, 100, 255, 0.8)"
                customInnerGradient="linear-gradient(145deg,#5d4a8c 0%,#8b5fbf 50%,#71C4FF 100%)"
              />
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap");

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shine {
          0% {
            left: -60%;
          }
          100% {
            left: 140%;
          }
        }
      `}</style>
    </>
  );
};

export default Services;