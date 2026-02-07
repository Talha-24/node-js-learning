import mongoose  from "mongoose"

const MongoDBConnector = async () => {
  try {
    await mongoose.connect("mongodb+srv://talhabhatti82542_db_user:kyqYlG9oCdWApFII@ailaan.oww1l1n.mongodb.net/?appName=Ailaan")
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log("MongoDB is not connected due to ", error);
  }
};

export default MongoDBConnector;
