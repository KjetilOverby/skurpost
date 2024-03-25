/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import InputListComponent from "./InputListComponent";
import SkurlisteComponent from "../postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "../postoppsett/reusable/SkurlistePakkingComponent";
import SkurlisteComponentInput from "./SkurlisteComponentInput";
import SkurlistePakkingInput from "./SkurlistePakkingInput";
import { api } from "~/utils/api";

const ListcreatorMain = ({ skurliste, bufferStatus, setBufferStatus }) => {
  const [maxOrder, setMaxOrder] = useState(1);

  useEffect(() => {
    if (skurliste && skurliste.length > 0) {
      const max = Math.max(...skurliste.map((item) => item.order));
      setMaxOrder(max + 1);
    } else {
      setMaxOrder(1);
    }
  }, [skurliste]);
  const ctx = api.useContext();

  const deletePost = api.skurliste.delete.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
    },
  });

  const editPost = api.skurliste.update.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
    },
  });

  useEffect(() => {
    setListProps((prevProps) => ({ ...prevProps, order: maxOrder }));
  }, [maxOrder]);

  const [listProps, setListProps] = useState({
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
    createdAt: new Date(),
    updatedAt: new Date(),
    buffer: false,
    order: maxOrder,
  });

  const updateItemOrder = api.skurliste.updateOrder.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
    },
  });
  const updateBuffer = api.skurliste.updateBuffer.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
    },
  });

  const updateBufferHandler = (id) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateBuffer.mutateAsync({
      id: id,
      buffer: true,
    });
  };
  const updateBufferHandlerFalse = (id) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateBuffer.mutateAsync({
      id: id,
      buffer: false,
    });
  };

  const updates = (id, order) => {
    console.log(`Updating item with id ${id} to order ${order}`);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateItemOrder.mutateAsync({
      id: id,
      order: order,
    });
  };
  const [listItems, setListItems] = useState([]);
  const moveUp = async (id) => {
    console.log(`moveUp called with id ${id}`);

    const index = listItems.findIndex((item) => item.id === id);
    console.log(`Index of item with id ${id} is ${index}`);
    if (index > 0) {
      const newItems = [...listItems];
      const tempOrder = newItems[index].order;
      newItems[index].order = newItems[index - 1].order;
      newItems[index - 1].order = tempOrder;

      // Update the listItems state
      setListItems(newItems);

      // Update the order in the database
      await Promise.all([
        updates(newItems[index].id, newItems[index].order),
        updates(newItems[index - 1].id, newItems[index - 1].order),
      ]);
    }
  };
  const moveDown = async (id) => {
    const index = listItems.findIndex((item) => item.id === id);
    console.log(`Index of item with id ${id} is ${index}`);
    if (index < listItems.length - 1) {
      const newItems = [...listItems];
      const tempOrder = newItems[index].order;
      newItems[index].order = newItems[index + 1].order;
      newItems[index + 1].order = tempOrder;

      // Update the listItems state
      setListItems(newItems);

      // Update the order in the database
      await Promise.all([
        updates(newItems[index].id, newItems[index].order),
        updates(newItems[index + 1].id, newItems[index + 1].order),
      ]);
    }
  };

  useEffect(() => {
    setListItems(skurliste);
  }, [skurliste]);
  return (
    <div className="bg-base-100 pb-20">
      <div>
        <h1>Skurplan</h1>
        <SkurlisteComponentInput list={listProps} />
      </div>
      <div className="mb-5">
        <h1 className="mt-5">Pakking</h1>
        <SkurlistePakkingInput list={listProps} />
      </div>
      <div className="border bg-cyan-600 p-4">
        <h1 className="text-cyan-200">Legg til verdier i listen.</h1>
        <InputListComponent listProps={listProps} setListProps={setListProps} />
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
          />
        </div>
        <div>
          <h1>Pakking</h1>
          <SkurlistePakkingComponent skurliste={skurliste} />
        </div>
      </div>
    </div>
  );
};

export default ListcreatorMain;
