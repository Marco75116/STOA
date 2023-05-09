import React from "react";
import { ReactComponent as CofiFooter } from "../../assets/logos/cofiFooter.svg";
import { ReactComponent as TelegramLogo } from "../../assets/logos/TelegramLogo.svg";
import { ReactComponent as YoutubeLogo } from "../../assets/logos/YoutubeLogo.svg";
import { ReactComponent as TiktokLogo } from "../../assets/logos/TiktokLogo.svg";
import { ReactComponent as TwiterLogo } from "../../assets/logos/TwiterLogo.svg";

const Footer = () => {
  return (
    <div className=" min-h-[332px] w-[100%] bg-darkgreen px-[120px] pb-[24px] pt-[40px]">
      <div className="flex flex-col gap-12">
        <div className="flex justify-between">
          <div className=" flex max-w-[255px] flex-col gap-6">
            <div className="flex flex-col gap-4">
              <CofiFooter />
              <div className=" text-sm font-normal text-white">
                Our community is building a comprehensive decentralized trading
                platform for the future of finance. Join us!
              </div>
            </div>
            <div className="flex flex-row items-center  gap-4">
              <TelegramLogo className="cursor-pointer" />
              <TwiterLogo className="cursor-pointer" />
              <TiktokLogo className="cursor-pointer" />
              <YoutubeLogo className="cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-16 text-base font-medium text-[#FFFFFFB2]">
            <div>
              <div className="cursor-pointer">Analytics</div>
              <div className="cursor-pointer">User Docs</div>
              <div className="cursor-pointer">Technical Docs</div>
              <div className="cursor-pointer">Github</div>
            </div>
            <div>
              <div className="cursor-pointer">About Us</div>
              <div className="cursor-pointer">Partners</div>
              <div className="cursor-pointer">Yield Finance</div>
              <div className="cursor-pointer">Ethereum</div>
            </div>
          </div>
        </div>

        <div className="borderTop flex h-[44px] items-end justify-between text-sm font-normal ">
          <div className="text-[#FFFFFF66]">
            Copyright © 2023 Stoa. All right reserved.
          </div>
          <div className="text-[#FFFFFFB2]">Term of Use</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
