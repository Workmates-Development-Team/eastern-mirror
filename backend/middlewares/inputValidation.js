import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, {
      message: "Name is required",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export const categorySchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
    })
    .min(1, "Category name is required"),
  parentCategory: z.string().optional(),
});

export const authorSchema = z.object({
  name: z
    .string({
      required_error: "Author name is required",
    })
    .min(1),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
});

export const articleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required"),
    slug: z
    .string({
      required_error: "slug is required",
    })
    .min(1, "slug is required"),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Content is required"),
  thumbnail: z.string().optional(),
  category: z
    .string({
      required_error: "Category ID is required",
    })
    .min(1, "Category ID is required"),
  tags: z.string().optional(),
  isPopular: z.boolean().optional(),
  showOnTop: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  showOnHomePage: z.boolean().optional(),
  author: z
    .string({
      required_error: "Author ID is required",
    })
    .min(1, "Author ID is required"),
});
