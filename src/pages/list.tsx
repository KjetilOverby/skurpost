// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { SearchResultComponent } from "~/components/postoppsett/reusable/SearchResultComponent";
import SkurlisteComponent from "~/components/postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "~/components/postoppsett/reusable/SkurlistePakkingComponent";
import { api } from "~/utils/api";

const list = () => {
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: false,
  });

  const [searchInput, setSearchInput] = useState("");

  const {
    data: posts,
    error,
    isLoading,
  } = api.postoppsett.getByHeader.useQuery({ header: searchInput });

  console.log(searchInput);

  return (
    <div>
      <HeaderComponent />
      <SearchResultComponent results={posts} />
      <div data-theme="lightmode" className="min-h-screen px-5 xl:px-96">
        <h1 className="py-10 text-xl">Skurplan</h1>
        <SkurlisteComponent
          skurliste={skurliste}
          edit={false}
          setSearchInput={setSearchInput}
        />
        <h1 className="mb-3 mt-10 text-xl">Pakking</h1>
        <SkurlistePakkingComponent skurliste={skurliste} edit={false} />
      </div>
    </div>
  );
};

export default list;
