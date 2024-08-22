import { useRouter } from "next/router";
import React from "react";

export const SearchResultComponent = ({
  results,
  setPostId,
  setClickSearchOpen,
}) => {
  const ringStyle = "flex h-20 w-10 items-center justify-center";
  const router = useRouter();

  const openPostHandler = (postId) => {
    setPostId(postId);
    router.push(`/postoppsett`);
  };

  return (
    <div className="absolute z-40 ml-5 ">
      <div className="">
        <button onClick={() => setClickSearchOpen(false)}>Lukk</button>
        {results?.map((result) => {
          return (
            <div
              onClick={() => openPostHandler(result.id)}
              className="mb-5 rounded bg-black p-5"
            >
              <p className="mb-10">{result.header}</p>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  {result.startRings.map((ring) => {
                    return (
                      <div
                        className={`${ringStyle} border-white bg-gray-600 bg-gradient-to-b from-gray-900  via-gray-300 to-gray-900 text-black`}
                      >
                        <p className="text-xs">{ring.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  {result.rawInput.map((ring) => {
                    return (
                      <div
                        className={`${ringStyle} relative border-white bg-gray-600 bg-gradient-to-b  from-gray-900 via-blue-300 to-gray-900 text-white`}
                      >
                        <p className="absolute bottom-20 text-xs text-gray-400">
                          {ring.value}
                        </p>
                        <p className="text-xs">
                          {(ring.value + 1.4).toFixed(1)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  {result.endRings.map((ring) => {
                    return (
                      <div
                        className={`${ringStyle}  border-white bg-gray-600 bg-gradient-to-b from-gray-900  via-gray-300 to-gray-900 text-black`}
                      >
                        <p className="text-xs">{ring.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
