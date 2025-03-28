import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMealPlanStore } from "../../zustand/useMealPlanStore";
import { useMealStore } from "../../zustand/useMealStore";
import MealPlanForm from "./MealPlanForm";

export default function MealPlanCreate() {
  const navigate = useNavigate();
  const { createMealPlan } = useMealPlanStore();
  const { meals, getMeals } = useMealStore();
  
  const [formData, setFormData] = useState({
    title:"",
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: [],
  });

  useEffect(() => {
    getMeals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSnackChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      snacks: checked ? [...prev.snacks, value] : prev.snacks.filter((snack) => snack !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMealPlan(formData);
    // navigate("/mealplans");
  };

  return (
    <MealPlanForm handleFormSubmit={handleSubmit} meals={meals}/>
  );
}
