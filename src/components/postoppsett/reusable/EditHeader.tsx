import React, { useState, useContext } from "react";
import { EditMode } from "../modes/editMode";
import Link from "next/link";
import Modal from "./Modal";
import { PostInfoContext } from "../../context";
import { CiLogout } from "react-icons/ci";
import { BiReset } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";
import { FaSave } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { PiStarThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

interface EditHeaderProps {
  setEditMode: (mode: boolean) => void;
  editMode: boolean;
  handleUpdate: () => void;
  createData: () => void;
  handleDelete: () => void;
  resetPostHandler: () => void;
  resetUtfyllingHandler: () => void;
  setAlertShown: (shown: boolean) => void;
  saveDiasabled: boolean;
  updateDisabled: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const EditHeader: React.FC<EditHeaderProps> = ({
  setEditMode,
  editMode,
  handleUpdate,
  createData,
  handleDelete,
  resetPostHandler,
  resetUtfyllingHandler,
  setAlertShown,
  saveDiasabled,
  updateDisabled,
  isOpen,
  setIsOpen,
}) => {
  const cancelBtn = () => {
    setAlertShown(false);
    setEditMode(false);
    setIsOpen(false);
  };

  const editHandler = () => {
    setEditMode(true);
    setIsOpen(false);
  };
  const context = useContext(PostInfoContext);

  const { setPostId, postId } = context ?? {};

  return (
    <nav className="bg-accent p-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            Menu
          </button>
          {isOpen && (
            <div className="absolute left-0 z-10 mt-2 w-72 rounded-md bg-accent py-1 shadow-lg">
              {!editMode && (
                <>
                  <div
                    onClick={editHandler}
                    className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white"
                  >
                    <FaRegEdit className="mr-3 text-xl" />
                    <p className="block cursor-pointer text-primary ">
                      Rediger post
                    </p>
                  </div>
                </>
              )}
              <EditMode editMode={editMode}>
                <div
                  onClick={cancelBtn}
                  className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white"
                >
                  <CiLogout className="mr-3 text-xl" />
                  <p className="block cursor-pointer  text-primary ">Avbryt</p>
                </div>
                <div
                  onClick={resetPostHandler}
                  className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white"
                >
                  <BiReset className="mr-3 text-xl" />
                  <p className="block">Nullstill post</p>
                </div>
                <div
                  onClick={resetUtfyllingHandler}
                  className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white"
                >
                  <RiDeleteBin3Line className="mr-3 text-xl" />
                  <p className="block">Nullstill utfylling</p>
                </div>
                {!updateDisabled && (
                  <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                    <VscSaveAs className="mr-3 text-xl" />
                    <Modal
                      id="update"
                      setIsOpen={setIsOpen}
                      title="Oppdatere posten"
                      description="ADVARSEL! Oppdatering vil overskrive opprinnelig data."
                      name="Oppdater post"
                      actionTxt="Oppdater"
                      action={handleUpdate}
                    />
                  </div>
                )}
                {saveDiasabled && (
                  <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                    <FaSave className="mr-3 text-xl" />
                    <a
                      onClick={createData}
                      href="#"
                      className="block cursor-pointer text-primary hover:bg-gray-600 hover:text-white"
                    >
                      Lagre som ny post
                    </a>
                  </div>
                )}

                {postId && (
                  <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                    <RiDeleteBin6Line className="mr-3 text-xl" />
                    <Modal
                      id="delete"
                      setIsOpen={setIsOpen}
                      title="Slette post"
                      description="ADVARSEL! Sletting vil fjerne posten permanent."
                      name="Slett post"
                      actionTxt="Slett"
                      action={handleDelete}
                    />
                  </div>
                )}
              </EditMode>
              <hr className="mx-5 my-2 border-primary" />
              <Link href="/">
                <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                  <PiStarThin className="mr-3 text-xl" />
                  <p className="block">Startside</p>
                </div>
              </Link>
              <Link href="/list">
                <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                  <FaClipboardList className="mr-3 text-xl" />
                  <p className="block">Skurliste</p>
                </div>
              </Link>
              <Link href="/create/listcreator">
                <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                  <FaRegEdit className="mr-3 text-xl" />
                  <p className="block">Rediger skurliste</p>
                </div>
              </Link>
              <Link href="/innstillinger">
                <div className="align-center flex px-4 py-2 hover:bg-gray-600 hover:text-white">
                  <IoSettingsOutline className="mr-3 text-xl" />
                  <p className="block ">Innstillinger</p>
                </div>
              </Link>
            </div>
          )}
        </div>
        <h1 className="text-white">Postoppsett</h1>
      </div>
    </nav>
  );
};

export default EditHeader;
