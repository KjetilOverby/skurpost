/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useContext } from "react";
import { PostInfoContext } from "~/components/context";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { api } from "~/utils/api";

const Listcreator = ({ colorMode }: { colorMode: string }) => {
  const { data: users } = api.users.getUsers.useQuery();
  const context = useContext(PostInfoContext);
  const [kundeID, setKundeID] = useState("");
  const { data: sessionData } = useSession();

  const { setGetUserInfo } = context;
  useEffect(() => {
    setGetUserInfo(sessionData && sessionData.user);
  }, [sessionData, setGetUserInfo]);
  useEffect(() => {
    if (users && users.length > 0) {
      const firstUser = users[0];
      if (firstUser && firstUser.role === "MV_ADMIN") {
        setKundeID("MV");
      } else if (firstUser && firstUser.role === "VS_ADMIN") {
        setKundeID("VS");
      }
    }
  }, [users]);
  const [bufferStatus, setBufferStatus] = useState(false);
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: bufferStatus,
    kunde: kundeID,
  });
  return (
    <div data-theme={colorMode} className="min-h-screen bg-base-100">
      <HeaderComponent colorMode={colorMode} />
      <div className="min-h-screen px-5 pt-20 xl:px-96">
        <ListcreatorMain
          skurliste={skurliste ?? []}
          setBufferStatus={setBufferStatus}
          bufferStatus={bufferStatus}
          colorMode={colorMode}
        />
      </div>
    </div>
  );
};

export default Listcreator;
