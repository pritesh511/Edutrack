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
  standard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Standard",
    require: [true, "Please select standard"],
  },
  mobileNo: {
    type: Number,
    require: [true, "Please enter mobile number"],
  },
  address: {
    type: String,
    require: [true, "Please enter address"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
