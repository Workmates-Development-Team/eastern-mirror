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
      const { data: nagalandData } = await axiosServer.get(
        "/article/all?category=Nagaland"
      );
      setData(nagalandData?.articles || []);
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent
          links={[
            { label: "Home", href: "/" },
            { label: "Nagaland", href: "/nagaland" },
          ]}
        />
      </div>

      <Heading title={"Nagaland"} />

      <div className="container py-2 px-4 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-7 mt-3">
        <div className="md:col-span-2">
          <div className="flex flex-wrap md:gap-3 gap-2">
            {categories.map((item: string, i: number) => (
              <Link
                key={i}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "md:h-10 h-9 text-xs md:text-sm px-3 md:px-4"
                )}
                href={"/nagaland/" + item.toLocaleLowerCase()}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="md:mt-10 mt-8 flex flex-col md:gap-7 gap-4">
            {data.map((item, i) => (
              <Card key={i} data={item} />
            ))}
          </div>
        </div>

        <div className="">
          <div className="flex justify-center">
            <div className="bg-[#002366]  md:text-lg text-base py-2 px-4 text-white roboto-regular">
              <p>MOST POPULAR</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:mt-10 mt-7 ">
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
      isBorder ? "md:border-b-2 border-b" : "",
      " border-[#DDDDDD] md:pb-4 pb-3 flex items-center md:gap-7 gap-4"
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
        <h2 className="text-[#646464] lora-regular md:text-lg text-sm">
          {data?.title}
        </h2>
      </Link>
    </div>
  </div>
);

const Card = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div className="bg-[#F5F6F9] grid grid-cols-6 md:gap-7 gap-3">
      <div className="md:col-span-2 col-span-3 relative">
        <Link href={"/" + data?.slug} className="w-full h-[200px] ">
          <Image
            width={300}
            height={200}
            className="w-full h-full object-cover max-h-[200px]"
            src={getImageUrl(data?.thumbnail)}
            alt="blog-image"
          />
        </Link>

        <div className="bg-black text-white uppercase absolute top-0 left-0 md:text-sm text-xs py-2 px-3 roboto-regular">
          {data?.category[0].name}
        </div>
      </div>

      <div className="md:col-span-4 col-span-3 flex flex-col justify-center md:p-3 p-2 pl-0">
        <Link href={"/" + data?.slug}>
          <h2 className="text-[#080F18] lora-bold md:text-lg leading-tight md:leading-normal text-sm md:pb-2.5 pb-2">
            {data?.title}
          </h2>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.content.slice(0, 200) + "...",
          }}
          className="text-[#646464] md:text-sm text-xs pb-2.5 truncate md:whitespace-normal md:overflow-visible md:text-overflow-clip"
        ></div>
        <p className="text-xs text-[#BBBBBB] hidden md:block">
          {formatDate(data?.publishedAt)}
        </p>
      </div>
    </div>
  );
};
