/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import Ring from "./reusable/rings/Ring";
import RawRing from "./reusable/rings/RawRing";
import Blade from "./reusable/rings/Blade";
import calc from "~/utils/calc";
import { EditMode } from "./modes/editMode";
import RingPicker from "./reusable/ringpicker";
import ringlist from "~/utils/ringlist";

interface Item {
  header: string;
  startrings: { input: string }[];
  blade: string;
  rawinput: { input: string; blade: string; id: string }[];
  endrings: { input: string }[];
}

const PostoppsettComponent = ({
  data,
  editMode,
  setEditMode,
}: {
  data: Item[];
}) => {
  console.log(data);

  const [startringSum, setStartringSum] = useState(0);
  const [endringSum, setEndringSum] = useState(0);
  const [rawinputSum, setRawinputSum] = useState(0);

  useEffect(() => {
    if (data) {
      const startringTotal = data.reduce((total, item) => {
        const itemTotal = item.startrings.reduce(
          (itemTotal, ringItem) => itemTotal + Number(ringItem.input),
          0,
        );
        return total + itemTotal;
      }, 0);

      const endringTotal = data.reduce((total, item) => {
        const itemTotal = item.endrings.reduce(
          (itemTotal, ringItem) => itemTotal + Number(ringItem.input),
          0,
        );
        return total + itemTotal;
      }, 0);

      const rawinputTotal = data.reduce((total, item) => {
        const itemTotal = item.rawinput.reduce(
          (itemTotal, rawItem) =>
            itemTotal + Number(rawItem.input) + Number(rawItem.blade),
          0,
        );
        return total + itemTotal;
      }, 0);

      setStartringSum(startringTotal);
      setEndringSum(endringTotal);
      setRawinputSum(rawinputTotal);
    }
  }, [data]);

  return (
    <div className="grid h-screen place-items-center">
      <div>
        <EditMode editMode={editMode}>
          <RingPicker
            values={ringlist}
            position="left-48"
            title="Utfylling foran"
          />
        </EditMode>
        {data?.map((item) => {
          return (
            <div key={item.id}>
              <div className="absolute left-1/2 top-20 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
                <p className="text-3xl">{item.header}</p>
              </div>
              <div className="flex">
                <div className="flex gap-1">
                  <EditMode editMode={editMode}>
                    <div>
                      <p>
                        Distanse:{" "}
                        {(calc.toMiddle - rawinputSum / 2 - item.blade).toFixed(
                          2,
                        )}
                      </p>
                      <p>utfylling: {startringSum}</p>
                      <p>
                        Differanse:{" "}
                        {(
                          calc.toMiddle -
                          rawinputSum / 2 -
                          item.blade -
                          startringSum
                        ).toFixed(2)}
                      </p>
                    </div>
                  </EditMode>
                  {item.startrings.map((ringItem: { input: string }) => (
                    <Ring
                      mode={editMode}
                      key={ringItem.input}
                      value={ringItem.input}
                    />
                  ))}
                </div>
                <Blade blade={item.blade} />
                <div className="flex">
                  {item.rawinput.map((rawItem) => (
                    <RawRing
                      mode={editMode}
                      key={item.id}
                      value={rawItem.input}
                      blade={rawItem.blade}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  {item.endrings.map((endringItem) => (
                    <Ring
                      mode={editMode}
                      key={item.id}
                      value={endringItem.input}
                    />
                  ))}
                </div>
                <EditMode editMode={editMode}>
                  <div>
                    <p>
                      Distanse:{" "}
                      {(calc.middleEnd - rawinputSum / 2 - item.blade).toFixed(
                        2,
                      )}
                    </p>
                    <p>utfylling: {endringSum}</p>
                    <p>
                      Differanse:{" "}
                      {(
                        calc.middleEnd -
                        rawinputSum / 2 -
                        item.blade -
                        endringSum
                      ).toFixed(2)}
                    </p>
                  </div>
                </EditMode>
              </div>
              <EditMode editMode={editMode}>
                <RingPicker
                  values={ringlist}
                  position="right-48"
                  title="Utfylling bak"
                />
              </EditMode>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostoppsettComponent;
