import React, { useContext, useState, useEffect } from "react";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import ColorTheme from "~/components/innstillinger/ColorTheme";
import { api } from "~/utils/api";
import ShowSelector from "~/components/innstillinger/ShowSelector";
import AccountComponent from "~/components/innstillinger/AccountComponent";
import { signIn, signOut, useSession } from "next-auth/react";
import { PostInfoContext } from "~/components/context";

const Innstillinger = ({ colorMode }) => {
  const { data: users } = api.users.getUsers.useQuery({});
  const context = useContext(PostInfoContext);

  const { setGetUserInfo } = context;
  const [currentTheme, setCurrentTheme] = useState(""); // Add state for theme

  useEffect(() => {
    setGetUserInfo(users && users);
  }, [users]);

  const {
    data: posts,
    isLoading,
    error,
  } = api.settings.getByUser.useQuery({
    userId: users[1]?.id,
  });
  console.log(users);

  const ctx = api.useContext();
  useEffect(() => {
    if (posts) {
      void ctx.settings.getByUser.invalidate();
    }
  }, [currentTheme, colorMode]);

  const createSettings = api.settings.createPost.useMutation({
    onSuccess: () => {
      void ctx.settings.update.invalidate();
      void ctx.settings.getByUser.invalidate();
    },
  });

  const updateTheme = api.settings.updateTheme.useMutation({
    onSuccess: (data) => {
      setCurrentTheme(data.theme); // Update state with new theme
      void ctx.settings.updateTheme.invalidate();
      void ctx.settings.getByUser.invalidate();
    },
  });

  const handleUpdateTheme = async (newTheme) => {
    try {
      const userId = "user-id"; // Replace with actual user ID
      const response = await updateTheme.mutateAsync({
        userId: "cm1hxbt7i0000herqgnfz2kgq",
        theme: newTheme,
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return (
    <div data-theme={colorMode} className="min-h-screen bg-base-100">
      <HeaderComponent />
      <div className="mx-[30%] mt-5">
        <h1 className="my-20 text-2xl text-primary">Innstillinger</h1>
        <AccountComponent />
        <ColorTheme update={handleUpdateTheme} theme={posts?.theme} />
        <ShowSelector />
      </div>
    </div>
  );
};

export default Innstillinger;
