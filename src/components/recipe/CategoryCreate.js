import React from "react";
import RecipeForm from "./recipe_form/RecipeForm";

import { useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions/recipes";
import { useCategoryStore } from "../../zustand/useCategoryStore";
import CategoryForm from "./category_form/CategoryForm";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const {createCategoryLocal} = useCategoryStore();
  const navigate = useNavigate()

  const handleFormSubmit = (formData) => {
    createCategoryLocal(formData);
    navigate('/recipe/categories/')
  };

  return (
    <div>
      <CategoryForm
        editMode={false}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
