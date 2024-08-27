"use client";

import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const categories = [
  {
    name: "Digi-buzz",
    href: "/science-and-tech/digi-buzz",
  },
  {
    name: "Gaming",
    href: "/science-and-tech/gaming",
  },
  {
    name: "Tech News",
    href: "/science-and-tech/tech-news",
  },
];

const ScienceAndTech = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosServer.get(
          "/article/all?category=Science and Tech"
        );
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
      links={[{ label: "Science and Tech" }]}
      title="Science and Tech"
      categories={categories}
      loading={loading}
    />
  );
};

export default ScienceAndTech;
