import Footer from "@/components/application/footer";
import Navbar from "@/components/application/navigation/navbar";
import { BlockchainTabs } from "@/components/blockchain-tabs";
import Mnemonics from "@/components/mnemonics";
import { SoundwaveProvider } from "@/store/soundwave-provider";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto border-x px-6 border-gray-500/15 flex items-center justify-center flex-col min-h-screen">
        <div className="min-h-32 w-1"></div>
        <h1 className="text-4xl font-medium xl:text-6xl">
          Multiple Blockchain Wallet
        </h1>
        <p className="px-4 text-center text-base text-neutral-400 xl:px-0 mt-6">
          Generating Private & Public Keys for Different Blockchains
        </p>
        <SoundwaveProvider>
          <Mnemonics />
          <BlockchainTabs />
        </SoundwaveProvider>
        <div className="min-h-32"></div>
      </section>
      <Footer />
    </>
  );
};

export default page;
