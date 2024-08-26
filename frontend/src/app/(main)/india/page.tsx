"use client";

import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import Heading from "@/components/main/Heading";
import Section1 from "@/components/main/sections/Section1";
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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosServer.get(
        "/article/all?category=India"
      );
      setData(data?.articles || []);
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent
          links={[
            { label: "Home", href: "/" },
            { label: "India", href: "" },
          ]}
        />
      </div>

      <Section1 data={TOP_NEWS} heading="TOP NEWS" />

      <Heading title={"India"} />

      <div className="container py-2 px-4 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-7 mt-3">
        <div className="col-span-2">
      

          <div className="mt-10 flex flex-col gap-7">
            {data.map((item, i) => (
              <Card key={i} data={item} />
            ))}
          </div>
        </div>

        <div className="">
          <div className="flex justify-center">
            <div className="bg-[#002366] py-2 px-4 text-white text-lg roboto-regular">
              <p>MOST POPULAR</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            {MOST_POPULAR.map((item: any, i: number) => (
              <PopularCard
                key={i}
                isBorder={i !== MOST_POPULAR.length - 1}
                data={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nagaland;

const PopularCard = ({
  data,
  isBorder,
}: {
  data: {
    image: string;
    title: string;
  };

  isBorder?: boolean;
}) => (
  <div
    className={cn(
      isBorder ? "border-b-2" : "",
      " border-[#DDDDDD] pb-4 flex items-center gap-7"
    )}
  >
    <div>
      <div className="w-[65px] h-[65px]">
        <Link href={"/" + url_maker(data?.title)}>
          <Image
            width={65}
            height={65}
            className="w-full h-full object-cover"
            src={data.image}
            alt="blog-image"
          />
        </Link>
      </div>
    </div>

    <div>
      <Link href={"/" + url_maker(data?.title)}>
        <h2 className="text-[#646464] lora-regular text-lg pb-2.5">
          {data?.title}
        </h2>
      </Link>
    </div>
  </div>
);

const Card = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div className="bg-[#F5F6F9] grid grid-cols-6 gap-7">
      <div className="col-span-2 relative">
        <Link href={"/" + data?.slug} className="w-full h-[200px] ">
          <Image
            width={300}
            height={200}
            className="w-full h-full object-cover max-h-[200px]"
            src={getImageUrl(data?.thumbnail)}
            alt="blog-image"
          />
        </Link>

      
      </div>

      <div className="col-span-4 flex flex-col justify-center p-3 pl-0">
        <Link href={"/" + data?.slug}>
          <h2 className="text-[#080F18] lora-bold text-lg pb-2.5">
            {data?.title}
          </h2>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.content.slice(0, 200) + "...",
          }}
          className="text-[#646464] text-sm pb-2.5"
        ></div>
        <p className="text-xs text-[#BBBBBB]">
          {formatDate(data?.publishedAt)}
        </p>
      </div>
    </div>
  );
};
