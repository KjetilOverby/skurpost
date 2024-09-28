import React, { useContext, useState, useEffect } from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import ColorTheme from "~/components/innstillinger/ColorTheme";
import { api } from "~/utils/api";
import ShowSelector from "~/components/innstillinger/ShowSelector";
import AccountComponent from "~/components/innstillinger/AccountComponent";
import { signIn, signOut, useSession } from "next-auth/react";
import { PostInfoContext } from "~/components/context";
import SawTypeChoose from "~/components/innstillinger/SawTypeChoose";

interface InnstillingerProps {
  colorMode: string;
}

const Innstillinger: React.FC<InnstillingerProps> = ({ colorMode }) => {
  const context = useContext(PostInfoContext);
  const { data: sessionData } = useSession();

  const [currentTheme, setCurrentTheme] = useState("");
  const [currentSawType, setCurrentSawType] = useState("");

  const { setSawType, setGetUserInfo } = context ?? {};

  useEffect(() => {
    if (setGetUserInfo) {
      setGetUserInfo(sessionData && sessionData.user);
    }
  }, [sessionData]);

  const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    userId: sessionData?.user.id ?? "",
  });

  const ctx = api.useContext();
  useEffect(() => {
    if (posts) {
      void ctx.settings.getByUser.invalidate();
    }
  }, [currentTheme, colorMode]);

  const updateTheme = api.settings.updateTheme.useMutation({
    onSuccess: (data) => {
      setCurrentTheme(data.theme);
      void ctx.settings.getByUser.invalidate();
    },
  });
  const updateSawType = api.settings.updateSawType.useMutation({
    onSuccess: (data) => {
      setCurrentSawType(data.theme);
      void ctx.settings.getByUser.invalidate();
    },
  });

  const handleUpdateTheme = async (newTheme: string) => {
    try {
      const userId = "user-id";
      const response = await updateTheme.mutateAsync({
        userId: sessionData?.user.id ?? "",
        theme: newTheme,
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };
  const handleUpdateSawType = async (newType: string) => {
    try {
      const userId = "user-id";
      const response = await updateSawType.mutateAsync({
        userId: sessionData?.user.id ?? "",
        sawType: newType,
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return (
    <div data-theme={colorMode} className="min-h-screen bg-base-100">
      <HeaderComponent colorMode={colorMode} />
      <div className="mx-[30%] mt-5">
        <h1 className="my-20 text-2xl text-primary">Innstillinger</h1>
        <AccountComponent />
        <ColorTheme
          update={handleUpdateTheme}
          theme={posts?.theme ?? "default-theme"}
        />
        <ShowSelector
          update={(toggles) => {
            console.log(toggles);
          }}
        />
        <SawTypeChoose
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          setSawType={setSawType ?? (() => {})}
          update={handleUpdateSawType}
          type={posts?.sawType ?? "default-theme"}
        />
      </div>
    </div>
  );
};

export default Innstillinger;
