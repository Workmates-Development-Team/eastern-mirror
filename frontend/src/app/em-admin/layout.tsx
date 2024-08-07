"use client"

import { RecoilRoot } from "recoil";
import { Toaster } from 'react-hot-toast';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RecoilRoot><Toaster />{children}</RecoilRoot>;
}
