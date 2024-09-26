import React, { useContext, useState, useEffect } from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import ColorTheme from "~/components/innstillinger/ColorTheme";
import { api } from "~/utils/api";
import ShowSelector from "~/components/innstillinger/ShowSelector";
import AccountComponent from "~/components/innstillinger/AccountComponent";
import { signIn, signOut, useSession } from "next-auth/react";
import { PostInfoContext } from "~/components/context";

interface InnstillingerProps {
  colorMode: string;
}

const Innstillinger: React.FC<InnstillingerProps> = ({ colorMode }) => {
  const context = useContext(PostInfoContext);
  const { data: sessionData } = useSession();

  const setGetUserInfo = context?.setGetUserInfo;
  const [currentTheme, setCurrentTheme] = useState(""); // Add state for theme

  useEffect(() => {
    if (setGetUserInfo) {
      setGetUserInfo(sessionData && sessionData.user);
    }
  }, [sessionData]);

  /*   const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    userId: users[1]?.id,
  }); */
  const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    userId: sessionData?.user.id || "",
  });

  const ctx = api.useContext();
  useEffect(() => {
    if (posts) {
      void ctx.settings.getByUser.invalidate();
    }
  }, [currentTheme, colorMode]);

  const createSettings = api.settings.createPost.useMutation({
    onSuccess: () => {
      void ctx.settings.getByUser.invalidate();
    },
  });

  const updateTheme = api.settings.updateTheme.useMutation({
    onSuccess: (data) => {
      setCurrentTheme(data.theme);
      void ctx.settings.getByUser.invalidate();
    },
  });

  const handleUpdateTheme = async (newTheme: string) => {
    try {
      const userId = "user-id"; // Replace with actual user ID
      const response = await updateTheme.mutateAsync({
        userId: sessionData?.user.id || "",
        theme: newTheme,
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
          theme={posts?.theme || "default-theme"}
        />
        <ShowSelector
          update={(toggles) => {
            // Add your logic here to handle the toggles
          }}
        />
      </div>
    </div>
  );
};

export default Innstillinger;
