import { CircleDollarSign, ShieldEllipsis, View } from "lucide-react";

export const STATS = [
  {
    label: "Total View",
    value: 1000,
    icon: () => <View className="text-[#2D9CDB] w-7 h-7" />,
  },
  {
    label: "Total Ad View",
    value: 100,
    icon: () => <ShieldEllipsis className="text-[#2D9CDB] w-7 h-7" />,
  },

  {
    label: "Total Revenue",
    value: "$100",
    icon: () => <CircleDollarSign className="text-[#2D9CDB] w-7 h-7" />,
  },
];

export const SLIDE_CONTENT = [
  {
    title: "Nagaland government slams NHIDCL over highway safety lapses",
    image: "/images/slide/slide1.png",
  },
  {
    title:
      "BJP seeks deputy chairperson posts, govt. nominees in Nagaland ULBs",
    image: "/images/slide/slide2.png",
  },
  {
    title:
      "SC to hear on Monday batch of pleas related to controversy-ridden NEET-U...",
    image: "/images/slide/slide3.png",
  },
  {
    title: "Nagaland government slams NHIDCL over highway safety lapses",
    image: "/images/slide/slide1.png",
  },
  {
    title:
      "SC to hear on Monday batch of pleas related to controversy-ridden NEET-U...",
    image: "/images/slide/slide3.png",
  },
];
