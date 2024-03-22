import React from "react";
import SkurlisteComponent from "~/components/postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "~/components/postoppsett/reusable/SkurlistePakkingComponent";
import { api } from "~/utils/api";

const list = () => {
  const { data: skurliste } = api.skurliste.getAll.useQuery();

  return (
    <div data-theme="lightmode" className="min-h-screen lg:px-96">
      <h1 className="py-10 text-xl">Skurplan</h1>
      <SkurlisteComponent skurliste={skurliste} />
      <h1 className="mb-3 mt-10 text-xl">Pakking</h1>
      <SkurlistePakkingComponent skurliste={skurliste} />
    </div>
  );
};

export default list;
