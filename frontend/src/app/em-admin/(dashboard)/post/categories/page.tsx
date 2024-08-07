import AddCategory from "@/components/admin/AddCategory";
import CategoryTable from "@/components/admin/table/CategoryTable";
import React from "react";



export default function Category() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All Categories
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all category below.</p>
        </div>

        <div>
          <AddCategory />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        <CategoryTable />
      </div>
    </main>
  );
}
