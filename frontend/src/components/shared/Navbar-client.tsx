"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// ---- Types ----
type DropdownItem = {
  label: string;
  href: string;
};

type NavLink = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

type NavbarUser = {
  id: string;
  email: string;
  role: string;
  name?: string;
  [key: string]: unknown;
} | null;

// ---- Nav links data (edit this array to change the menu) ----
const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
    dropdown: [
      { label: "Home 1", href: "/" },
      { label: "Home 2", href: "/home-2" },
      { label: "Home 3", href: "/home-3" },
    ],
  },
  {
    label: "Pages",
    href: "/pages",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "404 Page", href: "/404" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    dropdown: [
      { label: "All Products", href: "/products" },
      { label: "Product Details", href: "/products/details" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const promoItems: string[] = [
  "FREE SHIPPING OVER $199",
  "30 DAYS MONEY BACK",
  "100% SECURE PAYMENT",
];

const categories: string[] = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports",
];

function getDisplayName(user: NavbarUser): string {
  if (!user) return "";
  const name = typeof user.name === "string" ? user.name : "";
  if (name.trim()) return name.split(" ")[0];
  return user.email?.split("@")[0] ?? "Account";
}

export default function NavbarClient({ user }: { user: NavbarUser }) {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [category, setCategory] = useState(categories[0]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const cartCount = 0;
  const cartTotal = "$0";
  const displayName = getDisplayName(user);

  // Close the account dropdown when clicking outside of it
  useEffect(() => {
    if (!accountOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountOpen]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out.");
      setAccountOpen(false);
      setMobileOpen(false);
      router.push("/auth/login");
      router.refresh();
    } catch (err) {
      toast.error("Could not log out. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-(--background) border-b border-gray-100 font-sans">
      {/* Top row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:py-4 lg:px-8">
        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white sm:h-9 sm:w-9">
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-gray-900 sm:text-lg">
              SHOP<span className="text-green-600">NEST</span>
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setOpenMenu(link.label)}
              onMouseLeave={() => link.dropdown && setOpenMenu(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 text-sm font-semibold text-gray-800 hover:text-(--primary)"
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>

              {link.dropdown && openMenu === link.label && (
                <div className="absolute left-0 top-full z-20 w-48 pt-3">
                  <div className="rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-(--primary)"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2 sm:gap-5">
          <button
            aria-label="Wishlist"
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 sm:flex"
          >
            <Heart className="h-4 w-4" />
          </button>

          <div ref={accountRef} className="relative hidden items-center gap-2 lg:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <User className="h-4 w-4" />
            </span>

            {user ? (
              <>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] text-gray-400">
                    WELCOME
                  </span>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((v) => !v)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-(--primary)"
                  >
                    {displayName}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        accountOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </span>

                {accountOpen && (
                  <div className="absolute right-0 top-full z-20 mt-3 w-44 rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                    <Link
                      href={`/dashboard/${user.role}`}
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-(--primary)"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-(--primary)"
                    >
                      My Account
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <span className="text-left leading-tight">
                <span className="block text-[11px] text-gray-400">WELCOME</span>
                <Link
                  href="/auth/login"
                  className="block text-xs font-bold text-gray-900 hover:text-(--primary)"
                >
                  LOG IN / REGISTER
                </Link>
              </span>
            )}
          </div>

          <Link href="/cart" className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--primary) text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </span>
            <span className="hidden text-left leading-tight lg:block">
              <span className="block text-[11px] text-gray-400">CART</span>
              <span className="block text-xs font-bold text-gray-900">
                {cartTotal}
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Promo / search bar */}
      <div className="w-full bg-(--primary)">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 px-4 py-3 sm:items-center lg:flex-row lg:justify-between lg:px-8">
          {/* Search */}
          <div className="flex w-full items-stretch overflow-hidden rounded-md bg-white lg:w-auto lg:flex-1 lg:max-w-xl">
            <div className="relative hidden xs:block sm:block">
              <button
                type="button"
                onClick={() => setCategoryOpen((v) => !v)}
                className="flex h-full items-center gap-1 whitespace-nowrap border-r border-gray-200 px-3 text-xs text-gray-700 sm:px-4 sm:text-sm"
              >
                <span className="hidden sm:inline">{category}</span>
                <span className="sm:hidden">Cat.</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0" />
              </button>
              {categoryOpen && (
                <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setCategoryOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-(--primary)"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Search anything..."
              className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-700 outline-none sm:px-4"
            />

            <button
              type="button"
              aria-label="Search"
              className="flex shrink-0 items-center justify-center px-3 text-gray-500 hover:text-(--primary) sm:px-4"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Promo items */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 lg:justify-end lg:gap-x-8">
            {promoItems.map((item) => (
              <span
                key={item}
                className="text-[10px] font-bold tracking-wide text-white sm:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary) text-white">
                  <ShoppingCart className="h-4 w-4" />
                </span>
                <span className="text-base font-extrabold tracking-tight text-gray-900">
                  SHOP<span className="text-green-600">NEST</span>
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Account row */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                <User className="h-4 w-4" />
              </span>

              {user ? (
                <span className="text-left leading-tight">
                  <span className="block text-[11px] text-gray-400">
                    WELCOME
                  </span>
                  <span className="block text-xs font-bold text-gray-900">
                    {displayName}
                  </span>
                </span>
              ) : (
                <span className="text-left leading-tight">
                  <span className="block text-[11px] text-gray-400">
                    WELCOME
                  </span>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs font-bold text-gray-900"
                  >
                    LOG IN / REGISTER
                  </Link>
                </span>
              )}

              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="ml-auto flex items-center gap-2"
              >
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                </span>
              </Link>
            </div>

            {/* Nav links accordion */}
            <nav className="flex flex-1 flex-col px-2 py-2">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="border-b border-gray-50 last:border-none"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 px-3 py-3 text-sm font-semibold text-gray-800"
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <button
                        type="button"
                        aria-label={`Toggle ${link.label} submenu`}
                        onClick={() =>
                          setMobileAccordion((prev) =>
                            prev === link.label ? null : link.label,
                          )
                        }
                        className="px-3 py-3 text-gray-500"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            mobileAccordion === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {link.dropdown && mobileAccordion === link.label && (
                    <div className="flex flex-col bg-gray-50 pb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-6 py-2 text-sm text-gray-600 hover:text-green-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex items-center gap-2 px-3 py-3 text-left text-sm font-semibold text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </nav>

            {/* Wishlist + promo items */}
            <div className="border-t border-gray-100 px-4 py-4">
              <button className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Heart className="h-4 w-4" />
                Wishlist
              </button>
              <div className="flex flex-col gap-2">
                {promoItems.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-bold tracking-wide text-green-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}