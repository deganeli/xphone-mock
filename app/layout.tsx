import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ui = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celular X — mockup FiveM",
  description: "Mockup front-end de celular para servidor FiveM.",
};

export const viewport: Viewport = {
  themeColor: "#050507",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${ui.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
