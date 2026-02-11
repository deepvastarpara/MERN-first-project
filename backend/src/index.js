import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/password", passwordRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

