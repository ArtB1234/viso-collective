"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAccountNav } from "@/components/auth/user-account-nav";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Members", href: "/members" },
  { name: "Posts", href: "/posts" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">VISO Collective</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-zinc-900",
                  pathname === item.href
                    ? "text-zinc-900"
                    : "text-zinc-500"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <UserAccountNav />
        </div>
      </div>
    </header>
  );
}
