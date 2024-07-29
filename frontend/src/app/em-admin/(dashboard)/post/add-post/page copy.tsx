"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import { ExternalLink, ImageIcon, Plus, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WritePage = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const upload = () => {
      if (file) {
        // Upload logic here
      }
    };

    file && upload();
  }, [file]);

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
    // const res = await fetch("/api/posts", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title,
    //     desc: value,
    //     img: media,
    //     slug: slugify(title),
    //     catSlug: catSlug || "style",
    //   }),
    // });

    // if (res.status === 200) {
    //   const data = await res.json();
    //   router.push(`/posts/${data.slug}`);
    // }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Title"
        className={cn(
          "lora-blod p-[50px] text-2xl border-none outline-none bg-transparent w-full"
        )}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select> */}
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Plus className="w-4 h-4" />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e?.target?.files?.[0] || null)}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <ImageIcon className="w-4 h-4" />
              </label>
            </button>
            <button className={styles.addButton}>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className={styles.addButton}>
              <Video className="w-4 h-4" />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <Button
        className="absolute top-4 right-4 rounded-3xl"
        size="sm"
        onClick={handleSubmit}
      >
        Publish
      </Button>
    </div>
  );
};

export default WritePage;
