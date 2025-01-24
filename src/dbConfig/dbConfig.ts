import mongoose from "mongoose";

export async function databseConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb connected successfully.");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error, Make sure mongoDB is running" + error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}
