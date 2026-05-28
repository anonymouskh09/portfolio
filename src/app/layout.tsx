import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mazhar Rehman | Full-Stack Web Developer",
  description:
    "Mazhar Rehman — Full-Stack Web Developer from Lahore, Pakistan. Building fast, scalable digital products with React, PHP, Node.js, MySQL, Shopify, and automation.",
  keywords: [
    "Mazhar Rehman",
    "Full-Stack Developer",
    "React Developer",
    "Lahore",
    "Pakistan",
    "Web Developer",
    "Shopify",
    "PHP",
    "Node.js",
  ],
  authors: [{ name: "Mazhar Rehman" }],
  openGraph: {
    title: "Mazhar Rehman | Full-Stack Web Developer",
    description:
      "Premium portfolio of Mazhar Rehman — Full-Stack Web Developer specializing in React, PHP, Node.js, and e-commerce solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mazhar Rehman | Full-Stack Web Developer",
    description:
      "Building fast, scalable, and conversion-focused digital products.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="h-full overflow-hidden antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
