import React, { FC } from "react";
import { ReactComponent as Back } from "../../../assets/icons/Back.svg";

type CardInfoProps = {
  question: string;
  setShowCard: Function;
};

const CardInfo: FC<CardInfoProps> = ({ question, setShowCard }) => {
  return (
    <div className=" h-[664px] w-[904px] rounded-2xl border-[0.5px] border-solid border-borderCardAbout bg-white">
      <div className="flex flex-row items-center justify-between  p-[20px]">
        <div>
          <Back
            onClick={() => {
              setShowCard(false);
            }}
            className=" hover:cursor-pointer"
          />
          <div className="flex h-[36px] items-center text-xl font-semibold leading-9">
            {question}
          </div>
        </div>
        <div>topic name</div>
      </div>
      <div className=" border-[0.5px] border-solid border-borderCardAbout"></div>
      <div className="p-[20px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud{" "}
      </div>
    </div>
  );
};

export default CardInfo;