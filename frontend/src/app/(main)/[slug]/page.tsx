"use client";

import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import StoryCard from "@/components/main/card/StoryCard";
import Section4 from "@/components/main/sections/section4";
import { url_maker } from "@/lib/utils";
import { TOP_NEWS } from "@/static/data";
import axiosInstance from "@/utils/axios";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoShareSocial } from "react-icons/io5";

type dataInstance = {
  title: string;
  content: string;
  author: {
    name: string;
  };
  publishedAt: string;
  url: string;
  thumbnail: string;
  slug: string;
};

const Details = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const pathname = usePathname();

  // useEffect(() => {
  //   if(pathname) {
  //     let linksArr = pathname?.split('/');
  //     linksArr = linksArr?.slice(1, linksArr.length)?.map((item) => (
  //       { label: "Home", href: "/" }
  //     ))
  //     console.log(linksArr)
  //   }
  // }, [pathname])

  const [data, setData] = useState<dataInstance>({
    title: "",
    content: "",
    author: {
      name: "",
    },
    publishedAt: "",
    url: "",
    thumbnail: "",
    slug: "",
  });

  const getDetails = async () => {
    try {
      const { data } = await axiosInstance.get("/article/by/" + slug);
      console.log(data);
      setData(data?.article);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getDetails) {
      getDetails();
    }
  }, [slug]);

  return (
    <div className="min-h-screen">
      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent
          links={[
            { label: "Home", href: "/" },
            // { label: "Nagaland", href: "/nagaland" },
            {
              label: data?.title,
            },
          ]}
        />

        <div className="grid grid-cols-3 gap-7  mt-20">
          <div className="col-span-2">
            <div className="max-w-[842px]">
              <h1 className="text-2xl lora-bold">{data?.title}</h1>
              <p className="mt-2.5 text-[#9B9B9B] text-sm roboto-regular">
                Published on {formatDate(data?.publishedAt)}
              </p>
              <p className="text-[#9B9B9B] text-sm roboto-regular">
                By {data?.author?.name}
              </p>

              <div className="flex mt-2 items-center gap-10">
                <div className="flex flex-col items-center">
                  <IoShareSocial className="w-[23.45px] h-[34.49px]" />

                  <p className="text-xs text-[#3D5A80]">Share</p>
                </div>

                <div>
                  <Image
                    width={30}
                    height={30}
                    src="/images/logos_telegram.svg"
                    alt="logos_telegram"
                  />
                </div>
                <div>
                  <Image
                    width={34}
                    height={34}
                    src="/images/logos_whatsapp-icon.svg"
                    alt="logos_whatsapp-icon"
                  />
                </div>
                <div>
                  <Image
                    width={30}
                    height={30}
                    src="/images/ant-design_message-filled.svg"
                    alt="ant-design_message-filled"
                  />
                </div>
                <div>
                  <Image
                    width={30}
                    height={30}
                    src="/images/logos_facebook.svg"
                    alt="logos_facebook"
                  />
                </div>
              </div>

              <div className="mt-6">
                {data?.thumbnail ? (
                  <Image
                    width={841}
                    height={474}
                    className="w-full max-h-[474px] object-cover"
                    alt="image"
                    src={getImageUrl(data?.thumbnail)}
                  />
                ) : null}

                <div
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                  className="mt-10"
                ></div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-center mt-28">
              <div className="bg-[#002366] py-2 px-4 text-white text-lg roboto-regular">
                <p>MOST POPULAR</p>
              </div>
            </div>

            <div className="flex flex-col gap-7 mt-10">
              {TOP_NEWS.slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="">
                    <div className="w-[150px]">
                      <Link href={"/" + url_maker(item.title)}>
                        <Image
                          className="w-[150px] h-[150px] object-cover"
                          src={item.image}
                          width={150}
                          height={150}
                          alt="image"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <Link href={"/" + data?.slug}>
                      <h2 className="text-[#080F18] lora-bold text-lg pb-2.5">
                        {item?.title.length > 50
                          ? item.title.slice(0, 50).trim() + "..."
                          : item.title}{" "}
                      </h2>
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.content?.slice(0, 67) + "...",
                      }}
                      className="text-[#646464] text-sm pb-2.5"
                    ></div>
                    <p className="text-xs text-[#BBBBBB]">
                      {formatDate(data?.publishedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Section4 data={TOP_NEWS} heading="EM EXCLUSIVE" />
      </div>
    </div>
  );
};

export default Details;
