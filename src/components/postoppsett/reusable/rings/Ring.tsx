import React from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { EditMode } from "../../modes/editMode";
import { RiDeleteBin5Line } from "react-icons/ri";

const Ring = ({ value, mode }) => {
  return (
    <div className="flex items-center">
      <div className="grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-gray-900  via-gray-300 to-gray-900 sm:h-28 sm:w-12  md:h-40 md:w-20 md:border-2 ">
        <EditMode editMode={mode}>
          <RiDeleteBin5Line className="text-red-500" />
        </EditMode>
        <p className="text-xs text-black sm:text-sm md:text-xl">{value}</p>
        <EditMode editMode={mode}>
          <div className="flex gap-5">
            <BsFillArrowLeftSquareFill />
            <BsFillArrowRightSquareFill />
          </div>
        </EditMode>
      </div>
    </div>
  );
};

export default Ring;
