import React, { useState } from "react";

interface RingPickerProps {
  values: string[];
  position: string;
  title: string;
  onChange?: (value: string) => void;
  inputChange: (value: string) => void;
}

const RingPicker: React.FC<RingPickerProps> = ({
  values,
  position,
  title,
  onChange,
  inputChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const [inputValue, setinputValue] = useState("");

  return (
    <div className={`absolute top-96 flex w-60 flex-wrap ${position}`}>
      <div className="mb-5 w-full">
        <h1 className="">{title}</h1>
      </div>
      <div className="mb-5 flex w-full">
        <input
          type="number"
          step={0.01}
          placeholder="Egendefinert verdi"
          className="mr-2 rounded border p-1"
          onChange={(e) => setinputValue(e.target.value)}
        />
        <button
          onClick={() => inputChange(inputValue)}
          className="rounded bg-secondary p-1 text-primary hover:bg-accent"
        >
          Legg til
        </button>
      </div>

      {values
        .slice() // Create a shallow copy to avoid mutating the original array
        .sort((a, b) => parseFloat(a) - parseFloat(b)) // Sort the array in ascending order
        .map((value) => (
          <button
            className="m-1 h-12 w-12 rounded-full bg-neutral p-1 text-xs text-primary hover:bg-accent"
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
