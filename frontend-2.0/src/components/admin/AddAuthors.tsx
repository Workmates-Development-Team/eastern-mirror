"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import Image from "next/image";

type AddAuthorsProps = {
  getAuthors: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddAuthors({ getAuthors, setSearch }: AddAuthorsProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("/images/noprofile.png");
  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Author name is required")
        .min(2, "Must be at least 2 characters"),
      email: Yup.string()
        .required("email is required")
        .email("Invalid Email format"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        const { data } = await axiosInstance.post("/author/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(data?.message);
        setSearch("");
        getAuthors();
        resetForm();
        setOpen(false);
        setImagePreview("/images/noprofile.png");
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something Went Wrong");
      }
    },
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
    setImagePreview("/images/noprofile.png"); // Reset image preview on cancel
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add New Author
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Author</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 items-center">
            <Label
              htmlFor="avatar"
              className="bg-slate-300 w-28 h-28 rounded-full overflow-hidden"
            >
              <Image
                width={112}
                height={112}
                className="object-cover h-full w-full"
                src={imagePreview}
                alt="profile preview"
              />
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setFieldValue("avatar", file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="col-span-3 hidden"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...getFieldProps("name")}
              className={`col-span-3 ${
                touched.name && errors.name ? "border-red-500" : ""
              }`}
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.name}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...getFieldProps("email")}
              className={`col-span-3 ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.email}
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleCancel}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
