import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Unlink's privacy policy. No login, no cloud, no data collection. Read exactly what the accessibility service accesses and why.",
  alternates: { canonical: "https://getunlink.com/privacy" },
};

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: `Unlink is a digital wellbeing app built on one principle: your data stays on your device. We do not sell data, run ads, or upload your behaviour to any server. This policy explains exactly what we access, why, and what we never do.`,
  },
  {
    id: "accessibility",
    title: "1. Accessibility Service",
    body: `Unlink uses Android's Accessibility Service API. This is the only technically viable way to reliably detect the foreground app in real time on Android — enabling instant blocking without a 1–2 second gap that would make the blocker easy to bypass.

What the service reads:
• The package name of the app currently on screen (e.g. com.instagram.android)
• In Surgical Mode only: whether specific UI elements inside YouTube or Instagram are visible, identified by their resource ID (e.g. com.google.android.youtube:id/reel_recycler). This tells us if you are in Shorts or Reels — not what you are watching.

What the service never reads:
• Passwords, PINs, or payment card numbers
• Messages, emails, or notifications
• Browser history or URLs
• Keystrokes or clipboard contents
• Any content from banking or financial apps

Where this data goes: Nowhere. All Accessibility Service processing happens locally on your device. No accessibility data is transmitted to any server, including ours.

How to disable it: Android Settings → Accessibility → Installed Services → Unlink Focus Guard → Off. Disabling it pauses app blocking.`,
  },
  {
    id: "usage-stats",
    title: "2. App Usage Statistics",
    body: `We request access to Android's Usage Stats API (PACKAGE_USAGE_STATS) to:
• Show you how much time you have spent in each app today
• Calculate your daily Brainrot Score — an engagement metric for Shorts and Reels
• Display your focus session history

This data is stored locally on your device and never uploaded.`,
  },
  {
    id: "overlay",
    title: "3. Display Over Other Apps",
    body: `This permission (SYSTEM_ALERT_WINDOW) allows Unlink to draw the blocking overlay screen above other apps when a focus session is active. We use it exclusively to show our own blocking UI — we do not use it to read or interact with any other app's content.`,
  },
  {
    id: "device-admin",
    title: "4. Device Administrator (Optional)",
    body: `If you enable Strict Mode, Unlink asks you to grant Device Administrator permission. This is used for one purpose only: to prevent Unlink from being uninstalled while a focus session you started is active.

• This permission is entirely optional
• You grant it explicitly via a system dialog
• It is automatically released when your focus session ends
• We do not use it to wipe data, change your lock screen password, or monitor your device

Revoke it at any time: Android Settings → Security → Device Admin Apps → Unlink → Deactivate.`,
  },
  {
    id: "camera",
    title: "5. Camera (Optional)",
    body: `The camera permission is used only if you select QR Code as your strictness mode. A QR code is generated at the start of your session and you must scan it to end early. The camera is never accessed outside of this specific flow.`,
  },
  {
    id: "email",
    title: "6. Email Address (Mom Test Feature Only)",
    body: `The Mom Test feature lets you nominate a trusted contact who receives a one-time verification code when you request to end a locked session early.

• You provide the email address voluntarily when setting up this feature
• The email address is stored locally on your device only
• When you request early termination, the address and a one-time code are sent to our email proxy (hosted on Vercel) which forwards it via Resend.com and immediately discards the data
• We do not store your trusted contact's email on any server

Resend.com's privacy policy applies to email delivery: resend.com/privacy

If you do not use the Mom Test feature, no email data is ever collected or transmitted.`,
  },
  {
    id: "internet",
    title: "7. Internet Permission",
    body: `The app uses internet access only to send verification emails via the Mom Test feature described above. No other network requests are made from the app. We do not use the internet permission for analytics, advertising, crash reporting, or background data upload.`,
  },
  {
    id: "local-data",
    title: "8. Data Stored Locally",
    body: `The following is stored on your device in local storage. None of it is uploaded.

• Block list (app package names) — your chosen apps to block
• Focus session history — your past sessions
• Brainrot score and scroll count — daily engagement metric
• Schedule configurations — your recurring focus schedules
• Break settings and counts — managing breaks within a session
• Session state — maintaining blocking across reboots
• Trusted contact email — Mom Test only, stored locally`,
  },
  {
    id: "not-collected",
    title: "9. Data We Do Not Collect",
    body: `• No analytics or crash reports
• No Firebase, Mixpanel, Amplitude, or any analytics SDK
• No user accounts or user database
• No device identifiers (IMEI, advertising ID)
• No location data`,
  },
  {
    id: "third-party",
    title: "10. Third-Party Services",
    body: `The only third-party service Unlink communicates with is Resend.com, and only when the Mom Test feature sends a verification email. Resend acts as an email delivery provider. The email is sent and Resend does not retain the content beyond delivery.

Resend's privacy policy: resend.com/privacy`,
  },
  {
    id: "banking",
    title: "11. Note on Banking Apps",
    body: `Some banking and financial apps detect when any Accessibility Service is active and show a security warning or refuse to open. This is a security policy enforced by those apps — not a data collection practice by Unlink. If your banking app is affected, temporarily disable Unlink's accessibility service in Android Settings → Accessibility → Unlink Focus Guard → Off, complete your banking, then re-enable it.`,
  },
  {
    id: "children",
    title: "12. Children's Privacy",
    body: `Unlink is not directed at children under 13. We do not knowingly collect personal information from children. If you believe your child has provided information through this app, contact us and we will delete it.`,
  },
  {
    id: "deletion",
    title: "13. Data Deletion",
    body: `Because all data is stored locally, you can delete it at any time by clearing app data in Android Settings → Apps → Unlink → Storage → Clear Data, or by uninstalling the app.

For any data that passed through our email proxy (Mom Test emails), contact mshahilkv@gmail.com and we will confirm deletion from any logs within 30 days.`,
  },
  {
    id: "changes",
    title: "14. Changes to This Policy",
    body: `We will update the Effective Date at the top of this page when changes are made. Significant changes will be notified in-app.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--brand-bg)] text-[var(--brand-dark)] min-h-screen">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg)] border-b border-[var(--brand-border)]">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-[var(--brand-dark)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Unlink
          </Link>
          <Link
            href="/"
            className="text-sm text-[#666] hover:text-[var(--brand-dark)] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-24 px-5 max-w-2xl mx-auto">
        {/* Header */}
        <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-4">Legal</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-[#888] mb-2">Effective Date: 26 May 2025</p>
        <p className="text-sm text-[#888] mb-12">
          App: Unlink — Focus & Screen Time · Developer: Shahil KV ·{" "}
          <a href="mailto:mshahilkv@gmail.com" className="underline">
            mshahilkv@gmail.com
          </a>
        </p>

        {/* Callout */}
        <div className="border border-[var(--brand-dark)] rounded-xl p-5 mb-14 bg-[var(--brand-secondary)]">
          <p className="text-sm leading-relaxed text-[var(--brand-dark)]">
            <strong>Short version:</strong> Unlink requires no login and collects no personal data. Everything — your block list, session history, usage stats — stays on your device. The only time any data leaves your device is when you use the optional Mom Test feature, which sends a one-time code to a trusted contact via email.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2
                className="text-xl font-bold text-[var(--brand-dark)] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h2>
              <div className="text-sm text-[#444] leading-relaxed whitespace-pre-line">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 pt-8 border-t border-[var(--brand-border)]">
          <h2
            className="text-xl font-bold text-[var(--brand-dark)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            15. Contact
          </h2>
          <p className="text-sm text-[#444] leading-relaxed">
            <strong>Shahil KV</strong>
            <br />
            <a href="mailto:mshahilkv@gmail.com" className="underline hover:text-[var(--brand-dark)]">
              mshahilkv@gmail.com
            </a>
            <br />
            <a href="https://chat.whatsapp.com/CSbgILhOWCOIAL8ld31HLS?mode=gi_t" className="underline hover:text-[var(--brand-dark)]" target="_blank" rel="noopener noreferrer">
              WhatsApp Community
            </a>
            <br />
            <a href="https://getunlink.com" className="underline hover:text-[var(--brand-dark)]">
              getunlink.com
            </a>
          </p>
        </div>
      </main>

      <footer className="bg-[var(--brand-dark)] py-8 px-5 text-center">
        <p className="text-[#444] text-xs">© 2025 Unlink. All rights reserved.</p>
      </footer>
    </div>
  );
}
