import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";

import Chats from "./Chats";
import { Button } from "./ui/button";
import UserSettings from "./UserSettings";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`flex-shrink-0 overflow-x-hidden w-[260px] h-[100vh] bg-[#F9F9F9] dark:bg-black ${className}`}
    >
      <div className="h-full w-[260px]">
        <div className="flex flex-col items-start justify-center h-full relative p-4">
          <Button asChild variant="ghost" className="w-[200px] md:w-full p-2">
            <Link href="/" className="w-full flex items-center justify-between">
              <div className="flex gap-2 justify-center items-center">
                <Avatar className="w-[25px] h-[25px]">
                  <AvatarImage src="/chat-virtuoso.png" />
                  <AvatarFallback className="text-xs font-bold">
                    CV
                  </AvatarFallback>
                </Avatar>
                <span>New chat</span>
              </div>
              <SquarePen width={15} height={15} />
            </Link>
          </Button>
          <div className="flex flex-col w-full h-[80vh] flex-1 items-center p-3 overflow-y-scroll">
            <Chats />
          </div>
          <div className="w-full">
            <UserSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
