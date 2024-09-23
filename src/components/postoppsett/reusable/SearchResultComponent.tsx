import { useRouter } from "next/router";
import React from "react";

export const SearchResultComponent = ({
  results,
  setPostId,
  setClickSearchOpen,
  setPostInfoWriteChange,
  postInfoWrite,
  clickSearchAll,
  setSearchInputAll,
}) => {
  const ringStyle = "flex h-20 w-10 items-center justify-center rounded-md";
  const router = useRouter();

  const openPostHandler = (postId) => {
    setPostId(postId);
    router.push(`/postoppsett`);
    setPostInfoWriteChange(postInfoWrite);
    setClickSearchOpen(false);
  };

  const closeSearchResult = () => {
    setSearchInputAll(false);
    setClickSearchOpen(false);
  };

  return (
    <>
      <div className="animationsv absolute z-40 ml-5 rounded-xl bg-secondary p-5">
        <div className="">
          <button onClick={closeSearchResult}>Lukk</button>
          {results?.map((result) => {
            return (
              <div
                onClick={() => openPostHandler(result.id)}
                className="mb-5 rounded bg-gradient-to-b from-[#123456] via-[#789abc] to-[#123456] p-5"
              >
                <p className="mb-10">{result.header}</p>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    {result.startRings.map((ring) => {
                      return (
                        <div
                          className={`${ringStyle} border-white bg-gradient-to-b from-teal-800 via-gray-300 via-teal-100  to-gray-900 to-teal-800 text-black`}
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
                          className={`${ringStyle} relative border-white bg-gradient-to-b from-[#123456] via-[#789abc] to-[#123456] text-white`}
                        >
                          <p className="absolute bottom-20 text-xs text-gray-200">
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
                          className={`${ringStyle}  border-white bg-gradient-to-b from-teal-800 via-gray-300 via-teal-100  to-gray-900 to-teal-800 text-black`}
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
        <button onClick={clickSearchAll} className="btn  bg-primary">
          Vis alle bladtykkelser
        </button>
      </div>
      <style>{`
    
@-webkit-keyframes bounceInDown {
  0%, 60%, 75%, 90%, 100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes bounceInDown {
  0%, 60%, 75%, 90%, 100% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  100% {
    transform: none;
  }
}

.animationsv {
  animation: bounceInDown 1s;
}
    `}</style>
    </>
  );
};
