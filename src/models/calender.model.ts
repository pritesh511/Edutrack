import mongoose from "mongoose";

const calenderSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please enter event title"],
  },
  start: {
    type: Date,
    require: [true, "Please enter date"],
  },
  end: {
    type: Date,
    require: [true, "Please enter date"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Calender =
  mongoose.models.Calender || mongoose.model("Calender", calenderSchema);

export default Calender;
