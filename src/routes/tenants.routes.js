import express from "express";
import { createTenant, deleteTenant, readAllTenants, readSingleTenant, updateTenant } from "../controllers/tentar.controller.js";

const Router=express.Router();


// Read all Tenants
Router.get("/",readAllTenants);

// Read single Tenant
Router.get("/:id",readSingleTenant);

// Update Tenant
Router.put("/:id",updateTenant);

// Create Tenant
Router.post("/",createTenant);

// Delete Tenant
Router.delete("/:id",deleteTenant);

Router.get("/:id/get-owner/",async(req,res)=>{

    


})

export default Router;