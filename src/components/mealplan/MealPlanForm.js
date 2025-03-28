import React, { useState } from "react";

const MealPlanForm = ({ editMode, handleFormSubmit, meals, prevData }) => {
  const [formData, setFormData] = useState(
    prevData || {
      title: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      snacks: [],
    }
  );

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevState) => {
      const newSnacks = checked
        ? [...prevState.snacks, value]
        : prevState.snacks.filter((snack) => snack !== value);
      return { ...prevState, snacks: newSnacks };
    });
  };

  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="md:grid md:grid-cols-3 md:gap-6 h-full p-2">
        <div className="md:col-span-1 flex justify-center items-center align-middle">
          <div className="px-4 sm:px-0">
            <h3 className="p-5 text-lg font-medium leading-6 text-gray-900">
              Create Your Meal Plan and Stay Healthy!
            </h3>
            <p className="px-5 text-sm text-gray-600">
              "A well-planned meal fuels your body and mind. Choose wisely!"
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 col-span-2 flex justify-center items-center align-middle bg-gray-50 shadow sm:rounded-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(formData);
            }}
          >
            <div className="px-4 py-5 space-y-6 sm:p-6">
              <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900">
                  Meal Plan Title
                </h1>
                <input
                  type="text"
                  name="title"
                  className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                  placeholder="Enter meal plan title..."
                  value={formData.title}
                  onChange={handleFormChange}
                />
              </div>
              {["breakfast", "lunch", "dinner"].map((mealType) => (
                <div key={mealType}>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </h1>
                  <select
                    name={mealType}
                    value={formData[mealType]._id}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select a meal</option>
                    {meals.map((meal) => (
                      <option key={meal._id} value={meal._id}>
                        {meal.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900">
                  Snacks
                </h1>
                <div className="grid grid-cols-2 gap-2">
                  {meals.map((meal) => (
                    <label key={meal._id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={meal._id}
                        checked={formData.snacks.find(snack => snack._id === meal._id)}
                        onChange={handleSnackChange}
                        className="mr-2"
                      />
                      {meal.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                >
                  {editMode ? "Update Meal Plan" : "Create Meal Plan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealPlanForm;
