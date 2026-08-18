import {
  BarChart3,
  Bell,
  CalendarCheck,
  Clock,
  CreditCard,
  Gauge,
  Globe,
  Languages,
  LayoutTemplate,
  MapPin,
  Megaphone,
  MonitorPlay,
  Palette,
  Percent,
  Plug,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Split,
  Star,
  Tag,
  Truck,
  Upload,
  Users,
  Wallet,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

import {
  AnalyticsDemo,
  KdsDemo,
  PosDemo,
  QrDemo,
  ReservationDemo,
  RolesMatrixDemo,
  StorefrontDemo,
} from "./demos";
import {
  CampaignsDemo,
  CashRegisterDemo,
  DeliveriesDemo,
  IntegrationsDemo,
  LocalizationDemo,
  MenuIoDemo,
  MultiBranchDemo,
  NotificationsDemo,
  PromotionsDemo,
  RealtimeDemo,
  ReviewsDemo,
  WebsiteBuilderDemo,
} from "./demos-more";

export interface FeatureBenefit {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface Feature {
  slug: string;
  name: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  tagline: string;
  card: string;
  Demo: React.ComponentType;
  points: string[];
  benefits: FeatureBenefit[];
  /** "core" features get top billing; "more" fill the secondary grid. */
  tier?: "core" | "more";
}

export const FEATURES: Feature[] = [
  {
    slug: "pos",
    name: "Point of Sale",
    icon: MonitorPlay,
    eyebrow: "Front of house",
    title: "A point of sale your staff actually enjoy",
    tagline:
      "Tap to build an order, split or merge tables, take payment and fire straight to the kitchen — on the tablets you already own.",
    card: "Fast, tablet-friendly POS for dine-in, pickup and delivery.",
    Demo: PosDemo,
    points: [
      "Dine-in, pickup & delivery in one screen",
      "Split bills and part-payments",
      "Keeps selling offline",
    ],
    benefits: [
      {
        icon: Split,
        title: "Split & merge tables",
        body: "Move items between tables, split a bill any way, and take part-payments without leaving the order.",
      },
      {
        icon: WifiOff,
        title: "Offline-first",
        body: "The internet drops, the tills keep ringing. Orders queue locally and sync the moment you're back online.",
      },
      {
        icon: CreditCard,
        title: "Any payment",
        body: "Cash, card, or pay-later — record every tender and reconcile it against the cash register at close.",
      },
    ],
  },
  {
    slug: "kitchen-display",
    name: "Kitchen Display",
    icon: ScanLine,
    eyebrow: "Back of house",
    title: "A kitchen display that keeps the line in sync",
    tagline:
      "Every ticket lands on the KDS the instant it's placed. Bump items as they're plated and the floor, the guest and the POS all update live.",
    card: "Real-time ticket board for the kitchen line.",
    Demo: KdsDemo,
    points: ["New → cooking → ready columns", "Per-item timings & alerts", "One board per station"],
    benefits: [
      {
        icon: RefreshCw,
        title: "Live everywhere",
        body: "Bump a ticket and the waiter's screen, the guest's phone and the POS all reflect it in real time.",
      },
      {
        icon: Clock,
        title: "Timings that matter",
        body: "See how long each ticket has been on the pass, with colour cues before anything gets cold.",
      },
      {
        icon: MonitorPlay,
        title: "Per-station boards",
        body: "Grill, cold, bar — give each station its own filtered view so cooks only see what's theirs.",
      },
    ],
  },
  {
    slug: "qr-ordering",
    name: "QR Dine-in",
    icon: Smartphone,
    eyebrow: "Contactless dine-in",
    title: "Guests scan, order and pay from their phone",
    tagline:
      "Print a QR per table. Guests browse your live menu, order rounds and pay — no app, no waiting — and it all flows straight to the kitchen.",
    card: "Table QR ordering with no app to install.",
    Demo: QrDemo,
    points: [
      "No app install for guests",
      "Live menu & sold-out sync",
      "Rounds routed to the right table",
    ],
    benefits: [
      {
        icon: ScanLine,
        title: "Scan to table",
        body: "Each QR is bound to a table, so every round is attributed to the right seat automatically.",
      },
      {
        icon: RefreshCw,
        title: "Always current",
        body: "Prices, photos and sold-out flags mirror your live menu the second you change them.",
      },
      {
        icon: Users,
        title: "Turn tables faster",
        body: "Guests order and pay whenever they're ready — fewer trips for staff, shorter waits for tables.",
      },
    ],
  },
  {
    slug: "online-store",
    name: "Online Storefront",
    icon: ShoppingBag,
    eyebrow: "Online ordering",
    title: "Your own branded storefront for delivery & pickup",
    tagline:
      "A fast, mobile-first ordering site with your menu, hours and delivery zones — plus live order tracking your customers can watch.",
    card: "A branded ordering website for delivery & pickup.",
    Demo: StorefrontDemo,
    points: ["Delivery, pickup & dine-in", "Live order tracking", "Build pages with no code"],
    benefits: [
      {
        icon: LayoutTemplate,
        title: "Website builder",
        body: "Drag-and-drop blocks to build your pages — hero, menu grid, promos — no developer required.",
      },
      {
        icon: MapPin,
        title: "Your delivery rules",
        body: "Set zones, fees and minimums per branch, so online orders only land where you can serve them.",
      },
      {
        icon: Palette,
        title: "On your brand",
        body: "Your logo, colours, domain and hours — a storefront that looks like you, not a marketplace.",
      },
    ],
  },
  {
    slug: "reservations",
    name: "Reservations & Events",
    icon: CalendarCheck,
    eyebrow: "Bookings",
    title: "Reservations and private events, on one calendar",
    tagline:
      "Take table bookings and deposits, run enquiries for birthdays and weddings, and manage it all next to the floor plan your staff use.",
    card: "Table bookings, deposits and private events.",
    Demo: ReservationDemo,
    points: [
      "Deposits & email confirmations",
      "Event enquiries from your site",
      "Turn-time & party-size rules",
    ],
    benefits: [
      {
        icon: CreditCard,
        title: "Deposits upfront",
        body: "Take a deposit at booking to cut no-shows, with automatic confirmation and reminder emails.",
      },
      {
        icon: CalendarCheck,
        title: "Events pipeline",
        body: "Capture birthday and wedding enquiries from your storefront and manage them to confirmed.",
      },
      {
        icon: Users,
        title: "Smart availability",
        body: "Turn-times and party-size limits keep the book realistic so the floor never gets overbooked.",
      },
    ],
  },
  {
    slug: "analytics",
    name: "Live Analytics",
    icon: BarChart3,
    eyebrow: "Insight",
    title: "Live analytics you can trust",
    tagline:
      "Sales, top items and per-branch performance update in real time — with the numbers your accountant actually asks for, exportable in a click.",
    card: "Real-time sales, top items and per-branch reports.",
    Demo: AnalyticsDemo,
    points: [
      "Real-time sales & top items",
      "Compare branches side by side",
      "Date ranges & CSV export",
    ],
    benefits: [
      {
        icon: BarChart3,
        title: "Numbers as they happen",
        body: "Revenue, orders and average check tick up live — no overnight batch, no stale dashboards.",
      },
      {
        icon: MapPin,
        title: "Branch by branch",
        body: "Rank locations, spot the outlier, and see which site is carrying the group this week.",
      },
      {
        icon: Globe,
        title: "Export anywhere",
        body: "Filter by any date range and export clean CSVs your accountant can drop straight into the books.",
      },
    ],
  },
  {
    slug: "roles-permissions",
    name: "Roles & Permissions",
    icon: ShieldCheck,
    eyebrow: "Security",
    title: "Role-based access, enforced everywhere",
    tagline:
      "Give every role exactly what they need — Owner, managers, chefs, waiters and riders. Permissions govern the menu, the pages and the API alike.",
    card: "Fine-grained access control for every role.",
    Demo: RolesMatrixDemo,
    points: [
      "Per-module View/Add/Edit/Delete",
      "Enforced on frontend & backend",
      "Change it live — no redeploy",
    ],
    benefits: [
      {
        icon: ShieldCheck,
        title: "Real enforcement",
        body: "Permissions gate the sidebar, the pages and the API — not just what's hidden on screen.",
      },
      {
        icon: Users,
        title: "Six focused roles",
        body: "Owner, multi-branch and branch managers, chef, waiter and rider — each with a tailored workspace.",
      },
      {
        icon: Bell,
        title: "Change on the fly",
        body: "Toggle a module and it takes effect immediately across the app — no redeploy, no waiting.",
      },
    ],
  },

  /* ------------------------------------------------------------- more features */

  {
    slug: "multi-branch",
    name: "Multi-branch",
    icon: MapPin,
    tier: "more",
    eyebrow: "Scale",
    title: "Run one site or a whole group",
    tagline:
      "Every branch gets its own menu, stock, staff and reporting — and managers switch between them from the topbar without logging out.",
    card: "Per-branch menu, staff and reports — one login.",
    Demo: MultiBranchDemo,
    points: [
      "Per-branch menu & pricing",
      "Topbar branch switcher",
      "Group-wide or per-site reports",
    ],
    benefits: [
      {
        icon: MapPin,
        title: "Independent branches",
        body: "Each location runs its own menu, hours and stock while sharing one account and one bill.",
      },
      {
        icon: RefreshCw,
        title: "Switch in a tap",
        body: "Multi-branch managers flip between sites from the topbar — the whole app re-scopes instantly.",
      },
      {
        icon: BarChart3,
        title: "Roll it all up",
        body: "Compare every branch side by side, or drill into a single site's numbers.",
      },
    ],
  },
  {
    slug: "website-builder",
    name: "Website builder",
    icon: LayoutTemplate,
    tier: "more",
    eyebrow: "Storefront",
    title: "Build your storefront with drag-and-drop blocks",
    tagline:
      "Assemble pages from ready-made blocks — hero, menu grid, promos, reviews and rich text — and publish in minutes. No code, no agency.",
    card: "Drag-and-drop pages for your storefront — no code.",
    Demo: WebsiteBuilderDemo,
    points: ["Ready-made content blocks", "Live preview as you build", "Publish per page"],
    benefits: [
      {
        icon: LayoutTemplate,
        title: "Block by block",
        body: "Stack hero banners, menu grids, sliders and CTAs — reorder by dragging, tweak in a side panel.",
      },
      {
        icon: Palette,
        title: "On brand",
        body: "Your logo, colours and fonts flow through every block, so the site always looks like you.",
      },
      {
        icon: Tag,
        title: "Live variables",
        body: "Drop in {{business info}} tokens that stay in sync with your settings automatically.",
      },
    ],
  },
  {
    slug: "promotions",
    name: "Promotions",
    icon: Percent,
    tier: "more",
    eyebrow: "Grow sales",
    title: "Discounts and codes that work everywhere",
    tagline:
      "Create percentage or fixed discounts and shareable codes that apply consistently across the POS, QR ordering and online checkout.",
    card: "Discounts & codes across POS, QR and online.",
    Demo: PromotionsDemo,
    points: ["Percentage or fixed discounts", "Shareable promo codes", "One rule, every channel"],
    benefits: [
      {
        icon: Percent,
        title: "Flexible rules",
        body: "Percentage off, money off or code-gated — set the terms once and they apply everywhere you sell.",
      },
      {
        icon: RefreshCw,
        title: "Every channel",
        body: "The same promotion validates at the POS, on the QR menu and in the online basket.",
      },
      {
        icon: BarChart3,
        title: "See the lift",
        body: "Track redemptions so you know which offer actually moved the needle.",
      },
    ],
  },
  {
    slug: "campaigns",
    name: "Campaigns",
    icon: Megaphone,
    tier: "more",
    eyebrow: "Marketing",
    title: "Reach your customers and track what converts",
    tagline:
      "Send targeted messages to your customer base and watch opens and orders roll in — so you know exactly what's working.",
    card: "Targeted messaging with conversion tracking.",
    Demo: CampaignsDemo,
    points: ["Target your customer base", "Templates to start fast", "Opens & orders tracked"],
    benefits: [
      {
        icon: Megaphone,
        title: "Right message",
        body: "Reach the customers you choose with an offer, an update or a nudge to come back.",
      },
      {
        icon: BarChart3,
        title: "Measure it",
        body: "Sent, opened and ordered — see the funnel for every campaign, not just a send count.",
      },
      {
        icon: Percent,
        title: "Pair with promos",
        body: "Attach a promo code and watch redemptions attribute straight back to the campaign.",
      },
    ],
  },
  {
    slug: "notifications",
    name: "Notifications",
    icon: Bell,
    tier: "more",
    eyebrow: "Stay ahead",
    title: "Live alerts, tuned to each role",
    tagline:
      "New orders, bookings and delivery hand-offs surface as live in-app notifications — routed to the people who need them, with a priority chime.",
    card: "Live in-app alerts, routed by role.",
    Demo: NotificationsDemo,
    points: ["Real-time in-app inbox", "Fan-out by role", "Priority chime & badges"],
    benefits: [
      {
        icon: Bell,
        title: "Never miss one",
        body: "A new order or booking pops instantly in the bell inbox, with an unread badge on the nav.",
      },
      {
        icon: Users,
        title: "The right people",
        body: "Alerts fan out by role, so the kitchen, the floor and the office each see what's theirs.",
      },
      {
        icon: Gauge,
        title: "Priority-aware",
        body: "Only the alerts that matter chime — the rest wait quietly in the inbox.",
      },
    ],
  },
  {
    slug: "cash-register",
    name: "Cash register",
    icon: Wallet,
    tier: "more",
    eyebrow: "Finance",
    title: "Cash sessions that reconcile themselves",
    tagline:
      "Open a register with a float, record cash in and out through the shift, and close with an expected balance to count against — per branch.",
    card: "Per-branch cash sessions, open to close.",
    Demo: CashRegisterDemo,
    points: ["Opening float & close-out", "Cash in / paid out", "Expected-in-drawer balance"],
    benefits: [
      {
        icon: Wallet,
        title: "Every shift",
        body: "Open with a float, log takings and payouts, and close with a number to count against.",
      },
      {
        icon: MapPin,
        title: "Per branch",
        body: "Each site keeps its own register, so cash is never mixed across locations.",
      },
      {
        icon: BarChart3,
        title: "Ties to reports",
        body: "Sessions feed the finance reports, so cash and card reconcile in one place.",
      },
    ],
  },
  {
    slug: "deliveries",
    name: "Deliveries",
    icon: Truck,
    tier: "more",
    eyebrow: "Last mile",
    title: "Assign riders and track every drop-off",
    tagline:
      "Hand orders to riders, follow them from picked-up to delivered, and settle cash-on-delivery — all from the same board as the kitchen.",
    card: "Rider assignment and drop-off tracking.",
    Demo: DeliveriesDemo,
    points: ["Assign & reassign riders", "Live delivery status", "Cash-on-delivery settle-up"],
    benefits: [
      {
        icon: Truck,
        title: "Who's got it",
        body: "Assign each delivery to a rider and see, at a glance, what's out and what's landed.",
      },
      {
        icon: RefreshCw,
        title: "Live status",
        body: "Picked up, on the way, delivered — the status updates for staff and the customer alike.",
      },
      {
        icon: CreditCard,
        title: "COD handled",
        body: "Riders settle cash-on-delivery back to the register so the books always balance.",
      },
    ],
  },
  {
    slug: "localization",
    name: "Localization",
    icon: Languages,
    tier: "more",
    eyebrow: "Global-ready",
    title: "Every language, every currency",
    tagline:
      "Serve guests in their language and show prices in their currency, converted at live exchange rates — while you still get paid in your base currency.",
    card: "Multi-language UI and per-region currency.",
    Demo: LocalizationDemo,
    points: ["Multi-language interface", "Per-region currency display", "Live FX conversion"],
    benefits: [
      {
        icon: Languages,
        title: "Speak their language",
        body: "The storefront and app adapt to the visitor's language and region automatically.",
      },
      {
        icon: Globe,
        title: "Their currency",
        body: "Prices display in the guest's currency, converted at today's rate from your base.",
      },
      {
        icon: CreditCard,
        title: "You get paid right",
        body: "Display is converted for the guest; orders still charge and settle in your base currency.",
      },
    ],
  },
  {
    slug: "integrations",
    name: "Integrations",
    icon: Plug,
    tier: "more",
    eyebrow: "Connect",
    title: "A marketplace of connectors",
    tagline:
      "Plug in delivery platforms, messaging and accounting from the marketplace — connect or disconnect in a click, no developer required.",
    card: "Connect delivery, messaging & accounting.",
    Demo: IntegrationsDemo,
    points: ["One-click connect", "Delivery, chat & accounting", "Manage per tenant"],
    benefits: [
      {
        icon: Plug,
        title: "Click to connect",
        body: "Browse the connector catalogue and switch an integration on without touching code.",
      },
      {
        icon: RefreshCw,
        title: "Stays in sync",
        body: "Connected services exchange data automatically so you don't re-key anything.",
      },
      {
        icon: ShieldCheck,
        title: "Yours to control",
        body: "Connect or disconnect any integration per account, whenever you like.",
      },
    ],
  },
  {
    slug: "menu-tools",
    name: "Menu import/export",
    icon: Upload,
    tier: "more",
    eyebrow: "Setup",
    title: "Load your whole menu in seconds",
    tagline:
      "Bulk-import your catalogue from a CSV — or export it to edit in a spreadsheet — with upsert-by-id so re-imports update instead of duplicate.",
    card: "Bulk CSV import & export for your catalogue.",
    Demo: MenuIoDemo,
    points: ["CSV import & export", "Upsert by id — no duplicates", "Hundreds of items at once"],
    benefits: [
      {
        icon: Upload,
        title: "Go live fast",
        body: "Drop in a CSV and your whole menu appears — perfect for onboarding or a seasonal refresh.",
      },
      {
        icon: RefreshCw,
        title: "Safe re-imports",
        body: "Items upsert by id, so re-uploading edits your catalogue instead of duplicating it.",
      },
      {
        icon: LayoutTemplate,
        title: "Edit in a sheet",
        body: "Export, adjust prices in bulk in your spreadsheet, and import it straight back.",
      },
    ],
  },
  {
    slug: "reviews",
    name: "Reviews",
    icon: Star,
    tier: "more",
    eyebrow: "Reputation",
    title: "Collect and moderate menu reviews",
    tagline:
      "Guests rate dishes, you approve what publishes — and approved reviews show on your storefront and count toward each item's rating.",
    card: "Item reviews with moderation, live on your site.",
    Demo: ReviewsDemo,
    points: ["Guest ratings & comments", "Approve before it publishes", "Feeds item ratings"],
    benefits: [
      {
        icon: Star,
        title: "Real feedback",
        body: "Guests rate individual dishes, giving you signal on what to push and what to fix.",
      },
      {
        icon: ShieldCheck,
        title: "You moderate",
        body: "Nothing goes live until you approve it — spam and mistakes never reach the storefront.",
      },
      {
        icon: ShoppingBag,
        title: "Sells for you",
        body: "Approved reviews publish to your storefront and lift each item's star rating.",
      },
    ],
  },
  {
    slug: "realtime-sync",
    name: "Realtime sync",
    icon: RefreshCw,
    tier: "more",
    eyebrow: "The magic",
    title: "One change, every screen — instantly",
    tagline:
      "Mark an item sold out, bump a ticket or add a branch, and the POS, the QR menu, the storefront and the kitchen all update live. No refresh.",
    card: "Every screen updates the moment anything changes.",
    Demo: RealtimeDemo,
    points: ["Live across every screen", "Sold-out & price sync", "No refresh, ever"],
    benefits: [
      {
        icon: RefreshCw,
        title: "Always current",
        body: "Change a price or 86 a dish and it vanishes from the POS, QR menu and storefront at once.",
      },
      {
        icon: MonitorPlay,
        title: "Floor & kitchen",
        body: "Order status flows between the POS, the KDS and the guest's phone in real time.",
      },
      {
        icon: Gauge,
        title: "Built to scale",
        body: "A streaming backbone keeps every device in sync without hammering your servers.",
      },
    ],
  },
];

export function getFeature(slug: string): Feature | undefined {
  return FEATURES.find((f) => f.slug === slug);
}
