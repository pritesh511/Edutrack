import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter student name"],
  },
  roleNo: {
    type: Number,
    require: [true, "Pleae enter role number"],
  },
  dob: {
    type: String,
    require: [true, "Pleae select date"],
  },
  standard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Standard",
    require: [true, "Please select standard"],
  },
  address: {
    type: String,
    require: [true, "Please enter address"],
  },
  fatherName: {
    type: String,
    require: [true, "Please enter father name"],
  },
  fatherMobileNo: {
    type: String,
    require: [true, "Please enter mobile number"],
  },
  fatherOccupation: { type: String },
  fatherEmail: { type: String },
  motherName: {
    type: String,
    require: [true, "Please enter mother name"],
  },
  motherOccupation: { type: String },
  motherMobileNo: { type: String },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    require: [true, "Please select class teacher"],
  },
  attendance: {
    type: [
      {
        date: { type: Date, required: true },
        status: { type: String, required: true },
      },
    ],
    default: [],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
