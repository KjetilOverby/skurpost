/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import InputListComponent from "./InputListComponent";
import SkurlisteComponent from "../postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "../postoppsett/reusable/SkurlistePakkingComponent";

const ListcreatorMain = ({ skurliste }) => {
  return (
    <div className="bg-primary">
      <InputListComponent />
      <div className="bg-base-100 pt-20">
        <div className="mb-10">
          <h1>Skurplan</h1>
          <SkurlisteComponent skurliste={skurliste} />
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
