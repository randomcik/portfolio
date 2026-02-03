"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

function isValidEmail(email: string) {
  // pragmatic email check (server still validates)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const startedAtRef = useRef<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (should stay empty)
  const [company, setCompany] = useState("");

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const canSubmit = useMemo(() => {
    if (status === "sending") return false;
    if (name.trim().length < 2) return false;
    if (!isValidEmail(email.trim())) return false;
    if (message.trim().length < 10) return false;
    return true;
  }, [status, name, email, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      company: company.trim(),
      startedAt: startedAtRef.current,
    };

    if (!canSubmit) {
      setStatus("error");
      setError("Please fill out all fields correctly.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
      startedAtRef.current = Date.now();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
            Name
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-foreground/85 outline-none backdrop-blur placeholder:text-foreground/35 focus:border-foreground/35"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
            Email
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            className="mt-2 w-full rounded-xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-foreground/85 outline-none backdrop-blur placeholder:text-foreground/35 focus:border-foreground/35"
            placeholder="you@domain.com"
          />
        </label>
      </div>

      {/* Honeypot field (hidden from humans) */}
      <label className="sr-only" aria-hidden="true">
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>

      <label className="block">
        <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
          Message
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-foreground/85 outline-none backdrop-blur placeholder:text-foreground/35 focus:border-foreground/35"
          placeholder="Tell me about your project…"
        />
      </label>

      {status === "sent" ? (
        <div className="rounded-xl border border-foreground/10 bg-background/50 px-4 py-3 text-sm text-foreground/75">
          Message sent. I’ll get back to you soon.
        </div>
      ) : null}

      {status === "error" && error ? (
        <div className="rounded-xl border border-foreground/10 bg-background/50 px-4 py-3 text-sm text-foreground/75">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-full border border-foreground/15 bg-foreground px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-background transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45">
          Email only · no spam
        </div>
      </div>
    </form>
  );
}

