import React, { useState } from 'react'
import { useCategoryStore } from '../../zustand/useCategoryStore'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

const CategoryCard = ({category}) => {
  const { deleteCategory, updateCategory } = useCategoryStore()
  const [isEditing, setIsEditing] = useState(false)


  const handleDelete = () => {
    deleteCategory(category._id)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (formData) => {
    updateCategory(category._id, formData)
    setIsEditing(false)
  }

  return (
    <div className="bg-white group shadow overflow-hidden sm:rounded-lg hover:shadow-lg [&>*>*]:hover:!text-white hover:bg-orange-500 transition-all ease-in-out [&_*]:transition-all [&_*]:ease-in-out relative p-4 ring-1 ring-teal-500/30">
      <div className="mt-5 hidden justify-end gap-2 absolute top-0 right-0 px-6 w-full text-white group-hover:flex">
          <button onClick={handleDelete} className="p-1 inline-flex justify-center shadow-sm text-sm font-medium rounded-full bg-red-700 focus:outline-none">
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button onClick={handleEdit} className="p-1 inline-flex justify-center shadow-sm text-sm font-medium rounded-full bg-blue-700 focus:outline-none ">
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      <div className="px-4 py-5 mt-5 sm:p-6">
        {isEditing ? (
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSave({
              name: e.target.name.value,
              description: e.target.description.value
            })
          }}>
            <input type="text" name="name" defaultValue={category.name} className="block w-full px-3 py-2 mb-3 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <textarea name="description" defaultValue={category.description} className="block w-full px-3 py-2 mb-3 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <button type="submit" className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Save</button>
          </form>
        ) : (
          <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {category.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
            {category.description}
            </p>
          </>
        )}
        
      </div>
    </div>
  )
}

export default CategoryCard
