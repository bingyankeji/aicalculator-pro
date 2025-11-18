import { Metadata } from "next";
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
      
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/math" itemProp="item" className="hover:text-blue-600 transition-colors"><span itemProp="name">Math</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Big Number Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <BigNumberCalculator />
    </div>
  );
}

