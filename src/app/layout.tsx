import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Raihan — Graphic Designer & Visual Creative",
  description:
    "Mohammad Raihan is an independent graphic designer with 5+ years of experience creating impactful visual identities, digital experiences, and marketing creatives for brands and businesses.",
  keywords: [
    "Mohammad Raihan",
    "Graphic Designer",
    "Brand Identity",
    "Social Media Design",
    "YouTube Thumbnails",
    "Advertising Creatives",
    "RAIHAN",
    "Visual Creative",
  ],
  authors: [{ name: "Mohammad Raihan" }],
  openGraph: {
    title: "Mohammad Raihan — Graphic Designer & Visual Creative",
    description:
      "Turning ideas into visual experiences. 5+ years of creative design for growing brands.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Raihan — Graphic Designer & Visual Creative",
    description:
      "Turning ideas into visual experiences. 5+ years of creative design for growing brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
