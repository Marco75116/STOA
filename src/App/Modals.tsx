import React, { useContext } from "react";
import ModalOffChainData from "../components/Modals/ModalOffChainData/ModalOffChainData";
import { MainContext } from "../context/Main.context";
import ModalModifProfil from "../components/Modals/ModalModifProfil/ModalModifProfil";

const Modals = () => {
  const {
    showModalForm,
    setShowModalForm,
    showModalModifyForm,
    setShowModalModifyForm,
  } = useContext(MainContext);

  return (
    <>
      <ModalOffChainData isOpen={showModalForm} setIsOpen={setShowModalForm} />
      <ModalModifProfil
        isOpen={showModalModifyForm}
        setIsOpen={setShowModalModifyForm}
      />
    </>
  );
};

export default Modals;
