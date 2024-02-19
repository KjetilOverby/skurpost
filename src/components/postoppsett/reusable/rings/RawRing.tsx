import React from "react";
import Blade from "./Blade";

const RawRing = ({ value, blade }) => {
  return (
    <div className=" flex items-center ">
      <div className="relative grid h-40 w-20 place-items-center rounded-md bg-gradient-to-b from-green-900 via-gray-300 to-green-900">
        <p className="absolute bottom-40  text-sm text-black">{value}</p>
        <p className="text-xl text-black">{value + 1.4}</p>
      </div>
      <Blade blade={blade} />
    </div>
  );
};

export default RawRing;
