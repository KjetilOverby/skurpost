import React from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { EditMode } from "../../modes/editMode";
import { RiDeleteBin5Line } from "react-icons/ri";

const Ring = ({ value, mode, edit, deleteRing, id, moveLeft, moveRight }) => {
  return (
    <div className="flex items-center">
      <div className="grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-teal-800 via-teal-100 to-teal-800 sm:h-28 sm:w-12  md:h-44 md:w-20 md:border-2 ">
        <EditMode editMode={mode}>
          {edit && (
            <RiDeleteBin5Line
              onClick={() => deleteRing(id)}
              className="text-red-500"
            />
          )}
        </EditMode>

        <p className="text-xs text-teal-700 sm:text-sm md:text-xl">{value}</p>
        <EditMode editMode={mode}>
          {edit && (
            <div className="flex gap-5">
              <BsFillArrowLeftSquareFill onClick={() => moveLeft(id)} />
              <BsFillArrowRightSquareFill onClick={() => moveRight(id)} />
            </div>
          )}
        </EditMode>
      </div>
    </div>
  );
};

export default Ring;
