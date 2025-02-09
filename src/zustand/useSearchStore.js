import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set, get) => ({
      search: "",
      setSearch: (newSearch) => set(() => ({ search: newSearch })),
      filters: [],
      setFilters: (newFilters) => set(() => ({ filters: newFilters })),
      getSearchedRecipes: (recipes) => {
        let search = get().search;
        let filteredRecipes = recipes.filter((recipe) => {
          let setIngredents = new Set(recipe.ingredients.join(" ").toLowerCase().split(" "));

          return (
            recipe.desc.toLowerCase().includes(search.toLowerCase()) ||
            recipe.title.toLowerCase().includes(search.toLowerCase()) ||
            search
              .toLowerCase()
              .split(" ")
              .some((word) => setIngredents.has(word))
          );
        });
        console.log(search, recipes, filteredRecipes);
        return filteredRecipes;
      },
      getFilteredRecipes: (recipes) => {
        let filters = get().filters.join(" ").toLowerCase();
        let foundRecipes = recipes.filter((recipe) =>
          recipe.ingredients.join(" ").toLowerCase().includes(filters)
        );

        return foundRecipes;
      },
    }),
    {
      name: "search",
    }
  )
);
