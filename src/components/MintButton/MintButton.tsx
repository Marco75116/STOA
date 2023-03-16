import React from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { abiFBAYC } from "../../utils/constants/abi/FBAYC";
import { addressFBAYC } from "../../utils/constants/address/FBAYC";

const MintButton = () => {
  const { config } = usePrepareContractWrite({
    address: addressFBAYC,
    abi: abiFBAYC,
    functionName: "claimAToken",
  });

  const { write } = useContractWrite(config);

  return (
    <div className="m-5">
      <button disabled={!write} onClick={() => write?.()}>
        Mint
      </button>
    </div>
  );
};

export default MintButton;
