import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useCategoryStore } from "../../../zustand/useCategoryStore";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Category({ editMode, recipe, handleFormChange }) {
  const [selectedcategories, setSelectedcategories] = useState((editMode && recipe.category) || {});
  const {categories} = useCategoryStore()
  const [categoriesToShow, setCategoriesToShow] = useState(categories.slice(0, 10));

  const handleLoadMore = () => {
    setCategoriesToShow(categoriesToShow.concat(categories.slice(categoriesToShow.length, categoriesToShow.length + 10)));
  }

  return (
    <RadioGroup value={selectedcategories.title} onChange={e =>{ 
      handleFormChange({target : {name:"category",value:e._id}})
      setSelectedcategories(categories)}}>
      <RadioGroup.Label className="text-lg leading-6 font-medium text-gray-900">
        Select a food category
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {categoriesToShow.map((category) => (
          <RadioGroup.Option
            key={category.id}
            value={category}
            className={({ checked, active }) =>
              classNames(
                checked ? "bg-teal-600 ring-white [&>*]:!text-white" : "bg-white ring-gray-400 hover:ring-teal-600",
                "ring-1 relative transition-all ease-in-out rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-0"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium"
                    >
                      {category.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm"
                    >
                      {category.description}
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium"
                    >
                      {category.recipes_count || "0"} recipes
                    </RadioGroup.Description>
                  </div>
                </div>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-teal-600"
                  )}
                  aria-hidden="true"
                />
                <div
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-teal-500" : "border-transparent",
                    "absolute -inset-px rounded-lg pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
        {categoriesToShow.length < categories.length && (
          <div
            key="load-more"
            className={"bg-teal-500 text-gray-50 font-medium text-lg ring-gray-400 hover:ring-teal-600 ring-1 relative transition-all ease-in-out rounded-lg shadow-sm p-4 flex justify-center items-center cursor-pointer focus:outline-0"}
            onClick={handleLoadMore}
          >
            Load more
          </div>
        )}
      </div>
    </RadioGroup>
  );
}

