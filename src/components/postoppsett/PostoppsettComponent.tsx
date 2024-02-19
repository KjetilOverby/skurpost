import React from "react";
import Ring from "./reusable/rings/Ring";
import RawRing from "./reusable/rings/RawRing";
import Blade from "./reusable/rings/Blade";

const PostoppsettComponent = ({ data }) => {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        {data?.map((item) => {
          return (
            <div className="">
              <div className="mb-20">{item.header}</div>
              <div className="flex">
                <div className="flex">
                  {item.startrings.map((item) => (
                    <Ring value={item.input} />
                  ))}
                </div>
                <Blade blade={item.blade} />
                <div className="flex">
                  {item.rawinput.map((item) => (
                    <RawRing value={item.input} blade={item.blade} />
                  ))}
                </div>
                <div className="flex">
                  {item.endrings.map((item) => (
                    <Ring value={item.input} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostoppsettComponent;
