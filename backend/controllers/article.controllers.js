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

  static async edit(req, res) {
    try {
      const { id } = req.params;

      // Validate article ID
      const article = await articleModels.findById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      // Parse the request body for updated fields
      const {
        title,
        content,
        category,
        tags,
        isPopular,
        showOnTop,
        showOnHomePage,
        author,
        isPublished = true,
        publishedAt,
        slug,
      } = articleSchema.parse(req.body);

      // Handle thumbnail update
      let thumbnail = article.thumbnail; // Keep the old thumbnail
      if (req.file) {
        // If a new thumbnail is provided, delete the old one and set the new one
        if (thumbnail) {
          const oldFilePath = getFilePath2(thumbnail);
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Failed to delete the old thumbnail:", err);
            }
          });
        }
        thumbnail = `/article/${req.file.filename}`;
      }

      // Check if author exists
      const authorExists = await authorModels.findById(author);
      if (!authorExists) {
        return res.status(400).json({ message: "Invalid author ID" });
      }

      // Update the article fields
      article.title = title;
      article.content = content;
      article.thumbnail = thumbnail;
      article.category = JSON.parse(category);
      article.tags = JSON.parse(tags);
      article.isPopular = isPopular;
      article.showOnTop = showOnTop;
      article.showOnHomePage = showOnHomePage;
      article.isPublished = isPublished;
      article.publishedAt = publishedAt;
      article.author = author;
      article.slug = slug;

      // Save updated article
      await article.save();

      res
        .status(200)
        .json({ message: "Article updated successfully", article });
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        if (req.file) {
          const filePath = getFilePath2(req.file.filename);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Failed to delete the uploaded file:", err);
            }
          });
        }
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
        startDate = "",
        endDate = "",
      } = req.query;

      const query = {};

      if (search) {
        query.title = { $regex: search, $options: "i" };
      }

      if (category) {
        const categories = await categoryModels.find({ slug: category });
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

      if (author) {
        const authorObj = await authorModels.findOne({ name: author });
        if (authorObj) {
          query.author = authorObj._id;
        }
      }

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) {
          query.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          query.createdAt.$lte = new Date(endDate);
        }
      }

      const articles = await articleModels
        .find(query)
        .populate({
          path: "category",
          select: "name",
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

  static async getBySlug(req, res) {
    try {
      const { slug } = req.params;
      const article = await articleModels
        .findOne({
          slug,
        })
        .populate({
          path: "category",
          select: "name",
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
