import React from "react";

const Tab = ({ onClick, children }) => {
  return (
    <div>
      <input
        type="checkbox"
        name={`tab${children}`}
        id={`tab${children}`}
        className="peer hidden"
      />
      <label
        htmlFor={`tab${children}`}
        onClick={onClick}
        className="rounded-md px-2 py-3 text-center text-sm font-semibold ring-1 ring-inset ring-teal-700 text-teal-700 transition-all ease-in-out hover:text-white hover:bg-teal-700 hover:ring-teal-800 select-none cursor-pointer peer-checked:bg-teal-700 peer-checked:ring-teal-800 peer-checked:text-white"
      >
        {children}
      </label>
    </div>
  );
};

export default Tab;
