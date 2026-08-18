"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FEATURES } from "./features-data";
import { BOOK_A_CALL_URL } from "./site-config";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

const core = FEATURES.filter((f) => f.tier !== "more");
const more = FEATURES.filter((f) => f.tier === "more");

export function MainNav() {
  const pathname = usePathname();
  const [featOpen, setFeatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const featRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (featRef.current && !featRef.current.contains(e.target as Node)) setFeatOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFeatOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setFeatOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="flex items-center gap-1 md:gap-2">
      {/* Desktop nav */}
      <nav className="hidden items-center md:flex">
        <NavLink href="/" active={pathname === "/"}>
          Home
        </NavLink>
        <NavLink href="/about" active={isActive("/about")}>
          About Us
        </NavLink>

        {/* Features mega-dropdown */}
        <div
          ref={featRef}
          className="relative"
          onMouseEnter={() => setFeatOpen(true)}
          onMouseLeave={() => setFeatOpen(false)}
        >
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={featOpen}
            onClick={() => setFeatOpen((o) => !o)}
            className={cn(
              "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              featOpen ? "text-ink" : "text-muted-foreground hover:text-ink",
            )}
          >
            Features
            <ChevronDown
              className={cn("size-4 transition-transform", featOpen && "rotate-180")}
              aria-hidden
            />
          </button>

          {featOpen && (
            <div role="menu" className="absolute right-0 top-full z-50 w-[min(96vw,56rem)] pt-3">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-elevated)]">
                <FeatureSection label="Core platform" items={core} />
                <div className="my-4 h-px bg-border" aria-hidden />
                <FeatureSection label="And more" items={more} />
                <Link
                  href="/#features"
                  className="mt-5 flex items-center justify-center rounded-xl bg-subtle py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-tint"
                >
                  Browse all features
                </Link>
              </div>
            </div>
          )}
        </div>

        <NavLink href="/pricing" active={isActive("/pricing")}>
          Pricing
        </NavLink>
        <NavLink href="/contact" active={isActive("/contact")}>
          Contact Us
        </NavLink>
      </nav>

      <span className="mx-1 hidden h-5 w-px bg-border md:block" aria-hidden />

      {/* Action — Book a call (opens the scheduling page) */}
      <Button asChild size="sm" className="hidden sm:inline-flex">
        <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
          <PhoneCall className="size-4" aria-hidden /> Book a call
        </a>
      </Button>

      {/* Mobile toggle */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
        className="flex size-9 items-center justify-center rounded-lg border border-border text-ink md:hidden"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-16 z-50 max-h-[80vh] overflow-y-auto border-b border-border bg-surface p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Features
          </p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {FEATURES.map((f) => (
              <Link
                key={f.slug}
                href={`/${f.slug}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-ink hover:bg-secondary"
              >
                <f.icon className="size-4 shrink-0 text-brand" aria-hidden />
                {f.name}
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Button asChild size="sm" className="w-full">
              <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
                <PhoneCall className="size-4" aria-hidden /> Book a call
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-ink" : "text-muted-foreground hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

function FeatureSection({ label, items }: { label: string; items: typeof FEATURES }) {
  return (
    <div>
      <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="grid grid-cols-3 gap-x-3 gap-y-1">
        {items.map((f) => (
          <Link
            key={f.slug}
            href={`/${f.slug}`}
            className="group flex items-start gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-secondary"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
              <f.icon className="size-4" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-ink">{f.name}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{f.card}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
