import React from "react";
import dateFormat from "dateformat";

const SkurlisteComponent = ({ skurliste }) => {
  return (
    <div>
      {" "}
      <table className="table-xs border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-primary table w-full whitespace-nowrap border">
        <thead>
          <tr className=" border-l-base-100 border-r-base-100 border text-left">
            <th className="text-neutral text-sm">Treslag</th>
            <th className="text-neutral text-sm">Klassegrense</th>
            <th className="text-neutral text-sm">Klasse</th>
            <th className="text-neutral text-sm">PostningsNr.</th>
            <th className="text-neutral text-sm">Antall</th>

            <th className="text-neutral text-sm">M3</th>
            <th className="text-neutral text-sm">Status</th>
            <th className="text-neutral text-sm">Uttak</th>
            <th className="text-neutral text-sm">X-log</th>
            <th className="text-neutral text-sm">%</th>
            <th className="text-neutral text-sm">Anm</th>
            <th className="text-neutral text-sm">Bord VS66</th>
            <th className="text-neutral text-sm">Bordbredde VS66</th>
            <th className="text-neutral text-sm">Bord MKV</th>
            <th className="text-neutral text-sm">Bordbredde MKV</th>
          </tr>
        </thead>
        <tbody>
          {skurliste?.map((list) => {
            return (
              <>
                <tr className="border-primary bg-base-100 hover:bg-primary hover:bg-primary border hover:cursor-pointer">
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
                        <div className="text-neutral text-xs">
                          {list.klGrense}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.postNr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.antall}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">{list.m3}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div
                          className={`text-neutral text-xs ${list.status === "stopp" ? "text-red-500" : "text-green-500"}`}
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
                        <div className="text-neutral text-xs">{list.xLog}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
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
                        <div className="text-neutral text-xs">{list.vs66}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.vs66Br}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.mkvBord}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.mkvBordBr}
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
