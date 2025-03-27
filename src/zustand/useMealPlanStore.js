                                                                                                             
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { persist } from "zustand/middleware";
import { toastSuccess, toastError, toastWarning } from "../components/layouts/MessageToasts.js";
export const useMealPlanStore = create(
  persist(
    (set, get) => ({
      mealPlans: [],
      saved_mealPlans: [],
      user_mealPlans: [],
      detailMealPlan: null,
      is_loading: false,

      createMealPlan: async (formData) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/mealplan/", formData);
          set({ mealPlans: [...get().mealPlans, response.data] });
          toastSuccess("Meal plan created successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to create meal plan");
        } finally {
          set({ is_loading: false });
        }
      },

      deleteMealPlan: async (id) => {
        set({ is_loading: true });
        try {
          await axiosInstance.delete(`/mealplan/${id}/`);
          set({ mealPlans: get().mealPlans.filter((mealPlan) => mealPlan.id !== id) });
          toastSuccess("Meal plan deleted successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to delete meal plan");
        } finally {
          set({ is_loading: false });
        }
      },

      updateMealPlan: async (id, formData) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.patch(`/mealplan/${id}/`, formData);
          set({ mealPlans: get().mealPlans.map((mealPlan) => (mealPlan.id === id ? response.data : mealPlan)) });
          toastSuccess("Meal plan updated successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to update meal plan");
        } finally {
          set({ is_loading: false });
        }
      },
      error: null,

      getMealPlans: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/mealplan/");

          set({ mealPlans: response.data.results });
        } catch (error) {
          set({ error: error });
        } finally {
          set({ is_loading: false });
        }
      },

      getSavedMealPlans: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/mealplan/saved/");

          set({ saved_mealPlans: response.data.results });
        } catch (error) {
          set({ error: error });
        } finally {
          set({ is_loading: false });
        }
      },

      getUserMealPlans: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/mealplan/user/");

          set({ user_mealPlans: response.data.results });
        } catch (error) {
          set({ error: error });
        } finally {
          set({ is_loading: false });
        }
      },

      getDetailMealPlan: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/mealplan/${id}/`);

          set({ detailMealPlan: response.data });
        } catch (error) {
          set({ error: error });
        } finally {
          set({ is_loading: false });
        }
      },
    }),
    {
      name: "mealPlans",
    }
  )
);
