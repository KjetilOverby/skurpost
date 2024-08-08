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

  const updatePost = api.postoppsett.updatePost.useMutation();

  const updateData = async (id, data) => {
    try {
      const response = await updatePost.mutateAsync({ id, data });
      console.log(response);
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

  // call updateData with the id and data you want to update
  // updateData('clziaceze0000q22myexd454e', { header: 'testing' });
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
  }, [localData, rawInputValue]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  console.log(localData);

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
          blade: localData.blade,
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

  const differenceEnd = (
    calc.middleEnd -
    rawinputSum / 2 -
    localData?.blade -
    endringSum
  ).toFixed(2);

  const differenceStart = (
    calc.toMiddle -
    rawinputSum / 2 -
    localData?.blade -
    startringSum
  ).toFixed(2);

  const moveLeft = async (id) => {
    const index = localData.startrings.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...localData.startrings];
      const tempOrder = newItems[index].input;
      newItems[index].input = newItems[index - 1].input;
      newItems[index - 1].input = tempOrder;

      // Update the localData state
      setLocalData({
        ...localData,
        startrings: newItems,
      });

      // // Update the order in the database
      // await Promise.all([
      //   updates(newItems[index].id, newItems[index].input),
      //   updates(newItems[index - 1].id, newItems[index - 1].input),
      // ]);
    }
  };

  const moveRight = async (id) => {
    const index = localData.startrings.findIndex((item) => item.id === id);

    if (index < localData.startrings.length - 1) {
      const newItems = [...localData.startrings];
      const tempOrder = newItems[index].input;
      newItems[index].input = newItems[index + 1].input;
      newItems[index + 1].input = tempOrder;

      // Update the localData state
      setLocalData({
        ...localData,
        startrings: newItems,
      });

      // Update the order in the database
      // await Promise.all([
      //   updates(newItems[index].id, newItems[index].input),
      //   updates(newItems[index + 1].id, newItems[index + 1].input),
      // ]);
    }
  };

  const moveLeftEnd = async (id) => {
    const index = localData.endrings.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...localData.endrings];
      const tempOrder = newItems[index].input;
      newItems[index].input = newItems[index - 1].input;
      newItems[index - 1].input = tempOrder;

      // Update the localData state
      setLocalData({
        ...localData,
        endrings: newItems,
      });

      // // Update the order in the database
      // await Promise.all([
      //   updates(newItems[index].id, newItems[index].input),
      //   updates(newItems[index - 1].id, newItems[index - 1].input),
      // ]);
    }
  };
  const moveRightEnd = async (id) => {
    const index = localData.endrings.findIndex((item) => item.id === id);

    if (index < localData.endrings.length - 1) {
      const newItems = [...localData.endrings];
      const tempOrder = newItems[index].input;
      newItems[index].input = newItems[index + 1].input;
      newItems[index + 1].input = tempOrder;

      // Update the localData state
      setLocalData({
        ...localData,
        endrings: newItems,
      });

      // Update the order in the database
      // await Promise.all([
      //   updates(newItems[index].id, newItems[index].input),
      //   updates(newItems[index + 1].id, newItems[index + 1].input),
      // ]);
    }
  };

  const moveLeftRaw = async (id) => {
    const index = localData.rawinput.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...localData.rawinput];
      const tempOrder = newItems[index].input;
      newItems[index].input = newItems[index - 1].input;
      newItems[index - 1].input = tempOrder;

      // Update the localData state
      setLocalData({
        ...localData,
        rawinput: newItems,
      });

      // // Update the order in the database
      // await Promise.all([
      //   updates(newItems[index].id, newItems[index].input),
      //   updates(newItems[index - 1].id, newItems[index - 1].input),
      // ]);
    }
  };
  const moveRightRaw = async (id) => {
    const index = localData.rawinput.findIndex((item) => item.id === id);

    if (index < localData.rawinput.length - 1) {
      const newItems = [...localData.rawinput];
      const tempOrder = newItems[index].input;
      newItems[index].input = newItems[index + 1].input;
      newItems[index + 1].input = tempOrder;

      // Update the localData state
      setLocalData({
        ...localData,
        rawinput: newItems,
      });

      // Update the order in the database
      // await Promise.all([
      //   updates(newItems[index].id, newItems[index].input),
      //   updates(newItems[index + 1].id, newItems[index + 1].input),
      // ]);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {!editMode && (
        <div>
          <div key={data?.id}>
            <div className="absolute left-1/2 top-20 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
              <p className="text-3xl">
                {data?.xlog}x{data?.header}
              </p>
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
              <p className="text-3xl">
                {localData?.rawinput.length}x{localData?.plankeTy}-
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
                        localData?.blade / 2 -
                        localData?.rawinput.length * 0.7
                      ).toFixed(2)}
                    </p>
                    <p>utfylling: {startringSum}</p>
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
                {localData?.startrings.map((ringItem: { input: string }) => (
                  <Ring
                    edit={true}
                    mode={editMode}
                    key={ringItem.id}
                    value={ringItem.input}
                    deleteRing={deleteStartring}
                    id={ringItem.id}
                    moveLeft={moveLeft}
                    moveRight={moveRight}
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
                    moveLeft={moveLeftRaw}
                    moveRight={moveRightRaw}
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
                    moveLeft={moveLeftEnd}
                    moveRight={moveRightEnd}
                  />
                ))}
              </div>
              <p onClick={handleUpdate} className="text-white">
                test
              </p>
              <EditMode editMode={editMode}>
                <div>
                  <p>
                    Distanse:{" "}
                    {(
                      calc.middleEnd -
                      rawinputSum / 2 -
                      localData?.blade / 2 -
                      localData?.rawinput.length * 0.7
                    ).toFixed(2)}
                  </p>
                  <p>utfylling: {endringSum}</p>
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
            />
          </div>
          <select
            className="mb-5 h-full rounded-md border-0 bg-gray-400 py-0 pl-2 pr-7 text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={prosentSelectHandler}
          >
            <option className="option" value="" selected disabled hidden>
              Velg prosent
            </option>
            <option className="option" value={18}>
              18
            </option>
            <option className="option" value={12}>
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
  );
};

export default PostoppsettComponent;
