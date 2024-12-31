import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    require: [true, "Please enter subject name"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
