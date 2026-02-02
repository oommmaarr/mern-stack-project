"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import instance from "@/app/lib/axios";
import Image from "next/image";
import useT from "../../lib/useT";

export default function Orders() {
  const params = useParams();
  const locale = params.locale;
  const t = useT();
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const fetchUserOrder = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get("order/getMyOrder");
      setOrders(res.data.myOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        text: t(`orders.status.${status}`),
        bgColor: "bg-yellow-500/15",
        borderColor: "border-yellow-500/30",
        textColor: "text-yellow-500"
      },
      completed: {
        text: t(`orders.status.${status}`),
        bgColor: "bg-green-500/15",
        borderColor: "border-green-500/30",
        textColor: "text-green-500"
      },
      cancelled: {
        text: t(`orders.status.${status}`),
        bgColor: "bg-red-500/15",
        borderColor: "border-red-500/30",
        textColor: "text-red-500"
      },
      processing: {
        text: t(`orders.status.${status}`),
        bgColor: "bg-blue-500/15",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-500"
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 ${config.bgColor} border ${config.borderColor} rounded-full text-xs font-bold ${config.textColor}`}>
        {config.text}
      </span>
    );
  };

  const getPaymentBadge = (isPaid) => {
    return isPaid ? (
      <span className="px-3 py-1 bg-green-500/15 border border-green-500/30 rounded-full text-xs font-bold text-green-500">
        {t("orders.payment.paid")}
      </span>
    ) : (
      <span className="px-3 py-1 bg-orange-500/15 border border-orange-500/30 rounded-full text-xs font-bold text-orange-500">
        {t("orders.payment.unpaid")}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1D1D1]">
        <div className="w-[60px] h-[60px] border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#D1D1D1] font-['Cairo']" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header Section */}
        <section className="pt-20 pb-12 px-5">
          <div className="max-w-[1400px] mx-auto mt-20">
            <div className="text-center mb-8">
              <h1 className="font-['Tajawal'] text-5xl font-black text-gray-900 mb-4">
                {t("orders.title")}
              </h1>
              <p className="text-lg text-gray-700 font-medium">
                {t("orders.subtitle")}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white backdrop-blur-lg border border-gray-300 rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-black text-orange-500 mb-2">
                  {orders.length}
                </div>
                <div className="text-gray-700 font-semibold">{t("orders.stats.total")}</div>
              </div>
              <div className="bg-white backdrop-blur-lg border border-gray-300 rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-black text-yellow-600 mb-2">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
                <div className="text-gray-700 font-semibold">{t("orders.stats.pending")}</div>
              </div>
              <div className="bg-white backdrop-blur-lg border border-gray-300 rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-black text-green-600 mb-2">
                  {orders.filter(o => o.status === 'completed').length}
                </div>
                <div className="text-gray-700 font-semibold">{t("orders.stats.completed")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Orders Grid */}
        <section className="pb-24 px-5">
          <div className="max-w-[1400px] mx-auto">
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("orders.empty.title")}</h3>
                <p className="text-gray-600 mb-8">{t("orders.empty.description")}</p>
                <a href={`/${locale}/Services`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-white font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(255,87,34,0.4)]">
                  <span>{t("orders.empty.button")}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={locale === 'ar' ? 'rotate-180' : ''}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {orders.map((order, index) => (
                  <div
                    key={order._id}
                    className="relative bg-white backdrop-blur-lg border border-gray-300 rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_60px_rgba(255,87,34,0.3)] group animate-[slideInUp_0.6s_ease-out_backwards]"
                    onMouseEnter={() => setHoveredCard(order._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,87,34,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 to-orange-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>

                    <div className="p-8 relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {order.serviceId?.serviceImage ? (
                              <Image 
                                src={order.serviceId.serviceImage} 
                                alt={order.serviceId.serviceName}
                                className="w-12 h-12 rounded-xl object-cover"
                                width={600}
                                height={600}
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5722">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <h3 className="font-['Tajawal'] text-xl font-extrabold text-gray-900">
                                {order.serviceId?.serviceName || t("orders.card.unknownService")}
                              </h3>
                              <p className="text-sm text-gray-500 font-medium">
                                {t("orders.card.orderNumber")}: #{order._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {getStatusBadge(order.status)}
                          {getPaymentBadge(order.isPaid)}
                        </div>
                      </div>

                      {/* User Notes */}
                      {order.userNotes && (
                        <div className="mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-200">
                          <div className="flex items-start gap-2 mb-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff5722" className="mt-0.5 flex-shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <div>
                              <p className="text-xs text-orange-600 font-bold mb-1">{t("orders.card.yourNotes")}</p>
                              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {order.userNotes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                          <div className="flex items-center gap-2 mb-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-gray-600 font-semibold">{t("orders.card.orderDate")}</span>
                          </div>
                          <p className="text-sm text-gray-800 font-bold">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                          <div className="flex items-center gap-2 mb-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-600 font-semibold">{t("orders.card.lastUpdate")}</span>
                          </div>
                          <p className="text-sm text-gray-800 font-bold">
                            {formatDate(order.updatedAt)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(255,87,34,0.4)] relative overflow-hidden group/btn cursor-pointer">
                          <span className="relative z-10">{t("orders.card.detailsButton")}</span>

                          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover/btn:left-full"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap');

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
      `}</style>
    </>
  );
}