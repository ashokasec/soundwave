import { APP_NAME } from "@/lib/constants";
import { spaceGrotesk } from "@/lib/fonts";
import React from "react";

const AppLogo = () => {
  return (
    <div className="flex items-center space-x-1.5">
      <span
        style={spaceGrotesk.style}
        className="text-xl font-medium tracking-wide"
      >
        {APP_NAME}
      </span>
      <span className="text-[12px] bg-white/10 leading-none rounded-sm text-gray-400 px-1.5 py-1 tracking-wide">
        BETA
      </span>
    </div>
  );
};

export default AppLogo;
