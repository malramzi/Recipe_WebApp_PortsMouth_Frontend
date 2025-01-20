import React from "react";
import RecipeForm from "./recipe_form/RecipeForm";

import { useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions/recipes";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function RecipeCreate() {
  const {createRecipeLocal} = useRecipeStore();

  const handleFormSubmit = (formData) => {
    createRecipeLocal(formData);
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
