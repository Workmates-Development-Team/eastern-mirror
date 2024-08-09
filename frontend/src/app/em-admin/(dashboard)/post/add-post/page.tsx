"use client";

import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SeacrhSelect } from "@/components/admin/SearchSelect";
import { useRecoilValue } from "recoil";
import { categoryState } from "@/atoms/categoryAtom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import { SelectDate } from "@/components/admin/SelectDate";
import axiosInstance from "@/utils/axios";

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type CategoryOption = {
  label: string;
  value: string;
};

type AuthorProps = {
  name: string;
  _id: string;
  avatar?: string;
};

const AddPost = () => {
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [category, setCategory] = useState("");
  const [openPovover, setOpenPopover] = useState(false);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const categories2 = useRecoilValue(categoryState);

  const [authors, setAuthors] = useState<AuthorProps[]>([]);

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

  useEffect(() => {
    const newArray = categories2?.map(
      (item: { name: string; _id: string }) => ({
        label: item?.name,
        value: item._id,
      })
    );

    setCategories(newArray);
  }, [categories2]);

  const handleEditorChange = (content: string) => {
    setValue(content);
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    console.log({
      title,
      desc: value,
      img: media,
      slug: slugify(title),
    });
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
      reader.onload = (e) => {
        setMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setMedia("");
  };

  return (
    <div className="p-[50px]">
      <input
        type="text"
        placeholder="Title"
        className={cn(
          "lora-blod text-2xl border-none outline-none bg-transparent w-full pb-10"
        )}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div
        className={`flex justify-center bg-[#F6F7F9] p-3 rounded-md mb-6 h-[350px] border border-dashed ${
          dragActive ? "border-blue-600" : ""
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {media ? (
          <div className="relative w-full bg-red-400">
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
          <SeacrhSelect
            placeholder="Select Category"
            value={category}
            setValue={(value) => setCategory(value)}
            open={openPovover}
            setOpen={setOpenPopover}
            categories={categories}
            className="h-[55.961px]"
          />
        </div>
        <div className="flex flex-col gap-2  col-span-2">
          <Label htmlFor="name">Tags</Label>
          <Autocomplete
            multiple
            id="tags-filled"
            options={suggestedTags.map((option) => option.title)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select Tags"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="author">Author</Label>
          <Autocomplete
            id="author"
            options={authors}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="20"
                    height="20"
                    className="rounded-full aspect-square h-5 w-5"
                    src={
                      option?.avatar
                        ? process.env.NEXT_PUBLIC_API_BASE_URL + option.avatar
                        : "/images/noprofile.png"
                    }
                    alt=""
                  />
                  {option.name}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "author",
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Date</Label>
          <SelectDate />
        </div>
      </div>

      <ReactQuill
        value={value}
        onChange={(content, delta, source, editor) =>
          handleEditorChange(editor.getHTML())
        }
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        style={{ background: "#0080000a", minHeight: 400 }}
      />
      <Button
        className="absolute top-20 z-10 right-4 rounded-3xl"
        size="sm"
        onClick={handleSubmit}
      >
        Publish
      </Button>
    </div>
  );
};

export default AddPost;

const suggestedTags = [{ title: "Facebook  account" }];
