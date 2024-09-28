/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { SearchResultComponent } from "~/components/postoppsett/reusable/SearchResultComponent";
import SkurlisteComponent from "~/components/postoppsett/reusable/SkurlisteComponent";
import SkurlistePakkingComponent from "~/components/postoppsett/reusable/SkurlistePakkingComponent";
import { api } from "~/utils/api";
import { useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { PostInfoContext } from "~/components/context";

interface ListProps {
  setPostId: (id: string) => void;
  colorMode: string;
}

const List: React.FC<ListProps> = ({ setPostId, colorMode }) => {
  const { data: sessionData } = useSession();
  const { data: user } = api.users.getUser.useQuery({
    id: sessionData?.user.id ?? "",
  });
  const [kundeID, setKundeID] = useState<string | undefined>(undefined);
  const [openManualSearch, setOpenManualSearch] = useState(false);
  const currentUserId = sessionData?.user?.id;
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: false,
    kunde: kundeID ?? "",
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
    setGetUserInfo,
  } = context;

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
    setGetUserInfo(sessionData && sessionData.user);
  }, [sessionData, setGetUserInfo]);

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

  const [searchInput, setSearchInput] = useState("");

  const [clickSearchOpen, setClickSearchOpen] = useState(false);

  const { data: posts } = api.postoppsett.getByHeader.useQuery({
    header: searchInput,
    kundeID: kundeID ?? "",
    sawType: settings?.sawType ?? "",
  });

  const clickSearchAll = () => {
    setSearchInputAll(true);
  };

  return (
    <div>
      <HeaderComponent colorMode={colorMode} />
      {clickSearchOpen && (
        <SearchResultComponent
          results={posts ?? []}
          setPostId={setPostId}
          setClickSearchOpen={setClickSearchOpen}
          setSearchInputAll={setSearchInputAll}
          setPostInfoWriteChange={setPostInfoWriteChange}
          postInfoWrite={postInfoWrite}
          clickSearchAll={clickSearchAll}
          colorMode={colorMode}
        />
      )}
      <div data-theme={colorMode} className="min-h-screen px-5 xl:px-96">
        <button
          onClick={() => setOpenManualSearch(!openManualSearch)}
          className="btn mt-5 bg-accent"
        >
          {`${openManualSearch ? "Lukk søk" : "Søk"}`}
        </button>
        {openManualSearch && (
          <div>
            <input
              type="text"
              placeholder="Søk etter post"
              className="input"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              onClick={() => setClickSearchOpen(true)}
              className="btn mt-5 bg-accent text-primary"
            >
              Søk
            </button>
          </div>
        )}
        <h1 className="py-10 text-xl">Skurplan</h1>
        <SkurlisteComponent
          skurliste={skurliste ?? []}
          edit={false}
          setSearchInput={setSearchInput}
          searchInputAll={searchInputAll}
          setClickSearchOpen={setClickSearchOpen}
          setPostInfoWrite={setPostInfoWrite}
        />
        <h1 className="mb-3 mt-10 text-xl">Pakking</h1>
        <SkurlistePakkingComponent skurliste={skurliste ?? []} />
      </div>
    </div>
  );
};

export default List;
