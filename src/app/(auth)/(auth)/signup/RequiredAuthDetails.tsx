import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface RequiredAuthDetailsProps {
  password: string;
  confirmPassword: string;
  termsConditions: boolean;
  handleSignup: () => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setTermsConditions: (value: boolean) => void;
}

const RequiredAuthDetails: React.FC<RequiredAuthDetailsProps> = ({
  setName,
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
  setTermsConditions,
  password,
  confirmPassword,
  termsConditions,
  handleSignup,
}: RequiredAuthDetailsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold text-balance">Signup</h1>
        <p className="text-[#A1A1AA]">
          Sign up now! Enter your email below to create your account.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Name</Label>
        <Input
          id="name"
          type="text"
          onChange={handleNameChange}
          placeholder="Chandler Bing"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          onChange={handleEmailChange}
          placeholder="yourname@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Username</Label>
        <Input
          id="username"
          type="text"
          onChange={handleUsernameChange}
          placeholder="yourname"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            className="pr-4"
            placeholder="•••••••••"
            required
          />
          {password && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye width={15} /> : <EyeOff width={15} />}
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
        </div>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            onChange={handleConfirmPasswordChange}
            className="pr-4"
            placeholder="•••••••••"
            required
          />
          {confirmPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <Eye width={15} /> : <EyeOff width={15} />}
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms"
            onCheckedChange={() => setTermsConditions(!termsConditions)}
          />
          <Label
            htmlFor="terms"
            className={
              termsConditions
                ? "opacity-100 transition-[500ms]"
                : "opacity-50 transition-[500ms]"
            }
          >
            Accept&nbsp;
            <Link href="/terms" className="hover:underline opacity-80">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit" className="w-full" onClick={handleSignup}>
          Signup
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?&nbsp;
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  );
};

export default RequiredAuthDetails;
