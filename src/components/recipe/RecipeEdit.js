import React, { useEffect } from "react";
import RecipeForm from "./recipe_form/RecipeForm";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { editRecipe } from "../../redux/actions/recipes";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function RecipeEdit() {
  const { id } = useParams();

  const { detailRecipe, getSingleRecipe, updateRecipeLocal } = useRecipeStore();

  useEffect(()=>{
    getSingleRecipe(parseInt(id))
  },[])
  
  const handleFormSubmit = (formData) => {
    updateRecipeLocal(id, formData)
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
