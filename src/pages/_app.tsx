import { type Session } from "next-auth";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { type AppType } from "next/app";
import { PostInfoContext } from "../components/context";
import { Toaster } from "sonner";

import "~/styles/globals.css";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

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
  const [searchInput, setSearchInput] = useState("");

  interface UserInfo {
    id: string;
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

  return (
    <SessionProvider session={session}>
      <AuthWrapper>
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
            searchInput,
            setSearchInput,
            postId,
            setPostId,
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
          <Toaster position="top-left" richColors />
        </PostInfoContext.Provider>
      </AuthWrapper>
    </SessionProvider>
  );
};

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading authentication status...</p>; // Vise en lasteskjerm mens status sjekkes
  }

  if (status === "unauthenticated") {
    return (
      <div className="grid h-screen place-items-center">
        <div>
          <p>Du er ikke innlogget.</p>
          <button className="btn btn-primary" onClick={() => signIn()}>
            Log in
          </button>{" "}
        </div>
      </div>
    );
    // Vis en melding hvis brukeren ikke er logget inn
  }

  return <>{children}</>; // Når autentisert, render barna (innholdet)
};

export default api.withTRPC(MyApp);
