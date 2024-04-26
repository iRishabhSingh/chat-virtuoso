"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileDetailsForm = ({
  name,
  username,
}: {
  name: string;
  username: string;
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  const nameAvatarFallback = (name: string) => {
    const initials = name.match(/\b\w/g) || [];

    return initials.map((initial) => initial.toUpperCase()).join("");
  };

  const smallName = nameAvatarFallback(name);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSkip = () => {
    router.replace("/");
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold text-balance">Profile Setup</h1>
      </div>
      <div className="flex gap-4 items-center">
        {profileImage ? (
          <Avatar className="w-20 h-20">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="font-semibold text-xl">
              {smallName}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar asChild className="w-20 h-20">
            <div className="relative">
              <Label htmlFor="picture" className="w-full h-full">
                <AvatarFallback className="font-semibold text-xl cursor-pointer">
                  {smallName}
                </AvatarFallback>
              </Label>
              <Input
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer z-10"
                onChange={handleImageChange}
                id="picture"
                type="file"
                accept="image/*"
              />
            </div>
          </Avatar>
        )}
        <div>
          <p className="text-md">{name}</p>
          <p className="text-xs font-medium opacity-80">@{username}</p>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Alternate Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="secondaryemail@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Button type="submit" className="w-full">
          Continue
        </Button>
        <Button onClick={onSkip} variant="ghost">
          Skip
        </Button>
      </div>
    </>
  );
};

export default ProfileDetailsForm;
