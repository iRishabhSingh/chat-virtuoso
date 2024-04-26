"use client";
import React, { useState } from "react";

import ProfileSetupForm from "./ProfileSetupForm";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schema/signUpSchema";
import RequiredAuthDetails from "./RequiredAuthDetails";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signedUp, setSignedUp] = useState(false);

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
        return;
      }

      if (response.status === 400) {
        return toast({
          title: "👾 Credentials already in use",
          description:
            "Please make sure you are using a unique email and username.",
        });
      }

      if (response.status !== 400) {
        return toast({
          title: "Error creating account",
          description: "We have an error creating the account",
        });
      }
    } catch (error) {
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
    <div className="p-[10%] sm:p-0 lg:py-8 mx-auto grid sm:w-[350px] gap-6">
      {signedUp && (
        <ProfileSetupForm name={name} email={email} username={username} />
      )}

      {!signedUp && (
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
      )}
    </div>
  );
};

export default Signup;
