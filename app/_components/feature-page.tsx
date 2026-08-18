import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FEATURES, getFeature } from "./features-data";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { BOOK_A_CALL_URL } from "./site-config";

/** Per-feature page <head> metadata, driven by the shared feature data. */
export function featureMetadata(slug: string): Metadata {
  const f = getFeature(slug);
  if (!f) return {};
  return {
    title: `${f.name} — TableTap`,
    description: f.tagline,
  };
}

export function FeaturePage({ slug }: { slug: string }) {
  const feature = getFeature(slug);
  if (!feature) notFound();
  const { eyebrow, title, tagline, points, benefits, Demo } = feature;
  const others = FEATURES.filter((f) => f.slug !== slug);

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_12%_0%,var(--brand-tint),transparent),radial-gradient(45%_45%_at_100%_10%,var(--accent-tint),transparent)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal y={22}>
            <Link
              href="/#features"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden /> All features
            </Link>
            <span className="mt-5 block text-sm font-semibold uppercase tracking-wide text-brand">
              {eyebrow}
            </span>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{tagline}</p>
            <ul className="mt-6 space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-[15px] text-ink">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6 text-[15px]">
                <a href={BOOK_A_CALL_URL} target="_blank" rel="noopener noreferrer">
                  <PhoneCall className="size-4" aria-hidden /> Book a call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6 text-[15px]">
                <Link href="/#features">Explore all features</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal className="flex justify-center" y={28} delay={0.1}>
            <div className="w-full max-w-md">
              <Demo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* benefits */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            What makes it work
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title: bt, body }) => (
            <RevealItem key={bt}>
              <article className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{bt}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* explore more */}
      <section className="border-t border-border bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Explore more features
            </h2>
            <Link
              href="/#features"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-hover sm:inline-flex"
            >
              See all <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 6).map((f) => (
              <RevealItem key={f.slug}>
                <Link
                  href={`/${f.slug}`}
                  className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <f.icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 font-display text-base font-semibold text-ink">
                      {f.name}
                      <ArrowRight
                        className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {f.card}
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
