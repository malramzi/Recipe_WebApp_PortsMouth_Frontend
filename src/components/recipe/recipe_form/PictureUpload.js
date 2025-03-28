import { useState, useEffect } from "react";

export default function PictureUpload({ existingPicture, handleFormChange }) {
  const [picture, setPicture] = useState(existingPicture || null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
        handleFormChange({ target: { name: "image", value: file } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="text-lg leading-6 font-medium text-gray-900">Picture</h1>
      <p className="mt-1 text-sm text-gray-500">
        Picture of the food after it's complete.
      </p>
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
        <div
          className="mt-4 flex justify-center items-center h-[500px] px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-center bg-cover"
          style={{ backgroundImage: `url('${process.env.HOST || "http://localhost:3415/media/" + picture}')` }}
        >
          {
            <div className={` ${picture && "hidden"} space-y-1 text-center`}>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />

                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          }
        </div>
      </label>
    </div>
  );
}
