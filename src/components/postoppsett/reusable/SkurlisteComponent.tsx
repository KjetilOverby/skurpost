/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import dateFormat from "dateformat";
import { set } from "zod";

const SkurlisteComponent = ({
  skurliste,
  edit,
  deletePost,
  editPost,
  listProps,
  setListProps,
}) => {
  const handleDelete = (id: string) => {
    deletePost.mutate({ id: id });
  };

  const [editingId, setEditingId] = useState(null);

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
    });
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    const list = skurliste.find((list) => list.id === id);
    setListProps({
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
    });
  };
  return (
    <div>
      {" "}
      <table className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-blue-200">
        <thead>
          <tr className=" border border-l-base-100 border-r-base-100 text-left">
            <th className="text-sm text-neutral">Treslag</th>
            <th className="text-sm text-neutral">Klassegrense</th>
            <th className="text-sm text-neutral">Kl</th>
            <th className="text-sm text-neutral">PostNr.</th>
            <th className="text-sm text-neutral">Antall</th>

            <th className="text-sm text-neutral">M3</th>
            <th className="text-sm text-neutral">Status</th>
            <th className="text-sm text-neutral">Uttak</th>
            <th className="text-sm text-neutral">X-log</th>
            <th className="text-sm text-neutral">%</th>
            <th className="text-sm text-neutral">Anm</th>
            <th className="text-sm text-neutral">VS66</th>
            <th className="text-sm text-neutral">Bredde VS66</th>
            <th className="text-sm text-neutral">MKV</th>
            <th className="text-sm text-neutral">Bredde MKV</th>
            <th className="text-sm text-neutral">Blad</th>
          </tr>
        </thead>
        <tbody>
          {skurliste?.map((list) => {
            return (
              <>
                <tr className="border border-primary bg-base-100 hover:cursor-pointer hover:bg-primary">
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
                        <div className="text-xs text-neutral">
                          {list.klGrense}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.klasse}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.postNr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.antall}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">{list.m3}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
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
                        <div className="text-xs text-neutral">{list.xLog}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
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
                        <div className="text-xs text-neutral">{list.vs66}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.vs66Br}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.mkvBord}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
                          {list.mkvBordBr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xs text-neutral">
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
                            className="btn btn-xs bg-warning"
                          >
                            Rediger
                          </button>
                        </div>
                      </div>
                    </td>
                  )}
                  {edit && list.id !== editingId && (
                    <td className="py-5">
                      <div className="flex items-center space-x-3">
                        <div>
                          <button className="btn btn-xs bg-info text-white">
                            Buffer
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
