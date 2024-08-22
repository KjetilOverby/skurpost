/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";
import { api } from "~/utils/api";

const listcreator = ({ colorMode }) => {
  const [bufferStatus, setBufferStatus] = useState(false);
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: bufferStatus,
  });
  return (
    <div data-theme={colorMode} className="min-h-screen bg-base-100">
      <HeaderComponent />
      <div className="min-h-screen px-5 pt-20 xl:px-96">
        <ListcreatorMain
          skurliste={skurliste}
          setBufferStatus={setBufferStatus}
          bufferStatus={bufferStatus}
          colorMode={colorMode}
        />
      </div>
    </div>
  );
};

export default listcreator;
