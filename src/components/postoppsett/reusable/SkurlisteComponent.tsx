import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { DiVim } from "react-icons/di";

interface SkurlisteItem {
  id: string;
  treslag: string;
  klasse: string;
  klGrense: string;
  klType: string;
  postNr: string;
  antall: number;
  m3: number;
  status: string;
  post: string;
  xLog: string;
  bredde: number;
  prosent: string;
  anm: string;
  anm2: string;
  VS66Blad: number;
  vs66: string;
  vs66Br: string;
  mkvBord: string;
  mkvBordBr: string;
  blad: number;
  sortering: string;
  kode: string;
  dimensjon: string;
  torke: string;
  anmerk: string;
  destinasjon: string;
  text: string;
  buffer: boolean;
  createdAt: Date;
  updatedAt: Date;
  order: number;
  progress: string;
}

interface SkurlisteComponentProps {
  skurliste: SkurlisteItem[];
  edit: boolean;
  deletePost: { mutate: (data: { id: string }) => void };
  editPost: { mutate: (data: SkurlisteItem) => void };
  listProps: SkurlisteItem;
  setListProps: React.Dispatch<React.SetStateAction<SkurlisteItem>>;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  maxOrder: number;
  updateBufferHandler: (id: string) => void;
  bufferStatus: boolean;
  setBufferStatus: React.Dispatch<React.SetStateAction<boolean>>;
  updateBufferHandlerFalse: (id: string) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setClickSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPostInfoWrite: React.Dispatch<React.SetStateAction<string>>;
  searchInputAll: boolean;
  listLoad: boolean;
}

const SkurlisteComponent: React.FC<SkurlisteComponentProps> = ({
  skurliste,
  edit,
  deletePost,
  editPost,
  listProps,
  setListProps,
  moveUp,
  moveDown,
  maxOrder,
  updateBufferHandler,
  bufferStatus,
  setBufferStatus,
  updateBufferHandlerFalse,
  setSearchInput,
  setClickSearchOpen,
  setPostInfoWrite,
  searchInputAll,
  listLoad,
}) => {
  const handleDelete = (id: string) => {
    deletePost.mutate({ id: id });
  };

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEditExecute = (id: string) => {
    editPost.mutate({
      id: id,
      treslag: listProps.treslag,
      klasse: listProps.klasse,
      klGrense: listProps.klGrense,
      klType: listProps.klType,
      postNr: listProps.postNr,
      antall: listProps.antall,
      m3: listProps.m3,
      status: listProps.status,
      post: listProps.post,
      xLog: listProps.xLog,
      bredde: listProps.bredde,
      prosent: listProps.prosent,
      anm: listProps.anm,
      anm2: listProps.anm2,
      VS66Blad: listProps.VS66Blad,
      vs66: listProps.vs66,
      vs66Br: listProps.vs66Br,
      mkvBord: listProps.mkvBord,
      mkvBordBr: listProps.mkvBordBr,
      blad: listProps.blad,
      sortering: listProps.sortering,
      kode: listProps.kode,
      dimensjon: listProps.dimensjon,
      torke: listProps.torke,
      anmerk: listProps.anmerk,
      destinasjon: listProps.destinasjon,
      text: listProps.text,
      buffer: listProps.buffer,
      progress: listProps.progress,
      createdAt: new Date(),
      updatedAt: new Date(),
      order: 0,
    });
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    const list = skurliste.find((list) => list.id === id);
    if (list) {
      setListProps({
        id: list.id,
        treslag: list.treslag,
        klasse: list.klasse,
        klGrense: list.klGrense,
        klType: list.klType,
        postNr: list.postNr,
        antall: list.antall,
        m3: list.m3,
        status: list.status,
        post: list.post,
        xLog: list.xLog,
        bredde: list.bredde,
        prosent: list.prosent,
        anm: list.anm,
        anm2: list.anm2,
        VS66Blad: list.VS66Blad,
        vs66: list.vs66,
        vs66Br: list.vs66Br,
        mkvBord: list.mkvBord,
        mkvBordBr: list.mkvBordBr,
        blad: list.blad,
        sortering: list.sortering,
        kode: list.kode,
        dimensjon: list.dimensjon,
        torke: list.torke,
        anmerk: list.anmerk,
        destinasjon: list.destinasjon,
        text: list.text,
        buffer: list.buffer,
        createdAt: new Date(),
        updatedAt: new Date(),
        order: maxOrder,
        progress: list.progress,
      });
    }
  };

  const [getAllBlades, setGetAllBlades] = useState("");

  const clickSearch = (post: SkurlisteItem) => {
    setSearchInput(`${post.post}-${post.prosent}%-${post.blad.toFixed(1)}`);
    setClickSearchOpen(true);
    setPostInfoWrite(`${post.post}x${post.bredde} ${post.blad.toFixed(1)}`);
    setGetAllBlades(`${post.post}-${post.prosent}%`);
  };
  useEffect(() => {
    if (searchInputAll) {
      setSearchInput(getAllBlades);
    }
  }, [searchInputAll]);

  useEffect(() => {
    if (edit) {
      setListProps((prevProps: SkurlisteItem) => ({
        ...prevProps,
        order: maxOrder,
      }));
    }
  }, [maxOrder]);

  return (
    <div>
      {edit && (
        <>
          <button
            className="btn btn-xs bg-info text-white"
            onClick={() => setBufferStatus(!bufferStatus)}
          >
            {bufferStatus ? "Skjul buffer" : "Vis Buffer"}
          </button>
          <h1
            className={`${!bufferStatus ? "text-neutral" : "text-2xl text-red-500"}`}
          >
            {bufferStatus ? "Buffer" : "Skurplan"}
          </h1>
        </>
      )}
      <div className="overflow-scroll">
        {listLoad && (
          <div className="text-primary">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        <table className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-secondary">
          <thead>
            <tr className=" border border-l-base-100 border-r-base-100 border-t-base-100 text-left">
              <th className="text-sm text-primary">Treslag</th>
              <th className="text-sm text-primary">Klassegrense</th>
              <th className="text-sm text-primary">Kl</th>
              <th className="text-sm text-primary">PostNr.</th>
              <th className="text-sm text-primary">Antall</th>

              <th className="text-sm text-primary">M3</th>
              <th className="text-sm text-primary">Status</th>
              <th className="text-sm text-primary">Uttak</th>
              <th className="text-sm text-primary">X-log</th>
              <th className="text-sm text-primary">%</th>
              <th className="text-sm text-primary">Anm</th>
              <th className="text-sm text-primary">VS66</th>
              <th className="text-sm text-primary">Bredde VS66</th>
              <th className="text-sm text-primary">MKV</th>
              <th className="text-sm text-primary">Bredde MKV</th>
              <th className="text-sm text-primary">Blad</th>
            </tr>
          </thead>
          <tbody>
            {skurliste?.map((list) => {
              const getProgressClass = (progress: string) => {
                switch (progress) {
                  case "aktiv":
                    return "bg-accent";
                  case "fullført":
                    return "bg-neutral";
                  case "":
                    return "bg-base-100";
                }
              };
              return (
                <>
                  <tr
                    onClick={!edit ? () => clickSearch(list) : undefined}
                    className={`border border-gray-700 border-l-transparent border-r-transparent  hover:cursor-pointer hover:bg-neutral ${getProgressClass(list.progress)}`}
                  >
                    <td
                      className={`py-5 font-bold ${list.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                    >
                      {list.treslag}

                      <div className="text-xs font-normal italic text-primary">
                        {dateFormat(list.createdAt, "dd.mm.yyyy HH:MM")}
                      </div>
                    </td>

                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.klGrense}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.klasse}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.postNr}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.antall}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">{list.m3}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div
                            className={`text-xs text-primary ${list.status === "stopp" ? "text-red-500" : "text-green-500"}`}
                          >
                            {list.status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs font-bold text-primary">
                            {list.post}x{list.bredde}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.xLog}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.prosent}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-blue-500">
                            {list.anm}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.vs66}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.vs66Br}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.mkvBord}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.mkvBordBr}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-primary">
                            {list.blad.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </td>
                    {edit && (
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div>
                            <button
                              onClick={() => handleEdit(list.id)}
                              className="btn btn-xs bg-warning text-black"
                            >
                              Rediger
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {edit && list.id !== editingId && !list.buffer && (
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div>
                            <button
                              onClick={() => updateBufferHandler(list.id)}
                              className="btn btn-xs bg-info text-white"
                            >
                              Til buffer
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {edit && list.id !== editingId && list.buffer && (
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div>
                            <button
                              onClick={() => updateBufferHandlerFalse(list.id)}
                              className="btn btn-xs bg-info text-white"
                            >
                              Legg til i listen
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {edit && list.id !== editingId && (
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div>
                            <button
                              onClick={() => handleDelete(list.id)}
                              className="btn btn-xs bg-red-500 text-white"
                            >
                              Slett
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {edit && list.id === editingId && (
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div>
                            <button
                              onClick={() => handleEditExecute(list.id)}
                              className="btn btn-xs bg-green-500 text-white"
                            >
                              Oppdater
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {edit && list.id === editingId && (
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div>
                            <button
                              onClick={() => setEditingId(null)}
                              className="btn btn-xs bg-blue-500 text-white"
                            >
                              Avbryt
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {edit && (
                      <div className="flex items-center justify-center">
                        <td className="flex h-full items-center">
                          <FaArrowAltCircleUp
                            onClick={() => moveUp(list.id)}
                            className="text-lg text-green-600"
                          />
                        </td>
                        <td className="flex h-full items-center">
                          <FaArrowAltCircleDown
                            onClick={() => moveDown(list.id)}
                            className="text-lg text-green-600"
                          />
                        </td>
                      </div>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkurlisteComponent;
