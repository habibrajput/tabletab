import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChefHat,
  MapPin,
  RefreshCw,
  ScanLine,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { FEATURES } from "./features-data";
import { Reveal, RevealGroup, RevealItem } from "./motion";

/* ------------------------------------------------------------ feature grid */

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand">
          Everything, connected
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
          One platform for the whole restaurant
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore each feature in depth — and see how they all stay in sync.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.filter((f) => f.tier !== "more").map((f) => (
          <RevealItem key={f.slug}>
            <Link
              href={`/${f.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <f.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{f.card}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Learn more
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ---------------------------------------------------------------- more features */

export function MoreFeatures() {
  const more = FEATURES.filter((f) => f.tier === "more");
  return (
    <section className="border-y border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            And plenty more under the hood
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every one has its own page — dig into the details.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((f) => (
            <RevealItem key={f.slug}>
              <Link
                href={`/${f.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3.5 font-display text-base font-semibold text-ink">{f.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {f.card}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Learn more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- roles */

const ROLES = [
  {
    icon: ShoppingBag,
    name: "Owner",
    tag: "Full control",
    body: "Sees every branch and every number. Sets pricing, staff and permissions across the whole group.",
    can: ["All modules & branches", "Roles & permissions", "Finance & reports"],
  },
  {
    icon: MapPin,
    name: "Multi-branch manager",
    tag: "Across sites",
    body: "Runs several locations at once with the topbar branch switcher and group-wide reporting.",
    can: ["Every branch's floor", "Menus & staff", "Cross-branch reports"],
  },
  {
    icon: MapPin,
    name: "Branch manager",
    tag: "One site",
    body: "Owns the day-to-day of a single branch — menu, tables, bookings and their team.",
    can: ["Their branch operations", "Menu & bookings", "Local reports"],
  },
  {
    icon: ChefHat,
    name: "Chef",
    tag: "The line",
    body: "Lives on the kitchen display — sees every ticket the moment it's placed and bumps it when it's ready.",
    can: ["Kitchen display", "Advance order status", "View the menu"],
  },
  {
    icon: ScanLine,
    name: "Waiter",
    tag: "The floor",
    body: "Takes orders on the POS, manages tables and reservations, and keeps guests moving.",
    can: ["POS & orders", "Tables & reservations", "Customers"],
  },
  {
    icon: Truck,
    name: "Delivery rider",
    tag: "On the road",
    body: "Picks up assigned deliveries, tracks drop-offs and settles cash-on-delivery on the go.",
    can: ["Assigned deliveries", "Update order status", "Collect payment"],
  },
];

export function RolesSection() {
  return (
    <section id="roles" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand">
          Built for every role
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
          Everyone sees exactly what they need
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          One system, six focused workspaces — nothing more, nothing less.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map(({ icon: Icon, name, tag, body, can }) => (
          <RevealItem key={name}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-brand">
                  {tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                {can.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] text-ink">
                    <Check className="size-3.5 shrink-0 text-brand" aria-hidden /> {c}
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ------------------------------------------------------------------ workflow */

export function WorkflowStrip() {
  const steps = [
    { icon: ScanLine, k: "Order placed", v: "POS, QR or online" },
    { icon: ChefHat, k: "Kitchen fires", v: "Live on the KDS" },
    { icon: RefreshCw, k: "Status goes live", v: "Floor & guest in sync" },
    { icon: BarChart3, k: "Books update", v: "Sales & reports, instantly" },
  ];
  return (
    <section id="how" className="border-y border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            One order. Every screen. Instantly.
          </h2>
        </Reveal>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, k, v }, i) => (
            <RevealItem key={k}>
              <div className="relative rounded-2xl border border-border bg-surface p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-tint text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-3.5 text-sm font-semibold text-ink">{k}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{v}</p>
                <span className="absolute right-4 top-4 font-display text-2xl font-bold text-border">
                  {i + 1}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
