"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animation/GlowingFishLoader.json";
import Notch from "../notch/notch";
import { Toaster } from "sonner";
export const ClientWrapper = ({ children }) => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const hideNotchRoutes = ["/login", "/signup"];
  const showNotch = !hideNotchRoutes.includes(pathname);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!authUser) {
        if (pathname !== "/login" && pathname !== "/signup") {
          router.replace("/login");
        }
      } else {
        if (pathname === "/login" || pathname === "/signup") {
          router.replace("/");
        }
      }
    }
  }, [authUser, isCheckingAuth, pathname, router]);

  const isRedirectingToLogin = !isCheckingAuth && !authUser && pathname !== "/login" && pathname !== "/signup";
  const isRedirectingToHome = !isCheckingAuth && authUser && (pathname === "/login" || pathname === "/signup");
  const isRedirecting = isRedirectingToLogin || isRedirectingToHome;

  if (isCheckingAuth || isRedirecting) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    <>
      {showNotch && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center z-50">
          <Notch />
        </div>
      )}
      <Toaster position="top-right" richColors />
      {children}
    </>
  );
};
