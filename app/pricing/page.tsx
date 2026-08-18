import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, PhoneCall, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BOOK_A_CALL_URL } from "../_components/site-config";
import { Reveal, RevealGroup, RevealItem } from "../_components/motion";

export const metadata: Metadata = {
  title: "Pricing — TableTap",
  description:
    "Simple, transparent pricing that scales from a single café to a multi-branch group. Start free, no card required.",
};

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    per: "/ month",
    tagline: "Everything you need to take your first orders.",
    cta: "Start free",
    features: [
      "1 branch",
      "POS & QR dine-in ordering",
      "Online storefront",
      "Kitchen display",
      "Up to 5 staff",
      "Community support",
    ],
  },
  {
    name: "Growth",
    price: "$79",
    per: "/ branch / month",
    tagline: "For busy single sites ready to grow.",
    cta: "Start free trial",
    featured: true,
    features: [
      "Everything in Starter",
      "Reservations & events",
      "Promotions & campaigns",
      "Live analytics & reports",
      "Roles & permissions",
      "Unlimited staff",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    tagline: "For multi-branch groups and franchises.",
    cta: "Talk to sales",
    features: [
      "Everything in Growth",
      "Unlimited branches",
      "Multi-branch reporting",
      "Integrations marketplace",
      "Localization & currency",
      "SSO & onboarding",
      "Dedicated success manager",
    ],
  },
];

const FAQ = [
  {
    q: "Do I need a card to start?",
    a: "No. The Starter plan is free forever, and trials don't ask for a card. You only pay when you're ready to grow.",
  },
  {
    q: "Does it work on my hardware?",
    a: "Yes — TableTap runs in the browser on the tablets, phones and laptops you already own. No proprietary hardware, no lock-in.",
  },
  {
    q: "How is a branch counted?",
    a: "A branch is one physical location. Growth is billed per active branch; Enterprise covers unlimited branches under one agreement.",
  },
  {
    q: "Can I change plans later?",
    a: "Anytime. Upgrade, downgrade or add branches whenever you like — changes apply immediately and prorate automatically.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--brand-tint),transparent)]"
        />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="size-3.5 text-brand" aria-hidden /> Pricing
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl">
              Simple pricing that scales with you
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Start free on a single site and grow to a whole group. No hardware to buy, no long
              contracts, cancel anytime.
            </p>
          </Reveal>
        </div>
      </section>

      {/* plans */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealGroup className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <RevealItem key={p.name}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border bg-surface p-7 shadow-sm",
                  p.featured
                    ? "border-brand shadow-[0_24px_60px_-24px_rgba(15,118,110,0.35)] ring-1 ring-brand/20"
                    : "border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-brand-foreground">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold tracking-tight text-ink">
                    {p.price}
                  </span>
                  {p.per && <span className="pb-1 text-sm text-muted-foreground">{p.per}</span>}
                </div>
                <Button
                  asChild
                  size="lg"
                  variant={p.featured ? "default" : "outline"}
                  className="mt-6"
                >
                  {p.name === "Enterprise" ? (
                    <Link href="/contact">{p.cta}</Link>
                  ) : (
                    <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
                      <PhoneCall className="size-4" aria-hidden /> Book a call
                    </a>
                  )}
                </Button>
                <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span className="text-[14px] text-ink">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include real-time sync, unlimited menu items and free updates.
          </p>
        </Reveal>
      </section>

      {/* faq */}
      <section className="border-t border-border bg-subtle">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Questions, answered
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 space-y-3">
            {FAQ.map(({ q, a }) => (
              <RevealItem key={q}>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-ink">{q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 text-center">
            <p className="text-muted-foreground">Still have a question?</p>
            <Button asChild className="mt-4">
              <Link href="/contact">
                Contact us <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
