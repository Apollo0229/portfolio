import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { profile } from "@/data/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const description =
  "Senior Full-Stack Engineer with 7+ years at Zapier, Regions Bank, Shipt and Daxko. Sixteen case studies across React, TypeScript, Python, C#/.NET, distributed systems and production AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://apollo0229.github.io/portfolio/"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: `${profile.name} (${profile.nickname})`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.title}` }],
  },
  twitter: { card: "summary_large_image" },
};

// Scroll reveals start at opacity 0 in the HTML; without JavaScript they would never appear.
const noScriptReveal = `[style*="opacity:0"]{opacity:1!important;transform:none!important}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <noscript>
          <style>{noScriptReveal}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <MotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
