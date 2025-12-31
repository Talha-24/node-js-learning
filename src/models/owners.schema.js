import mongoose from "mongoose";

const OwnersSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    phone: {
      required: true,
      type: String,
      unique: true,
    },
    cnic: {
      required: true,
      type: Number,
      unique: String,
    },
  },
  
  // Created_at:Updated_at auto

  { timestamps: true }
);

const Owner = mongoose.model("Owner", OwnersSchema);

export default Owner;
