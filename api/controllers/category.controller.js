import { errorHandler } from "../utils/error.js";
import Category from "../models/category.model.js";
import Project from "../models/project.model.js";

export const gest = (req, res) => {
  res.json({ message: "Category is working!" });
};

export const create = async (req, res, next) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a project"));
  }

  // Check if the title is provided
  if (!req.body.title) {
    return next(errorHandler(400, "Please enter a title"));
  }

  // Check if the title contains at least three characters
  const title = req.body.title.trim();
  if (title.length < 3) {
    return next(
      errorHandler(400, "The title must contain at least three characters")
    );
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

export const getCategories = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all categories"));
  }
  try {
    const categories = await Category.find();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to update this category")
    );
  }

  // Check if the title is provided
  if (!req.body.title) {
    return next(errorHandler(400, "Please enter a title"));
  }

  // Check if the title contains at least three characters
  const title = req.body.title.trim();
  if (title.length < 3) {
    return next(
      errorHandler(400, "The title must contain at least three characters")
    );
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { title: req.body.title },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(errorHandler(404, "Category not found"));
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return next(errorHandler(404, "Category not found"));
    }

    res.status(200).json(category);
  } catch (error) {
    // Check if the error is related to an invalid ID format
    if (error.kind === "ObjectId") {
      return next(errorHandler(400, "Invalid category ID format"));
    }
    next(error);
  }
};
