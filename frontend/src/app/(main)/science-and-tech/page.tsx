"use client";

import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import Heading from "@/components/main/Heading";
import Section1 from "@/components/main/sections/Section1";
import SubPage from "@/components/main/SubPage";
import { buttonVariants } from "@/components/ui/button";
import { cn, url_maker } from "@/lib/utils";
import { MOST_POPULAR, TOP_NEWS } from "@/static/data";
import axiosServer from "@/utils/axiosServer";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const categories = [
  {
    name: "Digi-buzz",
    href: "/category/digi-buzz",
  },
  {
    name: "Gaming",
    href: "/category/gaming",
  },
  {
    name: "Tech News",
    href: "/category/tech-news",
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
