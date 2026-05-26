"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu, X, Shield, Clock, Target, BarChart3, ArrowRight, Apple,
  ChevronDown, ChevronUp, Zap, Lock, Eye, Database,
  Smartphone, Brain,
} from "lucide-react";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/CSbgILhOWCOIAL8ld31HLS?mode=gi_t";
const GITHUB_URL = "https://github.com/UnlinkHq/Application";

/* ─── Types ─── */
interface StatItem { value: number; suffix: string; label: string }
interface Feature { icon: React.ReactNode; title: string; description: string; badge?: string }
interface FAQ { q: string; a: string }

/* ─── Data (real, from the actual app) ─── */
const stats: StatItem[] = [
  { value: 4, suffix: "h 37m", label: "Average daily screen time" },
  { value: 2617, suffix: "×", label: "Phone checks per day" },
  { value: 11, suffix: " years", label: "Lost to screens in a lifetime" },
];

const features: Feature[] = [
  {
    icon: <Zap size={22} aria-hidden />,
    title: "Surgical Mode",
    description:
      "Blocks only YouTube Shorts and Instagram Reels — not the whole app. DMs, subscriptions, long videos still work. You kill the addiction loop, not your life.",
    badge: "Unique",
  },
  {
    icon: <Brain size={22} aria-hidden />,
    title: "Intent Gate",
    description:
      "Before Unlink lets you open YouTube or Instagram, it asks why. That one question breaks the reflex. You either have a reason or you close the app. Either way you win.",
    badge: "Unique",
  },
  {
    icon: <BarChart3 size={22} aria-hidden />,
    title: "Brainrot Score",
    description:
      "A live 0–100 score that climbs every time you scroll Reels or Shorts and heals when you stop. Watching it go up is uncomfortable. That is the point.",
  },
  {
    icon: <Shield size={22} aria-hidden />,
    title: "Full App Blocking",
    description:
      "Lock any app completely during a session — Instagram, Reddit, X, YouTube, whatever you pick. No workarounds. No snooze button.",
  },
  {
    icon: <Clock size={22} aria-hidden />,
    title: "Focus Schedules",
    description:
      "Set recurring block windows — Mon–Fri 9am–5pm, every night after 10pm, whenever. Runs automatically whether or not you open Unlink.",
  },
  {
    icon: <Lock size={22} aria-hidden />,
    title: "Mom Test",
    description:
      "Add a trusted contact. When you try to break a committed session early, only they get the unlock code. No willpower needed — accountability is built in.",
  },
  {
    icon: <Target size={22} aria-hidden />,
    title: "Strict Mode",
    description:
      "Once on, Unlink cannot be force-stopped, uninstalled, or paused without your session ending first. Built for the version of you that lies to yourself.",
  },
  {
    icon: <Database size={22} aria-hidden />,
    title: "Zero Login. Zero Cloud.",
    description:
      "No account. No Google sign-in. No server. Your block list, session history, and brainrot score live entirely on your device. Always.",
    badge: "Open Source",
  },
];

const usps = [
  { icon: <Eye size={18} />, label: "Zero Login", sub: "No account required. Ever." },
  { icon: <Database size={18} />, label: "Zero Data Collection", sub: "Nothing leaves your phone." },
  { icon: <GithubIcon size={18} />, label: "Open Source", sub: "Read every line of code." },
  { icon: <Smartphone size={18} />, label: "No Google Account", sub: "Works offline, always." },
  { icon: <Lock size={18} />, label: "On-Device Only", sub: "No cloud. No sync. No ads." },
  { icon: <Zap size={18} />, label: "Surgical, Not Blunt", sub: "Block Reels, not YouTube." },
];

const faqs: FAQ[] = [
  {
    q: "Does Unlink require a Google account or any login?",
    a: "No. Zero login, zero signup, zero cloud account. Everything — your block list, session history, brainrot score — stays on your device. There is no server that knows you exist.",
  },
  {
    q: "Can I bypass Unlink once a session has started?",
    a: "In Strict Mode with Mom Test enabled, only your trusted contact can provide the unlock code. Without it, the session runs until it ends naturally. In normal mode you can turn it off from Settings at any time.",
  },
  {
    q: "Does it block the whole app or just Reels and Shorts?",
    a: "Both modes exist. Surgical Mode blocks only YouTube Shorts and Instagram Reels — you can still use DMs, long videos, and subscriptions. Full blocking locks the entire app for the duration of your session.",
  },
  {
    q: "Will Unlink break my banking app?",
    a: "Some banking apps detect any active Accessibility Service and show a security warning. If yours does, temporarily disable Unlink's accessibility service in Android Settings → Accessibility → Unlink Focus Guard → Off, do your banking, then re-enable it. This is a known limitation of all accessibility-based screen time apps.",
  },
  {
    q: "Is Unlink really open source?",
    a: "Yes. Full source code is on GitHub at github.com/UnlinkHq/Application. You can read exactly what the accessibility service does, verify no data is collected, and contribute if you want.",
  },
  {
    q: "What is the Brainrot Score?",
    a: "A 0–100 daily engagement metric that goes up every time you scroll through Reels or Shorts and slowly heals when you stop. It resets at midnight. It is deliberately uncomfortable to watch rise — that discomfort is the feature.",
  },
  {
    q: "Does blocking survive a phone reboot?",
    a: "Yes. Active sessions and schedules survive reboots by design. If you reboot to escape a session, Unlink picks up exactly where it left off.",
  },
  {
    q: "What is the Intent Gate?",
    a: "When Surgical Mode is on, Unlink intercepts your tap on YouTube or Instagram and asks: 'Why are you opening this?' You choose an answer — DMs only, long videos, specific reason. The act of answering breaks the mindless reflex. If you have no reason, you close the app.",
  },
];

const marqueeItems = [
  "Surgical Reels Blocking", "Intent Gate", "Brainrot Score", "Zero Login",
  "Open Source", "Mom Test", "Focus Schedules", "Strict Mode", "Zero Data", "On-Device",
  "Surgical Reels Blocking", "Intent Gate", "Brainrot Score", "Zero Login",
  "Open Source", "Mom Test", "Focus Schedules", "Strict Mode", "Zero Data", "On-Device",
];

const navLinks = ["Features", "How It Works", "FAQ", "Open Source"];

/* ─── Animated counter ─── */
function AnimatedStat({ value, suffix, label, active }: StatItem & { active: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setDisplayed(value); clearInterval(timer); }
      else setDisplayed(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <div className="text-center px-8 py-6 border-r border-[var(--brand-border)] last:border-r-0">
      <div
        className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
        aria-label={`${value}${suffix}`}
      >
        {displayed}<span className="text-2xl md:text-3xl">{suffix}</span>
      </div>
      <p className="text-sm text-[#666] uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--brand-border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group cursor-pointer"
        aria-expanded={open}
      >
        <span
          className="text-base font-semibold text-[var(--brand-dark)] group-hover:text-[var(--brand-accent)] transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {q}
        </span>
        {open
          ? <ChevronUp size={18} className="flex-shrink-0 text-[#888] mt-0.5" aria-hidden />
          : <ChevronDown size={18} className="flex-shrink-0 text-[#888] mt-0.5" aria-hidden />
        }
      </button>
      {open && (
        <p className="pb-5 text-sm text-[#555] leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ─── Blocking UI Mockup ─── */
function BlockingMockup() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-[#222] shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#444] text-xs uppercase tracking-widest">Unlink Focus Active</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626] opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626] opacity-30" />
          </div>
        </div>
        <div className="mb-4 text-center">
          <div className="text-4xl mb-2">🧠</div>
          <p className="text-[#666] text-xs uppercase tracking-widest">Brain at</p>
          <p className="text-white text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>47% Rot</p>
        </div>
        <div className="bg-[#111] rounded-xl p-4 mb-4 border border-[#1a1a1a]">
          <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Blocked</p>
          <p className="text-white text-sm font-semibold">Instagram</p>
          <p className="text-[#444] text-xs mt-1">Session ends in 2h 14m</p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-xl py-2.5 text-center">
            <span className="text-black text-xs font-bold uppercase tracking-wide">Go Home</span>
          </div>
          <div className="flex-1 border border-[#222] rounded-xl py-2.5 text-center">
            <span className="text-[#555] text-xs uppercase tracking-wide">Break (2 left)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Intent Gate Mockup ─── */
function IntentGateMockup() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-[#222] shadow-2xl">
        <p className="text-[#666] text-xs uppercase tracking-widest mb-1 text-center">Intent Gate</p>
        <h3 className="text-white text-lg font-bold text-center mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Why are you opening<br />YouTube today?
        </h3>
        <div className="space-y-2">
          {["DMs only", "Long videos", "Specific reason", "Full focus — don't open"].map((opt) => (
            <div key={opt} className="border border-[#1a1a1a] rounded-xl px-4 py-3 hover:border-[#333] transition-colors cursor-pointer">
              <span className="text-[#888] text-xs">{opt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── GitHub Icon ─── */
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.35 6.5-1.5 6.5-7.14a5.1 5.1 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.15-3.8s-1.18-.38-3.9 1.4a13.2 13.2 0 0 0-7 0C5.18 2.5 4 2.88 4 2.88a5.3 5.3 0 0 0-.15 3.8A5.1 5.1 0 0 0 2 10.5c0 5.64 3.32 6.79 6.5 7.14a4.8 4.8 0 0 0-1 3.03V22" />
      <path d="M9 20c-5 1.5-5-2.5-7-3" />
    </svg>
  );
}

/* ─── WhatsApp Icon ─── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}


/* ─── Page ─── */
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [email, setEmail] = useState("");
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    setEmailError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setEmailSubmitted(true);
      } else {
        setEmailError("Something went wrong. Try again.");
      }
    } catch {
      setEmailError("No connection. Try again.");
    } finally {
      setEmailLoading(false);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <div className="bg-[var(--brand-bg)] text-[var(--brand-dark)] min-h-screen">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg)] border-b border-[var(--brand-border)]" role="banner">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight text-[var(--brand-dark)]" style={{ fontFamily: "var(--font-display)" }} aria-label="Unlink home">
            Unlink
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))}
                className="text-sm text-[#444] hover:text-[var(--brand-dark)] transition-colors duration-200 cursor-pointer"
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 border border-[var(--brand-border)] text-[var(--brand-dark)] text-sm font-medium px-4 py-1.5 rounded-full hover:border-[var(--brand-dark)] transition-colors duration-200"
              aria-label="View source on GitHub"
            >
              <GithubIcon size={14} aria-hidden /> GitHub
            </a>
            <button
              onClick={() => scrollTo("waitlist")}
              className="hidden sm:inline-flex items-center gap-2 bg-[var(--brand-accent)] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#b91c1c] transition-colors duration-200"
              aria-label="Join the waitlist"
            >
              Get Early Access <ArrowRight size={14} aria-hidden />
            </button>
            <button
              className="md:hidden text-[var(--brand-dark)] p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[var(--brand-bg)] border-t border-[var(--brand-border)] px-5 py-4 flex flex-col gap-4" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))} className="text-left text-sm text-[#444] hover:text-[var(--brand-dark)] transition-colors">
                {link}
              </button>
            ))}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#444]">
              <GithubIcon size={14} /> View Source on GitHub
            </a>
            <button onClick={() => scrollTo("waitlist")} className="bg-[var(--brand-accent)] text-white text-sm font-medium px-4 py-2 rounded-full mt-2 text-center hover:bg-[#b91c1c] transition-colors duration-200">
              Get Early Access
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-5 text-center" aria-labelledby="hero-heading">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-6 font-medium">
            Android · Open Source · Zero Login · No Cloud
          </p>
          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight text-[var(--brand-dark)] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Block Instagram Reels.{" "}
            <span className="block">Not Instagram.</span>
            <span className="block text-[#aaa]">Finally.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#555] max-w-xl mx-auto mb-10 leading-relaxed">
            Unlink surgically blocks Instagram Reels and YouTube Shorts — without touching DMs, search, or the rest of the app.
            No login. No cloud. Open source. Built for Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo("waitlist")}
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-accent)] text-white font-medium px-7 py-3.5 rounded-full hover:bg-[#b91c1c] transition-colors duration-200 text-base"
            >
              Get Early Access <ArrowRight size={16} aria-hidden />
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--brand-border)] text-[var(--brand-dark)] font-medium px-7 py-3.5 rounded-full hover:border-[var(--brand-dark)] transition-colors duration-200 text-base"
            >
              <GithubIcon size={16} aria-hidden /> View Source Code
            </a>
          </div>
        </div>

        <div className="mt-16 w-full max-w-xs mx-auto">
          <Image
            src="/seeyourcount.png"
            alt="Unlink showing live Instagram Reels scroll counter"
            width={360}
            height={640}
            className="rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-[var(--brand-border)] py-3 bg-[var(--brand-secondary)]" aria-hidden="true">
        <div className="flex gap-10 whitespace-nowrap animate-marquee">
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-sm uppercase tracking-widest text-[#555] font-medium flex-shrink-0">
              {item} <span className="text-[var(--brand-border)] mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section ref={statsRef} className="py-16 border-b border-[var(--brand-border)]" aria-label="Screen time statistics">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[#888] mb-10">The numbers you have been avoiding</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-[var(--brand-border)] border border-[var(--brand-border)] rounded-xl overflow-hidden">
            {stats.map((stat) => <AnimatedStat key={stat.label} {...stat} active={statsVisible} />)}
          </div>
          <p className="text-center text-xs text-[#999] mt-4">Source: RescueTime Global Report · IDC Research · Dscout</p>
        </div>
      </section>

      {/* USP BADGES */}
      <section className="py-20 px-5 border-b border-[var(--brand-border)]" aria-labelledby="usp-heading">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">Why Unlink is different</p>
            <h2 id="usp-heading" className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              No login. No cloud.{" "}
              <span className="text-[#aaa]">No bullshit.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {usps.map((u) => (
              <div key={u.label} className="flex items-start gap-4 border border-[var(--brand-border)] rounded-xl p-5 bg-[var(--brand-surface)]">
                <div className="w-9 h-9 rounded-lg bg-[var(--brand-dark)] text-white flex items-center justify-center flex-shrink-0">
                  {u.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[var(--brand-dark)] mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{u.label}</p>
                  <p className="text-xs text-[#888]">{u.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-[var(--brand-dark)] text-white py-24 px-5" aria-labelledby="problem-heading">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#666] mb-6">The real cost</p>
          <h2 id="problem-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-10" style={{ fontFamily: "var(--font-display)" }}>
            Your phone is not the problem.
            <span className="block text-[#666] mt-2">Your habits are.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              { label: "Fragmented focus", body: "The average person takes 23 minutes to regain focus after a single phone check. You check hundreds of times a day." },
              { label: "Sleep erosion", body: "Blue light and anxiety loops from late-night scrolling steal 1 to 2 hours of sleep quality every night." },
              { label: "Attention sold", body: "Every scroll is a vote. Social apps are engineered by teams of PhDs to keep you locked in. You are not fighting a bad habit — you are fighting a billion-dollar machine." },
              { label: "Memory gaps", body: "Constant distraction impairs long-term memory consolidation. You consume more and retain less every year." },
            ].map((item) => (
              <div key={item.label} className="border border-[#222] rounded-xl p-6 hover:border-[#444] transition-colors duration-200">
                <h3 className="text-lg font-semibold mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>{item.label}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-5 border-b border-[var(--brand-border)]" aria-labelledby="features-heading">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">What Unlink does</p>
            <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Built for the weakest version of you.
            </h2>
            <p className="mt-4 text-[#555] text-base leading-relaxed">Willpower is finite. Unlink works when yours runs out.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="border border-[var(--brand-border)] rounded-xl p-6 bg-[var(--brand-surface)] hover:border-[var(--brand-dark)] transition-colors duration-200 group relative">
                {f.badge && (
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest bg-[var(--brand-dark)] text-white px-2 py-0.5 rounded-full">
                    {f.badge}
                  </span>
                )}
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-secondary)] flex items-center justify-center mb-4 group-hover:bg-[var(--brand-dark)] group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-[var(--brand-dark)] mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-5 bg-[var(--brand-secondary)] border-b border-[var(--brand-border)]" aria-labelledby="how-heading">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">How it works</p>
            <h2 id="how-heading" className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Three steps. No complexity.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { step: "01", title: "Install and grant permissions", body: "Install Unlink, grant screen time and accessibility permissions. It takes 90 seconds. No account creation. No Google sign-in. Nothing leaves your phone." },
              { step: "02", title: "Choose what to block", body: "Pick the apps that trap you. Set Surgical Mode to kill only Reels inside YouTube and Instagram while keeping the rest. Or go full block. Add a schedule if you want it automatic." },
              { step: "03", title: "Let it hold you accountable", body: "Unlink enforces your rules even when you want to bend them. The Intent Gate will ask why you are opening an app. Strict Mode makes it tamper-proof. Mom Test adds human accountability." },
            ].map((item) => (
              <div key={item.step}>
                <span className="block text-7xl font-bold text-[var(--brand-border)] leading-none mb-4" style={{ fontFamily: "var(--font-display)" }} aria-hidden="true">{item.step}</span>
                <h3 className="text-xl font-semibold text-[var(--brand-dark)] mb-3" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full max-w-[280px] mx-auto">
              <p className="text-xs uppercase tracking-widest text-[#888] text-center mb-3">Home — Usage Stats</p>
              <Image
                src="/home.jpg"
                alt="Unlink app home screen showing daily usage stats"
                width={320}
                height={580}
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="w-full max-w-[280px] mx-auto">
              <p className="text-xs uppercase tracking-widest text-[#888] text-center mb-3">Streaks — Session History</p>
              <Image
                src="/second.jpg"
                alt="Unlink streaks and session history screen"
                width={320}
                height={580}
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section id="open-source" className="bg-[var(--brand-dark)] text-white py-20 px-5 border-b border-[#111]" aria-labelledby="oss-heading">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#555] mb-4">Transparent by design</p>
              <h2 id="oss-heading" className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
                The entire source<br />code is public.
              </h2>
              <p className="text-[#888] text-base leading-relaxed max-w-md mb-6">
                Every line the Accessibility Service runs is on GitHub. See exactly what is read, what is blocked, and what never leaves your device. No claims — just code.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[var(--brand-dark)] font-semibold px-6 py-3 rounded-full hover:bg-[#ddd] transition-colors text-sm"
                >
                  <GithubIcon size={16} aria-hidden /> View on GitHub
                </a>
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#333] text-[#888] hover:text-white hover:border-[#555] font-medium px-6 py-3 rounded-full transition-colors text-sm"
                >
                  <WhatsAppIcon size={14} /> Join WhatsApp
                </a>
              </div>
            </div>
            <div className="border border-[#1a1a1a] rounded-2xl p-6 bg-[#0a0a0a] min-w-64">
              <p className="text-[#444] text-xs uppercase tracking-widest mb-3">Built by</p>
              <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: "var(--font-display)" }}>Shahil KV</p>
              <p className="text-[#555] text-sm mb-4">Founder, Unlink</p>
              <div className="space-y-2 text-sm">
                <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#666] hover:text-white transition-colors">
                  <span className="text-[#333]">→</span> WhatsApp Community
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#666] hover:text-white transition-colors">
                  <span className="text-[#333]">→</span> GitHub: UnlinkHq
                </a>
                <a href="mailto:mshahilkv@gmail.com" className="flex items-center gap-2 text-[#666] hover:text-white transition-colors">
                  <span className="text-[#333]">→</span> mshahilkv@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-5 border-b border-[var(--brand-border)]" aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">Questions</p>
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Everything you want to know.
            </h2>
          </div>
          <div>
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
          <p className="mt-8 text-sm text-[#888]">
            Still have questions?{" "}
            <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-dark)] underline hover:text-[var(--brand-accent)] transition-colors">
              Ask in the WhatsApp group.
            </a>
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-24 px-5 bg-[var(--brand-dark)] text-white" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#555] mb-6">Early access — Android</p>
          <h2 id="cta-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Stop reading about it.
            <span className="block text-[#555]">Start fixing it.</span>
          </h2>
          <p className="text-[#777] text-base mb-12 max-w-md mx-auto leading-relaxed">
            Pick how you want in. Get notified by email or join the community on WhatsApp.
          </p>

          {/* Two-option cards */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">

            {/* Email option */}
            <div className="border border-[#222] rounded-2xl p-7 bg-[#0a0a0a] flex flex-col">
              <div className="mb-5 text-left">
                <span className="inline-block bg-[#1a1a1a] text-[#888] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4">Waitlist</span>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Get notified by email</h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  Drop your email. When the app is live, we will let you know. No newsletter. No spam.
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                {emailSubmitted ? (
                  <div className="border border-[#1a1a1a] rounded-xl px-5 py-4 bg-[#111]">
                    <p className="text-white font-semibold text-base" style={{ fontFamily: "var(--font-display)" }}>Email submitted.</p>
                    <p className="text-[#555] text-sm mt-1">We will notify you when the app goes live.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3" aria-label="Waitlist signup form">
                    <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[#111] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl placeholder:text-[#444] focus:outline-none focus:border-[#555] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={emailLoading}
                      className="w-full bg-white text-[var(--brand-dark)] text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#e5e5e5] transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {emailLoading ? (
                        <span className="inline-block w-4 h-4 border-2 border-[#aaa] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>Get Early Access <ArrowRight size={14} aria-hidden /></>
                      )}
                    </button>
                    {emailError && <p className="text-red-400 text-xs text-center">{emailError}</p>}
                  </form>
                )}
              </div>
            </div>

            {/* OR divider */}
            <div className="hidden md:flex flex-col items-center justify-center gap-3">
              <div className="w-px flex-1 bg-[#1a1a1a]" />
              <span className="text-[#333] text-xs uppercase tracking-widest font-medium px-1">or</span>
              <div className="w-px flex-1 bg-[#1a1a1a]" />
            </div>
            <div className="flex md:hidden items-center gap-4">
              <div className="flex-1 h-px bg-[#1a1a1a]" />
              <span className="text-[#333] text-xs uppercase tracking-widest font-medium">or</span>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </div>

            {/* WhatsApp option */}
            <div className="border border-[#1a2e1a] rounded-2xl p-7 bg-[#050f05] flex flex-col">
              <div className="mb-5 text-left">
                <span className="inline-flex items-center gap-1.5 bg-[#0d1f0d] text-[#4caf50] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  <WhatsAppIcon size={12} /> Community
                </span>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Join on WhatsApp</h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  Get early access, give feedback, and talk directly with the founder. Real conversations, not broadcasts.
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-3">
                <div className="border border-[#1a2e1a] rounded-xl px-4 py-3 bg-[#0a1a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4caf50]" />
                    <span className="text-[#4caf50] text-[10px] uppercase tracking-widest">Active group</span>
                  </div>
                  <p className="text-[#888] text-xs leading-relaxed">Unlink Early Access · Discuss features, report bugs, get the APK first.</p>
                </div>
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25d366] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#1dba57] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon size={16} /> Join WhatsApp Group
                </a>
              </div>
            </div>
          </div>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            <button disabled aria-label="Download on the App Store (coming soon)" className="flex items-center gap-3 border border-[#1a1a1a] rounded-xl px-5 py-3 opacity-40 cursor-not-allowed">
              <Apple size={22} aria-hidden="true" />
              <div className="text-left">
                <p className="text-[10px] text-[#555] uppercase tracking-wider">Coming soon</p>
                <p className="text-sm font-medium">App Store</p>
              </div>
            </button>
            <button disabled aria-label="Get it on Google Play (coming soon)" className="flex items-center gap-3 border border-[#1a1a1a] rounded-xl px-5 py-3 opacity-40 cursor-not-allowed">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.18 23.76c.3.17.66.2 1.02.07l12.35-7.13-2.68-2.68-10.69 9.74zm-1.04-20.7A1.5 1.5 0 002 4.3v15.4a1.5 1.5 0 00.14.65l10.8-10.8-10.8-6.49zm19.13 8.44l-2.8-1.62-3.03 3.03 3.03 3.03 2.83-1.64a1.5 1.5 0 000-2.8zM4.2.17C3.84.04 3.48.07 3.18.24L13.87 10.9l2.68-2.68L4.2.17z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-[#555] uppercase tracking-wider">Coming soon</p>
                <p className="text-sm font-medium">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* TUTORIAL */}
      <section className="py-20 px-5 border-b border-[var(--brand-border)]" aria-labelledby="tutorial-heading">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">Setup guide</p>
          <h2
            id="tutorial-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How to block Instagram Reels in 2 minutes.
          </h2>
          <p className="text-[#555] text-base leading-relaxed mb-8 max-w-xl mx-auto">
            A full video tutorial showing exactly how to install Unlink, grant permissions, and set up surgical Instagram Reel blocking will be uploaded soon.
          </p>
          <div className="border border-[var(--brand-border)] rounded-2xl p-8 bg-[var(--brand-secondary)] inline-flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[var(--brand-dark)] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-[var(--brand-dark)] text-sm" style={{ fontFamily: "var(--font-display)" }}>Tutorial dropping soon</p>
              <p className="text-[#888] text-xs mt-0.5">Join the WhatsApp group to get notified first.</p>
            </div>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto bg-[#25d366] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#1dba57] transition-colors flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
            >
              <WhatsAppIcon size={13} /> Join Group
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--brand-dark)] border-t border-[#111] py-12 px-5" role="contentinfo">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div>
              <p className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Unlink</p>
              <p className="text-[#555] text-sm max-w-xs leading-relaxed mb-4">
                Surgical screen time control for Android. No login. No cloud. Open source.
              </p>
              <div className="flex gap-3 items-center">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-white transition-colors" aria-label="GitHub">
                  <GithubIcon size={18} />
                </a>
                <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-[#25d366] transition-colors" aria-label="WhatsApp Community">
                  <WhatsAppIcon size={18} />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "FAQ", href: "#faq" },
                { label: "Open Source", href: "https://github.com/UnlinkHq/Application" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "WhatsApp", href: WHATSAPP_GROUP_URL },
              ].map(({ label, href }) => (
                href.startsWith("http") || href.startsWith("https") ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors duration-200">
                    {label}
                  </a>
                ) : (
                  <Link key={label} href={href} className="text-[#555] hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[#444] text-xs">© {new Date().getFullYear()} Unlink. Built by Shahil KV.</p>
            <p className="text-[#333] text-xs">Your attention is yours. Reclaim it.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
