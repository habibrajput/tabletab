"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Marketing contact form. UI-only: it validates and shows a confirmation state
 * locally — there's no backend endpoint wired up, so nothing is sent anywhere.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // Simulated submit — swap for a real endpoint when one exists.
    setTimeout(() => setStatus("sent"), 700);
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">
          Thanks — we&rsquo;ll be in touch
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&rsquo;ve got your message and someone from the team will get back to you within one
          business day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" required>
          <Input id="name" name="name" required placeholder="Jordan Lee" />
        </Field>
        <Field id="email" label="Email" required>
          <Input id="email" name="email" type="email" required placeholder="you@restaurant.com" />
        </Field>
      </div>
      <div className="mt-4">
        <Field id="restaurant" label="Restaurant name">
          <Input id="restaurant" name="restaurant" placeholder="The Corner Kitchen" />
        </Field>
      </div>
      <div className="mt-4 space-y-1.5">
        <Label htmlFor="message" required>
          How can we help?
        </Label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your restaurant and what you're looking for…"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
        />
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send message
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We&rsquo;ll only use your details to reply — no spam, ever.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
    </div>
  );
}
