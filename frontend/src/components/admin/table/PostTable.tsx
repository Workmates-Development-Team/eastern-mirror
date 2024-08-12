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
import { useRecoilValue } from "recoil";
import { articleState } from "@/atoms/articleAtom";
import { formatDate } from "@/utils/date";

export type Category = {
  id: string;
  name: string;
  parentCategory: string;
  status: boolean;
};

export default function CategoryTable() {
  const { articles } = useRecoilValue(articleState);

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
                <TableHead>Title </TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles?.length ? (
                articles.map((row: any) => (
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
                      <div> {formatDate(row?.publishedAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div> {row?.tags?.join(", ")}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {" "}
                        {row?.category
                          ?.map((item: { name: string }) => item?.name)
                          .join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge variant={row?.isPublished ? "default" : "destructive"}>
                          {row?.isPublished ? "Yes" : "No"}
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
                    colSpan={articles.length}
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
