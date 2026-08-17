import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  Settings,
  Users,
  Store,
  BarChart3,
  ShieldCheck,
  Wallet,
  ListOrdered,
  type LucideIcon,
} from "lucide-react";

export type Role = "user" | "seller" | "admin";

export type DashboardLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const dashboardLinks: Record<Role, DashboardLink[]> = {
  user: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Orders", href: "/dashboard/orders", icon: Package },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { label: "Cart", href: "/dashboard/cart", icon: ShoppingBag },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  seller: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Products", href: "/dashboard/products", icon: Store },
    { label: "Orders", href: "/dashboard/orders", icon: ListOrdered },
    { label: "Earnings", href: "/dashboard/earnings", icon: Wallet },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/users", icon: Users },
    { label: "Sellers", href: "/dashboard/sellers", icon: Store },
    { label: "Orders", href: "/dashboard/orders", icon: ListOrdered },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Permissions", href: "/dashboard/permissions", icon: ShieldCheck },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
};

export function getDashboardLinks(role: string): DashboardLink[] {
  return dashboardLinks[role as Role] ?? dashboardLinks.user;
}