"use client";

import SubPage from "@/components/main/SubPage";
import { convertString } from "@/lib/utils";
import {
  artsAndEntertainment,
  nagaland,
  opinion,
  scienceAndTech,
  sports,
} from "@/static/submenu";
import axiosServer from "@/utils/axiosServer";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const { menu } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosServer.get("/article/all?category=" + menu);
        console.log(data);
        // if (data?.articles.length === 0) {
        //   router.push("/");
        // }
        setData(data?.articles || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [menu]);
  console.log(menu);
  return (
    <SubPage
      loading={loading}
      data={data}
      categories={
        menu === "nagaland"
          ? nagaland
          : menu === "arts-and-entertainment"
          ? artsAndEntertainment
          : menu === "opinion"
          ? opinion
          : menu === "science-and-tech"
          ? scienceAndTech
          : menu === "sports"
          ? sports
          : undefined
      }
      links={[{ label: convertString(menu as string) }]}
      title={convertString(menu as string)}
    />
  );
};

export default Menu;
