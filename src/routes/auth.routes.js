
import express from "express";
import { createUserAccount,emailVerification } from "../controllers/auth-controller.js";
const Router=express.Router();

Router.post("/create-account",createUserAccount)
Router.post("/verify-email",emailVerification);

export default Router;