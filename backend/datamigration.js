// import fs from "fs";
// import path from "path";
// import Category from "./models/category.models.js";
// import mongoose from "mongoose";

// import { fileURLToPath } from "url";

// // Get the current directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// async function saveCategories() {
//   try {
//     // Read the JSON file
//     const filePath = path.join(__dirname, "ospiz_terms.json");
//     const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//     await mongoose.connect("mongodb://localhost:27017/eastern-mirror", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     for (const item of data) {
//       const { name, slug } = item; // Destructure to get only name and slug

//       // Create a new category instance
//       const newCategory = new Category({ name, slug });

//       // Save the new category to the database
//       await newCategory.save();
//       console.log(`Category saved successfully: ${name}`);
//     }
//   } catch (error) {
//     console.error("Error saving categories:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// saveCategories()