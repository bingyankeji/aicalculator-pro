import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import VolumeConverter from '@/components/Calculator/VolumeConverter';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Volume Converter - Liters, Gallons, Cups & More | AICalculator',
  description: 'Free volume converter for liters, gallons, cups, milliliters, and more. Convert between metric, US, and imperial volume units instantly.',
  keywords: ['volume converter', 'liter to gallon', 'gallon to liter', 'cup to ml', 'volume conversion', 'ml to oz', 'volume calculator', 'convert volume', 'liquid measurement', 'volume units'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Volume Converter',
    description: 'Convert volume units instantly',
    type: 'website',
    url: getUrl('/volume-converter'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{ url: getOgImage('volume'), width: 1200, height: 630, alt: 'Volume Converter' }],
  },
  alternates: { canonical: getUrl('/volume-converter') },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/volume-converter'),
      name: 'Volume Converter',
      url: getUrl('/volume-converter'),
      description: 'Convert volumes between metric, US, and imperial units',
      applicationCategory: 'UtilityApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/volume-converter'),
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: getUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Other', item: getUrl('/other') },
        { '@type': 'ListItem', position: 3, name: 'Volume Converter', item: getUrl('/volume-converter') },
      ],
    },
  ],
};

export default function VolumeConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="sr-only">Volume Converter</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Volume Converter"
        calculatorUrl="/volume-converter"
      />

      <VolumeConverter />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-4">Volume Conversion Guide</h2>
        <p className="text-gray-700 mb-4">Convert between metric (liters, milliliters), US (gallons, cups, ounces), imperial (UK gallons, pints), and cubic units (cubic meters, feet, inches).</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Common Conversions</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>1 liter = 0.264 gallons (US) = 1000 milliliters</li>
          <li>1 gallon (US) = 3.785 liters = 128 fluid ounces</li>
          <li>1 cup = 236.6 mL = 8 fluid ounces</li>
          <li>1 tablespoon = 14.8 mL = 3 teaspoons</li>
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
        <h2 className="text-2xl font-bold mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/conversion-calculator" className="block p-4 bg-white border rounded-lg hover:shadow-md">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold">Unit Converter</h3>
          </a>
          <a href="/temperature-converter" className="block p-4 bg-white border rounded-lg hover:shadow-md">
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold">Temperature Converter</h3>
          </a>
          <a href="/length-converter" className="block p-4 bg-white border rounded-lg hover:shadow-md">
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold">Length Converter</h3>
          </a>
          <a href="/weight-converter" className="block p-4 bg-white border rounded-lg hover:shadow-md">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold">Weight Converter</h3>
          </a>
        </div>
      </section>
    </div>
  );
}

