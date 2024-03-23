/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const SkurlistePakkingComponent = ({ skurliste }) => {
  return (
    <div>
      {" "}
      <table className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-neutral ">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 text-left ">
            <th className="text-sm text-base-100">Treslag</th>
            <th className="text-sm text-base-100">Klasse</th>
            <th className="text-sm text-base-100">Klassegrense</th>
            <th className="text-sm text-base-100">Dim.</th>
            <th className="text-sm text-base-100">Sortering</th>

            <th className="text-sm text-base-100">Kval kode</th>
            <th className="text-sm text-base-100">%</th>
            <th className="text-sm text-base-100">Anmerk</th>
            <th className="text-sm text-base-100">Tørke</th>
            <th className="text-sm text-base-100">Anm</th>
          </tr>
        </thead>
        <tbody>
          {skurliste?.map((list) => {
            const sorteringArray = list.sortering.split(", ");
            const dim = list.dimensjon.split(", ");
            const kvKode = list.kode.split(", ");
            const tProsent = list.torke.split(", ");
            const anmerk = list.anmerk.split(", ");
            const dest = list.destinasjon.split(", ");
            const text = list.text.split(", ");
            return (
              <>
                <tr className="border border-primary bg-base-100 hover:cursor-pointer hover:bg-primary hover:bg-primary">
                  <td
                    className={`py-5 font-bold ${list.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                  >
                    {list.treslag}

                    <div className="text-xs font-normal italic text-gray-500">
                      {dateFormat(list.createdAt, "dd.mm.yyyy HH:MM")}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.klGrense}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex flex-col  ">
                      {dim.map((item, index) => (
                        <p
                          className="mb-2 font-bold text-emerald-600"
                          key={index}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex flex-col  ">
                      {sorteringArray.map((item, index) => (
                        <p className="mb-2 text-neutral" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex flex-col  ">
                      {kvKode.map((item, index) => (
                        <p className="mb-2 text-neutral" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex flex flex-col  ">
                      {tProsent.map((item, index) => (
                        <p className="mb-2 text-neutral" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div className="flex flex flex-col  ">
                        {anmerk.map((item, index) => (
                          <p className="mb-2 text-blue-500" key={index}>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div className="flex flex flex-col ">
                        {dest.map((item, index) => (
                          <p
                            className="mb-2 text-left text-neutral"
                            key={index}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div className="flex flex flex-col  ">
                        {text.map((item, index) => (
                          <p className="mb-2 text-neutral" key={index}>
                            {item}
                          </p>
                        ))}
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

export default SkurlistePakkingComponent;
