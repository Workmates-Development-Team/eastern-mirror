"use client";

import SubPage from "@/components/main/SubPage";
import { convertString } from "@/lib/utils";
import axiosServer from "@/utils/axiosServer";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const SubMenu = () => {
  const { menu, subMenu } = useParams();
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

  if (!isPending && !data) {
    return router.push("/");
  }

  return (
    <SubPage
      loading={isPending}
      data={data}
      links={[
        { label: convertString(menu as string), href: `/${menu}` },
        { label: convertString(subMenu as string) },
      ]}
      title={convertString(subMenu as string)}
    />
  );
};

export default SubMenu;
