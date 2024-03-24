/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import InputListComponent from "./InputListComponent";
import SkurlisteComponent from "../postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "../postoppsett/reusable/SkurlistePakkingComponent";
import SkurlisteComponentInput from "./SkurlisteComponentInput";
import SkurlistePakkingInput from "./SkurlistePakkingInput";
import { api } from "~/utils/api";

const ListcreatorMain = ({ skurliste }) => {
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
  });
  return (
    <div className="bg-base-100">
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
          <h1>Skurplan</h1>
          <SkurlisteComponent
            skurliste={skurliste}
            edit={true}
            deletePost={deletePost}
            editPost={editPost}
            listProps={listProps}
            setListProps={setListProps}
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
