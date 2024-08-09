import { Home, Newspaper, Settings, Users } from "lucide-react";

export const ADMIN_SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: () => <Home className="h-4 w-4" />,
  },

  {
    label: "Post",
    path: "/post",
    icon: () => <Newspaper className="h-4 w-4" />,
    subLinks: [
      {
        label: "All Posts",
        path: "/em-admin/post",
      },
      {
        label: "Add New Post",
        path: "/em-admin/post/add-post",
      },
      {
        label: "Categories",
        path: "/em-admin/post/categories",
      },
    ],
  },
  {
    label: "Authors",
    path: "/authors",
    icon: () => <Users className="h-4 w-4" />,
   
  },
  {
    label: "Settings",
    path: "/em-admin/settings",
    icon: () => <Settings className="h-4 w-4" />,
    subLinks: [
      {
        label: "All Posts",
        path: "/em-admin",
      },
      {
        label: "Add New Post",
        path: "/em-admin",
      },
      {
        label: "Categories",
        path: "/em-admin",
      },
    ],
  },
];

export const NAVBAR_LINKS = [
  {
    label: "HOME",
    href: "/",
  },

  {
    label: "NAGALAND",
    href: "/nagaland",
    subLinks: [
      {
        label: "Dimapur",
        href: "/dimapur",
      },
      {
        label: "Mokokchung",
        href: "/mokokchung",
      },
      {
        label: "Wokha",
        href: "/wokha",
      },
      {
        label: "Zunheboto",
        href: "/zunheboto",
      },
      {
        label: "Tuensang",
        href: "/tuensang",
      },
    ],
  },

  {
    label: "ARTS AND ENTERTAINMENT",
    href: "/arts-and-entertainment",
  },

  {
    label: "SPORTS",
    href: "/sports",
   
  },

  {
    label: "SCIENCE AND TECH",
    href: "/science-and-tech",
  },

  {
    label: "OPINION",
    href: "/opinion",
  },

  {
    label: "FEATURE",
    href: "/FEATURE",
  },
];

export const FOOTER_LINKS = [
  {
    section: "POPULAR CATEGORIES",
    links: [
      {
        label: "Editor’s Pick",
        href: "/editors-pick",
      },
      {
        label: "Feature",
        href: "/feature",
      },
      {
        label: "Sports News",
        href: "/sports-news",
      },
      {
        label: "Health & Fitness Tips",
        href: "/health-fitness-tips",
      },
      {
        label: "EM Exclusive",
        href: "/em-exclusive",
      },
    ],
  },
  {
    section: "NAGALAND NEWS",
    links: [
      {
        label: "Dimapur",
        href: "/dimapur",
      },
      {
        label: "Kiphire",
        href: "/kiphire",
      },
      {
        label: "Kohima",
        href: "/kohima",
      },
      {
        label: "Longleng",
        href: "/longleng",
      },
      {
        label: "Mokokchung",
        href: "/mokokchung",
      },
      {
        label: "Mon",
        href: "/mon",
      },
      {
        label: "Noklak",
        href: "/noklak",
      },
      {
        label: "Peren",
        href: "/peren",
      },
      {
        label: "Phek",
        href: "/phek",
      },
      {
        label: "Tuensang",
        href: "/tuensang",
      },
    ],
  },
  {
    section: "LIVING AND ENTERTAINMENT",
    links: [
      {
        label: "Health",
        href: "/health",
      },
      {
        label: "Rhythm of Love",
        href: "/rhythm-of-love",
      },
      {
        label: "Food",
        href: "/food",
      },
      {
        label: "Fashion",
        href: "/fashion",
      },
      {
        label: "Style Spot",
        href: "/style-spot",
      },
      {
        label: "Pop Culture",
        href: "/pop-culture",
      },
      {
        label: "Travel",
        href: "/travel",
      },
    ],
  },
  {
    section: "OPINIONS",
    links: [
      {
        label: "Editorial",
        href: "/editorial",
      },
      {
        label: "Views & Reviews",
        href: "/views-reviews",
      },
      {
        label: "Op-Ed",
        href: "/op-ed",
      },
      {
        label: "Letters to the Editor",
        href: "/letters-to-the-editor",
      },
    ],
  },
  {
    section: "More......",
    links: [
      {
        label: "Digi-buzz",
        href: "/digi-buzz",
      },
      {
        label: "Climate and Environment",
        href: "/climate-and-environment",
      },
      {
        label: "Entrepreneur’s Corner",
        href: "/entrepreneur-corner",
      },
      {
        label: "Scholarships",
        href: "/scholarships",
      },
      {
        label: "Corrections",
        href: "/corrections",
      },
    ],
  },
];
