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
  ringItem,
}) => {
  const [data, setData] = useState(null);
  const [getRing, setGetRing] = useState(0);

  console.log(ringItem.map((item) => item.value));

  const rawInputHandler = () => {
    if (data) {
      const updatedData = data.map((item) => {
        if (item.value === getRawValues) {
          return {
            ...item,
            ring: getRing,
          };
        }
        return item;
      });

      setLocalData({ ...localData, rawInput: JSON.stringify(updatedData) });
    }
  };

  const skimsHandler = () => {
    if (data) {
      const updatedData = data.map((item) => {
        if (item.value === getRawValues) {
          return {
            ...item,
            shims: getRing,
          };
        }
        return item;
      });

      setLocalData({ ...localData, rawInput: JSON.stringify(updatedData) });
    }
  };
  return (
    <div className="absolute bottom-0 left-0 right-0 top-10  z-10 mx-auto my-auto flex h-[900px] w-screen flex-col justify-end rounded-xl bg-gray-700 p-5">
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
            <button onClick={skimsHandler} className="btn btn-primary">
              SKIMS
            </button>
          </div>
          <div className="w-20">
            <p>{getRing}</p>
          </div>
          <div>
            <p>X-verdi: {Number(getRawValues) + 1.4}</p>
            <p>Ring: {rawValues.ring}</p>
            <p>Skims: {getRing}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
