/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from "react";
import { api } from "~/utils/api";

const InputListComponent = ({ listProps, setListProps }) => {
  console.log(listProps);

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
  const xLogList = [
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

  console.log(listProps);

  const ctx = api.useContext();
  const createPost = api.skurliste.create.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
    },
  });

  useEffect(() => {
    let newBlad: number;

    if (listProps.bredde >= 0 && listProps.bredde < 126) {
      newBlad = 4.0;
    } else if (listProps.bredde >= 126 && listProps.bredde <= 150) {
      newBlad = 4.2;
    } else if (listProps.bredde >= 151 && listProps.bredde <= 175) {
      newBlad = 4.4;
    } else if (listProps.bredde >= 175) {
      newBlad = 4.6;
    }

    setListProps((prevState) => ({
      ...prevState,
      blad: newBlad,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProps.bredde]);

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate(listProps);
        }}
        className="flex flex-wrap gap-2"
      >
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            Treslag
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                treslag: e.target.value,
              }))
            }
            id="Treslag"
            className="bg-base-100 text-xs"
          >
            <option selected>Velg</option>
            <option value="Gran">Gran</option>
            <option value="Furu">Furu</option>
          </select>
        </div>

        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            Klassetype
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                klType: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
            <option value={listProps.klType}>Velg</option>
            {klassetype.map((option) => (
              <option key={option} value={listProps.klType}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            Klassegrense
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                klGrense: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
            type="text"
            value={listProps.klGrense}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            Klasse
          </label>
          <select
            id="Klasse"
            className="w-20 bg-base-100 text-xs"
            value={listProps.klasse}
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                klasse: e.target.value,
              }))
            }
          >
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
          <label className="text-xs" htmlFor="Klasse">
            PostningsNr
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                postNr: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
            type="text"
            value={listProps.postNr}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Antall">
            Antall
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                antall: Number(e.target.value),
              }))
            }
            className="bg-base-100 text-xs"
            type="number"
            value={listProps.antall}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Klasse">
            M3
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                m3: Number(e.target.value),
              }))
            }
            className="bg-base-100 text-xs"
            type="number"
            value={listProps.m3}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Treslag">
            Status
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                status: e.target.value,
              }))
            }
            id="Status"
            className="bg-base-100 text-xs"
            value={listProps.status}
          >
            <option selected>Velg</option>
            <option value="tøm">tøm</option>
            <option value="stopp">stopp</option>
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Post">
            Post
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                post: e.target.value,
              }))
            }
            className="text-xss bg-base-100"
            type="text"
            placeholder="eks: 2x50"
            value={listProps.post}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Bredde">
            Bredde
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                bredde: Number(e.target.value),
              }))
            }
            className="bg-base-100 text-xs"
            type="number"
            placeholder="Skurhøyde"
            value={listProps.bredde}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="xLog">
            X-log
          </label>
          <select
            className="bg-base-100 text-xs"
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                xLog: e.target.value,
              }))
            }
          >
            <option className="text-xs" value="">
              Velg
            </option>
            {xLogList.map((option) => (
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
          <select
            className="bg-base-100 text-xs"
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                prosent: e.target.value,
              }))
            }
          >
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
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                anm: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
            type="text"
            placeholder=""
            value={listProps.anm}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="Anm">
            Anm2
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                anm2: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
            type="text"
            placeholder=""
            value={listProps.anm2}
          />
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs" htmlFor="VS66">
            VS66
          </label>
          <select
            className="bg-base-100 text-xs"
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                vs66: e.target.value,
              }))
            }
          >
            <option value="">Velg</option>
            {bordtykkelser.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-blue-200 p-2">
          <label className="text-xs " htmlFor="VS66Br">
            VS66Br
          </label>
          <select
            className="bg-base-100 text-xs"
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                vs66Br: e.target.value,
              }))
            }
          >
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
          <select className="bg-base-100">
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
          <select className="bg-base-100">
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
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                mkvBord: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
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
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                mkvBordBr: e.target.value,
              }))
            }
            className="bg-base-100"
          >
            <option value="">Velg</option>
            {bordbredder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs " htmlFor="Dim">
            Dim
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                dimensjon: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
            type="text"
            value={listProps.dimensjon}
          />
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs" htmlFor="Sortering">
            Sortering
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                sortering: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
            <option value="">Velg</option>
            {sortering.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs" htmlFor="KvalKode">
            KvalKode
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                kode: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
            <option value="">Velg</option>
            {kvalKode.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs" htmlFor="prosent">
            Tørkeprosent
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                torke: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
            <option value="">Velg</option>
            {prosent.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs" htmlFor="anmerk">
            Anmerk
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                anmerk: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
            <option value="">Velg</option>
            {anmerk.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs" htmlFor="torke">
            Tørke
          </label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                destinasjon: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
          >
            <option value="">Velg</option>
            {torke.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-green-200 p-2">
          <label className="text-xs" htmlFor="Merknad">
            Merknad
          </label>
          <input
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                text: e.target.value,
              }))
            }
            className="bg-base-100 text-xs"
            type="text"
            value={listProps.text}
          />
        </div>
        <button className="btn btn-info btn-xs text-white">Lagre</button>
      </form>
    </div>
  );
};

export default InputListComponent;
