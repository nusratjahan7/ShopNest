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
    { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
    { label: "My Orders", href: "/dashboard/user/orders", icon: ListOrdered },
    { label: "Wishlist", href: "/dashboard/user/wishlist", icon: Heart },
    { label: "Cart", href: "/dashboard/user/cart", icon: ShoppingBag },
    { label: "Settings", href: "/dashboard/user/settings", icon: Settings },
  ],
  seller: [
    { label: "Overview", href: "/dashboard/seller", icon: LayoutDashboard },
    { label: "My Products", href: "/dashboard/seller/products", icon: Package },
    { label: "Orders", href: "/dashboard/seller/orders", icon: ListOrdered },
    { label: "Earnings", href: "/dashboard/seller/earnings", icon: Wallet },
    { label: "Analytics", href: "/dashboard/seller/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/seller/settings", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Sellers", href: "/dashboard/admin/sellers", icon: Store },
    { label: "Orders", href: "/dashboard/admin/orders", icon: ListOrdered },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { label: "Permissions", href: "/dashboard/admin/permissions", icon: ShieldCheck },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
};

export function getDashboardLinks(role: string): DashboardLink[] {
  return dashboardLinks[role as Role] ?? dashboardLinks.user;
}