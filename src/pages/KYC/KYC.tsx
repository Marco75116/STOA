import React, { useContext, useMemo, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { WalletContext } from "../../context/Wallet.context";
import apiKYC from "../../utils/services/apiSumsub";
import { useAccount, useSignMessage } from "wagmi";
import { MainContext } from "../../context/Main.context";

const KYC = () => {
  const { applicantExist, kycDone } = useContext(WalletContext);
  const { setShowModalConnexion } = useContext(MainContext);

  const { isConnected, address } = useAccount();
  const { signMessage } = useSignMessage({
    message: "Verify your account",
    onSuccess(data) {
      Verify(data);
    },
  });

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
      email: address,
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
    [address]
  );

  const Verify = async (data: string) => {
    const signature = data;

    if (!applicantExist) {
      await apiKYC.createApplicant({
        externalUserId: address,
      });
    }
    const token = await apiKYC.createToken({
      externalUserId: signature as any,
    });
    setAccessSDKToken(token.data.token);
  };

  const openWalletPopup = () => {
    setShowModalConnexion(true);
  };

  return (
    <div className=" flex min-h-[calc(100%-64px)] w-[100] flex-col justify-center gap-8  bg-bgCardNavbar">
      {!kycDone && (
        <div className=" mt-6 text-center">Verify your Identity</div>
      )}

      {isConnected ? (
        !accessSDKToken ? (
          !kycDone && (
            <>
              <div className="center">
                <div
                  className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer"
                  onClick={() => {
                    signMessage();
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
