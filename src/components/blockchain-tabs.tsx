"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSoundwave } from "@/store/soundwave-provider";
import dynamic from "next/dynamic";

const BlockchainTabsContent = dynamic(
  () => import("@/components/blockchain-tabs-content"),
  { ssr: false }
);

export function BlockchainTabs() {
  const { bitcoinWallets, ethereumWallets, solanaWallets } = useSoundwave();
  return (
    <Tabs defaultValue="solana" className="w-3xl gap-0">
      <TabsList className="grid grid-cols-2 bg-white/[0.025] w-2/3 mx-auto">
        <TabsTrigger
          value="ethereum"
          className="border data-[state=active]:bg-[#0cacf020] border-transparent cursor-pointer data-[state=active]:border-[#0cacf0] text-white"
        >
          Ethereum
        </TabsTrigger>
        <TabsTrigger
          value="solana"
          className="border data-[state=active]:bg-[#af29dd20] border-transparent cursor-pointer data-[state=active]:border-[#af29dd] text-white"
        >
          Solana
        </TabsTrigger>
      </TabsList>
      <BlockchainTabsContent blockchain="bitcoin" wallets={bitcoinWallets} />
      <BlockchainTabsContent blockchain="ethereum" wallets={ethereumWallets} />
      <BlockchainTabsContent blockchain="solana" wallets={solanaWallets} />
    </Tabs>
  );
}
