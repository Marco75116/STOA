import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TokenName } from "../../../utils/types/swap.types";
import { ReactComponent as ThreeDots } from "../../../assets/icons/three-dots-svgrepo-com.svg";
import { MainContext } from "../../../context/Main.context";
import { useNavigate } from "react-router-dom";
import {
  getDailyYield,
  getEarnings,
} from "../../../utils/helpers/earnings.helper";

type BalanceFIProps = {
  balanceFi: number;
  TokenLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  tokenName: TokenName;
  apy: number;
  deposit: number;
};

const BalanceFI: FC<BalanceFIProps> = ({
  balanceFi,
  TokenLogo,
  tokenName,
  apy,
  deposit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const { setShowTransak, setIsOpenModalSwap, setAction } =
    useContext(MainContext);
  const navigate = useNavigate();

  const dailyYield = useMemo(() => {
    return getDailyYield(balanceFi, apy);
  }, [balanceFi, apy]);

  const earnings = useMemo(() => {
    return getEarnings(balanceFi, deposit);
  }, [balanceFi, deposit]);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className=" flex flex-row justify-between rounded-xl  bg-gray-100 px-7 py-4">
      <div>
        <div className="center flex flex-row gap-3">
          <TokenLogo width={44} height={44} />
          <div>
            <span className="text-xl ">{tokenName}</span>
            <div>
              Balance : {balanceFi.cofiFormatFloor(1)} &nbsp; &nbsp; &nbsp;
              Deposit : {deposit} &nbsp; &nbsp; &nbsp; Earnings:{" "}
              {earnings.cofiFormatFloor(1)}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="center flex flex-row gap-5">
        <div>
          <div>Current Apy : {apy.toPercentageFormat(1)}%</div>
          <div>Daily Yield : ${dailyYield.cofiFormatFloor(2)}</div>
        </div>
        <div ref={modalRef} className="center relative  cursor-pointer ">
          <ThreeDots
            width={34}
            height={34}
            className=" h-12 w-12 rotate-90 rounded-[50%] bg-slate-50 p-4 shadow-md"
            onClick={() => {
              setShow((prev) => !prev);
            }}
          />
          {show && (
            <div className="absolute top-[100%] z-10 rounded-xl bg-white ">
              <div
                className="cursor-pointer rounded-se-xl rounded-ss-xl px-3 py-2 hover:bg-slate-200"
                onClick={() => {
                  setShowTransak(true);
                  navigate("/Swap");
                }}
              >
                Buy
              </div>
              <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
              <div
                className="cursor-pointer px-3  py-2 hover:bg-slate-200"
                onClick={() => {
                  setIsOpenModalSwap(true);
                  navigate("/Swap");
                }}
              >
                Deposit
              </div>
              <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
              <div
                className="cursor-pointer rounded-ee-xl  rounded-es-xl px-3 py-2 hover:bg-slate-200"
                onClick={() => {
                  setAction(1);
                  setIsOpenModalSwap(true);
                  navigate("/Swap");
                }}
              >
                Redeem
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceFI;
