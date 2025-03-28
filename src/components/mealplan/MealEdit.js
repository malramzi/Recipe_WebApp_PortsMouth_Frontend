import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMealStore } from "../../zustand/useMealStore";
import MealForm from "./MealForm";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function MealEdit() {
  const { id } = useParams();
  const { getDetailMeal, updateMeal, detailMeal } = useMealStore();
  const {recipes} = useRecipeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailMeal(id).then(() => setLoading(false));
  }, [id, getDetailMeal]);

  const handleFormSubmit = (formData) => {
    updateMeal(id, formData);
    console.log("Updated Meal Data:", formData);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Meal</h1>
      <MealForm buttonLabel="Update Meal" handleFormSubmit={handleFormSubmit} editMode={true} meal={detailMeal} recipes={recipes}/>
    </div>
  );
}
