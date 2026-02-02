"use client";
import instance from "@/app/lib/axios";
import { useState } from "react";
import { UserCog, Mail, Shield, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import useT from "@/app/lib/useT";
const PromoteUser = () => {
  const [loading, setLoading] = useState(false);
  const [mailValue, setMailValue] = useState("");
  const [errors, setErrors] = useState({});
  const t= useT();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!mailValue.trim()) {
      newErrors.email = t("promoteUser.validation.emailRequired");
    } else if (!validateEmail(mailValue)) {
      newErrors.email = t("promoteUser.validation.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Promote = async () => {
    if (!validateForm()) {
      toast.error(t("promoteUser.messages.validationError"), {
        description: t("promoteUser.messages.validationErrorDesc"),
      });
      return;
    }

    try {
      setLoading(true);
      const res = await instance.put("auth/promoteUser", {
        email: mailValue,
      });

      if (res.status === 200) {
        toast.success(t("promoteUser.messages.successTitle"), {
          description: t("promoteUser.messages.successDesc").replace("{email}", mailValue),
        });
        setMailValue("");
        setErrors({});
      }
    } catch (error) {
      toast.error(t("promoteUser.messages.error"), {
        description:
          error.response?.data?.message || t("promoteUser.messages.errorTitle"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setMailValue(e.target.value);
    // مسح الخطأ عند الكتابة
    if (errors.email) {
      setErrors({});
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#D1D1D1] font-['Cairo'] py-10 px-3 sm:px-4 md:px-6 overflow-x-hidden">
        <div className="max-w-4xl mx-auto mt-16">
          {/* Header */}
          <div className="bg-white/50 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/20 shadow-sm mt-20 mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-2xl">
                <Shield className="text-white" size={32} />
              </div>
              <div>
                <h2 className="font-['Tajawal'] text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                  {t("promoteUser.title")}
                </h2>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  {t("promoteUser.subtitle")}
                </p>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-gray-300 rounded-3xl overflow-hidden shadow-xl animate-[slideInUp_0.6s_ease-out]">
            {/* Card Header */}
            <div className="bg-linear-to-br from-orange-500 to-orange-600 p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <UserCog size={28} />
                  <h3 className="text-2xl font-bold font-['Tajawal']">
                    {t("promoteUser.cardTitle")}
                  </h3>
                </div>
                <p className="text-sm opacity-90">
                  {t("promoteUser.cardDescription")}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Info Box */}
              <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-2xl mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-blue-800 font-semibold mb-1">
                      {t("promoteUser.warningTitle")}
                    </p>
                    <p className="text-sm text-blue-700">
                      {t("promoteUser.warningText")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <span className="flex items-center gap-2">
                      <Mail size={18} />
                      {t("promoteUser.emailLabel")}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={mailValue}
                      onChange={handleInputChange}
                      placeholder={t("promoteUser.emailPlaceholder")}
                      disabled={loading}
                      className={`w-full px-5 py-4 rounded-2xl border-2 transition-all font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none ${
                        errors.email
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-300 bg-gray-50 focus:border-orange-500 focus:bg-white"
                      } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    {errors.email && (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <AlertCircle className="text-red-500" size={20} />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm font-semibold mt-2 flex items-center gap-1 animate-[slideInUp_0.3s_ease-out]">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={Promote}
                  disabled={loading || !mailValue.trim()}
                  className={`w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                    loading || !mailValue.trim()
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t("promoteUser.submitting")}</span>
                    </>
                  ) : (
                    <>
                      <Shield size={22} />
                      <span>{t("promoteUser.submitButton")}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <p className="text-sm text-amber-800 font-semibold mb-2">
                    {t("promoteUser.permissionsTitle")}
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1 mr-4">
                    {t("promoteUser.permissions").map((permission, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-orange-500">•</span>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
        `}</style>
      </div>
    </>
  );
};

export default PromoteUser;