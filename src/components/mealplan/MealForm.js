import React, { useState, useEffect } from "react";
import { useMealStore } from "../../zustand/useMealStore";
import Select from "react-select";
const MealForm = ({ editMode, handleFormSubmit, recipes = [] }) => {

  const [formData, setFormData] = useState({
    name: "",
    proteins: "",
    carbs: "",
    fats: "",
    portion: "",
    scale: "g",
    calories: "",
    description: "",
    recipe: "",
    image: null,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="md:grid md:grid-cols-3 md:gap-6 h-full p-2">
        <div className="md:col-span-1 flex justify-center items-center align-middle">
          <div className="px-4 sm:px-0">
            <h3 className="p-5 text-lg font-medium leading-6 text-gray-900">
              Add Your Meal Details!
            </h3>
            <p className="px-5 text-sm text-gray-600">
              "A balanced meal is the foundation of a healthy lifestyle. Make
              sure to track your macros and portion size!"
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
            <div className="sm:overflow-hidden">
              <div className="px-4 py-5 space-y-6 sm:p-6">
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Meal Name
                  </h1>
                  <input
                    type="text"
                    name="name"
                    className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Enter meal name..."
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-900">Proteins (g)</label>
                    <input
                      type="number"
                      name="proteins"
                      className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                      value={formData.proteins}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div>
                    <label className="text-gray-900">Carbs (g)</label>
                    <input
                      type="number"
                      name="carbs"
                      className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                      value={formData.carbs}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div>
                    <label className="text-gray-900">Fats (g)</label>
                    <input
                      type="number"
                      name="fats"
                      className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                      value={formData.fats}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Portion Size
                  </h1>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="portion"
                      className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                      value={formData.portion}
                      onChange={handleFormChange}
                    />
                    <select
                      name="scale"
                      className="shadow-sm p-2 border border-gray-300 rounded-md"
                      value={formData.scale}
                      onChange={handleFormChange}
                    >
                      <option value="mg">mg</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Calories
                  </h1>
                  <input
                    type="number"
                    name="calories"
                    className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                    value={formData.calories}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h1>
                  <textarea
                    name="description"
                    rows={3}
                    className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                    placeholder="Describe the meal..."
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Recipe Reference
                  </h1>
                  <Select
                    name="recipe"
                    className="[&>*]:z-[1000]"
                    value={recipes.find(recipe => recipe._id === formData.recipe)}
                    onChange={(selectedOption) => handleFormChange({ target: { name: "recipe", value: selectedOption._id } })}
                    options={recipes.map((recipe) => ({
                      value: recipe._id,
                      label: recipe.title
                    }))}
                    placeholder="Select a Recipe"
                    isClearable
                  />
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Upload Meal Image
                  </h1>
                  <input
                    type="file"
                    name="image"
                    className="shadow-sm p-2 focus:outline-none border border-gray-300 rounded-md w-full"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700"
                  >
                    {editMode ? "Update Meal" : "Create Meal"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealForm;
