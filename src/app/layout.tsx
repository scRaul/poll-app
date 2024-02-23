import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PollUp",
  description: "Create and share polls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="text-xl pl-2 md:pl-10 py-4">
          <Link href={"/"}>
            <span className="font-bold text-emerald-700">Poll</span>
            <span className="font-mono">Up</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
