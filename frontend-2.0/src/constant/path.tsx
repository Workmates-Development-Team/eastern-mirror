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
        label: "Chümoukedima",
        href: "/chumoukedima",
      },
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
        label: "Niuland",
        href: "/niuland",
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
        label: "Shamator",
        href: "/shamator",
      },
      {
        label: "Tseminyü",
        href: "/tseminyu",
      },
      {
        label: "Tuensang",
        href: "/tuensang",
      },
      {
        label: "Wokha",
        href: "/wokha",
      },
      {
        label: "Zünheboto",
        href: "/zunheboto",
      },
    ],
  },

  {
    label: "India",
    href: "/india",
  },
  {
    label: "Exclusives",
    href: "/exclusives",
  },
  {
    label: "opinion",
    href: "/opinion",
    subLinks: [
      {
        label: "Editorial",
        href: "/editorial",
      },
      {
        label: "Letters to the Editor",
        href: "/letters-to-the-editor",
      },
    ],
  },

  {
    label: "SPORTS",
    href: "/sports",
  },

  {
    label: "SCIENCE AND TECH",
    href: "/science-and-tech",
    subLinks: [
      {
        label: "Tech News",
        href: "/tech-news",
      },
      {
        label: "Gaming",
        href: "/gaming",
      },
      {
        label: "Climate and Environment",
        href: "/environment",
      },
    ],
  },

  {
    label: "ARTS AND ENTERTAINMENT",
    href: "/arts-and-entertainment",
    subLinks: [
      {
        label: "Pop Culture",
        href: "/pop-culture",
      },
      {
        label: "Rhythm of Love",
        href: "/rhythm-of-love",
      },
    ],
  },
];

export const FOOTER_LINKS = [
  {
    label: "Editor’s Pick",
    href: "editor's-pick",
  },
  {
    label: "Education",
    href: "education",
  },
  {
    label: "Editorial",
    href: "editorial",
  },
  {
    label: "Rhythm of Love",
    href: "rythm-of-love",
  },
  {
    label: "About Us",
    href: "about-us",
  },
];
