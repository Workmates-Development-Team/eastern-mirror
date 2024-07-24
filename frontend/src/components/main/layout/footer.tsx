import { FOOTER_LINKS, NAVBAR_LINKS } from "@/constant/path";
import { SOCIAL_LINKS } from "@/static/socials";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 bg-[#002366] pt-8 pb-16 px-[52px] container text-[#FFFFFF]">
      <div className="flex justify-center">
        <Image
          src="/images/logo-light.png"
          alt="logo-light"
          width={300}
          height={120}
        />
      </div>

      <div className="mt-12 grid grid-cols-5">
        {FOOTER_LINKS?.map((item, i) => (
          <div>
            <h3 className="lora-medium pb-[22px]">{item.section}</h3>

            <ul className="flex flex-col gap-3">
              {item.links.map((link, i) => (
                <li className="text-[15px] opacity-80 roboto-regular">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-10">
        <div className="border-t-2 border-white w-full opacity-55 mb-10"></div>
        <ul className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link, i) => (
            <li key={i}>
              <Link href={link.href} className="opacity-80">
                {link.icon(30)}
              </Link>
            </li>
          ))}
        </ul>

        <nav className="flex-col md:flex md:flex-row md:items-center gap-10 mt-8">
          {NAVBAR_LINKS.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-[#FFFFFF] whitespace-nowrap transition-colors lora-regular opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
