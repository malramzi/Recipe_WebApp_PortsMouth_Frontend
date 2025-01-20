import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";
import { likeRecipe, saveRecipe } from "../../redux/actions/recipes";

import QuickView from "./QuickView";

export default function RecipeCard({ recipes, quickview }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  return (
    <>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-5">
       {recipes.map((recipe) => <RecipeCardSkeleton recipe={recipe}/>)}
      </div>
      {/* Pagination */}
      {/* <nav
        className="bg-white mt-10 px-4 pt-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">20</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <a
            href="/"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="/"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </nav> */}
      {open && <QuickView open={open} setOpen={setOpen} id={id} />}
    </>
  );
}

export const RecipeCardSkeleton = ({recipe}) => {
  console.log(recipe)
  return <Link
      to={`/recipe/${recipe.id}`}
        key={recipe.title}
        className="bg-white overflow-hidden shadow rounded-lg min-h-[300px]"
      >
        <div
          className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 hover:bg-center transition-all ease-out"
          style={{
            backgroundImage: `url(${recipe.picture})`,
            height: "400px",
          }}
        >
          <div className="flex items-center">
            <div className="w-0 flex-1">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed text-gray-100 hover:text-gray-50 bg-gray-800/50 hover:bg-gray-800/70">
                <div className="flex flex-col items-start bg-teal-700/60 p-2">
                  <div className="text-xl lg:text-4xl font-bold truncate">
                    {recipe.title}
                  </div>
                  <div className="text-sm">
                    {recipe.desc.length > 100
                      ? recipe.desc.split(" ", 15).join(" ") + "..."
                      : recipe.desc}
                  </div>
                  <div className="text-xs font-light border border-gray-200 p-1 rounded-lg truncate">
                    by {recipe.username}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-2 p-2 flex items-center gap-2 [&>*]:bg-teal-500/60 [&>*]:p-2 [&>*]:rounded-full [&>*:hover]:bg-teal-500">
            <label htmlFor="bookmark">
              <input
                type="checkbox"
                name="bookmark"
                id="bookmark"
                className="peer hidden"
              />
              <BookmarkIcon
                className="h-6 w-6 peer-checked:fill-gray-100 cursor-pointer transition-all ease-in-out text-white"
                aria-hidden="true"
                // onClick={() => {
                //   dispatch(saveRecipe(recipe.author, id));
                // }}
              />
            </label>
            <label htmlFor="heart">
              <input
                type="checkbox"
                name="heart"
                id="heart"
                className="peer hidden"
              />
              <HeartIcon
                className="h-6 w-6 peer-checked:fill-red-500 cursor-pointer transition-all ease-in-out text-white"
                aria-hidden="true"
                // onClick={() => {
                //   dispatch(likeRecipe(id));
                // }}
              />
            </label>
          </div>
        </div>
      </Link>
};

export const RecipeCardSkeletonAlt = ({recipe}) => {
  return <Link
      to={`/recipe/${recipe.id}`}
        key={recipe.title}
        className="bg-white overflow-hidden shadow rounded-lg min-h-[300px]"
      >
        <div
          className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 hover:bg-center transition-all ease-out"
          style={{
            backgroundImage: `url(${recipe.picture})`,
            height: "400px",
          }}
        >
          <div className="flex items-center">
            <div className="w-0 flex-1">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed text-gray-100 hover:text-gray-50 bg-gray-800/50 hover:bg-gray-800/70">
                <div className="flex flex-col items-start bg-teal-700/60 p-2">
                  <div className="text-xl lg:text-4xl font-bold truncate">
                    {recipe.title}
                  </div>
                  <div className="text-sm">
                    {recipe.desc?.length > 100
                      ? recipe.desc?.split(" ", 15).join(" ") + "..."
                      : recipe.desc}
                  </div>
                  <div className="text-xs font-light border border-gray-200 p-1 rounded-lg truncate">
                    by {recipe.author.username}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-2 p-2 flex items-center gap-2 [&>*]:bg-teal-500/60 [&>*]:p-2 [&>*]:rounded-full [&>*:hover]:bg-teal-500">
            <label htmlFor="bookmark">
              <input
                type="checkbox"
                name="bookmark"
                id="bookmark"
                className="peer hidden"
              />
              <BookmarkIcon
                className="h-6 w-6 peer-checked:fill-gray-100 cursor-pointer transition-all ease-in-out text-white"
                aria-hidden="true"
                // onClick={() => {
                //   dispatch(saveRecipe(recipe.author, id));
                // }}
              />
            </label>
            <label htmlFor="heart">
              <input
                type="checkbox"
                name="heart"
                id="heart"
                className="peer hidden"
              />
              <HeartIcon
                className="h-6 w-6 peer-checked:fill-red-500 cursor-pointer transition-all ease-in-out text-white"
                aria-hidden="true"
                // onClick={() => {
                //   dispatch(likeRecipe(id));
                // }}
              />
            </label>
          </div>
        </div>
      </Link>
};
