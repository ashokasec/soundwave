import React from "react";
import { APP_LINK } from "@/components/application/navigation/links";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppLogo from "../app-logo";

const Navbar = () => {
  return (
    <div className="border-b border-gray-500/15 fixed w-full top-0 bg-background/95 z-[1000] backdrop-blur-sm">
      <header className="max-w-6xl mx-auto h-[calc(4rem-1px)] flex items-center justify-between border-x px-6 border-gray-500/15">
        <div className="flex items-center leading-none space-x-6">
          <AppLogo />
        </div>
        <div>
          <Button variant="secondary" asChild>
            <Link href={APP_LINK.githubLink.link} target="_blank">
              Github
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
