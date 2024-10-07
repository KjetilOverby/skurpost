import React, { useState, useEffect } from "react";
import ringlist from "~/utils/ringlist";
import RingPickerRaw from "./reusable/RingPickerRaw";
import { set } from "zod";

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
  const [ringValue, setRingValue] = useState<number | "">("");

  useEffect(() => {
    setCalculationResult(
      parseFloat(
        (Number(getRawValues) + 1.4 - firstRingVal - shimsVal).toFixed(1),
      ),
    );
  }, [getRing, shimsVal, firstRingVal, getRawValues]);

  const rawInputHandler = () => {
    const value = typeof ringValue === "number" ? ringValue : getRing;
    setFirstRingVal(value);
  };

  const skimsHandler = () => {
    const value = typeof ringValue === "number" ? ringValue : getRing;
    setShimsVal(value);
    setShimsVal2(
      parseFloat(
        (Number(getRawValues) + 1.4 - firstRingVal - shimsVal).toFixed(1),
      ),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setRingValue(isNaN(value) ? "" : value);
  };

  const ringValueHandler = (value: number) => {
    setGetRing(value);
    setRingValue("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 h-screen w-screen rounded-xl bg-base-100 p-5">
      <div className="grid h-[98%] grid-cols-2 place-content-end">
        <div className="">
          <div className="mr-10 flex w-20 flex-col">
            <button
              onClick={rawInputHandler}
              className="btn btn-primary mb-2 text-neutral"
            >
              RING
            </button>
            <button
              onClick={skimsHandler}
              className="btn btn-primary mb-2 text-neutral"
            >
              SKIMS
            </button>
          </div>
          <div>
            <input
              type="number"
              value={ringValue}
              onChange={handleInputChange}
              placeholder="Egendefinert verdi"
              className="mt-4 rounded border p-2"
            />

            <RingPickerRaw
              values={ringlist}
              position="right-0"
              title="Utfylling bak"
              onChange={ringValueHandler}
            />
          </div>
        </div>
        <div className="flex w-full items-end justify-end pr-20">
          <div className="w-96">
            <div className="w-96">
              <p className="text-5xl text-secondary">
                Valgt ring: {ringValue !== "" ? ringValue : getRing}
              </p>
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
