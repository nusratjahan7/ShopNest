import DashboardShell from "@/components/dashboard/DashboardShell";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}