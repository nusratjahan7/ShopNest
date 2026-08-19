"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ShoppingCart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getDashboardLinks, type Role } from "./DashboardLink";

type DashboardUser = {
  id: string;
  email: string;
  role: string;
  name?: string;
  [key: string]: unknown;
};

const roleLabel: Record<Role, string> = {
  user: "Customer",
  seller: "Seller",
  admin: "Admin",
};

export default function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (user.role as Role) ?? "user";
  const links = getDashboardLinks(role);
  const displayName =
    (typeof user.name === "string" && user.name.trim()) ||
    user.email?.split("@")[0] ||
    "Account";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out.");
      router.push("/auth/login");
      router.refresh();
    } catch (err) {
      toast.error("Could not log out. Please try again.");
    }
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
          <ShoppingCart className="h-4 w-4" />
        </span>
        <span className="text-base font-extrabold tracking-tight text-gray-900">
          SHOP<span className="text-green-600">NEST</span>
        </span>
      </Link>

      {/* Role badge */}
      <div className="mx-5 mb-4 rounded-md bg-green-50 px-3 py-2">
        <p className="text-[11px] font-medium text-green-700">
          {roleLabel[role]} Dashboard
        </p>
      </div>

      {/* Links */}
      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname?.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="border-t border-gray-100 px-3 py-4">
        <div className="mb-2 px-3">
          <p className="truncate text-sm font-semibold text-gray-900">
            {displayName}
          </p>
          <p className="truncate text-xs text-gray-400">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-100 bg-white lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-md text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 lg:px-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-semibold text-gray-900 lg:text-base">
            {roleLabel[role]} Dashboard
          </h1>
          <span className="hidden text-sm font-medium text-gray-600 lg:block">
            {displayName}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}