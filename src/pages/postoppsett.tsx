import React, { useState } from "react";
import PostoppsettComponent from "~/components/postoppsett/PostoppsettComponent";
import EditHeader from "~/components/postoppsett/reusable/EditHeader";
import { api } from "~/utils/api";

const postoppsett = () => {
  const { data: postoppsett } = api.postoppsett.getAll.useQuery();
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <EditHeader setEditMode={setEditMode} editMode={editMode} />
      <PostoppsettComponent
        data={postoppsett}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
};

export default postoppsett;
