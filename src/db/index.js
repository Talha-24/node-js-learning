import mongoose  from "mongoose"

const MongoDBConnector = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Test-Backend")
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log("MongoDB is not connected due to ", error);
  }
};

export default MongoDBConnector;
