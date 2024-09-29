import React, { useState } from "react";
import { EditMode } from "../modes/editMode";
import Link from "next/link";
import Modal from "./Modal";

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
            <div className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-accent py-1 shadow-lg">
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
                {!updateDisabled && (
                  <div>
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
                  <a
                    onClick={createData}
                    href="#"
                    className="block cursor-pointer px-4 py-2 text-primary hover:bg-gray-600 hover:text-white"
                  >
                    Lagre som ny post
                  </a>
                )}
                <div>
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
