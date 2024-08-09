import React, { useState } from "react";
import { EditMode } from "../modes/editMode";

const EditHeader = ({ setEditMode, editMode, handleUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            Menu
          </button>
          {isOpen && (
            <div
              className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-gray-700 py-1 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              {!editMode && (
                <a
                  onClick={() => setEditMode(true)}
                  className="block cursor-pointer px-4 py-2 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  Rediger post
                </a>
              )}
              <EditMode editMode={editMode}>
                <a
                  onClick={() => setEditMode(false)}
                  className="block cursor-pointer px-4 py-2 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  Avbryt
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  Nullstill
                </a>
                <a
                  onClick={handleUpdate}
                  className="block cursor-pointer px-4 py-2 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  Oppdater post
                </a>
                <a
                  href="#"
                  className="block cursor-pointer px-4 py-2 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  Lagre som ny post
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
