import React from "react";
import { ReactComponent as Bulb } from "../../assets/icons/PinkBulb.svg";
import { ReactComponent as PointMainIllustration } from "../../assets/illustrations/PointMainIllustration.svg";
import { ReactComponent as InviteFriendsBtn } from "../../assets/texts/InviteFriendsBtn.svg";
import { ReactComponent as PlusFriends } from "../../assets/icons/PlusFriends.svg";

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

      <div className=" card w-[800px] space-y-5 p-5">
        <div className="flex flex-row justify-between">
          <div>My Referrals</div>
          <div className="center flex-row gap-2 rounded-lg border p-[6px]">
            <PlusFriends /> Invite Friends
          </div>
        </div>
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className=" border-b text-xs uppercase text-[#00000066]">
                <tr>
                  <th scope="col" className="w-[310px] py-4 text-xs">
                    Address
                  </th>
                  <th scope="col" className="w-[310px] py-4 text-xs">
                    Date
                  </th>
                  <th scope="col" className="py-4 text-xs">
                    Point
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b bg-white text-base font-normal  dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="   py-4">
                    0xB7d2...2845
                  </th>
                  <td className=" py-4">05.05.2023</td>
                  <td className=" py-4">-</td>
                </tr>
                <tr className="border-b bg-white text-base font-normal  dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="   py-4">
                    0xB7d2...2845
                  </th>
                  <td className=" py-4">05.05.2023</td>
                  <td className=" py-4">100</td>
                </tr>
                <tr className="border-b bg-white text-base  dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="   py-4">
                    0xB7d2...2845
                  </th>
                  <td className=" py-4">05.05.2023</td>
                  <td className=" py-4">100</td>
                </tr>
                <tr className="bg-white text-base font-normal  dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="   py-4">
                    0xB7d2...2845
                  </th>
                  <td className=" py-4">05.05.2023</td>
                  <td className=" ">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
