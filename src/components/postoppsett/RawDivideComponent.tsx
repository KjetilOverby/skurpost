import React, { useState, useEffect } from "react";

import ringlist from "~/utils/ringlist";
import RingPickerRaw from "./reusable/RingPickerRaw";
import { get } from "http";
type RawDataType = {
  id: number;
  name: string;
};

interface RawDivideComponentProps {
  setOpenRawDivide: (open: boolean) => void;
  getRawValues: number;
  firstRingVal: number;
  shimsVal: number;
  shimsVal2: number;
  setFirstRingVal: (val: number) => void;
  setShimsVal: (val: number) => void;
  setShimsVal2: (val: number) => void;
  calculationResult: number;
  setCalculationResult: (result: number) => void;
}

export const RawDivideComponent: React.FC<RawDivideComponentProps> = ({
  setOpenRawDivide,
  getRawValues,
  firstRingVal,
  shimsVal,
  setFirstRingVal,
  setShimsVal,
  setShimsVal2,
  calculationResult,
  setCalculationResult,
}) => {
  const [getRing, setGetRing] = useState(0);

  useEffect(() => {
    setCalculationResult(
      parseFloat(
        (Number(getRawValues) + 1.4 - firstRingVal - shimsVal).toFixed(1),
      ),
    );
  }, [getRing, shimsVal, firstRingVal, getRawValues]);

  const rawInputHandler = () => {
    setFirstRingVal(getRing);
  };

  const skimsHandler = () => {
    setShimsVal(getRing);
    setShimsVal2(
      parseFloat(
        (Number(getRawValues) + 1.4 - firstRingVal - shimsVal).toFixed(1),
      ),
    );
  };

  const nullstillHandler = () => {
    setFirstRingVal(0);
    setShimsVal(0);
    setShimsVal2(0);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0  z-10  h-screen w-screen rounded-xl bg-base-100 p-5">
      <div className="grid h-[98%] grid-cols-2 place-content-end">
        <div className="">
          <div className="mr-10 flex w-20 flex-col">
            <button onClick={rawInputHandler} className="btn btn-primary mb-2">
              RING
            </button>
            <button onClick={skimsHandler} className="btn btn-primary mb-2">
              SKIMS
            </button>
            {/*  <button onClick={nullstillHandler} className="btn btn-primary">
              Nullstill
            </button> */}
          </div>
          <RingPickerRaw
            values={ringlist}
            position="right-0"
            title="Utfylling bak"
            onChange={(value: number) => setGetRing(value)}
          />
        </div>
        <div className="flex w-full  items-end justify-end pr-20">
          <div className="w-96">
            <div className="w-96">
              <p className="text-5xl text-secondary">Valgt ring: {getRing}</p>
            </div>
          </div>

          <div>
            <p className="text-5xl text-secondary">
              X-verdi: {Number(getRawValues) + 1.4}
            </p>
            <p className="text-2xl">Ring: {firstRingVal}</p>
            <p className="text-2xl">shims: {Number(shimsVal)}</p>
            <p className="text-2xl">Shims2: {calculationResult}</p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-accent absolute left-10 top-10"
        onClick={() => setOpenRawDivide(false)}
      >
        Lukk
      </button>
    </div>
  );
};
