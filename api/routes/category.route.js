import express from "express";
import {
  gest,
  create,
  deleteCategory,
} from "../controllers/category.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/gest", gest);
router.post("/create", verifyToken, create);
router.delete("/delete/:categoryId", verifyToken, deleteCategory);

export default router;
