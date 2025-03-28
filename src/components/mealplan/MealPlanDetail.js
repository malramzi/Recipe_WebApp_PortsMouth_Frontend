import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useMealPlanStore } from "../../zustand/useMealPlanStore";
import { useAuthStore } from "../../zustand/useAuthStore";
import LoaderMask from "../layouts/LoaderMask";

export default function MealPlanDetail() {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const { getDetailMealPlan, detailMealPlan, isLoading } = useMealPlanStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getDetailMealPlan(id);
  }, [id]);

  if (isLoading || !detailMealPlan) {
    return <LoaderMask />;
  }

  return (
    <div className="bg-white">
      <main className="w-full sm:pt-16 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <div className="lg:grid  lg:gap-x-8 lg:items-start">
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <div className="flex sm:flex-col1">
                <h1 className="flex text-3xl font-extrabold tracking-tight capitalize text-gray-900">
                {detailMealPlan.title}
                </h1>
                {user && user._id === detailMealPlan.posted_by?._id && (
                  <>
                    <Link to={`/mealplan/edit/${id}`}>
                      <button
                        type="button"
                        className="group ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <PencilIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <p className="hidden ml-1 group-hover:block">Edit</p>
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="group ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      onClick={() => setModal(true)}
                    >
                      <TrashIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <p className="hidden ml-1 group-hover:block">Delete</p>
                    </button>
                  </>
                )}
              </div>
              <div className="mt-3">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-teal-600">
                  Created by: {detailMealPlan.posted_by?.first_name +  detailMealPlan.posted_by?.last_name || "Unknown"}
                </span>
              </div>
              <div className="inline-flex items-center text-teal-600 border py-1 px-2 mt-3 border-transparent bg-teal-50 rounded-md">
                <span className="font-medium">
                  {new Date(detailMealPlan.created_at).toLocaleDateString()}
                </span>
              </div>
              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">Meal Details</h2>
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {["breakfast", "lunch", "dinner"].map((mealType) => (
                    detailMealPlan[mealType] && (
                      <Link to={`/recipe/${detailMealPlan[mealType].recipe}`} key={mealType} className="hover:ring-green-800 ring-1  bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              process.env.HOST ||
                              "http://localhost:3415/media/" + detailMealPlan[mealType].image
                            }
                            className="w-16 h-16 rounded-full"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                            </h3>
                            <p className="text-sm text-gray-600">Title : {detailMealPlan[mealType].name}</p>
                            <p className="text-sm text-gray-600">Description : {detailMealPlan[mealType].description}</p>
                            <p className="text-sm text-gray-600">Calories : {detailMealPlan[mealType].calories || 0} Kcal</p>
                            <p className="text-sm text-gray-600">Fats : {detailMealPlan[mealType].fats || 0} g</p>
                            <p className="text-sm text-gray-600">Proteins : {detailMealPlan[mealType].proteins || 0} g</p>
                            <p className="text-sm text-gray-600">Carbs : {detailMealPlan[mealType].carbs || 0} g</p>
                            <p className="text-sm text-gray-600">Portion : {detailMealPlan[mealType].portion} {detailMealPlan[mealType].scale}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  ))}
                  {detailMealPlan.snacks.map((snack, idx) => (
                    <Link to={`/recipe/${snack.recipe}`} key={idx} className="hover:ring-green-800 ring-1 bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            process.env.HOST || "http://localhost:3415/media/" + snack.image
                          }
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Snack {idx + 1}</h3>
                          <p className="text-sm text-gray-600">Title : {snack.name}</p>
                            <p className="text-sm text-gray-600">Desc : {snack.description}</p>
                            <p className="text-sm text-gray-600">Calories :{snack.calories || 0} Kcal</p>
                            <p className="text-sm text-gray-600">Fats : {snack.fats || 0} g</p>
                            <p className="text-sm text-gray-600">Proteins : {snack.proteins || 0} g</p>
                            <p className="text-sm text-gray-600">Carbs : {snack.carbs || 0} g</p>
                            <p className="text-sm text-gray-600">Portion : {snack.portion} {snack.scale}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
