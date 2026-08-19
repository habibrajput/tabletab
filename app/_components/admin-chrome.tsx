"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bell,
  CalendarCheck,
  ChevronDown,
  LayoutDashboard,
  MonitorCheck,
  MonitorPlay,
  ReceiptText,
  Settings,
  ShoppingBag,
  Table2,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
export const viewport = { once: true, margin: "-60px" } as const;

/** The real admin sidebar's sections/items, trimmed to an icon rail for the demo. */
const NAV: { section: string; items: { name: string; icon: LucideIcon }[] }[] = [
  {
    section: "Operations",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "Reservations", icon: CalendarCheck },
      { name: "Tables", icon: Table2 },
    ],
  },
  {
    section: "POS & Orders",
    items: [
      { name: "POS", icon: ShoppingBag },
      { name: "Orders", icon: ReceiptText },
      { name: "K.D.S", icon: MonitorPlay },
      { name: "O.S.S", icon: MonitorCheck },
    ],
  },
  {
    section: "Finance",
    items: [
      { name: "Reports", icon: BarChart3 },
      { name: "Register", icon: Wallet },
    ],
  },
  {
    section: "Management",
    items: [
      { name: "Menu", icon: UtensilsCrossed },
      { name: "Settings", icon: Settings },
    ],
  },
];

/**
 * A faithful miniature of the real tabletab admin: an icon-rail sidebar (grouped
 * like the live nav) + a topbar with the branch switcher and account, wrapping
 * the actual screen for each feature. `active` highlights the current nav item.
 */
export function AdminChrome({
  active,
  title,
  children,
}: {
  active: string;
  title: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: EASE }}
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_-24px_rgba(15,23,42,0.4)]"
    >
      <div className="flex h-[24rem]">
        {/* Sidebar (icon rail) */}
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-subtle/70 py-2.5">
          <span className="mb-1 flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <UtensilsCrossed className="size-4" aria-hidden />
          </span>
          {NAV.map((group) => (
            <div key={group.section} className="flex flex-col items-center gap-0.5 py-0.5">
              {group.items.map((it) => {
                const on = it.name === active;
                return (
                  <span
                    key={it.name}
                    title={it.name}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg transition-colors",
                      on ? "bg-brand-tint text-brand" : "text-muted-foreground/70 hover:text-ink",
                    )}
                  >
                    <it.icon className="size-4" aria-hidden />
                  </span>
                );
              })}
              <span className="my-0.5 h-px w-5 bg-border" aria-hidden />
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
            <span className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1 text-[11px] font-medium text-ink">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              River Side Inn
              <ChevronDown className="size-3 text-muted-foreground" aria-hidden />
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex size-7 items-center justify-center rounded-lg text-muted-foreground">
                <Bell className="size-4" aria-hidden />
                <span
                  className="absolute right-1 top-1 size-1.5 rounded-full bg-brand"
                  aria-hidden
                />
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-white">
                OO
              </span>
            </div>
          </div>

          {/* Screen */}
          <div className="min-h-0 flex-1 overflow-hidden bg-subtle/40 p-3">
            <p className="mb-2 font-display text-sm font-bold text-ink">{title}</p>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const EASE_OUT = EASE;
export { motion };
