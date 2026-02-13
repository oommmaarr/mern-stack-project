// store/authStore.js
import instance from "../lib/axios";
import { create } from "zustand";
export const useAuthStore = create((set) => {
  return {
    authUser: null,
    isSignupMode: false,
    isLoginMode: false,
    isCheckingAuth: true,

    checkAuth: async () => {
      try {
        const response = await instance.get("auth/check-auth");
        set({ authUser: response.data.user });
      } catch (error) {
        console.log("CheckAuth Error:", error);
        localStorage.removeItem("jwt"); // Clear invalid token
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signup: async (formData) => {
      try {
        set({ isSignupMode: true });
        const response = await instance.post("auth/register", {
          fullname: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (response.data.token) localStorage.setItem("jwt", response.data.token);
        set({ authUser: response.data.user });
        return { ok: true, user: response.data.user };
      } catch (err) {
        return { ok: false, err };
      } finally {
        set({ isSignupMode: false });
      }
    },

    login: async (formData) => {
      try {
        set({ isLoginMode: true });
        const response = await instance.post("auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.data.token) localStorage.setItem("jwt", response.data.token);
        set({ authUser: response.data.user });
        return { ok: true, user: response.data.user };
      } catch (err) {
        return { ok: false, err };
      } finally {
        set({ isLoginMode: false });
      }
    },

    logout: async () => {
      try {
        await instance.post("auth/logout");
        localStorage.removeItem("jwt");
        set({ authUser: null });
        return { ok: true };
      } catch (err) {
        return { ok: false, err };
      } finally {
        set({ isLoginMode: false });
      }
    },

  };
});
