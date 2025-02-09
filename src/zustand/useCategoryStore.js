import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { categories } from "../utils/dummyData.js";
import { persist } from "zustand/middleware";
export const useCategoryStore = create(
  persist(
    (set, get) => ({
      categories: categories,
      detailCategory: null,
      is_loading: false,
      error: null,
      createCategoryLocal: (category) =>
        set({ categories: [...get().categories, {...category,id:get().categories.length}] }),
      updateCategoryLocal: (id, category) =>
        set({
          categories: [...get().categories.map((c) => (c.id === parseInt(id) ? category : c))]
        }),
      deleteCategoryLocal: (id) =>
        set({
          categories: get().categories.filter((c) => c.id !== id),
        }),

      getSingleCategory: (id) => {
        set({ is_loading: true });
        try {
          let category = get().categories.find((category) => category.id === id);
          set({ detailCategory: category, is_loading: false });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },
      getCategories: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/categories/");
          set({ categories: response.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      getDetailCategory: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/categories/${id}/`);
          set({ detailCategory: response.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      createCategory: async (category) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/categories/", category);
          set({
            categories: [...get().categories, response.data],
            is_loading: false,
          });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      updateCategory: async (id, category) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.put(`/categories/${id}/`, category);
          set({
            categories: get().categories.map((c) =>
              c.id === id ? response.data : c
            ),
            is_loading: false,
          });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      deleteCategory: async (id) => {
        set({ is_loading: true });
        try {
          await axiosInstance.delete(`/categories/${id}/`);
          set({
            categories: get().categories.filter((c) => c.id !== id),
            is_loading: false,
          });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },
    }),
    {
      name: "categories",
    }
  )
);

