"use client";
import SubPage from "@/components/main/SubPage";
import axiosServer from "@/utils/axiosServer";
import React, { useEffect, useState } from "react";

const categories = [
  "Chumoukedima",
  "Diaspora",
  "Dimapur",
  "Kiphire",
  "Kohima",
  "Longleng",
  "Mokokchung",
  "Mon",
  "Niuland",
  "Noklak",
  "Peren",
  "Phek",
  "Shamator",
  "Tseminyu",
  "Tuensang",
  "Wokha",
  "Zunheboto",
];

const Nagaland = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: nagalandData } = await axiosServer.get(
          "/article/all?category=Nagaland"
        );
        setData(nagalandData?.articles || []);
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
      categories={categories}
      links={[{ label: "Nagaland" }]}
      title="Nagaland"
      loading={loading}
    />
  );
};

export default Nagaland;
