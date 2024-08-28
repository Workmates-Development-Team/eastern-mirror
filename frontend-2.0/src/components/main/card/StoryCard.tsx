import { url_maker } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

const StoryCard = ({ item }: { item: any }) => {
  console.log(item)
  return (
    <div className="relative">
      <div className="bg-black z-10 bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5">
        <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-35"></div>
      <Link href={"/details/" + item?.slug}>
        <Image
          className="w-full h-[354.99px] object-cover"
          src={item.image || getImageUrl(item.thumbnail)}
          width={330}
          height={354.99}
          alt="image"
        />
      </Link>

      <div className="h-[70px] bottom-0 w-full absolute px-[22px] py-2 bg-[#00000045] text-[#FFFFFF] flex flex-col justify-between backdrop-blur-sm">
        <Link href={"/details/" + item?.slug}>
          <h3 className="roboto-regular">{item.title?.slice(0,50)?.trim() + '...'}</h3>
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
