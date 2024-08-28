"use client";

import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const categories = [
  {
    name: "Editorial",
    href: "/opinion/editorial",
  },
  {
    name: "Letters to the Editor",
    href: "/opinion/letters-to-the-editor",
  },
  {
    name: "Op-Ed",
    href: "/opinion/op-ed",
  },
  {
    name: "Our Columnists",
    href: "/opinion/our-columnists",
  },
  {
    name: "Spirituality",
    href: "/opinion/spirituality",
  },
  {
    name: "Views & Reviews",
    href: "/opinion/views-reviews",
  },
];

const Opinion = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosServer.get("/article/all?category=Opinion");
        setData(data?.articles || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <SubPage
      data={data}
      links={[{ label: "Opinion" }]}
      title="Opinion"
      categories={categories}
      loading={loading}
    />
  );
};

export default Opinion;
