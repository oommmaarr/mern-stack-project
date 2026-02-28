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
  const [expandedCards, setExpandedCards] = useState({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
              onClick={() => setIsContactModalOpen(true)}>
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
                  className="relative flex flex-col h-full bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-0 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_60px_rgba(255,87,34,0.3)] group animate-[slideInUp_0.6s_ease-out_backwards]"
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
                  <div className="relative h-[200px] overflow-hidden">
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

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-['Tajawal'] text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                      {service.serviceName}
                    </h3>
                    <div className="mb-6">
                      <p
                        className={`text-base leading-relaxed text-gray-700 font-medium whitespace-pre-wrap ${!expandedCards[service._id] ? "line-clamp-4" : ""
                          }`}
                      >
                        {service.serviceDescription}
                      </p>
                      {service.serviceDescription?.length > 100 && (
                        <button
                          onClick={() => toggleExpand(service._id)}
                          className="text-orange-500 text-sm font-bold mt-2 hover:underline focus:outline-none"
                        >
                          {expandedCards[service._id]
                            ? locale === "ar"
                              ? "عرض أقل"
                              : "Show Less"
                            : locale === "ar"
                              ? "عرض المزيد"
                              : "Read More"}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 mb-7 mt-auto">
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
                          className={`relative z-10 transition-transform duration-300 ${locale === "ar"
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

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div
            className="bg-white rounded-[2rem] p-8 max-w-lg w-full relative shadow-2xl animate-[slideInUp_0.4s_ease-out] border border-gray-100 max-h-[90vh] overflow-y-auto"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3 className="font-['Tajawal'] text-2xl font-black text-gray-900 mb-8 text-center pt-2">
              {locale === "ar" ? "تواصل معي" : "Contact Me"}
            </h3>

            <div className="space-y-6">
              {/* WhatsApp Groups */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
                <h4 className="font-['Tajawal'] font-bold text-lg text-emerald-800 mb-4 flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {locale === "ar" ? "الجروبات الخاصة بي" : "My WhatsApp Groups"}
                </h4>
                <div className="flex flex-col gap-3">
                  <a href="https://chat.whatsapp.com/LDmYAjVGSRK6ZNW2RH0244?mode=gi_t" target="_blank" rel="noreferrer" className="bg-white px-4 py-3 rounded-xl shadow-sm text-emerald-700 hover:text-emerald-900 border border-green-100 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center justify-between group">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                      {locale === "ar" ? "الجروب الأول" : "Group 1"}
                    </span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={locale === "ar" ? "rotate-180" : ""}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="https://chat.whatsapp.com/BA5KVie1eHP1EojoQy4zaO?mode=gi_t" target="_blank" rel="noreferrer" className="bg-white px-4 py-3 rounded-xl shadow-sm text-emerald-700 hover:text-emerald-900 border border-green-100 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center justify-between group">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                      {locale === "ar" ? "الجروب الثاني" : "Group 2"}
                    </span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={locale === "ar" ? "rotate-180" : ""}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Money Reception */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                <h4 className="font-['Tajawal'] font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                  {locale === "ar" ? "أرقام استلام الأموال" : "Money Reception Numbers"}
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="bg-white px-4 py-3 rounded-xl shadow-sm text-gray-800 font-bold font-mono border border-orange-100 flex justify-between items-center text-lg">
                    <span className="tracking-wider">01040482159</span>
                    <button onClick={() => navigator.clipboard.writeText("01040482159")} className="text-orange-500 hover:text-orange-700 text-sm font-sans flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      {locale === "ar" ? "نسخ" : "Copy"}
                    </button>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-sm text-gray-800 font-bold font-mono border border-orange-100 flex justify-between items-center text-lg">
                    <span className="tracking-wider">01217771940</span>
                    <button onClick={() => navigator.clipboard.writeText("01217771940")} className="text-orange-500 hover:text-orange-700 text-sm font-sans flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      {locale === "ar" ? "نسخ" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2">
                <h4 className="font-['Tajawal'] font-bold text-lg text-gray-800 mb-4 text-center">
                  {locale === "ar" ? "تواصل معي مباشرة" : "Contact Me Directly"}
                </h4>
                <div className="flex justify-center gap-6">
                  <a href="https://wa.me/+201040489093" target="_blank" rel="noreferrer" title="WhatsApp" className="w-14 h-14 flex items-center justify-center bg-gray-50 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-gray-100">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>

                  <a href="https://www.facebook.com/share/14MNQD6KPYX/?mibextid=wwXIfr" target="_blank" rel="noreferrer" title="Facebook" className="w-14 h-14 flex items-center justify-center bg-gray-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-gray-100">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  <a href="https://www.instagram.com/ali_hassan8177?igsh=azNydHpsdjc2azd4&utm_source=qr" target="_blank" rel="noreferrer" title="Instagram" className="w-14 h-14 flex items-center justify-center bg-gray-50 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-[#E1306C] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-gray-100">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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