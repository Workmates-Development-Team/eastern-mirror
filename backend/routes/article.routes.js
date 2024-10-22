import express from "express";
import ArticleController from "../controllers/article.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import { thumbnailUpload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  thumbnailUpload.single("thumbnail"),
  ArticleController.add
);

router.put(
  "/edit/:id",
  authMiddleware,
  thumbnailUpload.single("thumbnail"),
  ArticleController.edit
);

router.patch("/toggle-publish/:id", ArticleController.togglePublish);
router.put("/update/:id", ArticleController.update);
router.delete("/delete/:id", ArticleController.delete);
router.get("/all", ArticleController.getAll);
router.get("/by/:slug", ArticleController.getBySlug);

export default router;
