import { useEffect, useState } from "react";
import MealPlanCard from "./MealPlanCard";
import { useMealPlanStore } from "../../zustand/useMealPlanStore";

export default function MealPlans() {
  const { meal_plans, getMealPlans } = useMealPlanStore();

  useEffect(() => {
    getMealPlans();
  }, []);

  if (!meal_plans || !meal_plans.length)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          No Meal Plans Available Yet.
        </p>
      </div>
    );

  return (
    <>
      <div className="mt-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Meal Plans
          </h2>
          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-6">
            {meal_plans.map((mealPlan) => (
              <MealPlanCard mealPlan={mealPlan} key={mealPlan._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

