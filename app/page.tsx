import type { Metadata } from "next";
import Link from "next/link";
import { Check, PhoneCall, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroDemo } from "./_components/demos";
import { CountUp, Reveal } from "./_components/motion";
import { FeatureGrid, MoreFeatures, RolesSection, WorkflowStrip } from "./_components/sections";
import { BOOK_A_CALL_URL } from "./_components/site-config";

export const metadata: Metadata = {
  title: "TableTap — Run your whole restaurant from one place",
  description:
    "POS, QR dine-in ordering, online storefront, reservations, kitchen display and live analytics — one platform for single sites and multi-branch groups.",
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WorkflowStrip />
      <FeatureGrid />
      <MoreFeatures />
      <RolesSection />
      <StatsBand />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_0%,var(--brand-tint),transparent),radial-gradient(45%_45%_at_100%_10%,var(--accent-tint),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal y={24}>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            Run your whole restaurant from one place.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            TableTap brings your point-of-sale, QR dine-in ordering, online storefront, bookings,
            kitchen display and live analytics together — so every order lands in the right place,
            automatically.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-[15px]">
              <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
                <PhoneCall className="size-4" aria-hidden /> Book a call
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 text-[15px]">
              <a href="#features">See what&rsquo;s inside</a>
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-brand" aria-hidden /> No card required
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-brand" aria-hidden /> Works on your tablets
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-brand" aria-hidden /> Set up in a day
            </li>
          </ul>
        </Reveal>

        <HeroDemo />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- trust strip */

function TrustStrip() {
  return (
    <section className="border-y border-border bg-subtle" id="why">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm font-medium text-muted-foreground">
          Built for cafés, quick-service and full-service — single sites to multi-branch groups.
        </p>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="flex" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span className="font-medium text-ink">Loved by busy floors</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- stats band */

const STATS = [
  { el: <CountUp to={6} />, label: "focused role workspaces" },
  { el: <CountUp to={30} suffix="+" />, label: "connected modules" },
  { el: "Real-time", label: "orders sync across every screen" },
  { el: "1 → ∞", label: "run one site or a whole group" },
];

function StatsBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="font-display text-2xl font-bold text-brand">{s.el}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------------- final CTA */

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 pb-20 sm:px-6">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(245,158,11,0.18),transparent),radial-gradient(40%_50%_at_100%_100%,rgba(15,118,110,0.30),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl">
          <ShieldCheck className="mx-auto size-8 text-amber-400" aria-hidden />
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Bring your restaurant online today
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Set up your menu, print your table QR codes, and take your first order — often on the
            same day.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white px-6 text-[15px] text-ink hover:bg-white/90"
            >
              <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
                <PhoneCall className="size-4" aria-hidden /> Book a call
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/25 bg-transparent px-6 text-[15px] text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
