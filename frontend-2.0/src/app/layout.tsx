import "./globals.css";
import "./font.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Eastern Mirror",
  description:
    "Eastern Mirror brings you the latest breaking news and current affairs. The top stories on politics, business, sports, technology, education, arts and",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-full overflow-x-hidden",
          fontSans.variable
        )}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
