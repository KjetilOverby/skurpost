/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import ListcreatorMain from "~/components/listcreator/ListcreatorMain";
import { api } from "~/utils/api";

const listcreator = () => {
  const [bufferStatus, setBufferStatus] = useState(false);
  const { data: skurliste } = api.skurliste.getAll.useQuery({
    buffer: bufferStatus,
  });
  return (
    <div data-theme="lightmode" className="min-h-screen pt-20 lg:px-96">
      <ListcreatorMain
        skurliste={skurliste}
        setBufferStatus={setBufferStatus}
        bufferStatus={bufferStatus}
      />
    </div>
  );
};

export default listcreator;
