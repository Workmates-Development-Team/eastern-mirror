import { Instagram } from "lucide-react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { TfiYoutube } from "react-icons/tfi";

export const SOCIAL_LINKS = [
  {
    label: "facebook",
    icon: () => <FaFacebookF className="w-4 h-4" />,
    href: '#'
  },
  {
    label: "twitter",
    icon: () => <FaXTwitter className="w-4 h-4" />,
    href: '#'
  },
  {
    label: "instagram",
    icon: () => <Instagram className="w-4 h-4" />,
    href: '#'
  },
  {
    label: "youtube",
    icon: () => <TfiYoutube className="w-4 h-4" />,
    href: '#'
  },
  {
    label: "whatsapp",
    icon: () => <IoLogoWhatsapp className="w-4 h-4" />,
    href: '#'
  },
];
