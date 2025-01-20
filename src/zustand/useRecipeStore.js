import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { recipes } from "../utils/dummyData.js";
import { persist } from "zustand/middleware";
export const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: recipes.recipes,
      detailRecipe: null,
      is_loading: false,
      error: null,
      createRecipeLocal: (recipe) =>
        set({ recipes: [...get().recipes, recipe] }),
      updateRecipeLocal: (id, recipe) =>
        set({
          recipes: [...get().recipes.map((r) => (r.id === parseInt(id) ? recipe : r))]
        }),
      deleteRecipeLocal: (id) =>
        set({
          recipes: get().recipes.filter((r) => r.id !== id),
        }),

      getSingleRecipe: (id) => {
        set({ is_loading: true });
        try {
          let recipe = get().recipes.find((recipe) => recipe.id === id);
          set({ detailRecipe: recipe, is_loading: false });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },
      getRecipes: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/recipes/");
          set({ recipes: response.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      getDetailRecipe: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/recipes/${id}/`);
          set({ detailRecipe: response.data, is_loading: false });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      createRecipe: async (recipe) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/recipes/", recipe);
          set({
            recipes: [...get().recipes, response.data],
            is_loading: false,
          });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      updateRecipe: async (id, recipe) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.put(`/recipes/${id}/`, recipe);
          set({
            recipes: get().recipes.map((r) =>
              r.id === id ? response.data : r
            ),
            is_loading: false,
          });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },

      deleteRecipe: async (id) => {
        set({ is_loading: true });
        try {
          await axiosInstance.delete(`/recipes/${id}/`);
          set({
            recipes: get().recipes.filter((r) => r.id !== id),
            is_loading: false,
          });
        } catch (error) {
          set({ error: error.response.data, is_loading: false });
        }
      },
    }),
    {
      name: "recipes",
    }
  )
);
