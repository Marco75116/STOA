import React, { useContext, useMemo, useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { WalletContext } from "../../context/Wallet.context";
import api from "../../utils/service/apiSumsub";
import { getKycDone } from "../../utils/helpers/global.helper";

const KYC = () => {
  const { currentWalletAddress, applicantExist, setIsOpenWallet, review } =
    useContext(WalletContext);
  const [accessSDKToken, setAccessSDKToken] = useState<string>();

  const handler = () => Promise.resolve<string>("");

  const options = { addViewportTag: false, adaptIframeHeight: true };
  const messageHandler = (type: String, payload: any) => {
    console.log("onMessage: ", type, payload);
  };
  const errorHandler = (data: any) => console.log("onError: ", data);

  const config = useMemo(
    () => ({
      lang: "en",
      email: currentWalletAddress,
      i18n: {
        document: {
          subTitles: {
            IDENTITY: "Upload a document that proves your identity",
          },
        },
        status: {
          pendingTitle:
            "Thank you. \n\n You have completed the identity verification process.",
          pendingText:
            " The verification status will update below automatically. You can now close this page. We will follow-up with you if we need anything else or have any questions.",
        },
      },
      onMessage: (type: String, payload: any) => {
        console.log("WebSDK onMessage", type, payload);
      },
      uiConf: {
        customCss: `${window.location.origin}/sumsubWebsdk.css`,
      },
      onError: (error: String) => {
        console.error("WebSDK onError", error);
      },
    }),
    [currentWalletAddress]
  );

  const onClickVerify = async () => {
    if (!applicantExist) {
      await api.createApplicant({
        externalUserId: currentWalletAddress,
      });
    }
    const token = await api.createToken({
      externalUserId: currentWalletAddress,
    });
    setAccessSDKToken(token.data.token);
  };

  const openWalletPopup = () => {
    setIsOpenWallet((prev: boolean) => !prev);
  };

  const kycDone = useMemo(() => {
    return getKycDone(review);
  }, [review]);

  useEffect(() => {
    {
      kycDone && onClickVerify();
    }
  }, [kycDone]);

  return (
    <div className=" flex min-h-[calc(100%-64px)] w-[100] flex-col justify-center gap-8  bg-bgCardNavbar">
      {!kycDone && (
        <div className=" mt-6 text-center">Verify your Identity</div>
      )}

      {currentWalletAddress !== "" ? (
        !accessSDKToken ? (
          !kycDone && (
            <>
              <div className="center">
                <div
                  className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer"
                  onClick={() => {
                    onClickVerify();
                  }}
                >
                  Click to proceed
                </div>
              </div>
            </>
          )
        ) : (
          <SumsubWebSdk
            accessToken={accessSDKToken}
            expirationHandler={handler}
            config={config}
            options={options}
            onMessage={messageHandler}
            onError={errorHandler}
          />
        )
      ) : (
        <div className="center">
          <div
            className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer"
            onClick={() => {
              openWalletPopup();
            }}
          >
            Connect Wallet
          </div>
        </div>
      )}
    </div>
  );
};

export default KYC;
