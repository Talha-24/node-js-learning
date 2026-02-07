
import express from "express";
import { createUserAccount,emailVerification, loginUser } from "../controllers/auth-controller.js";
const Router=express.Router();

Router.post("/create-account",createUserAccount)
Router.post("/verify-email",emailVerification);
Router.post("/log-in",loginUser);

export default Router;