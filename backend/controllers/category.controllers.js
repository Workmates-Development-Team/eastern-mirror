import { z } from "zod";
import categoryModels from "../models/category.models.js";
import { categorySchema } from "../middlewares/inputValidation.js";

class CategoryController {
  static async add(req, res) {
    try {
      const { name, parentCategory } = categorySchema.parse(req.body);

      const category = new categoryModels({ name, parentCategory });
      await category.save();

      res
        .status(201)
        .json({ message: "Category created successfully", category });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0]?.message || "Validation error",
        });
      }
       res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async delete(req, res) {
    try {
      const categoryId = req.params.id;

      const category = await categoryModels.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await categoryModels.findByIdAndDelete(categoryId);

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
       res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAll(req, res) {
    try {
      const { search, parentCategory } = req.query;

      let query = {};

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      if (parentCategory) {
        query.parentCategory = parentCategory;
      }

      const categories = await categoryModels
        .find(query)
        .populate("parentCategory", "name parentCategory")
        .select("name parentCategory");
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
       res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getByParent(req, res) {
    try {
      const parentCategory = req.params.parentCategory;

      const categories = await categoryModels.find({ parentCategory });
      if (!categories || categories.length === 0) {
        return res
          .status(404)
          .json({ message: "No categories found for this parent category" });
      }

      res.status(200).json(categories);
    } catch (error) {
       res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default CategoryController;