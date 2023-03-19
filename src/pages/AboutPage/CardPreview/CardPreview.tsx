import React, { FC } from "react";
import { ReactComponent as ArrowBis } from "../../../assets/icons/ArrowBis.svg";

type CardPreviewProps = {
  setShowCard: Function;
  question: string;
  setCurrentTitle: Function;
};

const CardPreview: FC<CardPreviewProps> = ({
  setCurrentTitle,
  setShowCard,
  question,
}) => {
  return (
    <div className="flex h-[160px] flex-col justify-between  rounded-2xl border-[0.5px] border-solid border-borderCardAbout bg-white p-[20px] ">
      <div>
        <div className="gap-[8px] text-base font-semibold">{question}</div>
        <div className="text-sm font-normal leading-[18px] text-[#000000B2]">
          Stoa Credit allows you to use up to 25% of the value of your balance
          whilst still earning interest on your full deposit.
        </div>
      </div>

      <div
        className="flex items-center gap-[6px]  text-sm font-normal text-pink hover:cursor-pointer"
        onClick={() => {
          setCurrentTitle(question);
          setShowCard(true);
        }}
      >
        Learn More
        <ArrowBis />
      </div>
    </div>
  );
};

export default CardPreview;
