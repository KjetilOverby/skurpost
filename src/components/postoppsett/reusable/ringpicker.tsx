import React, { useState } from "react";

const RingPicker = ({ values, position, title }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className={`absolute top-48 flex w-48 flex-wrap ${position}`}>
      <div className="mb-5 w-full">
        <h1 className="">{title}</h1>
      </div>
      {values.map((value) => (
        <button
          className="m-1 h-10 w-10 rounded-full bg-gray-300 text-xs text-black"
          key={value}
          onClick={() => handleClick(value)}
        >
          {value}
        </button>
      ))}
      {selectedValue && <p>Selected value: {selectedValue}</p>}
    </div>
  );
};

export default RingPicker;
