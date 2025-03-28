import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";
import Tab from "../layouts/Tab";

export default function MealPlanCards({ mealPlans, quickview, alt }) {
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
        {mealPlans.map((mealPlan) => {
          return (
            <MealPlanCardSkeleton mealPlan={mealPlan} key={mealPlan._id} />
          );
        })}
      </div>
    </>
  );
}

export const MealPlanCardSkeleton = ({ mealPlan, hoverGrayscale }) => {
  return (
    <Link
      to={`/mealPlan/${mealPlan._id}`}
      key={mealPlan.title}
      className={`bg-white overflow-hidden shadow rounded-lg min-h-[300px] ${
        hoverGrayscale ? "grayscale hover:grayscale-0" : ""
      } transition-all ease-in-out break-inside-avoid hover:scale-[1.01] hover:shadow-gray-400 hover:shadow-md`}
    >
      <div className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 hover:bg-center transition-all ease-in-out group bg-teal-800 h-full">
        <div className="flex items-center">
          <div className="text-xl lg:text-4xl font-bold truncate p-2 capitalize">
            <p className="text-gray-50">{mealPlan.title}</p>
            <div className="grid grid-cols-4 pb-4 gap-3">
              <div className="bg-white rounded-md ring-1 ring-black overflow-hidden p-2 text-sm text-center">
                <img
                  src={
                    process.env.HOST ||
                    "http://localhost:3415/media/" + mealPlan.breakfast.image
                  }
                />
                {mealPlan.breakfast.name}
              </div>
              <div className="bg-white rounded-md ring-1 ring-black overflow-hidden p-2 text-sm text-center">
                <img
                  src={
                    process.env.HOST ||
                    "http://localhost:3415/media/" + mealPlan.lunch.image
                  }
                />
                {mealPlan.lunch.name}
              </div>
              <div className="bg-white rounded-md ring-1 ring-black overflow-hidden p-2 text-sm text-center">
                <img
                  src={
                    process.env.HOST ||
                    "http://localhost:3415/media/" + mealPlan.dinner.image
                  }
                />
                {mealPlan.dinner.name}
              </div>
              <div className="bg-gray-100 rounded-md ring-1 ring-black overflow-hidden p-2 flex justify-center items-center">
                +{mealPlan.snacks.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
