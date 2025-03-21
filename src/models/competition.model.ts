import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please add competition"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Competition =
  mongoose.models.Standard || mongoose.model("Competition", competitionSchema);

export default Competition;