import { cn, url_maker } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SmallCard = ({ data, isBorder }: PropsType) => {
  return (
    <div
      className={cn(
        isBorder ? "border-b-2" : "",
        " border-[#DDDDDD] pb-4 grid grid-cols-6 gap-7"
      )}
    >
      <div className="col-span-4">
        <Link href={"/" + url_maker(data.title)}>
          <h2 className="text-[#080F18] lora-bold text-lg pb-2.5">
            {data.title}
          </h2>
        </Link>
        <p className="text-[#646464] text-sm pb-2.5">{data.content}</p>
        <p className="text-xs text-[#BBBBBB]">{data.published_on}</p>
      </div>

      <div className="col-span-2">
        <Link href={"/" + url_maker(data.title)}>
          <Image
            width={199}
            height={117}
            className="w-full h-[94%] max-h-[117px] rounded-xl object-cover"
            src={data.image}
            alt="blog-image"
          />
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;

type PropsType = {
  data: {
    title: string;
    content: string;
    published_by: string;
    published_on: string;
    url: string;
    image: string;
  };

  isBorder: boolean;
};
