import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminModels from "../models/admin.models.js";
import { loginSchema, registerSchema } from "../middlewares/inputValidation.js";
import { z } from "zod";

dotenv.config();

class AdminController {
  static async register(req, res) {
    try {
      // Validate the request body against the schema
      const { name, email, password } = registerSchema.parse(req.body);

      // Check if the email is already in use
      let admin = await adminModels.findOne({ email });
      if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // Create new admin
      admin = new adminModels({ name, email, password });
      await admin.save();

      // Create a JWT token
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0]?.message || "Validation error",
        });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    try {
      // Validate the request body against the schema
      const { email, password } = loginSchema.parse(req.body);

      // Find admin by email
      const admin = await adminModels.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create a JWT token
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0]?.message || "Validation error",
        });
      }

       res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getProfile(req, res) {
    try {
      const admin = await adminModels.findById(req.userId).select("-password");
      res.status(200).json(admin);
    } catch (error) {
       res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateAdmin(req, res) {
    try {
      const admin = await adminModels.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const { name, email } = req.body;
      if (name) admin.name = name;
      if (email) admin.email = email;

      await admin.save();
      res.status(200).json({ message: "Admin updated successfully", admin });
    } catch (error) {
       res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default AdminController;