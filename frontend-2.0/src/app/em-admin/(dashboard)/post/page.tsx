"use client";

import { articleState } from "@/atoms/articleAtom";
import PostTable from "@/components/admin/table/PostTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axiosInstance from "@/utils/axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Post() {
  const setArticle = useSetRecoilState(articleState);
  const [search, setSearch] = useState("");

  const getArticles = async () => {
    try {
      const { data } = await axiosInstance.get("/article/all");
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, [search]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All Posts
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all posts below.</p>
        </div>

        <div>
          <Link
            href="/em-admin/post/add-post"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Post
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        <PostTable />
      </div>
    </main>
  );
}