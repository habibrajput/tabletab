import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TableTap — Run your whole restaurant from one place",
  description:
    "POS, QR dine-in ordering, online storefront, reservations, kitchen display and live analytics — one platform for single sites and multi-branch groups.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-surface text-ink">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
