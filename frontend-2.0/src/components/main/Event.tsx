import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";


const Event = ({ data }: { data?: [] }) => {
  if (!data?.length) return null;

  return (
    <section>
      <div className="container py-2 px-4 md:px-6 md:mt-16 mt-8">
        <div className="flex justify-between  mb-5 items-center">
          <h2 className="lora-bold md:text-3xl text-xl max-w-[60%]">
            5 years after article 370
          </h2>

          <div>
            <Link
              href={"#"}
              className="flex items-center md:gap-2 gap-1 uppercase text-sm md:text-base"
            >
              View More <FaArrowRightLong className="text-sm md:text-base" />
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-7 gap-5">
          {data?.slice(0, 2).map((item, i) => (
            <div key={i}>
              <CardVertical data={item} />
            </div>
          ))}

          <div className="flex flex-col md:gap-4 gap-3">
            {data
              ?.slice(2, 6)
              ?.map(
                (
                  item: {
                    thumbnail: string;
                    category: string;
                    title: string;
                    author: string;
                    date: string;
                  },
                  i
                ) => (
                  <div key={i} className="flex md:gap-4 gap-2.5">
                    <div className="">
                      <div className="md:w-[120px] w-[110px]">
                        <Image
                          className="w-full md:h-[90px] h-[80px] object-cover"
                          src={item.thumbnail}
                          width={120}
                          height={90}
                          alt="image"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="text-[#b71c1c] md:text-xs text-[10px] uppercase md:font-semibold font-medium">
                        Politics
                      </p>
                      <h2 className="text-[#080F18] lora-bold md:text-sm text-xs md:pb-2 pb-1.5">
                        {item?.title.length > 50
                          ? item.title.slice(0, 50).trim() + "..."
                          : item.title}{" "}
                      </h2>

                      <div className="flex items-center justify-between md:text-xs text-[10px] text-[#080F18]">
                        <p>Omar Rashid</p>
                        <p>23 mins read</p>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;

const CardVertical = ({
  data,
}: {
  data: {
    thumbnail: string;
    category: string;
    title: string;
    author: string;
    date: string;
  };
}) => (
  <div>
    <div>
      <Image
        src={data.thumbnail}
        alt={data.title}
        className="w-full md:h-[250px] h-[225px] object-cover"
        width={397}
        height={250}
      />
    </div>

    <div>
      <p className="text-[#b71c1c] md:text-sm text-xs uppercase md:font-bold font-medium mt-2">
        Politics
      </p>
      <h3 className="text-[#080F18] lora-bold md:text-lg text-base pb-1">
        From Ghazipur to Srinagar: The Life of RSS Product Manoj Sinha
      </h3>
      <div className="flex items-center justify-between md:text-xs text-[10px]">
        <p>Omar Rashid</p>
        <p className="text-[#080F18]">23 mins read</p>
      </div>
    </div>
  </div>
);
