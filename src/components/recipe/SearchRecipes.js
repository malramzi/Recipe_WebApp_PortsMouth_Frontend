import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions/recipes";

import RecipeCard, { RecipeCardSkeleton } from "./RecipeCard";
import { useSearchStore } from "../../zustand/useSearchStore";
import { SearchIcon } from "@heroicons/react/solid";
import Tab from "../layouts/Tab";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function SearchRecipes() {
  const dispatch = useDispatch();
  const { recipes } = useRecipeStore();
  const { setSearch, search, getFilteredRecipes } = useSearchStore();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  useEffect(() => {
    search !== "" && setFilteredRecipes(getFilteredRecipes(recipes));
  }, [search]);

  return (
    <>
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Search"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div
        className={`mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ${
          !search && "hidden"
        }`}
      >
        <div className="z-[1000] p-2 pt-0 fixed top-[80px] left-[50%] translate-x-[-50%] w-[50%] bg-white ring-1 rounded-md shadow overflow-y-scroll flex flex-col gap-2 max-h-[50vh]">
          {!filteredRecipes || filteredRecipes.length === 0 ? (
            <div className="text-center">No recipes found</div>
          ) : (
            <>
              <div className="flex gap-2 p-4 sticky top-0 z-[1000] bg-white">
                {filteredRecipes.map((recipe) => {
                  let items = new Set(recipe.ingredients);
                  return [...items].map((ingredient) => (
                    <Tab key={ingredient}>{ingredient}</Tab>
                  ));
                })}
              </div>
              {filteredRecipes.map((recipe) => (
                <RecipeCardSkeleton recipe={recipe} key={recipe.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
