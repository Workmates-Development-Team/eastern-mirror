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
    label: "Users",
    path: "/em-admin/user",
    icon: () => <Users className="h-4 w-4" />,
    subLinks: [
      {
        label: "All Users",
        path: "/em-admin",
      },
      {
        label: "Add New Users",
        path: "/em-admin",
      },
    ],
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
