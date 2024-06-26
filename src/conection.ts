import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@sergcluster.zrub7.mongodb.net/${process.env.COLECTION_NAME}`
    );
    console.log("DB connected");
  } catch (error) {
    console.log("Error:", error);
  }
};

export default connectDB;
