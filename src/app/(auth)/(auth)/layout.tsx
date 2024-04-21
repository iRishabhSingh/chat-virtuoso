import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex lg:grid lg:min-h-[600px] lg:grid-cols-2 items-center justify-center">
      <div className="hidden lg:block">
        <div className="h-screen flex items-center justify-end">
          <Image
            src="/auth-image.webp"
            alt="Login Image"
            width={100}
            height={100}
            priority
            style={{ width: "auto", height: "50%" }}
            className="min-h-[400px] animate-custom"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
