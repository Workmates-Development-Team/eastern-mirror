import { z } from "zod";
import categoryModels from "../models/category.models.js";
import authorModels from "../models/author.models.js";
import articleModels from "../models/article.models.js";
import { articleSchema } from "../middlewares/inputValidation.js";
import { getFilePath2 } from "../utils/helper.js";
import fs from "fs";

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
      } = articleSchema.parse(req.body);

      let thumbnail = "";
      if (req.file) {
        thumbnail = `/article/${req.file.filename}`;
      }

      const categoryExists = await categoryModels.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const authorExists = await authorModels.findById(author);
      if (!authorExists) {
        return res.status(400).json({ message: "Invalid author ID" });
      }

      const article = new articleModels({
        title,
        content,
        thumbnail,
        category,
        tags,
        isPopular,
        showOnTop,
        showOnHomePage,
        isPublished: isPublished || false,
        publishedAt,
        author,
      });

      await article.save();
      res
        .status(201)
        .json({ message: "Article created successfully", article });
    } catch (error) {
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
        parentCategory = "",
        author = "",
      } = req.query;

      const query = {};

      if (search) {
        query.$text = { $search: search };
      }

      if (category) {
        query.category = category;
      }

      if (parentCategory) {
        const parent = await categoryModels.findOne({ name: parentCategory });
        if (parent) {
          const childCategories = await categoryModels.find({
            parentCategory: parent._id,
          });
          const childCategoryIds = childCategories.map((cat) => cat._id);
          query.category = { $in: [parent._id, ...childCategoryIds] };
        }
      }

      if (author) {
        const authorObj = await authorModels.findOne({ name: author });
        if (authorObj) {
          query.author = authorObj._id;
        }
      }

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
}

export default ArticleController;
