import express from "express";
import adminRoutes from "./admin.routes.js";
import categoryRoutes from "./category.routes.js";
import authorRoutes from "./author.routes.js";
import articleRoutes from './article.routes.js'
import userRoutes from './user.routes.js'

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/author", authorRoutes);
router.use("/article", articleRoutes);

export default router;
