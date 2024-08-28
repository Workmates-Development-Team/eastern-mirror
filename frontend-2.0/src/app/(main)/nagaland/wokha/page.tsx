"use client";

import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const Wokha = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
      const { data } = await axiosServer.get(
        "/article/all?category=Wokha"
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
    links={[{ label: "Wokha" }]}
    title="Wokha"
    loading={loading}
  />
  );
};

export default Wokha;