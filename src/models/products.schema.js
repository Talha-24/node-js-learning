import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: null,
    },

    price: {
      type: Number, 
      required: true,
    },
    no_Of_Views:{
      type:Number,
    },
    no_Of_Purchases:{
      type:Number,
    },

    display_image: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: null,
    },

    ad_location: {
      type: String,
      trim: true,
    },

    owner_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    condition: {
      type: String,
      enum: [
        "New",
        "Open Box",
        "Refurbished",
        "Used",
        "For Parts not working",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true, 
  }
);

export default model("Product", productSchema);
