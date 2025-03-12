"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Blockchain,
  derivationPatterns,
  generateSeedBuffer as generateSeedBufferBIP39,
  Wallet,
} from "@/lib/blockchain";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { hdkey } from "ethereumjs-wallet";
import bs58 from "bs58";

interface SoundwaveContextType {
  mnemonics?: string[];
  seedBuffer?: Buffer;
  solanaWallets?: Wallet[];
  bitcoinWallets?: Wallet[];
  ethereumWallets?: Wallet[];
  generateSeedBuffer: () => void;
  removeAllWallets: (blockchain: Blockchain) => void;
  removeWallet: (blockchain: Blockchain, index: number) => void;
  addNewWallet: (blockchain: Blockchain) => void;
}

const SoundwaveContext = createContext<SoundwaveContextType | undefined>(
  undefined
);

export const SoundwaveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mnemonics, setMnemonics] = useState<string[] | undefined>(undefined);
  const [seedBuffer, setSeedBuffer] = useState<Buffer | undefined>(undefined);
  const [bitcoinWallets, setBitcoinWallets] = useState<Wallet[] | undefined>(
    undefined
  );
  const [ethereumWallets, setEthereumWallets] = useState<Wallet[] | undefined>(
    undefined
  );
  const [solanaWallets, setSolanaWallets] = useState<Wallet[] | undefined>(
    undefined
  );

  function generateSeedBuffer() {
    const { mnemonics, seedBuffer: seedBufferBIP39 } =
      generateSeedBufferBIP39();
    setMnemonics(mnemonics);
    setSeedBuffer(seedBufferBIP39);
  }

  const removeWallet = (blockchain: Blockchain, index: number) => {
    switch (blockchain) {
      case "solana":
        setSolanaWallets((prev) =>
          prev ? prev.filter((_, i) => i !== index) : undefined
        );
        break;
      case "bitcoin":
        setBitcoinWallets((prev) =>
          prev ? prev.filter((_, i) => i !== index) : undefined
        );
        break;
      case "ethereum":
        setEthereumWallets((prev) =>
          prev ? prev.filter((_, i) => i !== index) : undefined
        );
        break;
    }
  };

  const removeAllWallets = (blockchain: Blockchain) => {
    switch (blockchain) {
      case "solana":
        setSolanaWallets([]);
        break;
      case "bitcoin":
        setBitcoinWallets([]);
        break;
      case "ethereum":
        setEthereumWallets([]);
        break;
    }
  };

  const addNewWallet = (blockchain: Blockchain) => {
    if (!seedBuffer) {
      throw new Error("Generate a Seed Phrase Before Creating a Wallet.");
    }

    switch (blockchain) {
      case "solana":
        const solanaWalletIndex = solanaWallets
          ? solanaWallets.length.toString()
          : "0";
        const solanaDerivationPath = derivationPatterns.solana.replace(
          "x",
          solanaWalletIndex
        );
        const solanaDerivedSeed = derivePath(
          solanaDerivationPath,
          seedBuffer.toString("hex")
        ).key;
        const solanaSecretKey =
          nacl.sign.keyPair.fromSeed(solanaDerivedSeed).secretKey;
        const solanaNewWallet = {
          title: `Wallet ${parseInt(solanaWalletIndex) + 1}`,
          privateKey: bs58.encode(solanaSecretKey),
          publicKey:
            Keypair.fromSecretKey(solanaSecretKey).publicKey.toBase58(),
        };
        setSolanaWallets((prev) =>
          prev ? [...prev, solanaNewWallet] : [solanaNewWallet]
        );
        break;
      case "ethereum":
        const ethereumWalletsIndex = ethereumWallets
          ? ethereumWallets.length.toString()
          : "0";
        const ethereumDerivationPath = derivationPatterns.ethereum.replace(
          "x",
          ethereumWalletsIndex
        );

        const hdWallet = hdkey.fromMasterSeed(seedBuffer);
        const derivedNode = hdWallet.derivePath(ethereumDerivationPath);

        const wallet = derivedNode.getWallet();

        const ethereumNewWallet = {
          title: `Wallet ${parseInt(ethereumWalletsIndex) + 1}`,
          privateKey: wallet.getPrivateKeyString(),
          publicKey: wallet.getAddressString(),
        };

        setEthereumWallets((prev) =>
          prev ? [...prev, ethereumNewWallet] : [ethereumNewWallet]
        );
        break;
      default:
        break;
    }
  };

  return (
    <SoundwaveContext.Provider
      value={{
        mnemonics,
        seedBuffer,
        solanaWallets,
        bitcoinWallets,
        ethereumWallets,
        generateSeedBuffer,
        addNewWallet,
        removeAllWallets,
        removeWallet,
      }}
    >
      {children}
    </SoundwaveContext.Provider>
  );
};

export const useSoundwave = () => {
  const context = useContext(SoundwaveContext);
  if (!context) {
    throw new Error("useSoundwave must be used within a SoundwaveProvider");
  }
  return context;
};
