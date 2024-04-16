import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  sender: "user" | "agent";
  content: string;
  timestamp: Date;
}

export interface Chat extends Document {
  _id: string;
  user: typeof Schema.Types.ObjectId;
  agent: "ChatVirtuoso";
  messages: Message[];
}

const ChatSchema: Schema<Chat> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  agent: {
    type: String,
    default: "ChatVirtuoso",
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["user", "agent"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
      },
    },
  ],
});

export default (mongoose.models.Chat as mongoose.Model<Chat>) ||
  mongoose.model<Chat>("Chat", ChatSchema);
