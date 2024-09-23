import React, { useState } from 'react';

const ColorTheme = ({update}) => {
  // Initialize activeButton with "Darkmode" as the default value
  const [activeButton, setActiveButton] = useState<string>('Darkmode');

  const handleButtonClick = (value: string) => {
    setActiveButton(value);
  };



  return (
    <div className="bg-base-100">
      
      <h1 className="text-primary mb-5">Fargetema</h1>
      <div className="flex flex-col border border-secondary rounded-xl p-3">
        {['Darkmode', 'Lightmode', 'Coffee'].map((label) => (
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
      {activeButton && <p>Selected Value: {activeButton}</p>}
    </div>
  );
};

export default ColorTheme;