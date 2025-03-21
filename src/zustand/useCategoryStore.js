import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { categories } from "../utils/dummyData.js";
import { persist } from "zustand/middleware";
import { toastSuccess, toastError, toastWarning } from "../components/layouts/MessageToasts.js";
export const useCategoryStore = create(
  persist(
    (set, get) => ({
      categories: [],
      userCategories:[],
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
          set({ error: error.response.data.data.message, is_loading: false });
          toastError(error.response.data.data.message);
        }
      },
      getCategories: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/explore/categories/");
          set({ categories: response.data.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data.data.message, is_loading: false });
          toastError(error.response.data.data.message);
        }
      },

      getCategoriesByUser: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/explore/categories/user/`);
          set({ userCategories: response.data.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data.data.message, is_loading: false });
          toastError(error.response.data.data.message);
        }
      },

      getDetailCategory: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/explore/category/${id}/`);
          set({ detailCategory: response.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data.data.message, is_loading: false });
          toastError(error.response.data.data.message);
        }
      },

      createCategory: async (category) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/explore/category/", category);
          set({
            userCategories: [...get().categories, response.data.data],
            is_loading: false,
          });
          toastSuccess("Category created successfully");
        } catch (error) {
          set({ error: error.response.data.data.message, is_loading: false });
          toastError(error.response.data.data.message);
        }
      },

      updateCategory: async (id, category) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.put(`/explore/category/${id}/`, category);
          set({
            userCategories: get().userCategories.map((c) =>
              c._id === id ? response.data.data : c
            ),
            is_loading: false,
          });
          toastSuccess("Category updated successfully");
        } catch (error) {
          set({ error: error.response.data.data.message, is_loading: false });
          toastError(error.response.data.data.message);
        }
      },

      deleteCategory: async (id) => {
        set({ is_loading: true });
        try {
          await axiosInstance.delete(`/explore/category/${id}/`);
          set({
            userCategories: get().userCategories.filter((c) => c._id !== id),
            is_loading: false,
          });
          toastWarning("Category deleted successfully");
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
          toastError("Failed to delete category");
        }
      },
    }),
    {
      name: "categories",
    }
  )
);


useCategoryStore.getState().getCategories();

