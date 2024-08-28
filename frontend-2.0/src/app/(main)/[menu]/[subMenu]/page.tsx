"use client";

import SubPage from "@/components/main/SubPage";
import { convertString } from "@/lib/utils";
import axiosServer from "@/utils/axiosServer";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SubMenu = () => {
  const { menu, subMenu } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosServer.get(
          "/article/all?category=" + subMenu
        );
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
  }, [subMenu]);
  console.log(menu);
  return (
    <SubPage
      loading={loading}
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
