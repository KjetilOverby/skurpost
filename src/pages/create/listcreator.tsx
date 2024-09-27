import { useSession } from "next-auth/react";
import React, { useState, useEffect, useContext } from "react";
import { PostInfoContext } from "~/components/context";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { api } from "~/utils/api";

const Listcreator = ({ colorMode }: { colorMode: string }) => {
  const { data: sessionData } = useSession();
  const { data: users } = api.users.getUsers.useQuery();
  const context = useContext(PostInfoContext);
  const [kundeID, setKundeID] = useState("");
  const currentUserId = sessionData?.user?.id;

  const { setGetUserInfo } = context ?? {};
  useEffect(() => {
    if (setGetUserInfo) {
      setGetUserInfo(sessionData && sessionData.user);
    }
  }, [sessionData, setGetUserInfo]);

  useEffect(() => {
    if (users && users.length > 0 && currentUserId) {
      const currentUser = users.find((user) => user.id === currentUserId);

      if (currentUser) {
        if (currentUser.role === "MV_ADMIN") {
          setKundeID("MV");
        } else if (currentUser.role === "VS_ADMIN") {
          setKundeID("VS");
        }
      }
    }
  }, [users, currentUserId]);

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
