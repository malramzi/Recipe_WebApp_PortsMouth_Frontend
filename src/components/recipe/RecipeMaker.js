import { useEffect, useState } from "react";
import { DragDropIngredients } from "../dnd/DragDropIngredients";
import { useRecipeStore } from "../../zustand/useRecipeStore";
import RecipeCard, { RecipeCardSkeleton } from "./RecipeCard";
import LoaderMask from "../layouts/LoaderMask";
const RecipeMaker = () => {
  const { getAllIngredients, generatedRecipeResponse, is_loading } =
    useRecipeStore();

  useEffect(() => {
    getAllIngredients();
  }, []);
  return (
    <>
      {is_loading ? (
        <LoaderMask />
      ) : !generatedRecipeResponse.length ? (
        <DragDropIngredients />
      ) : (
        <>
          <div className="mt-8 mx-auto gap-4 px-10 py-8">
            <div className=" grid lg:grid-cols-3 grid-cols-1 mb-6 gap-4">
              <div className="col-span-2 px-2 flex flex-col ">
                <h1 className="text-2xl font-bold mb-4 px-2 py-3 rounded-md bg-orange-600 text-slate-50">
                  Closest Match : {generatedRecipeResponse[0].matchPercentage}{" "}
                </h1>
                <RecipeCardSkeleton recipe={generatedRecipeResponse[0]} />
              </div>
              <div className="col-span-1 overflow-y-scroll flex flex-col px-2 [&>*]:mb-4 ">
                <h1 className="text-2xl font-bold mb-4 px-2 py-3 rounded-md bg-yellow-600 text-slate-50 sticky">
                  Alternatives with Less Than{" "}
                  {generatedRecipeResponse[0].matchPercentage} Match
                </h1>
                {generatedRecipeResponse.map((recipe, idx) => (
                  <RecipeCardSkeleton hoverGrayscale recipe={recipe} />
                ))}
              </div>
            </div>
          </div>
          <div className="px-8">
          <div
            onClick={() => {
              useRecipeStore.setState({
                ingredients: [
                  ...useRecipeStore.getState().ingredients,
                  ...useRecipeStore.getState().selectedIngredients,
                ],
              });
              useRecipeStore.setState({
                generatedRecipeResponse: [],
                selectedIngredients: [],
              });
            }}
            className=" mx-auto mt-8 px-4 py-3 rounded-lg text-center bg-blue-600 text-white hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 104.906 14.32.75.75 0 01.19-1.06.75.75 0 011.06.19A9.5 9.5 0 1110 .5a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V2.75A7.5 7.5 0 0010 2z"
                clipRule="evenodd"
              />
            </svg>
            Regenerate New Recipe
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecipeMaker;
