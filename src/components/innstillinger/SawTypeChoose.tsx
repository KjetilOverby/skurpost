import React, { useState, useEffect } from "react";

const SawTypeSelect: React.FC = () => {
  // Initialize activeButton with "Darkmode" as the default value
  const [activeButton, setActiveButton] = useState<string>("");

  const handleButtonClick = (value: string) => {
    setActiveButton(value);
  };

  return (
    <div className=" my-5 rounded-xl border border-primary p-5">
      <h1 className="mb-5 text-primary">Sagtype</h1>
      <div className="flex flex-col rounded-xl p-3">
        {["MKV", "MKT"].map((label) => (
          <div key={label} className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">{label}</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={activeButton === label}
                onChange={() => handleButtonClick(label)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SawTypeSelect;
