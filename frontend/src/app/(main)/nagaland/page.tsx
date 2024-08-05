import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import Heading from "@/components/main/Heading";
import Section1 from "@/components/main/sections/Section1";
import { buttonVariants } from "@/components/ui/button";
import { cn, url_maker } from "@/lib/utils";
import { MOST_POPULAR, TOP_NEWS } from "@/static/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

      <Section1 data={TOP_NEWS} heading="TOP NEWS" />

      <Heading title={"Nagaland"} />

      <div className="container py-2 px-4 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-7 mt-3">
        <div className="col-span-2">
          <div className="flex flex-wrap gap-3 ">
            {categories.map((item: string, i: number) => (
              <Link
              key={i}
                className={cn(buttonVariants({ variant: "outline" }))}
                href={"/nagaland/" + item.toLocaleLowerCase()}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-7">
            {TOP_NEWS.map((item, i) => (
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

const Card = ({ data }: { data: any }) => (
  <div className="bg-[#F5F6F9] grid grid-cols-6 gap-7">
    <div className="col-span-2 relative">
      <Link href={"/" + url_maker(data?.title)} className="w-full h-[200px] ">
        <Image
          width={300}
          height={200}
          className="w-full h-full object-cover max-h-[200px]"
          src={data.image}
          alt="blog-image"
        />
      </Link>

      <div className="bg-black text-white absolute top-0 left-0 text-sm py-2 px-3 roboto-regular">
        KOHIMA
      </div>
    </div>

    <div className="col-span-4 flex flex-col justify-center p-3 pl-0">
      <Link href={"/" + url_maker(data?.title)}>
        <h2 className="text-[#080F18] lora-bold text-lg pb-2.5">
          {data?.title}
        </h2>
      </Link>
      <p className="text-[#646464] text-sm pb-2.5">{data.content}</p>
      <p className="text-xs text-[#BBBBBB]">{data.published_on}</p>
    </div>
  </div>
);
