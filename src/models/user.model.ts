import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        require: [true, "Please enter school name"],
        unique: true
    },
    email: {
        type: String,
        require: [true, "Please enter email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please enter password"]
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;