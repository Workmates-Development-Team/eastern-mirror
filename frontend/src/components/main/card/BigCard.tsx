import { IoShareSocial } from "react-icons/io5";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const BigCard = ({ data }: { data: PropsType }) => {
  return (
    <div>
      <div className="relative">
        <div className="bg-black bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5">
          <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
        </div>
        <Image
          className="w-full h-[440px] object-cover"
          width={500}
          height={473.3}
          src={data.image}
          alt="blog-image"
        />
        <div className="-mt-12 relative w-[95%] mx-auto">
          <div className="bg-white px-[22px] py-2.5 shadow-md">
            <div className="flex items-center justify-between uppercase text-xs"> 
              <div>
                <span>Published on </span> <span>{data.published_on}</span>
              </div>

              <div>
                <span>BY </span> <Link href='#' className="font-medium underline">{data.published_by}</Link>
              </div>
            </div>
            <h2 className="lora-bold pt-1.5 text-xl">{data.title}</h2>
          </div>
          <p className="pt-5 px-5 w-[90%] text-sm roboto-regular text-[#646464]">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BigCard;

type PropsType = {
  title: string;
  content: string;
  published_by: string;
  published_on: string;
  url: string;
  image: string;
};
