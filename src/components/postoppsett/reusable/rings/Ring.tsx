import React from "react";
import Blade from "./Blade";

const Ring = ({ value }) => {
  return (
    <div className="flex items-center">
      <div className="grid h-40 w-20 place-items-center rounded-md  border-2 border-white bg-gradient-to-b  from-gray-900 via-gray-300 to-gray-900 ">
        <p className="text-xl text-black">{value}</p>
      </div>
    </div>
  );
};

export default Ring;
