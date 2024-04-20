import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        dbConnect();

        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error(
              `No user found with input ${credentials.identifier}`
            );
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
        session.user = token;
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
