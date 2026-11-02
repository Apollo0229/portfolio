import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const description =
  "Senior Full-Stack Engineer with 7+ years at Zapier, Regions Bank, Shipt and Daxko — React, TypeScript, Python, Node.js, C#/.NET, distributed systems and production AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://apollo0229.github.io/portfolio/"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: `${profile.name} (${profile.nickname})`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
