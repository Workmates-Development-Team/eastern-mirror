import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const items = [
  {
    image: "/images/event1.png",
    category: "Politics",
    title: "From Ghazipur to Srinagar: The Life of RSS Product Manoj Sinha",
    author: "Omar Rashid",
    date: "23 mins read",
  },
  {
    image: "/images/event1.png",
    category: "Politics",
    title: "From Ghazipur to Srinagar: The Life of RSS Product Manoj Sinha",
    author: "Omar Rashid",
    date: "23 mins read",
  },
  {
    image: "/images/event1.png",
    category: "Politics",
    title: "From Ghazipur to Srinagar: The Life of RSS Product Manoj Sinha",
    author: "Omar Rashid",
    date: "23 mins read",
  },
];

const Event = () => {
  return (
    <section>
      <div className="container py-2 px-4 md:px-6 md:mt-16 mt-8">
        <div className="flex justify-between  mb-5 items-center">
          <h2 className="lora-bold md:text-3xl text-xl max-w-[60%]">
            5 years after article 370
          </h2>

          <div>
            <Link href={"#"} className="flex items-center md:gap-2 gap-1 uppercase text-sm md:text-base">
              View More <FaArrowRightLong className="text-sm md:text-base" />
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
          <div>
            <CardVertical
              data={{
                image: "/images/event1.png",
                category: "Politics",
                title:
                  "From Ghazipur to Srinagar: The Life of RSS Product Manoj Sinha",
                author: "Omar Rashid",
                date: "23 mins read",
              }}
            />
          </div>

          <div>
            <CardVertical
              data={{
                image: "/images/event2.jpeg",
                category: "Rights",
                title:
                  "Five Years After Abrogation, the Hinduisation of Kashmir, and the Kashmirisation of India",
                author: "Apoorvanand",
                date: "7 mins read",
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            {items?.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="">
                  <div className="w-[120px]">
                    <Image
                      className="w-[120px] h-[90px] object-cover"
                      src={item.image}
                      width={120}
                      height={90}
                      alt="image"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-[#b71c1c] text-xs uppercase font-semibold">
                    Politics
                  </p>
                  <h2 className="text-[#080F18] lora-bold text-sm pb-2">
                    {item?.title.length > 50
                      ? item.title.slice(0, 50).trim() + "..."
                      : item.title}{" "}
                  </h2>

                  <div className="flex items-center justify-between text-xs text-[#080F18]">
                    <p>Omar Rashid</p>
                    <p >23 mins read</p>
                  </div>
                </div>
              </div>
            ))}
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
    image: string;
    category: string;
    title: string;
    author: string;
    date: string;
  };
}) => (
  <div>
    <div>
      <Image
        src={data.image}
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
      <div className="flex items-center justify-between text-xs">
        <p>Omar Rashid</p>
        <p className="text-[#080F18]">23 mins read</p>
      </div>
    </div>
  </div>
);
