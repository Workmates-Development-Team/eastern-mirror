import { cn } from "@/lib/utils";
import { Instagram } from "lucide-react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { TfiYoutube } from "react-icons/tfi";

export const SOCIAL_LINKS = [
  {
    label: "facebook",
    icon: (w?: any) => <FaFacebookF className={cn( w ? "w-6 h-6":"md:w-4 md:h-4 w-3 h-3")} />,
    href: '#'
  },
  {
    label: "twitter",
    icon: (w?: any) => <FaXTwitter className={cn( w ? "w-6 h-6":"md:w-4 md:h-4 w-3 h-3")} />,
    href: '#'
  },
  {
    label: "instagram",
    icon: (w?: any) => <Instagram className={cn( w ? "w-6 h-6":"md:w-4 md:h-4 w-3 h-3")} />,
    href: '#'
  },
  {
    label: "youtube",
    icon: (w?: any) => <TfiYoutube className={cn( w ? "w-6 h-6":"md:w-4 md:h-4 w-3 h-3")} />,
    href: '#'
  },
  {
    label: "whatsapp",
    icon: (w?: any) => <IoLogoWhatsapp className={cn( w ? "w-6 h-6":"md:w-4 md:h-4 w-3 h-3")} />,
    href: '#'
  },
];
