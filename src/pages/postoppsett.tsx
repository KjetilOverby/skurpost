/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import React, { useEffect, useContext } from "react";
import PostoppsettComponent from "~/components/postoppsett/PostoppsettComponent";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { PostInfoContext } from "~/components/context";

interface PostoppsettProps {
  postId: string;
  setPostId: (id: string) => void;
  colorMode: string;
}

const Postoppsett = ({ postId, setPostId, colorMode }: PostoppsettProps) => {
  const { data: sessionData } = useSession();
  const { data: postoppsett } = api.postoppsett.getById.useQuery({ postId });
  const context = useContext(PostInfoContext);
  const { setGetUserInfo } = context ?? {};
  useEffect(() => {
    if (setGetUserInfo) {
      setGetUserInfo(sessionData && sessionData.user);
    }
  }, [sessionData, setGetUserInfo]);

  return (
    <div data-theme={colorMode}>
      <PostoppsettComponent
        data={postoppsett ?? []}
        postId={postId}
        setPostId={setPostId}
        colorMode={colorMode}
      />
    </div>
  );
};

export default Postoppsett;
