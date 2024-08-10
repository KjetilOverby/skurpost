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
import { api } from "~/utils/api";
import EditHeader from "./reusable/EditHeader";
import { set } from "zod";
import { raw } from "@prisma/client/runtime/library";

interface Item {
  header: string;
  startrings: { input: string }[];
  blade: string;
  rawinput: { input: string; blade: string; id: string }[];
  endrings: { input: string }[];
}

const PostoppsettComponent = ({ data }: { data: Item[] }) => {
  const [startringSum, setStartringSum] = useState(0);
  const [endringSum, setEndringSum] = useState(0);
  const [rawinputSum, setRawinputSum] = useState(0);
  const [localData, setLocalData] = useState();
  const [rawInputValue, setRawInputValue] = useState(0);
  const [bladeSum, setBladeSum] = useState();

  const updatePost = api.postoppsett.updatePost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getAll.invalidate();
    },
  });

  const startRingsParse = localData && JSON.parse(localData.startRings);
  const endRingsParse = localData && JSON.parse(localData.endRings);
  const rawRingsParse = localData && JSON.parse(localData.rawInput);
  const rawDivideParse = localData && JSON.parse(localData.rawDivide);

  const [editMode, setEditMode] = useState(false);
  const [headerText, setHeaderText] = useState("");

  useEffect(() => {
    setHeaderText(
      `${rawRingsParse?.length}x${localData?.plankeTy}-${localData?.prosent}%-${(localData?.blade + 1.4).toFixed(1)}${localData?.spes}`,
    );
  }, [data]);

  const ctx = api.useContext();

  const updateData = async (id) => {
    try {
      const header = headerText;
      const plankeTy = String(localData.plankeTy);
      const startRings = localData.startRings;
      const endRings = localData.endRings;
      const rawInput = localData.rawInput;
      const blade = localData.blade;
      const prosent = String(localData.prosent);
      const spes = localData.spes;
      const xlog = String(rawRingsParse.length);
      const response = await updatePost.mutateAsync({
        id,
        header,
        plankeTy,
        startRings,
        endRings,
        rawInput,
        blade,
        prosent,
        spes,
        xlog,
      });
      console.log(response);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    // get the id and data you want to update
    const id = "your-post-id";
    const data = {
      // your updated data...
    };

    // call updateData with the id and data
    await updateData(id, data);
  };

  // useEffect(() => {
  //   if (localData) {
  //     const startringTotal = startRingsParse.reduce(
  //       (total, ringItem) => total + Number(ringItem.value),
  //       0,
  //     );

  //     const endringTotal = endRingsParse.reduce(
  //       (total, ringItem) => total + Number(ringItem.value),
  //       0,
  //     );

  //     const rawinputTotal = rawRingsParse.reduce(
  //       (total, rawItem) => total + Number(rawItem.value),
  //       0,
  //     );

  //     setStartringSum(startringTotal);
  //     setEndringSum(endringTotal);
  //     setRawinputSum(rawinputTotal);
  //   }
  // }, [localData, rawinputSum]);

  useEffect(() => {
    if (localData) {
      const startringTotal = startRingsParse.reduce(
        (total, ringItem) => total + Number(ringItem.value),
        0,
      );

      const endringTotal = endRingsParse.reduce(
        (total, ringItem) => total + Number(ringItem.value),
        0,
      );

      const rawinputTotal = rawRingsParse.reduce(
        (total, rawItem) => total + Number(rawItem.value) + 1.4,
        0,
      );

      const bladeTotal = localData.blade * rawRingsParse.length;

      setStartringSum(startringTotal);
      setEndringSum(endringTotal);
      setRawinputSum(rawinputTotal);
      setBladeSum(bladeTotal); // Assuming you have a state variable to store this
    }
  }, [localData, rawinputSum]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const deleteStartring = (id) => {
    setLocalData((prevData) => {
      const startRingsParse = JSON.parse(prevData.startRings);
      const updatedStartRings = startRingsParse.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        startRings: JSON.stringify(updatedStartRings),
      };
    });
  };
  const deleteEndring = (id) => {
    setLocalData((prevData) => {
      const endRingsParse = JSON.parse(prevData.endRings);
      const updatedEndRings = endRingsParse.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        endRings: JSON.stringify(updatedEndRings),
      };
    });
  };
  const deleteRawInput = (id) => {
    setLocalData((prevData) => {
      const rawRingsParse = JSON.parse(prevData.rawInput);
      const updatedRawRings = rawRingsParse.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        rawInput: JSON.stringify(updatedRawRings),
      };
    });
  };

  const handleRingPickerChange = (value) => {
    const startRingsParse = JSON.parse(localData.startRings);
    startRingsParse.push({ id: uuidv4(), value: value });
    const updatedStartRings = JSON.stringify(startRingsParse);

    setLocalData({
      ...localData,
      startRings: updatedStartRings,
    });
  };
  const handleEndRingPickerChange = (value) => {
    const endRingsParse = JSON.parse(localData.endRings);
    endRingsParse.push({ id: uuidv4(), value: value });
    const updatedEndRings = JSON.stringify(endRingsParse);

    setLocalData({
      ...localData,
      endRings: updatedEndRings,
    });
  };
  const handleRawRingPickerChange = (value) => {
    const rawRingsParse = JSON.parse(localData.rawInput);
    rawRingsParse.push({
      id: uuidv4(),
      value: Number(rawInputValue),
      blade: localData.blade,
    });
    const updatedRawRings = JSON.stringify(rawRingsParse);

    setLocalData({
      ...localData,
      rawInput: updatedRawRings,
    });
  };

  const sawbladeSelectHandler = (event) => {
    setLocalData({
      ...localData,
      blade: parseFloat(event.target.value),
    });
  };

  const prosentSelectHandler = (event) => {
    setLocalData({
      ...localData,
      prosent: parseFloat(event.target.value),
    });
  };

  const handlePlankeTy = (event) => {
    setLocalData({
      ...localData,
      plankeTy: parseFloat(event.target.value),
    });
  };
  const handleSpes = (event) => {
    setLocalData({
      ...localData,
      spes: event.target.value,
    });
  };

  const [differenceEnd, setDifferenceEnd] = useState(null);

  useEffect(() => {
    const calculatedDifferenceEnd = (
      calc.middleEnd -
      rawinputSum / 2 -
      bladeSum / 2 -
      localData?.blade / 2 -
      endringSum
    ).toFixed(2);
    setDifferenceEnd(calculatedDifferenceEnd);
  }, [data, localData, rawRingsParse, startRingsParse, endRingsParse]);

  const [differenceStart, setDifferenceStart] = useState(null);

  useEffect(() => {
    const calculatedDifferenceStart = (
      calc.toMiddle -
      rawinputSum / 2 -
      bladeSum / 2 -
      localData?.blade / 2 -
      startringSum
    ).toFixed(2);

    setDifferenceStart(calculatedDifferenceStart);
  }, [data, localData, rawRingsParse, startRingsParse, endRingsParse]);

  const moveLeft = async (id) => {
    const index = startRingsParse.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...startRingsParse];
      const tempItem = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = tempItem;

      //Update the localData state
      setLocalData({
        ...localData,
        startRings: JSON.stringify(newItems),
      });
    }
  };

  const moveRight = (id) => {
    const index = startRingsParse.findIndex((item) => item.id === id);

    if (index < startRingsParse.length - 1) {
      const newItems = [...startRingsParse];
      const tempItem = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = tempItem;

      // Update the localData state
      setLocalData({
        ...localData,
        startRings: JSON.stringify(newItems),
      });
    }
  };

  const moveRightEnd = async (id) => {
    const index = endRingsParse.findIndex((item) => item.id === id);

    if (index < endRingsParse.length - 1) {
      const newItems = [...endRingsParse];
      const tempItem = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = tempItem;

      // Update the localData state
      setLocalData({
        ...localData,
        endRings: JSON.stringify(newItems),
      });
    }
  };
  const moveLeftEnd = async (id) => {
    const index = endRingsParse.findIndex((item) => item.id === id);

    if (index < endRingsParse.length + 1) {
      const newItems = [...endRingsParse];
      const tempItem = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = tempItem;

      // Update the localData state
      setLocalData({
        ...localData,
        endRings: JSON.stringify(newItems),
      });
    }
  };

  const moveLeftRaw = async (id) => {
    const index = rawRingsParse.findIndex((item) => item.id === id);

    if (index < rawRingsParse.length + 1) {
      const newItems = [...rawRingsParse];
      const tempItem = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = tempItem;

      // Update the localData state
      setLocalData({
        ...localData,
        rawInput: JSON.stringify(newItems),
      });
    }
  };
  const moveRightRaw = async (id) => {
    const index = rawRingsParse.findIndex((item) => item.id === id);

    if (index < rawRingsParse.length - 1) {
      const newItems = [...rawRingsParse];
      const tempItem = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = tempItem;

      // Update the localData state
      setLocalData({
        ...localData,
        rawInput: JSON.stringify(newItems),
      });
    }
  };

  return (
    <div>
      <EditHeader
        setEditMode={setEditMode}
        editMode={editMode}
        handleUpdate={handleUpdate}
      />
      <div className="flex h-screen flex-col items-center justify-center">
        {!editMode && (
          <div>
            <div key={data?.id}>
              <div className="absolute left-1/2 top-20 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
                <p className="text-3xl">{localData?.header}</p>
              </div>
              <div className="flex">
                <div className="flex gap-1">
                  {startRingsParse?.map((ringItem: { value: string }) => (
                    <Ring
                      mode={editMode}
                      key={ringItem.id}
                      value={ringItem.value}
                    />
                  ))}
                </div>
                <Blade blade={data?.blade} />
                <div className="flex">
                  {rawRingsParse?.map((ringItem: { value: string }) => (
                    <RawRing
                      mode={editMode}
                      key={ringItem.id}
                      value={ringItem.value}
                      blade={localData.blade}
                      rawDivide={rawDivideParse}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  {endRingsParse?.map((ringItem: { value: string }) => (
                    <Ring
                      mode={editMode}
                      key={ringItem.id}
                      value={ringItem.value}
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
              <div className="absolute left-1/2 top-20 mb-20 mt-10 -translate-x-1/2 -translate-y-1/2 transform">
                <p>Opprinnelig post: {localData.header}</p>
                <p className="text-3xl">
                  {rawRingsParse?.length}x{localData?.plankeTy}-
                  {localData?.prosent}%-{(localData?.blade + 1.4).toFixed(1)}
                  {localData?.spes}
                </p>
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
                          bladeSum / 2 -
                          localData?.blade / 2
                        ).toFixed(2)}
                      </p>
                      <p>utfylling: {startringSum.toFixed(2)}</p>
                      <p
                        className={`${
                          differenceStart >= -0.05 && differenceStart <= 0.05
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        Differanse: {differenceStart}
                      </p>
                    </div>
                  </EditMode>
                  {startRingsParse?.map((ringItem: { value: string }) => (
                    <Ring
                      edit={true}
                      mode={editMode}
                      key={ringItem.id}
                      value={ringItem.value}
                      deleteRing={deleteStartring}
                      id={ringItem.id}
                      moveLeft={moveLeft}
                      moveRight={moveRight}
                    />
                  ))}
                </div>
                <Blade blade={localData?.blade} />
                <div className="flex">
                  {rawRingsParse?.map((ringItem: { value: string }) => (
                    <RawRing
                      edit={true}
                      mode={editMode}
                      key={ringItem.id}
                      value={ringItem.value}
                      blade={localData?.blade}
                      deleteRing={deleteRawInput}
                      id={ringItem.id}
                      moveLeft={moveLeftRaw}
                      moveRight={moveRightRaw}
                      rawDivide={rawDivideParse}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  {endRingsParse?.map((ringItem: { value: string }) => (
                    <Ring
                      edit={true}
                      mode={editMode}
                      key={ringItem.id}
                      value={ringItem.value}
                      deleteRing={deleteEndring}
                      id={ringItem.id}
                      moveLeft={moveLeftEnd}
                      moveRight={moveRightEnd}
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
                        bladeSum / 2 -
                        localData?.blade / 2
                      ).toFixed(2)}
                    </p>
                    <p>utfylling: {endringSum.toFixed(2)}</p>
                    <p
                      className={`${
                        differenceEnd >= -0.05 && differenceEnd <= 0.05
                          ? "text-green-500"
                          : "text-red-400"
                      }`}
                    >
                      Differanse: {differenceEnd}
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
          <div className="mt-20 flex flex-col">
            <form
              className="mb-5"
              action=""
              type="submit"
              onSubmit={handleRawRingPickerChange}
            >
              <label>Legg til planketykkelse</label>
              <div className="flex">
                <input
                  step="0.01"
                  type="number"
                  className="focus:shadow-outline w-full appearance-none rounded border bg-gray-400 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  onChange={(e) => setRawInputValue(e.target.value)}
                />
                <button className="btn btn-primary">Legg til</button>
              </div>
            </form>
            <div className="mb-5">
              <label>planketykkelse i overskrift</label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border bg-gray-400 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                onChange={handlePlankeTy}
                placeholder="eks: 50/38"
                type="text"
              />
            </div>
            <select
              className="mb-5 h-full rounded-md border-0 bg-gray-400 py-0 pl-2 pr-7 text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              onChange={prosentSelectHandler}
            >
              <option className="option" value="" selected disabled hidden>
                Velg prosent
              </option>
              <option className="option" value="18">
                18
              </option>
              <option className="option" value="12">
                12
              </option>
            </select>

            <BladeSelector sawbladeSelectHandler={sawbladeSelectHandler} />
            <div>
              <label>Legg til text i parantes</label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border bg-gray-400 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                onChange={handleSpes}
              />
            </div>
          </div>
        </EditMode>
      </div>
    </div>
  );
};

export default PostoppsettComponent;
