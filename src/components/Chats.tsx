"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

interface Chat {
  _id: string;
  chatName: string;
  dateCreated: Date;
  dateEdited: Date;
  archived: boolean;
  sharable: boolean;
}

const Chats = () => {
  const { data: session, status } = useSession();
  const chats: Chat[] | undefined = session?.user?.chats;

  if (status === "loading") {
    return (
      <Loader
        width={15}
        height={15}
        strokeWidth={3}
        className="dark:text-[#FAF9F6] animate-spin"
      />
    );
  } else if (status === "unauthenticated") {
    return <span className="text-xs opacity-20">No Chats</span>;
  }

  return (
    <>
      {!chats?.length && <span className="text-xs opacity-20">No Chats</span>}
      {chats?.map((chat) => (
        <Button
          asChild
          key={chat._id}
          variant="ghost"
          className="w-full p-0 justify-start px-2"
        >
          <Link href={`/${chat._id}`}>{chat.chatName}</Link>
        </Button>
      ))}
    </>
  );
};

export default Chats;
