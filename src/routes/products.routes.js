
import express from "express";
import { createUserAccount,emailVerification, loginUser } from "../controllers/auth-controller.js";
const Router=express.Router();

Router.get("/view-all",async(req,res)=>{



    console.log("SUCCEEDED");

    res.json({success:true, message: "Products are retrieved successfully!"})

})
Router.post("/create",emailVerification);
Router.post("/update",loginUser);
Router.delete("/delete:id",loginUser);

export default Router;