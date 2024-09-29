import React from "react";

interface ModalProps {
  name: string;
  title: string;
  description: string;
  setIsOpen: (isOpen: boolean) => void;
  action: () => void;
  actionTxt: string;
}

const Modal: React.FC<ModalProps> = ({
  name,
  title,
  description,
  setIsOpen,
  action,
  actionTxt,
}) => {
  const openHandler = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
    setIsOpen(true);
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="my-3 ml-3" onClick={openHandler}>
        {name}
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
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
