import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { persist } from "zustand/middleware";
import { toastSuccess, toastError, toastWarning } from "../components/layouts/MessageToasts";

export const useMealStore = create(
  persist(
    (set, get) => ({
      meals: [],
      detailMeal: null,
      is_loading: false,
      error: null,

      getMeals: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/meal/");

          set({ meals: response.data.results });
          toastSuccess("Meals fetched successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to fetch meals");
        } finally {
          set({ is_loading: false });
        }
      },

      getDetailMeal: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/meal/${id}/`);

          set({ detailMeal: response.data });
          toastSuccess("Meal fetched successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to fetch meal");
        } finally {
          set({ is_loading: false });
        }
      },

      createMeal: async (formData) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/meal/", formData);

          set({ meals: [...get().meals, response.data] });
          toastSuccess("Meal created successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to create meal");
        } finally {
          set({ is_loading: false });
        }
      },

      updateMeal: async (id, formData) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.patch(`/meal/${id}/`, formData);

          set({ meals: get().meals.map((meal) => (meal.id === id ? response.data : meal)) });
          toastSuccess("Meal updated successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to update meal");
        } finally {
          set({ is_loading: false });
        }
      },

      deleteMeal: async (id) => {
        set({ is_loading: true });
        try {
          await axiosInstance.delete(`/meal/${id}/`);

          set({ meals: get().meals.filter((meal) => meal.id !== id) });
          toastSuccess("Meal deleted successfully");
        } catch (error) {
          set({ error: error });
          toastError("Failed to delete meal");
        } finally {
          set({ is_loading: false });
        }
      },
    }),
    {
      name: "meals",
    }
  )
);
