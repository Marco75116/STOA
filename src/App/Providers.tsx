import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletProvider from "../context/Wallet.context";
import MainProvider from "../context/Main.context";
import SwapProvider from "../context/Swap.context";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <WalletProvider>
          <SwapProvider>{children}</SwapProvider>
        </WalletProvider>
      </MainProvider>
    </QueryClientProvider>
  );
};

export default Providers;
