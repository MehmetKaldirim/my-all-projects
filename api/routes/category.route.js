import express from "express";
import {
  gest,
  create,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/gest", gest);
router.post("/create", verifyToken, create);
router.get("/", verifyToken, getCategories);
router.delete("/delete/:categoryId", verifyToken, deleteCategory);

export default router;
