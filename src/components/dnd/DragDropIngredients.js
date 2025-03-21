import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import Tab from "../layouts/Tab";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export function DragDropIngredients() {
  const {selectedIngredients,ingredients,setSelectedIngredients,setIngredients, makeRecipe} = useRecipeStore();


  const handleUnselect = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
    setSelectedIngredients(selectedIngredients.filter((ing) => ing !== ingredient));
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="text-center bg-orange-100 w-full">
        <div className="mx-auto bg-white rounded shadow-md p-4">
          <h1 className="text-3xl font-bold tracking-wide text-gray-800">
            Drag and Drop Ingredients
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Drag and drop ingredients to the pot
          </p>
        </div>
      <div className="flex flex-wrap min-h-[50vh] lg:grid-cols-4 gap-4">
        {ingredients.map((ingredient, index) => (
          <Draggable key={index} id={index}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <Tab>{ingredient}</Tab>
            </div>
          </Draggable>
        ))}
      </div>
      </section>

      <Droppable id={"pot"}>
        <div className="mx-auto flex justify-center items-center min-h-[50vh] m-2">
        <div className="relative border-4 shadow-lg shadow-black bg-[#333] rounded-full px-10 py-6 border-t-transparent z-0 border-black flex items-center justify-center flex-wrap [&>*]:m-1  h-[400px] w-[400px]  md:h-[800px] md:w-[800px]">
          {selectedIngredients.length
            ? selectedIngredients.map((ing) => (
                <Tab selected key={ing}>
                  {ing}
                  <button
                    onClick={() => handleUnselect(ing)}
                    className="text-red-600 m-1 rounded-full px-1.5 bg-red-100 hover:bg-red-600 hover:text-white"
                  >
                    X
                  </button>
                </Tab>
              ))
            : <p className="text-white">No Ingredients in pot yet</p>}

            <div className="p-32 rounded-full border-4 border-slate-300 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1]"></div>
            <div className="p-40 rounded-full border-4 border-slate-300 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1]"></div>
        </div>
        <div className="px-4 py-3 w-72 h-10 rounded-full bg-gradient-to-l to-[#333] from-orange-800 shadow-lg shadow-black">

        </div>
        </div>
      </Droppable>
      <div className="flex justify-center my-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={makeRecipe}>
          Cook Recipe
        </button>
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    setSelectedIngredients([...selectedIngredients, ingredients[active.id]]);
    setIngredients(ingredients.filter((ing, idx) => idx !== active.id));
  }
}
