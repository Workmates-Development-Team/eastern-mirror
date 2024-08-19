import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { NAVBAR_LINKS } from "@/constant/path";
import { cn } from "@/lib/utils";
import NavMenu from "./nav-menu";

export default function Navbar() {
  return (
    <>
      <div className="container px-4 md:px-6 flex justify-center mb-4">
        <Link href="/">
          <Image width={395} height={153} src="/images/logo.webp" alt="logo" />
        </Link>
      </div>

      <header className="sticky z-20 top-12 container flex h-16 items-center gap-4 bg-[#002366] px-4 md:px-6">
        <nav className="hidden flex-col gap-6 md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
          <NavMenu links={NAVBAR_LINKS} />

          <Link
            href="/advertisment"
            className={cn(
              buttonVariants({ size: "sm" }),
              "text-[#002366] whitespace-nowrap transition-colors lora-regular text-sm rounded-3xl bg-[#FFFFFF] hover:bg-[#eeeded]"
            )}
          >
            ADVERTISEMENT
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-regular">
              {NAVBAR_LINKS.map((link, i) => (
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground"
                  key={i}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2">
          <input
            type="text"
            placeholder="Seacrh..."
            className="py-1 outline-none bg-transparent text-white border-b max-w-[150px]"
          />
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            size={"icon"}
          >
            <Search className="text-white" />
          </Button>
        </div>
      </header>
    </>
  );
}
