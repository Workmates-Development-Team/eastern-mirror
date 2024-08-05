"use client"

import { RecoilRoot } from "recoil";

import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
