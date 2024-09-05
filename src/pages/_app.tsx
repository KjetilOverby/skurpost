import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { PostInfoContext } from "../components/context";

import "~/styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [postId, setPostId] = useState("");
  const [colorMode, setColorMode] = useState("darkmode");
  const [postInfoWriteChange, setPostInfoWriteChange] = useState("");
  return (
    <SessionProvider session={session}>
      <PostInfoContext.Provider
        value={{ postInfoWriteChange, setPostInfoWriteChange }}
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
