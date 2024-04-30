"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileDetailsForm = ({
  name,
  email,
  username,
}: {
  name: string;
  email: string;
  username: string;
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [alternateEmail, setAlternateEmail] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

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

  const handleAlternateEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAlternateEmail(e.target.value);
  };

  const onContinue = async () => {
    if (!alternateEmail) {
      toast({
        title: "Recommendation",
        description:
          "It is recommended that you provide an alternate email or you can skip anyway.",
      });
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, profileImage, alternateEmail }),
      });

      if (response.status === 404) {
        toast({
          title: "Invalid Credentials 😕",
          description: response.statusText,
        });

        if (response.url) router.replace("/");
      }

      if (response.status === 200) {
        router.replace("/");
        return toast({
          title: "Account created successfully. 🎉",
          description: `Hi, ${name}! welcome to Virtuoso.`,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("We had an error updating your profile.");
      return toast({
        title: "We had an error updating your profile.",
        description: error.message,
      });
    }
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
          onChange={handleAlternateEmailChange}
          placeholder="secondaryemail@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Button
          type="submit"
          disabled={isLoading}
          onClick={onContinue}
          className="w-full"
        >
          {isLoading ? (
            <LoaderCircle
              width={15}
              height={15}
              strokeWidth={3}
              className="animate-spin"
            />
          ) : (
            "Continue"
          )}
        </Button>
        <Button onClick={onSkip} variant="link">
          Skip
        </Button>
      </div>
    </>
  );
};

export default ProfileDetailsForm;
