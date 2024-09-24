"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRecoilValue } from "recoil";
import { articleState } from "@/atoms/articleAtom";
import { formatDate } from "@/utils/date";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import { useDebounce } from "use-debounce";

export type Article = {
  _id: string;
  title: string;
  content: string;
  publishedAt: string;
  tags: string[];
  category: Category[];
  isPublished: boolean;
};

export type Category = {
  _id: string;
  name: string;
  parentCategory: string;
  status: boolean;
};

interface FetchArticlesResponse {
  articles: Article[];
  totalPages: number;
  currentPage: number;
}

export default function CategoryTable() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500); // debounce with 500ms delay
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<string>("desc");
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
    search?: string;
    category?: string;
    author?: string;
  }): Promise<FetchArticlesResponse> => {
    const { data } = await axiosInstance.get(
      `/article/all?page=${params?.page}&search=${params?.search}`
    );
    setTotalPages(data?.totalPages);
    return data;
  };

  const {
    data = { articles: [], totalPages: 0, currentPage: 1 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles", { page, limit, sort, order, search: debouncedSearch }],
    queryFn: () => fetchArticles({ page, limit, sort, order, search: debouncedSearch }),
    staleTime: 300000, // 5 minutes
    
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="flex items-center py-4">
          <Input
            placeholder="Search post..."
            className="max-w-sm"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.articles.length ? (
                data.articles.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <div>{row?.title}</div>
                    </TableCell>
                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: row?.content.slice(0, 150).trim(),
                        }}
                      ></div>
                    </TableCell>
                    <TableCell>
                      <div>{formatDate(row?.publishedAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div>{row?.tags?.join(", ")}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {row?.category?.map((item) => item?.name).join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={row?.isPublished ? "default" : "destructive"}
                      >
                        {row?.isPublished ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => alert(`Article ID: ${row._id}`)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              alert(`Editing Article ID: ${row._id}`)
                            }
                          >
                            Edit Article
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(row._id)
                            }
                          >
                            Copy Article ID
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            count={data?.totalPages || totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
