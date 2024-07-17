import React from "react";
import Heading from "../Heading";
import BigCard from "../card/BigCard";
import SmallCard from "../card/SmallCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Section2 = ({ data, heading }: PropsType) => {
  return (
    <section>
      <Heading title={heading} />

      <div className="container py-2 px-4 md:px-6 ">
        <div className="grid md:grid-cols-6 grid-cols-1 gap-7">
          <div className="col-span-4">

          <BigCard data={data[0]} />
          <div className="flex flex-col gap-5 mt-10">
          {data.slice(1, 5).map((item: any, i: number) => (
            <SmallCard
              data={item}
              key={i}
              isBorder={i !== data.slice(1, 5).length - 1}
            />
          ))}

          <div className="flex justify-center">
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "bg-[#D4E2FF] text-[#244B9C] font-medium rounded-3xl hover:bg-[#D4E2FF] hover:text-[#244B9C]"
              )}
            >
              View more
            </Link>
          </div>
        </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Section2;

type PropsType = {
  data: any;
  heading: string;
};
