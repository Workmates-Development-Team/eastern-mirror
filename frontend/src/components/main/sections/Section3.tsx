import React from "react";
import Heading from "../Heading";
import BigCard from "../card/BigCard";
import SmallCard from "../card/SmallCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { IoShareSocial } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

const Section3 = ({ data, heading, trending, watchNow }: PropsType) => {
  if (!data?.length) return null;
  console.log(data);
  return (
    <section>
      <div className="container py-2 bg-[#002366] mt-28 rounded-[21px] pt-10 pb-4 px-20 text-white">
        <h2 className="lora-medium text-xl text-white mb-4 ">{heading}</h2>

        {trending?.length ? (
          <div className="flex items-center gap-4 ">
            <p className="roboto-medium text-lg">Trending</p>
            <ul className="flex gap-4 items-center roboto-regular opacity-80">
              {trending.map((item: any, i: number) => (
                <li key={i}>{item.label}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-7 mt-2.5">
          <div className="relative">
            <Link href={"/" + data[0]?.slug}>
              <Image
                className="w-full h-[375px] object-cover"
                width={665}
                height={375}
                src={getImageUrl(data[0].thumbnail)}
                alt="image"
              />
            </Link>

            <div className="bg-black bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5">
              <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Link href={"/" + data[0]?.slug}>
              <h2 className="lora-bold text-2xl mt-1.5 mb-6">
                {data[0].title}
              </h2>
            </Link>
            <p className="text-xs opacity-80">{data[0].published_on}</p>

            {watchNow ? (
              <div className="mt-6">
                <Button
                  variant="secondary"
                  className="rounded-3xl flex items-center gap-2 text-[#065A68] font-bold"
                >
                  Watch Video
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-4 mt-6 gap-10">
          {data?.slice(1, 5)?.map((item: any, i: number) => (
            <div key={i}>
              <div>
                <Image
                  src={getImageUrl(item.thumbnail)}
                  alt="image"
                  width={280}
                  height={145.8}
                  className="w-full  h-[145.8px] object-cover rounded-[7.07px]"
                />
              </div>

              <h4 className="mt-2.5 text-white text-xs roboto-regular opacity-80">
                {item.title}
              </h4>
              <p className="mt-2 text-white text-xs roboto-regular opacity-80">
                {item.published_on}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;

type PropsType = {
  data: any;
  heading: string;
  trending?: any;
  watchNow?: boolean;
};
