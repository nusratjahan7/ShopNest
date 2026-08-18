import { getUserSession } from "@/lib/core/session";
import NavbarClient from "./Navbar-client";


export default async function Navbar() {
  const user = await getUserSession();

  return <NavbarClient user={user} />;
}