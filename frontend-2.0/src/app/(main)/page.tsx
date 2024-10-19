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
  const fetchCategoryArticles = async (category: string) => {
    const { data } = await axiosServer.get(`/article/all?category=${category}`);
    return data.articles;
  };

  const { isPending, data: topNews } = useQuery({
    queryKey: ["top-news"],
    queryFn: () => fetchCategoryArticles("top-news"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchCategoryArticles("events"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: nagaland } = useQuery({
    queryKey: ["nagaland"],
    queryFn: () => fetchCategoryArticles("nagaland"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: india } = useQuery({
    queryKey: ["india"],
    queryFn: () => fetchCategoryArticles("india"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: emExclusive } = useQuery({
    queryKey: ["em-exclusive"],
    queryFn: () => fetchCategoryArticles("em-exclusive"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: editorsPick } = useQuery({
    queryKey: ["editorsPick"],
    queryFn: () => fetchCategoryArticles("editor's-pick"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: education } = useQuery({
    queryKey: ["education"],
    queryFn: () => fetchCategoryArticles("education"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: artsEntertainment } = useQuery({
    queryKey: ["artsEntertainment"],
    queryFn: () => fetchCategoryArticles("arts-and-entertainment"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: world } = useQuery({
    queryKey: ["world"],
    queryFn: () => fetchCategoryArticles("world"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: region } = useQuery({
    queryKey: ["region"],
    queryFn: () => fetchCategoryArticles("region"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: business } = useQuery({
    queryKey: ["business"],
    queryFn: () => fetchCategoryArticles("business"),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: () => fetchCategoryArticles("sports"),
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
      <Event data={events || []} />
      <Section2 data={nagaland || []} heading="NAGALAND" />
      <Section4 data={emExclusive || []} heading="EM EXCLUSIVE" />
      <Section1 data={india || []} heading="INDIA" />
      <Section4 data={editorsPick || []} heading="EDITOR’S PICK" />
      <Section3
        data={artsEntertainment || []}
        heading="ART & ENTERTAINMENT"
        trending={TRENDING}
      />
      <Section1 data={world || []} heading="WORLD" />
      <Section1 data={region || []} heading="REGION" />
      <Section1 data={business || []} heading="Business" />
      <Section4 data={education || []} heading="Education" />
      <Section3 data={sports || []} heading="SPORTS NEWS" watchNow={true} />
      <VideoSection data={TOP_NEWS || []} heading="VIDEOS" />
    </div>
  );
}
