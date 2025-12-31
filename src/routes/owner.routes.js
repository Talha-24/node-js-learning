import express from "express";
import { createCarOwner, deleteOwner, readAllCarOwners, readSingleOwner, updateOwner } from "../controllers/owner.controller.js";
import Owner from "../models/owners.schema.js";
import mongoose from "mongoose";

const Router=express.Router();

// READ ALL OWNERS

Router.get("/",readAllCarOwners);


// READ SINGLE OWNER

Router.get("/:id",readSingleOwner);


// CREATE OWNER
Router.post("/",createCarOwner);

// UPDATE OWNER

Router.put("/:id",updateOwner);


// DELETE OWNER

Router.delete("/:id",deleteOwner);

Router.get("/:id/cars", async (req, res) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(req.params.id);

    const result = await Owner.aggregate([
      // STEP 1: pick ONE owner

      {
        $match: { _id: ownerId }
      },

      // STEP 2: JOIN with cars
      {
        $lookup: {
          from: "cars",             // collection name
          localField: "_id",        // Owner._id
          foreignField: "owner_id", // Cars.owner_id
          as: "cars"                // output array
        }
      }
    ]);

    res.json(result[0]); // single                                                                                                                                                                                                                                                                                                                                                                                                                                                                    owner
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default Router;