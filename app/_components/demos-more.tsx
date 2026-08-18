"use client";

import { motion } from "framer-motion";
import { Check, MapPin, Plus, Star, Truck, Utensils } from "lucide-react";

import { cn } from "@/lib/utils";
import { CountUp } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-60px" } as const;

function Panel({
  title,
  chip,
  children,
}: {
  title: string;
  chip?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-3 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="rounded-2xl border border-border bg-subtle p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-brand-foreground">
              <Utensils className="size-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-ink">{title}</span>
          </div>
          {chip && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
              {chip}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

const item = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { delay: i * 0.1, duration: 0.45, ease: EASE },
});

/* ---------------------------------------------------------------- multi-branch */

export function MultiBranchDemo() {
  const branches = [
    { n: "Downtown", rev: "$4.2k", active: true },
    { n: "Riverside", rev: "$3.1k" },
    { n: "Airport", rev: "$5.8k" },
  ];
  return (
    <Panel title="Branches" chip="3 live">
      <div className="space-y-2">
        {branches.map((b, i) => (
          <motion.div
            key={b.n}
            {...item(i)}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3 py-2.5",
              b.active ? "border-brand/40 bg-brand-tint" : "border-border bg-surface",
            )}
          >
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <MapPin className={cn("size-4", b.active ? "text-brand" : "text-muted-foreground")} />
              {b.n}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">{b.rev} today</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        Switch branch in the topbar — menu, stock & reports follow.
      </p>
    </Panel>
  );
}

/* -------------------------------------------------------------- website builder */

export function WebsiteBuilderDemo() {
  const blocks = ["Hero banner", "Menu grid", "Promo strip", "Reviews"];
  return (
    <Panel title="Website builder" chip="Draft">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3 space-y-1.5">
          {blocks.map((b, i) => (
            <motion.div
              key={b}
              {...item(i)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-2 py-2 text-[11px] font-medium",
                i === 1
                  ? "border-brand/50 bg-brand-tint text-brand"
                  : "border-border bg-surface text-ink",
              )}
            >
              <span className="size-1.5 rounded-full bg-muted-foreground/40" aria-hidden />
              {b}
            </motion.div>
          ))}
        </div>
        <div className="col-span-2 rounded-lg border border-dashed border-brand/40 bg-brand-tint/40 p-2">
          <p className="text-[10px] font-semibold text-muted-foreground">Add block</p>
          {["Text", "Gallery", "CTA"].map((b, i) => (
            <motion.div
              key={b}
              {...item(i + 2)}
              className="mt-1.5 flex items-center gap-1 rounded-md bg-surface px-2 py-1.5 text-[10px] text-ink"
            >
              <Plus className="size-3 text-brand" aria-hidden /> {b}
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ promotions */

export function PromotionsDemo() {
  return (
    <Panel title="Checkout" chip="Code applied">
      <div className="rounded-xl border border-border bg-surface p-3">
        <motion.div
          {...item(0)}
          className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700"
        >
          <span>WELCOME10 applied</span>
          <span>−$3.20</span>
        </motion.div>
        <div className="mt-3 space-y-1.5 text-[11px]">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>$32.00</span>
          </div>
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span>−$3.20</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2 text-ink">
            <span className="font-semibold">Total</span>
            <span className="font-display text-base font-bold">
              <CountUp to={28.8} decimals={2} prefix="$" duration={1} />
            </span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Works across POS, QR and online checkout.
      </p>
    </Panel>
  );
}

/* ------------------------------------------------------------------- campaigns */

export function CampaignsDemo() {
  const stats = [
    { k: "Sent", v: 1240, tone: "bg-brand/30" },
    { k: "Opened", v: 812, tone: "bg-brand/60" },
    { k: "Ordered", v: 143, tone: "bg-brand" },
  ];
  return (
    <Panel title='Campaign · "Weekend 2-for-1"' chip="Sent">
      <div className="space-y-3">
        {stats.map((s, i) => (
          <div key={s.k}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-medium text-ink">{s.k}</span>
              <span className="text-muted-foreground">
                <CountUp to={s.v} separator />
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-subtle">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${[100, 65, 12][i]}%` }}
                viewport={viewport}
                transition={{ delay: i * 0.12, duration: 0.9, ease: EASE }}
                className={cn("h-full rounded-full", s.tone)}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------------- notifications */

export function NotificationsDemo() {
  const notes = [
    { t: "New order · Table 6", tone: "text-brand" },
    { t: "Booking confirmed · 7:30 PM", tone: "text-sky-600" },
    { t: "Delivery assigned · ORD-1041", tone: "text-emerald-600" },
  ];
  return (
    <Panel title="Notifications" chip="3 new">
      <div className="space-y-2">
        {notes.map((n, i) => (
          <motion.div
            key={n.t}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.15, duration: 0.45, ease: EASE }}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5"
          >
            <span className={cn("size-2 rounded-full", "bg-current", n.tone)} aria-hidden />
            <span className="text-[11px] font-medium text-ink">{n.t}</span>
            <span className="ml-auto text-[10px] text-muted-foreground">now</span>
          </motion.div>
        ))}
      </div>
    </Panel>
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
    <Panel title="Cash register" chip="Open">
      <div className="rounded-xl border border-border bg-surface p-3">
        <div className="space-y-2 text-[11px]">
          {rows.map((r, i) => (
            <motion.div key={r.k} {...item(i)} className="flex justify-between">
              <span className="text-muted-foreground">{r.k}</span>
              <span className="font-medium text-ink tabular-nums">{r.v}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
          <span className="text-xs text-muted-foreground">Expected in drawer</span>
          <span className="font-display text-base font-bold text-ink">
            <CountUp to={1280.5} decimals={2} prefix="$" separator duration={1.1} />
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ deliveries */

export function DeliveriesDemo() {
  const jobs = [
    { id: "ORD-1041", who: "Sam", s: "Delivered", tone: "emerald" },
    { id: "ORD-1044", who: "Aisha", s: "On the way", tone: "sky" },
    { id: "ORD-1046", who: "—", s: "Assign", tone: "amber" },
  ];
  const toneMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700",
    sky: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <Panel title="Deliveries" chip="Live">
      <div className="space-y-2">
        {jobs.map((j, i) => (
          <motion.div
            key={j.id}
            {...item(i)}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand-tint text-brand">
                <Truck className="size-3.5" aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-ink">{j.id}</p>
                <p className="text-[10px] text-muted-foreground">Rider: {j.who}</p>
              </div>
            </div>
            <span
              className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", toneMap[j.tone])}
            >
              {j.s}
            </span>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

/* ----------------------------------------------------------------- localization */

export function LocalizationDemo() {
  const langs = ["EN", "ES", "FR", "AR"];
  return (
    <Panel title="Localization" chip="Live rates">
      <div className="flex gap-1.5">
        {langs.map((l, i) => (
          <motion.span
            key={l}
            {...item(i)}
            className={cn(
              "flex-1 rounded-lg border py-1.5 text-center text-[11px] font-semibold",
              i === 0
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-surface text-ink",
            )}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { c: "USD", v: "$12.50" },
          { c: "EUR", v: "€11.40" },
          { c: "PKR", v: "₨3,480" },
        ].map((m, i) => (
          <motion.div
            key={m.c}
            {...item(i + 1)}
            className="rounded-lg border border-border bg-surface p-2 text-center"
          >
            <p className="text-[10px] text-muted-foreground">{m.c}</p>
            <p className="mt-0.5 text-[12px] font-bold text-ink">{m.v}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Same item, converted at today&rsquo;s rate.
      </p>
    </Panel>
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
    <Panel title="Marketplace" chip="Connected">
      <div className="grid grid-cols-2 gap-2">
        {apps.map((a, i) => (
          <motion.div
            key={a.n}
            {...item(i)}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-7 rounded-lg bg-gradient-to-br from-brand-tint to-accent-tint"
                aria-hidden
              />
              <span className="text-[11px] font-medium text-ink">{a.n}</span>
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
    </Panel>
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
    <Panel title="menu.csv" chip="Imported">
      <div className="space-y-1.5 font-mono">
        {rows.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.18, duration: 0.4, ease: EASE }}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2"
          >
            <span className="flex size-4 items-center justify-center rounded bg-emerald-100 text-emerald-600">
              <Check className="size-3" aria-hidden />
            </span>
            <span className="text-[10px] text-ink">{r}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center font-sans text-[10px] text-muted-foreground">
        260 items updated · upsert by id
      </p>
    </Panel>
  );
}

/* --------------------------------------------------------------------- reviews */

export function ReviewsDemo() {
  return (
    <Panel title="Reviews" chip="Moderation">
      <motion.div {...item(0)} className="rounded-xl border border-border bg-surface p-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          ))}
          <span className="ml-1 text-[11px] font-semibold text-ink">Amazing burger!</span>
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          &ldquo;Best in town — cooked perfectly and super fast.&rdquo; — Priya
        </p>
        <div className="mt-3 flex gap-2">
          <motion.span
            {...item(1)}
            className="flex-1 rounded-lg bg-brand py-1.5 text-center text-[11px] font-semibold text-brand-foreground"
          >
            Approve
          </motion.span>
          <span className="flex-1 rounded-lg border border-border py-1.5 text-center text-[11px] font-semibold text-muted-foreground">
            Hide
          </span>
        </div>
      </motion.div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Approved reviews publish to your storefront.
      </p>
    </Panel>
  );
}

/* ---------------------------------------------------------------- realtime sync */

export function RealtimeDemo() {
  const screens = ["POS", "Kitchen", "Guest"];
  return (
    <Panel title="Realtime" chip="In sync">
      <div className="grid grid-cols-3 gap-2">
        {screens.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ delay: i * 0.15, duration: 0.45, ease: EASE }}
            className="rounded-xl border border-border bg-surface p-2.5 text-center"
          >
            <p className="text-[10px] font-semibold text-ink">{s}</p>
            <motion.div
              className="mx-auto mt-2 h-1.5 w-8 rounded-full bg-brand"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
            <p className="mt-2 text-[9px] text-emerald-600">updated</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        One change — every screen reflects it instantly.
      </p>
    </Panel>
  );
}
