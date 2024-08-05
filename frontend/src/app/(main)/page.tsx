import BreakingNews from "@/components/main/BreakingNews";
import ExclusiveSection from "@/components/main/sections/ExlcusiveSection";
import Section1 from "@/components/main/sections/Section1";
import Section2 from "@/components/main/sections/Section2";
import Section3 from "@/components/main/sections/Section3";
import VideoSection from "@/components/main/sections/VideoSection";
import { TOP_NEWS, TRENDING } from "@/static/data";
import axiosServer from "@/utils/axiosServer";

export default async function Home() {
  try {
    const { data } = await axiosServer.get("/article/all");
    const articles = data?.articles || [];


    return (
      <div className="min-h-screen">
        <BreakingNews />
        <Section1 data={articles} heading="TOP NEWS" />
        <Section2 data={TOP_NEWS} heading="NAGALAND" />
        <Section1 data={TOP_NEWS} heading="INDIA" />
        <Section1 data={TOP_NEWS} heading="EDITOR’S PICK" />
        <Section3
          data={TOP_NEWS}
          heading="ART & ENTERTAINMENT"
          trending={TRENDING}
        />
        <ExclusiveSection data={TOP_NEWS} heading="EM EXCLUSIVE" />
        <Section1 data={TOP_NEWS} heading="REGION" />
        <Section1 data={TOP_NEWS} heading="WORLD" />
        <Section3 data={TOP_NEWS} heading="SPORTS NEWS" watchNow={true} />
        <Section1 data={TOP_NEWS} heading="BUSINESS" />
        <VideoSection data={TOP_NEWS} heading="VIDEOS" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Error fetching data</div>;
  }
}