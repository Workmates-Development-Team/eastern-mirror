import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/static/socials";
import { getCurrentFormattedDate } from "@/utils/date";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 container flex h-12 items-center justify-between gap-4 border-b border-[#E5E5E5] bg-background px-4 md:px-6">
      <h3 className="fira-sans-regular text-sm text-[#383838]">
        {getCurrentFormattedDate()}
      </h3>

      <div className="flex items-center gap-6">
        <div>
          <Link className={cn(buttonVariants({variant: "outline", size: 'sm'}), "roboto-bold rounded-3xl text-xs text-[#002366]")} href="#">READ e-Paper</Link>
        </div>

        <ul className="flex items-center gap-3.5">
          {SOCIAL_LINKS.map((link, i) => (
            <li key={i}>
              <Link href={link.href}>{link.icon()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
