"use client";

import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const categories = [
  {
    "name": "Cricket",
    "href": "/sports/cricket"
  },
  {
    "name": "Football",
    "href": "/sports/football"
  },
  {
    "name": "Nagaland Sports",
    "href": "/sports/nagaland-sports"
  },
  {
    "name": "Other Sports",
    "href": "/sports/other-sports"
  }
]

const Sports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosServer.get(
          "/article/all?category=Sports"
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
      links={[{ label: "Sports" }]}
      title="Sports"
      categories={categories}
      loading={loading}
    />
  );
};

export default Sports;
