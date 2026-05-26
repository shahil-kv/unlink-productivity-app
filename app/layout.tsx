import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const META = {
  title: "Unlink — Block Reels, Not Your Whole Life | Android App Blocker",
  description:
    "Unlink surgically blocks YouTube Shorts and Instagram Reels without killing the whole app. No login. No cloud. Open source. Built for people serious about reclaiming their attention on Android.",
  url: "https://getunlink.com",
  image: "https://getunlink.com/og-image.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: {
    default: META.title,
    template: "%s | Unlink",
  },
  description: META.description,
  keywords: [
    "unlink app",
    "unlink screen time",
    "android app blocker",
    "block youtube shorts android",
    "block instagram reels android",
    "screen time app android",
    "phone addiction app",
    "digital wellbeing android",
    "focus app android",
    "open source screen time android",
    "app blocker no login",
    "surgical reels blocker",
    "shahil kv",
    "unlink productivity app",
    "stop doom scrolling android",
    "reduce screen time android",
  ],
  authors: [{ name: "Shahil KV", url: "https://github.com/UnlinkHq" }],
  creator: "Shahil KV",
  publisher: "Unlink",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: META.url },
  openGraph: {
    type: "website",
    url: META.url,
    siteName: "Unlink",
    title: META.title,
    description: META.description,
    images: [{ url: META.image, width: 1200, height: 630, alt: "Unlink — Block Reels, Reclaim Your Time" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@getunlink",
    creator: "@shahilkv",
    title: META.title,
    description: META.description,
    images: [META.image],
  },
  category: "productivity",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${META.url}/#org`,
      name: "Unlink",
      url: META.url,
      logo: { "@type": "ImageObject", url: `${META.url}/logo.png` },
      founder: {
        "@type": "Person",
        name: "Shahil KV",
        url: "https://github.com/UnlinkHq",
      },
      sameAs: ["https://github.com/UnlinkHq/Application"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${META.url}/#app`,
      name: "Unlink",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Android",
      description: META.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${META.url}/#org` },
      url: META.url,
      featureList: [
        "Surgical Reels & Shorts blocking inside YouTube and Instagram",
        "Intent Gate — asks your intention before opening distracting apps",
        "Brainrot Score — live engagement metric for Shorts/Reels",
        "Full app blocking with configurable sessions",
        "Focus schedules — recurring block windows",
        "Mom Test — trusted contact accountability",
        "Strict Mode — tamper-proof sessions",
        "Zero login, zero cloud, fully on-device",
        "Open source",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${META.url}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Does Unlink require a Google account or any login?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Unlink requires zero login, zero signup, and zero cloud account. Everything stays on your device. There is no server that knows you exist.",
          },
        },
        {
          "@type": "Question",
          name: "Can I bypass Unlink once a session has started?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In Strict Mode with Mom Test enabled, only your trusted contact can provide the unlock code. Without that code, the session runs until it ends. In normal mode, you can disable it from Settings.",
          },
        },
        {
          "@type": "Question",
          name: "Does Unlink block the whole app or just Reels and Shorts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both modes exist. Surgical Mode blocks only YouTube Shorts and Instagram Reels — you can still use the rest of the app (DMs, subscriptions, long videos). Full blocking locks the entire app during a session.",
          },
        },
        {
          "@type": "Question",
          name: "Will Unlink break my banking app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Some banking apps detect any active Accessibility Service and show a security warning. If yours does, temporarily disable Unlink's accessibility service in Android Settings → Accessibility → Unlink Focus Guard → Off, do your banking, then re-enable it.",
          },
        },
        {
          "@type": "Question",
          name: "Is Unlink open source?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The full source code is on GitHub at github.com/UnlinkHq/Application. You can read every line of what the accessibility service does — no hidden data collection, no trackers.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
