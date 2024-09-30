import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { loginSchema, registerSchema } from "../middlewares/inputValidation.js";
import { z } from "zod";
import userModels from "../models/user.models.js";

dotenv.config();

class UserController {
  static async create(req, res) {
    try {
      const { firstName, lastName, email, userType, password } =
        registerSchema.parse(req.body);

      let user = await userModels.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new userModels({ firstName, lastName, userType, email, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        message: "User craeted successfully",
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
      const { email, password } = loginSchema.parse(req.body);

      const admin = await userModels.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

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
      const user = req.user;
      user.password = undefined;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllUser(req, res) {
    try {
      const users = await userModels
        .find({ isDeleted: false })
        .select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { firstName, lastName, userType } = req.body;
      const { id } = req.params;

      const user = await userModels.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.userType = userType || user.userType;

      await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async changePassword(req, res) {
    try {
      const { newPassword } = req.body;
      const { id } = req.params;

      const user = await userModels.findById(id);

      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async changeMyPassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await userModels.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect current password" });
      }

      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      let user = await userModels.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await userModels.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default UserController;
