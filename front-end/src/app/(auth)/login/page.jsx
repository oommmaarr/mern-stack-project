"use client";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, EyeClosed, Eye } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useT from "../../lib/useT";

const Login = () => {
  const router = useRouter();
  const { login, isLoginMode } = useAuthStore();
  const t = useT();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errors = validateField(name, { ...formData, [name]: value });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const handlePasswordVisibility = () => {
    setShow((prev) => !prev);
  };

  const validateField = (fieldName, data) => {
    const errors = {};

    if (fieldName === "email") {
      if (!data.email) {
        errors.email = t('auth.login.validation.emailRequired');
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = t('auth.login.validation.emailInvalid');
      } else {
        errors.email = "";
      }
    }

    if (fieldName === "password") {
      if (!data.password) {
        errors.password = t('auth.login.validation.passwordRequired');
      } else if (data.password.length < 6) {
        errors.password = t('auth.login.validation.passwordShort');
      } else {
        errors.password = "";
      }
    }

    return errors;
  };

  const validation = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = t('auth.login.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('auth.login.validation.emailInvalid');
    }

    if (!formData.password) {
      errors.password = t('auth.login.validation.passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('auth.login.validation.passwordShort');
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
    const res = await login(formData);
    if (res.ok) {
      toast.success(`${res.user.fullname} أهلاً بك يا  `, {
        description: "تم تسجيل الدخول بنجاح",
      });
      router.replace("/");
    } else {
      toast.error(res.err?.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى", {
        description: "خطأ في تسجيل الدخول",
      });
    }

    setFormData({ email: "", password: "" });
    setFormErrors({});
  };

  return (
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
          <div className="part1 flex flex-col lg:items-center items-center justify-center lg:w-6/12 md:w-full w-9/12 lg:mx-0 mx-auto  md:p-20 md:mt-0 -mt-15">
            <div className="w-full max-w-sm">
              <h2 className="md:text-4xl text-xl font-bold text-start mb-3 md:whitespace-nowrap">
                {t('auth.login.title')}
              </h2>
              <p className="2xl:text-base text-xs opacity-60 mb-10 text-start md:mt-5">
                {t('auth.login.subtitle')}
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-full"
              >
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-left text-sm font-semibold text-gray-800"
                  >
                    {t('auth.login.emailLabel')}
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
                      placeholder={t('auth.login.emailPlaceholder')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg
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

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-left text-sm font-semibold text-gray-800"
                  >
                    {t('auth.login.passwordLabel')}
                  </label>
                  <div className="relative group w-full">
                    <Lock
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 
                        text-gray-400 group-focus-within:text-[#FC530A] z-10"
                    />
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t('auth.login.passwordPlaceholder')}
                      className="w-full pl-10 pr-10 py-3 border border-gray-400 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#FC530A]
                        transition-all placeholder-gray-400 bg-transparent"
                    />
                    {show ? (
                      <Eye
                        onClick={handlePasswordVisibility}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FC530A] z-10"
                      />
                    ) : (
                      <EyeClosed
                        onClick={handlePasswordVisibility}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FC530A] z-10"
                      />
                    )}
                  </div>
                  {formErrors.password && (
                    <p className="text-red-600 text-xs text-start">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoginMode}
                  className="w-full bg-[#FC530A] cursor-pointer text-white px-4 py-3 rounded-lg  font-semibold   shadow-md  mt-2   transition-all duration-300 ease-in-out
                  hover:bg-[#FC530A]
                  hover:text-white
                  hover:scale-105
                  hover:shadow-xl
                  active:scale-95"
                >
                  {isLoginMode ? t('auth.login.logging') : t('auth.login.submit')}
                </button>
              </form>

              <p className="mt-5 text-sm">
                {t('auth.login.subLink')}{' '}
                <Link href="/signup" className="text-[#FC530A] font-semibold">
                  {t('auth.login.linkText')}
                </Link>
              </p>
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
  );
};

export default Login;
