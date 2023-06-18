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
                COFI is a low-risk yield-generation platform powered by our 1:1
                backed stablecoins. We believe in helping our costumers make
                their crypto work harder for them in a compliant safe
                environment. Join us!
              </div>
            </div>
            <div className="flex flex-row items-center  gap-4">
              <TelegramLogo className="cursor-pointer" />
              <TwiterLogo className="cursor-pointer" />
              <TiktokLogo className="cursor-pointer" />
              <YoutubeLogo className="cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col text-base font-medium text-[#FFFFFFB2]">
            <div>
              <div className=" p-2 opacity-20">Ressources:</div>
              <div className="cursor-pointer  p-2">Tech Docs</div>
              <div className="cursor-pointer p-2">KYC Policy</div>
              <div className="cursor-pointer p-2">About Us</div>
            </div>
            <div>
              <div className=" p-2 opacity-20">Contact us on</div>
              <div className="cursor-pointer p-2">mike@stoa.money</div>
              <div className="cursor-pointer p-2">sam@stoa.money</div>
            </div>
          </div>
        </div>

        <div className="borderTop flex h-[44px] items-end justify-between text-sm font-normal ">
          <div className="text-[#667085]">
            © 2023, The Stoa Corporation Ltd. All rights reserved.
          </div>
          <div className="text-[#667085]">Term of Use</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
