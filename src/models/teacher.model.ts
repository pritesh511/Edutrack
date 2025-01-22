import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter teacher name"],
  },
  email: {
    type: String,
    require: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please enter password"],
  },
  experience: {
    type: String,
    required: [true, "Please enter experience"],
  },
  educations: [
    {
      type: String,
      required: [true, "Please select education"],
    },
  ],
  standards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Standard",
      required: [true, "Please select standard"],
    },
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Please select subject"],
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;

