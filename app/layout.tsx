import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahan & Jaz — July 21, 2026",
  description: "You are invited to celebrate the wedding of Rahan & Jaz on July 21, 2026.",
  openGraph: {
    title: "Rahan & Jaz — July 21, 2026",
    description: "You are invited to celebrate the wedding of Rahan & Jaz.",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Pinyon+Script&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
