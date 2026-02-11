import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/home", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to protected home page" });
});

export default router;
