import PostTable from "@/components/admin/table/PostTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const Post = () => {
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
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add New Post
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        <PostTable />
      </div>
    </main>
  );
};

export default Post;
