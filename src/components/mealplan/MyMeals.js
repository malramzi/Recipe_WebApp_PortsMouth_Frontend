import { Link } from "react-router-dom";
import { useMealStore } from "../../zustand/useMealStore";
import { useEffect } from "react";

export default function MyMeals() {
  const { meals, getMeals } = useMealStore();

  useEffect(() => {
    getMeals();
  }, []);

  if (!meals || !meals.length)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          No Meals Authored Yet.
        </p>
      </div>
    );

  return (
    <>
      <div className="mt-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            My Meals
          </h2>
          <div className="grid grid-cols-3 gap-4">
          {meals.map((meal,idx) => (
            <div className="grid grid-cols-5 items-center space-x-4 ring-1 rounded-md p-2 hover:ring-green-800 bg-teal-700" key={idx}>
              <img
                src={
                  process.env.HOST ||
                  "http://localhost:3415/media/" +
                    meal.image
                }
                className="w-16 h-16 rounded-full col-span-1"
              />
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Title : {meal.name}
                </p>
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Description : {meal.description}
                </p>
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Calories : {meal.calories || 0} Kcal
                </p>
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Fats : {meal.fats || 0} g
                </p>
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Proteins : {meal.proteins || 0} g
                </p>
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Carbs : {meal.carbs || 0} g
                </p>
                <p className="text-sm text-gray-800 p-2 bg-gray-100 shadow rounded-full">
                  Portion : {meal.portion}{" "}
                  {meal.scale}
                </p>
              </div>
              <Link to={`/meals/edit/${meal._id}`} className="ml-auto col-span-1">
                <button className="px-2 py-1 bg-orange-400 text-stone-50 rounded hover:bg-orange-500">
                  Edit
                </button>
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
