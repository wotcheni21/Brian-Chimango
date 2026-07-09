import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brian & Chimango — 26 August 2026",
  description:
    "Join Brian and Chimango as they say 'I do' on 26 August 2026. Ceremony, schedule, gallery and RSVP.",
  openGraph: {
    title: "Brian & Chimango — 26 August 2026",
    description:
      "Join Brian and Chimango as they say 'I do' on 26 August 2026.",
    images: ["/images/couple-doorway-full.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-ivory text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
