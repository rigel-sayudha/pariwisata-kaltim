import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explore Kaltim | Pesona Borneo",
  description: "Temukan keindahan Kalimantan Timur. Dari birunya danau Labuan Cermin, pesona Kepulauan Derawan, hingga Ibu Kota Nusantara (IKN).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

