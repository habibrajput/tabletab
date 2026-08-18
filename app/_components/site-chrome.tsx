import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import { MainNav } from "./main-nav";

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TableTap home">
      <span className="flex size-8 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
        <UtensilsCrossed className="size-5" aria-hidden />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink">TableTap</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />
        <MainNav />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <Wordmark />
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-ink">
            About Us
          </Link>
          <Link href="/#features" className="transition-colors hover:text-ink">
            Features
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-ink">
            Pricing
          </Link>
          <Link href="/contact" className="transition-colors hover:text-ink">
            Contact Us
          </Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} TableTap</p>
      </div>
    </footer>
  );
}
