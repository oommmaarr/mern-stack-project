"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import instance from "@/app/lib/axios";
import useT from "@/app/lib/useT";

const CreateOrderModal = ({ serviceId, onClose }) => {
  const [userNotes, setUserNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // رسالة نجاح أو خطأ
  const router = useRouter();
  const { locale } = useParams();
  const t = useT();

  const handleCreateOrder = async () => {
    if (!userNotes.trim()) {
      setMessage(t("createOrder.validation.notesRequired"));
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await instance.post("order/createOrder", {
        serviceId,
        userNotes,
      });

      setMessage(t("createOrder.messages.success"));

      setTimeout(() => {
        onClose(); 
        router.push("/Services"); // توجه لصفحة الخدمات
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage(t("createOrder.messages.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div 
        className="w-full max-w-md bg-[#1A0F0A] border border-white/[0.1] rounded-3xl p-6 sm:p-8 text-white relative animate-[slideInUp_0.4s_ease-out]"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >

        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${locale === "ar" ? "left-4" : "right-4"} text-white/50 hover:text-white cursor-pointer`}
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-black mb-6 text-center">
          {t("createOrder.title")}
        </h2>

        {/* Service ID */}
        <div className="mb-4">
          <label className="text-sm text-white/60 mb-1 block">
            {t("createOrder.serviceIdLabel")}
          </label>
          <input
            value={serviceId}
            disabled
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/[0.1] text-white/70 cursor-not-allowed"
          />
        </div>

        {/* User Notes */}
        <div className="mb-4">
          <label className="text-sm text-white/60 mb-1 block">
            {t("createOrder.notesLabel")}
          </label>
          <textarea
            rows="4"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder={t("createOrder.notesPlaceholder")}
            className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/10 focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        {/* Message */}
        {message && (
          <p className={`mb-4 text-center text-sm ${message.includes(locale === "ar" ? "نجاح" : "success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleCreateOrder}
          disabled={loading}
          className="w-full py-3.5 cursor-pointer bg-gradient-to-r from-orange-500 to-orange-400 rounded-full font-bold hover:shadow-[0_15px_40px_rgba(255,87,34,0.4)] transition-all disabled:opacity-50"
        >
          {loading ? t("createOrder.submitting") : t("createOrder.submitButton")}
        </button>
      </div>
    </div>
  );
};

export default CreateOrderModal;