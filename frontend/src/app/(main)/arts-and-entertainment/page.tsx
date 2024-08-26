"use client";

import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const categories = ["Book Reviews", "Film", "Music", "Pop Culture"];

const ArtsandEntertainment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosServer.get(
          "/article/all?category=Arts and Entertainment"
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
      links={[{ label: "Arts and Entertainment" }]}
      title="Arts and Entertainment"
      categories={categories}
      loading={loading}
    />
  );
};

export default ArtsandEntertainment;
