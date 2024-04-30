import Link from "next/link";
import { getServerSession } from "next-auth";

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

const UserSettings = async () => {
  const session = getServerSession();
  const isLoggedIn = await session.then((data) => {
    return data?.user ? true : false;
  });

  console.log(isLoggedIn);

  return (
    <div className="absolute bottom-4 mx-3">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[236px] h-12">
              {session.then((data) => (data?.user ? data.user?.name : ""))}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[236px]">
            <DropdownMenuLabel className="text-[#808080] text-center font-normal">
              {session.then((data) => (data?.user ? data.user?.email : ""))}
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
      ) : (
        <div className="flex flex-col gap-6">
          <Button asChild variant="outline" className="w-[236px] h-12">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="w-[236px] h-12">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
