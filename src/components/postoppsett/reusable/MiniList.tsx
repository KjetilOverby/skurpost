import { get } from "http";
import React from "react";

interface SkurlisteItem {
  treslag: string;
  klasse: string;
  antall: number;
  m3: number;
  status: string;
  post: number;
  bredde: number;
  xLog: string;
  prosent: number;
  anm: string;
  vs66: string;
  mkvBord: string;
  blad: number;
  progress: string;
}

interface MiniListProps {
  clickSearch: (item: SkurlisteItem) => void;
  skurliste: SkurlisteItem[];
}

export const MiniList: React.FC<MiniListProps> = ({
  clickSearch,
  skurliste,
}) => {
  return (
    <div className="absolute right-2 top-20">
      <table className="table table-xs w-full  bg-accent">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 border-t-base-100 text-left">
            <th className="text-xs text-primary">Treslag</th>
            <th className="text-xs text-primary">Kl</th>
            <th className="text-xs text-primary">Antall</th>

            <th className="text-xs text-primary">M3</th>
            <th className="text-xs text-primary">Status</th>
            <th className="text-xs text-primary">Uttak</th>
            <th className="text-xs text-primary">X-log</th>
            <th className="text-xs text-primary">%</th>
            <th className="text-xs text-primary">Anm</th>
            <th className="text-xs text-primary">VS66</th>
            <th className="text-xs text-primary">MKV</th>
            <th className="text-xs text-primary">Blad</th>
          </tr>
        </thead>
        <tbody>
          {skurliste?.map((list) => {
            const getProgressClass = (progress: string) => {
              switch (progress) {
                case "aktiv":
                  return "bg-secondary";
                case "fullført":
                  return "bg-neutral";
                case "":
                  return "bg-base-100";
              }
            };
            return (
              <>
                <tr
                  onClick={() => clickSearch(list)}
                  className={`border border-base-100 bg-base-100 hover:cursor-pointer hover:bg-accent ${getProgressClass(list.progress)}`}
                >
                  <td
                    className={` font-bold ${list.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                  >
                    {list.treslag}
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-[.7rem] text-primary">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">
                          {list.antall}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">{list.m3}</div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div
                          className={`text-xs text-primary ${list.status === "stopp" ? "text-red-500" : "text-green-500"}`}
                        >
                          {list.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs font-bold text-primary">
                          {list.post}x{list.bredde}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">{list.xLog}</div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">
                          {list.prosent}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-blue-500">{list.anm}</div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">{list.vs66}</div>
                      </div>
                    </div>
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">
                          {list.mkvBord}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-primary">
                          {list.blad.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
