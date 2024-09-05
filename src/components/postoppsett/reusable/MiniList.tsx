import React from "react";

export const MiniList = ({ clickSearch, skurliste }) => {
  return (
    <div className="absolute right-2 top-20">
      <table className="table table-xs w-full  bg-gray-600">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 border-t-base-100 text-left">
            <th className="text-xs text-neutral">Treslag</th>
            <th className="text-xs text-neutral">Kl</th>
            <th className="text-xs text-neutral">Antall</th>

            <th className="text-xs text-neutral">M3</th>
            <th className="text-xs text-neutral">Status</th>
            <th className="text-xs text-neutral">Uttak</th>
            <th className="text-xs text-neutral">X-log</th>
            <th className="text-xs text-neutral">%</th>
            <th className="text-xs text-neutral">Anm</th>
            <th className="text-xs text-neutral">VS66</th>
            <th className="text-xs text-neutral">MKV</th>
            <th className="text-xs text-neutral">Blad</th>
          </tr>
        </thead>
        <tbody>
          {skurliste?.map((list) => {
            return (
              <>
                <tr
                  onClick={() => clickSearch(list)}
                  className="border border-primary bg-base-100 hover:cursor-pointer hover:bg-primary "
                >
                  <td
                    className={` font-bold ${list.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                  >
                    {list.treslag}
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-[.7rem] text-neutral">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.antall}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">{list.m3}</div>
                      </div>
                    </div>
                  </td>
                  <td className="">
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
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs font-bold text-emerald-600">
                          {list.post}x{list.bredde}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">{list.xLog}</div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
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
                        <div className="text-xs text-neutral">{list.vs66}</div>
                      </div>
                    </div>
                  </td>

                  <td className="">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.mkvBord}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="">
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
