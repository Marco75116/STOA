import React, { useContext } from "react";
import ModalOffChainData from "../components/Modals/ModalOffChainData/ModalOffChainData";
import { MainContext } from "../context/Main.context";

const Modals = () => {
  const { showModalForm, setShowModalForm } = useContext(MainContext);

  return (
    <ModalOffChainData isOpen={showModalForm} setIsOpen={setShowModalForm} />
  );
};

export default Modals;
