import React from "react";

const Bladeselector = ({ sawbladeSelectHandler }) => {
  return (
    <div>
      {" "}
      <select className="select" onChange={sawbladeSelectHandler}>
        <option className="option" value="" selected disabled hidden>
          Velg sagblad
        </option>
        <option className="option" value={2.2}>
          2.2-3.6
        </option>
        <option className="option" value={2.4}>
          2.4-3.8
        </option>
        <option className="option" value={2.6}>
          2.6-4.0
        </option>
        <option className="option" value={2.8}>
          2.8-4.2
        </option>
        <option className="option" value={3.0}>
          3.0-4.4
        </option>
        <option className="option" value={3.2}>
          3.2-4.6
        </option>
      </select>
    </div>
  );
};

export default Bladeselector;
