import { z } from "zod";
import categoryModels from "../models/category.models.js";
import authorModels from "../models/author.models.js";
import articleModels from "../models/article.models.js";
import { articleSchema } from "../middlewares/inputValidation.js";
import { getFilePath2 } from "../utils/helper.js";
import fs from "fs";
import { connect } from "http2";
import mongoose, { Types } from "mongoose";

class ArticleController {
  static async add(req, res) {
    try {
      const {
        title,
        content,
        category,
        tags,
        isPopular,
        showOnTop,
        showOnHomePage,
        author,
        isPublished,
        publishedAt,
        slug,
      } = articleSchema.parse(req.body);

      let thumbnail = "";
      if (req.file) {
        thumbnail = `/article/${req.file.filename}`;
      }

      const authorExists = await authorModels.findById(author);
      if (!authorExists) {
        return res.status(400).json({ message: "Invalid author ID" });
      }

      const article = new articleModels({
        title,
        content,
        thumbnail,
        category: JSON.parse(category),
        tags: JSON.parse(tags),
        isPopular,
        showOnTop,
        showOnHomePage,
        isPublished: true,
        publishedAt,
        author,
        slug,
      });

      await article.save();
      res
        .status(201)
        .json({ message: "Article created successfully", article });
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const filePath = getFilePath2(req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Failed to delete the file:", err);
          }
        });

        return res
          .status(400)
          .json({ message: error.errors[0]?.message || "Validation error" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async togglePublish(req, res) {
    try {
      const { id } = req.params;

      const article = await articleModels.findById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      article.isPublished = !article.isPublished;
      await article.save();

      res
        .status(200)
        .json({ message: "Article publication status toggled", article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        content,
        thumbnail,
        category,
        tags,
        isPopular,
        showOnTop,
        showOnHomePage,
        author,
        publishedAt,
      } = req.body;

      // Validate category and author
      if (category) {
        const categoryExists = await categoryModels.findById(category);
        if (!categoryExists) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
      }

      if (author) {
        const authorExists = await authorModels.findById(author);
        if (!authorExists) {
          return res.status(400).json({ message: "Invalid author ID" });
        }
      }

      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        {
          title,
          content,
          thumbnail,
          category,
          tags,
          isPopular,
          showOnTop,
          showOnHomePage,
          author,
        },
        { new: true }
      );

      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({
        message: "Article updated successfully",
        article: updatedArticle,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const article = await articleModels.findByIdAndDelete(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
        search = "",
        category = "",
        author = "",
      } = req.query;

      const query = {};

      // Add full-text search if applicable
      if (search) {
        query.$text = { $search: search };
      }

      // Handle category filtering
      if (category) {
        const categories = await categoryModels.find({ name: category });
        if (!categories.length) {
          return res.status(200).json({
            articles: [],
            totalPages: 0,
            currentPage: 1,
          });
        }
        const categoryIds = categories.map((cat) => cat._id);

        if (categoryIds.length > 0) {
          query.category = { $in: categoryIds };
        }
      }

      // Handle author filtering
      if (author) {
        const authorObj = await authorModels.findOne({ name: author });
        if (authorObj) {
          query.author = authorObj._id;
        }
      }

      // Query the articles with population and pagination
      const articles = await articleModels
        .find(query)
        .populate({
          path: "category",
          select: "name parentCategory",
          populate: {
            path: "parentCategory",
            select: "name",
          },
        })
        .populate("author", "name")
        .sort({ [sort]: order })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      // Count total documents matching the query
      const totalArticles = await articleModels.countDocuments(query);

      res.status(200).json({
        articles,
        totalPages: Math.ceil(totalArticles / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getBySlug(req, res) {
    try {
      const { slug } = req.params;
      const article = await articleModels
        .findOne({
          slug,
        })
        .populate({
          path: "category",
          select: "name parentCategory",
          populate: {
            path: "parentCategory",
            select: "name",
          },
        })
        .populate("author", "name");

      res.status(200).json({
        article,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ArticleController;
