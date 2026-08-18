import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { Reveal } from "../_components/motion";
import { ContactForm } from "../_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us — TableTap",
  description:
    "Talk to the TableTap team about your restaurant — sales, onboarding or support. We reply within one business day.",
};

const DETAILS = [
  { icon: Mail, label: "Email", value: "hello@tabletap.app", href: "mailto:hello@tabletap.app" },
  { icon: Phone, label: "Phone", value: "+1 (555) 010-2040", href: "tel:+15550102040" },
  { icon: MapPin, label: "Office", value: "128 Market Street, Suite 400" },
  { icon: Clock, label: "Hours", value: "Mon–Fri · 9am–6pm" },
];

export default function ContactPage() {
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
              <Sparkles className="size-3.5 text-brand" aria-hidden /> Contact us
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl">
              Let&rsquo;s talk about your restaurant
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Whether you&rsquo;re sizing up a switch, onboarding a group, or just have a question —
              we&rsquo;re happy to help. Drop us a line and we&rsquo;ll reply within one business
              day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* form + details */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-xl font-bold text-ink">Other ways to reach us</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer email or a call? Here&rsquo;s where to find us.
            </p>
            <ul className="mt-6 space-y-4">
              {DETAILS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-[15px] font-medium text-ink hover:text-brand">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[15px] font-medium text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-subtle p-5">
              <p className="text-sm font-semibold text-ink">Already a customer?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in and reach support right from your dashboard for the fastest help.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
