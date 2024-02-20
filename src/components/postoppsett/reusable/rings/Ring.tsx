import React from "react";

const Ring = ({ value }) => {
  return (
    <div className="flex items-center">
      <div className="grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-gray-900  via-gray-300 to-gray-900 sm:h-28 sm:w-12  md:h-40 md:w-20 md:border-2 ">
        <p className="text-xs text-black sm:text-sm md:text-xl">{value}</p>
      </div>
    </div>
  );
};

export default Ring;
