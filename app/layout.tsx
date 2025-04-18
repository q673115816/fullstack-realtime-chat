import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import Main from "../components/Main";
import InitClient from "@/components/InitClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Random Chat",
  description: "基于 Next.js 和 Supabase 的实时聊天应用",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InitClient />
      <html lang="zh">
        <body
          className={cn(
            "bg-emerald-50 flex flex-col h-screen",
            inter.className
          )}
        >
          <Header />
          <Main>{children}</Main>
          <Footer />
        </body>
      </html>
    </>
  );
}
