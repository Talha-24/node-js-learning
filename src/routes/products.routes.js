
import express from "express";
import { createUserAccount,emailVerification, loginUser } from "../controllers/auth-controller.js";
import Product from "../models/products.schema.js";
const Router=express.Router();

Router.get("/view-all",async(req,res)=>{



    try {
       const data= await Product.find();
    res.json({success:true,data, message: "Products are retrieved successfully!"})
    } catch (error) {


    res.json({success:false,error, message:error?.message})
    }



})
Router.post("/create",emailVerification);
Router.post("/update",loginUser);
Router.delete("/delete:id",loginUser);

export default Router;