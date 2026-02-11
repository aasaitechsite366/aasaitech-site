import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load fonts efficiently with Next.js Font optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AAS.AI | Agentic Orchestration",
  description: "Bridging Physical AI with Edge Velocity.",
  // --- INTEGRATION START: Website Logo Configuration ---
  icons: {
    icon: "/logo.png", // Uses the file from /public/logo.png
    shortcut: "/logo.png",
    apple: "/logo.png", // Optional: For iPhone home screen
  },
  // --- INTEGRATION END ---
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-[#050505] text-gray-200 selection:bg-cyan-500/30`}>
        {children}
      </body>
    </html>
  );
}
