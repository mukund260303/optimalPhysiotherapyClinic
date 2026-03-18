import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopInfoBar from "@/components/TopInfoBar";
import FloatingButtons from "@/components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optimal Physiotherapy | Best Physiotherapy Clinic in Lalghati Bhopal",
  description:
    "Optimal Physiotherapy Clinic in Lalghati Bhopal — Expert physiotherapy for back pain, spine, sports injury, stroke rehabilitation, neuro care & women's health by Dr. Pavan Patidar (PT) & Dr. Ravina Patidar (PT).",
  keywords: [
    "physiotherapy bhopal",
    "physiotherapist lalghati bhopal",
    "best physiotherapy clinic bhopal",
    "back pain treatment bhopal",
    "sports injury physiotherapy bhopal",
    "neuro rehabilitation bhopal",
    "stroke rehabilitation bhopal",
    "spine treatment bhopal",
    "Dr Pavan Patidar physiotherapist",
    "women health physiotherapy bhopal",
    "optimal physiotherapy lalghati",
  ],
  authors: [{ name: "Dr. Pavan Patidar (PT)" }],
  creator: "Optimal Physiotherapy",
  publisher: "Optimal Physiotherapy",
  metadataBase: new URL("https://clinik-optimal.vercel.app"),
  alternates: {
    canonical: "https://clinik-optimal.vercel.app",
  },
  openGraph: {
    title: "Optimal Physiotherapy | Best Clinic in Lalghati Bhopal",
    description:
      "Advanced physiotherapy for spine, sports injury, neuro rehabilitation & women's health in Lalghati, Bhopal.",
    url: "https://clinik-optimal.vercel.app",
    siteName: "Optimal Physiotherapy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Optimal Physiotherapy Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimal Physiotherapy | Best Clinic in Lalghati Bhopal",
    description:
      "Expert physiotherapy for back pain, sports injury, stroke & neuro rehabilitation in Bhopal.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://clinik-optimal.vercel.app",
  name: "Optimal Physiotherapy",
  alternateName: "Optimal Physiotherapy & Rehabilitation Centre",
  description:
    "Advanced physiotherapy clinic in Lalghati Bhopal providing expert care for spine pain, sports injuries, stroke rehabilitation, neuro care and women's health physiotherapy.",
  url: "https://clinik-optimal.vercel.app",
  telephone: "+919329579550",
  image: "https://clinik-optimal.vercel.app/logo.png",
  logo: "https://clinik-optimal.vercel.app/logo.png",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lalghati Crossroads",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    postalCode: "462030",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.2599,
    longitude: 77.4126,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "17:00",
      closes: "20:30",
    },
  ],
  medicalSpecialty: [
    "Physiotherapy",
    "Sports Rehabilitation",
    "Neuro Rehabilitation",
    "Orthopedic Rehabilitation",
    "Women's Health Physiotherapy",
  ],
  hasMap: "https://maps.google.com/?q=Optimal+Physiotherapy+Lalghati+Bhopal",
  sameAs: [
    "https://www.instagram.com/drpavanpatidar",
    "https://www.facebook.com/profile.php?id=100064107486462",
    "https://www.youtube.com/@optimalphysiotherapy9860",
  ],
  employee: [
    {
      "@type": "Person",
      name: "Dr. Pavan Patidar",
      jobTitle: "Senior Physiotherapist",
      description: "MPT (Orthopaedic) — Expert in spine, knee, shoulder & sports injury. 12+ years experience.",
    },
    {
      "@type": "Person",
      name: "Dr. Ravina Patidar",
      jobTitle: "Senior Physiotherapist",
      description: "MPT (Neuro) — Expert in stroke, neuropathy & women's health. 8+ years experience.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-white`}
      >
        <TopInfoBar />
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
