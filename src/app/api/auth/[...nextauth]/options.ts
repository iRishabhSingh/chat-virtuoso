import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        dbConnect();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error(`Email ${credentials.email} is not registered.`);
          }

          const validPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (validPassword) {
            return user;
          } else {
            throw new Error("The password you entered is incorrect.");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.profilePicture = token.profilePicture;
        session.user.phoneNumber = token.phoneNumber;
        session.user.alternateEmail = token.alternateEmail;
        session.user.isVerified = token.isVerified;
        session.user.settings = token.settings;
        session.user.chats = token.chats;
        session.user.activity = token.activity;
        session.user.updatedAt = token.updatedAt;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.profilePicture = user.profilePicture;
        token.phoneNumber = user.phoneNumber;
        token.alternateEmail = user.alternateEmail;
        token.isVerified = user.isVerified;
        token.settings = user.settings;
        token.chats = user.chats;
        token.activity = user.activity;
        token.updatedAt = user.updatedAt;
        token.createdAt = user.createdAt;
      }
      return token;
    },
  },
};
