/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const SkurlisteComponent = ({ skurliste }) => {
  return (
    <div>
      {" "}
      <table className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-primary">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 text-left">
            <th className="text-sm text-neutral">Treslag</th>
            <th className="text-sm text-neutral">Klassegrense</th>
            <th className="text-sm text-neutral">Klasse</th>
            <th className="text-sm text-neutral">PostningsNr.</th>
            <th className="text-sm text-neutral">Antall</th>

            <th className="text-sm text-neutral">M3</th>
            <th className="text-sm text-neutral">Status</th>
            <th className="text-sm text-neutral">Uttak</th>
            <th className="text-sm text-neutral">X-log</th>
            <th className="text-sm text-neutral">%</th>
            <th className="text-sm text-neutral">Anm</th>
            <th className="text-sm text-neutral">Bord VS66</th>
            <th className="text-sm text-neutral">Bordbredde VS66</th>
            <th className="text-sm text-neutral">Bord MKV</th>
            <th className="text-sm text-neutral">Bordbredde MKV</th>
            <th className="text-sm text-neutral">Blad MKV</th>
          </tr>
        </thead>
        <tbody>
          {skurliste?.map((list) => {
            return (
              <>
                <tr className="border border-primary bg-base-100 hover:cursor-pointer hover:bg-primary">
                  <td
                    className={`py-5 font-bold ${list.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                  >
                    {list.treslag}

                    <div className="text-xs font-normal italic text-gray-500">
                      {dateFormat(list.createdAt, "dd.mm.yyyy HH:MM")}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.klGrense}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.postNr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.antall}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">{list.m3}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div
                          className={`text-xs text-neutral ${list.status === "stopp" ? "text-red-500" : "text-green-500"}`}
                        >
                          {list.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs font-bold text-emerald-600">
                          {list.post}x{list.bredde}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">{list.xLog}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.prosent}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-blue-500">{list.anm}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">{list.vs66}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.vs66Br}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.mkvBord}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.mkvBordBr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
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

export default SkurlisteComponent;
