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
          const response = await axiosInstance.get("/feature/meals/");
          console.log(response.data)
          set({ meals: response.data.data });
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
          const response = await axiosInstance.get(`/feature/meal/${id}/`);

          set({ detailMeal: response.data.data });
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
          
          const finalData = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            finalData.append(key, value);
          });
          const response = await axiosInstance.post("/feature/meal/", finalData);

          set({ meals: [...get().meals, response.data.data] });
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
          const finalData = new FormData()
          Object.keys(formData).forEach((key) => {
            key !== "__v" && key!=="_id" && finalData.append(key, formData[key])
          })          
          const response = await axiosInstance.put(`/feature/meal/${id}/`,finalData);

          set({ meals: get().meals.map((meal) => (meal.id === id ? response.data.data : meal)) });
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
          await axiosInstance.delete(`/feature/meal/${id}/`);

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
// useMealStore.getState().getMeals();