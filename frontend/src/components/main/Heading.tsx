import Image from "next/image";
import React from "react";

export default function Heading({ title }: PropsType) {
  return (
    <div className="container px-4 md:px-6 flex items-center justify-center mt-20 mb-10">
      <div className="flex-grow flex flex-col gap-2">
        <div className="border-b border-[#a8a9aa] w-[90%] ml-4"></div>
        <div className="border-b-2 border-dashed border-[#a8a9aa]"></div>
        <div className="border-b border-[#a8a9aa] w-[97%]"></div>
      </div>
      <div className="relative w-[280px] h-[30px] flex justify-center items-center">
        <Image
          className="absolute"
          width={280}
          height={30}
          src="/svg/heading_bg.svg"
          alt="heading-bg" />
        <span className="relative z-10 lora-medium text-xl">{title}</span>
      </div>
      <div className="flex-grow flex flex-col gap-2">
        <div className="border-b border-[#a8a9aa] w-[90%] mr-4 ml-auto"></div>
        <div className="border-b-2 border-dashed border-[#a8a9aa]"></div>
        <div className="border-b border-[#a8a9aa] w-[97%] ml-auto"></div>
      </div>
    </div>
  );
}

type PropsType = {
  title: string;
};
