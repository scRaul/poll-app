import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Icon from "@/components/Logos/Icon";
import GitHub from "@/components/Logos/Github";
import LinkedIn from "@/components/Logos/LinkedIn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Quick Poll",
    template: "%s | Quick Poll",
  },
  description: "Create and share polls!",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="text-xl pl-2 md:pl-10 pt-2">
          <Link
            href={"/"}
            className="relative block w-10 cursor-pointer"
            title="go to home screen"
          >
            <Icon></Icon>
          </Link>
        </header>
        <div className="w-full h-full">{children}</div>
        <footer className="fixed bottom-0 w-full flex p-2 border-t border-[#ffffffAA]">
          <a href="https://github.com/scRaul" target="_blank" className="">
            <GitHub></GitHub>
          </a>
          <a href="https://www.linkedin.com/in/raul-rl/" target="_blank">
            <LinkedIn></LinkedIn>
          </a>
        </footer>
      </body>
    </html>
  );
}
