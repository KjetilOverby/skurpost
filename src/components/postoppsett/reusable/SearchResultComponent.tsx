import { useRouter } from "next/router";
import React from "react";

interface Result {
  sawType: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  updater: string;
  updaterImg: string;
  header: string;
  blade: number;
  plankeTy: string;
  prosent: string;
  spes: string;
  xlog: string;
  createdById: string;
  startRings: { value: number }[] | null;
  rawInput: { value: number }[] | null;
  endRings: { value: number }[] | null;
}

interface SearchResultComponentProps {
  results: Result[];
  setPostId: (id: string) => void;
  setClickSearchOpen: (open: boolean) => void;
  setPostInfoWriteChange: (info: string) => void;
  postInfoWrite: string;
  clickSearchAll: () => void;
  setSearchInputAll: (input: boolean) => void;
  colorMode: string;
}

export const SearchResultComponent: React.FC<SearchResultComponentProps> = ({
  results,
  setPostId,
  setClickSearchOpen,
  setPostInfoWriteChange,
  postInfoWrite,
  clickSearchAll,
  setSearchInputAll,
  colorMode,
}) => {
  const ringStyle = "flex h-20 w-10 items-center justify-center rounded-md";
  const router = useRouter();

  const openPostHandler = async (postId: string) => {
    setPostId(postId);
    await router.push(`/postoppsett`);
    setPostInfoWriteChange(postInfoWrite);
    setClickSearchOpen(false);
  };

  const closeSearchResult = () => {
    setSearchInputAll(false);
    setClickSearchOpen(false);
  };

  return (
    <>
      <div
        data-theme={colorMode}
        className="animationsv absolute z-40 ml-5 rounded-xl bg-accent p-5"
      >
        <div className="">
          <button onClick={closeSearchResult}>Lukk</button>
          {results?.length === 0 && (
            <>
              <h1 className="py-5 text-primary">Ingen poster funnet.</h1>
              <p className="text-xs text-primary">
                Posten du søker etter eksisterer ikke,
              </p>
              <p className="mb-5 text-xs text-primary">
                eller så matcher ikke postens overskrift med listen
                <span className="font-bold"> ({postInfoWrite})</span>.
              </p>
            </>
          )}
          {results?.map((result) => {
            return (
              <div
                key={result.id}
                onClick={() => openPostHandler(result.id)}
                className="mb-5 rounded bg-base-100 p-5"
              >
                <p className=" text-primary">{result.header}</p>
                <p className="mb-10 text-xs italic text-accent">
                  Maskin: {result.sawType}
                </p>
                <div className="flex gap-1">
                  <div className="flex gap-1">
                    {result.startRings?.map((ring) => {
                      return (
                        <div
                          key={ring.value}
                          className={`${ringStyle} border border-primary bg-gradient-to-b from-accent via-primary to-accent text-accent`}
                        >
                          <p className="text-xs">{ring.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1">
                    {result.rawInput?.map((ring) => {
                      return (
                        <div
                          key={ring.value}
                          className={`${ringStyle} relative border border-primary bg-gradient-to-b from-neutral via-primary to-neutral text-accent`}
                        >
                          <p className="absolute bottom-20 text-xs text-primary">
                            {ring.value}
                          </p>
                          <p className="text-xs">
                            {(ring.value + 1.4).toFixed(1)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1">
                    {result.endRings?.map((ring) => {
                      return (
                        <div
                          key={ring.value}
                          className={`${ringStyle}  border border-primary bg-gradient-to-b from-accent via-primary to-accent text-accent`}
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
        <button onClick={clickSearchAll} className="btn  bg-accent">
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
