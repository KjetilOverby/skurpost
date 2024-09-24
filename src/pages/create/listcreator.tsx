/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useContext } from "react";
import { PostInfoContext } from "~/components/context";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { api } from "~/utils/api";

const listcreator = ({ colorMode }: { colorMode: string }) => {
  const { data: users } = api.users.getUsers.useQuery({});
  const context = useContext(PostInfoContext);
  const [kundeID, setKundeID] = useState("");
  const { data: sessionData } = useSession();
  const { setGetUserInfo } = context;
  useEffect(() => {
    setGetUserInfo(sessionData && sessionData.user);
  }, [sessionData, setGetUserInfo]);
  useEffect(() => {
    users?.forEach((user) => {
      if (user.role === "MV_ADMIN") {
        setKundeID("MV");
      } else if (user.role === "VS_ADMIN") {
        setKundeID("VS");
      }
    });
  }, [users]);
  const [bufferStatus, setBufferStatus] = useState(false);
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: bufferStatus,
    kunde: kundeID,
  });
  return (
    <div data-theme={colorMode} className="min-h-screen bg-base-100">
      <HeaderComponent />
      <div className="min-h-screen px-5 pt-20 xl:px-96">
        <ListcreatorMain
          skurliste={skurliste}
          setBufferStatus={setBufferStatus}
          bufferStatus={bufferStatus}
          colorMode={colorMode}
        />
      </div>
    </div>
  );
};

export default listcreator;
