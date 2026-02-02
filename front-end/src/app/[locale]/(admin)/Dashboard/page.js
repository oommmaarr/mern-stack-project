"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useLangStore } from "@/app/store/useLangStore";
import { LayoutGrid, ClipboardList ,CircleFadingArrowUp } from "lucide-react";
import Link from "next/link";
import useT from "@/app/lib/useT";

const AdminDashboard = () => {
  const { authUser } = useAuthStore();
  const lang = useLangStore((s) => s.lang);
  const t = useT(); // استخدام الـ Hook اللي أنت عامله للترجمة

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* رسالة الترحيب - مبرمجة بناءً على اللغة والاسم */}
      <div className="text-center mb-12 md:mt-0 mt-25">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" dir={`${lang ==="ar"? "rtl" : "ltr"}`}>
          {lang === "ar" ? "مرحباً بك يا" : "Welcome,"} 
          <span className="text-[#FC530A]"> {authUser?.fullname || "Admin"}</span>
        </h1>
        <p className="text-gray-400 text-lg italic">
          {lang === "ar" ? "لوحة التحكم   " : "Admin Panel"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* زرار إدارة الخدمات */}
        <Link 
          href={`/${lang}/CRUDservices`}
          className="group relative bg-[#111] border border-white/10 p-8 rounded-2xl flex flex-col items-center gap-4 transition-all hover:border-[#FC530A]/50 hover:bg-[#161616]"
        >
          <div className="p-4 bg-[#FC530A]/10 rounded-full group-hover:bg-[#FC530A]/20 transition-colors">
            <LayoutGrid className="text-[#FC530A]" size={40} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {t('profile.menu.dashboard')} 
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === "ar" ? "إضافة، تعديل، أو حذف الخدمات المتاحة" : "Add, Edit, or Delete available services"}
            </p>
          </div>
        </Link>

        {/* زرار إدارة الطلبات */}
        <Link 
          href={`/${lang}/CRUDorders`}
          className="group relative bg-[#111] border border-white/10 p-8 rounded-2xl flex flex-col items-center gap-4 transition-all hover:border-[#FC530A]/50 hover:bg-[#161616]"
        >
          <div className="p-4 bg-[#FC530A]/10 rounded-full group-hover:bg-[#FC530A]/20 transition-colors">
            <ClipboardList className="text-[#FC530A]" size={40} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {t('profile.menu.orders')} 
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === "ar" ? "متابعة جميع طلبات المستخدمين وتغيير حالتها" : "Monitor all user orders and update status"}
            </p>
          </div>
        </Link>

        <Link 
          href={`/${lang}/PromoteUser`}
          className="group relative bg-[#111] border border-white/10 p-8 rounded-2xl flex flex-col items-center gap-4 transition-all hover:border-[#FC530A]/50 hover:bg-[#161616]"
        >
          <div className="p-4 bg-[#FC530A]/10 rounded-full group-hover:bg-[#FC530A]/20 transition-colors">
            <CircleFadingArrowUp  className="text-[#FC530A]" size={40} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {t('profile.menu.promote')} 
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === "ar" ? "ترقية المستخدم الي ادمن" : "Promote Specific User To Be Admin"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;