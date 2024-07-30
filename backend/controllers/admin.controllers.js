import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminModels from "../models/admin.models.js";
import { registerSchema } from "../middlewares/inputValidation.js";

dotenv.config();

class AdminController {
  
  // Register
  static async register(req, res) {
    try {
      const { name, email, password } = registerSchema.parse(req.body);

      let admin = await adminModels.findOne({ email });
      if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      admin = new adminModels({ name, email, password });
      await admin.save();

      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //   Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

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
      res.status(500).json({ message: error.message });
    }
  }

  //   Get profile
  static async getProfile(req, res) {
    try {
      const admin = await adminModels
        .findById(req.admin.id)
        .select("-password");
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AdminController;
