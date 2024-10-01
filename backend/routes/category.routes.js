import express from "express";
import CategoryController from "../controllers/category.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/add", authMiddleware, CategoryController.add);
router.delete("/delete/:id", authMiddleware, CategoryController.delete);
router.get("/all", CategoryController.getAll);
router.get("/all/cat", CategoryController.getAllCategory);
router.get("/parent/:parentCategory", CategoryController.getByParent);

export default router;
