import React, { useState } from "react";

interface RingPickerRawProps {
  values: number[];
  position: string;
  title: string;
  onChange?: (value: number) => void;
}

const RingPickerRaw: React.FC<RingPickerRawProps> = ({
  values,
  position,
  title,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  /*  const handleClick = (value: number) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  }; */

  return (
    <div className={` top-96 flex w-[800px] flex-wrap`}>
      {values.map((value) => (
        <button
          className="m-1 h-12 w-12 rounded-full bg-slate-500  p-1 text-xs text-white"
          key={value}
          /* onClick={() => handleClick(value)} */
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default RingPickerRaw;
