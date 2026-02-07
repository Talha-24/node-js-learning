import mongoose  from "mongoose"
import dotenv from "dotenv";
dotenv.config();
const MongoDBConnector = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS);
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log("MongoDB is not connected due to ", error);
  }
};

export default MongoDBConnector;
