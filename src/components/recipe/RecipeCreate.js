import React from "react";
import RecipeForm from "./recipe_form/RecipeForm";
import { useRecipeStore } from "../../zustand/useRecipeStore";
import { useNavigate } from "react-router-dom";

export default function RecipeCreate() {
  const { createRecipe, is_loading, error } = useRecipeStore();
  const handleFormSubmit = async (formData) => {
    let recipe = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "ingredients" || key === "procedures")
        recipe.append(key, JSON.stringify(formData[key]));
      else recipe.append(key, formData[key]);
    });
    await createRecipe(recipe);
  };

  return (
    <div>
      <RecipeForm
        buttonLabel="Create"
        editMode={false}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
