"use client";

import { useState, useEffect } from "react";
import Section1 from "@/components/main/sections/Section1";
import Section2 from "@/components/main/sections/Section2";
import Section3 from "@/components/main/sections/Section3";
import VideoSection from "@/components/main/sections/VideoSection";
import { TOP_NEWS, TRENDING } from "@/static/data";
import axiosServer from "@/utils/axiosServer";
import Event from "@/components/main/Event";
import Section4 from "@/components/main/sections/section4";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchCategoryArticles = async (category: string, limit?: number) => {
    const { data } = await axiosServer.get(`/article/all?category=${category}&limit=${limit}`);
    return data.articles;
  };

  const { isPending, data: topNews } = useQuery({
    queryKey: ["top-news"],
    queryFn: () => fetchCategoryArticles("top-news", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: event } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchCategoryArticles("events", 5),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: nagaland } = useQuery({
    queryKey: ["nagaland"],
    queryFn: () => fetchCategoryArticles("nagaland", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: india } = useQuery({
    queryKey: ["india"],
    queryFn: () => fetchCategoryArticles("india", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: emExclusive } = useQuery({
    queryKey: ["em-exclusive"],
    queryFn: () => fetchCategoryArticles("em-exclusive", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: editorsPick } = useQuery({
    queryKey: ["editorsPick"],
    queryFn: () => fetchCategoryArticles("editor's-pick", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: education } = useQuery({
    queryKey: ["education"],
    queryFn: () => fetchCategoryArticles("education", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: artsEntertainment } = useQuery({
    queryKey: ["artsEntertainment"],
    queryFn: () => fetchCategoryArticles("arts-and-entertainment", 5),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: world } = useQuery({
    queryKey: ["world"],
    queryFn: () => fetchCategoryArticles("world", 5),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: region } = useQuery({
    queryKey: ["region"],
    queryFn: () => fetchCategoryArticles("region", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: business } = useQuery({
    queryKey: ["business"],
    queryFn: () => fetchCategoryArticles("business", 4),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: () => fetchCategoryArticles("sports", 5),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isPending) {
    return (
      <div className="container flex justify-center min-h-[50vh] pt-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Section1 data={topNews || []} heading="TOP NEWS" link={"/top-news"} />
      <Event data={event || []} />
      <Section2 data={nagaland || []} heading="NAGALAND" link={'/nagaland'} />
      <Section4 data={emExclusive || []} heading="EM EXCLUSIVE" link={'/em-exclusive'} />
      <Section1 data={india || []} heading="INDIA"  link="/india"/>
      <Section4 data={editorsPick || []} heading="EDITOR’S PICK" link="/editor's-pick" />
      <Section3
        data={artsEntertainment || []}
        heading="ART & ENTERTAINMENT"
        trending={TRENDING}
        link=""
      />
      <Section1 data={world || []} heading="WORLD" link="/world" />
      <Section1 data={region || []} heading="REGION" link="/region" />
      <Section1 data={business || []} heading="Business" link="/business" />
      <Section4 data={education || []} heading="Education" link="/education" />
      <Section3 data={sports || []} heading="SPORTS NEWS" watchNow={true} />
      {/* <VideoSection data={TOP_NEWS || []} heading="VIDEOS" /> */}
    </div>
  );
}
