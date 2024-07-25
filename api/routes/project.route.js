import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getprojects,
  deleteproject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getprojects", getprojects);
router.delete("/deleteproject/:projectId/:userId", verifyToken, deleteproject);

export default router;
