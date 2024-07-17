import BreakingNews from "@/components/main/BreakingNews";
import Section1 from "@/components/main/sections/Section1";
import Section2 from "@/components/main/sections/Section2";
import Section3 from "@/components/main/sections/Section3";
import VideoSection from "@/components/main/sections/VideoSection";
import { TOP_NEWS, TRENDING } from "@/static/data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <BreakingNews />
      <Section1 data={TOP_NEWS} heading="TOP NEWS" />
      <Section2 data={TOP_NEWS} heading="NAGALAND" />
      <Section1 data={TOP_NEWS} heading="INDIA" />
      <Section1 data={TOP_NEWS} heading="EDITOR’S PICK" />
      <Section3 data={TOP_NEWS} heading="ART & ENTERTAINMENT" trending={TRENDING} />
      <Section1 data={TOP_NEWS} heading="REGION" />
      <Section1 data={TOP_NEWS} heading="WORLD" />
      <Section3 data={TOP_NEWS} heading="SPORTS NEWS" watchNow={true} />
      <Section1 data={TOP_NEWS} heading="BUSINESS" />
      <VideoSection data={TOP_NEWS} heading="VIDEOS"/>
    </div>
  );
}
