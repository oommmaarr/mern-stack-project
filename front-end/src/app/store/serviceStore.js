// store/serviceStore.js
import instance from "../lib/axios";
import { create } from "zustand";

export const useServiceStore = create((set) => ({
  services: [],
  isLoading: false,
  error: null,

  // =========================
  // Get all services
  // =========================
  fetchServices: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await instance.get("service");
      set({ services: res.data });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch services" });
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================
  // Add service (Admin)
  // =========================
  addService: async (serviceData) => {
    try {
      set({ isLoading: true, error: null });
      const res = await instance.post("service/add", serviceData);

      set((state) => ({
        services: [...state.services, res.data.newService],
      }));

      return { ok: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add service";
      set({ error: msg });
      return { ok: false, error: msg };
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================
  // Update service (Admin)
  // =========================
  updateService: async (id, updatedData) => {
    try {
      set({ isLoading: true, error: null });
      const res = await instance.put(`service/update/${id}`, updatedData);

      set((state) => ({
        services: state.services.map((s) =>
          s._id === id ? res.data.updatedService : s
        ),
      }));

      return { ok: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update service";
      set({ error: msg });
      return { ok: false, error: msg };
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================
  // Delete service (Admin)
  // =========================
  removeService: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await instance.delete(`service/delete/${id}`);

      set((state) => ({
        services: state.services.filter((s) => s._id !== id),
      }));

      return { ok: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete service";
      set({ error: msg });
      return { ok: false, error: msg };
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================
  // Get service by id (optional)
  // =========================
  getServiceById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const res = await instance.get(`service/${id}`);
      return { ok: true, service: res.data };
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch service";
      return { ok: false, error: msg };
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================
  // Clear store (logout)
  // =========================
  clearServices: () => {
    set({ services: [], error: null });
  },
}));
