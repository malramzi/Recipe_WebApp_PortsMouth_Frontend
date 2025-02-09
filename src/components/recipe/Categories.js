import { useEffect, useState } from "react";

import CategoryCard from "./CategoryCard.js";
import { useCategoryStore } from "../../zustand/useCategoryStore";
import { Link } from "react-router-dom";

export default function Categories() {
  const { categories } = useCategoryStore();
  console.log(categories)

  if (!categories || categories.length === 0)
    return (
      <div className="px-4 py-8 mx-auto md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Can not find any categories, sorry (:
        </p>
      </div>
    );

  return (
    <>
      <div className="px-4 py-12 mx-auto lg:max-w-[1850px] md:px-24 lg:px-8 lg:py-14">
        <div className="flex items-center w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
          <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
            <a href="/" aria-label="Item" className="mr-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50">
                <svg
                  className="w-12 h-12 text-teal-600"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </a>
            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
              <span className="inline-block mb-2">Categories</span>
              <div className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100" />
            </h2>
          </div>
          <Link to="/recipe/categories/create">
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Add Category
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

