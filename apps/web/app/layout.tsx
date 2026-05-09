import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elvaré — Ethereal Fashion",
    template: "%s | Elvaré",
  },
  description: "Experience premium, sustainable fashion. Curated collections for the modern wardrobe.",
  openGraph: {
    title: "Elvaré — Ethereal Fashion",
    description: "Experience premium, sustainable fashion. Curated collections for the modern wardrobe.",
    url: "https://elvare.vercel.app",
    siteName: "Elvaré",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvaré — Ethereal Fashion",
    description: "Experience premium, sustainable fashion. Curated collections for the modern wardrobe.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-full flex flex-col font-sans`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-primary text-bg px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        <Providers>
          <Toaster />
          <Navbar />
          <main id="main-content" className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
