import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  country?: string;
  phoneNumber?: string;
  alternateEmail?: string;
  isVerified: boolean;
  verificationCodeExpiry: Date;
  settings: {
    darkMode: boolean;
    language?: string;
    notifications?: {
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

const UserSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    alternateEmail: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    verificationCodeExpiry: {
      type: Date,
    },
    settings: {
      darkMode: {
        type: Boolean,
        required: true,
        default: true,
      },
      language: {
        type: String,
      },
      notifications: {
        email: {
          type: Boolean,
          default: false,
        },
        push: {
          type: Boolean,
          default: false,
        },
      },
    },
    chats: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Chat",
          required: true,
        },
        chatName: {
          type: String,
          required: true,
        },
        dateCreated: {
          type: Date,
          required: true,
        },
        dateEdited: {
          type: Date,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
        sharable: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    activity: {
      lastLogin: {
        type: Date,
        required: true,
      },
      loginHistory: [
        {
          type: Date,
        },
      ],
      loginCount: {
        type: Number,
        default: 0,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
