import { count } from "console";
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

  const [bufferStatus, setBufferStatus] = useState(false);
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: bufferStatus,
    kunde: kundeID,
  });

  const { data: count } = api.skurliste.countBuffer.useQuery({
    kunde: kundeID,
  });

  return (
    <div data-theme={colorMode} className="min-h-screen bg-base-100">
      <HeaderComponent colorMode={colorMode} />
      <div className="min-h-screen px-5 pt-20 xl:px-20">
        <ListcreatorMain
          skurliste={skurliste ?? []}
          setBufferStatus={setBufferStatus}
          bufferStatus={bufferStatus}
          colorMode={colorMode}
          countBuffer={count?.true ?? 0}
          countList={count?.false ?? 0}
          settings={
            settings
              ? { visPakking: settings.visPakking }
              : { visPakking: false }
          }
        />
      </div>
    </div>
  );
};

export default Listcreator;
