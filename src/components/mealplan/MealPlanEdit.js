import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MealPlanForm from "./MealPlanForm";
import { useMealPlanStore } from "../../zustand/useMealPlanStore";
import { useMealStore } from "../../zustand/useMealStore";

export default function MealPlanEdit() {
  const { id } = useParams();
  const { detailMealPlan, getDetailMealPlan, updateMealPlan } =
    useMealPlanStore();
  const { meals } = useMealStore();

  useEffect(() => {
    getDetailMealPlan(id);
  }, [id]);

  const handleFormSubmit = (formData) => {
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      if (typeof formData[mealType] !== "string")
        formData[mealType] = formData[mealType]._id;
    });
    formData.snacks = formData.snacks.map((snack) =>
      typeof snack !== "string" ? snack._id : snack
    );
    updateMealPlan(id, {
      snacks: formData.snacks,
      dinner: formData.dinner,
      lunch: formData.lunch,
      breakfast: formData.breakfast,
      title: formData.title,
    });
    console.log(formData);
  };

  return (
    <div>
      <MealPlanForm
        handleFormSubmit={handleFormSubmit}
        meals={meals}
        prevData={detailMealPlan}
        editMode={true}
      />
    </div>
  );
}
