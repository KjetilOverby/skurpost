// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import SkurlisteComponent from "~/components/postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "~/components/postoppsett/reusable/SkurlistePakkingComponent";
import { api } from "~/utils/api";

const list = () => {
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: false,
  });

  return (
    <div>
      <HeaderComponent />
      <div data-theme="lightmode" className="min-h-screen lg:px-96">
        <h1 className="py-10 text-xl">Skurplan</h1>
        <SkurlisteComponent skurliste={skurliste} edit={false} />
        <h1 className="mb-3 mt-10 text-xl">Pakking</h1>
        <SkurlistePakkingComponent skurliste={skurliste} edit={false} />
      </div>
    </div>
  );
};

export default list;
