import React from "react";
import Ring from "./reusable/rings/Ring";
import RawRing from "./reusable/rings/RawRing";
import Blade from "./reusable/rings/Blade";

interface Item {
  header: string;
  startrings: { input: string }[];
  blade: string;
  rawinput: { input: string; blade: string; id: string }[];
  endrings: { input: string }[];
}

const PostoppsettComponent = ({ data }: { data: Item[] }) => {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        {data?.map((item) => {
          return (
            <div className="" key={item.id}>
              <div className="mb-20">{item.header}</div>
              <div className="flex">
                <div className="flex">
                  {item.startrings.map((ringItem: { input: string }) => (
                    <Ring key={ringItem.input} value={ringItem.input} />
                  ))}
                </div>
                <Blade blade={item.blade} />
                <div className="flex">
                  {item.rawinput.map((rawItem) => (
                    <RawRing
                      key={item.id}
                      value={rawItem.input}
                      blade={rawItem.blade}
                    />
                  ))}
                </div>
                <div className="flex">
                  {item.endrings.map((endringItem) => (
                    <Ring key={item.id} value={endringItem.input} />
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
