import cors from "cors"
import express from "express"
import MongoDBConnector from "./src/db/index.js";
import carRoutes from "./src/routes/cars.routes.js";
import ownerRoutes from "./src/routes/owner.routes.js";
import tenantRoutes from "./src/routes/tenants.routes.js";
const app = express();

// MiddleWare
app.use(express.json());

// DB CONNECTION


// MongoDB.connect("mongodb://localhost:27017").then(()=>console.log("DataBase is connected")).catch(()=>console.log("Error in connecting to "))

MongoDBConnector();


// ----------Dealing with Owner (CRUD)

app.use("/owners",ownerRoutes);
app.use("/cars",carRoutes)
app.use("/tenants",tenantRoutes);


const PORT = 4000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
