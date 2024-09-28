import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { PostInfoContext } from "../components/context";

import "~/styles/globals.css";
import { useState, useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [postId, setPostId] = useState("");
  const [colorMode, setColorMode] = useState<string | undefined>(undefined);
  const [postInfoWriteChange, setPostInfoWriteChange] = useState("");
  const [postInfoWrite, setPostInfoWrite] = useState("");
  const [searchInputAll, setSearchInputAll] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [sawType, setSawType] = useState<string>("");

  interface UserInfo {
    id: string;
    // Add other properties if needed
  }

  const [getUserInfo, setGetUserInfo] = useState<UserInfo | undefined>(
    undefined,
  );
  const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    userId: getUserInfo?.id ?? "",
  });

  useEffect(() => {
    setColorMode(posts?.theme);
  }, [posts]);

  console.log(sawType);

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
          sawType,
          setSawType,
          setGetUserInfo: (info) =>
            setGetUserInfo(info as UserInfo | undefined),
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
