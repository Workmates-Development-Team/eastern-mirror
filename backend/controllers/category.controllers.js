import { z } from "zod";
import categoryModels from "../models/category.models.js";
import { categorySchema } from "../middlewares/inputValidation.js";
import slugify from "slugify";

class CategoryController {
  static async add(req, res) {
    try {
      const { name } = categorySchema.parse(req.body);

      const slug = slugify(name, { lower: true });
      const existingCategory = await categoryModels.findOne({ slug });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }

      const category = new categoryModels({
        name,
        slug,
      });
      await category.save();

      res
        .status(201)
        .json({ message: "Category created successfully", category });
    } catch (error) {
      console.log(error);
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
      const {
        search,
        sortBy = "createdAt",
        sortOrder = "1",
        page = 1,
        limit = 10,
      } = req.query;

      let query = {};

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      // Calculate the number of items to skip
      const skip = (pageNumber - 1) * pageSize;

      const categories = await categoryModels
        .find(query)
        .sort({ [sortBy]: Number(sortOrder) })
        .skip(skip)
        .limit(pageSize);

      const totalItems = await categoryModels.countDocuments(query);

      // Calculate total pages
      const totalPages = Math.ceil(totalItems / pageSize);

      res.status(200).json({
        categories,
        totalItems,
        totalPages,
        currentPage: pageNumber,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllCategory(req, res) {
    try {
      const categories = await categoryModels.find().sort({ createdAt: -1 });

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
