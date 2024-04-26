import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    phoneNumber: string;
    country: string;
    alternateEmail: string;
    isVerified: boolean;
    verificationCodeExpiry: Date;
    settings: {
      darkMode: boolean;
      language: string;
      notifications: {
        email: boolean;
        push: boolean;
      };
    };
    chats: [
      {
        _id: string;
        chatName: string;
        dateCreated: Date;
        dateEdited: Date;
        archived: boolean;
        sharable: boolean;
      }
    ];
    activity: {
      lastLogin: Date;
      loginHistory: Date[];
      loginCount: number;
    };
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: {
      _id: string;
      name: string;
      username: string;
      email: string;
      password: string;
      profilePicture: string;
      country: string;
      phoneNumber: string;
      alternateEmail: string;
      isVerified: boolean;
      verificationCodeExpiry: Date;
      settings: {
        darkMode: boolean;
        language: string;
        notifications: {
          email: boolean;
          push: boolean;
        };
      };
      chats: [
        {
          _id: string;
          chatName: string;
          dateCreated: Date;
          dateEdited: Date;
          archived: boolean;
          sharable: boolean;
        }
      ];
      activity: {
        lastLogin: Date;
        loginHistory: Date[];
        loginCount: number;
      };
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    country: string;
    phoneNumber: string;
    alternateEmail: string;
    isVerified: boolean;
    verificationCodeExpiry: Date;
    settings: {
      darkMode: boolean;
      language: string;
      notifications: {
        email: boolean;
        push: boolean;
      };
    };
    chats: [
      {
        _id: string;
        chatName: string;
        dateCreated: Date;
        dateEdited: Date;
        archived: boolean;
        sharable: boolean;
      }
    ];
    activity: {
      lastLogin: Date;
      loginHistory: Date[];
      loginCount: number;
    };
    createdAt: Date;
    updatedAt: Date;
  }
}
