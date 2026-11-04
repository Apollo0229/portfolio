import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleView } from "@/components/role-view";
import { getRole, roles } from "@/data/roles";

export const dynamicParams = false;

// The full-stack view is served at "/", so only the other roles get a path.
export function generateStaticParams() {
  return roles.filter((r) => r.path !== "/").map((r) => ({ role: r.key }));
}

export async function generateMetadata({ params }: PageProps<"/[role]">): Promise<Metadata> {
  const role = getRole((await params).role);
  if (!role) return {};
  const title = `${role.title} portfolio`;
  return {
    title,
    description: role.summary,
    alternates: { canonical: role.path },
    openGraph: {
      title,
      description: role.summary,
      url: role.path,
      images: [{ url: `${role.path}og.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: { title, description: role.summary },
  };
}

export default async function RolePage({ params }: PageProps<"/[role]">) {
  const role = getRole((await params).role);
  if (!role) notFound();
  return <RoleView role={role} />;
}
