import React, { useEffect, useState } from "react";
import Blade from "./Blade";
import { EditMode } from "../../modes/editMode";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";

interface RawRingProps {
  value: number;
  blade: string;
  mode: any;
  edit: any;
  deleteRing: any;
  id: any;
  moveLeft: any;
  moveRight: any;
  rawDivide: any[];
  local: any;
}

const RawRing = ({
  value,
  blade,
  mode,
  edit,
  deleteRing,
  id,
  moveLeft,
  moveRight,
  rawDivide,
}: RawRingProps) => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const total = rawDivide?.reduce(
      (total, item) => total + Number(item.value),
      0,
    );
    setSum(total);
  }, [rawDivide, mode]);

  return (
    <div className=" relative flex items-center">
      <div className=" relative grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-green-900 via-gray-300 to-green-900 sm:h-28 sm:w-12 md:h-40 md:w-20">
        <EditMode editMode={mode}>
          {edit && <RiDeleteBin5Line onClick={() => deleteRing(id)} />}
        </EditMode>
        <p className="absolute bottom-20 text-[9px] text-gray-400 sm:bottom-28 sm:text-xs  md:bottom-40 md:text-sm">
          {value}
        </p>
        <p className="text-xs text-black sm:text-sm md:text-xl">
          {(Number(value) + Number(1.4)).toFixed(1)}
        </p>
        <EditMode editMode={mode}>
          {edit && (
            <div className="flex gap-5">
              <BsFillArrowLeftSquareFill onClick={() => moveLeft(id)} />
              <BsFillArrowRightSquareFill onClick={() => moveRight(id)} />
            </div>
          )}
          <RiAddBoxLine className="absolute bottom-11 left-1/2 -translate-x-1/2 transform text-sm text-gray-700" />
        </EditMode>
        <div className="absolute top-20 flex flex-col  items-center  pt-1 text-[9px] text-gray-400 sm:bottom-28 sm:text-xs md:top-40 md:text-sm">
          {value === 52.5 && (
            <>
              {rawDivide?.map((item) => (
                <div>
                  <p>{item.value}</p>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="absolute top-20 flex flex-col  items-center  pt-1 text-[9px] text-gray-400 sm:bottom-28 sm:text-xs md:top-52 md:text-sm">
          <p>{(value + 1.4 - sum).toFixed(1)}</p>
        </div>
      </div>
      <Blade blade={blade} />
    </div>
  );
};

export default RawRing;
