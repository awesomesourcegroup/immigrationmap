import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/languageContext";
import { CompareProvider } from "@/lib/compareContext";
import CompareBar from "@/app/components/CompareBar";
import { getCountries } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Immigration Pathway",
  description: "Real timelines, real odds — every path to PR & citizenship across 36 countries. Take the quiz to find your best match.",
  openGraph: {
    title: "The Immigration Pathway",
    description: "Real timelines, real odds — every path to PR & citizenship across 36 countries.",
    siteName: "The Immigration Pathway",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Immigration Pathway",
    description: "Real timelines, real odds — every path to PR & citizenship across 36 countries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const countries = getCountries().map((c) => ({
    id: c.id,
    name: c.name,
    flagEmoji: c.flagEmoji,
  }));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CompareProvider>
            {children}
            <CompareBar countries={countries} />
          </CompareProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
