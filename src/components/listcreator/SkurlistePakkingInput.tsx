import React from "react";
import dateFormat from "dateformat";

interface List {
  sortering?: string;
  dimensjon?: string;
  kode?: string;
  torke?: string;
  anmerk?: string;
  destinasjon?: string;
  text?: string;
  treslag: string;
  createdAt: string;
  klasse: string;
  klGrense: string;
}

const SkurlistePakkingInput: React.FC<{ list: List }> = ({ list }) => {
  const sorteringArray = list.sortering ? list.sortering.split(", ") : [];
  const dim = list.dimensjon ? list.dimensjon.split(", ") : [];
  const kvKode = list.kode ? list.kode.split(", ") : [];
  const tProsent = list.torke ? list.torke.split(", ") : [];
  const anmerk = list.anmerk ? list.anmerk.split(", ") : [];
  const dest = list.destinasjon ? list.destinasjon.split(", ") : [];
  const text = list.text ? list.text.split(", ") : [];
  return (
    <div className="overflow-scroll">
      {" "}
      <table className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-primary ">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 border-t-accent text-left">
            <th className="text-sm text-neutral">Treslag</th>
            <th className="text-sm text-neutral">Klasse</th>
            <th className="text-sm text-neutral">Klassegrense</th>
            <th className="text-sm text-neutral">Dim.</th>
            <th className="text-sm text-neutral">Sortering</th>

            <th className="text-sm text-neutral">Kval kode</th>
            <th className="text-sm text-neutral">%</th>
            <th className="text-sm text-neutral">Anmerk</th>
            <th className="text-sm text-neutral">Tørke</th>
            <th className="text-sm text-neutral">Anm</th>
          </tr>
        </thead>
        <tbody>
          <>
            <tr className="border border-primary bg-base-100 hover:cursor-pointer hover:bg-primary ">
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
                    <div className="text-primaryl text-xs">{list.klasse}</div>
                  </div>
                </div>
              </td>
              <td className="py-5">
                <div className="flex  space-x-3">
                  <div>
                    <div className="text-primaryl text-xs">{list.klGrense}</div>
                  </div>
                </div>
              </td>
              <td className="py-5">
                <div className="flex flex-col  ">
                  {dim.map((item, index) => (
                    <p className="mb-2 font-bold text-emerald-600" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </td>
              <td className="py-5">
                <div className="flex  flex-col  ">
                  {sorteringArray.map((item, index) => (
                    <p className="text-primaryl mb-2" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </td>
              <td className="py-5">
                <div className="flex flex-col  ">
                  {kvKode.map((item, index) => (
                    <p className="text-primaryl mb-2" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </td>

              <td className="py-5">
                <div className="flex flex-col  ">
                  {tProsent.map((item, index) => (
                    <p className="text-primaryl mb-2" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </td>
              <td className="py-5">
                <div className="flex  space-x-3">
                  <div className="flex flex-col  ">
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
                  <div className="flex flex-col ">
                    {dest.map((item, index) => (
                      <p className="text-primaryl mb-2 text-left" key={index}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </td>
              <td className="py-5">
                <div className="flex  space-x-3">
                  <div className="flex flex-col  ">
                    {text.map((item, index) => (
                      <p className="text-primaryl mb-2" key={index}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </div>
  );
};

export default SkurlistePakkingInput;
