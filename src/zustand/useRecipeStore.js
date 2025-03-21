import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { recipes } from "../utils/dummyData.js";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore.js";
import { toastSuccess, toastError, toastWarning } from "../components/layouts/MessageToasts.js";
export const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      ingredients: [],
      selectedIngredients: [],
      generatedRecipeResponse: [],
      saved_recipes: [],
      user_recipes: [],
      detailRecipe: null,
      is_loading: false,
      error: null,
      setSelectedIngredients: (selectedIngredients) => set({selectedIngredients}),
      setIngredients: (ingredients) => set({ingredients}),
      createRecipeLocal: (recipe) =>
        set({ recipes: [...get().recipes, recipe] }),
      updateRecipeLocal: (id, recipe) =>
        set({
          recipes: [
            ...get().recipes.map((r) => (r.id === parseInt(id) ? recipe : r)),
          ],
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
          toastSuccess("Recipe fetched successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },
      getRecipes: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/blog/recipes/");
          set({ recipes: response.data.data, is_loading: false });
          toastSuccess("Recipes fetched successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },

      getDetailRecipe: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(`/blog/recipe/${id}/`);
          set({ detailRecipe: response.data.data, is_loading: false });
          toastSuccess("Recipe fetched successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false, detailRecipe:null });
          toastError(error.response.data.data.error);
        }
      },

      createRecipe: async (recipe) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/blog/recipes/", recipe);
          set({
            recipes: [...get().recipes, response.data.data],
            is_loading: false,
          });
          toastSuccess("Recipe created successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },

      getAllIngredients: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get("/blog/ingredients/");
          set({ ingredients: response.data.data, selectedIngredients: [], is_loading: false });
          toastSuccess("Ingredients fetched successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },

      saveRecipe: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post(
            `/auth/user/saveRecipe`,
            { id }
          );
          set({
            is_loading: false,
            detailRecipe: {...get().detailRecipe, saves: get().detailRecipe.saves + 1}
          });
          toastSuccess("Recipe saved successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },
      likeRecipe: async (id) => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post(
            `/auth/user/likeRecipe`,
            { id }
          );

          set({
            is_loading: false,
            detailRecipe: {...get().detailRecipe, likes: get().detailRecipe.likes + 1}
          });
          toastSuccess("Recipe liked successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },

      getUserRecipes: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(
            "/blog/recipes/user-recipes/"
          );
          set({ user_recipes: response.data.data, is_loading: false });
          toastSuccess("User recipes fetched successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },

      getSavedRecipes: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.get(
            "/auth/user/getSavedRecipes"
          );
          set({ saved_recipes: response.data.data.savedRecipes, is_loading: false });
          toastSuccess("Saved recipes fetched successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },
      updateRecipe: async (id, recipe) => {
        set({ is_loading: true });
        try {
          const formData = new FormData();
          Object.keys(recipe).forEach((key) => {
            if(key === "ingredients" || key === "procedures")
              formData.append(key, JSON.stringify(recipe[key]));
            else if (
                ( key === "category") &&
                typeof recipe[key] !== "string"
              )
                formData.append(key, recipe[key]._id);
              else formData.append(key, recipe[key]);
          });
          const response = await axiosInstance.put(
            `/blog/recipe/${id}/`,
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
          set({
            recipes: get().recipes.map((r) =>
              r.id === id ? response.data.data : r
            ),
            is_loading: false,
          });
          toastSuccess("Recipe updated successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },

      deleteRecipe: async (id) => {
        set({ is_loading: true });
        try {
          await axiosInstance.delete(`/blog/recipe/${id}/`);
          set({
            recipes: get().recipes.filter((r) => r.id !== id),
            is_loading: false,
          });
          toastSuccess("Recipe deleted successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },
      makeRecipe: async () => {
        set({ is_loading: true });
        try {
          const response = await axiosInstance.post("/blog/recipe/make", {
            ingredients : get().selectedIngredients,
          });
          set({
            generatedRecipeResponse: response.data.data,
            is_loading: false,
          });
          toastSuccess("Recipe generated successfully");
          set({error: null});
        } catch (error) {
          set({ error: error.response.data.data.error, is_loading: false });
          toastError(error.response.data.data.error);
        }
      },
    }),
    {
      name: "recipes",
    }
  )
);

useRecipeStore.getState().getRecipes();

