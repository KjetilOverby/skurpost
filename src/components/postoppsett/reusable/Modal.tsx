import React from "react";

interface ModalProps {
  id: string; // Add the id property
  name: string;
  title: string;
  description: string;
  setIsOpen: (isOpen: boolean) => void;
  action: () => void;
  actionTxt: string;
}

const Modal: React.FC<ModalProps> = ({
  id,
  name,
  title,
  description,
  setIsOpen,
  action,
  actionTxt,
}) => {
  const openHandler = () => {
    const modal = document.getElementById(id); // Use the dynamic id
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
    setIsOpen(true);
  };
  return (
    <div>
      <button className="w-full pr-16 text-primary " onClick={openHandler}>
        {name}
      </button>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-accent">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={action} className="btn mr-5">
                {actionTxt}
              </button>
              <button className="btn">Avbryt</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
