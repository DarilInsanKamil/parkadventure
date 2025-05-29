"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mountain,
  Package,
  Users,
  Image,
  Award,
  CalendarDays,
  Heart,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Games",
    href: "/admin/games",
    icon: <Mountain className="h-5 w-5" />,
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Facilities",
    href: "/admin/facilities",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: <Image className="h-5 w-5" />,
  },
  {
    title: "Heroes",
    href: "/admin/heroes",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Define navigation items

  return (
    <div className="hidden md:flex flex-col w-64 dark:bg-[#0a1f0c] border-r border-[#3e4a3d]">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b">
        <Link href="/admin" className="flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Rafting CMS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto py-4 px-3">
        <NavContent navItems={navItems} />
      </nav>
    </div>
  );
}

const NavContent = ({ navItems }: { navItems: any }) => {
  const pathname = usePathname();
  return (
    <>
      <ul className="space-y-1">
        {navItems.map((item: any) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-[#2d3a2e] text-primary"
                  : "dark:text-white hover:bg-[#388e3c]"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
        <li className="border-b"></li>
      </ul>

      <div className="mt-5">
        <Button
          variant="outline"
          className="w-full justify-start text-gray-700 bg-[#c62828]"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </>
  );
};

export function MobileSidebar() {
  return (
    <nav className="flex-1 overflow-auto py-4 px-3">
      <NavContent navItems={navItems} />
    </nav>
  );
}
