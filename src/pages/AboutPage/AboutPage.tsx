import React, { useState } from "react";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";
import CardInfo from "./CardInfo/CardInfo";
import CardPreview from "./CardPreview/CardPreview";

const topics = [
  "Framework",
  "Yield farming",
  "DeFi",
  "Vesting",
  "Mestamask wallet",
  "Ethereum wallet",
  "Streaming",
  "Identity verification",
  "Licences & Registration",
  "Terms & Conditions",
];

const questions = [
  "How to found your account?",
  " How to deposit?",
  "How to connect my wallet?",
  "How to found your account?",
  "How to found your account?",
  " How to deposit?",
  "How to connect my wallet?",
  "How to found your account?",
];

const AboutPage = () => {
  const [selectedPart, setSelectedPart] = useState<number>(0);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>("");

  return (
    <div className="mt-[30px] flex h-[calc(100%-64px)] flex-row   justify-center gap-[16px] bg-bgCardNavbar">
      <div className="flex w-[280px] flex-col gap-[6px] rounded-2xl bg-white p-3">
        <form>
          <label className="text-gray-900 sr-only mb-2 text-sm font-medium">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Loop />
            </div>
            <input
              type="search"
              id="default-search"
              className="text-gray-900 border-gray-300 bg-gray-50 block w-full rounded-lg border p-4 pl-10 text-sm"
              placeholder="Search topic..."
              required
            ></input>
          </div>
        </form>

        {topics.map((topic, index) => {
          return (
            <>
              <div
                className={`h-[48px] rounded-lg ${
                  selectedPart === index && "bg-[#0000000D]"
                } p-3 hover:cursor-pointer 
                `}
                onClick={() => {
                  setSelectedPart(index);
                }}
                key={index}
              >
                {topics[index]}
              </div>
              {index === 7 && (
                <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
              )}
            </>
          );
        })}
      </div>

      {!showCard ? (
        <div className="grid max-h-[664px] w-[904px] grid-cols-3 gap-[8px]">
          {questions.map((question, index) => {
            return (
              <CardPreview
                key={index}
                question={question}
                setShowCard={setShowCard}
                setCurrentTitle={setCurrentTitle}
              />
            );
          })}
        </div>
      ) : (
        <CardInfo setShowCard={setShowCard} question={currentTitle} />
      )}
    </div>
  );
};

export default AboutPage;
