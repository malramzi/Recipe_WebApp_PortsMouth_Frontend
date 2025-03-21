import React, { useEffect } from "react";
import RecipeForm from "./recipe_form/RecipeForm";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function RecipeEdit() {
  const { id } = useParams();

  const { detailRecipe, getDetailRecipe, updateRecipe } = useRecipeStore();

  useEffect(()=>{
    getDetailRecipe(id)
  },[])
  
  const handleFormSubmit = (formData) => {
    updateRecipe(id, formData)
    console.log(formData)
  };

  return (
    <div>
      <RecipeForm
        buttonLabel="Update"
        handleFormSubmit={handleFormSubmit}
        editMode={true}
        recipe={detailRecipe}
      />
    </div>
  );
}
