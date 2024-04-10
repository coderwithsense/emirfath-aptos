"use client";

import Image from "next/image";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import Wallet from "./wallet/page";

export default function Home() {
  const wallets = [new PetraWallet()];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <Wallet />
      </AptosWalletAdapterProvider>
    </main>
  );
}
