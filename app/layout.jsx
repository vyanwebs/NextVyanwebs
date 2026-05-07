import "@/index.css";
import { Montserrat } from "next/font/google";
import RootProviders from "@/RootProvider";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import ScrollToTopInstant from "@/components/ScrolltoTopinstant";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  // — Basic —
  title: {
    default: "Vyanwebs | Web & Mobile App Development Agency",
    template: "%s | Vyanwebs",
  },
  description:
    "Vyanwebs is a full-service web and mobile app development agency specializing in MERN Stack, Next.js, React Native, UI/UX Design, Cloud & DevOps, and AI/ML solutions.",
  keywords: [
    "web development agency",
    "mobile app development",
    "Next.js development",
    "React development",
    "MERN stack",
    "UI UX design",
    "software development company",
    "Vyanwebs",
  ],
  authors: [{ name: "Vyanwebs", url: "https://vyanwebs.com" }],
  creator: "Vyanwebs",
  publisher: "Vyanwebs",

  // — Canonical URL —
  metadataBase: new URL("https://vyanwebs.com"),
  alternates: {
    canonical: "/",
  },

  // — Open Graph (Facebook, LinkedIn, WhatsApp) —
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vyanwebs.com",
    siteName: "Vyanwebs",
    title: "Vyanwebs | Web & Mobile App Development Agency",
    description:
      "Full-service web and mobile app development agency. We build high-performance websites, apps, and software using modern technologies.",
    images: [
      {
        url: "/og-image.jpg", // create a 1200x630 image and put in /public
        width: 1200,
        height: 630,
        alt: "Vyanwebs - Web Development Agency",
      },
    ],
  },

  // — Twitter Card —
  twitter: {
    card: "summary_large_image",
    title: "Vyanwebs | Web & Mobile App Development Agency",
    description:
      "Full-service web and mobile app development agency specializing in MERN Stack, Next.js, React Native, and AI/ML solutions.",
    images: ["/og-image.jpg"],
    creator: "@vyanwebs",
  },

  // — Icons —
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // — Robots —
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // — Verification (add yours from Google Search Console) —
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <RootProviders>
          <Navbar />
          <ScrollToTopInstant />
          {children}
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}