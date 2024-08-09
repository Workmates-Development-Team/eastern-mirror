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
import { authorState } from "@/atoms/authorAtom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Category = {
  id: string;
  name: string;
  parentCategory: string;
  status: boolean;
};

type AUthorTableProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
};

export default function AuthorTable({ setSearch, search }: AUthorTableProps) {
  const authors = useRecoilValue(authorState);

  return (
    <div className="w-full">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Authors</h2>
        <div className="flex items-center py-4">
          <Input
            placeholder="Search authors..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors?.length ? (
                authors.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <div>
                          <Avatar>
                            <AvatarImage
                              src={
                                row?.avatar
                                  ? process.env.NEXT_PUBLIC_API_BASE_URL +
                                    row.avatar
                                  : "/images/noprofile.png"
                              }
                            />
                            <AvatarFallback>
                              {row?.name?.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="text-base font-medium">{row?.name}</p>
                          <p className="text-gray-400 text-sm ">{row?.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>{row?.username}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge
                          variant={!row?.isDeleted ? "default" : "destructive"}
                        >
                          {!row?.isDeleted ? "Active" : "Inactive"}
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
                  <TableCell colSpan={0} className="h-24 text-center">
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
