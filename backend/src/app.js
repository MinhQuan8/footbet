import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import footballRoutes from "./routes/footballRoute.js";
import betRoutes from "./routes/betRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", footballRoutes);
app.use("/api", betRoutes);

export default app;
