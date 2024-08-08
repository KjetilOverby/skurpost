import React from "react";
import Blade from "./Blade";
import { EditMode } from "../../modes/editMode";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

interface RawRingProps {
  value: number;
  blade: string;
}

const RawRing = ({ value, blade, mode, edit }: RawRingProps) => {
  return (
    <div className=" flex items-center ">
      <div className=" relative grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-green-900 via-gray-300 to-green-900 sm:h-28 sm:w-12 md:h-40 md:w-20">
        <EditMode editMode={mode}>{edit && <RiDeleteBin5Line />}</EditMode>
        <p className="absolute bottom-20 text-[9px] text-gray-400 sm:bottom-28 sm:text-xs  md:bottom-40 md:text-sm">
          {value}
        </p>
        <p className="text-xs text-black sm:text-sm md:text-xl">
          {value + 1.4}
        </p>
        <EditMode editMode={mode}>
          {edit && (
            <div className="flex gap-5">
              <BsFillArrowLeftSquareFill />
              <BsFillArrowRightSquareFill />
            </div>
          )}
        </EditMode>
      </div>
      <Blade blade={blade} />
    </div>
  );
};

export default RawRing;
