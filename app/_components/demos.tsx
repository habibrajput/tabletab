"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ChefHat, Clock, MapPin, ScanLine, Truck, Utensils } from "lucide-react";

import { cn } from "@/lib/utils";
import { CountUp } from "./motion";
import { AdminChrome, viewport } from "./admin-chrome";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { delay: i * 0.08, duration: 0.45, ease: EASE },
});

function StatusPill({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    amber: "bg-amber-100 text-amber-700",
    sky: "bg-sky-100 text-sky-700",
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
    rose: "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold", map[tone] ?? map.amber)}
    >
      {children}
    </span>
  );
}

/* ============================================================ Dashboard (hero) */

export function HeroDemo() {
  const stats = [
    { k: "Today's sales", el: <CountUp to={4280} prefix="$" separator /> },
    { k: "Orders", el: <CountUp to={138} /> },
    { k: "Avg. time", el: <CountUp to={11} suffix="m" /> },
  ];
  const bars = [44, 62, 50, 78, 66, 90, 72];
  const orders = [
    { n: "ORD-1042", t: "Table 6 · Dine-in", s: "Preparing", tone: "violet" },
    { n: "ORD-1041", t: "Online · Delivery", s: "On the way", tone: "sky" },
    { n: "ORD-1040", t: "Table 2 · Dine-in", s: "Served", tone: "emerald" },
  ];
  return (
    <AdminChrome active="Dashboard" title="Dashboard">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <motion.div
            key={s.k}
            {...rise(i)}
            className="rounded-lg border border-border bg-surface p-2"
          >
            <p className="text-[9px] text-muted-foreground">{s.k}</p>
            <p className="mt-0.5 font-display text-[13px] font-bold text-ink">{s.el}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-5 gap-2">
        <motion.div
          {...rise(3)}
          className="col-span-2 flex h-24 items-end gap-1 rounded-lg border border-border bg-surface p-2"
        >
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={viewport}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: EASE }}
              className={cn("flex-1 rounded-t", i === bars.length - 1 ? "bg-brand" : "bg-brand/30")}
            />
          ))}
        </motion.div>
        <div className="col-span-3 space-y-1.5">
          {orders.map((o, i) => (
            <motion.div
              key={o.n}
              {...rise(4 + i)}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-2 py-1.5"
            >
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-ink">{o.n}</p>
                <p className="truncate text-[9px] text-muted-foreground">{o.t}</p>
              </div>
              <StatusPill tone={o.tone}>{o.s}</StatusPill>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminChrome>
  );
}

/* ============================================================ Point of sale */

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
    <AdminChrome active="POS" title="Point of Sale · Table 6">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3 grid grid-cols-3 gap-1.5">
          {items.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: i * 0.05, duration: 0.35, ease: EASE }}
              className={cn(
                "flex flex-col gap-1 rounded-lg border p-1.5",
                i === 0 ? "border-brand/40 bg-brand-tint" : "border-border bg-surface",
              )}
            >
              <span className="aspect-square rounded bg-gradient-to-br from-brand-tint to-accent-tint" />
              <span className="truncate text-[9px] font-medium text-ink">{it}</span>
            </motion.div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col rounded-lg border border-border bg-surface p-2">
          <p className="text-[10px] font-semibold text-ink">Order · Table 6</p>
          <div className="mt-1.5 flex-1 space-y-1">
            {cart.map((c, i) => (
              <motion.div key={c.name} {...rise(i + 1)} className="flex justify-between text-[9px]">
                <span className="truncate text-muted-foreground">
                  {c.qty}× {c.name}
                </span>
                <span className="font-medium text-ink">${(c.qty * c.price).toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-between border-t border-border pt-1.5">
            <span className="text-[9px] text-muted-foreground">Total</span>
            <span className="font-display text-[13px] font-bold text-ink">
              <CountUp to={29} decimals={2} prefix="$" duration={1} />
            </span>
          </div>
          <div className="mt-1.5 rounded-md bg-brand py-1 text-center text-[9px] font-semibold text-brand-foreground">
            Send to kitchen
          </div>
        </div>
      </div>
    </AdminChrome>
  );
}

/* ============================================================ Kitchen display (KDS) */

export function KdsDemo() {
  const columns = [
    {
      head: "Placed",
      tone: "amber",
      bar: "bg-amber-500",
      border: "border-l-amber-400",
      tickets: [{ n: "#1042", d: "2× Burger · Fries", t: "0:45" }],
    },
    {
      head: "Confirmed",
      tone: "sky",
      bar: "bg-sky-500",
      border: "border-l-sky-400",
      tickets: [{ n: "#1041", d: "Pasta, Salad", t: "2:10" }],
    },
    {
      head: "Preparing",
      tone: "violet",
      bar: "bg-violet-500",
      border: "border-l-violet-400",
      tickets: [
        { n: "#1039", d: "3× Wings", t: "4:20" },
        { n: "#1038", d: "Pizza ×2", t: "6:02" },
      ],
    },
    {
      head: "Ready",
      tone: "emerald",
      bar: "bg-emerald-500",
      border: "border-l-emerald-400",
      tickets: [{ n: "#1037", d: "Nachos", t: "0:12" }],
    },
  ];
  return (
    <AdminChrome active="K.D.S" title="Kitchen Display">
      <div className="grid grid-cols-4 gap-1.5">
        {columns.map((col, ci) => (
          <div key={col.head} className="min-w-0">
            <div
              className={cn(
                "mb-1.5 flex items-center justify-between rounded-md px-1.5 py-1 text-white",
                col.bar,
              )}
            >
              <span className="truncate text-[9px] font-bold">{col.head}</span>
              <span className="rounded-full bg-white/25 px-1 text-[9px] font-bold tabular-nums">
                {col.tickets.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {col.tickets.map((tk, ti) => (
                <motion.div
                  key={tk.n}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: ci * 0.12 + ti * 0.1, duration: 0.4, ease: EASE }}
                  className={cn(
                    "rounded-lg border border-l-4 border-border bg-surface p-1.5 shadow-[var(--shadow-card)]",
                    col.border,
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-ink">{tk.n}</span>
                    <span className="flex items-center gap-0.5 text-[8px] text-muted-foreground">
                      <Clock className="size-2.5" aria-hidden /> {tk.t}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[9px] leading-tight text-muted-foreground">{tk.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden /> Live ·
        tickets sync the instant an order is placed
      </p>
    </AdminChrome>
  );
}

/* ============================================================ Reports / analytics */

export function AnalyticsDemo() {
  const bars = [40, 62, 48, 78, 92, 70, 100];
  const top = [
    { n: "Signature Burger", v: "$1,240" },
    { n: "Truffle Fries", v: "$860" },
    { n: "Cold Brew", v: "$540" },
  ];
  return (
    <AdminChrome active="Reports" title="Reports">
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "Revenue", el: <CountUp to={12840} prefix="$" separator /> },
          { k: "Orders", el: <CountUp to={412} /> },
          { k: "Avg check", el: <CountUp to={31} prefix="$" /> },
        ].map((s, i) => (
          <motion.div
            key={s.k}
            {...rise(i)}
            className="rounded-lg border border-border bg-surface p-2"
          >
            <p className="text-[9px] text-muted-foreground">{s.k}</p>
            <p className="mt-0.5 font-display text-[13px] font-bold text-ink">{s.el}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-5 gap-2">
        <div className="col-span-3 flex h-24 items-end gap-1.5 rounded-lg border border-border bg-surface p-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={viewport}
              transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
              className={cn("flex-1 rounded-t", i === bars.length - 1 ? "bg-brand" : "bg-brand/30")}
            />
          ))}
        </div>
        <div className="col-span-2 rounded-lg border border-border bg-surface p-2">
          <p className="text-[9px] font-semibold text-ink">Top items</p>
          <div className="mt-1.5 space-y-1">
            {top.map((t, i) => (
              <motion.div key={t.n} {...rise(i + 2)} className="flex justify-between text-[9px]">
                <span className="truncate text-muted-foreground">{t.n}</span>
                <span className="font-medium text-ink">{t.v}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AdminChrome>
  );
}

/* ============================================================ Reservations */

export function ReservationDemo() {
  const rows = [
    { t: "6:30 PM", who: "Priya · 4", table: "T6", s: "Confirmed", tone: "emerald" },
    { t: "7:00 PM", who: "James · 2", table: "T2", s: "Deposit paid", tone: "sky" },
    { t: "7:30 PM", who: "Aisha · 6", table: "T9", s: "Requested", tone: "amber" },
  ];
  return (
    <AdminChrome active="Reservations" title="Reservations">
      <div className="mb-2 flex gap-1.5">
        {["Thu 14", "Fri 15", "Sat 16", "Sun 17"].map((d, i) => (
          <motion.span
            key={d}
            {...rise(i)}
            className={cn(
              "flex-1 rounded-md border py-1 text-center text-[9px] font-medium",
              i === 2
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-surface text-muted-foreground",
            )}
          >
            {d}
          </motion.span>
        ))}
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.t}
            {...rise(i + 1)}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-12 text-[10px] font-semibold tabular-nums text-ink">{r.t}</span>
              <span className="text-[9px] text-muted-foreground">{r.who}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-subtle px-1 text-[9px] font-medium text-ink">
                {r.table}
              </span>
              <StatusPill tone={r.tone}>{r.s}</StatusPill>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminChrome>
  );
}

/* ============================================================ Roles & permissions */

export function RolesMatrixDemo() {
  const modules = ["POS", "Kitchen", "Reports", "Settings"];
  const roles = ["Owner", "Mgr", "Chef", "Waiter"];
  const grid = [
    [true, true, false, true],
    [true, true, true, false],
    [true, true, false, false],
    [true, false, false, false],
  ];
  return (
    <AdminChrome active="Settings" title="Settings · Roles & Permissions">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center border-b border-border bg-subtle px-2 py-1.5 text-[9px] font-semibold text-muted-foreground">
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
            className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center px-2 py-1.5 text-[10px] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
          >
            <span className="font-medium text-ink">{m}</span>
            {grid[mi].map((on, ri) => (
              <span key={ri} className="flex justify-center">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewport}
                  transition={{ delay: mi * 0.07 + ri * 0.05, duration: 0.3, ease: EASE }}
                  className={cn(
                    "flex size-4 items-center justify-center rounded",
                    on ? "bg-brand text-brand-foreground" : "bg-subtle text-transparent",
                  )}
                >
                  <Check className="size-2.5" aria-hidden />
                </motion.span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[9px] text-muted-foreground">
        Toggle a module — the sidebar, pages and API update instantly.
      </p>
    </AdminChrome>
  );
}

/* ============================================================ QR dine-in (phone) */

export function QrDemo() {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto w-[230px]">
      <div className="rounded-[2.2rem] border-[6px] border-ink bg-ink p-1.5 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.5)]">
        <div className="overflow-hidden rounded-[1.7rem] bg-surface">
          <div className="flex items-center justify-between bg-brand px-4 py-2 text-brand-foreground">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold">
              <Utensils className="size-3.5" aria-hidden /> Renala Branch · Table 6
            </span>
            <ScanLine className="size-3.5" aria-hidden />
          </div>
          <div className="relative p-3">
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-3 top-3 h-10 rounded-lg bg-gradient-to-b from-brand/25 to-transparent"
                animate={{ y: [0, 170, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div className="flex gap-1.5">
              {["All", "Starters", "Mains", "Drinks"].map((c, i) => (
                <span
                  key={c}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[9px] font-medium",
                    i === 0 ? "bg-brand text-brand-foreground" : "bg-subtle text-muted-foreground",
                  )}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                { n: "Margherita", p: "$12.50" },
                { n: "Truffle Fries", p: "$6.00" },
                { n: "Cold Brew", p: "$4.50" },
              ].map((m, i) => (
                <motion.div
                  key={m.n}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.2 + i * 0.14, duration: 0.4 }}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface p-1.5"
                >
                  <span className="size-8 shrink-0 rounded-md bg-gradient-to-br from-brand-tint to-accent-tint" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10px] font-semibold text-ink">{m.n}</span>
                    <span className="block text-[9px] text-muted-foreground">{m.p}</span>
                  </span>
                  <span className="flex size-5 items-center justify-center rounded-md bg-brand text-brand-foreground">
                    <Check className="size-3" aria-hidden />
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-[11px] font-semibold text-white"
            >
              <Check className="size-3.5" aria-hidden /> Sent to kitchen
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ Online storefront (browser) */

export function StorefrontDemo() {
  const steps = [
    { icon: Check, label: "Placed", done: true },
    { icon: ChefHat, label: "Preparing", done: true },
    { icon: Truck, label: "On the way", done: false },
    { icon: MapPin, label: "Delivered", done: false },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface p-2 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)]">
      {/* browser chrome */}
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <span className="size-2 rounded-full bg-rose-300" />
        <span className="size-2 rounded-full bg-amber-300" />
        <span className="size-2 rounded-full bg-emerald-300" />
        <span className="ml-2 flex-1 truncate rounded-md bg-subtle px-2 py-0.5 text-[9px] text-muted-foreground">
          yourbrand.tabletap.app
        </span>
      </div>
      <div className="rounded-xl border border-border bg-subtle/50 p-2.5">
        <div className="grid grid-cols-2 gap-2">
          {["Signature Burger", "Loaded Fries", "Iced Latte", "Cheesecake"].map((p, i) => (
            <motion.div
              key={p}
              {...rise(i)}
              className="rounded-lg border border-border bg-surface p-1.5"
            >
              <div className="aspect-[16/9] rounded bg-gradient-to-br from-brand-tint to-accent-tint" />
              <p className="mt-1 text-[10px] font-semibold text-ink">{p}</p>
              <p className="text-[9px] text-muted-foreground">Add to bag</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 rounded-lg border border-border bg-surface p-2">
          <p className="text-[10px] font-semibold text-ink">Order tracking</p>
          <div className="mt-2 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={viewport}
                    transition={{ delay: 0.3 + i * 0.18, duration: 0.4, ease: EASE }}
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full",
                      s.done ? "bg-brand text-brand-foreground" : "bg-subtle text-muted-foreground",
                    )}
                  >
                    <s.icon className="size-3" aria-hidden />
                  </motion.span>
                  <span className="text-[8px] font-medium text-muted-foreground">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <span
                    className={cn(
                      "mx-0.5 h-0.5 flex-1 rounded-full",
                      steps[i + 1].done ? "bg-brand" : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
