
import express from "express";
import { createCar, deleteCar, readAllCars, readSingleCar, updateCar } from "../controllers/car.controller.js";
const Router=express.Router();

// FETCH ALL CARS
Router.get("/",readAllCars);


// FETCH SINGLE CAR
Router.get("/:id",readSingleCar);


// CREATE CAR
Router.post("/",createCar);


// UPDATE CAR
Router.put("/:id",updateCar);


// DELETE CAR
Router.delete("/:id",deleteCar);

export default Router;