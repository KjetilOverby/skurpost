/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, use } from "react";
import Ring from "./reusable/rings/Ring";
import RawRing from "./reusable/rings/RawRing";
import Blade from "./reusable/rings/Blade";
import calc from "~/utils/calc";
import { EditMode } from "./modes/editMode";
import RingPicker from "./reusable/ringpicker";
import ringlist from "~/utils/ringlist";
import { v4 as uuidv4 } from "uuid";
import BladeSelector from "./Bladeselector";

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
  const [startringSum, setStartringSum] = useState(0);
  const [endringSum, setEndringSum] = useState(0);
  const [rawinputSum, setRawinputSum] = useState(0);
  const [localData, setLocalData] = useState();
  const [rawInputValue, setRawInputValue] = useState(0);
  const [bladeInputValue, setBladeInputValue] = useState(0);

  useEffect(() => {
    if (localData) {
      const startringTotal = localData.startrings.reduce(
        (total, ringItem) => total + Number(ringItem.input),
        0,
      );

      const endringTotal = localData.endrings.reduce(
        (total, ringItem) => total + Number(ringItem.input),
        0,
      );

      const rawinputTotal = localData.rawinput.reduce(
        (total, rawItem) =>
          total + Number(rawItem.input) + Number(rawItem.blade),
        0,
      );

      setStartringSum(startringTotal);
      setEndringSum(endringTotal);
      setRawinputSum(rawinputTotal);
    }
  }, [localData]);

  console.log(localData);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const deleteStartring = (id) => {
    setLocalData((prevData) => ({
      ...prevData,
      startrings: prevData.startrings.filter((ringItem) => ringItem.id !== id),
    }));
  };
  const deleteEndring = (id) => {
    setLocalData((prevData) => ({
      ...prevData,
      endrings: prevData.endrings.filter((ringItem) => ringItem.id !== id),
    }));
  };
  const deleteRawInput = (id) => {
    setLocalData((prevData) => ({
      ...prevData,
      rawinput: prevData.rawinput.filter((ringItem) => ringItem.id !== id),
    }));
  };

  const handleRingPickerChange = (value) => {
    setLocalData({
      ...localData,
      startrings: [
        ...localData.startrings,
        { id: uuidv4(), input: value, startRingId: uuidv4() },
      ],
    });
  };
  const handleEndRingPickerChange = (value) => {
    setLocalData({
      ...localData,
      endrings: [
        ...localData.endrings,
        { id: uuidv4(), input: value, startRingId: uuidv4() },
      ],
    });
  };
  const handleRawRingPickerChange = (value) => {
    setLocalData({
      ...localData,
      rawinput: [
        ...localData.rawinput,
        {
          id: uuidv4(),
          input: rawInputValue,
          rawinputId: uuidv4(),
        },
      ],
    });
  };
  const sawbladeSelectHandler = (event) => {
    setLocalData({
      ...localData,
      blade: parseFloat(event.target.value),
    });
  };

  return (
    <div className="grid h-screen place-items-center">
      {!editMode && (
        <div>
          <div key={data?.id}>
            <div className="absolute left-1/2 top-20 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
              <p className="text-3xl">{data?.header}</p>
            </div>
            <div className="flex">
              <div className="flex gap-1">
                {data?.startrings.map((ringItem: { input: string }) => (
                  <Ring
                    mode={editMode}
                    key={ringItem.id}
                    value={ringItem.input}
                  />
                ))}
              </div>
              <Blade blade={data?.blade} />
              <div className="flex">
                {data?.rawinput.map((rawItem) => (
                  <RawRing
                    mode={editMode}
                    key={data?.id}
                    value={rawItem.input}
                    blade={rawItem.blade}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                {data?.endrings.map((endringItem) => (
                  <Ring
                    mode={editMode}
                    key={data?.id}
                    value={endringItem.input}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <EditMode editMode={editMode}>
          <EditMode editMode={editMode}>
            <RingPicker
              values={ringlist}
              position="left-48"
              title="Utfylling foran"
              onChange={handleRingPickerChange}
            />
          </EditMode>
          <div key={localData?.id}>
            <div className="absolute left-1/2 top-20 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
              <p className="text-3xl">{localData?.header}</p>
            </div>
            <div className="flex">
              <div className="flex gap-1">
                <EditMode editMode={editMode}>
                  <div>
                    <p>
                      Distanse:{" "}
                      {(
                        calc.toMiddle -
                        rawinputSum / 2 -
                        localData?.blade
                      ).toFixed(2)}
                    </p>
                    <p>utfylling: {startringSum}</p>
                    <p>
                      Differanse:{" "}
                      {(
                        calc.toMiddle -
                        rawinputSum / 2 -
                        localData?.blade -
                        startringSum
                      ).toFixed(2)}
                    </p>
                  </div>
                </EditMode>
                {localData?.startrings.map((ringItem: { input: string }) => (
                  <Ring
                    edit={true}
                    mode={editMode}
                    key={ringItem.id}
                    value={ringItem.input}
                    deleteRing={deleteStartring}
                    id={ringItem.id}
                  />
                ))}
              </div>
              <Blade blade={localData?.blade} />
              <div className="flex">
                {localData?.rawinput.map((rawItem) => (
                  <RawRing
                    edit={true}
                    mode={editMode}
                    key={localData?.id}
                    value={rawItem.input}
                    blade={localData.blade}
                    deleteRing={deleteRawInput}
                    id={rawItem.id}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                {localData?.endrings.map((endringItem) => (
                  <Ring
                    edit={true}
                    mode={editMode}
                    key={localData?.id}
                    value={endringItem.input}
                    deleteRing={deleteEndring}
                    id={endringItem.id}
                  />
                ))}
              </div>
              <EditMode editMode={editMode}>
                <div>
                  <p>
                    Distanse:{" "}
                    {(
                      calc.middleEnd -
                      rawinputSum / 2 -
                      localData?.blade
                    ).toFixed(2)}
                  </p>
                  <p>utfylling: {endringSum}</p>
                  <p>
                    Differanse:{" "}
                    {(
                      calc.middleEnd -
                      rawinputSum / 2 -
                      localData?.blade -
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
                onChange={handleEndRingPickerChange}
              />
            </EditMode>
          </div>
        </EditMode>
      </div>
      <EditMode editMode={editMode}>
        <form action="" type="submit" onSubmit={handleRawRingPickerChange}>
          <input onChange={(e) => setRawInputValue(e.target.value)} />
          <button>Legg til</button>
        </form>
        <BladeSelector sawbladeSelectHandler={sawbladeSelectHandler} />
      </EditMode>
    </div>
  );
};

export default PostoppsettComponent;
