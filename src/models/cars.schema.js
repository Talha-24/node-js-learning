import mongoose from "mongoose";

const CarsSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },

    model: { type: String, required: true },
    
    plate_number: { type: String, required: true, unique: true },
    rent_price_per_day: { type: Number, required: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarsSchema);

export default Car;
