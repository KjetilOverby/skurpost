import React from "react";
import Blade from "./Blade";

interface RawRingProps {
  value: number;
  blade: string;
}

const RawRing = ({ value, blade }: RawRingProps) => {
  console.log(blade);

  return (
    <div className=" flex items-center ">
      <div className=" relative grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-green-900 via-gray-300 to-green-900 sm:h-28 sm:w-12 md:h-40 md:w-20">
        <p className="absolute bottom-20 text-[9px] text-gray-400 sm:bottom-28 sm:text-xs  md:bottom-40 md:text-sm">
          {value}
        </p>
        <p className="text-xs text-black sm:text-sm md:text-xl">
          {value + 1.4}
        </p>
      </div>
      <Blade blade={blade} />
    </div>
  );
};

export default RawRing;
