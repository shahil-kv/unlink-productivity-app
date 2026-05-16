"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Shield, Clock, Scroll, Target, BarChart3, ArrowRight, Apple, Star } from "lucide-react";

/* ─── Types ─── */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

/* ─── Data ─── */
const stats: StatItem[] = [
  { value: 4, suffix: "h 37m", label: "Average daily screen time" },
  { value: 2617, suffix: "×", label: "Phone checks per day" },
  { value: 11, suffix: " years", label: "Lost to screens in a lifetime" },
];

const features: Feature[] = [
  {
    icon: <Shield size={22} aria-hidden />,
    title: "App Blocking",
    description:
      "Lock any app for a set period. Instagram, TikTok, Reddit — gone until you decide otherwise. No workarounds.",
  },
  {
    icon: <Clock size={22} aria-hidden />,
    title: "Daily Limits",
    description:
      "Set hard daily limits per app or per category. When time is up, Unlink cuts access. No snooze button.",
  },
  {
    icon: <Scroll size={22} aria-hidden />,
    title: "Scroll Lock",
    description:
      "Detects infinite-scroll sessions and freezes them after your threshold. Break the doomscroll reflex.",
  },
  {
    icon: <Target size={22} aria-hidden />,
    title: "Focus Sessions",
    description:
      "Deep work mode blocks everything except what you allow. Phone becomes a tool, not a distraction.",
  },
  {
    icon: <BarChart3 size={22} aria-hidden />,
    title: "Habit Reports",
    description:
      "Weekly brutally-honest reports of where your time actually went. Data that makes you uncomfortable — on purpose.",
  },
  {
    icon: <Shield size={22} aria-hidden />,
    title: "Tamper-Proof",
    description:
      "Unlink cannot be deleted or paused without a cool-down period. Designed to outlast your weakest moment.",
  },
];

const testimonials: Testimonial[] = [
  {
    avatar: "https://i.pravatar.cc/48?img=11",
    name: "Priya S.",
    role: "Product Designer, Mumbai",
    quote:
      "I was at 7 hours a day. Unlink showed me the number and I felt sick. Three weeks later I am at 2. Nothing else worked.",
  },
  {
    avatar: "https://i.pravatar.cc/48?img=32",
    name: "Marcus T.",
    role: "Software Engineer, Berlin",
    quote:
      "I deleted every other screen-time app because I kept bypassing them. Unlink's tamper-proof mode is genuinely the first thing that has stuck.",
  },
  {
    avatar: "https://i.pravatar.cc/48?img=47",
    name: "Leila K.",
    role: "Graduate Student, Toronto",
    quote:
      "The scroll lock feature alone changed my life. I did not realize how many hours I was losing to a reflex. Now I notice when it happens.",
  },
];

const marqueeItems = [
  "Block apps", "Kill the scroll", "Reclaim your time", "Hard limits",
  "No workarounds", "Tamper-proof", "Real data", "Fewer regrets",
  "Block apps", "Kill the scroll", "Reclaim your time", "Hard limits",
  "No workarounds", "Tamper-proof", "Real data", "Fewer regrets",
];

const navLinks = ["Features", "How It Works", "Testimonials"];

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
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(start));
      }
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
        {displayed}
        <span className="text-2xl md:text-3xl">{suffix}</span>
      </div>
      <p className="text-sm text-[#666] uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
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

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setEmailSubmitted(true);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <div className="bg-[var(--brand-bg)] text-[var(--brand-dark)] min-h-screen">

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg)] border-b border-[var(--brand-border)]"
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-[var(--brand-dark)]"
            style={{ fontFamily: "var(--font-display)" }}
            aria-label="Unlink home"
          >
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
            <button
              onClick={() => scrollTo("waitlist")}
              className="hidden sm:inline-flex items-center gap-2 bg-[var(--brand-accent)] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#222] transition-colors duration-200"
              aria-label="Join the waitlist"
            >
              Join Waitlist <ArrowRight size={14} aria-hidden />
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
          <div
            className="md:hidden bg-[var(--brand-bg)] border-t border-[var(--brand-border)] px-5 py-4 flex flex-col gap-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))}
                className="text-left text-sm text-[#444] hover:text-[var(--brand-dark)] transition-colors"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="bg-[var(--brand-accent)] text-white text-sm font-medium px-4 py-2 rounded-full mt-2 text-center"
            >
              Join Waitlist
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="min-h-screen flex flex-col items-center justify-center pt-14 px-5 text-center"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-6 font-medium">
            Digital wellness · App blocking · Habit repair
          </p>
          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight text-[var(--brand-dark)] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            You will check your phone{" "}
            <span className="block">2,617 times</span>
            <span className="block text-[#aaa]">today.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#555] max-w-xl mx-auto mb-10 leading-relaxed">
            Unlink blocks the apps that trap you, enforces limits you cannot wriggle out of,
            and kills the scroll reflex so you can get your attention back.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo("waitlist")}
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-accent)] text-white font-medium px-7 py-3.5 rounded-full hover:bg-[#222] transition-colors duration-200 text-base"
            >
              Get Early Access <ArrowRight size={16} aria-hidden />
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="inline-flex items-center justify-center gap-2 border border-[var(--brand-border)] text-[var(--brand-dark)] font-medium px-7 py-3.5 rounded-full hover:border-[var(--brand-dark)] transition-colors duration-200 text-base"
            >
              See How It Works
            </button>
          </div>
        </div>

        <div className="mt-16 w-full max-w-2xl mx-auto relative">
          <div className="w-full aspect-video bg-[var(--brand-secondary)] rounded-2xl overflow-hidden border border-[var(--brand-border)]">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"
              alt="Person setting down phone to focus"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-transparent to-transparent rounded-2xl" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div
        className="overflow-hidden border-y border-[var(--brand-border)] py-3 bg-[var(--brand-secondary)]"
        aria-hidden="true"
      >
        <div className="flex gap-10 whitespace-nowrap animate-marquee">
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-sm uppercase tracking-widest text-[#555] font-medium flex-shrink-0">
              {item} <span className="text-[var(--brand-border)] mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section
        ref={statsRef}
        className="py-16 border-b border-[var(--brand-border)]"
        aria-label="Screen time statistics"
      >
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[#888] mb-10">
            The numbers you have been avoiding
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-[var(--brand-border)] border border-[var(--brand-border)] rounded-xl overflow-hidden">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} active={statsVisible} />
            ))}
          </div>
          <p className="text-center text-xs text-[#999] mt-4">
            Source: RescueTime Global Report · IDC Research · Dscout
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section
        className="bg-[var(--brand-dark)] text-white py-24 px-5"
        aria-labelledby="problem-heading"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#666] mb-6">The real cost</p>
          <h2
            id="problem-heading"
            className="text-4xl md:text-6xl font-bold leading-tight mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your phone is not the problem.
            <span className="block text-[#666] mt-2">Your habits are.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              {
                label: "Fragmented focus",
                body: "The average person takes 23 minutes to regain focus after a single phone check. You check hundreds of times a day.",
              },
              {
                label: "Sleep erosion",
                body: "Blue light and anxiety loops from late-night scrolling steal 1 to 2 hours of sleep quality every night.",
              },
              {
                label: "Attention sold",
                body: "Every scroll is a vote. Social apps are engineered by teams of PhDs to keep you locked in. You are not fighting a bad habit — you are fighting a billion-dollar machine.",
              },
              {
                label: "Memory gaps",
                body: "Constant distraction impairs long-term memory consolidation. You consume more and retain less every year.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-[#222] rounded-xl p-6 hover:border-[#444] transition-colors duration-200"
              >
                <h3
                  className="text-lg font-semibold mb-2 text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-24 px-5 border-b border-[var(--brand-border)]"
        aria-labelledby="features-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">What Unlink does</p>
            <h2
              id="features-heading"
              className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for the weakest version of you.
            </h2>
            <p className="mt-4 text-[#555] text-base leading-relaxed">
              Willpower is finite. Unlink works when yours runs out.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-[var(--brand-border)] rounded-xl p-6 bg-[var(--brand-surface)] hover:border-[var(--brand-dark)] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-secondary)] flex items-center justify-center mb-4 group-hover:bg-[var(--brand-dark)] group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <h3
                  className="font-semibold text-[var(--brand-dark)] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-24 px-5 bg-[var(--brand-secondary)] border-b border-[var(--brand-border)]"
        aria-labelledby="how-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">How it works</p>
            <h2
              id="how-heading"
              className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three steps. No complexity.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Install and connect",
                body: "Install Unlink and grant screen time permissions. It takes 90 seconds. That is it.",
              },
              {
                step: "02",
                title: "Set your rules",
                body: "Choose which apps to block, set daily time limits, and configure scroll lock thresholds. Use our starter preset if you do not know where to begin.",
              },
              {
                step: "03",
                title: "Let it hold you",
                body: "Unlink enforces your rules even when you want to bend them. Especially then. You will feel the friction. That is the point.",
              },
            ].map((item) => (
              <div key={item.step}>
                <span
                  className="block text-7xl font-bold text-[var(--brand-border)] leading-none mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <h3
                  className="text-xl font-semibold text-[var(--brand-dark)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl overflow-hidden border border-[var(--brand-border)]">
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80"
              alt="Unlink app interface showing blocking settings on a phone"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="py-24 px-5 border-b border-[var(--brand-border)]"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">People who quit the scroll</p>
            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              It works. Here is proof.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="border border-[var(--brand-border)] rounded-xl p-6 bg-[var(--brand-surface)] hover:border-[var(--brand-dark)] transition-colors duration-200"
              >
                <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} size={14} className="fill-[var(--brand-dark)] text-[var(--brand-dark)]" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-[#333] text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-[var(--brand-border)]"
                  />
                  <div>
                    <p className="font-semibold text-sm text-[var(--brand-dark)]">{t.name}</p>
                    <p className="text-xs text-[#888]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD / WAITLIST CTA */}
      <section
        id="waitlist"
        className="py-24 px-5 bg-[var(--brand-dark)] text-white"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#555] mb-6">Early access</p>
          <h2
            id="cta-heading"
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop reading about it.
            <span className="block text-[#555]">Start fixing it.</span>
          </h2>
          <p className="text-[#777] text-base mb-10 max-w-md mx-auto leading-relaxed">
            Join the waitlist. We are rolling out access to people serious about breaking the habit — not just curious about it.
          </p>

          {emailSubmitted ? (
            <div className="border border-[#333] rounded-xl px-8 py-6 inline-block">
              <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                You are on the list.
              </p>
              <p className="text-[#666] text-sm mt-1">We will reach out when your spot opens.</p>
            </div>
          ) : (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
              aria-label="Waitlist signup form"
            >
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 bg-[#111] border border-[#333] text-white text-sm px-4 py-3 rounded-full placeholder:text-[#555] focus:outline-none focus:border-[#666] transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-[var(--brand-dark)] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#ddd] transition-colors duration-200 whitespace-nowrap"
              >
                Get Early Access
              </button>
            </form>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button
              disabled
              aria-label="Download on the App Store (coming soon)"
              className="flex items-center gap-3 border border-[#333] rounded-xl px-5 py-3 opacity-50 cursor-not-allowed"
            >
              <Apple size={22} aria-hidden="true" />
              <div className="text-left">
                <p className="text-[10px] text-[#666] uppercase tracking-wider">Coming soon</p>
                <p className="text-sm font-medium">App Store</p>
              </div>
            </button>
            <button
              disabled
              aria-label="Get it on Google Play (coming soon)"
              className="flex items-center gap-3 border border-[#333] rounded-xl px-5 py-3 opacity-50 cursor-not-allowed"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.18 23.76c.3.17.66.2 1.02.07l12.35-7.13-2.68-2.68-10.69 9.74zm-1.04-20.7A1.5 1.5 0 002 4.3v15.4a1.5 1.5 0 00.14.65l10.8-10.8-10.8-6.49zm19.13 8.44l-2.8-1.62-3.03 3.03 3.03 3.03 2.83-1.64a1.5 1.5 0 000-2.8zM4.2.17C3.84.04 3.48.07 3.18.24L13.87 10.9l2.68-2.68L4.2.17z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-[#666] uppercase tracking-wider">Coming soon</p>
                <p className="text-sm font-medium">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="bg-[var(--brand-dark)] border-t border-[#111] py-12 px-5"
        role="contentinfo"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div>
              <p
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Unlink
              </p>
              <p className="text-[#555] text-sm max-w-xs leading-relaxed">
                Break the scroll. Reclaim your time. Built by people who got their attention back.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
              {["Features", "How It Works", "Testimonials", "Privacy Policy", "Terms of Use", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#555] hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[#444] text-xs">2026 Unlink. All rights reserved.</p>
            <p className="text-[#333] text-xs">Your attention is yours. Reclaim it.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
