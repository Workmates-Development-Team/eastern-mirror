"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Brain } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavMenu({ links }: PropsType) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col gap-6 md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
        {links?.map((item: LinksInstance, i: number) => (
          <NavigationMenuItem className="text-white hover:text-white relative">
            {item?.subLinks?.length ? (
              <>
                <NavigationMenuTrigger className="!bg-transparent text-white hover:text-white hover:bg-transparent focus:bg-transparent py-0 px-0">
                  <Link
                    key={i}
                    href={item.href}
                    className="text-[#FFFFFF] whitespace-nowrap transition-colors lora-regular text-sm"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuTrigger>

                <div>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[350px] lg:w-[450px] lg:grid-cols-2">
                    {item.subLinks.map((subLink: SubLink, i: number) => (
                      <ListItem href={item.href + subLink.href} title={subLink.label}>
                        {subLink.label}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
                </div>
              </>
            ) : (
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className="text-[#FFFFFF] whitespace-nowrap transition-colors lora-regular text-sm">
                  {item.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface SubLink {
  label: string;
  href: string;
}

interface LinksInstance {
  label: string;
  href: string;
  subLinks?: SubLink[];
}

type PropsType = {
  links: LinksInstance[];
};
