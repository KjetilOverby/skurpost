/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { api } from "~/utils/api";

const listcreator = () => {
  const [bufferStatus, setBufferStatus] = useState(false);
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: bufferStatus,
  });
  return (
    <div className="min-h-screen bg-base-100">
      <HeaderComponent />
      <div data-theme="lightmode" className="min-h-screen px-5 pt-20 xl:px-96">
        <ListcreatorMain
          skurliste={skurliste}
          setBufferStatus={setBufferStatus}
          bufferStatus={bufferStatus}
        />
      </div>
    </div>
  );
};

export default listcreator;
