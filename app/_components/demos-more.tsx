"use client";

import { motion } from "framer-motion";
import { Check, MapPin, Plus, Star, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import { CountUp } from "./motion";
import { AdminChrome, viewport } from "./admin-chrome";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { delay: i * 0.09, duration: 0.45, ease: EASE },
});

function Pill({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
    rose: "bg-rose-100 text-rose-700",
    slate: "bg-subtle text-muted-foreground",
  };
  return (
    <span
      className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold", map[tone] ?? map.slate)}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- multi-branch */

export function MultiBranchDemo() {
  const rows = [
    { n: "Downtown", rev: "$4.2k", on: true, s: "Open", tone: "emerald" },
    { n: "Riverside", rev: "$3.1k", s: "Open", tone: "emerald" },
    { n: "Airport", rev: "$5.8k", s: "Busy", tone: "amber" },
  ];
  return (
    <AdminChrome active="Dashboard" title="Branches · All locations">
      <div className="space-y-1.5">
        {rows.map((b, i) => (
          <motion.div
            key={b.n}
            {...rise(i)}
            className={cn(
              "flex items-center justify-between rounded-lg border px-2.5 py-2",
              b.on ? "border-brand/40 bg-brand-tint" : "border-border bg-surface",
            )}
          >
            <span className="flex items-center gap-2 text-[11px] font-semibold text-ink">
              <MapPin className={cn("size-3.5", b.on ? "text-brand" : "text-muted-foreground")} />
              {b.n}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">{b.rev} today</span>
              <Pill tone={b.tone}>{b.s}</Pill>
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center text-[9px] text-muted-foreground">
        Switch branch in the topbar — menu, stock & reports follow.
      </p>
    </AdminChrome>
  );
}

/* -------------------------------------------------------------- website builder */

export function WebsiteBuilderDemo() {
  const blocks = ["Hero banner", "Menu grid", "Promo strip", "Reviews"];
  return (
    <AdminChrome active="Settings" title="Website Builder · Home">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3 space-y-1.5">
          {blocks.map((b, i) => (
            <motion.div
              key={b}
              {...rise(i)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-2 py-2 text-[10px] font-medium",
                i === 1
                  ? "border-brand/50 bg-brand-tint text-brand"
                  : "border-border bg-surface text-ink",
              )}
            >
              <span className="flex flex-col gap-[2px]" aria-hidden>
                <span className="size-0.5 rounded-full bg-muted-foreground/50" />
                <span className="size-0.5 rounded-full bg-muted-foreground/50" />
              </span>
              {b}
            </motion.div>
          ))}
        </div>
        <div className="col-span-2 rounded-lg border border-dashed border-brand/40 bg-brand-tint/40 p-2">
          <p className="text-[9px] font-semibold text-muted-foreground">Add block</p>
          {["Text", "Gallery", "CTA"].map((b, i) => (
            <motion.div
              key={b}
              {...rise(i + 2)}
              className="mt-1.5 flex items-center gap-1 rounded-md bg-surface px-2 py-1.5 text-[9px] text-ink"
            >
              <Plus className="size-2.5 text-brand" aria-hidden /> {b}
            </motion.div>
          ))}
        </div>
      </div>
    </AdminChrome>
  );
}

/* ------------------------------------------------------------------ promotions */

export function PromotionsDemo() {
  const rows = [
    { code: "WELCOME10", off: "10% off", uses: "143", s: "Active", tone: "emerald" },
    { code: "FREESHIP", off: "Free delivery", uses: "88", s: "Active", tone: "emerald" },
    { code: "SUMMER5", off: "$5 off", uses: "0", s: "Scheduled", tone: "amber" },
  ];
  return (
    <AdminChrome active="Settings" title="Promotions">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="grid grid-cols-[1.3fr_1.2fr_0.7fr_0.9fr] border-b border-border bg-subtle px-2 py-1.5 text-[9px] font-semibold text-muted-foreground">
          <span>Code</span>
          <span>Discount</span>
          <span>Uses</span>
          <span>Status</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.code}
            {...rise(i)}
            className="grid grid-cols-[1.3fr_1.2fr_0.7fr_0.9fr] items-center px-2 py-1.5 text-[10px] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
          >
            <span className="font-mono font-semibold text-brand">{r.code}</span>
            <span className="text-ink">{r.off}</span>
            <span className="tabular-nums text-muted-foreground">{r.uses}</span>
            <span>
              <Pill tone={r.tone}>{r.s}</Pill>
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center text-[9px] text-muted-foreground">
        Applies across POS, QR and online checkout.
      </p>
    </AdminChrome>
  );
}

/* ------------------------------------------------------------------- campaigns */

export function CampaignsDemo() {
  const stats = [
    { k: "Sent", v: 1240, w: 100, tone: "bg-brand/30" },
    { k: "Opened", v: 812, w: 65, tone: "bg-brand/60" },
    { k: "Ordered", v: 143, w: 12, tone: "bg-brand" },
  ];
  return (
    <AdminChrome active="Settings" title='Campaigns · "Weekend 2-for-1"'>
      <div className="space-y-2.5 rounded-lg border border-border bg-surface p-3">
        {stats.map((s, i) => (
          <div key={s.k}>
            <div className="mb-1 flex items-center justify-between text-[10px]">
              <span className="font-medium text-ink">{s.k}</span>
              <span className="tabular-nums text-muted-foreground">
                <CountUp to={s.v} separator />
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-subtle">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.w}%` }}
                viewport={viewport}
                transition={{ delay: i * 0.12, duration: 0.9, ease: EASE }}
                className={cn("h-full rounded-full", s.tone)}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminChrome>
  );
}

/* ---------------------------------------------------------------- notifications */

export function NotificationsDemo() {
  const notes = [
    { t: "New order · Table 6", d: "2× Burger, Fries", tone: "bg-brand", ago: "now" },
    { t: "Booking confirmed", d: "Priya · 4 · 7:30 PM", tone: "bg-sky-500", ago: "1m" },
    { t: "Delivery assigned", d: "ORD-1041 · Sam", tone: "bg-emerald-500", ago: "3m" },
    { t: "Low stock", d: "Cold brew kegs", tone: "bg-rose-500", ago: "8m" },
  ];
  return (
    <AdminChrome active="Dashboard" title="Notifications">
      <div className="space-y-1.5">
        {notes.map((n, i) => (
          <motion.div
            key={n.t}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.12, duration: 0.4, ease: EASE }}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2"
          >
            <span className={cn("size-2 shrink-0 rounded-full", n.tone)} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold text-ink">{n.t}</span>
              <span className="block truncate text-[9px] text-muted-foreground">{n.d}</span>
            </span>
            <span className="text-[9px] text-muted-foreground">{n.ago}</span>
          </motion.div>
        ))}
      </div>
    </AdminChrome>
  );
}

/* --------------------------------------------------------------- cash register */

export function CashRegisterDemo() {
  const rows = [
    { k: "Opening float", v: "$200.00" },
    { k: "Cash sales", v: "+$1,140.50" },
    { k: "Paid out", v: "−$60.00" },
  ];
  return (
    <AdminChrome active="Register" title="Cash Register · Today">
      <div className="rounded-lg border border-border bg-surface p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-ink">Session #48</span>
          <Pill tone="emerald">Open</Pill>
        </div>
        <div className="space-y-1.5 text-[10px]">
          {rows.map((r, i) => (
            <motion.div key={r.k} {...rise(i)} className="flex justify-between">
              <span className="text-muted-foreground">{r.k}</span>
              <span className="font-medium tabular-nums text-ink">{r.v}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
          <span className="text-[10px] text-muted-foreground">Expected in drawer</span>
          <span className="font-display text-[15px] font-bold text-ink">
            <CountUp to={1280.5} decimals={2} prefix="$" separator duration={1.1} />
          </span>
        </div>
      </div>
    </AdminChrome>
  );
}

/* ------------------------------------------------------------------ deliveries */

export function DeliveriesDemo() {
  const jobs = [
    { id: "ORD-1041", who: "Sam", s: "Delivered", tone: "emerald" },
    { id: "ORD-1044", who: "Aisha", s: "On the way", tone: "sky" },
    { id: "ORD-1046", who: "—", s: "Assign", tone: "amber" },
  ];
  return (
    <AdminChrome active="Orders" title="Deliveries">
      <div className="space-y-1.5">
        {jobs.map((j, i) => (
          <motion.div
            key={j.id}
            {...rise(i)}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-2.5 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand-tint text-brand">
                <Truck className="size-3.5" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-semibold text-ink">{j.id}</p>
                <p className="text-[9px] text-muted-foreground">Rider: {j.who}</p>
              </div>
            </div>
            <Pill tone={j.tone}>{j.s}</Pill>
          </motion.div>
        ))}
      </div>
    </AdminChrome>
  );
}

/* ----------------------------------------------------------------- localization */

export function LocalizationDemo() {
  return (
    <AdminChrome active="Settings" title="Settings · Languages & Currencies">
      <div className="mb-2 flex gap-1.5">
        {["EN", "ES", "FR", "AR"].map((l, i) => (
          <motion.span
            key={l}
            {...rise(i)}
            className={cn(
              "flex-1 rounded-md border py-1.5 text-center text-[10px] font-semibold",
              i === 0
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-surface text-ink",
            )}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        {[
          { c: "USD — Dollar", r: "1.00", v: "$12.50" },
          { c: "EUR — Euro", r: "0.91", v: "€11.40" },
          { c: "PKR — Rupee", r: "278.4", v: "₨3,480" },
        ].map((m, i) => (
          <motion.div
            key={m.c}
            {...rise(i + 1)}
            className="grid grid-cols-[1.4fr_0.8fr_0.9fr] items-center px-2 py-1.5 text-[10px] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
          >
            <span className="font-medium text-ink">{m.c}</span>
            <span className="tabular-nums text-muted-foreground">{m.r}</span>
            <span className="text-right font-semibold text-ink">{m.v}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center text-[9px] text-muted-foreground">
        Same item, converted at today&rsquo;s rate.
      </p>
    </AdminChrome>
  );
}

/* ----------------------------------------------------------------- integrations */

export function IntegrationsDemo() {
  const apps = [
    { n: "Delivery", on: true },
    { n: "WhatsApp", on: true },
    { n: "Accounting", on: false },
    { n: "Analytics", on: true },
  ];
  return (
    <AdminChrome active="Settings" title="Marketplace · Integrations">
      <div className="grid grid-cols-2 gap-2">
        {apps.map((a, i) => (
          <motion.div
            key={a.n}
            {...rise(i)}
            className="flex items-center justify-between rounded-lg border border-border bg-surface p-2.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-7 rounded-lg bg-gradient-to-br from-brand-tint to-accent-tint"
                aria-hidden
              />
              <span className="text-[10px] font-medium text-ink">{a.n}</span>
            </div>
            <span
              className={cn(
                "flex h-4 w-7 items-center rounded-full px-0.5 transition-colors",
                a.on ? "justify-end bg-brand" : "justify-start bg-subtle",
              )}
            >
              <span className="size-3 rounded-full bg-white shadow-sm" />
            </span>
          </motion.div>
        ))}
      </div>
    </AdminChrome>
  );
}

/* ------------------------------------------------------------- menu import/export */

export function MenuIoDemo() {
  const rows = [
    "Margherita, 12.50, Pizza",
    "Truffle Fries, 6.00, Sides",
    "Cold Brew, 4.50, Drinks",
  ];
  return (
    <AdminChrome active="Menu" title="Menu · Import / Export">
      <div className="rounded-lg border border-border bg-surface p-2">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-ink">menu.csv</span>
          <Pill tone="emerald">Imported</Pill>
        </div>
        <div className="space-y-1.5 font-mono">
          {rows.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.16, duration: 0.4, ease: EASE }}
              className="flex items-center gap-2 rounded-md border border-border bg-subtle/50 px-2 py-1.5"
            >
              <span className="flex size-4 items-center justify-center rounded bg-emerald-100 text-emerald-600">
                <Check className="size-2.5" aria-hidden />
              </span>
              <span className="text-[9px] text-ink">{r}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-2 text-center font-sans text-[9px] text-muted-foreground">
          260 items updated · upsert by id
        </p>
      </div>
    </AdminChrome>
  );
}

/* --------------------------------------------------------------------- reviews */

export function ReviewsDemo() {
  return (
    <AdminChrome active="Menu" title="Reviews · Moderation">
      <motion.div {...rise(0)} className="rounded-lg border border-border bg-surface p-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          ))}
          <span className="ml-1 text-[11px] font-semibold text-ink">Amazing burger!</span>
          <span className="ml-auto">
            <Pill tone="amber">Pending</Pill>
          </span>
        </div>
        <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
          &ldquo;Best in town — cooked perfectly and super fast.&rdquo; — Priya · Signature Burger
        </p>
        <div className="mt-3 flex gap-2">
          <motion.span
            {...rise(1)}
            className="flex-1 rounded-md bg-brand py-1.5 text-center text-[10px] font-semibold text-brand-foreground"
          >
            Approve
          </motion.span>
          <span className="flex-1 rounded-md border border-border py-1.5 text-center text-[10px] font-semibold text-muted-foreground">
            Hide
          </span>
        </div>
      </motion.div>
      <p className="mt-2 text-center text-[9px] text-muted-foreground">
        Approved reviews publish to your storefront.
      </p>
    </AdminChrome>
  );
}

/* ---------------------------------------------------------------- realtime sync */

export function RealtimeDemo() {
  const orders = [
    { n: "ORD-1043", t: "Table 4 · Dine-in", s: "New", tone: "amber", isNew: true },
    { n: "ORD-1042", t: "Online · Delivery", s: "Preparing", tone: "violet" },
    { n: "ORD-1041", t: "Table 6 · Dine-in", s: "Ready", tone: "emerald" },
  ];
  return (
    <AdminChrome active="Orders" title="Live Orders">
      <div className="mb-2 flex items-center justify-end gap-1.5 text-[9px] font-medium text-emerald-600">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden /> Live ·
        syncing
      </div>
      <div className="space-y-1.5">
        {orders.map((o, i) => (
          <motion.div
            key={o.n}
            initial={{ opacity: 0, y: o.isNew ? -12 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.14, duration: 0.45, ease: EASE }}
            className={cn(
              "flex items-center justify-between rounded-lg border px-2.5 py-2",
              o.isNew ? "border-brand/50 bg-brand-tint" : "border-border bg-surface",
            )}
          >
            <div>
              <p className="text-[10px] font-semibold text-ink">{o.n}</p>
              <p className="text-[9px] text-muted-foreground">{o.t}</p>
            </div>
            <Pill tone={o.tone}>{o.s}</Pill>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center text-[9px] text-muted-foreground">
        A new order appears on every screen the instant it&rsquo;s placed.
      </p>
    </AdminChrome>
  );
}
