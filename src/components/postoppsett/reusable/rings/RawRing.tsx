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
  openRawDivideHandler: any; // Add the missing property
}

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
  openRawDivideHandler: any;
  getRawValues: any; // Add the missing property
}

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
  openRawDivideHandler: any;
  getRawValues: any;
  ringItem: any; // Add the missing property
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
  openRawDivideHandler,
  getRawValues,
  setRawInputValue,
  rawInputValue,
  ringItem,
  rawData,
  localData,
  setLocalData,
}: RawRingProps) => {
  const [calculationResult, setCalculationResult] = useState("");

  useEffect(() => {
    if (ringItem?.ring !== undefined || ringItem?.shims !== undefined) {
      const result = (
        Number(getRawValues) +
        1.4 -
        (ringItem?.ring || 0) -
        (ringItem?.shims || 0)
      ).toFixed(1);
      setCalculationResult(result);
    } else {
      setCalculationResult("");
    }
  }, [getRawValues, ringItem, mode, value, blade, edit]);

  <p>{calculationResult}</p>;
  return (
    <div className=" relative z-20 flex items-center">
      <div className=" relative grid h-20 w-8 place-items-center rounded-md border-[.5px] border-white bg-gradient-to-b from-sky-900 via-sky-100 to-sky-900 sm:h-28 sm:w-12 md:h-44 md:w-20">
        <EditMode editMode={mode}>
          {edit && <RiDeleteBin5Line onClick={() => deleteRing(id)} />}
        </EditMode>
        <p className="absolute bottom-20 text-[9px] text-primary sm:bottom-28 sm:text-xs  md:bottom-44 md:text-sm">
          {value}
        </p>
        <p className="text-xs text-blue-900 sm:text-sm md:text-xl">
          {(Number(value) + Number(1.4)).toFixed(1)}
        </p>
        <EditMode editMode={mode}>
          {edit && (
            <div className="flex gap-5">
              <BsFillArrowLeftSquareFill onClick={() => moveLeft(id)} />
              <BsFillArrowRightSquareFill onClick={() => moveRight(id)} />
            </div>
          )}
          <RiAddBoxLine
            onClick={openRawDivideHandler}
            className="absolute bottom-11 left-1/2 -translate-x-1/2 transform text-sm text-gray-700"
          />
        </EditMode>
        <div className="absolute top-20 flex flex-col  items-center  pt-1 text-[9px] text-primary sm:bottom-28 sm:text-xs md:top-44 md:text-sm">
          <p> {ringItem?.ring}</p>
          <p> {ringItem?.shimsVal2 === 0 ? "" : ringItem.shimsVal2}</p>
          <p> {ringItem?.shimsVal === 0 ? "" : ringItem?.shimsVal}</p>
        </div>
        <div className="absolute top-20 flex flex-col  items-center  pt-1 text-[9px] text-blue-900 sm:bottom-28 sm:text-xs md:top-[202px] md:text-sm">
          {/* <p>{calculationResult}</p> */}
        </div>
      </div>
      <Blade blade={blade} />
    </div>
  );
};

export default RawRing;
