import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahan & Jazmine — July 21, 2026",
  description: "You are invited to celebrate the wedding of Rahan & Jazmine on July 21, 2026.",
  openGraph: {
    title: "Rahan & Jazmine — July 21, 2026",
    description: "You are invited to celebrate the wedding of Rahan & Jazmine.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
