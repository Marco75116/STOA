/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect } from "react";
import transakSDK from "@transak/transak-sdk";
import { WalletContext } from "../../../context/Wallet.context";

type ModalTransakProps = {
  showTransak: boolean;
  setShowTransak: Function;
  productsAvailed: string;
};

const ModalTransak: FC<ModalTransakProps> = ({
  showTransak,
  setShowTransak,
  productsAvailed,
}) => {
  const { currentWalletAddress, email } = useContext(WalletContext);

  useEffect(() => {
    if (showTransak) {
      let transak = new transakSDK({
        apiKey: process.env.REACT_APP_KEY_TRANSAK,
        environment: "PRODUCTION",
        network: "optimism",
        walletAddress: currentWalletAddress,
        email: email,
        widgetHeight: "605px",
        widgetWidth: "500px",
        productsAvailed: productsAvailed,
      });
      transak.init();

      // To get all the events
      transak.on(transak.ALL_EVENTS, (data: any) => {
        console.log(data);
      });

      // This will trigger when the user closed the widget
      transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData: any) => {
        transak.close();
        setShowTransak(false);
      });

      // This will trigger when the user marks payment is made
      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
        transak.close();
        setShowTransak(false);
      });
    }
  }, [showTransak]);

  return <div></div>;
};

export default ModalTransak;
