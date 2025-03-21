import React from "react";

const CategoryForm = ({ editMode,handleFormSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="md:grid md:grid-cols-3 md:gap-6 h-full p-2">
        <div className="md:col-span-1 flex justify-center items-center align-middle">
          <div className="px-4 sm:px-0">
            <h3 className="p-5 text-lg font-medium leading-6 text-gray-900">
              Add Your Favourite Recipe Category and share it to the world!
            </h3>
            <p className="px-5 text-sm text-gray-600">
              "Cooking is like painting or writing a song. Just as there are
              only so many notes or colors, there are only so many flavors—it’s
              how you combine them that sets you apart."
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 col-span-2 flex justify-center items-center align-middle bg-gray-50 shadow sm:rounded-md">
          <form onSubmit={e => {e.preventDefault()
            handleFormSubmit(formData)
          }}>
            <div className=" sm:overflow-hidden">
              <div className="px-4 py-5 space-y-6 sm:p-6">
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Title
                  </h1>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Write a title for your recipe. Something catchy ..."
                    defaultValue={editMode ? formData.title : null}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h1>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Write a short description..."
                      defaultValue={editMode ? formData.description : null}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    i.e. While eating your appetizer, don't be concerned with
                    dessert.
                  </p>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                  >
                    Create Category
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
