import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-gray-500/15 fixed w-full bottom-0 bg-background/95 z-[1000] backdrop-blur-sm">
      <footer className="max-w-6xl mx-auto h-[calc(4rem-1px)] flex items-center justify-between border-x px-6 border-gray-500/15 text-sm">
        <p className="text-gray-300">
          Built by <Link href="https://x.com/ashokasec" className="border-b border-white border-dashed hover:border-solid">ashokasec</Link>. 
        </p>
      </footer>
    </div>
  );
};

export default Footer;
