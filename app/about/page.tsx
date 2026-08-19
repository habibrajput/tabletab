import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, PhoneCall, Rocket, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CountUp, Reveal, RevealGroup, RevealItem } from "../_components/motion";
import { BOOK_A_CALL_URL } from "../_components/site-config";

export const metadata: Metadata = {
  title: "About Us — TableTap",
  description:
    "TableTap is the all-in-one platform built by restaurant people, for restaurant people — one connected system for the whole operation.",
};

const VALUES = [
  {
    icon: Zap,
    title: "One connected system",
    body: "No more five apps that don't talk. Every order, table and number lives in one place — in sync, in real time.",
  },
  {
    icon: HeartHandshake,
    title: "Built for the floor",
    body: "Designed with the people who actually run service, so it's fast under pressure and forgiving on a busy Friday.",
  },
  {
    icon: ShieldCheck,
    title: "Yours to control",
    body: "Per-role access, per-branch data and no hardware lock-in. Your business, your rules, your tablets.",
  },
  {
    icon: Rocket,
    title: "Live in a day",
    body: "Import your menu, print your QR codes and take your first order — often on the very same day.",
  },
];

const STATS = [
  { el: <CountUp to={19} />, label: "features in one platform" },
  { el: <CountUp to={6} />, label: "role-based workspaces" },
  { el: "Real-time", label: "sync across every screen" },
  { el: "1 → ∞", label: "one site or a whole group" },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_0%,var(--brand-tint),transparent),radial-gradient(45%_45%_at_100%_10%,var(--accent-tint),transparent)]"
        />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl">
              Built by restaurant people, for restaurant people
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We spent years watching great kitchens fight their own tools — a POS here, a booking
              app there, spreadsheets everywhere. TableTap is the system we wished we&rsquo;d had:
              one platform that runs the whole restaurant, from the first tap to the final report.
            </p>
          </Reveal>
        </div>
      </section>

      {/* mission */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand">
              Why we exist
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
              Great food deserves great tools
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Running a restaurant is hard enough without stitching together software that was never
              meant to work together. Menus drift out of sync, stock disappears, and the numbers
              only show up a week too late.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              We built TableTap so a single change — a new price, a sold-out dish, a new branch —
              flows everywhere at once: the POS, the QR menu, your storefront and the kitchen line.
              One source of truth, updated live, for everyone who needs it.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/#features">
                Explore the platform <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>

          <Reveal y={28} delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm"
                >
                  <p className="font-display text-2xl font-bold text-brand">{s.el}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-border bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
              What we believe
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles behind every screen we ship.
            </p>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <RevealItem key={title}>
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            Come build with us
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Whether you run one café or fifty, we&rsquo;d love to help you run it from one place.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
                <PhoneCall className="size-4" aria-hidden /> Book a call
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
