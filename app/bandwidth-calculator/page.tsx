import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BandwidthCalculator from '@/components/Calculator/BandwidthCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Bandwidth Calculator - Data Transfer Speed & Download Time | AICalculator",
  description: "Free bandwidth calculator to convert data units, calculate download times, estimate website bandwidth needs, and convert monthly usage to required speed. Calculate Mbps, GB, and transfer times instantly.",
  keywords: [
    "bandwidth calculator",
    "download time calculator",
    "upload speed calculator",
    "data transfer calculator",
    "internet speed calculator",
    "mbps calculator",
    "data unit converter",
    "bandwidth converter",
    "website bandwidth calculator",
    "hosting bandwidth calculator",
    "data usage calculator",
    "network bandwidth calculator",
    "transfer speed calculator",
    "file download time",
    "bandwidth requirements",
    "data transfer speed",
    "internet bandwidth",
    "network speed calculator",
    "data rate calculator",
    "bandwidth estimation",
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Bandwidth Calculator - Calculate Download Time & Data Transfer",
    description: "Calculate bandwidth, download times, and data usage. Convert data units, estimate website bandwidth needs, and optimize network performance.",
    type: 'website',
    url: getUrl('/bandwidth-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('bandwidth'),
      width: 1200,
      height: 630,
      alt: "Bandwidth Calculator"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bandwidth Calculator - Download Time & Speed Calculator",
    description: "Calculate bandwidth requirements, download times, and data transfer speeds with our comprehensive bandwidth calculator.",
    images: [getOgImage('bandwidth')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/bandwidth-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BandwidthCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/bandwidth-calculator'),
        name: "Bandwidth Calculator",
        url: getUrl('/bandwidth-calculator'),
        description: "Comprehensive bandwidth calculator featuring data unit conversion, download/upload time calculation, website bandwidth estimation, and hosting bandwidth conversion.",
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Data unit converter',
          'Download/upload time calculator',
          'Website bandwidth estimator',
          'Hosting bandwidth converter',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/bandwidth-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Other',
            item: getUrl('/other'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: "Bandwidth Calculator",
            item: getUrl('/bandwidth-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/bandwidth-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: "How do I calculate download time?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "To calculate download time, divide file size by bandwidth speed. Formula: Time (seconds) = File Size (bits) / Bandwidth (bits/second). Example: A 500MB file on 50 Mbps internet: Convert 500MB to bits (500 × 8,000,000 = 4,000,000,000 bits), then divide by 50 Mbps (50 × 1,000,000 = 50,000,000 bps): 4,000,000,000 / 50,000,000 = 80 seconds. Remember that actual speeds are typically 70-90% of advertised speeds.",
            },
          },
          {
            '@type': 'Question',
            name: "What is the difference between Mbps and MBps?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Mbps (megabits per second) and MBps (megabytes per second) differ by a factor of 8. Since 1 byte = 8 bits, 1 MBps = 8 Mbps. Internet speeds are advertised in Mbps, while downloads show MBps. Example: 100 Mbps connection downloads at approximately 12.5 MBps.",
            },
          },
          {
            '@type': 'Question',
            name: "How much bandwidth does my website need?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Website bandwidth depends on page views, page size, and redundancy factor. Formula: Monthly Bandwidth = (Page Views × Page Size × Redundancy). Example: 10,000 daily views, 2MB pages, 2× redundancy = 1,200GB monthly. Small sites need 10-50GB/month, medium sites 100-500GB/month.",
            },
          },
          {
            '@type': 'Question',
            name: "What affects actual bandwidth speed?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Actual bandwidth differs from advertised speed due to: protocol overhead (5-15%), network congestion (20-50% reduction at peak), distance to server, Wi-Fi vs wired (Wi-Fi 30-50% slower), device limitations, and ISP throttling. Expect 70-90% of advertised speeds.",
            },
          },
          {
            '@type': 'Question',
            name: "How do I convert data units?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Data units convert using factors of 1,000. 1 KB = 1,000 bytes, 1 MB = 1,000 KB, 1 GB = 1,000 MB. For bits: 1 byte = 8 bits, so 1 Mbps = 125,000 bytes/sec. Network speeds use bits, storage uses bytes.",
            },
          },
          {
            '@type': 'Question',
            name: "What bandwidth do I need for streaming?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Streaming bandwidth requirements: SD (480p) 3-5 Mbps, HD (720p) 5-8 Mbps, Full HD (1080p) 8-15 Mbps, 4K 25-50 Mbps. Gaming needs 3-10 Mbps with low latency. Video calls require 3-5 Mbps per participant.",
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/bandwidth-calculator'),
        name: "How to Calculate Bandwidth and Download Times",
        description: "Guide to calculating bandwidth requirements and download times.",
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: "Bandwidth Calculator",
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Calculator Type',
            text: 'Choose from four calculator modes: Data Unit Converter, Download/Upload Time Calculator, Website Bandwidth Calculator, or Hosting Bandwidth Converter.',
            url: getStepUrl('/bandwidth-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Data Values',
            text: 'Input your values with appropriate units. For download time, enter file size and bandwidth. For website calculations, enter page views and size.',
            url: getStepUrl('/bandwidth-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Units',
            text: 'Choose correct units from dropdown menus. Data units include MB, GB, TB. Bandwidth units include Mbps, Gbps.',
            url: getStepUrl('/bandwidth-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Optional Parameters',
            text: 'Adjust optional settings like redundancy factor for accurate estimates.',
            url: getStepUrl('/bandwidth-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Results',
            text: 'Click Calculate to process your inputs and view detailed results.',
            url: getStepUrl('/bandwidth-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Interpret Results',
            text: 'Review calculated results including transfer times, bandwidth requirements, and recommendations.',
            url: getStepUrl('/bandwidth-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/bandwidth-calculator'),
        headline: "Complete Guide to Bandwidth Calculation",
        description: "Learn bandwidth calculation, download times, and network optimization.",
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-19',
        image: getOgImage('bandwidth'),
        articleBody: "Learn how to calculate bandwidth requirements, download times, and data transfer speeds.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Bandwidth Calculator - Data Transfer Speed & Download Time</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Bandwidth Calculator"
        calculatorUrl="/bandwidth-calculator"
      />

      {/* Calculator Component */}
      <BandwidthCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Bandwidth and Data Transfer</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate bandwidth requirements, download times, and data transfer speeds with our comprehensive calculator. Convert data units, estimate website bandwidth needs, and optimize network performance.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Bandwidth?</h3>
          <p className="text-gray-700 mb-4">
            Bandwidth refers to the maximum rate of data transfer across a network, measured in bits per second (bps). Internet speeds are advertised in Mbps (megabits per second), while file sizes use MB (megabytes). Since 1 byte = 8 bits, a 100 Mbps connection downloads at approximately 12.5 MB/s.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Calculating Download Time</h3>
          <p className="text-gray-700 mb-4">
            Download time calculation: Time = File Size (bits) / Bandwidth (bits/second). Example: 5GB file on 100 Mbps: 5,000,000,000 bytes × 8 = 40,000,000,000 bits / 100,000,000 bps = 400 seconds (6 minutes 40 seconds). Actual time may be 10-30% longer due to overhead.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Website Bandwidth Requirements</h3>
          <p className="text-gray-700 mb-4">
            Website bandwidth = Page Views × Average Page Size × Redundancy Factor. Example: 10,000 daily views, 2.5MB pages, 2× redundancy = 750GB monthly. Peak bandwidth (3× average) determines required connection speed.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on bandwidth and network optimization:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                FCC - Broadband Speed Guide
              </a>
            </li>
            <li>
              <a href="https://www.ietf.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Internet Engineering Task Force (IETF)
              </a>
            </li>
            <li>
              <a href="https://www.speedtest.net/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Speedtest by Ookla
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/data-transfer-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📡</div>
            <h3 className="font-semibold text-gray-900">Data Transfer Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate data transfer rates</p>
          </a>
          
          <a 
            href="/network-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-semibold text-gray-900">Network Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">IP subnet tools</p>
          </a>
          
          <a 
            href="/file-size-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💾</div>
            <h3 className="font-semibold text-gray-900">File Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate storage needs</p>
          </a>
          
          <a 
            href="/speed-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert speed units</p>
          </a>
        </div>
      </section>
    </div>
  );
}
