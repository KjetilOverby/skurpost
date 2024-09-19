import React, { useState, useEffect } from "react";

import ringlist from "~/utils/ringlist";
import RingPickerRaw from "./reusable/RingPickerRaw";
export const RawDivideComponent = ({
  setOpenRawDivide,
  rawData,
  localData,
  setLocalData,
  getRawValues,
  rawValues,
  firstRingVal,
  shimsVal,
  shimsVal2,
  setFirstRingVal,
  setShimsVal,
  setShimsVal2,
  calculationResult,
  setCalculationResult,
}) => {
  const [getRing, setGetRing] = useState(0);

  useEffect(() => {
    setCalculationResult(
      (Number(getRawValues) + 1.4 - firstRingVal - shimsVal).toFixed(1),
    );
    console.log("calc runs");
  }, [getRing, shimsVal, firstRingVal]);

  const rawInputHandler = () => {
    setFirstRingVal(getRing);
  };

  const skimsHandler = () => {
    setShimsVal(getRing);
    setShimsVal2(
      (Number(getRawValues) + 1.4 - firstRingVal - shimsVal).toFixed(1),
    );
  };

  const nullstillHandler = () => {
    setFirstRingVal(0);
    setShimsVal(0);
    setShimsVal2(0);
  };
  return (
    <div className="absolute bottom-0 left-0 right-0 top-10  z-10 mx-auto my-auto flex h-[900px] w-screen flex-col justify-end rounded-xl bg-secondary p-5">
      <div className="flex">
        <RingPickerRaw
          values={ringlist}
          position="right-0"
          title="Utfylling bak"
          onChange={(value) => setGetRing(value)}
        />
        <div className="flex">
          <button onClick={() => setOpenRawDivide(false)}>Lukk</button>
          <div className="mr-10 flex flex-col">
            <button onClick={rawInputHandler} className="btn btn-primary mb-2">
              RING
            </button>
            <button onClick={skimsHandler} className="btn btn-primary mb-2">
              SKIMS
            </button>
            <button onClick={nullstillHandler} className="btn btn-primary">
              Nullstill
            </button>
          </div>
          <div className="w-20">
            <p>{getRing}</p>
          </div>
          <div>
            <p>X-verdi: {Number(getRawValues) + 1.4}</p>
            <p>Ring: {firstRingVal}</p>
            <p>shims: {Number(shimsVal)}</p>
            <p>Shims2: {calculationResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
