import React, { useEffect, useContext } from "react";
import PostoppsettComponent from "~/components/postoppsett/PostoppsettComponent";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { PostInfoContext } from "~/components/context";

const postoppsett = ({ postId, setPostId, colorMode }) => {
  const { data: sessionData } = useSession();
  const { data: postoppsett } = api.postoppsett.getById.useQuery({ postId });
  const context = useContext(PostInfoContext);
  const { setGetUserInfo } = context;
  useEffect(() => {
    setGetUserInfo(sessionData && sessionData.user);
  }, [sessionData, setGetUserInfo]);

  return (
    <div data-theme={colorMode}>
      <PostoppsettComponent
        data={postoppsett}
        postId={postId}
        setPostId={setPostId}
        colorMode={colorMode}
      />
    </div>
  );
};

export default postoppsett;
