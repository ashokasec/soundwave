"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useSoundwave } from "@/store/soundwave-provider";

const Mnemonics = () => {
  const { generateSeedBuffer, mnemonics } = useSoundwave();

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="my-6 flex items-center space-x-2">
        <Button
          onClick={() => generateSeedBuffer()}
          className="w-[180px]"
          disabled={mnemonics && mnemonics.length > 1}
        >
          Generate Mnemonics
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => generateSeedBuffer()}
          className="h-full aspect-square"
          disabled={!mnemonics}
        >
          <RotateCcw />
        </Button>
      </div>
      {mnemonics && (
        <ul className="grid grid-cols-4 gap-2 bg-white/[0.025] p-3 rounded-lg">
          {mnemonics.map((word, index) => (
            <Button
              asChild
              className="grid grid-cols-[1fr_3fr] w-[125px]"
              variant="outline"
              key={index}
            >
              <li>
                <span className="grid place-items-center text-[12px] text-gray-500">
                  {index + 1}.
                </span>
                <span>{word}</span>
              </li>
            </Button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mnemonics;
