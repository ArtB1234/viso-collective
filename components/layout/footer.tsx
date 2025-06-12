"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-zinc-600 md:text-left">
            &copy; {new Date().getFullYear()} VISO Collective. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
