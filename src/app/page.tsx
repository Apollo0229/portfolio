import { RoleView } from "@/components/role-view";
import { roles } from "@/data/roles";

export default function Home() {
  return <RoleView role={roles[0]} />;
}
