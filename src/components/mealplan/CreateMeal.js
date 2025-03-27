import React from "react";
import { useMealStore } from "../../zustand/useMealStore";
import MealForm from "./MealForm";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function MealCreate() {
  const { createMeal } = useMealStore();
  const { recipes } = useRecipeStore();
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    createMeal(formData);
    navigate('/dashboard/meals/');
  };

  return (
    <div>
      <MealForm
        editMode={false}
        handleFormSubmit={handleFormSubmit}
        recipes={recipes}
      />
    </div>
  );
}