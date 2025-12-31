import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    rented_car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  },
  { timestamps: true }
);

const Tenant=mongoose.model("Tenant",TenantSchema);

export default Tenant;