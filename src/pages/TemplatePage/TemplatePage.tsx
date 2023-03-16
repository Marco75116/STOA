import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import ConnectButton from "../../components/ConnectButton/ConnectButton";
import MintButton from "../../components/MintButton/MintButton";

const TemplatePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen w-screen flex-col bg-yellow-100">
        <div className="flex justify-end bg-blue-100 p-4">
          <ConnectButton />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="p-10 text-center text-3xl">Tailwind Template </h1>
          <div
            onClick={() => setIsOpen(true)}
            className="w-50 animate-bounce cursor-pointer rounded-md bg-pink-200 p-4 shadow-lg hover:bg-pink-300"
          >
            Open modal
          </div>

          <MintButton />
        </div>
      </div>

      <Modal showModal={isOpen} closeFunction={() => setIsOpen(false)}>
        <div className="pt-6 text-black">Hello I am a modal</div>
      </Modal>
    </>
  );
};

export default TemplatePage;
