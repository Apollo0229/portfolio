import { ogCard } from "@/components/og-card";
import { roles } from "@/data/roles";

export const dynamic = "force-static";

export function GET() {
  const role = roles[0];
  return ogCard({
    eyebrow: "Portfolio",
    title: role.headline.join(" "),
    subtitle: "Sixteen case studies from Zapier, Regions Bank, Shipt and Daxko — full stack, frontend, backend and AI.",
    accent: "#4f46e5",
  });
}
