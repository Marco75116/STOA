import React, { useState } from "react";
import ModalVault from "../../components/ModalVault/ModalVault";
import { ReactComponent as RedBulb } from "../../assets/icons/RedBulb.svg";
import VaultOpenedPage from "./VaultOpenedPage/VaultOpenedPage";

const VaultsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);

  return (
    <>
      {!isVaultOpen ? (
        <div className="flex h-[calc(100%-64px)] flex-col items-center justify-center gap-[15px]">
          <ModalVault
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsVaultOpen={setIsVaultOpen}
          />
          <div className=" flex h-[156px] w-[459px] flex-col justify-between  rounded-2xl border-[0.5px] border-solid border-borderCardAbout bg-white p-5">
            <RedBulb />
            <div className="gap-[8px]">
              <div className=" text-base font-semibold ">
                Deposit and Borrow
              </div>
              <div className="text-[14px] font-normal text-[#000000B2]">
                Stoa Vaults enable you to borrow credit against your
                yield-bearing stablecoins, and earn more points. See here for
                more details.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VaultOpenedPage />
      )}
    </>
  );
};

export default VaultsPage;
