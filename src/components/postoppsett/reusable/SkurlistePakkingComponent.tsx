import React from "react";
import dateFormat from "dateformat";

interface SkurlisteItem {
  treslag: string;
  klasse: string;
  klGrense: string;
  dimensjon: string;
  sortering: string;
  kode: string;
  torke: string;
  anmerk: string;
  destinasjon: string;
  text: string;
  createdAt: Date;
}

interface SkurlistePakkingComponentProps {
  skurliste: SkurlisteItem[];
}

const SkurlistePakkingComponent: React.FC<SkurlistePakkingComponentProps> = ({
  skurliste,
}) => {
  return (
    <div className="overflow-scroll">
      {" "}
      <table className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-primary ">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 border-t-base-100 bg-secondary text-left hover:bg-secondary">
            <th className="text-sm text-primary">Treslag</th>
            <th className="text-sm text-primary">Kl</th>
            <th className="text-sm text-primary">KlGrense</th>
            <th className="text-sm text-primary">Dim</th>
            <th className="text-sm text-primary">Sortering</th>

            <th className="text-sm text-primary">Kode</th>
            <th className="text-sm text-primary">%</th>
            <th className="text-sm text-primary">Anmerk</th>
            <th className="text-sm text-primary">Tørke</th>
            <th className="text-sm text-primary">Anm</th>
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
                <tr className="border border-gray-700 border-l-transparent border-r-transparent bg-base-100 hover:cursor-pointer hover:bg-neutral  ">
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
                        <div className="text-xs text-primary">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex  space-x-3">
                      <div>
                        <div className="text-xs text-primary">
                          {list.klGrense}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex-col  ">
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
                    <div className="flex flex-col  ">
                      {sorteringArray.map((item, index) => (
                        <p className="mb-2 text-primary" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex-col  ">
                      {kvKode.map((item, index) => (
                        <p className="mb-2 text-primary" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex flex-col  ">
                      {tProsent.map((item, index) => (
                        <p className="mb-2 text-primary" key={index}>
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
                          <p
                            className="mb-2 text-left text-primary"
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
                      <div className="flex flex-col  ">
                        {text.map((item, index) => (
                          <p className="mb-2 text-primary" key={index}>
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
