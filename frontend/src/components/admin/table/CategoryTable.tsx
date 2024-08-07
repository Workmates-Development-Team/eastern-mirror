"use client";

import * as React from "react";
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
import axiosInstance from "@/utils/axios";
import { categoryState } from "@/atoms/categoryAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export type Category = {
  id: string;
  name: string;
  parentCategory: string;
  status: boolean;
};

export default function CategoryTable() {
  const categories = useRecoilValue(categoryState);
  const setCategories = useSetRecoilState(categoryState);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category/all");

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="flex items-center py-4">
          <Input placeholder="Filter category names..." className="max-w-sm" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length ? (
                categories.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <div>{row?.name}</div>
                    </TableCell>

                    <TableCell>
                      <div>{row?.parentCategory?.name || "---"}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge variant={true ? "default" : "destructive"}>
                          {true ? "Active" : "Inactive"}
                        </Badge>
                      </div>
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
                            onClick={() => alert(`Category ID: `)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Editing Category ID: `)}
                          >
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(row._id)
                            }
                          >
                            Copy Category ID
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={categories.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
