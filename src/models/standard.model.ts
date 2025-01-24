import mongoose from "mongoose";

const standardSchema = new mongoose.Schema({
  standard: {
    type: String,
    require: [true, "Please add standard"],
  },
  description: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Standard =
  mongoose.models.Standard || mongoose.model("Standard", standardSchema);

export default Standard;
