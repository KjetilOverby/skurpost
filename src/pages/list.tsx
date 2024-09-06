// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { SearchResultComponent } from "~/components/postoppsett/reusable/SearchResultComponent";
import SkurlisteComponent from "~/components/postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "~/components/postoppsett/reusable/SkurlistePakkingComponent";
import { api } from "~/utils/api";
import { useContext } from "react";
import { PostInfoContext } from "../components/context";
import { set } from "zod";

const list = ({ setPostId, colorMode }) => {
  const { data: users } = api.users.getUsers.useQuery({});
  const [kundeID, setKundeID] = useState();
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: false,
    kunde: kundeID,
  });
  const context = useContext(PostInfoContext);
  if (!context) {
    throw new Error();
  }
  const {
    postInfoWriteChange,
    setPostInfoWriteChange,
    postInfoWrite,
    setPostInfoWrite,
    setSearchInputAll,
    searchInputAll,
  } = context;

  useEffect(() => {
    users?.forEach((user) => {
      if (user.role === "MV_ADMIN") {
        setKundeID("MV");
      } else if (user.role === "VS_ADMIN") {
        setKundeID("VS");
      }
    });
  }, [users]);

  const [searchInput, setSearchInput] = useState("");

  const [clickSearchOpen, setClickSearchOpen] = useState(false);

  const { data: posts } = api.postoppsett.getByHeader.useQuery({
    header: searchInput,
    kundeID: kundeID,
  });

  const clickSearchAll = () => {
    setSearchInputAll(true);
  };

  return (
    <div>
      <HeaderComponent colorMode={colorMode} />
      {clickSearchOpen && (
        <SearchResultComponent
          results={posts}
          setPostId={setPostId}
          setClickSearchOpen={setClickSearchOpen}
          setSearchInputAll={setSearchInputAll}
          setPostInfoWriteChange={setPostInfoWriteChange}
          postInfoWrite={postInfoWrite}
          clickSearchAll={clickSearchAll}
        />
      )}
      <div data-theme={colorMode} className="min-h-screen px-5 xl:px-96">
        <h1 className="py-10 text-xl">Skurplan</h1>
        <SkurlisteComponent
          skurliste={skurliste}
          edit={false}
          setSearchInput={setSearchInput}
          searchInputAll={searchInputAll}
          setPostId={setPostId}
          setClickSearchOpen={setClickSearchOpen}
          setPostInfoWrite={setPostInfoWrite}
        />
        <h1 className="mb-3 mt-10 text-xl">Pakking</h1>
        <SkurlistePakkingComponent skurliste={skurliste} edit={false} />
      </div>
    </div>
  );
};

export default list;
