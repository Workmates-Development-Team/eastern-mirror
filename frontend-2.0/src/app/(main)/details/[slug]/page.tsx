"use client";

import Loader from "@/components/Loader";
import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import { url_maker } from "@/lib/utils";
import { TOP_NEWS } from "@/static/data";
import axiosServer from "@/utils/axiosServer";
import { formatDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  const fetchData = async (slug: string) => {
    const { data } = await axiosServer.get("/article/by/" + slug);
    return data.article;
  };

  const { isPending, data } = useQuery({
    queryKey: [slug],
    queryFn: () => fetchData(slug as string),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (!isPending && !data) {
    return router.push("/");
  }

  console.log(isPending, data)

  return (
    <div className="min-h-screen">
      {isPending ? (
        <div className="container flex justify-center pt-10">
          <Loader />
        </div>
      ) : (
        <div className="container py-2 px-4 md:px-6 mt-3">
          <BreadcrumbComponent
            links={[
              { label: "Home", href: "/" },
              {
                label: data?.title,
              },
            ]}
          />

          <div className="grid grid-cols-3 gap-7  md:mt-20 mt-10">
            <div className="md:col-span-2 col-span-3">
              <div className="max-w-[842px]">
                <h1 className="md:text-2xl text-[21px] leading-tight md:leading-normal lora-bold">
                  {data?.title}
                </h1>
                <p className="mt-2.5 text-[#9B9B9B] md:text-sm text-xs roboto-regular">
                  Published on {formatDate(data?.publishedAt)}
                </p>
                <p className="text-[#9B9B9B] md:text-sm text-xs roboto-regular">
                  By <span className="underline">{data?.author?.name}</span>
                </p>

                <div className="flex mt-2 items-center md:gap-10 gap-2">
                  <div className="flex flex-col items-center">
                    <IoShareSocial className="md:w-[23.45px] w-5  md:h-[34.49px] h-5" />

                    <p className="md:text-xs text-[10px] text-[#3D5A80]">
                      Share
                    </p>
                  </div>

                  <div>
                    <Image
                      width={30}
                      height={30}
                      src="/images/logos_telegram.svg"
                      alt="logos_telegram"
                      className="md:w-[30px] md:h-[30px] w-6 h-6"
                    />
                  </div>
                  <div>
                    <Image
                      width={34}
                      height={34}
                      src="/images/logos_whatsapp-icon.svg"
                      alt="logos_whatsapp-icon"
                      className="md:w-[34px] md:h-[34px] w-7 h-7"
                    />
                  </div>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src="/images/ant-design_message-filled.svg"
                      alt="ant-design_message-filled"
                      className="md:w-[30px] md:h-[30px] w-6 h-6"
                    />
                  </div>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src="/images/logos_facebook.svg"
                      alt="logos_facebook"
                      className="md:w-[30px] md:h-[30px] w-6 h-6"
                    />
                  </div>
                </div>

                <div className="md:mt-6 mt-4">
                  {/* {data?.thumbnail ? (
                    <Image
                      width={841}
                      height={300}
                      className="mx-auto max-h-[474px]  object-contain"
                      alt="image"
                      src={getImageUrl(data?.thumbnail)}
                    />
                  ) : null} */}

                  <div
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                    className="md:mt-10 mt-5 text-sm md:text-base content-custom"
                  ></div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 col-span-3">
              <div className="flex justify-center md:mt-28 mt-8">
                <div className="bg-[#002366] py-2 px-4 text-white md:text-lg text-base roboto-regular">
                  <p>MOST POPULAR</p>
                </div>
              </div>

              <div className="flex flex-col md:gap-7 gap-2 md:mt-10 mt-7">
                {TOP_NEWS.slice(0, 4).map((item: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="">
                      <div className="md:w-[150px] w-[120px]">
                        <Link href={"/" + url_maker(item.title)}>
                          <Image
                            className="md:w-[150px] w-[120px] md:h-[150px] h-[120px] object-cover"
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
                        <h2 className="text-[#080F18] lora-bold md:text-lg text-sm leading-tight md:leading-normal pb-2.5">
                          {item?.title.length > 50
                            ? item.title.slice(0, 50).trim() + "..."
                            : item.title}{" "}
                        </h2>
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.content?.slice(0, 67) + "...",
                        }}
                        className="text-[#646464] md:text-sm text-xs md:pb-2.5"
                      ></div>
                      <p className="text-xs text-[#BBBBBB] hidden md:block">
                        {formatDate(data?.publishedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <Section4 data={TOP_NEWS} heading="EM EXCLUSIVE" /> */}
        </div>
      )}
    </div>
  );
};

export default Details;
