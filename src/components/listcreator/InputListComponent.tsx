import React from "react";

const InputListComponent = () => {
  const klassetype = [
    "Spesial",
    "Panel",
    "Kort",
    "Lang",
    "Malm",
    "X-ray",
    "Krok",
    "Decker",
  ];
  const xLog = [
    "1x",
    "2x",
    "3x",
    "4x",
    "5x",
    "1x/OS",
    "2x/OS",
    "3x/OS",
    "5x/OS",
  ];
  const tProsent = ["18", "12", "12/18", "18/12", "16"];
  const bordtykkelser = ["16", "19", "22", "25", "32"];
  const bordbredder = [
    "75",
    "75, 100",
    "75, 100, 125",
    "75, 100, 125, 150",
    "100",
    "100, 125, 150",
    "100, 125, 150, 175",
    "125",
    "125, 150, 175",
    "150",
    "175",
  ];

  const sortering = [
    "Usortert",
    "Usortert, Usortert",
    "2X",
    "OS",
    "OS, 2X",
    "2X, OS",
  ];

  const kvalKode = ["40", "88", "40, 88", "88, 40"];
  const prosent = [
    "10%",
    "12%",
    "13%",
    "16%",
    "17%",
    "12%, 12%",
    "12%, 17%",
    "10%, 13%",
    "13%, 10%",
  ];

  const anmerk = [
    "Merkes 2x",
    "Merkes OS",
    "Merkes 2X, Merkes OS",
    "Merkes OS, Merkes 2X",
  ];

  const torke = [
    "Kanal 12+-2%",
    "Kanal 17+-2%",
    "Kanal 12+-2%, Kanal 17+-2%",
    "Kanal 17+-2%, Kanal 12+-2%",
    "Kammer 12+-2%",
    "Kammer 17+-2%",
    "Kammer 12+-2%, Kammer 17+-2%",
    "Kammer 17+-2%, Kammer 12+-2%",
    "Kanal 12+-2%, Kammer 17+-2%",
    "Kanal 17+-2%, Kammer 12+-2%",
    "Kammer 12+-2%, Kanal 17+-2%",
    "Kammer 17+-2%, Kanal 12+-2%",
  ];

  return (
    <div className="bg-base-100">
      <form className="flex flex-wrap gap-2">
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            Treslag
          </label>
          <select id="Treslag" className="text-xs">
            <option selected>Velg</option>
            <option value="Gran">Gran</option>
            <option value="Furu">Furu</option>
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            Klasse
          </label>
          <select id="Klasse" className="w-20 text-xs">
            <option selected disabled hidden value="">
              Velg
            </option>
            {Array.from({ length: 25 }, (_, i) => i + 2).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            Klassetype
          </label>
          <select>
            <option value="">Velg</option>
            {klassetype.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            Klassegrense
          </label>
          <input className="text-xs" type="text" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            PostningsNr
          </label>
          <input className="text-xs" type="text" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            Antall
          </label>
          <input className="text-xs" type="number" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            M3
          </label>
          <input className="text-xs" type="number" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            Status
          </label>
          <select id="Status" className="text-xs">
            <option selected>Velg</option>
            <option value="tøm">tøm</option>
            <option value="stopp">stopp</option>
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Post">
            Post
          </label>
          <input className="text-xs" type="text" placeholder="eks: 2x50" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Bredde">
            Bredde
          </label>
          <input className="text-xs" type="number" placeholder="Skurhøyde" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            X-log
          </label>
          <select>
            <option value="">Velg</option>
            {xLog.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            %
          </label>
          <select>
            <option value="">Velg</option>
            {tProsent.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Anm">
            Anm
          </label>
          <input className="text-xs" type="text" placeholder="" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Anm">
            Anm2
          </label>
          <input className="text-xs" type="text" placeholder="" />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="VS66">
            VS66
          </label>
          <select>
            <option value="">Velg</option>
            {bordtykkelser.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="VS66Br">
            VS66Br
          </label>
          <select>
            <option value="">Velg</option>
            {bordbredder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-orange-100 p-2">
          <label className="text-xs" htmlFor="VS66">
            VS66 Xtra
          </label>
          <select>
            <option value="">Velg</option>
            {bordtykkelser.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-orange-100 p-2">
          <label className="text-xs" htmlFor="VS66Br">
            VS66Br Xtra
          </label>
          <select>
            <option value="">Velg</option>
            {bordbredder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="VS66">
            MKV
          </label>
          <select>
            <option value="">Velg</option>
            {bordtykkelser.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="VS66Br">
            MKVBr
          </label>
          <select>
            <option value="">Velg</option>
            {bordbredder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="Dim">
            Dim
          </label>
          <input className="text-xs" type="text" />
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="Sortering">
            Sortering
          </label>
          <select>
            <option value="">Velg</option>
            {sortering.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="KvalKode">
            KvalKode
          </label>
          <select>
            <option value="">Velg</option>
            {kvalKode.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="prosent">
            Tørkeprosent
          </label>
          <select>
            <option value="">Velg</option>
            {prosent.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="anmerk">
            Anmerk
          </label>
          <select>
            <option value="">Velg</option>
            {anmerk.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="torke">
            Tørke
          </label>
          <select>
            <option value="">Velg</option>
            {torke.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-red-200 p-2">
          <label className="text-xs" htmlFor="Merknad">
            Merknad
          </label>
          <input className="text-xs" type="text" />
        </div>
        <button className="btn btn-info btn-xs text-white">Lagre</button>
      </form>
    </div>
  );
};

export default InputListComponent;
