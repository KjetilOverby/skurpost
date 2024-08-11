import React from "react";

import ringlist from "~/utils/ringlist";
import RingPickerRaw from "./reusable/RingPickerRaw";

export const RawDivideComponent = ({ setOpenRawDivide }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-10  z-10 mx-auto my-auto flex h-[900px] w-screen flex-col justify-end rounded-xl bg-gray-700 p-5">
      <div className="flex">
        <RingPickerRaw
          values={ringlist}
          position="right-0"
          title="Utfylling bak"
          onChange={(value) => console.log(value)}
        />
        <div>
          <button onClick={() => setOpenRawDivide(false)}>Lukk</button>
          <button></button>
        </div>
      </div>
    </div>
  );
};
