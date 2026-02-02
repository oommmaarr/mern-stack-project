"use client";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock , CircleUser , EyeClosed , Eye } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useT from "../../lib/useT";
const Signup = () => {
  const router = useRouter();
  const t = useT();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, isSignupMode } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const newFormData = { ...formData, [name]: value };
    const errors = validateField(name, newFormData);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };
  const validateField = (fieldName, data) => {
    const errors = {};

    if (fieldName === "name") {
      if (!data.name) {
        errors.name = t('auth.signup.validation.nameRequired');
      } else if (data.name.length < 3) {
        errors.name = t('auth.signup.validation.nameShort');
      } else {
        errors.name = "";
      }
    }

    if (fieldName === "email") {
      if (!data.email) {
        errors.email = t('auth.signup.validation.emailRequired');
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = t('auth.signup.validation.emailInvalid');
      } else {
        errors.email = "";
      }
    }

    if (fieldName === "password") {
      if (!data.password) {
        errors.password = t('auth.signup.validation.passwordRequired');
      } else if (data.password.length < 6) {
        errors.password = t('auth.signup.validation.passwordShort');
      } else {
        errors.password = "";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const res =await signup(formData);
    if (res.ok) {
      toast.success(` ${res.user.fullname} أهلاً بك يا`, {
        description: "تم إنشاء الحساب بنجاح",
      });
      router.replace("/");
    }else {
      toast.error(res.err?.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى", {
        description: "خطأ في التسجيل",
      });
    }
    setFormErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  const validation = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = t('auth.signup.validation.nameRequired');
    } else if (formData.name.length < 3) {
      errors.name = t('auth.signup.validation.nameShort');
    }

    if (!formData.email) {
      errors.email = t('auth.signup.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('auth.signup.validation.emailInvalid');
    }

    if (!formData.password) {
      errors.password = t('auth.signup.validation.passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('auth.signup.validation.passwordShort');
    }

    return errors;
  };

  return (
    <div>
      {" "}
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
            <div className="part1 flex flex-col lg:items-center items-center justify-center lg:w-6/12 md:w-full w-9/12 lg:mx-0 mx-auto  md:p-20 md:mt-0 ">
              <div className="w-full md:max-w-sm">
                <h2 className="2xl:text-4xl text-2xl font-bold md:mb-3 whitespace-nowrap text-start">
                  {t('auth.signup.title')}
                </h2>
                <p className="2xl:text-base text-xs opacity-60 md:mb-10 text-start mt-2 mb-5 md:mt-5">
                  {t('auth.signup.subtitle')}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 w-full"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-left text-sm font-semibold text-gray-800"
                    >
                      {t('auth.signup.nameLabel')}
                    </label>
                    <div className="relative group w-full">
                      <CircleUser 
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 
               text-gray-400 group-focus-within:text-[#FC530A] z-10"
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('auth.signup.namePlaceholder')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-400 text-sm text-gray-600 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-[#FC530A]
               transition-all placeholder-gray-400 bg-transparent"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-red-600 text-xs text-start">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-left text-sm font-semibold text-gray-800"
                    >
                      {t('auth.signup.emailLabel')}
                    </label>
                    <div className="relative group w-full">
                      <Mail
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 
               text-gray-400 group-focus-within:text-[#FC530A] z-10"
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('auth.signup.emailPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg text-sm text-gray-600
               focus:outline-none focus:ring-2 focus:ring-[#FC530A]
               transition-all placeholder-gray-400 bg-transparent"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-600 text-xs text-start">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="text-left text-sm font-semibold text-gray-800"
                    >
                      {t('auth.signup.passwordLabel')}
                    </label>
                    <div className="relative group w-full">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 
               text-gray-400 group-focus-within:text-[#FC530A] z-10"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t('auth.signup.passwordPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-400 text-sm text-gray-600 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-[#FC530A]
               transition-all placeholder-gray-400 bg-transparent"
                      />
                      <EyeClosed  onClick={()=>setShowPassword(!showPassword)} className={showPassword ? "hidden" : "cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FC530A] z-10"}/>  
                      <Eye onClick={()=>setShowPassword(!showPassword)} className={ showPassword ?"cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FC530A] z-10" : "hidden"} />
                    </div>
                    {formErrors.password && (
                      <p className="text-red-600 text-xs text-start">
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FC530A] cursor-pointer z-100 text-white px-4 py-3 rounded-lg  font-semibold   shadow-md  mt-2   transition-all duration-300 ease-in-out
                  hover:bg-[#FC530A]
                  hover:text-white
                  hover:scale-105
                  hover:shadow-xl
                  active:scale-95"
                  disabled={isSignupMode}
                  >
                    {isSignupMode ? t('auth.signup.signing') : t('auth.signup.submit')}
                  </button>
                </form>
                <p className="mt-5 z-100">{t('auth.signup.linkText')} <Link href="/login" className="text-[#FC530A] font-semibold">{t('auth.signup.linkText')}</Link></p>
              </div>
            </div>

            <div className="part2 md:w-6/12 hidden lg:flex items-end 2xl:w-200 xl:w-175 lg:w-125 md:hidden absolute bottom-0  right-0">
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
    </div>
  );
};

export default Signup;
