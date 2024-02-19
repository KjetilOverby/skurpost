import React from "react";

const Blade = ({ blade }) => {
  return (
    <div className="relative grid h-96 w-1 place-items-center bg-blue-400">
      <p className="absolute bottom-96 text-sm ">{blade}</p>
      <p className="absolute top-96 text-sm ">{(blade + 1.4).toFixed(1)}</p>
    </div>
  );
};

export default Blade;
