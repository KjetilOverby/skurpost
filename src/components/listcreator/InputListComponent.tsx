/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { settings } from ".eslintrc.cjs";
import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { toast } from "sonner";

const InputListComponent = ({ listProps, setListProps, settings }) => {
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
    "1X",
    "2X",
    "3X",
    "4X",
    "5X",
    "1X/OS",
    "2X/OS",
    "3X/OS",
    "5X/OS",
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

  const ctx = api.useContext();
  const createPost = api.skurliste.create.useMutation({
    onSuccess: () => {
      void ctx.skurliste.getAll.invalidate();
      toast.success("Post lagret");
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
    <div className="bg-base-accent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (listProps.post === "") {
            toast.error("Post må fylles ut");
          } else if (listProps.bredde === 0) {
            toast.error("Bredde må fylles ut");
          } else if (listProps.prosent === "") {
            toast.error("Prosent må fylles ut");
          } else if (
            !listProps.post.includes("1x") &&
            !listProps.post.includes("2x") &&
            !listProps.post.includes("3x") &&
            !listProps.post.includes("4x") &&
            !listProps.post.includes("5x") &&
            !listProps.post.includes("6x")
          ) {
            toast.error(
              "Postuttak må starte med et tall fra 1 til 6, etterfulgt av en liten 'x'.",
            );
          } else {
            createPost.mutate(listProps);
          }
        }}
        className="flex flex-wrap gap-2"
      >
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.treslag}
          >
            <option selected>Velg</option>
            <option value="Gran">Gran</option>
            <option value="Furu">Furu</option>
          </select>
        </div>

        <div className="flex w-28 flex-col bg-accent p-2">
          <label className="text-xs" htmlFor="Klassetype">
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
            value={listProps.klType}
          >
            <option>Velg</option>
            {klassetype.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.xLog}
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.prosent}
          >
            <option value="">Velg</option>
            {tProsent.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.vs66}
          >
            <option value="">Velg</option>
            {bordtykkelser.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.vs66Br}
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
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.mkvBord}
          >
            <option value="">Velg</option>
            {bordtykkelser.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-28 flex-col bg-accent p-2">
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
            value={listProps.mkvBordBr}
          >
            <option value="">Velg</option>
            {bordbredder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* settings section */}

        {settings?.visPakking && (
          <>
            <div className="flex w-28 flex-col bg-neutral p-2">
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
            <div className="flex w-28 flex-col bg-neutral p-2">
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
                value={listProps.sortering}
              >
                <option value="">Velg</option>
                {sortering.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-28 flex-col bg-neutral p-2">
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
                value={listProps.kode}
              >
                <option value="">Velg</option>
                {kvalKode.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-28 flex-col bg-neutral p-2">
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
                value={listProps.torke}
              >
                <option value="">Velg</option>
                {prosent.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-28 flex-col bg-neutral p-2">
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
                value={listProps.anmerk}
              >
                <option value="">Velg</option>
                {anmerk.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-28 flex-col bg-neutral p-2">
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
                value={listProps.destinasjon}
              >
                <option value="">Velg</option>
                {torke.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-28 flex-col bg-neutral p-2">
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
          </>
        )}
        <div className="mr-5 flex flex-col">
          <label>Status</label>
          <select
            onChange={(e) =>
              setListProps((prevState) => ({
                ...prevState,
                progress: e.target.value,
              }))
            }
            id="Status"
            className="bg-base-100 text-xs"
            value={listProps.progress}
          >
            <option value="">Planlagt</option>
            <option value="aktiv">Aktiv</option>
            <option value="fullført">Fullført</option>
          </select>
        </div>

        <button className="btn btn-info btn-xs text-white">Lagre</button>
      </form>
    </div>
  );
};

export default InputListComponent;
