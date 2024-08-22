import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [postId, setPostId] = useState("");
  const [colorMode, setColorMode] = useState("darkmode");
  return (
    <SessionProvider session={session}>
      <Component
        {...pageProps}
        postId={postId}
        setPostId={setPostId}
        colorMode={colorMode}
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
