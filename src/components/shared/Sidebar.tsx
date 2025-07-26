"use client";

import Link from "next/link";

// Extend the session user type to include 'role'
declare module "next-auth" {
  interface User {
    role?: string;
  }
}
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  // Star,
  Plus,
  ShoppingCart,
  Home,
} from "lucide-react";
import { useSession } from "next-auth/react";

const adminLinks = [
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/dashboard/admin/manage-products",
    label: "Manage Products",
    icon: Package,
  },
  { href: "/dashboard/admin/add-product", label: "Add Product", icon: Plus },
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: Users },
  {
    href: "/dashboard/admin/manage-orders",
    label: "Manage Orders",
    icon: ShoppingCart,
  },
  {
    href: "/dashboard/admin/payment-history",
    label: "Payments",
    icon: CreditCard,
  },
  // { href: "/dashboard/admin/reviews", label: "Reviews", icon: Star },
];

const userLinks = [
  // { href: "/dashboard/user", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/dashboard/user/manage-orders",
    label: "My Orders",
    icon: ShoppingCart,
  },
  // { href: "/dashboard/user/payment", label: "Payment", icon: CreditCard },
  // { href: "/dashboard/user/reviews", label: "My Reviews", icon: Star },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role || "user"; // default to user
  //const  role = "admin"
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="min-w-[250px] h-full border-r bg-white shadow-sm p-4">
      <div className="mb-6">
        <Link
          href="/"
          className="text-xl font-semi-bold text-gray-800 flex items-center gap-2"
        >
          <Home className="w-5 h-5" /> Home
        </Link>
      </div>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100",
              pathname === href && "bg-gray-100 text-blue-600"
            )}
          >
            <Icon className="w-4 h-4" /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
