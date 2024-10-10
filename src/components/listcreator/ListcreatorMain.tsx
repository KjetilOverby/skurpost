/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import InputListComponent from "./InputListComponent";
import SkurlisteComponent from "../postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "../postoppsett/reusable/SkurlistePakkingComponent";
import SkurlisteComponentInput from "./SkurlisteComponentInput";
import SkurlistePakkingInput from "./SkurlistePakkingInput";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import SkurlisteComponentMove from "./SkrurlisteComponentMove";
import MyListComponent from "../listcreator/ReorderComponent";

interface SkurlisteItem {
  id: string;
  order: number;
  treslag: string;
  klGrense: string;
  klType: string;
  klasse: string;
  postNr: string;
  antall: number;
  m3: number;
  status: string;
  post: string;
  bredde: number;
  xLog: string;
  prosent: string;
  anm: string;
  anm2: string;
  VS66Blad: number;
  vs66: string;
  vs66Br: string;
  mkvBord: string;
  mkvBordBr: string;
  dimensjon: string;
  sortering: string;
  kode: string;
  torke: string;
  anmerk: string;
  destinasjon: string;
  text: string;
  blad: number;
  progress: string;
  createdAt: Date;
  updatedAt: Date;
  buffer: boolean;
}

interface ListcreatorMainProps {
  skurliste: SkurlisteItem[]; // Use the defined interface
  bufferStatus: boolean;
  setBufferStatus: (status: boolean) => void;
  colorMode: string;
  settings: {
    visPakking: boolean;
  };
}

const ListcreatorMain: React.FC<ListcreatorMainProps> = ({
  skurliste,
  bufferStatus,
  setBufferStatus,
  settings,
}) => {
  const { data: user } = api.users.getUsers.useQuery();

  const [localList, setLocalList] = useState();

  const [maxOrder, setMaxOrder] = useState(1);
  const { data: sessionData } = useSession();

  const [kundeID, setKundeID] = useState<string>("");
  const currentUserId = sessionData?.user?.id;

  useEffect(() => {
    if (skurliste && skurliste.length > 0) {
      const max = Math.max(...skurliste.map((item) => item.order));
      setMaxOrder(max + 1);
    } else {
      setMaxOrder(1);
    }
  }, [skurliste]);
  const ctx = api.useContext();

  useEffect(() => {
    if (skurliste) {
      setLocalList(skurliste);
    }
  }, [skurliste]);

  const deletePost = api.skurliste.delete.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
      toast.success("Post slettet");
    },
  });

  const editPost = api.skurliste.update.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
      toast.success("Post oppdatert");
    },
  });

  useEffect(() => {
    setListProps((prevProps) => ({ ...prevProps, order: maxOrder }));
  }, [maxOrder]);

  useEffect(() => {
    if (user && user.length > 0 && currentUserId) {
      const currentUser = user.find((use) => use.id === currentUserId);

      if (currentUser) {
        if (currentUser.role === "MV_ADMIN") {
          setKundeID("MV");
        } else if (currentUser.role === "VS_ADMIN") {
          setKundeID("VS");
        }
      }
    }
  }, [user, currentUserId]);

  const [listProps, setListProps] = useState<SkurlisteItem>({
    id: "", // Add the id property here
    treslag: "",
    klGrense: "",
    klType: "",
    klasse: "",
    postNr: "",
    antall: 0,
    m3: 0,
    status: "",
    post: "",
    bredde: 0,
    xLog: "",
    prosent: "",
    anm: "",
    anm2: "",
    VS66Blad: 5,
    vs66: "",
    vs66Br: "",
    mkvBord: "",
    mkvBordBr: "",
    dimensjon: "",
    sortering: "",
    kode: "",
    torke: "",
    anmerk: "",
    destinasjon: "",
    text: "",
    blad: 0,
    progress: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    buffer: false,
    order: maxOrder,
  });

  useEffect(() => {
    setListProps((prevProps) => ({ ...prevProps, kunde: kundeID || "" }));
  }, [kundeID, skurliste]);

  const updateItemOrder = api.skurliste.updateOrders.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
    },
  });
  const updateBuffer = api.skurliste.updateBuffer.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
      toast.success("Lagt til/fra buffer.");
    },
  });
  const updateOrder = api.skurliste.updateOrders.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
      toast.success("Orders updated");
    },
  });

  const updateBufferHandler = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateBuffer.mutateAsync({
      id: id,
      buffer: true,
    });
  };
  const updateBufferHandlerFalse = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateBuffer.mutateAsync({
      id: id,
      buffer: false,
    });
  };

  const updates = (id: string, order: number) => {
    console.log(`Updating item with id ${id} to order ${order}`);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateItemOrder.mutateAsync({
      id: id,
      order: order,
    });
  };

  const [listItems, setListItems] = useState<SkurlisteItem[]>([]);

  const moveUp = async (id: string) => {
    const index = listItems.findIndex((item) => item.id === id);

    if (index > 0) {
      const newItems = [...listItems];

      // Bytt rekkefølge
      const tempOrder = newItems[index].order;
      newItems[index].order = newItems[index - 1].order;
      newItems[index - 1].order = tempOrder;

      // Oppdater den lokale listen for UI
      setListItems(newItems);

      try {
        // Oppdater rekkefølge i databasen
        await updateOrder.mutateAsync([
          { id: newItems[index].id, order: newItems[index].order },
          { id: newItems[index - 1].id, order: newItems[index - 1].order },
        ]);

        // Oppdater rekkefølge for alle elementene
        await updateAllOrders();
      } catch (error) {
        console.error("Error updating database", error);
        // Tilbakestill til den opprinnelige tilstanden hvis det er en feil
        setListItems(listItems);
      }
    }
  };

  const moveDown = async (id: string) => {
    const index = listItems.findIndex((item) => item.id === id);

    if (index < listItems.length - 1) {
      const newItems = [...listItems];

      // Bytt rekkefølge
      const tempOrder = newItems[index].order;
      newItems[index].order = newItems[index + 1].order;
      newItems[index + 1].order = tempOrder;

      // Oppdater den lokale listen for UI
      setListItems(newItems);

      try {
        // Oppdater rekkefølge i databasen
        await updateOrder.mutateAsync([
          { id: newItems[index].id, order: newItems[index].order },
          { id: newItems[index + 1].id, order: newItems[index + 1].order },
        ]);

        // Oppdater rekkefølge for alle elementene
        await updateAllOrders();
      } catch (error) {
        console.error("Error updating database", error);
        // Tilbakestill til den opprinnelige tilstanden hvis det er en feil
        setListItems(listItems);
      }
    }
  };

  // Funksjon for å oppdatere `order`-verdier for alle elementene
  const updateAllOrders = async (updatedItems) => {
    const ordersToUpdate = updatedItems.map((item, index) => ({
      id: item.id,
      order: index, // Sekvensiell verdi basert på index
    }));

    try {
      await updateOrders.mutateAsync(ordersToUpdate); // Endret fra updateOrder til updateOrders
    } catch (error) {
      console.error("Error updating all orders in database", error);
    }
  };

  // Funksjon for å tilbakestille `order`-verdier
  const resetOrderValues = async () => {
    const updatedItems = listItems.map((item, index) => ({
      id: item.id,
      order: index, // Sett ordren til sekvensiell verdi
    }));

    // Oppdater rekkefølge i databasen
    await Promise.all(
      updatedItems.map(({ id, order }) =>
        updateOrder.mutateAsync({ id, order }),
      ),
    );

    // Oppdater listen i UI
    setListItems(updatedItems);
  };

  useEffect(() => {
    setListItems(skurliste);
  }, [skurliste]);

  const saveOrderToDatabase = async () => {
    try {
      const updatedOrdersNow = localList.map((item, index) => ({
        id: item.id,
        order: index, // Setter order til index
      }));

      // Kaller updateOrder mutasjonen
      await updateOrder.mutateAsync(updatedOrdersNow);

      toast.success("Orders updated successfully!");
    } catch (error) {
      console.error("Error saving orders:", error);
      toast.error("Error saving orders.");
    }
  };

  return (
    <div className="bg-base-100 pb-20">
      <div>
        <h1>Skurplan</h1>
        <SkurlisteComponentInput list={listProps} />
      </div>
      {settings?.visPakking && (
        <div className="mb-5">
          <h1 className="mt-5">Pakking</h1>
          <SkurlistePakkingInput list={listProps} />
        </div>
      )}
      <div className="border border-accent bg-secondary p-4">
        <h1 className="text-neutral">Legg til verdier i listen.</h1>
        <InputListComponent
          listProps={listProps}
          setListProps={setListProps}
          settings={settings}
        />
      </div>
      <div className="bg-base-100 pt-20">
        <div className="mb-10">
          <SkurlisteComponent
            skurliste={skurliste}
            edit={true}
            deletePost={deletePost}
            editPost={editPost}
            listProps={listProps}
            setListProps={setListProps}
            moveUp={moveUp}
            moveDown={moveDown}
            maxOrder={maxOrder}
            updateBufferHandler={updateBufferHandler}
            setBufferStatus={setBufferStatus}
            bufferStatus={bufferStatus}
            updateBufferHandlerFalse={updateBufferHandlerFalse}
            setSearchInput={undefined}
            setClickSearchOpen={undefined}
            setPostInfoWrite={undefined}
            searchInputAll={false}
          />
        </div>
        {settings?.visPakking && (
          <div>
            <h1>Pakking</h1>
            <SkurlistePakkingComponent skurliste={skurliste} />
          </div>
        )}
      </div>

      <div>
        <MyListComponent
          localList={localList}
          setLocalList={setLocalList}
          updateOrder={saveOrderToDatabase}
        />
      </div>
    </div>
  );
};

export default ListcreatorMain;
