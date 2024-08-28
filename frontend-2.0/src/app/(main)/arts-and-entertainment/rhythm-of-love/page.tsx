"use client";

import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const RhythmOfLove = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
      const { data } = await axiosServer.get(
        "/article/all?category=Rhythm of Love"
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
      links={[
        { label: "Arts and Entertainment", href: "/arts-and-entertainment" },
        { label: "Rhythm of Love" },
      ]}
      title="Rhythm of Love"
      loading={loading}
    />
  );
};

export default RhythmOfLove;
