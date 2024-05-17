"use client";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import Logout from "./logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

const UserSettings = () => {
  const { data: session, status } = useSession();

  return (
    <div className="bottom-4">
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full h-12">
              {session?.user.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[228px]">
            <DropdownMenuLabel className="text-[#808080] text-center font-semibold">
              @{session?.user.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex items-center justify-evenly gap-4">
              <span>Theme</span>
              <ModeToggle />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Logout />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <div className="flex flex-col gap-6">
          <Button asChild variant="outline" className="w-[228px] h-12">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="w-[228px] h-12">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      )}
      {status === "loading" && (
        <Button
          disabled
          variant="outline"
          className="w-full h-12 cursor-pointer"
        >
          <LoaderCircle className="animate-spin" />
        </Button>
      )}
    </div>
  );
};

export default UserSettings;
