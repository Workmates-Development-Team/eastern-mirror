import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import StoryCard from "@/components/main/card/StoryCard";
import ExclusiveSection from "@/components/main/sections/ExlcusiveSection";
import { TOP_NEWS } from "@/static/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { IoShareSocial } from "react-icons/io5";

const Details = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <div className="min-h-screen">
      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent
          links={[
            { label: "Home", href: "/" },
            { label: "Nagaland", href: "/nagaland" },
            {
              label: "Shaping dreams: Inside Kohima’s Highland Pottery Studio",
            },
          ]}
        />

        <div className="grid grid-cols-3 gap-7  mt-20">
          <div className="col-span-2">
            <div className="max-w-[842px]">
              <h1 className="text-2xl lora-bold">
                Shaping dreams: Inside Kohima’s Highland Pottery Studio
              </h1>
              <p className="mt-2.5 text-[#9B9B9B] text-sm roboto-regular">
                Published on Jul 09, 2024 11:22 pm
              </p>
              <p className="text-[#9B9B9B] text-sm roboto-regular">
                By Thejoto Nienu
              </p>

              <div className="flex mt-2 items-center gap-10">
                <div className="flex flex-col items-center">
                  <IoShareSocial className="w-[23.45px] h-[34.49px]" />

                  <p className="text-xs text-[#3D5A80]">Share</p>
                </div>

                <div >
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
                <Image
                  width={841}
                  height={474}
                  className="w-full obj"
                  alt="image"
                  src="/images/top_news/image2.png"
                />

                <p className="mt-10 text-sm roboto-regular">
                  <strong> KOHIMA — </strong> Inspired by an article on
                  ceramics, Vizonuo Soliezuo began an artistic journey that took
                  her from Kohima to Kolkata and back. Now, her Highland Pottery
                  Studio in Lerie, Kohima, creates stunning pottery and nurtures
                  a new generation of pottery enthusiasts.
                  <br />
                  <br />
                  Soliezuo said her fascination with pottery began unexpectedly.
                  “To be honest, I didn’t know what pottery was all about,” she
                  said.
                  <br />
                  <br />
                  But intrigued by the artistry of transforming clay into
                  beautiful forms, she decided to learn the craft and embarked
                  on fulfilling it by training under established potter Manjari
                  Kanoi in Kolkata for over a year.
                  <br />
                  <br />
                  Soliezuo said her fascination with pottery began unexpectedly.
                  “To be honest, I didn’t know what pottery was all about,” she
                  said.
                  <br />
                  <br />
                  But intrigued by the artistry of transforming clay into
                  beautiful forms, she decided to learn the craft and embarked
                  on fulfilling it by training under established potter Manjari
                  Kanoi in Kolkata for over a year.
                  <br />
                  <br />
                  Soliezuo said her fascination with pottery began unexpectedly.
                  “To be honest, I didn’t know what pottery was all about,” she
                  said.
                  <br />
                  <br />
                  But intrigued by the artistry of transforming clay into
                  beautiful forms, she decided to learn the craft and embarked
                  on fulfilling it by training under established potter Manjari
                  Kanoi in Kolkata for over a year.
                  <br />
                  <br />
                  Soliezuo said her fascination with pottery began unexpectedly.
                  “To be honest, I didn’t know what pottery was all about,” she
                  said.
                  <br />
                  <br />
                  But intrigued by the artistry of transforming clay into
                  beautiful forms, she decided to learn the craft and embarked
                  on fulfilling it by training under established potter Manjari
                  Kanoi in Kolkata for over a year.
                  <br />
                  <br />
                  Soliezuo said her fascination with pottery began unexpectedly.
                  “To be honest, I didn’t know what pottery was all about,” she
                  said.
                  <br />
                  <br />
                  But intrigued by the artistry of transforming clay into
                  beautiful forms, she decided to learn the craft and embarked
                  on fulfilling it by training under established potter Manjari
                  Kanoi in Kolkata for over a year.
                  <br />
                  <br />
                  Soliezuo said her fascination with pottery began unexpectedly.
                  “To be honest, I didn’t know what pottery was all about,” she
                  said.
                  <br />
                  <br />
                  But intrigued by the artistry of transforming clay into
                  beautiful forms, she decided to learn the craft and embarked
                  on fulfilling it by training under established potter Manjari
                  Kanoi in Kolkata for over a year.
                  <br />
                  <br />
                  Expensive hobby
                  <br />
                  <br />
                  On her return to Kohima, she faced the daunting task of
                  setting up her own studio. Pottery, especially ceramics, is an
                  expensive pursuit, requiring significant investment in
                  machinery and equipment. “You need to be committed,” she said,
                  adding that mastering the craft requires dedication alongside
                  financial investment.
                  <br />
                  <br />
                  Soliezuo recalled starting her studio in the living area of
                  her home before securing a dedicated space for Highland
                  Pottery Studio, navigating challenges such as funding,
                  machinery procurement, and finding a suitable location for
                  firing.
                  <br />
                  <br />
                  Running the studio, she said, is a labour of love.
                  <br />
                  <br />
                  On a typical day with classes, she is occupied from 10 am to 4
                  pm, teaching back-to-back two-hour sessions. On non-teaching
                  days, her work starts in the morning and extends late into the
                  evening on most days.
                  <br />
                  <br />
                  Juggling the demands of running the studio single-handedly,
                  along with personal and family commitments, is a constant
                  challenge, yet she finds it a fulfilling experience, taking
                  satisfaction in sharing her passion and nurturing new talents.
                  <br />
                  <br />
                  When asked if she has any favourite pieces, Soliezuo said she
                  consciously avoids forming attachments to her creations. She
                  believes her role is to craft pieces and send them out into
                  the world, whether for sale or other purposes.
                  <br />
                  <br />
                  It’s a common ethos within the pottery community, she
                  explained, to avoid becoming emotionally invested in their
                  work, recognising that attachment can hinder both the artistic
                  process and the joy of sharing one’s creations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-center">
              <div className="bg-[#002366] py-2 px-4 text-white text-lg roboto-regular">
                <p>MOST POPULAR</p>
              </div>
            </div>

            <div className="flex flex-col gap-12 mt-10">
              {TOP_NEWS.slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="max-w-[400px]">
                  <StoryCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <ExclusiveSection data={TOP_NEWS} heading="EM EXCLUSIVE"/>
      </div>
    </div>
  );
};

export default Details;
