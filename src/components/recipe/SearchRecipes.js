import { useEffect, useMemo, useState } from "react";
import RecipeCard, { RecipeCardSkeleton } from "./RecipeCard";
import { useSearchStore } from "../../zustand/useSearchStore";
import { SearchIcon } from "@heroicons/react/solid";
import Tab from "../layouts/Tab";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function SearchRecipes() {
  const { recipes } = useRecipeStore();
  const { setSearch, search, filters, setFilters,getSearchedRecipes, getFilteredRecipes } = useSearchStore();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const tabClickHandler = (e) => {
    e.preventDefault();
    search.includes(e.target.textContent.toLowerCase()) ? setSearch(search.replace(e.target.textContent.toLowerCase(), "")) : setSearch(search + " " + e.target.textContent.toLowerCase());
    // filters.find(filter => filter === e.target.textContent.toLowerCase()) ? setFilters([...filters.filter(filter => filter !== e.target.textContent.toLowerCase())]) : setFilters([...filters,e.target.textContent.toLowerCase()]);
  }

  const ingredientTabs = useMemo(() => {
    let ingredients = filteredRecipes.map((recipe) => recipe.ingredients).flat()
    return [...new Set(ingredients)].sort();
  })

  useEffect(() => {
    search !== "" && setFilteredRecipes(getSearchedRecipes(recipes));
  }, [search]);

  useEffect(() => {
    filters.length && setFilteredRecipes(filteredRecipes.filter(recipe => recipe.ingredients.some(ingredient => filters.includes(ingredient.toLowerCase()))));
  }, [filters]);

  return (
    <>
      <div className="w-full">
        <label htmlFor="search_recipes" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search_recipes"
            name="search_recipes"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Search Recipes"
            type="search_recipes"
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
              <label htmlFor="tabs" className=" w-full bg-white px-2 py-3">
              Show Ingredients? &nbsp;
              <input type="checkbox" id="tabs" className="peer checkbox accent-green-600 scale-105 px-1"/>
              <div className=" flex-wrap gap-2 p-16 sticky top-0 z-[1000] bg-white hidden peer-checked:flex">
                {ingredientTabs.map((ingredient) => (
                    <Tab key={ingredient} onClick={tabClickHandler} selected={search.toLowerCase().includes(ingredient.toLowerCase())}>{ingredient}</Tab>
                  ))}
              </div></label>
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
