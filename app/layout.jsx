import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata = {
  title: "Kamaldeep Prajapati — Content Creator Coach & Mentor",
  description:
    "Kamaldeep Prajapati helps content creators elevate their online presence with personalized coaching, courses, and resources.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
