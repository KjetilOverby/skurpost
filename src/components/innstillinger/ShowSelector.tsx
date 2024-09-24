import React, { useState } from "react";

const ShowSelector = ({ update }) => {
  const [toggles, setToggles] = useState({
    toggle1: false,
    toggle2: false,
    toggle3: false,
  });

  const handleToggleChange = (toggleName: string, value: boolean) => {
    const newToggles = { ...toggles, [toggleName]: value };
    setToggles(newToggles);
    update(newToggles);
  };

  return (
    <div className="rounded-xl border border-primary p-5">
      <h1 className="mb-5 text-primary">Vis</h1>
      <div className="flex flex-col rounded-xl p-3">
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Skurliste pakking</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={toggles.toggle1}
              onChange={(e) => handleToggleChange("toggle1", e.target.checked)}
            />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Miniliste i postoppsett</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={toggles.toggle2}
              onChange={(e) => handleToggleChange("toggle2", e.target.checked)}
            />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Post info</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={toggles.toggle3}
              onChange={(e) => handleToggleChange("toggle3", e.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShowSelector;
