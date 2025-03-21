import React from "react";
import { useCategoryStore } from "../../zustand/useCategoryStore";
import CategoryForm from "./category_form/CategoryForm";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const {createCategory} = useCategoryStore();
  const navigate = useNavigate()

  const handleFormSubmit = (formData) => {
    createCategory(formData);
    navigate('/dashboard/categories/')
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
