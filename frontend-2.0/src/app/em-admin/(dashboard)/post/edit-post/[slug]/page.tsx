"use client";

import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";
import { ArrowUpToLine, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import TextEditor from "@/components/admin/TextEditor";
import axiosServer from "@/utils/axiosServer";

type CategoryOption = {
  name: string;
  _id: string;
  parentCategory?: {
    id: string;
    name: string;
  };
};

type AuthorProps = {
  name: string;
  _id: string;
  avatar?: string;
};

type TagProps = {
  title: string;
};

const EditPost = () => {
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<CategoryOption[]>([]);
  const [authors, setAuthors] = useState<AuthorProps[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [id, setId] = useState<string>("");
  const router = useRouter();
  const { slug } = useParams();

  const fetchData = async (slug: string) => {
    const { data } = await axiosServer.get("/article/by/" + slug);
    return data.article;
  };

  const { isPending, data } = useQuery({
    queryKey: [slug],
    queryFn: () => fetchData(slug as string),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    setTitle(data?.title);
    setValue(data?.content);
    setSelectedTags(data?.tags || []);
    setSelectedAuthor(data?.author?._id || "");
    setCategory(data?.category || []);
    setMedia(process.env.NEXT_PUBLIC_API_BASE_URL + data?.thumbnail);
    setId(data?._id);
  }, [data]);

  const getCategories = async () => {
    const { data } = await axiosInstance.get("/category/all/cat");
    return data;
  };

  const { data: categories } = useQuery({
    queryKey: ["categories-all"],
    queryFn: getCategories,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const getAuthors = async () => {
    try {
      const { data } = await axiosInstance.get(`/author/all`);
      setAuthors(data?.authors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    try {
      const slug = slugify(title);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", value);
      formData.append(
        "category",
        JSON.stringify(category?.map((item) => item?._id))
      );
      formData.append("author", selectedAuthor);
      formData.append("tags", JSON.stringify(selectedTags));
      formData.append("slug", slug);
      if (file) {
        formData.append("thumbnail", file);
      }

      const { data } = await axiosInstance.put(
        "/article/edit/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data?.message);
      router.push("/em-admin/post/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === "dragenter" || event.type === "dragover");
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      setFile(file);
      reader.onload = (e) => {
        setMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      setFile(file);
      reader.onload = (e) => {
        setMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setMedia("");
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Do you want to save the draft or leave the page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [title, value, media]);

  const suggestedTags: TagProps[] = [
    { title: "Tech" },
    { title: "Science" },
    { title: "Education" },
    { title: "Health" },
    { title: "Finance" },
  ];

  return (
    <div className="p-[50px]">
      <input
        type="text"
        placeholder="Title"
        value={title}
        className={cn(
          "lora-blod text-2xl border-none outline-none bg-transparent w-full pb-10"
        )}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div
        className={`flex justify-center bg-[#F6F7F9] p-3 rounded-md mb-6 min-h-[350px] border border-dashed ${
          dragActive ? "border-blue-600" : ""
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {media ? (
          <div className="relative w-full">
            <img
              src={media}
              alt="Selected file"
              className="h-full w-full object-cover rounded-md"
            />

            <Button
              onClick={handleClear}
              className="absolute rounded-full top-2 right-2 bg-transparent text-white"
              size="icon"
              variant="outline"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="upload-button"
            className="h-full cursor-pointer flex flex-col items-center pb-10"
          >
            <input
              className="hidden"
              type="file"
              id="upload-button"
              onChange={handleChange}
            />
            <img
              className="h-[80%]"
              src="/svg/svgviewer-output.svg"
              alt="Upload Icon"
            />
            <h3 className="text-center font-medium text-[#1C252E] text-xl">
              Drop or select file
            </h3>
            <div className="flex gap-1 mt-3">
              <p className="text-center text-sm text-[#637381]">
                Drop files here or click to upload
              </p>
              <span className="text-center text-sm text-[#00A76F] font-medium underline">
                browse
              </span>
              <p className="text-center text-sm text-[#637381]">
                through your machine.
              </p>
            </div>
          </label>
        )}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="name">Category</Label>
          <Autocomplete
            multiple
            id="tags-filled"
            options={categories?.map((option: any) => option)}
            freeSolo
            value={category}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name || ""
            }
            onChange={(event, newValue) => {
              setCategory(newValue as CategoryOption[]);
            }}
            renderTags={(value: readonly any[], getTagProps) =>
              value.map((option: any, index: number) => (
                <React.Fragment key={index}>
                  <Chip
                    variant="outlined"
                    label={option.name}
                    {...getTagProps({ index })}
                  />
                </React.Fragment>
              ))
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Categories" />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Author</Label>
          <Autocomplete
            options={authors?.map((option) => option)}
            value={
              selectedAuthor
                ? authors.find((author) => author._id === selectedAuthor) ||
                  null
                : null
            }
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name || ""
            }
            onChange={(event, newValue) => {
              setSelectedAuthor(newValue?._id || "");
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Author" />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <Label htmlFor="name">Tags</Label>
        <Autocomplete
          multiple
          id="tags-filled"
          options={suggestedTags.map((option) => option.title)}
          freeSolo
          value={selectedTags}
          onChange={(event, newValue) => {
            setSelectedTags(newValue);
          }}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <React.Fragment key={index}>
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              </React.Fragment>
            ))
          }
          renderInput={(params) => (
            <TextField {...params} placeholder="Select Tags" />
          )}
        />
      </div>

      <div className="border border-gray-300 rounded-md p-4 mb-6">
        <TextEditor value={value} setValue={setValue} />
      </div>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button className="bg-[#00A76F]" onClick={handleSubmit}>
          Update Article
          <ArrowUpToLine className="w-4 h-4 ml-2" />
        </Button>
      </Box>
    </div>
  );
};

export default EditPost;
