import RecipeCard from "./RecipeCard";
import { useRecipeStore } from "../../zustand/useRecipeStore";
import { useEffect } from "react";

export default function SavedRecipes() {

  const { saved_recipes, getSavedRecipes } = useRecipeStore();
  
  useEffect(() => {
      getSavedRecipes();
    }, []);

  if (!saved_recipes || !saved_recipes.length)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          No Saved Recipes Yet.
        </p>
      </div>
    );

  return (
    <>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Saved Recipes
          </h2>
          <RecipeCard recipes={saved_recipes} quickview={false} />
        </div>
      </div>
    </>
  );
}
