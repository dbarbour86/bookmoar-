import type { Metadata } from "next";
import { Inter, Bebas_Neue, Permanent_Marker } from "next/font/google";
import "./globals.css";
import BookingTrigger from "@/components/BookingTrigger";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Book Moar | More Bookings. Less Guesswork.",
  description: "Premium websites, local SEO, Google reviews, and smart automations built to help local service businesses book more customers on autopilot.",
  openGraph: {
    title: "Book Moar | More Bookings. Less Guesswork.",
    description: "Premium websites, local SEO, Google reviews, and smart automations built to help local service businesses book more customers on autopilot.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${permanentMarker.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-brand-bg text-white-text font-sans selection:bg-primary-red selection:text-white-text">
        {children}
        <BookingTrigger />
      </body>
    </html>
  );
}
