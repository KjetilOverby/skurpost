import React, { useState } from "react";
import PostoppsettComponent from "~/components/postoppsett/PostoppsettComponent";
import { api } from "~/utils/api";

const postoppsett = ({ postId, setPostId, colorMode }) => {
  const { data: postoppsett } = api.postoppsett.getById.useQuery({ postId });

  return (
    <div>
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
