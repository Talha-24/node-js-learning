import express from "express"
import MongoDBConnector from "./src/db/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/products.routes.js"
import { authMiddleware } from "./src/middlewares/middleware.js";
import cors from "cors"

const app = express();

// MiddleWare
app.use(express.json());

// DB CONNECTION

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

// MongoDB.connect("mongodb://localhost:27017").then(()=>console.log("DataBase is connected")).catch(()=>console.log("Error in connecting to "))

MongoDBConnector();


// ----------Dealing with Owner (CRUD)

// app.use("/owners",ownerRoutes);
// app.use("/cars",carRoutes)
// app.use("/tenants",tenantRoutes);
app.use("/api/auth",authRoutes);
app.use("/app/products",authMiddleware,productRoutes);


const PORT = 4000;


app.listen(PORT, () => console.log("Server is running on port " + PORT));
