import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    require: [true, "Please enter school name"],
    unique: true,
  },
  schoolOwnerName: {
    type: String,
    require: [true, "Please enter school owner name"],
    default: "",
  },
  mobileNo: {
    type: String,
    require: [true, "Please enter mobile number"],
    default: "",
  },
  address: {
    type: String,
    require: [true, "Please enter address"],
    default: "",
  },
  city: {
    type: String,
    require: [true, "Please enter city"],
    default: "",
  },
  district: {
    type: String,
    require: [true, "Please enter district"],
    default: "",
  },
  pincode: {
    type: String,
    require: [true, "Please enter pincode"],
    default: "",
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
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
