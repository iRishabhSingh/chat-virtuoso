"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schema/signUpSchema";
import RequiredAuthDetails from "./RequiredAuthDetails";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = () => {
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
    <div className="p-[10%] sm:p-0 lg:py-8 mx-auto grid sm:w-[350px] gap-6">
      <RequiredAuthDetails
        password={password}
        handleSignup={handleSignup}
        confirmPassword={confirmPassword}
        termsConditions={termsConditions}
        setName={setName}
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setTermsConditions={setTermsConditions}
      />
    </div>
  );
};

export default Signup;
