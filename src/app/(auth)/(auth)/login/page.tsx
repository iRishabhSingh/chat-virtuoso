"use client";
import "../animate.css";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email: string) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string) => {
    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return toast({
        title: "⚠️ Please fill in all the fields",
        description: "Please ensure that all fields are filled in correctly.",
      });
    }

    if (!isValidEmail(email)) {
      return toast({
        title: "Invalid Email Format 😕",
        description: "Please enter a valid email address.",
      });
    }
    if (!isStrongPassword(password)) {
      return toast({
        title: "Incorrect Password 🤥",
        description: "Please enter the correct password and try again.",
      });
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: "Invalid Credentials 😕",
          description: response?.error,
        });

        if (response?.url) router.replace("/");
      }

      if (response?.ok) {
        toast({
          title: "Login Successful 🎉",
          description: `Welcome back to Chat Virtuoso`,
        });
        router.replace("/");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold text-balance">Login</h1>
        <p className="text-[#A1A1AA]">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-xs underline text-[#A1A1AA]"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?&nbsp;
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
