import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { PostInfoContext } from "../components/context";

import "~/styles/globals.css";
import { useState, useEffect } from "react";
import { set } from "zod";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    user: "Kjetil Øverby",
    userId: "cm0tmerie0000anrhu5k7tz6u",
  });
  const [postId, setPostId] = useState("");
  const [colorMode, setColorMode] = useState();
  const [postInfoWriteChange, setPostInfoWriteChange] = useState("");
  const [postInfoWrite, setPostInfoWrite] = useState("");
  const [searchInputAll, setSearchInputAll] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setColorMode(posts?.theme);
  }, [posts]);

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
