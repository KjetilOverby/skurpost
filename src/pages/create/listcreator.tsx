import React from "react";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import { api } from "~/utils/api";

const listcreator = () => {
  const { data: skurliste } = api.skurliste.getAll.useQuery();
  return (
    <div data-theme="lightmode" className="min-h-screen pt-20 lg:px-96">
      <ListcreatorMain skurliste={skurliste} />
    </div>
  );
};

export default listcreator;
