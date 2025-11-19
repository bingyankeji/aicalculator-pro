import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import BigNumberCalculator from "@/components/Calculator/BigNumberCalculator";
import {
  getUrl,
  getOgImage,
  getBreadcrumbId,
  getWebAppId,
  getFaqId,
  getHowToId,
  getArticleId,
  getStepUrl
} from '@/config/site';

export const metadata: Metadata = {
  title: "Big Number Calculator - Arbitrary Precision Calculator | AICalculator",
  description: "Free big number calculator for arbitrary precision arithmetic. Calculate with numbers of any size without precision loss. Supports addition, multiplication, power, factorial, and more.",
  keywords: [
    "big number calculator",
    "large number calculator",
    "arbitrary precision calculator",
    "bigint calculator",
    "factorial calculator",
    "large integer calculator",
    "precision calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Big Number Calculator",
    description: "Calculate with numbers of any size using arbitrary precision arithmetic.",
    type: "website",
    url: getUrl('/big-number-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [{ url: getOgImage('bignum'), width: 1200, height: 630, alt: 'Big Number Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Number Calculator",
    description: "Arbitrary precision calculator for big numbers.",
    images: [getOgImage('bignum')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: { canonical: getUrl('/big-number-calculator') },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { 'last-modified': new Date().toISOString() },
};

export default function BigNumberCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebApplication",
      "@id": getWebAppId('/big-number-calculator'),
      "name": "Big Number Calculator",
      "url": getUrl('/big-number-calculator'),
      "description": "Calculate with arbitrarily large numbers using BigInt precision.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "Arbitrary precision arithmetic",
        "Addition, subtraction, multiplication, division",
        "Power and factorial operations",
        "GCD and LCM calculations",
        "Scientific notation display",
        "Number properties analysis"
      ]
    }, {
      "@type": "BreadcrumbList",
      "@id": getBreadcrumbId('/big-number-calculator'),
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": getUrl('/') },
        { "@type": "ListItem", "position": 2, "name": "Math Calculators", "item": getUrl('/category/math') },
        { "@type": "ListItem", "position": 3, "name": "Big Number Calculator", "item": getUrl('/big-number-calculator') }
      ]
    }, {
      "@type": "FAQPage",
      "@id": getFaqId('/big-number-calculator'),
      "mainEntity": [{
        "@type": "Question",
        "name": "What is a big number calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A big number calculator handles numbers beyond JavaScript safe integer limit using BigInt for arbitrary precision. It can calculate with millions of digits without precision loss, essential for cryptography, combinatorics, and scientific computing."
        }
      }]
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <h1 className="sr-only">Big Number Calculator - Arbitrary Precision Arithmetic</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Big Number Calculator"
        calculatorUrl="/big-number-calculator"
      />

      <BigNumberCalculator />
    </div>
  );
}

