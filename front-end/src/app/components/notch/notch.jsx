"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ListNotch from "../listNotch/listNotch";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { SquareUserRound, ChevronDown, X } from "lucide-react";
import { useLangStore } from "../../store/useLangStore";
import en from "../../../../locales/en.json";
import ar from "../../../../locales/ar.json";
const Notch = () => {
  const [open, setOpen] = useState(false);
  const { authUser, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  const t = lang === "en" ? en : ar;
  console.log(authUser);
  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.services, href: "/Services" },
    { name: t.nav.about, href: "/About" },
  ];

  const normalizedPath = (() => {
    if (!pathname) return "/";
    const m = pathname.match(/^\/(en|ar)(\/.*)?$/);
    if (m) {
      return m[2] && m[2] !== "" ? m[2] : "/";
    }
    return pathname;
  })();
  const handleLogOut = async () => {
    const res = await logout();
    if (res?.ok) {
      toast.success(t.toast.logoutSuccess);
    } else {
      toast.error(res?.err?.response?.data?.message || t.toast.logoutError, {
        description: t.toast.logoutError,
      });
    }
    setOpen(false);
  };

  const [profileOpen, setProfileOpen] = useState(false);

  const [profileOpenMobile, setProfileOpenMobile] = useState(false);

  const handleProfileToggle = () => {
    setProfileOpen((s) => !s);
  };

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    let newPath = pathname || "/";
    if (newPath.startsWith("/en") || newPath.startsWith("/ar")) {
      newPath = `/${newLang}${newPath.slice(3)}`;
    } else {
      newPath = `/${newLang}${newPath}`;
    }
    router.push(newPath);
  };

  return (
    <>
      {/* Navbar */}
      <div className="relative 2xl:w-full xl:w-175 lg:w-190 md:w-150 w-76 flex justify-center">
        <div className="flex items-center justify-between 2xl:w-5/12 w-full rounded-full bg-black 2xl:px-10 px-6 md:py-2 py-3 mt-10">
          <h1 className="font-bold text-orange-500 text-lg">ALI BADR.</h1>

          <div className="flex items-center lg:gap-15 ">
            <ListNotch open={open} setOpen={setOpen} />

            <ul className="hidden md:flex gap-10 text-[#C7C7C7]">
              {navItems.map((ele) => {
                const localizedHref = `/${lang}${ele.href === "/" ? "" : ele.href}`;
                return (
                  <li key={ele.name}>
                    <Link
                      href={localizedHref}
                      className={`transition-colors duration-300 ${
                        normalizedPath === ele.href ? "text-orange-500" : ""
                      }`}
                    >
                      {ele.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="relative">
              <div
                className=" items-center justify-center gap-2 bg-orange-500 px-4 py-3 rounded-xl cursor-pointer lg:flex hidden"
                onClick={handleProfileToggle}
              >
                <SquareUserRound
                  className="inline-block text-white "
                  size={20}
                />

                <button className=" rounded-full 2xl:w-21 whitespace-nowrap  text-white text-sm  font-semibold cursor-pointer flex items-center justify-start">
                  <p>
                    {" "}
                    {authUser?.fullname ||
                      authUser?.fullName ||
                      t.profile.userProfile}
                  </p>
                </button>
                <ChevronDown className="inline-block mr-1 ml-3" size={22} />
              </div>

              {/* Profile dropdown */}
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-40 transition-transform transform origin-top-right ${profileOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              >
                <div className="bg-black/95 text-white rounded-lg p-2">
                  {authUser?.role === "admin" ? (
                    <button
                      onClick={() => {
                        setProfileOpenMobile(false);
                        setOpen(false);
                        router.push(`/${lang}/Dashboard`);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm cursor-pointer"
                    >
                      {t.profile?.menu?.dashboard || "Dashboard"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setProfileOpenMobile(false);
                        setOpen(false);
                        router.push(`/${lang}/Orders`);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm cursor-pointer"
                    >
                      {t.profile?.menu?.orders || "Orders"}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      // Toggle language
                      setProfileOpen(false);
                      toggleLang();
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/5 cursor-pointer"
                  >
                    <span>{t.profile.menu.language} : </span>
                    {lang === "en" ? t.lang.ar : t.lang.en}
                  </button>

                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      await handleLogOut();
                    }}
                    className="w-full text-left px-3 py-2 rounded bg-red-600 cursor-pointer"
                  >
                    {t.profile?.menu?.logout || "Logout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay + Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none w-full"}`}
      >
        {/* dark overlay */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-500 w-full
          ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* menu */}
        <div
          className={`relative h-full w-full bg-black/90 flex flex-col items-center justify-center text-center
          transition-all duration-500 ease-out
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {/* close button (mobile) */}
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white bg-black/30 p-2 rounded-full z-50"
          >
            <X size={20} />
          </button>
          <ul className="flex flex-col gap-10 text-2xl text-white">
            {navItems.map((ele) => {
              const localizedHref = `/${lang}${ele.href === "/" ? "" : ele.href}`;
              return (
                <li key={ele.name}>
                  <Link
                    href={localizedHref}
                    onClick={() => setOpen(false)}
                    className={`transition-colors duration-300 ${
                      normalizedPath === ele.href ? "text-[#FC530A]" : ""
                    }`}
                  >
                    {ele.name}
                  </Link>
                </li>
              );
            })}
            <div className="flex flex-col items-center w-full">
              <div
                className="flex items-center justify-center gap-2 bg-[#FC530A] px-4 py-3 rounded-lg w-8/12 mx-auto cursor-pointer"
                onClick={() => setProfileOpenMobile((s) => !s)}
              >
                <SquareUserRound className="inline-block" size={20} />

                <button className=" rounded-full w-27.5 text-[#D9D9D9] text-sm font-semibold cursor-pointer flex items-center justify-start">
                  {authUser?.fullName ||
                    authUser?.fullname ||
                    t.profile.userProfile}
                </button>
                <ChevronDown className="inline-block mr-1" size={22} />
              </div>

              {/* mobile profile dropdown inside overlay */}
              <div
                className={`w-8/12 mx-auto mt-3 transition-all ${profileOpenMobile ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
              >
                <div className="bg-black/95 text-white rounded-lg p-2">
                  {authUser?.role === "admin" ? (
                    <button
                      onClick={() => {
                        setProfileOpenMobile(false);
                        setOpen(false);
                        router.push(`/${lang}/Dashboard`);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm cursor-pointer"
                    >
                      {t.profile?.menu?.dashboard || "Dashboard"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setProfileOpenMobile(false);
                        setOpen(false);
                        router.push(`/${lang}/Orders`);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm cursor-pointer"
                    >
                      {t.profile?.menu?.orders || "Orders"}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setProfileOpenMobile(false);
                      toggleLang();
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm cursor-pointer"
                  >
                    <span className="">{t.profile.menu.language} : </span>
                    <span className="mr-2">
                      {lang === "en" ? t.lang.ar : t.lang.en}
                    </span>
                  </button>

                  <button
                    onClick={async () => {
                      setProfileOpenMobile(false);
                      setOpen(false);
                      await handleLogOut();
                    }}
                    className="w-full text-left px-3 py-2 rounded bg-red-600 text-sm cursor-pointer"
                  >
                    {t.profile?.menu?.logout || "Logout"}
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Notch;
