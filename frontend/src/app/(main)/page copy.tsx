import BreakingNews from "@/components/main/BreakingNews";
import Section1 from "@/components/main/sections/Section1";
import Section2 from "@/components/main/sections/Section2";
import Section3 from "@/components/main/sections/Section3";
import Section4 from "@/components/main/sections/section4";
import VideoSection from "@/components/main/sections/VideoSection";
import { TOP_NEWS, TRENDING } from "@/static/data";
import axiosServer from "@/utils/axiosServer";

export default async function Home() {
  try {
    const { data: articleData } = await axiosServer.get("/article/all");
    const articles = articleData?.articles || [];

    const { data: nagalandData } = await axiosServer.get(
      "/article/all?category=Nagaland"
    );
    const nagaland = nagalandData?.articles || [];

    const { data: indiaData } = await axiosServer.get(
      "/article/all?category=India"
    );
    const india = indiaData?.articles || [];

    const { data: editorsPickData } = await axiosServer.get(
      "/article/all?category=Editor's Pick"
    );
    const editorsPick = editorsPickData?.articles || [];

    const { data: artsEntertainmentData } = await axiosServer.get(
      "/article/all?category=Arts and Entertainment"
    );
    const artsEntertainment = artsEntertainmentData?.articles || [];

    const { data: regionData } = await axiosServer.get(
      "/article/all?category=Region"
    );
    const region = regionData?.articles || [];

    const { data: worldData } = await axiosServer.get(
      "/article/all?category=World"
    );
    const world = worldData?.articles || [];

    const { data: sportsData } = await axiosServer.get(
      "/article/all?category=Sports"
    );
    const sports = sportsData?.articles || [];

    const { data: businessData } = await axiosServer.get(
      "/article/all?category=Business"
    );
    const business = businessData?.articles || [];

    return (
      <div className="min-h-screen">
        <BreakingNews />
        <Section1 data={articles} heading="TOP NEWS" />
        <Section2 data={nagaland} heading="NAGALAND" />
        <Section1 data={india} heading="INDIA" />
        <Section1 data={editorsPick} heading="EDITOR’S PICK" />
        <Section3
          data={artsEntertainment}
          heading="ART & ENTERTAINMENT"
          trending={TRENDING}
        />
        <Section4 data={TOP_NEWS} heading="EM EXCLUSIVE" />
        <Section1 data={region} heading="REGION" />
        <Section1 data={world} heading="WORLD" />
        <Section3 data={sports} heading="SPORTS NEWS" watchNow={true} />
        <Section1 data={business} heading="BUSINESS" />
        <VideoSection data={TOP_NEWS} heading="VIDEOS" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Error fetching data</div>;
  }
}
