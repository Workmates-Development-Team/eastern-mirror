import { cn, url_maker } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
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
        <Link href={"/" + url_maker(data?.title)}>
          <h2 className="text-[#080F18] lora-bold text-lg pb-2.5">
            {data?.title}
          </h2>
        </Link>
        <p className="text-[#646464] text-sm pb-2.5">{data.content.slice(0, 101).trim()+'...'}</p>
        <p className="text-xs text-[#BBBBBB]">{formatDate(data.publishedAt)}</p>
      </div>

      <div className="col-span-2">
        <Link href={"/" + url_maker(data?.title)}>
          <Image
            width={199}
            height={117}
            className="w-full h-[94%] max-h-[117px] rounded-xl object-cover"
            src={getImageUrl(data?.thumbnail)}
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
    author: {
      name: string;
    };
    publishedAt: string;
    url: string;
    thumbnail: string;
  };

  isBorder: boolean;
};
