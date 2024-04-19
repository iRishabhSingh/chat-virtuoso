import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
  dbConnect();

  try {
    const { name, username, email, oneTimePassword, password } =
      await request.json();

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return Response.json(
        { success: false, message: "This email already exists." },
        { status: 400 }
      );
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return Response.json(
        { success: false, message: "This username already exists." },
        { status: 400 }
      );
    }

    const currentTime = new Date();
    const verificationCodeExpiry = new Date();
    verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 10);

    // Generating verification code for user to verify their email.
    const verificationCode = Math.floor(100000 + Math.random() * 9000000) + "";

    if (verificationCode === oneTimePassword) {
      return Response.json(
        {
          success: false,
          message:
            "The code provided is incorrect. Please review the email we have sent you.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationCodeExpiry,
      settings: [],
      chats: [],
      activity: {
        lastLogin: currentTime,
        loginHistory: [currentTime],
        loginCount: 1,
      },
    });

    await newUser.save();

    // Sending verification email to user.
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    } else {
      return Response.json(
        { success: true, message: "Account created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("We had an error creating your account.");
    return Response.json(
      { success: false, message: "We had an error creating your account." },
      { status: 500 }
    );
  }
}
