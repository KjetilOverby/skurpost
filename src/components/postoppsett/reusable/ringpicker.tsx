import React, { useState } from "react";

interface RingPickerProps {
  values: string[];
  position: string;
  title: string;
  onChange?: (value: string) => void;
}

const RingPicker: React.FC<RingPickerProps> = ({
  values,
  position,
  title,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleClick = (value: string) => {
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
          className="m-1  h-12 w-12 rounded-full bg-secondary p-1 text-xs text-primary hover:bg-accent"
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
