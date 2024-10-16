import React, { useState, useEffect, SetStateAction } from "react";
import Ring from "./reusable/rings/Ring";
import RawRing from "./reusable/rings/RawRing";
import Blade from "./reusable/rings/Blade";
import calc from "~/utils/calc";

import { EditMode } from "./modes/editMode";
import RingPicker from "./reusable/ringpicker";
import { v4 as uuidv4 } from "uuid";
import BladeSelector from "./Bladeselector";
import { api } from "~/utils/api";
import EditHeader from "./reusable/EditHeader";
import { RawDivideComponent } from "./RawDivideComponent";
import { MiniList } from "./reusable/MiniList";
import { SearchResultComponent } from "./reusable/SearchResultComponent";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
import { useContext } from "react";
import { PostInfoContext } from "../context";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

// ...

interface Item {
  value: string;
  id: string;
  header: string;
  startrings: { input: string }[];
  blade: string;
  rawinput: { input: string; blade: string; id: string }[];
  endrings: { input: string }[];
}

interface Data {
  sawType: string;
}

const PostoppsettComponent = ({
  data,
  postId,
  setPostId,
  // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
  sessionStatus,
  // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
  isLoadingPostoppsett,
}: {
  data: Data;
  postId: string;
  setPostId: (id: string) => void;
}) => {
  const { data: users } = api.users.getUsers.useQuery();

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
    setGetUserInfo,
    searchInput,
    setSearchInput,
  } = context;
  const { data: sessionData } = useSession();
  const [startringSum, setStartringSum] = useState(0);
  const [endringSum, setEndringSum] = useState(0);
  const [rawinputSum, setRawinputSum] = useState(0);
  interface LocalData {
    startRings: { id: string; value: string }[];
    startRingsAlt: { id: string; value: string }[];
    endRings: { id: string; value: string }[];
    endRingsAlt: { id: string; value: string }[];
    rawInput: { id: string; value: string }[];
    blade: number;
    prosent: number;
    plankeTy: string;
    spes: string;
    header: string;
    createdAt: Date;
  }

  const [localData, setLocalData] = useState<LocalData | null>(null);
  const [rawInputValue, setRawInputValue] = useState(0);
  const [rawValueFromInput, setRawValueFromInput] = useState(0);
  const [bladeSum, setBladeSum] = useState<number>(0);
  const [openRawDivide, setOpenRawDivide] = useState(false);
  const [getRawValues, setGetRawValues] = useState();

  const [firstRingVal, setFirstRingVal] = useState(0);
  const [shimsVal, setShimsVal] = useState(0);
  const [shimsVal2, setShimsVal2] = useState(0);
  const [calculationResult, setCalculationResult] = useState(0);
  const [clickSearchOpen, setClickSearchOpen] = useState(false);
  const [kundeID, setKundeID] = useState("");
  const [postInfoWrite, setPostInfoWrite] = useState("");

  const [startRingsAltShow, setstartRingsAltShow] = useState(false);
  const [endRingsAltShow, setEndRingsAltShow] = useState(false);

  const [differenceStart, setDifferenceStart] = useState<string | null>(null);
  const [differenceEnd, setDifferenceEnd] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const currentUserId = sessionData?.user?.id;

  const [sawTypeSettings, setSawTypeSettings] = useState("");

  const router = useRouter();

  const ctx = api.useContext();

  useEffect(() => {
    if (setGetUserInfo) {
      setGetUserInfo(sessionData && sessionData.user);
    }
  }, [sessionData]);

  const {
    data: settings,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    userId: sessionData?.user.id ?? "",
  });

  useEffect(() => {
    setSawTypeSettings(settings?.sawType ?? "");
  }, [settings]);

  const { data: posts } = api.postoppsett.getByHeader.useQuery({
    header: searchInput,
    kundeID: kundeID,
    sawType: settings?.sawType ?? "",
  });

  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: false,
    kunde: kundeID,
  });

  const getCalcData = (sawTypeData: string) => {
    if (sawTypeData === "MKV" || sawTypeData === "MKS") {
      return calc[sawTypeData];
    }
    return null; // or handle invalid sawTypeData
  };

  const updatePost = api.postoppsett.updatePost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getById.invalidate();
      toast.success("Posten ble oppdatert");
      setIsOpen(false);
    },
  });

  const deletePost = api.postoppsett.deletePost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getById.invalidate();
      void router.push(`/list`);
      toast.success("Posten ble slettet");
    },
  });

  const handleDelete = (id: string) => {
    deletePost.mutate({ id: postId });
  };

  /*  const startRings =
    localData?.startRings?.map((ring) => ({
      ...ring,
      value: Number(ring.value),
    })) ?? []; */

  const startRings = localData?.startRings;
  const startRingsAlt = localData?.startRingsAlt;
  const endRings = localData?.endRings;
  const endRingsAlt = localData?.endRingsAlt;
  const rawRings = localData?.rawInput;
  // const rawDivideParse = localData?.rawDivide;

  const [sawTypeData, setSawTypeData] = useState<string>("");

  useEffect(() => {
    if (data) {
      setSawTypeData(data.sawType);
    }
  }, [data]);

  const [headerText, setHeaderText] = useState("");

  const rawValues = rawRings?.map((item) => item);

  useEffect(() => {
    if (users && users.length > 0 && currentUserId) {
      const currentUser = users.find((user) => user.id === currentUserId);

      if (currentUser) {
        if (currentUser.role === "MV_ADMIN") {
          setKundeID("MV");
        } else if (currentUser.role === "VS_ADMIN") {
          setKundeID("VS");
        }
      }
    }
  }, [users, currentUserId]);

  useEffect(() => {
    setHeaderText(
      `${rawRings?.length}x${localData?.plankeTy}-${localData?.prosent}%-${((localData?.blade ?? 0) + 1.4).toFixed(1)}${localData?.spes}`,
    );
  }, [data, localData]);

  const [alertShown, setAlertShown] = useState(false);

  const updateData = async (id: string, data: Record<string, unknown>) => {
    // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
    if (differenceStart >= 0.05 || differenceStart <= -0.05) {
      toast.error("Ufylling foran er ikke korrekt");
      setAlertShown(true);
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
    } else if (differenceEnd >= 0.05 || differenceEnd <= -0.05) {
      toast.error("Ufylling bak er ikke korrekt");
      setAlertShown(true);
    } else if (localData?.blade === 0) {
      toast.error("Bladtykkelse er ikke valgt");
      setAlertShown(true);
    } else if (localData?.prosent === 0) {
      toast.error("Prosent er ikke valgt");
      setAlertShown(true);
    } else if (localData?.plankeTy === "") {
      toast.error("Planketykkelse er ikke lagt inn");
      setAlertShown(true);
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
        const sawType = settings?.sawType ?? "";

        const response = await updatePost.mutateAsync({
          id,
          header,
          plankeTy,
          startRings:
            localData?.startRings?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          startRingsAlt:
            localData?.startRingsAlt?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          endRingsAlt:
            localData?.endRingsAlt?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          endRings:
            localData?.endRings?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          rawInput:
            localData?.rawInput?.map((item) => ({
              ...item,
              value: Number(item.value),
            })) ?? [],
          blade: blade ?? 0,
          prosent,
          spes: spes ?? "",
          xlog,
          sawType,
        });

        setEditMode(false);
        setAlertShown(false);
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
          if (!prevData) return null;

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
            startRingsAlt: prevData.startRingsAlt ?? [],
            endRings: prevData.endRings ?? [],
            endRingsAlt: prevData.endRingsAlt ?? [],
          };
        });
      }
    }
  }, [firstRingVal, shimsVal, getRawValues, calculationResult, alertShown]);

  const createPost = api.postoppsett.createPost.useMutation({
    onSuccess: () => {
      void ctx.postoppsett.getById.invalidate();
      void router.push(`/list`);
      toast.success("Posten ble lagret");
    },
  });

  const createData = async () => {
    // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
    if (differenceStart >= 0.05 || differenceStart <= -0.05) {
      toast.error("Ufylling foran er ikke korrekt");
      setAlertShown(true);
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
    } else if (differenceEnd >= 0.05 || differenceEnd <= -0.05) {
      toast.error("Ufylling bak er ikke korrekt");
      setAlertShown(true);
    } else if (localData?.blade === 0) {
      toast.error("Bladtykkelse er ikke valgt");
      setAlertShown(true);
    } else if (localData?.prosent === 0) {
      toast.error("Prosent er ikke valgt");
      setAlertShown(true);
    } else if (localData?.plankeTy === "") {
      toast.error("Planke tykkelse er ikke lagt inn");
      setAlertShown(true);
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
        const sawType = settings?.sawType ?? "";
        const kunde = kundeID;

        const response = await createPost.mutateAsync({
          header,
          plankeTy,
          startRings:
            localData?.startRings?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          endRings:
            localData?.endRings?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          startRingsAlt:
            localData?.startRingsAlt?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          endRingsAlt:
            localData?.endRingsAlt?.map((ring) => ({
              ...ring,
              value: Number(ring.value),
            })) ?? [],
          rawInput:
            localData?.rawInput?.map((item) => ({
              ...item,
              value: Number(item.value),
            })) ?? [],
          blade: blade ?? 0,
          prosent,
          spes: spes ?? "",
          xlog,
          sawType,
          kunde,
        });

        setEditMode(false);
        setAlertShown(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            "Overskriften i posten finnes allerede! " + error.message,
          );
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  const openRawDivideHandler = (value: React.SetStateAction<undefined>) => {
    setOpenRawDivide(true);
    setGetRawValues(value);
    setFirstRingVal(0);
    setShimsVal(0);
    setShimsVal2(0);
  };
  const handleUpdate = async () => {
    // get the id and data you want to update
    const id = "your-post-id";
    const data = {
      // your updated data...
    };

    try {
      await updateData(id, data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
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

      const bladeTotal = localData.blade * (rawRings?.length ?? 0);

      setStartringSum(startringTotal);
      setEndringSum(endringTotal);
      setRawinputSum(rawinputTotal ?? 0);
      setBladeSum(bladeTotal);
    }
  }, [localData, rawinputSum, startRingsAltShow, endRingsAltShow]);

  useEffect(() => {
    if (alertShown) {
      console.log("Alert was shown, skipping useEffect logic.");
    } else {
      if (data) {
        // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
        setLocalData(data);
      }
    }
  }, [data, alertShown, editMode]);

  const deleteStartring = (id: string) => {
    setLocalData((prevData) => {
      if (!prevData) return null;
      const updatedStartRings = prevData.startRings.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        startRings: updatedStartRings,
        startRingsAlt: prevData.startRingsAlt ?? [],
        endRings: prevData.endRings ?? [],
        endRingsAlt: prevData.endRingsAlt ?? [],
      };
    });
  };
  const deleteStartringAlt = (id: string) => {
    setLocalData((prevData) => {
      if (!prevData) return null;
      const updatedStartRings = prevData.startRingsAlt.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        startRingsAlt: updatedStartRings,
      };
    });
  };

  const deleteEndring = (id: string) => {
    setLocalData((prevData) => {
      if (!prevData) return null;
      const updatedEndRings = prevData.endRings.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        endRings: updatedEndRings,
      };
    });
  };

  const deleteEndringAlt = (id: string) => {
    setLocalData((prevData) => {
      if (!prevData) return null;
      const updatedEndRings = prevData.endRingsAlt.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        endRingsAlt: updatedEndRings,
      };
    });
  };

  const deleteRawInput = (id: string) => {
    setLocalData((prevData) => {
      if (!prevData) return null;
      const updatedRawRings = prevData.rawInput.filter(
        (ringItem) => ringItem.id !== id,
      );
      return {
        ...prevData,
        rawInput: updatedRawRings,
      };
    });
  };

  const handleRingPickerChange = (value: string) => {
    const startRingsCopy = [...(localData?.startRings ?? [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      startRings: startRingsCopy,
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRings: localData?.endRings ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleRingPickerChangeInput = (value: string) => {
    const startRingsCopy = [...(localData?.startRings ?? [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      startRings: startRingsCopy,
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRings: localData?.endRings ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleRingPickerChangeAlt = (value: string) => {
    const startRingsCopy = [...(localData?.startRingsAlt ?? [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      startRingsAlt: startRingsCopy,
      startRings: localData?.startRings ?? [],
      endRings: localData?.endRings ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleRingPickerChangeInputAlt = (value: string) => {
    const startRingsCopy = [...(localData?.startRingsAlt ?? [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      startRingsAlt: startRingsCopy,
      startRings: localData?.startRings ?? [],
      endRings: localData?.endRings ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleEndRingPickerChange = (value: string) => {
    const endRingsCopy = [...(localData?.endRings ?? [])];
    endRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      endRings: endRingsCopy,
      startRings: localData?.startRings ?? [],
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleEndRingPickerChangeInput = (value: string) => {
    const startRingsCopy = [...(localData?.endRings ?? [])];
    startRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      endRings: startRingsCopy,
      startRingsAlt: localData?.startRingsAlt ?? [],
      startRings: localData?.startRings ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleEndRingPickerChangeAlt = (value: string) => {
    const endRingsCopy = [...(localData?.endRingsAlt ?? [])];
    endRingsCopy.push({ id: uuidv4(), value: value });

    setLocalData({
      ...localData,
      endRingsAlt: endRingsCopy,
      startRings: localData?.startRings ?? [],
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRings: localData?.endRings ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleRawRingPickerChange = (value: string) => {
    const rawRings = [...(localData?.rawInput ?? [])];

    rawRings.push({
      id: uuidv4(),
      value: rawValueFromInput.toString(),
    });

    setLocalData({
      ...localData,
      rawInput: rawRings,
      startRings: localData?.startRings ?? [],
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRings: localData?.endRings ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const handleEndRingPickerChangeInputAlt = (value: string) => {
    // Copy the current 'endRingsAlt' or create an empty array if it doesn't exist
    const endRingsAltCopy = [...(localData?.endRingsAlt ?? [])];

    // Add the new ring data
    endRingsAltCopy.push({ id: uuidv4(), value });

    // Update only the necessary fields in localData
    setLocalData({
      ...localData,
      endRingsAlt: endRingsAltCopy, // Update endRingsAlt specifically
      startRings: localData?.startRings ?? [],
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRings: localData?.endRings ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
  };

  const sawbladeSelectHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (localData) {
      setLocalData({
        ...localData,
        blade: parseFloat(event.target.value),
      });
    }
  };

  const prosentSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData((prevData) => ({
      ...prevData,
      prosent: parseFloat(event.target.value),
      startRings: prevData?.startRings ?? [],
      startRingsAlt: prevData?.startRingsAlt ?? [],
      endRings: prevData?.endRings ?? [],
      endRingsAlt: prevData?.endRingsAlt ?? [],
      rawInput: prevData?.rawInput ?? [],
      blade: prevData?.blade ?? 0,
      plankeTy: prevData?.plankeTy ?? "",
      spes: prevData?.spes ?? "",
      header: prevData?.header ?? "",
      createdAt: prevData?.createdAt ?? new Date(),
    }));
  };

  const handlePlankeTy = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (localData) {
      setLocalData({
        ...localData,
        plankeTy: event.target.value,
        startRings: localData.startRings ?? [],
        startRingsAlt: localData.startRingsAlt ?? [],
        endRings: localData.endRings ?? [],
        endRingsAlt: localData.endRingsAlt ?? [],
        rawInput: localData.rawInput ?? [],
        blade: localData.blade ?? 0,
        prosent: localData.prosent ?? 0,
        spes: localData.spes ?? "",
        header: localData.header ?? "",
        createdAt: localData.createdAt ?? new Date(),
      });
    }
  };
  const handleSpes = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (localData) {
      setLocalData({
        ...localData,
        spes: event.target.value,
      });
    }
  };

  useEffect(() => {
    if (sawTypeSettings) {
      const calculatedDifferenceEnd = (
        calc[sawTypeSettings as keyof typeof calc].middleEnd -
        rawinputSum / 2 -
        bladeSum / 2 -
        (localData?.blade ?? 0) / 2 -
        endringSum
      ).toFixed(2);
      setDifferenceEnd(calculatedDifferenceEnd);
    } else {
      setDifferenceEnd("0.00");
    }
  }, [
    sawTypeData,
    startRings,
    endRings,
    rawinputSum,
    bladeSum,
    localData?.blade,
    endringSum,
    sawTypeSettings,
  ]);

  useEffect(() => {
    if (sawTypeSettings) {
      const calculatedDifferenceStart = (
        calc[sawTypeSettings as keyof typeof calc].toMiddle -
        rawinputSum / 2 -
        bladeSum / 2 -
        (localData?.blade ?? 0) / 2 -
        startringSum
      ).toFixed(2);

      setDifferenceStart(calculatedDifferenceStart);
    }
  }, [
    sawTypeData,
    startRings,
    endRings,
    rawinputSum,
    bladeSum,
    localData?.blade,
    startringSum,
    sawTypeSettings,
  ]);

  interface RingItem {
    id: string;
    value: string;
  }

  interface LocalData {
    startRings: RingItem[];
    startRingsAlt: RingItem[];
    endRings: RingItem[];
    endRingsAlt: RingItem[];
    rawInput: { id: string; value: string }[];
    blade: number;
    prosent: number;
    plankeTy: string;
    spes: string;
    header: string;
    createdAt: Date;
  }

  const moveLeft = (id: string) => {
    const ringsKey = startRingsAltShow ? "startRingsAlt" : "startRings";
    if (!localData) return;

    const rings = localData[ringsKey as keyof LocalData];
    const index = Array.isArray(rings)
      ? rings.findIndex((item) => item.id === id)
      : -1;

    if (index > 0) {
      const newItems = Array.isArray(rings) ? [...rings] : [];
      const tempItem = newItems[index];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index] = newItems[index - 1];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index - 1] = tempItem;
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      setLocalData((prevData) => ({
        ...prevData,
        [ringsKey]: newItems,
      }));
    }
  };

  const moveRight = (id: string) => {
    const ringsKey = startRingsAltShow ? "startRingsAlt" : "startRings";
    if (!localData) return;

    const rings = localData[ringsKey as keyof LocalData];
    const index = Array.isArray(rings)
      ? rings.findIndex((item) => item.id === id)
      : -1;

    // Sjekker om elementet ikke er det siste i listen
    if (Array.isArray(rings) && index >= 0 && index < rings.length - 1) {
      const newItems = Array.isArray(rings) ? [...rings] : []; // Oppretter en kopi av rings
      const tempItem = newItems[index];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index] = newItems[index + 1];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index + 1] = tempItem;
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      setLocalData((prevData) => ({
        ...prevData,
        [ringsKey]: newItems,
      }));
    }
  };

  const moveRightEnd = (id: string) => {
    const ringsKey = endRingsAltShow ? "endRingsAlt" : "endRings";
    if (!localData) return;

    const rings = localData[ringsKey as keyof LocalData];
    const index = Array.isArray(rings)
      ? rings.findIndex((item) => item.id === id)
      : -1;

    // Sjekker om elementet ikke er det siste i listen
    if (Array.isArray(rings) && index >= 0 && index < rings.length - 1) {
      const newItems = Array.isArray(rings) ? [...rings] : []; // Oppretter en kopi av rings
      const tempItem = newItems[index];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index] = newItems[index + 1];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index + 1] = tempItem;
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      setLocalData((prevData) => ({
        ...prevData,
        [ringsKey]: newItems,
      }));
    }
  };

  const moveLeftEnd = (id: string) => {
    const ringsKey = endRingsAltShow ? "endRingsAlt" : "endRings";
    if (!localData) return;
    const rings = localData[ringsKey as keyof LocalData];
    const index = Array.isArray(rings)
      ? rings.findIndex((item) => item.id === id)
      : -1;

    if (index > 0) {
      const newItems = Array.isArray(rings) ? [...rings] : [];
      const tempItem = newItems[index];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index] = newItems[index - 1];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index - 1] = tempItem;
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      setLocalData((prevData) => ({
        ...prevData,
        [ringsKey]: newItems,
      }));
    }
  };

  const moveLeftRaw = (id: string) => {
    const index = (rawRings ?? []).findIndex((item) => item.id === id);

    // Sjekker om elementet ikke er det første i listen
    if (index > 0) {
      const newItems = [...(rawRings ?? [])];
      const tempItem = newItems[index];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index] = newItems[index - 1];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index - 1] = tempItem;

      setLocalData((prevData) => ({
        ...prevData,
        rawInput: newItems,
        startRings: prevData?.startRings ?? [],
        startRingsAlt: prevData?.startRingsAlt ?? [],
        endRings: prevData?.endRings ?? [],
        endRingsAlt: prevData?.endRingsAlt ?? [],
        blade: prevData?.blade ?? 0,
        prosent: prevData?.prosent ?? 0,
        plankeTy: prevData?.plankeTy ?? "",
        spes: prevData?.spes ?? "",
        header: prevData?.header ?? "",
        createdAt: prevData?.createdAt ?? new Date(),
      }));
    }
  };

  const moveRightRaw = (id: string) => {
    const index = (rawRings ?? []).findIndex((item) => item.id === id);

    if (index < (rawRings?.length ?? 0) - 1) {
      const newItems = [...(rawRings ?? [])];
      const tempItem = newItems[index];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index] = newItems[index + 1];
      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
      newItems[index + 1] = tempItem;

      setLocalData((prevData) => ({
        ...prevData,
        rawInput: newItems,
        startRings: prevData?.startRings ?? [],
        startRingsAlt: prevData?.startRingsAlt ?? [],
        endRings: prevData?.endRings ?? [],
        endRingsAlt: prevData?.endRingsAlt ?? [],
        blade: prevData?.blade ?? 0,
        prosent: prevData?.prosent ?? 0,
        plankeTy: prevData?.plankeTy ?? "",
        spes: prevData?.spes ?? "",
        header: prevData?.header ?? "",
        createdAt: prevData?.createdAt ?? new Date(),
      }));
    }
  };

  const resetPostHandler = () => {
    setIsOpen(false);
    setLocalData({
      header: "",
      startRings: [],
      startRingsAlt: [],
      endRings: [],
      endRingsAlt: [],
      rawInput: [],
      blade: 0,
      prosent: 0,
      plankeTy: "",
      spes: "",
      createdAt: new Date(),
    });
  };

  const resetUtfyllingHandler = () => {
    setLocalData({
      ...localData,
      startRings: [],
      endRings: [],
      startRingsAlt: localData?.startRingsAlt ?? [],
      endRingsAlt: localData?.endRingsAlt ?? [],
      rawInput: localData?.rawInput ?? [],
      blade: localData?.blade ?? 0,
      prosent: localData?.prosent ?? 0,
      plankeTy: localData?.plankeTy ?? "",
      spes: localData?.spes ?? "",
      header: localData?.header ?? "",
      createdAt: localData?.createdAt ?? new Date(),
    });
    setIsOpen(false);
  };

  const [searchGetAll, setSearchGetAll] = useState("");

  const clickSearch = (post: {
    post: string;
    prosent: string;
    blad: number;
    bredde: number;
  }) => {
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

  const swapStartRings = () => {
    setstartRingsAltShow(!startRingsAltShow);
  };

  const editUtfyllingSwap = () => {
    if (localData?.startRingsAlt.length === 0 && startRingsAltShow) {
      setstartRingsAltShow(!startRingsAltShow);
    } else if (localData?.startRings.length === 0 && startRingsAltShow) {
      setstartRingsAltShow(!startRingsAltShow);
    } else if (
      differenceStart !== null &&
      (parseFloat(differenceStart) >= 0.05 ||
        parseFloat(differenceStart) <= -0.05)
    ) {
      toast.error("Ufylling foran er ikke korrekt");
    } else {
      setstartRingsAltShow(!startRingsAltShow);
    }
  };
  const editUtfyllingSwapEnd = () => {
    if (localData?.endRingsAlt.length === 0 && endRingsAltShow) {
      setEndRingsAltShow(!endRingsAltShow);
    } else if (localData?.endRings.length === 0 && endRingsAltShow) {
      setEndRingsAltShow(!endRingsAltShow);
    } else if (
      differenceEnd !== null &&
      (parseFloat(differenceEnd) >= 0.05 || parseFloat(differenceEnd) <= -0.05)
    ) {
      toast.error("Ufylling bak er ikke korrekt");
    } else {
      setEndRingsAltShow(!endRingsAltShow);
    }
  };

  return (
    <>
      <div>
        <EditHeader
          setEditMode={setEditMode}
          editMode={editMode}
          handleUpdate={handleUpdate}
          createData={createData}
          // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
          handleDelete={handleDelete}
          resetPostHandler={resetPostHandler}
          resetUtfyllingHandler={resetUtfyllingHandler}
          setAlertShown={setAlertShown}
          searchInput={searchInput}
          saveDiasabled={(localData?.rawInput?.length ?? 0) > 0}
          updateDisabled={searchInput === ""}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        {clickSearchOpen && (
          <SearchResultComponent
            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
            results={posts}
            setPostId={setPostId}
            setClickSearchOpen={setClickSearchOpen}
            postInfoWrite={postInfoWrite}
            setPostInfoWriteChange={setPostInfoWriteChange}
            setSearchInputAll={setSearchInputAll}
            clickSearchAll={clickSearchAll}
          />
        )}
        {localData?.header && !editMode && (
          <div className="absolute bottom-5 left-5">
            <p className="text-5xl font-thin">
              {postInfoWriteChange && postInfoWriteChange}
            </p>
          </div>
        )}

        <div className="flex min-h-screen flex-col items-center justify-center bg-base-100">
          {!editMode && (
            <div className="animations">
              {startRingsAlt && startRingsAlt.length > 0 && (
                <button
                  onClick={swapStartRings}
                  className="btn btn-xs bg-primary text-secondary"
                >
                  ALT
                </button>
              )}
              {localData?.header ? (
                <div key={localData.header}>
                  <div className="absolute left-1/2 top-40 mb-20 -translate-x-1/2 -translate-y-1/2 transform ">
                    <p className="text-3xl text-primary">{localData?.header}</p>
                    <p className="italic text-primary">
                      Opprettet:{" "}
                      {dateFormat(localData?.createdAt, "dd.mm.yyyy, HH:MM")}
                    </p>
                  </div>

                  <div className="flex">
                    <div className="flex gap-1">
                      {!startRingsAltShow &&
                        startRings?.map((ringItem: { value: string }) => (
                          <Ring
                            mode={editMode}
                            key={ringItem.value}
                            value={ringItem.value}
                            edit={false}
                            deleteRing={function (id: string | number): void {
                              throw new Error("Function not implemented.");
                            }}
                            id={""}
                            moveLeft={function (id: string | number): void {
                              throw new Error("Function not implemented.");
                            }}
                            moveRight={function (id: string | number): void {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        ))}
                      {startRingsAltShow &&
                        startRingsAlt?.map((ringItem: { value: string }) => (
                          <Ring
                            mode={editMode}
                            key={ringItem.value}
                            value={ringItem.value}
                            edit={false}
                            deleteRing={function (id: string | number): void {
                              throw new Error("Function not implemented.");
                            }}
                            id={""}
                            moveLeft={function (id: string | number): void {
                              throw new Error("Function not implemented.");
                            }}
                            moveRight={function (id: string | number): void {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        ))}
                    </div>

                    <Blade blade={localData?.blade ?? 0} />
                    <div className="flex">
                      {rawRings?.map((ringItem: { value: string }) => (
                        <RawRing
                          mode={editMode}
                          key={ringItem.value}
                          // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                          value={ringItem.value}
                          blade={localData.blade}
                          /*   rawDivide={rawDivideParse} */
                          // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                          ringItem={ringItem}
                        />
                      ))}
                    </div>

                    <div className="flex gap-1">
                      {!endRingsAltShow
                        ? endRings?.map((ringItem: { value: string }) => (
                            <Ring
                              mode={editMode}
                              key={ringItem.value}
                              value={ringItem.value}
                              edit={false}
                              deleteRing={function (id: string | number): void {
                                throw new Error("Function not implemented.");
                              }}
                              id={""}
                              moveLeft={function (id: string | number): void {
                                throw new Error("Function not implemented.");
                              }}
                              moveRight={function (id: string | number): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          ))
                        : endRingsAlt?.map((ringItem: { value: string }) => (
                            <Ring
                              mode={editMode}
                              key={ringItem.value}
                              value={ringItem.value}
                              edit={false}
                              deleteRing={function (id: string | number): void {
                                throw new Error("Function not implemented.");
                              }}
                              id={""}
                              moveLeft={function (id: string | number): void {
                                throw new Error("Function not implemented.");
                              }}
                              moveRight={function (id: string | number): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          ))}

                      {(endRingsAlt?.length ?? 0) > 0 && (
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
                <div className="text-2xl text-primary">
                  {sessionStatus === "loading" || isLoadingPostoppsett ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    "Ingen data valgt"
                  )}
                </div>
              )}
            </div>
          )}

          <div className="">
            <EditMode editMode={editMode}>
              {openRawDivide && (
                <RawDivideComponent
                  setOpenRawDivide={setOpenRawDivide}
                  rawData={localData?.rawInput}
                  // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
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
                    // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                    values={settings?.ringlist}
                    position="left-20"
                    title="Utfylling foran"
                    onChange={handleRingPickerChange}
                    inputChange={handleRingPickerChangeInput}
                  />
                ) : (
                  <RingPicker
                    // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                    values={settings?.ringlist}
                    position="left-20"
                    title="Utfylling foran Alternativ"
                    onChange={handleRingPickerChangeAlt}
                    inputChange={handleRingPickerChangeInputAlt}
                  />
                )}
              </EditMode>
              <div key={localData?.header} className="mt-60">
                <div className="absolute left-1/2 top-20 mb-20 mt-10 -translate-x-1/2 -translate-y-1/2 transform">
                  <p className="text-primary">
                    Opprinnelig post: {localData?.header}
                  </p>
                  <p className="italic text-primary">
                    Opprettet:{" "}
                    {postId &&
                      dateFormat(localData?.createdAt, "dd.mm.yyyy, MM:HH")}
                  </p>
                  <p className="text-3xl text-primary">
                    {rawRings?.length}x{localData?.plankeTy}-
                    {localData?.prosent}
                    %-{((localData?.blade ?? 0) + 1.4).toFixed(1)}
                    {localData?.spes}
                  </p>
                </div>
                <div className="flex">
                  <div className="flex gap-1">
                    <EditMode editMode={editMode}>
                      <div>
                        <p className="text-primary">
                          Distanse:{" "}
                          {sawTypeSettings
                            ? (
                                calc[sawTypeSettings as keyof typeof calc]
                                  .toMiddle -
                                rawinputSum / 2 -
                                bladeSum / 2 -
                                (localData?.blade ?? 0) / 2
                              ).toFixed(2)
                            : "N/A"}
                        </p>

                        <p className="text-primary">
                          utfylling: {startringSum?.toFixed(2)}
                        </p>
                        <p
                          className={`${
                            Number(differenceStart ?? 0) >= -0.05 &&
                            Number(differenceStart ?? 0) <= 0.05
                              ? "text-green-500"
                              : "text-red-400"
                          }`}
                        >
                          Differanse: {differenceStart}
                        </p>
                        <button
                          onClick={editUtfyllingSwap}
                          className="btn btn-xs bg-accent text-primary hover:bg-neutral"
                        >
                          {startRingsAltShow
                            ? "Vis standard"
                            : "Vis alternativ"}
                        </button>
                      </div>
                    </EditMode>
                    {!startRingsAltShow
                      ? startRings?.map(
                          (ringItem: {
                            id: string | number;
                            value: string;
                          }) => (
                            <Ring
                              edit={true}
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                              deleteRing={deleteStartring}
                              id={ringItem.id}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                              moveLeft={moveLeft}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                              moveRight={moveRight}
                            />
                          ),
                        )
                      : startRingsAlt?.map(
                          (ringItem: { value: string; id: string }) => (
                            <Ring
                              edit={true}
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                              deleteRing={deleteStartringAlt}
                              id={ringItem.id}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                              moveLeft={moveLeft}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                              moveRight={moveRight}
                            />
                          ),
                        )}
                  </div>
                  <Blade blade={localData?.blade ?? 0} />

                  <div className="flex">
                    {rawRings?.map(
                      (ringItem: { value: string; id: string }) => {
                        return (
                          <RawRing
                            edit={true}
                            mode={editMode}
                            key={ringItem.id}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            value={ringItem.value}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            blade={localData?.blade}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            deleteRing={deleteRawInput}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            id={ringItem.id}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            moveLeft={moveLeftRaw}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            moveRight={moveRightRaw}
                            /*   rawDivide={rawDivideParse} */
                            openRawDivideHandler={() =>
                              openRawDivideHandler(
                                ringItem.value as unknown as SetStateAction<undefined>,
                              )
                            }
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                            getRawValues={getRawValues}
                            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle

                            ringItem={ringItem}
                            setRawInputValue={setRawInputValue}
                            rawInputValue={rawInputValue}
                            rawData={localData?.rawInput}
                            localData={localData}
                            setLocalData={setLocalData}
                          />
                        );
                      },
                    )}
                  </div>
                  <div className="flex gap-1">
                    {!endRingsAltShow
                      ? endRings?.map(
                          (ringItem: {
                            id: string | number;
                            value: string;
                          }) => (
                            <Ring
                              edit={true}
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                              deleteRing={deleteEndring}
                              id={ringItem.id}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                              moveLeft={moveLeftEnd}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                              moveRight={moveRightEnd}
                            />
                          ),
                        )
                      : endRingsAlt?.map(
                          (ringItem: {
                            id: string | number;
                            value: string;
                          }) => (
                            <Ring
                              edit={true}
                              mode={editMode}
                              key={ringItem.id}
                              value={ringItem.value}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                              deleteRing={deleteEndringAlt}
                              id={ringItem.id}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                              moveLeft={moveLeftEnd}
                              // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                              moveRight={moveRightEnd}
                            />
                          ),
                        )}
                  </div>
                  <EditMode editMode={editMode}>
                    <div>
                      <p className="text-primary">
                        Distanse:{" "}
                        {sawTypeSettings
                          ? (
                              calc[sawTypeSettings as keyof typeof calc]
                                .middleEnd -
                              rawinputSum / 2 -
                              bladeSum / 2 -
                              (localData?.blade ?? 0) / 2
                            ).toFixed(2)
                          : "N/A"}
                      </p>
                      <p className="text-primary">
                        utfylling: {endringSum?.toFixed(2)}
                      </p>
                      <p
                        className={`${
                          // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                          differenceEnd >= -0.05 && differenceEnd <= 0.05
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        Differanse: {differenceEnd}
                      </p>
                      <button
                        onClick={editUtfyllingSwapEnd}
                        className="btn btn-xs bg-accent text-primary hover:bg-neutral"
                      >
                        {endRingsAltShow ? "Vis standard" : "Vis alternativ"}
                      </button>
                    </div>
                  </EditMode>
                </div>
                <EditMode editMode={editMode}>
                  {!endRingsAltShow ? (
                    <RingPicker
                      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                      values={settings?.ringlist}
                      position="right-20"
                      title="Utfylling bak"
                      onChange={handleEndRingPickerChange}
                      inputChange={handleEndRingPickerChangeInput}
                    />
                  ) : (
                    <RingPicker
                      // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                      values={settings?.ringlist}
                      position="right-20"
                      title="Utfylling bak alternativ"
                      onChange={handleEndRingPickerChangeAlt}
                      inputChange={handleEndRingPickerChangeInputAlt}
                    />
                  )}
                </EditMode>
              </div>
            </EditMode>
          </div>
          <EditMode editMode={editMode}>
            <div className="mb-40 mt-20 flex flex-col rounded-xl border border-primary p-3">
              <form
                className="mb-5"
                action=""
                // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                type="submit"
                onSubmit={(e) => {
                  e.preventDefault();
                  // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
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
              <label>Prosent</label>
              <select
                className="mb-5 h-full rounded-md border-0 bg-neutral py-0 pl-2 pr-7 text-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                onChange={prosentSelectHandler}
                value={localData?.prosent}
              >
                <option className="option" value="#" selected disabled hidden>
                  Velg prosent
                </option>
                <option className="option" value="18">
                  18
                </option>
                <option className="option" value="12">
                  12
                </option>
                <option className="option" value="18/12">
                  18/12
                </option>
                <option className="option" value="12/12">
                  12/18
                </option>
              </select>

              <BladeSelector
                // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                sawbladeSelectHandler={sawbladeSelectHandler}
                // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
                val={localData?.blade}
              />
              <div>
                <label>Legg til tekst i parantes</label>
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
            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
            clickSearch={clickSearch}
            kundeID={kundeID}
            // @ts-expect-error: Ignorerer denne feilen fordi den er irrelevant for vår brukstilfelle
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
