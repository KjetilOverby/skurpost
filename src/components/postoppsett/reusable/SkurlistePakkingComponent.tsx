import React from "react";
import dateFormat from "dateformat";

const SkurlistePakkingComponent = ({ skurliste }) => {
  return (
    <div>
      {" "}
      <table className="table-xs border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-neutral table w-full whitespace-nowrap border ">
        <thead>
          <tr className=" border-l-base-100 border-r-base-100 border text-left ">
            <th className="text-base-100 text-sm">Treslag</th>
            <th className="text-base-100 text-sm">Klasse</th>
            <th className="text-base-100 text-sm">Klassegrense</th>
            <th className="text-base-100 text-sm">Dim.</th>
            <th className="text-base-100 text-sm">Sortering</th>

            <th className="text-base-100 text-sm">Kval kode</th>
            <th className="text-base-100 text-sm">%</th>
            <th className="text-base-100 text-sm">Anmerk</th>
            <th className="text-base-100 text-sm">Tørke</th>
            <th className="text-base-100 text-sm">Anm</th>
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
                    <div className="flex  space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div>
                        <div className="text-neutral text-xs">
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
                        <p className="text-neutral mb-2" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex flex-col  ">
                      {kvKode.map((item, index) => (
                        <p className="text-neutral mb-2" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex flex flex-col  ">
                      {tProsent.map((item, index) => (
                        <p className="text-neutral mb-2" key={index}>
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
                            className="text-neutral mb-2 text-left"
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
                          <p className="text-neutral mb-2" key={index}>
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
