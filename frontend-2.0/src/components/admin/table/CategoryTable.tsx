"use client";

import * as React from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

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
import { Pagination } from "@mui/material";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface CategoryTableProps {
  totalPage: number;
  categories: Category[];
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  setPage?: (term: number) => void;
  page: number;
  handlePageChange: (_: unknown, newPage: number) => void;
  refetch: () => void;
}

export default function CategoryTable({
  totalPage,
  categories,
  searchTerm,
  setSearchTerm,
  page,
  handlePageChange,
  setPage,
  refetch,
}: CategoryTableProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPage?.(1);
    setSearchTerm?.(value);
  };

  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete("/category/delete/" + id);
      refetch();
      toast.success("Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="flex items-center py-4">
          <Input
            placeholder="Search category names..."
            className="max-w-sm"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length ? (
                categories?.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <div>{row?.name}</div>
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
                            disabled={loading}
                            onClick={() => handleDelete(row?._id)}
                          >
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              alert(`Editing Category ID: ${row._id}`)
                            }
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Pagination
          count={totalPage}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}
