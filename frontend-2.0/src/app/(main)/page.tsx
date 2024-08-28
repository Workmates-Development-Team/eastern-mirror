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
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    const { data } = await axiosServer.get("/article/all");
    return data.articles;
  };

  const fetchCategoryArticles = async (category: string) => {
    const { data } = await axiosServer.get(`/article/all?category=${category}`);
    return data.articles;
  };

  const { isPending, data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
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

  const { data: editorsPick } = useQuery({
    queryKey: ["editorsPick"],
    queryFn: () => fetchCategoryArticles("editor's-pick"),
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
      <Section1 data={articles || []} heading="TOP NEWS" />
      <Event />
      <Section2 data={nagaland || []} heading="NAGALAND" />
      <Section4 data={TOP_NEWS || []} heading="EM EXCLUSIVE" />
      <Section1 data={india || []} heading="INDIA" />
      <Section4 data={editorsPick || []} heading="EDITOR’S PICK" />
      <Section3
        data={artsEntertainment || []}
        heading="ART & ENTERTAINMENT"
        trending={TRENDING}
      />

      <Section1 data={world || []} heading="WORLD" />
      <Section3 data={sports || []} heading="SPORTS NEWS" watchNow={true} />
      <VideoSection data={TOP_NEWS || []} heading="VIDEOS" />
    </div>
  );
}
