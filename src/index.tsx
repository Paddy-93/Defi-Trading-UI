import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import SignMessage from "./components/SignMessage";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <ConnectButton />
        <SignMessage />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
