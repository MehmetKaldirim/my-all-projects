import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getprojects } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getprojects", getprojects);

export default router;
