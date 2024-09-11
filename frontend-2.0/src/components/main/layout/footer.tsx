import { FOOTER_LINKS, NAVBAR_LINKS } from "@/constant/path";
import { SOCIAL_LINKS } from "@/static/socials";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 bg-[#002366] pt-8 pb-16 md:px-[52px] px-[35px] container text-[#FFFFFF]">
      <div className="flex justify-center">
        <Image
          src="/images/logo-light.png"
          alt="logo-light"
          width={300}
          height={120}
        />
      </div>

      <div className="md:mt-12 mt-8 flex flex-wrap gap-10 justify-center items-center">
        {FOOTER_LINKS?.map((item, i) => (
          <Link
            key={i}
            className="lora-medium text-[15px] md:text-base md:pb-[22px] pb-[10px] uppercase"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center md:mt-10 mt-8">
        <div className="md:border-t-2 border-t border-white w-full opacity-55 md:mb-10 mb-8"></div>
        <ul className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link, i) => (
            <li key={i}>
              <Link href={link.href} className="opacity-80">
                {link.icon(30)}
              </Link>
            </li>
          ))}
        </ul>

        <nav className="flex-wrap flex md:flex-nowrap justify-center md:gap-10 gap-4 mt-8">
          {NAVBAR_LINKS.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-[#FFFFFF] whitespace-nowrap transition-colors text-sm md:text-base uppercase lora-regular opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Footer;
