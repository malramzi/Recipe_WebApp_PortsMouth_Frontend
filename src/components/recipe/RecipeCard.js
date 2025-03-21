import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";
import QuickView from "./QuickView";
import Tab from "../layouts/Tab";

export default function RecipeCard({ recipes, quickview, alt }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  return (
    <>
      <div
        className={
          "mt-2 grid grid-flow-row-dense grid-cols-1 md:grid-rows-3 md:grid-cols-3 3xl:grid-cols-5 gap-6 " +
          (alt
            ? " "
            : "md:[&>a:nth-child(3n+1)]:row-span-3 md:[&>a:nth-child(3n+1)]:col-span-1 md:[&>a:nth-child(3n+2)]:col-span-2 md:[&>a:nth-child(3n+3)]:col-span-1")
        }
      >
        {recipes.map((recipe) => {
          console.log(recipe.image);
          return <RecipeCardSkeleton recipe={recipe} key={recipe._id} />;
        })}
      </div>
      {open && <QuickView open={open} setOpen={setOpen} id={id} />}
    </>
  );
}

export const RecipeCardSkeleton = ({ recipe, hoverGrayscale }) => {
  return (
    <Link
      to={`/recipe/${recipe._id}`}
      key={recipe.title}
      className={`bg-white overflow-hidden shadow rounded-lg min-h-[300px] ${hoverGrayscale ? "grayscale hover:grayscale-0" : ""} transition-all ease-in-out break-inside-avoid hover:scale-[1.01] hover:shadow-gray-400 hover:shadow-md`}
    >
      <div
        className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 hover:bg-center transition-all ease-in-out group "
        style={{
          backgroundImage: `url(${
            process.env.HOST || "http://localhost:3415/media/" + recipe.image
          })`,
          height: "95%",
          minHeight: "300px",
        }}
      >
        <div className="flex items-center">
          <div className="w-0 flex-1">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed text-gray-100 hover:text-gray-50 bg-gray-800/50 group-hover:bg-gray-800/30">
              <div className="flex flex-col items-start bg-teal-700/60 p-2 group-hover:h-full group-hover:bg-teal-900/50 transition-all duration-1000 ease-in-out">
                <div className="text-xl lg:text-4xl font-bold truncate">
                  {recipe.title}
                  <div className="flex flex-wrap pb-4 gap-3 group-hover:hidden" >
                    {" "}
                    {recipe.ingredients.map((ingredient, idx) => (
                      <Tab alt key={ingredient}>
                        {ingredient}
                      </Tab>
                    ))}
                  </div>
                </div>

                {recipe.description.length > 100 ? (
                  <>
                    <div className="text-sm group-hover:hidden">
                      {recipe.description.split(" ", 15).join(" ") + "..."}
                    </div>{" "}
                    <div className="text-sm hidden group-hover:block">
                      {recipe.description.split(" ", 40).join(" ") + "..."}
                    </div>
                  </>
                ) : (
                  <div className="text-sm">{recipe.description}</div>
                )}
                <div className="text-xs font-light border border-gray-200 p-1 rounded-lg truncate">
                  by {recipe.posted_by.first_name + " " +recipe.posted_by.last_name}
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
  );
};

export const RecipeCardSkeletonAlt = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe._id}`}
      key={recipe.title}
      className={`bg-white overflow-hidden shadow rounded-lg min-h-[300px] transition-all ease-in-out break-inside-avoid hover:scale-[1.01] hover:shadow-gray-400 hover:shadow-md`}
    >
      <div
        className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 hover:bg-center transition-all ease-in-out group "
        style={{
          backgroundImage: `url(${
            process.env.HOST || "http://localhost:3415/media/" + recipe.image
          })`,
          height: "100%",
          minHeight: "300px",
        }}
      >
        <div className="flex items-center">
          <div className="w-0 flex-1">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed text-gray-100 hover:text-gray-50 bg-gray-800/50 group-hover:bg-gray-800/30">
              <div className="flex flex-col items-start bg-teal-700/60 p-2 group-hover:h-full group-hover:bg-transparent transition-all duration-1000 ease-in-out">
                <div className="text-xl lg:text-4xl font-bold truncate">
                  {recipe.title}
                  <div className="flex pb-4 gap-3 overflow-x-scroll">
                    {" "}
                    {recipe.ingredients.map((ingredient, idx) => (
                      <Tab alt key={ingredient}>
                        {ingredient}
                      </Tab>
                    ))}
                  </div>
                </div>

                {recipe.description.length > 100 ? (
                  <>
                    <div className="text-sm group-hover:hidden">
                      {recipe.description.split(" ", 15).join(" ") + "..."}
                    </div>{" "}
                    <div className="text-sm hidden group-hover:block">
                      {recipe.description.split(" ", 40).join(" ") + "..."}
                    </div>
                  </>
                ) : (
                  <div className="text-sm">{recipe.description}</div>
                )}
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
  );
};
