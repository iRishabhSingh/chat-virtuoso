"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schema/signUpSchema";

interface RequiredAuthDetailsProps {
  name: string;
  email: string;
  username: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setUsername: (value: string) => void;
  setSignedUp: (value: boolean) => void;
}

const RequiredAuthDetails: React.FC<RequiredAuthDetailsProps> = ({
  name,
  email,
  username,
  setName,
  setEmail,
  setUsername,
  setSignedUp,
}: RequiredAuthDetailsProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

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

  const { toast } = useToast();

  const handleSignup = async () => {
    if (!name || !email || !username || !password || !confirmPassword) {
      return toast({
        title: "⚠️ Please fill in all the fields",
        description: "Please make sure all fields are filled correctly.",
      });
    }

    const validationResult = validationCheck({ email, username, password });
    if (validationResult) {
      return toast({
        title: "⚠️ Invalid field value detected",
        description: validationResult,
      });
    }

    if (password !== confirmPassword) {
      return toast({
        title: "⚠️ Passwords do not match",
        description: "Please make sure the passwords match.",
      });
    }

    if (!termsConditions) {
      return toast({
        title: "✓ Accept terms and conditions",
        description:
          "Please read and accept the terms and conditions to proceed.",
      });
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, username, password }),
      });

      if (response.status === 200) {
        setSignedUp(true);
        toast({
          title: "Account created successfully. 🎉",
          description: `Hi ${name}! welcome to Virtuoso.`,
        });

        // Sign in the user after account creation
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signInResponse?.error) {
          toast({
            title: "Account created but unable to sign in.",
            description: signInResponse.error,
          });
        }
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      if (response.status === 400) {
        toast({
          title: "👾 Credentials already in use",
          description:
            "Please make sure you are using a unique email and username.",
        });
      } else if (response.status !== 400) {
        toast({
          title: "Error creating account",
          description: "We have an error creating the account",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      return toast({
        title: "⚠️ Something went wrong",
        description: "Please try again later.",
      });
    }
  };

  const validationCheck = ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      signUpSchema.parse({ email, username, password });
      return "";
    } catch (error: any) {
      return error.errors[0].message;
    }
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
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          onClick={handleSignup}
        >
          {isLoading ? (
            <LoaderCircle
              width={15}
              height={15}
              strokeWidth={3}
              className="animate-spin"
            />
          ) : (
            "Signup"
          )}
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
