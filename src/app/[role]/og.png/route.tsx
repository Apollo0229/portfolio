import { ogCard } from "@/components/og-card";
import { getRole, roles } from "@/data/roles";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return roles.filter((r) => r.path !== "/").map((r) => ({ role: r.key }));
}

export async function GET(_: Request, { params }: RouteContext<"/[role]/og.png">) {
  const role = getRole((await params).role)!;
  return ogCard({
    eyebrow: `${role.title} portfolio`,
    title: role.headline.join(" "),
    subtitle: role.rotating.join(" · "),
    accent: "#4f46e5",
  });
}
