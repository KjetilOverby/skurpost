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
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { set } from "zod";

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

  const newPostHandler = () => {
    setEditMode(true);
    if (setPostId) {
      setPostId("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-accent p-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="text-primary">
            Menu
          </button>
          {isOpen && (
            <div className="absolute left-0 z-10 mt-2 w-72 rounded-md bg-accent py-1 shadow-lg">
              {!editMode && (
                <>
                  <div
                    onClick={editHandler}
                    className="align-center flex cursor-pointer px-4 py-2 text-primary hover:bg-neutral"
                  >
                    <FaRegEdit className="mr-3 text-xl" />
                    <p className="block">Rediger post</p>
                  </div>
                  <div
                    onClick={newPostHandler}
                    className="align-center flex cursor-pointer px-4 py-2 text-primary hover:bg-neutral"
                  >
                    <MdOutlineCreateNewFolder className="mr-3 text-xl" />
                    <p className="block ">Lag ny post</p>
                  </div>
                </>
              )}
              <EditMode editMode={editMode}>
                <div
                  onClick={cancelBtn}
                  className="align-center flex cursor-pointer px-4 py-2 text-primary hover:bg-neutral"
                >
                  <CiLogout className="mr-3 text-xl" />
                  <p className="block cursor-pointer  text-primary ">Avbryt</p>
                </div>
                <div
                  onClick={resetPostHandler}
                  className="align-center flex cursor-pointer px-4 py-2 text-primary hover:bg-neutral"
                >
                  <BiReset className="mr-3 text-xl" />
                  <p className="block">Nullstill post</p>
                </div>
                <div
                  onClick={resetUtfyllingHandler}
                  className="align-center flex cursor-pointer px-4 py-2 text-primary hover:bg-neutral"
                >
                  <RiDeleteBin3Line className="mr-3 text-xl" />
                  <p className="block">Nullstill utfylling</p>
                </div>
                {!updateDisabled && postId != "" && (
                  <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
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
                  <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
                    <FaSave className="mr-3 text-xl" />
                    <a
                      onClick={createData}
                      href="#"
                      className="block cursor-pointer "
                    >
                      Lagre som ny post
                    </a>
                  </div>
                )}

                {postId && (
                  <>
                    <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
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
                  </>
                )}
              </EditMode>
              <hr className="mx-5 my-2 border-primary" />
              <Link href="/">
                <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
                  <IoHomeOutline className="mr-3 text-xl" />
                  <p className="block">Hjem</p>
                </div>
              </Link>
              <Link href="/list">
                <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
                  <FaClipboardList className="mr-3 text-xl" />
                  <p className="block">Skurliste</p>
                </div>
              </Link>
              <Link href="/create/listcreator">
                <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
                  <FaRegEdit className="mr-3 text-xl" />
                  <p className="block">Rediger skurliste</p>
                </div>
              </Link>
              <Link href="/innstillinger">
                <div className="align-center flex px-4 py-2 text-primary hover:bg-neutral">
                  <IoSettingsOutline className="mr-3 text-xl" />
                  <p className="block ">Innstillinger</p>
                </div>
              </Link>
            </div>
          )}
        </div>
        <h1 className="text-primary">Postoppsett</h1>
      </div>
    </nav>
  );
};

export default EditHeader;
