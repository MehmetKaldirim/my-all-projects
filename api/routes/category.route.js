import express from "express";
import {
  gest,
  create,
  deleteCategory,
  getCategories,
  getCategoryById,
  update,
} from "../controllers/category.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/", verifyToken, getCategories);
router.get("/getCategoryById/:categoryId", verifyToken, getCategoryById);
router.delete("/delete/:categoryId", verifyToken, deleteCategory);
router.put("/update/:categoryId", verifyToken, update);

export default router;
