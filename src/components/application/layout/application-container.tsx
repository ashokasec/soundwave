import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

const DashboardContent = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div className="h-[calc(4rem-1px)] flex items-center tracking-wide border-b px-8 mb-4">
        <span>{title}</span>
      </div>
      <div className="px-4">
        <ScrollArea className="w-full bg-[#0c0c0c] border h-[calc(100vh-6rem)] rounded-xl">
          <div className={cn("p-4", className)}>{children}</div>
        </ScrollArea>
      </div>
    </>
  );
};

export default DashboardContent;
