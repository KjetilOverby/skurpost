import React from "react";

const PostoppsettComponent = ({ data }) => {
  console.log(data?.rawinput);

  return (
    <div className="grid h-screen place-items-center">
      <h1>Postoppsett</h1>
      <div>
        {data?.map((item) => {
          return (
            <div>
              <div>{item.header}</div>
              <div className="flex">
                <div className="flex">
                  {item.startrings.map((item) => (
                    <div className="m-1 flex h-24 w-12 items-center justify-center rounded-xl bg-blue-200">
                      {item.input}
                    </div>
                  ))}
                </div>
                <div className="flex">
                  {item.rawinput.map((item) => (
                    <div className="m-1 flex h-24 w-12 items-center justify-center rounded-xl bg-green-200">
                      {item.input + 1.4}
                    </div>
                  ))}
                </div>
                <div className="flex">
                  {item.startrings.map((item) => (
                    <div className="m-1 flex h-24 w-12 items-center justify-center rounded-xl bg-blue-200">
                      {item.input}
                    </div>
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
