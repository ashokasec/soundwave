"use client";

import { Blockchain, Wallet } from "@/lib/blockchain";
import { arOneSans, spaceGrotesk } from "@/lib/fonts";
import { useSoundwave } from "@/store/soundwave-provider";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash, WalletMinimal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function WalletKey({ label, value }: { label: string; value: string }) {
  function handleCopy(string: string) {
    window.navigator.clipboard.writeText(string);
    alert("copied");
  }
  return (
    <TooltipProvider>
      <div className="text-gray-400 pl-1.5 text-sm tracking-wide mb-1">
        {label}
      </div>
      <Tooltip>
        <TooltipTrigger
          onClick={() => handleCopy(value)}
          style={spaceGrotesk.style}
          className="cursor-pointer border border-transparent hover:border-border tracking-wider text-start bg-white/[0.04] w-fit text-sm px-2 py-1 rounded break-words-anywhere whitespace-pre-wrap leading-normal"
        >
          {value}
        </TooltipTrigger>
        <TooltipContent>Click to Copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SeedBufferFallback({ blockchain }: { blockchain: Blockchain }) {
  return (
    <div className="rounded-lg tracking-wide bg-white/[0.04] p-4 py-6 text-center text-gray-400 mt-4">
      Create a Seed Phrase First Before Adding or Removing{" "}
      <span className="font-medium text-white capitalize">{blockchain}</span>{" "}
      Wallets
    </div>
  );
}

const BlockchainTabsContent = ({
  blockchain,
  wallets,
}: {
  blockchain: Blockchain;
  wallets: Wallet[] | undefined;
}) => {
  const { seedBuffer, addNewWallet, removeAllWallets, removeWallet } =
    useSoundwave();

  return (
    <TabsContent value={blockchain}>
      {seedBuffer ? (
        <>
          <div className="flex items-center justify-between pl-1 my-8">
            <h2
              style={spaceGrotesk.style}
              className="font-semibold text-lg capitalize"
            >
              {blockchain} Wallets
            </h2>
            <div className="space-x-2">
              <Button onClick={() => addNewWallet(blockchain)}>
                <Plus /> Add New Wallet
              </Button>
              <Button
                variant="destructive"
                onClick={() => removeAllWallets(blockchain)}
              >
                <Trash /> Remove All Wallets
              </Button>
            </div>
          </div>
          {wallets && (
            <ul className="space-y-4">
              {wallets.length > 0 ? (
                wallets.map((wallet, index) => (
                  <li key={index}>
                    <Card className="gap-0 p-4 space-y-4">
                      <CardHeader className="p-0 flex flex-row items-center justify-between">
                        <CardTitle
                          className="font-medium text-[15px] text-gray-400 flex items-center"
                          style={arOneSans.style}
                        >
                          <WalletMinimal size={18} className="mr-2" />{" "}
                          {wallet.title}
                        </CardTitle>
                        <Button
                          onClick={() => removeWallet(blockchain, index)}
                          variant="ghost"
                          size="icon"
                          className="size-8 hover:bg-red-500/20 border border-transparent hover:border-red-600 transition"
                        >
                          <Trash size={16} />
                        </Button>
                      </CardHeader>
                      <CardContent className="p-0 space-y-4">
                        <WalletKey
                          label="Private Key"
                          value={wallet.privateKey}
                        />
                        {blockchain === "ethereum" ? (
                          wallet.address && (
                            <WalletKey
                              label="Ethereum Address"
                              value={wallet.address}
                            />
                          )
                        ) : (
                          <WalletKey
                            label="Public Key"
                            value={wallet.publicKey}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </li>
                ))
              ) : (
                <div className="text-center text-gray-300 py-10 border rounded-md space-y-1">
                  <p>
                    No <span className="capitalize">{blockchain}</span> wallet
                    created yet.
                  </p>
                  <p>
                    Click{" "}
                    <span className="font-semibold">
                      &quot;Add New Wallet&quot;
                    </span>{" "}
                    to create one.
                  </p>
                </div>
              )}
            </ul>
          )}
        </>
      ) : (
        <SeedBufferFallback blockchain={blockchain} />
      )}
    </TabsContent>
  );
};

export default BlockchainTabsContent;
