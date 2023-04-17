import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import MintButton from "../../components/MintButton/MintButton";

const TemplatePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex flex-col items-center">
          <h1 className="p-10 text-center text-3xl">
            Tailwind Template test netlify{" "}
          </h1>
          <div onClick={() => setIsOpen(true)} className="w-50 bg-red-200">
            Open modal
          </div>

          <MintButton />
        </div>
      </div>

      <Modal showModal={isOpen} closeFunction={() => setIsOpen(false)}>
        <div className=" pt-6 text-black">Hello I am a modal</div>
      </Modal>
    </>
  );
};

export default TemplatePage;
