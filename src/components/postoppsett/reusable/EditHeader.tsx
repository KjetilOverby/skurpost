import React, { useState } from "react";
import { EditMode } from "../modes/editMode";
import Link from "next/link";

const EditHeader = ({
  setEditMode,
  editMode,
  handleUpdate,
  createData,
  handleDelete,
  resetPostHandler,
  resetUtfyllingHandler,
  setAlertShown,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const cancelBtn = () => {
    setAlertShown(false);
    setEditMode(false);
  };

  return (
    <nav className="bg-accent p-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            Menu
          </button>
          {isOpen && (
            <div
              className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-accent py-1 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              {!editMode && (
                <>
                  <a
                    onClick={() => setEditMode(true)}
                    className="block cursor-pointer px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                  >
                    Rediger post
                  </a>
                  <Link href="/list">
                    <p className="block cursor-pointer px-4 py-2 text-primary hover:bg-gray-600 hover:text-white">
                      Skurliste
                    </p>
                  </Link>
                </>
              )}
              <EditMode editMode={editMode}>
                <a
                  onClick={cancelBtn}
                  className="block cursor-pointer px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                >
                  Avbryt
                </a>
                <a
                  onClick={resetPostHandler}
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                >
                  Nullstill
                </a>
                <a
                  onClick={resetUtfyllingHandler}
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                >
                  Nullstill utfylling
                </a>
                <a
                  onClick={handleUpdate}
                  className="block cursor-pointer px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                >
                  Oppdater post
                </a>
                <a
                  onClick={createData}
                  href="#"
                  className="block cursor-pointer px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                >
                  Lagre som ny post
                </a>
                <a
                  onClick={handleDelete}
                  href="#"
                  className="block cursor-pointer px-4 py-2 text-red-400 hover:bg-gray-600 hover:text-white"
                >
                  Slett post
                </a>
              </EditMode>
            </div>
          )}
        </div>
        <h1 className="text-white">Postoppsett</h1>
      </div>
    </nav>
  );
};

export default EditHeader;
