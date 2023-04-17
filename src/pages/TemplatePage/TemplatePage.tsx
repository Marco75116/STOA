import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import MintButton from "../../components/MintButton/MintButton";
import Graph from "../../components/Graph/Graph";

const TemplatePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex flex-col items-center">
          <h1 className="p-10 text-center text-3xl">
            Tailwind Template test netlify{" "}
          </h1>
          <div
            onClick={() => setIsOpen(true)}
            className="w-50 bg-pink-200 hover:bg-pink-300 animate-bounce cursor-pointer rounded-md p-4 shadow-lg"
          >
            Open modal
          </div>

          <MintButton />
          <br />
          <Graph />
        </div>
      </div>

      <Modal showModal={isOpen} closeFunction={() => setIsOpen(false)}>
        <div className="pt-6 text-black ">Hello I am a modal</div>
      </Modal>
    </>
  );
};

export default TemplatePage;
