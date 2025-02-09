import React from "react";

const Tab = ({ alt, onClick, children, selected }) => {
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
        className={`rounded-md px-2 py-3 text-center text-sm font-semibold ring-1 ring-inset  ring-teal-700 text-teal-700 transition-all ease-in-out ${alt ? "bg-teal-600 text-gray-100" : ""} hover:text-white hover:bg-orange-400 hover:ring-orange-600 select-none cursor-pointer ${selected ? "!bg-orange-400 !ring-orange-600 !text-white" : ""} `}
      >
        {children}
      </label>
    </div>
  );
};

export default Tab;
