"use client";
import React, { useState } from "react";

import ProfileSetupForm from "./ProfileSetupForm";
import RequiredAuthDetails from "./RequiredAuthDetails";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  return (
    <div className="p-[10%] sm:p-0 lg:py-8 mx-auto grid sm:w-[350px] gap-6">
      {signedUp ? (
        <ProfileSetupForm name={name} email={email} username={username} />
      ) : (
        <RequiredAuthDetails
          name={name}
          email={email}
          username={username}
          setName={setName}
          setEmail={setEmail}
          setUsername={setUsername}
          setSignedUp={setSignedUp}
        />
      )}
    </div>
  );
};

export default Signup;
