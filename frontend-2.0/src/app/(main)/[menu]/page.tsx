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
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Menu = () => {
  const { menu } = useParams();
  const router = useRouter();

  const fetchCategoryArticles = async (category: string) => {
    const { data } = await axiosServer.get(`/article/all?category=${category}`);
    return data.articles;
  };

  const { isPending, data } = useQuery({
    queryKey: [menu],
    queryFn: () => fetchCategoryArticles(menu as string),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (!isPending && (!data?.length || !data)) {
    return router.push("/");
  }

  return (
    <SubPage
      loading={isPending}
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
