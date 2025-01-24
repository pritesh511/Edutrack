import mongoose from "mongoose";

const chatgroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    require: [true, "Please enter group name"],
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Please select teacher"],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const ChatGroup =
  mongoose.models.ChatGroup || mongoose.model("ChatGroup", chatgroupSchema);

export default ChatGroup;
