import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { PostInfoContext } from "../components/context";

import "~/styles/globals.css";
import { useState, useEffect } from "react";
import { get } from "http";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [postId, setPostId] = useState("");
  const [colorMode, setColorMode] = useState();
  const [postInfoWriteChange, setPostInfoWriteChange] = useState("");
  const [postInfoWrite, setPostInfoWrite] = useState("");
  const [searchInputAll, setSearchInputAll] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [getUserInfo, setGetUserInfo] = useState();
  const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    user: getUserInfo?.name,
    userId: getUserInfo?.id,
  });

  useEffect(() => {
    setColorMode(posts?.theme);
  }, [posts]);

  console.log(getUserInfo);

  return (
    <SessionProvider session={session}>
      <PostInfoContext.Provider
        value={{
          postInfoWriteChange,
          setPostInfoWriteChange,
          postInfoWrite,
          setPostInfoWrite,
          searchInputAll,
          setSearchInputAll,
          editMode,
          setEditMode,
          setGetUserInfo,
        }}
      >
        <Component
          {...pageProps}
          postId={postId}
          setPostId={setPostId}
          colorMode={colorMode}
        />
      </PostInfoContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
