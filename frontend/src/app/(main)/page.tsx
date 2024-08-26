"use client";

import { useState, useEffect } from "react";
import BreakingNews from "@/components/main/BreakingNews";
import Section1 from "@/components/main/sections/Section1";
import Section2 from "@/components/main/sections/Section2";
import Section3 from "@/components/main/sections/Section3";
import VideoSection from "@/components/main/sections/VideoSection";
import { TOP_NEWS, TRENDING } from "@/static/data";
import axiosServer from "@/utils/axiosServer";
import Event from "@/components/main/Event";
import Section4 from "@/components/main/sections/section4";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [nagaland, setNagaland] = useState([]);
  const [india, setIndia] = useState([]);
  const [editorsPick, setEditorsPick] = useState([]);
  const [artsEntertainment, setArtsEntertainment] = useState([]);
  const [world, setWorld] = useState([]);
  const [sports, setSports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: articleData } = await axiosServer.get("/article/all");
        setArticles(articleData?.articles || []);

        const { data: nagalandData } = await axiosServer.get(
          "/article/all?category=Nagaland"
        );
        setNagaland(nagalandData?.articles || []);

        const { data: indiaData } = await axiosServer.get(
          "/article/all?category=India"
        );
        setIndia(indiaData?.articles || []);

        const { data: editorsPickData } = await axiosServer.get(
          "/article/all?category=Editor's Pick"
        );
        setEditorsPick(editorsPickData?.articles || []);

        const { data: artsEntertainmentData } = await axiosServer.get(
          "/article/all?category=Arts and Entertainment"
        );
        setArtsEntertainment(artsEntertainmentData?.articles || []);

        const { data: worldData } = await axiosServer.get(
          "/article/all?category=World"
        );
        setWorld(worldData?.articles || []);

        const { data: sportsData } = await axiosServer.get(
          "/article/all?category=Sports"
        );
        setSports(sportsData?.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  console.log(editorsPick);
  return (
    <div className="min-h-screen">
      <Section1 data={articles} heading="TOP NEWS" />
      <Event />
      <Section2 data={nagaland} heading="NAGALAND" />
      <Section4 data={TOP_NEWS} heading="EM EXCLUSIVE" />
      <Section1 data={india} heading="INDIA" />
      <Section4 data={editorsPick} heading="EDITOR’S PICK" />
      <Section3
        data={artsEntertainment}
        heading="ART & ENTERTAINMENT"
        trending={TRENDING}
      />

      <Section1 data={world} heading="WORLD" />
      <Section3 data={sports} heading="SPORTS NEWS" watchNow={true} />
      <VideoSection data={TOP_NEWS} heading="VIDEOS" />
    </div>
  );
}
