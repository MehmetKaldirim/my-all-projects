import { errorHandler } from "../utils/error.js";
import Category from "../models/category.model.js";
import Project from "../models/project.model.js";

export const gest = (req, res) => {
  res.json({ message: "Category is working!" });
};

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a project"));
  }
  if (!req.body.title) {
    return next(errorHandler(400, "Please enter title"));
  }

  const newCategory = new Category({
    title: req.body.title,
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this category")
    );
  }

  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return next(errorHandler(404, "Category not found"));
    }

    const projects = await Project.find({ category: category.title });
    if (projects.length > 0) {
      return next(
        errorHandler(400, "Cannot delete category with associated projects")
      );
    }

    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json("The category has been deleted");
  } catch (error) {
    next(error);
  }
};
