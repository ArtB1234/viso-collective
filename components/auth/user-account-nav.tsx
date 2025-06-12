"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";

export function UserAccountNav() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  if (isLoading) {
    return <div className="h-8 w-8 rounded-full bg-zinc-200 animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && session?.user ? (
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium">
              {session.user.name ? `Hi, ${session.user.name.split(' ')[0]}` : 'Welcome'}
            </span>
          </div>
          <Link href="/profile" className="flex items-center gap-2">
            {session.user.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="h-8 w-8 rounded-full border border-zinc-200" 
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                {session.user.name?.charAt(0) || "U"}
              </div>
            )}
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
