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
import { RawDivideComponent } from "./RawDivideComponent";
import Link from "next/link";
import { MiniList } from "./reusable/MiniList";
import { SearchResultComponent } from "./reusable/SearchResultComponent";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import dateFormat from "dateformat";
import { useContext } from "react";
import { PostInfoContext } from "../context";

interface Item {
  header: string;
  startrings: { input: string }[];
  blade: string;
  rawinput: { input: string; blade: string; id: string }[];
  endrings: { input: string }[];
}

const PostoppsettComponent = ({
  data,
  postId,
  setPostId,
}: {
  data: Item[];
}) => {
  const { data: users } = api.users.getUsers.useQuery({});
  const context = useContext(PostInfoContext);
  if (!context) {
    throw new Error(
      "SomeComponent must be used within a PostInfoContext.Provider",
    );
  }
  const {
    postInfoWriteChange,
    setPostInfoWriteChange,
    searchInputAll,
    setSearchInputAll,
    editMode,
    setEditMode,
  } = context;

  const [startringSum, setStartringSum] = useState(0);
  const [endringSum, setEndringSum] = useState(0);
  const [rawinputSum, setRawinputSum] = useState(0);
  const [localData, setLocalData] = useState();
  const [rawInputValue, setRawInputValue] = useState(0);
  const [rawValueFromInput, setRawValueFromInput] = useState(0);
  const [bladeSum, setBladeSum] = useState();
  const [openRawDivide, setOpenRawDivide] = useState(false);
  const [getRawValues, setGetRawValues] = useState();

  const [firstRingVal, setFirstRingVal] = useState(0);
  const [shimsVal, setShimsVal] = useState(0);
  const [shimsVal2, setShimsVal2] = useState(0);
  const [calculationResult, setCalculationResult] = useState(0);
  const [clickSearchOpen, setClickSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [kundeID, setKundeID] = useState("");
  const [postInfoWrite, setPostInfoWrite] = useState("");

  const [startRingsAltShow, setstartRingsAltShow] = useState(false);
  const [endRingsAltShow, setEndRingsAltShow] = useState(false);

  const [differenceStart, setDifferenceStart] = useState(null);
  const [differenceEnd, setDifferenceEnd] = useState(null);

  // LOCAL STORAGE
  const [localStorgeItem, setLocalStorgeItem] = useState();
  const [parsedStorageItem, setParsedStorageItem] = useState();

  const router = useRouter();

  const ctx = api.useContext();

  const { data: posts } = api.postoppsett.getByHeader.useQuery({
    header: searchInput,
    kundeID: kundeID,
  });

  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: false,
    kunde: kundeID,
  });

  const updatePost = api.postoppsett.updatePost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getById.invalidate();
    },
  });

  const deletePost = api.postoppsett.deletePost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getById.invalidate();
      router.push(`/list`);
    },
  });

  const handleDelete = (id: string) => {
    deletePost.mutate({ id: postId });
  };

  const startRings = localData?.startRings;
  const startRingsAlt = localData?.startRingsAlt;
  const endRings = localData?.endRings;
  const endRingsAlt = localData?.endRingsAlt;
  const rawRings = localData?.rawInput;
  const rawDivideParse = localData?.rawDivide;

  const [headerText, setHeaderText] = useState("");

  const rawValues = rawRings?.map((item) => item);

  // *************** LOCAL STORAGE ***************
  useEffect(() => {
    if (localData) {
      // Parse the data (assuming localData is already parsed)
      const parsedData = JSON.stringify(localData);

      // Save the parsed data to localStorage
      localStorage.setItem("localDataKey", parsedData);
    }
  }, [localData]);

  // *************** LOCAL STORAGE ***************

  useEffect(() => {
    users?.forEach((user) => {
      if (user.role === "MV_ADMIN") {
        setKundeID("MV");
      } else if (user.role === "VS_ADMIN") {
        setKundeID("VS");
      }
    });
  }, [users]);

  useEffect(() => {
    setHeaderText(
      `${rawRings?.length}x${localData?.plankeTy}-${localData?.prosent}%-${(localData?.blade + 1.4).toFixed(1)}${localData?.spes}`,
    );
  }, [data, localData]);

  const [alertShown, setAlertShown] = useState(false);

  const updateData = async (event, id) => {
    if (differenceStart >= 0.05 || differenceStart <= -0.05) {
      alert("Ufylling foran er ikke korrekt");
      setAlertShown(true); // Set the alertShown flag
    } else if (differenceEnd >= 0.05 || differenceEnd <= -0.05) {
      alert("Ufylling bak er ikke korrekt");
      setAlertShown(true); // Set the alertShown flag
    } else if (localData?.blade === 0) {
      alert("Bladtykkelse er ikke valgt");
      setAlertShown(true); // Set the alertShown flag
    } else if (localData?.prosent === 0) {
      alert("Prosent er ikke valgt");
      setAlertShown(true); // Set the alertShown flag
    } else if (localData?.plankeTy === "") {
      alert("Planke tykkelse er ikke valgt");
      setAlertShown(true); // Set the alertShown flag
    } else {
      try {
        const id = postId;
        const header = headerText;
        const plankeTy = String(localData?.plankeTy);
        const startRings = localData?.startRings;
        const startRingsAlt = localData?.startRingsAlt;
        const endRings = localData?.endRings;
        const endRingsAlt = localData?.endRingsAlt;
        const rawInput = localData?.rawInput;
        const blade = localData?.blade;
        const prosent = String(localData?.prosent);
        const spes = localData?.spes;
        const xlog = String(rawRings?.length);
        const sawType = String("mkv");
        const response = await updatePost.mutateAsync({
          id,
          header,
          plankeTy,
          startRings,
          startRingsAlt,
          endRingsAlt,
          endRings,
          rawInput,
          blade,
          prosent,
          spes,
          xlog,
          sawType,
        });
        /*  console.log(response); */
        setAlertShown(false);
        setEditMode(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (alertShown) {
      console.log("Alert was shown, skipping useEffect logic.");
    } else {
      if (localData) {
        setLocalData((prevData) => {
          const updatedRawInput = prevData.rawInput.map((item) => {
            if (item.value === getRawValues) {
              return {
                ...item,
                ring: firstRingVal,
                shimsVal: shimsVal,
                shimsVal2: Number(calculationResult),
              };
            } else {
              return item;
            }
          });

          return {
            ...prevData,
            rawInput: updatedRawInput,
          };
        });
      }
    }
  }, [firstRingVal, shimsVal, getRawValues, calculationResult, alertShown]);

  const createPost = api.postoppsett.createPost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getById.invalidate();
      router.push(`/list`);
    },
  });

  const createData = async () => {
    if (differenceStart >= 0.05 || differenceStart <= -0.05) {
      alert("Ufylling foran er ikke korrekt");
      setAlertShown(true); // Set the alertShown flag
    } else if (differenceEnd >= 0.05 || differenceEnd <= -0.05) {
      alert("Ufylling bak er ikke korrekt");
      setAlertShown(true); // Set the alertShown flag
    } else if (localData?.blade === 0) {
      alert("Bladtykkelse er ikke valgt");
      setAlertShown(true); // Set the alertShown flag
    } else if (localData?.prosent === 0) {
      alert("Prosent er ikke valgt");
      setAlertShown(true); // Set the alertShown flag
    } else if (localData?.plankeTy === "") {
      alert("Planke tykkelse er ikke valgt");
      setAlertShown(true); // Set the alertShown flag
    } else {
      try {
        const header = headerText;
        const plankeTy = String(localData?.plankeTy);
        const startRings = localData?.startRings;
        const endRings = localData?.endRings;
        const startRingsAlt = localData?.startRingsAlt;
        const endRingsAlt = localData?.endRingsAlt;
        const rawInput = localData?.rawInput;
        const blade = localData?.blade;
        const prosent = String(localData?.prosent);
        const spes = localData?.spes;
        const xlog = String(rawRings?.length);
        const sawType = "mkv";
        const kunde = kundeID;
        const response = await createPost.mutateAsync({
          header,
          plankeTy,
          startRings,
          endRings,
          startRingsAlt,
          endRingsAlt,
          rawInput,
          blade,
          prosent,
          spes,
          xlog,
          sawType,
          kunde,
        });
        /*  console.log(response); */
        setEditMode(false);
        setAlertShown(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openRawDivideHandler = (value) => {
    setOpenRawDivide(true);
    setGetRawValues(value);
  };

  const handleUpdate = async () => {
    // get the id and data you want to update
    const id = "your-post-id";
    const data = {
      // your updated data...
    };

    await updateData(id, data);
  };
  useEffect(() => {
    if (localData) {
      const startRingsKey = startRingsAltShow ? "startRingsAlt" : "startRings";
      const endRingsKey = endRingsAltShow ? "endRingsAlt" : "endRings";

      const startRings = localData[startRingsKey];
      const endRings = localData[endRingsKey];

      const startringTotal =
        startRings?.reduce(
          (total, ringItem) => total + Number(ringItem.value),
          0,
        ) || 0;

      const endringTotal =
        endRings?.reduce(
          (total, ringItem) => total + Number(ringItem.value),
          0,
        ) || 0;

      const rawinputTotal = rawRings?.reduce(
        (total, rawItem) => total + Number(rawItem.value) + 1.4,
        0,
      );

      const bladeTotal = localData.blade * rawRings?.length;

      setStartringSum(startringTotal);
      setEndringSum(endringTotal);
      setRawinputSum(rawinputTotal);
      setBladeSum(bladeTotal);
    }
  }, [localData, rawinputSum, startRingsAltShow, endRingsAltShow]);

  useEffect(() => {
    if (alertShown) {
      console.log("Alert was shown, skipping useEffect logic.");
    } else {
      if (data) {
        setLocalData(data);
      }
    }
  }, [data, alertShown]);

  const deleteStartring = (id) => {
    setLocalData((prevData) => {
      const updatedStartRings = prevData.startRings.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        startRings: updatedStartRings,
      };
    });
  };
  const deleteStartringAlt = (id) => {
    setLocalData((prevData) => {
      const updatedStartRings = prevData.startRingsAlt.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        startRingsAlt: updatedStartRings,
      };
    });
  };

  const deleteEndring = (id) => {
    setLocalData((prevData) => {
      const updatedEndRings = prevData.endRings.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        endRings: updatedEndRings,
      };
    });
  };

  const deleteEndringAlt = (id) => {
    setLocalData((prevData) => {
      const updatedEndRings = prevData.endRingsAlt.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        endRingsAlt: updatedEndRings,
      };
    });
  };

  const deleteRawInput = (id) => {
    setLocalData((prevData) => {
      const updatedRawRings = prevData.rawInput.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        rawInput: updatedRawRings,
      };
    });
  };

  const handleRingPickerChange = (value) => {
    const startRingsCopy = [...(localData?.startRings || [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      startRings: startRingsCopy,
    });
  };

  const handleRingPickerChangeAlt = (value) => {
    const startRingsCopy = [...(localData?.startRingsAlt || [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      startRingsAlt: startRingsCopy,
    });
  };

  const handleEndRingPickerChange = (value) => {
    const endRingsCopy = [...(localData?.endRings || [])];
    endRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      endRings: endRingsCopy,
    });
  };

  const handleEndRingPickerChangeAlt = (value) => {
    const endRingsCopy = [...(localData?.endRingsAlt || [])];
    endRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      endRingsAlt: endRingsCopy,
    });
  };

  const handleRawRingPickerChange = (value) => {
    // Copy rawInput into a new array
    const rawRings = [...(localData?.rawInput || [])];

    // Add the new item to the array
    rawRings.push({
      id: uuidv4(),
      value: Number(rawValueFromInput),
    });

    setLocalData({
      ...localData,
      rawInput: rawRings,
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
      plankeTy: String(event.target.value),
    });
  };
  const handleSpes = (event) => {
    setLocalData({
      ...localData,
      spes: event.target.value,
    });
  };

  useEffect(() => {
    const calculatedDifferenceEnd = (
      calc.mkv.middleEnd -
      rawinputSum / 2 -
      bladeSum / 2 -
      localData?.blade / 2 -
      endringSum
    ).toFixed(2);
    setDifferenceEnd(calculatedDifferenceEnd);
  }, [
    startRings,
    endRings,
    calc.mkv.toMiddle,
    rawinputSum,
    bladeSum,
    localData?.blade,
    endringSum,
  ]);

  useEffect(() => {
    const calculatedDifferenceStart = (
      calc.mkv.toMiddle -
      rawinputSum / 2 -
      bladeSum / 2 -
      localData?.blade / 2 -
      startringSum
    ).toFixed(2);

    setDifferenceStart(calculatedDifferenceStart);
  }, [
    startRings,
    endRings,
    calc.mkv.toMiddle,
    rawinputSum,
    bladeSum,
    localData?.blade,
    startringSum,
  ]);
  const moveLeft = async (id) => {
    const ringsKey = startRingsAltShow ? "startRingsAlt" : "startRings";
    const rings = localData[ringsKey];
    const index = rings.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...rings];
      const tempItem = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = tempItem;

      // Update the localData state
      setLocalData({
        ...localData,
        [ringsKey]: newItems,
      });
    }
  };

  const moveRight = (id) => {
    const ringsKey = startRingsAltShow ? "startRingsAlt" : "startRings";
    const rings = localData[ringsKey];
    const index = rings.findIndex((item) => item.id === id);

    if (index < rings.length - 1) {
      const newItems = [...rings];
      const tempItem = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = tempItem;

      setLocalData({
        ...localData,
        [ringsKey]: newItems,
      });
    }
  };

  const moveRightEnd = async (id) => {
    const ringsKey = endRingsAltShow ? "endRingsAlt" : "endRings";
    const rings = localData[ringsKey];
    const index = rings.findIndex((item) => item.id === id);

    if (index < rings.length - 1) {
      const newItems = [...rings];
      const tempItem = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = tempItem;

      setLocalData({
        ...localData,
        [ringsKey]: newItems,
      });
    }
  };

  const moveLeftEnd = async (id) => {
    const ringsKey = endRingsAltShow ? "endRingsAlt" : "endRings";
    const rings = localData[ringsKey];
    const index = rings.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...rings];
      const tempItem = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = tempItem;

      setLocalData({
        ...localData,
        [ringsKey]: newItems,
      });
    }
  };

  const moveLeftRaw = async (id) => {
    const index = rawRings.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...rawRings];
      const tempItem = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = tempItem;

      setLocalData({
        ...localData,
        rawInput: newItems,
      });
    }
  };
  const moveRightRaw = async (id) => {
    const index = rawRings.findIndex((item) => item.id === id);

    if (index < rawRings?.length - 1) {
      const newItems = [...rawRings];
      const tempItem = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = tempItem;

      setLocalData({
        ...localData,
        rawInput: newItems,
      });
    }
  };

  const resetPostHandler = () => {
    setLocalData({
      header: "",
      startRings: [],
      endRings: [],
      rawInput: [],
      blade: 0,
      prosent: 0,
      spes: "",
    });
  };

  const resetUtfyllingHandler = () => {
    setLocalData({ ...localData, startRings: [], endRings: [] });
  };

  const [searchGetAll, setSearchGetAll] = useState("");

  const clickSearch = (post) => {
    setSearchInput(`${post.post}-${post.prosent}%-${post.blad.toFixed(1)}`);
    setPostInfoWrite(`${post.post}x${post.bredde} ${post.blad.toFixed(1)}`);
    setClickSearchOpen(true);
    setSearchGetAll(`${post.post}-${post.prosent}%`);
  };

  useEffect(() => {
    if (searchInputAll) {
      setSearchInput(searchGetAll);
    }
  }, [searchInputAll]);

  const clickSearchAll = () => {
    setSearchInputAll(true);
  };

  return (
    <>
      <div>
        <EditHeader
          setEditMode={setEditMode}
          editMode={editMode}
          handleUpdate={handleUpdate}
          createData={createData}
          handleDelete={handleDelete}
          resetPostHandler={resetPostHandler}
          resetUtfyllingHandler={resetUtfyllingHandler}
          setAlertShown={setAlertShown}
        />
        {clickSearchOpen && (
          <SearchResultComponent
            results={posts}
            setPostId={setPostId}
            setClickSearchOpen={setClickSearchOpen}
            postInfoWrite={postInfoWrite}
            setPostInfoWriteChange={setPostInfoWriteChange}
            setSearchInputAll={setSearchInputAll}
            clickSearchAll={clickSearchAll}
          />
        )}
        {localData?.header && (
          <div className="absolute bottom-5 left-5">
            <p className="text-5xl font-thin">
              {postInfoWriteChange && postInfoWriteChange}
            </p>
          </div>
        )}
        {/* 
className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0d243c] via-[#599c53] to-[#e09a18]" */}

        <div className="flex h-screen flex-col items-center justify-center bg-base-100">
          {!editMode && (
            <div className="animations">
              {startRingsAlt && startRingsAlt.length > 0 && (
                <button
                  onClick={() => setstartRingsAltShow(!startRingsAltShow)}
                  className="btn btn-xs bg-primary text-secondary"
                >
                  ALT
                </button>
              )}
              {localData?.header ? (
                <div key={data?.id}>
                  <div className="absolute left-1/2 top-40 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
                    <p className="text-3xl text-primary">{localData?.header}</p>
                    <p className="italic text-primary">
                      Oprettet:{" "}
                      {dateFormat(localData?.createdAt, "dd.mm.yyyy, HH:MM")}
                    </p>
                  </div>
                  <div className="flex ">
                    <div className="flex gap-1">
                      {!startRingsAltShow
                        ? startRings?.map((ringItem: { value: string }) => (
                            <Ring
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                            />
                          ))
                        : startRingsAlt?.map((ringItem: { value: string }) => (
                            <Ring
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                            />
                          ))}
                    </div>

                    <Blade blade={data?.blade} />
                    <div className="flex">
                      {rawRings?.map((ringItem: { value: string }) => (
                        <RawRing
                          mode={editMode}
                          key={ringItem.id}
                          value={ringItem.value}
                          blade={localData.blade}
                          rawDivide={rawDivideParse}
                          ringItem={ringItem}
                        />
                      ))}
                    </div>

                    <div className="flex gap-1">
                      {!endRingsAltShow
                        ? endRings?.map((ringItem: { value: string }) => (
                            <Ring
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                            />
                          ))
                        : endRingsAlt?.map((ringItem: { value: string }) => (
                            <Ring
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                            />
                          ))}

                      {endRingsAlt && endRingsAlt.length > 0 && (
                        <button
                          onClick={() => setEndRingsAltShow(!endRingsAltShow)}
                          className="btn btn-xs bg-primary text-secondary"
                        >
                          ALT
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-2xl text-primary">Ingen data valgt</p>
              )}
            </div>
          )}

          <div>
            <EditMode editMode={editMode}>
              {openRawDivide && (
                <RawDivideComponent
                  setOpenRawDivide={setOpenRawDivide}
                  rawData={localData && localData?.rawInput}
                  getRawValues={getRawValues}
                  localData={localData}
                  setLocalData={setLocalData}
                  rawValues={rawValues}
                  firstRingVal={firstRingVal}
                  setFirstRingVal={setFirstRingVal}
                  shimsVal={shimsVal}
                  setShimsVal={setShimsVal}
                  shimsVal2={shimsVal2}
                  setShimsVal2={setShimsVal2}
                  calculationResult={calculationResult}
                  setCalculationResult={setCalculationResult}
                />
              )}
              <EditMode editMode={editMode}>
                {!startRingsAltShow ? (
                  <RingPicker
                    values={ringlist}
                    position="left-48"
                    title="Utfylling foran"
                    onChange={handleRingPickerChange}
                  />
                ) : (
                  <RingPicker
                    values={ringlist}
                    position="left-48"
                    title="Utfylling foran Alternativ"
                    onChange={handleRingPickerChangeAlt}
                  />
                )}
              </EditMode>

              <div key={localData?.id}>
                <div className="absolute left-1/2 top-20 mb-20 mt-10 -translate-x-1/2 -translate-y-1/2 transform">
                  <p className="text-primary">Opprinnelig post: {localData?.header}</p>
                  <p className="italic text-primary">
                    Oprettet:{" "}
                    {dateFormat(localData?.createdAt, "dd.mm.yyyy, MM:HH")}
                  </p>
                  <p className="text-3xl text-primary">
                    {rawRings?.length}x{localData?.plankeTy}-
                    {localData?.prosent}
                    %-{(localData?.blade + 1.4).toFixed(1)}
                    {localData?.spes}
                  </p>
                </div>
                <div className="flex">
                  <div className="flex gap-1">
                    <EditMode editMode={editMode}>
                      <div>
                        <p className="text-primary">
                          Distanse:{" "}
                          {(
                            calc.mkv.toMiddle -
                            rawinputSum / 2 -
                            bladeSum / 2 -
                            localData?.blade / 2
                          ).toFixed(2)}
                        </p>
                        <p className="text-primary">utfylling: {startringSum?.toFixed(2)}</p>
                        <p
                          className={`${
                            differenceStart >= -0.05 && differenceStart <= 0.05
                              ? "text-green-500"
                              : "text-red-400"
                          }`}
                        >
                          Differanse: {differenceStart}
                        </p>
                        <button
                          onClick={() =>
                            setstartRingsAltShow(!startRingsAltShow)
                          }
                          className="btn btn-xs bg-primary text-neutral"
                        >
                          {!startRingsAltShow
                            ? "Vis standard"
                            : "Vis alternativ"}
                        </button>
                      </div>
                    </EditMode>
                    {!startRingsAltShow
                      ? startRings?.map((ringItem: { value: string }) => (
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
                        ))
                      : startRingsAlt?.map((ringItem: { value: string }) => (
                          <Ring
                            edit={true}
                            mode={editMode}
                            key={ringItem.id}
                            value={ringItem.value}
                            deleteRing={deleteStartringAlt}
                            id={ringItem.id}
                            moveLeft={moveLeft}
                            moveRight={moveRight}
                          />
                        ))}
                  </div>
                  <Blade blade={localData?.blade} />

                  <div className="flex">
                    {rawRings?.map((ringItem: { value: string }) => {
                      return (
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
                          openRawDivideHandler={() =>
                            openRawDivideHandler(ringItem.value)
                          }
                          getRawValues={getRawValues}
                          ringItem={ringItem}
                          setRawInputValue={setRawInputValue}
                          rawInputValue={rawInputValue}
                          rawData={localData && localData?.rawInput}
                          localData={localData}
                          setLocalData={setLocalData}
                        />
                      );
                    })}
                  </div>
                  <div className="flex gap-1">
                    {!endRingsAltShow
                      ? endRings?.map((ringItem: { value: string }) => (
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
                        ))
                      : endRingsAlt?.map((ringItem: { value: string }) => (
                          <Ring
                            edit={true}
                            mode={editMode}
                            key={ringItem.id}
                            value={ringItem.value}
                            deleteRing={deleteEndringAlt}
                            id={ringItem.id}
                            moveLeft={moveLeftEnd}
                            moveRight={moveRightEnd}
                          />
                        ))}
                  </div>

                  <EditMode editMode={editMode}>
                    <div>
                      <p className="text-primary">
                        Distanse:{" "}
                        {(
                          calc.mkv.middleEnd -
                          rawinputSum / 2 -
                          bladeSum / 2 -
                          localData?.blade / 2
                        ).toFixed(2)}
                      </p>
                      <p className="text-primary">utfylling: {endringSum?.toFixed(2)}</p>
                      <p
                        className={`${
                          differenceEnd >= -0.05 && differenceEnd <= 0.05
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        Differanse: {differenceEnd}
                      </p>
                      <button
                        onClick={() => setEndRingsAltShow(!endRingsAltShow)}
                        className="btn btn-xs bg-primary text-neutral"
                      >
                        {!endRingsAltShow ? "Vis standard" : "Vis alternativ"}
                      </button>
                    </div>
                  </EditMode>
                </div>
                <EditMode editMode={editMode}>
                  {!endRingsAltShow ? (
                    <RingPicker
                      values={ringlist}
                      position="right-48"
                      title="Utfylling bak"
                      onChange={handleEndRingPickerChange}
                    />
                  ) : (
                    <RingPicker
                      values={ringlist}
                      position="right-48"
                      title="Utfylling bak alternativ"
                      onChange={handleEndRingPickerChangeAlt}
                    />
                  )}
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
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRawRingPickerChange();
                }}
              >
                <label>Råmål</label>
                <div className="flex">
                  <input
                    step="0.01"
                    type="number"
                    className="focus:shadow-outline w-full appearance-none rounded border bg-neutral px-3 py-2 leading-tight text-primary shadow focus:outline-none"
                    onChange={(e) =>
                      setRawValueFromInput(parseFloat(e.target.value))
                    }
                  />
                  <button className="btn btn-primary">Legg til</button>
                </div>
              </form>
              <div className="mb-5">
                <label>planketykkelse i overskrift</label>
                <input
                  className="w-full appearance-none rounded border bg-neutral px-3 py-2 leading-tight text-primary shadow focus:outline-none"
                  onChange={handlePlankeTy}
                  placeholder="eks: 50/38"
                  type="text"
                  value={localData?.plankeTy}
                />
              </div>
              <select
                className="mb-5 h-full rounded-md border-0 bg-neutral py-0 pl-2 pr-7 text-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={prosentSelectHandler}
                value={localData?.prosent}
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

              <BladeSelector
                sawbladeSelectHandler={sawbladeSelectHandler}
                val={localData?.blade}
              />
              <div>
                <label>Legg til text i parantes</label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border bg-neutral px-3 py-2 leading-tight text-primary shadow focus:outline-none"
                  onChange={handleSpes}
                  value={localData?.spes}
                />
              </div>
            </div>
          </EditMode>
        </div>
        {!editMode && (
          <MiniList
            clickSearch={clickSearch}
            kundeID={kundeID}
            skurliste={skurliste}
          />
        )}
      </div>
      <style>{`
    
@keyframes tada { 0% { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } 10%, 20% { -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); } 30%, 50%, 70%, 90% { -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); } 40%, 60%, 80% { -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); } 100% { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } }

.animations {
  animation: tada 1s;
}


    `}</style>
    </>
  );
};

export default PostoppsettComponent;
