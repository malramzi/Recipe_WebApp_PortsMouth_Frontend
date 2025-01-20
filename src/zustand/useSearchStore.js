import { create } from "zustand";

export const useSearchStore = create((set,get) => ({
    search: "",
    setSearch: (newSearch) => set(() => ({ search : newSearch })),
    getFilteredRecipes: (recipes) => {
      let search = get().search
      return recipes.filter(recipe => 
      recipe.desc.toLowerCase().includes(search.toLowerCase())
      ||recipe.title.toLowerCase().includes(search.toLowerCase())
    )}
  }))