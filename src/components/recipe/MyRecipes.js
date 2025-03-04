import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecipeCard from "./RecipeCard";
import { getUserRecipes } from "../../redux/actions/user";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function MyRecipes() {
  const dispatch = useDispatch();

  const { recipes } = useRecipeStore();

  if (!recipes)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Can not find any recipes, sorry (:
        </p>
      </div>
    );

  return (
    <>
      <div className="mt-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            My Recipes
          </h2>
          <RecipeCard alt recipes={recipes} quickview={false} />
        </div>
      </div>
    </>
  );
}
