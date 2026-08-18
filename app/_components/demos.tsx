"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ChefHat, MapPin, ScanLine, Truck, Utensils } from "lucide-react";

import { cn } from "@/lib/utils";
import { CountUp } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-60px" } as const;

/** Shared frame so every demo shares one product look. */
function Frame({
  title,
  chip,
  children,
  className,
}: {
  title: string;
  chip?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-surface/80 p-3 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur",
        className,
      )}
    >
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

/* ------------------------------------------------------------------ Hero: live orders */

export function HeroDemo() {
  const rows = [
    { n: "ORD-1042", t: "Table 6 · Dine-in", s: "Preparing", tone: "amber" },
    { n: "ORD-1041", t: "Online · Delivery", s: "Out for delivery", tone: "sky" },
    { n: "ORD-1040", t: "Table 2 · Dine-in", s: "Served", tone: "emerald" },
  ];
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Frame title="Live orders" chip="Open">
        <div className="space-y-2">
          {rows.map((o, i) => (
            <motion.div
              key={o.n}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.18, duration: 0.5, ease: EASE }}
              className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{o.n}</p>
                <p className="text-xs text-muted-foreground">{o.t}</p>
              </div>
              <StatusPill tone={o.tone}>{o.s}</StatusPill>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { k: "Today", el: <CountUp to={4280} prefix="$" separator /> },
            { k: "Orders", el: <CountUp to={138} /> },
            { k: "Avg time", el: <CountUp to={11} suffix="m" /> },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-border bg-surface p-3">
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
              <p className="mt-0.5 font-display text-lg font-bold text-ink">{s.el}</p>
            </div>
          ))}
        </div>
      </Frame>
    </motion.div>
  );
}

function StatusPill({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    amber: "bg-amber-50 text-amber-700",
    sky: "bg-sky-50 text-sky-700",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", map[tone] ?? map.amber)}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------------- POS */

export function PosDemo() {
  const items = [
    "Margherita",
    "Truffle Fries",
    "Cold Brew",
    "Tiramisù",
    "Caesar Salad",
    "Lemonade",
  ];
  const cart = [
    { name: "Margherita", qty: 1, price: 12.5 },
    { name: "Truffle Fries", qty: 2, price: 6.0 },
    { name: "Cold Brew", qty: 1, price: 4.5 },
  ];
  return (
    <Frame title="Point of sale" chip="Table 6">
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 grid grid-cols-2 gap-2">
          {items.map((it, i) => (
            <motion.button
              key={it}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
              className={cn(
                "flex flex-col items-start rounded-xl border p-2.5 text-left transition-colors",
                i === 0
                  ? "border-brand/40 bg-brand-tint"
                  : "border-border bg-surface hover:border-brand/30",
              )}
            >
              <span className="flex size-6 items-center justify-center rounded-md bg-subtle text-muted-foreground">
                <Utensils className="size-3.5" aria-hidden />
              </span>
              <span className="mt-1.5 text-[11px] font-medium leading-tight text-ink">{it}</span>
            </motion.button>
          ))}
        </div>
        <div className="col-span-2 rounded-xl border border-border bg-surface p-3">
          <p className="text-xs font-semibold text-ink">Order · Table 6</p>
          <div className="mt-2 space-y-1.5">
            {cart.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="text-muted-foreground">
                  {c.qty}× {c.name}
                </span>
                <span className="font-medium text-ink">${(c.qty * c.price).toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="font-display text-base font-bold text-ink">
              <CountUp to={29} decimals={2} prefix="$" duration={1} />
            </span>
          </div>
          <div className="mt-2 rounded-lg bg-brand py-1.5 text-center text-[11px] font-semibold text-brand-foreground">
            Send to kitchen
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------------- KDS */

export function KdsDemo() {
  const cols = [
    { h: "New", tone: "sky", tickets: [{ t: "#1042", d: "2× Burger" }] },
    {
      h: "Cooking",
      tone: "amber",
      tickets: [
        { t: "#1041", d: "Pasta, Salad" },
        { t: "#1039", d: "3× Wings" },
      ],
    },
    { h: "Ready", tone: "emerald", tickets: [{ t: "#1038", d: "Pizza ×2" }] },
  ];
  return (
    <Frame title="Kitchen display" chip="Live">
      <div className="grid grid-cols-3 gap-2">
        {cols.map((col, ci) => (
          <div key={col.h} className="rounded-xl bg-surface p-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink">{col.h}</span>
              <StatusPill tone={col.tone}>{col.tickets.length}</StatusPill>
            </div>
            <div className="space-y-1.5">
              {col.tickets.map((tk, ti) => (
                <motion.div
                  key={tk.t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: ci * 0.2 + ti * 0.12, duration: 0.4, ease: EASE }}
                  className="rounded-lg border border-border bg-subtle p-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ink">{tk.t}</span>
                    <ChefHat className="size-3 text-muted-foreground" aria-hidden />
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{tk.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ QR dine-in (phone) */

export function QrDemo() {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto w-[220px]">
      <div className="rounded-[2.2rem] border-[6px] border-ink bg-ink p-1.5 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.5)]">
        <div className="overflow-hidden rounded-[1.7rem] bg-surface">
          {/* status bar */}
          <div className="flex items-center justify-between bg-brand px-4 py-2 text-brand-foreground">
            <span className="text-[11px] font-semibold">Table 6</span>
            <ScanLine className="size-3.5" aria-hidden />
          </div>
          <div className="relative p-3">
            {/* scan sweep */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-3 top-3 h-8 rounded-lg bg-gradient-to-b from-brand/20 to-transparent"
                animate={{ y: [0, 150, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <p className="text-[11px] font-semibold text-ink">Menu</p>
            <div className="mt-2 space-y-1.5">
              {["Margherita — $12.50", "Truffle Fries — $6.00", "Cold Brew — $4.50"].map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                  className="flex items-center gap-2 rounded-lg border border-border bg-subtle px-2 py-1.5"
                >
                  <span className="size-6 rounded-md bg-brand-tint" aria-hidden />
                  <span className="text-[10px] font-medium text-ink">{m}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-[11px] font-semibold text-white"
            >
              <Check className="size-3.5" aria-hidden /> Sent to kitchen
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Online storefront */

export function StorefrontDemo() {
  const steps = [
    { icon: Check, label: "Placed", done: true },
    { icon: ChefHat, label: "Preparing", done: true },
    { icon: Truck, label: "On the way", done: false },
    { icon: MapPin, label: "Delivered", done: false },
  ];
  return (
    <Frame title="yourbrand.tabletap.app" chip="Live">
      <div className="grid grid-cols-2 gap-2">
        {["Signature Burger", "Loaded Fries", "Iced Latte", "Cheesecake"].map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-xl border border-border bg-surface p-2"
          >
            <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-brand-tint to-accent-tint" />
            <p className="mt-1.5 text-[11px] font-semibold text-ink">{p}</p>
            <p className="text-[10px] text-muted-foreground">Add to bag</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-border bg-surface p-3">
        <p className="text-[11px] font-semibold text-ink">Order tracking</p>
        <div className="mt-3 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewport}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.4, ease: EASE }}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full",
                    s.done ? "bg-brand text-brand-foreground" : "bg-subtle text-muted-foreground",
                  )}
                >
                  <s.icon className="size-3.5" aria-hidden />
                </motion.span>
                <span className="text-[9px] font-medium text-muted-foreground">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewport}
                  transition={{ delay: 0.4 + i * 0.2, duration: 0.3 }}
                  style={{ originX: 0 }}
                  className={cn(
                    "mx-1 h-0.5 flex-1 rounded-full",
                    steps[i + 1].done ? "bg-brand" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ----------------------------------------------------------- Reservations & events */

export function ReservationDemo() {
  const slots = ["6:00", "6:30", "7:00", "7:30", "8:00", "8:30"];
  return (
    <Frame title="Reservations" chip="12 today">
      <div className="flex gap-2">
        {["Thu 14", "Fri 15", "Sat 16", "Sun 17"].map((d, i) => (
          <motion.div
            key={d}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className={cn(
              "flex-1 rounded-lg border px-2 py-1.5 text-center text-[10px] font-medium",
              i === 2
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-surface text-muted-foreground",
            )}
          >
            {d}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {slots.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ delay: 0.25 + i * 0.06, duration: 0.35, ease: EASE }}
            className={cn(
              "rounded-lg border py-2 text-center text-[11px] font-semibold",
              i === 2
                ? "border-brand/50 bg-brand-tint text-brand"
                : "border-border bg-surface text-ink",
            )}
          >
            {s} PM
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700"
      >
        <Check className="size-3.5" aria-hidden /> Table for 4 booked · deposit paid
      </motion.div>
    </Frame>
  );
}

/* -------------------------------------------------------------------- Analytics */

export function AnalyticsDemo() {
  const bars = [40, 62, 48, 78, 92, 70, 100];
  return (
    <Frame title="Analytics" chip="Real-time">
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "Revenue", el: <CountUp to={12840} prefix="$" separator /> },
          { k: "Orders", el: <CountUp to={412} /> },
          { k: "Avg check", el: <CountUp to={31} prefix="$" /> },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-border bg-surface p-2.5">
            <p className="text-[10px] text-muted-foreground">{s.k}</p>
            <p className="mt-0.5 font-display text-sm font-bold text-ink">{s.el}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-28 items-end gap-2 rounded-xl border border-border bg-surface p-3">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={viewport}
            transition={{ delay: i * 0.07, duration: 0.7, ease: EASE }}
            className={cn(
              "flex-1 rounded-t-md",
              i === bars.length - 1 ? "bg-brand" : "bg-brand/30",
            )}
          />
        ))}
      </div>
    </Frame>
  );
}

/* --------------------------------------------------------- Roles & permissions matrix */

export function RolesMatrixDemo() {
  const modules = ["POS", "Kitchen", "Reports", "Settings"];
  // grid[module][role] — Owner, Manager, Chef, Waiter
  const grid = [
    [true, true, false, true],
    [true, true, true, false],
    [true, true, false, false],
    [true, false, false, false],
  ];
  const roles = ["Owner", "Mgr", "Chef", "Waiter"];
  return (
    <Frame title="Roles & permissions" chip="Enforced">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center border-b border-border bg-subtle px-3 py-2 text-[10px] font-semibold text-muted-foreground">
          <span>Module</span>
          {roles.map((r) => (
            <span key={r} className="text-center">
              {r}
            </span>
          ))}
        </div>
        {modules.map((m, mi) => (
          <div
            key={m}
            className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center px-3 py-2 text-[11px] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
          >
            <span className="font-medium text-ink">{m}</span>
            {grid[mi].map((on, ri) => (
              <span key={ri} className="flex justify-center">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewport}
                  transition={{ delay: mi * 0.08 + ri * 0.05, duration: 0.3, ease: EASE }}
                  className={cn(
                    "flex size-5 items-center justify-center rounded-md",
                    on ? "bg-brand text-brand-foreground" : "bg-subtle text-transparent",
                  )}
                >
                  <Check className="size-3" aria-hidden />
                </motion.span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Toggle a module — the sidebar, pages and API update instantly.
      </p>
    </Frame>
  );
}
