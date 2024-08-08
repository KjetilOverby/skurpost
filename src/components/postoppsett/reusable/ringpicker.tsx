import React, { useState } from "react";

const RingPicker = ({ values, position, title, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`absolute top-96 flex w-60 flex-wrap ${position}`}>
      <div className="mb-5 w-full">
        <h1 className="">{title}</h1>
      </div>
      {values.map((value) => (
        <button
          className="m-1  h-12 w-12 rounded-full bg-slate-500  p-1 text-xs text-white"
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
