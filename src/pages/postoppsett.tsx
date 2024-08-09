import React, { useState } from "react";
import PostoppsettComponent from "~/components/postoppsett/PostoppsettComponent";
import { api } from "~/utils/api";

const postoppsett = () => {
  const { data: postoppsett } = api.postoppsett.getAll.useQuery();

  return (
    <div>
      <PostoppsettComponent data={postoppsett} />
    </div>
  );
};

export default postoppsett;
