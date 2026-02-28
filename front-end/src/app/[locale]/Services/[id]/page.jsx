"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import instance from "@/app/lib/axios";
import CreateOrderModal from "@/app/components/createOrder/createOrder";
import useT from "../../../lib/useT";

const ServiceDetails = () => {
  const { id, locale } = useParams();
  const t = useT();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(false);

  useEffect(() => {
    const fetchSingleService = async () => {
      try {
        const res = await instance.get(`service/${id}`);
        setService(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1D1D1]">
        <div className="w-[60px] h-[60px] border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div
      className="min-h-screen bg-[#D1D1D1] font-['Cairo'] px-4 sm:px-6 lg:px-10 py-14"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mt-20 mx-auto bg-white backdrop-blur-lg border border-gray-300 rounded-3xl overflow-hidden shadow-2xl">
        {/* Image */}
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-96">
          {service.serviceImage ? (
            <Image
              src={service.serviceImage}
              alt={service.serviceName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center text-orange-600 font-bold text-lg">
              {t("serviceDetails.noImage")}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 md:p-10">
          <h1 className="font-['Tajawal'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-gray-900">
            {service.serviceName}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8 whitespace-pre-wrap">
            {service.serviceDescription}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {[
              t("serviceDetails.features.fastDelivery"),
              t("serviceDetails.features.support247"),
              t("serviceDetails.features.qualityGuarantee")
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base text-gray-800 font-semibold"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff5722"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </div>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 border-t border-gray-200">
            <div>
              <span className="text-xs sm:text-sm text-gray-600 font-semibold block mb-1">
                {t("serviceDetails.pricing.label")}
              </span>
              {!service.servicePrice ? (
                <span className="text-2xl sm:text-3xl font-black text-orange-500">
                  {t("serviceDetails.pricing.multipleRates")}
                </span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-orange-500">
                    {service.servicePrice}
                  </span>
                  <span className="text-lg font-bold text-gray-700">
                    {t("serviceDetails.pricing.currency")}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setOpenOrder(true)}
              className="w-full md:w-auto px-8 py-3.5 cursor-pointer sm:px-10 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full font-bold text-base sm:text-lg text-white hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,87,34,0.45)] transition-all"
            >
              {t("serviceDetails.orderButton")}
            </button>
          </div>

          {openOrder && (
            <CreateOrderModal
              serviceId={service._id}
              onClose={() => setOpenOrder(false)}
            />
          )}

          {/* Admin */}
          <div className="mt-8 text-xs sm:text-sm text-gray-500">
            {t("serviceDetails.addedBy")}{" "}
            <span className="font-semibold text-gray-700">
              {service.adminId?.fullname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;