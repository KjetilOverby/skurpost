import React from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { EditMode } from "../../modes/editMode";
import { RiDeleteBin5Line } from "react-icons/ri";

interface RingProps {
  value: string | number;
  mode: boolean;
  edit: boolean;
  deleteRing: (id: string | number) => void;
  id: string | number;
  moveLeft: (id: string | number) => void;
  moveRight: (id: string | number) => void;
}

const Ring: React.FC<RingProps> = ({
  value,
  mode,
  edit,
  deleteRing,
  id,
  moveLeft,
  moveRight,
}) => {
  return (
    <div className="flex items-center">
      <div className="grid h-20 w-8 place-items-center rounded-md border-[.5px] border-primary bg-gradient-to-b from-accent via-primary to-accent sm:h-28 sm:w-12  md:h-44 md:w-20 ">
        <EditMode editMode={mode}>
          {edit && (
            <RiDeleteBin5Line
              onClick={() => deleteRing(id)}
              className="text-red-500"
            />
          )}
        </EditMode>

        <p className="text-xs text-accent sm:text-sm md:text-xl">{value}</p>
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
