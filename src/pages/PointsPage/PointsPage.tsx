import React from "react";
import { ReactComponent as Bulb } from "../../assets/icons/PinkBulb.svg";
import { ReactComponent as PointMainIllustration } from "../../assets/illustrations/PointMainIllustration.svg";
import { ReactComponent as InviteFriendsBtn } from "../../assets/texts/InviteFriendsBtn.svg";
const PointsPage = () => {
  return (
    <div className=" flex min-h-[calc(100%-64px)] flex-col items-center justify-center gap-[16px] bg-bgCardNavbar  py-16">
      <div className=" card h-[532px] gap-5 p-5">
        <PointMainIllustration />
        <div>
          <div className="flex flex-col justify-between  border-r-[0.5px] border-solid border-borderCardAbout py-[20px] ">
            <div className=" flex gap-[4px] text-3xl font-semibold">
              1,000
              <span className="mb-[2px] flex  h-[20px] self-end  text-sm font-normal text-textGray">
                COFI
              </span>
            </div>
            <div className="text-[16px] font-normal text-[#000000B2]">
              My Points
            </div>
          </div>
        </div>
      </div>

      <div className=" flex h-[168px] w-[800px] flex-row justify-between gap-4">
        <div className="card flex flex-1 flex-col justify-between p-5 ">
          <Bulb />
          <div className="gap-[4px]">
            <div className=" text-base font-semibold ">Stoa Tip</div>
            <div className="text-base font-normal">
              Earn points by holding COFI money and in the future by spending it
              on merchant cash backs.
            </div>
          </div>
        </div>

        <div className="card flex flex-1 flex-col justify-between bg-bgFriends p-5">
          <div className="gap-[4px]">
            <div className=" text-base font-semibold ">
              Refer Friends, Earn Rewards!
            </div>
            <div className="text-base font-normal">
              Invite your friends and earn 100 points for each successful
              referral!
            </div>
          </div>
          <InviteFriendsBtn className=" hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
