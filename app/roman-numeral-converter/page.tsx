import { Metadata } from 'next';
import RomanNumeralCalculator from '@/components/Calculator/RomanNumeralCalculator';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Roman Numeral Converter - Convert Arabic Numbers to Roman Numerals | AICalculator.pro',
  description: 'Free online Roman numeral converter. Convert between Arabic numbers (1-3999) and Roman numerals with step-by-step explanations. Learn Roman numeral rules and history.',
  keywords: [
    'roman numeral converter',
    'arabic to roman',
    'roman to arabic',
    'roman numerals',
    'roman numeral calculator',
    'convert roman numerals',
    'roman number converter',
    'numeral converter',
    'roman numerals to numbers',
    'numbers to roman numerals',
    'roman numeral chart',
    'roman numeral translator',
    'roman numeral generator',
    'ancient roman numbers',
    'roman counting system'
  ],
  openGraph: {
    title: 'Roman Numeral Converter - Convert Arabic Numbers to Roman Numerals',
    description: 'Convert between Arabic numbers and Roman numerals instantly with step-by-step explanations.',
    type: 'website',
    url: 'https://aicalculator.pro/roman-numeral-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roman Numeral Converter - Convert Arabic Numbers to Roman Numerals',
    description: 'Convert between Arabic numbers and Roman numerals instantly.',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/roman-numeral-converter',
  },
};

// JSON-LD for rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebApplication
    {
      '@type': 'WebApplication',
      '@id': 'https://aicalculator.pro/roman-numeral-converter#webapp',
      name: 'Roman Numeral Converter',
      url: 'https://aicalculator.pro/roman-numeral-converter',
      description: 'Free online tool for converting between Arabic numbers and Roman numerals',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Bidirectional conversion: Arabic ⇄ Roman numerals',
        'Support range: 1-3999',
        'Step-by-step conversion process',
        'Roman numeral validation',
        'Conversion history tracking',
        'Common conversions reference table',
        'Educational content about Roman numerals',
        'Instant conversion results',
      ],
    },
    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://aicalculator.pro/roman-numeral-converter#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://aicalculator.pro',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Other',
          item: 'https://aicalculator.pro/other',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Roman Numeral Converter',
          item: 'https://aicalculator.pro/roman-numeral-converter',
        },
      ],
    },
    // FAQPage
    {
      '@type': 'FAQPage',
      '@id': 'https://aicalculator.pro/roman-numeral-converter#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are Roman numerals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Roman numerals are a numeral system that originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages. They use combinations of letters from the Latin alphabet (I, V, X, L, C, D, M) to represent values.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the range of Roman numerals this converter supports?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'This converter supports numbers from 1 to 3999. This is the standard range for Roman numerals in common usage. Numbers larger than 3999 require special notation (like overlines) that varied historically.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you read Roman numerals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Roman numerals are read by adding or subtracting values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. When a smaller numeral appears before a larger one, subtract it (IV=4). When equal or larger, add them (VI=6, III=3).',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is 4 written as IV and not IIII?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The subtractive notation (IV for 4, IX for 9) became standard to make numerals more concise. However, IIII was used historically (and still appears on some clock faces). The subtractive principle applies when a smaller value precedes a larger one.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where are Roman numerals still used today?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Roman numerals are still used in: clock faces, book chapters and volumes, movie sequels and series, Super Bowl numbers, building cornerstones, outline formatting, monarchs and popes (Elizabeth II, Pope John Paul II), and copyright dates in film and television.',
          },
        },
      ],
    },
    // HowTo
    {
      '@type': 'HowTo',
      '@id': 'https://aicalculator.pro/roman-numeral-converter#howto',
      name: 'How to Convert Between Roman Numerals and Arabic Numbers',
      description: 'Step-by-step guide to converting Roman numerals',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose Conversion Direction',
          text: 'Decide if you want to convert from Arabic numbers to Roman numerals, or from Roman numerals to Arabic numbers.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Your Number',
          text: 'For Arabic to Roman: Enter a number between 1 and 3999. For Roman to Arabic: Enter a valid Roman numeral using letters I, V, X, L, C, D, and M.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Click Convert',
          text: 'Click the "Convert" button to see the result. The converter will validate your input and show an error if the input is invalid.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View Conversion Steps',
          text: 'Review the step-by-step conversion process to understand how the conversion was performed.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use Reference Table',
          text: 'Consult the common conversions reference table to quickly look up frequently used numerals.',
        },
      ],
    },
    // Article
    {
      '@type': 'Article',
      '@id': 'https://aicalculator.pro/roman-numeral-converter#article',
      headline: 'Roman Numeral Converter - Complete Guide to Roman Numerals',
      description: 'Learn about Roman numerals, their history, rules, and how to convert them',
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aicalculator.pro/logo.png',
        },
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    },
  ],
};

export default function RomanNumeralConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Roman Numeral Converter - Convert Arabic Numbers to Roman Numerals Online Free
        </h1>

        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <div className="bg-white rounded-lg shadow-sm px-4 py-3">
            <ol className="flex flex-wrap items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link
                  href="/other"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Other
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-700 font-medium">Roman Numeral Converter</li>
            </ol>
          </div>
        </nav>

        {/* Calculator Component */}
        <RomanNumeralCalculator />

        {/* Educational Content */}
        <section className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Roman Numerals
            </h2>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              What Are Roman Numerals?
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Roman numerals are a numeral system that originated in ancient Rome and remained 
              the usual way of writing numbers throughout Europe well into the Late Middle Ages. 
              Numbers in this system are represented by combinations of letters from the Latin 
              alphabet: I, V, X, L, C, D, and M.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The beauty of Roman numerals lies in their simplicity and additive-subtractive 
              principle, making them ideal for monumental inscriptions and formal documents. 
              Even today, they continue to be used in various contexts, from clock faces to 
              movie credits.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Basic Roman Numeral Symbols
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Roman numeral system uses seven basic symbols:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li><strong>I</strong> = 1</li>
              <li><strong>V</strong> = 5</li>
              <li><strong>X</strong> = 10</li>
              <li><strong>L</strong> = 50</li>
              <li><strong>C</strong> = 100 (from Latin "centum")</li>
              <li><strong>D</strong> = 500</li>
              <li><strong>M</strong> = 1000 (from Latin "mille")</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Rules for Roman Numerals
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Roman numerals follow specific rules that govern their formation:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              1. Additive Principle
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When symbols are written from largest to smallest, their values are added:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>VI = 5 + 1 = 6</li>
              <li>XXX = 10 + 10 + 10 = 30</li>
              <li>MDCCC = 1000 + 500 + 100 + 100 + 100 = 1800</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              2. Subtractive Principle
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When a smaller symbol precedes a larger one, it is subtracted:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>IV = 5 - 1 = 4</li>
              <li>IX = 10 - 1 = 9</li>
              <li>XL = 50 - 10 = 40</li>
              <li>XC = 100 - 10 = 90</li>
              <li>CD = 500 - 100 = 400</li>
              <li>CM = 1000 - 100 = 900</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              3. Repetition Rules
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Symbols can be repeated, but with limitations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li><strong>I, X, C, and M</strong> can be repeated up to three times consecutively</li>
              <li><strong>V, L, and D</strong> cannot be repeated (use subtractive notation instead)</li>
              <li>Examples: III = 3, XXX = 30, CCC = 300, MMM = 3000</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              4. Subtractive Notation Rules
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Only certain subtractions are allowed:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>I can precede V or X (IV = 4, IX = 9)</li>
              <li>X can precede L or C (XL = 40, XC = 90)</li>
              <li>C can precede D or M (CD = 400, CM = 900)</li>
              <li>Only one smaller numeral can precede a larger one</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Historical Context and Evolution
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Roman numerals developed gradually in ancient Rome and were the dominant number 
              system in Europe for over a thousand years. The system was well-suited for 
              addition and subtraction, which made it practical for trade and commerce.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              However, the system had limitations. Multiplication and division were challenging, 
              and there was no representation for zero or negative numbers. These limitations 
              eventually led to the adoption of the Hindu-Arabic numeral system (0-9) that we 
              use today, which was introduced to Europe in the 10th-13th centuries.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Modern Uses of Roman Numerals
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Despite being largely replaced by Arabic numerals for most calculations, Roman 
              numerals continue to be used in various contexts:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Time:</strong> Clock faces often use Roman numerals (though sometimes 
                with IIII instead of IV for symmetry)
              </li>
              <li>
                <strong>Numbered Lists:</strong> Outlines and formal documents use Roman numerals 
                for major sections
              </li>
              <li>
                <strong>Names:</strong> Monarchs (Elizabeth II), popes (Pope Francis I), and 
                sometimes to distinguish family members (John Smith III)
              </li>
              <li>
                <strong>Entertainment:</strong> Movie sequels (Rocky IV), Super Bowl numbers 
                (Super Bowl LVIII), and TV series
              </li>
              <li>
                <strong>Copyright Dates:</strong> Often seen in movie credits and publications
              </li>
              <li>
                <strong>Architecture:</strong> Building cornerstones and monuments frequently 
                display dates in Roman numerals
              </li>
              <li>
                <strong>Education:</strong> Used in academic contexts for chapter numbers, 
                appendices, and preliminary pages
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Mistakes to Avoid
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When working with Roman numerals, watch out for these common errors:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Incorrect repetition:</strong> Writing IIII instead of IV, or VV instead 
                of X (though IIII does appear on some traditional clock faces)
              </li>
              <li>
                <strong>Invalid subtractions:</strong> Using combinations like IL (49) instead of 
                XLIX, or IC (99) instead of XCIX
              </li>
              <li>
                <strong>Wrong order:</strong> Writing symbols in incorrect sequence, like IIV 
                instead of IV
              </li>
              <li>
                <strong>Multiple subtractions:</strong> Using IXC instead of XCI (91)
              </li>
              <li>
                <strong>Exceeding repetition limits:</strong> Writing XXXX instead of XL (40)
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Tips for Learning Roman Numerals
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Mastering Roman numerals becomes easier with these strategies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Memorize the basics:</strong> Learn the seven fundamental symbols and 
                their values thoroughly
              </li>
              <li>
                <strong>Practice with familiar numbers:</strong> Start with years (like your 
                birth year) or common numbers
              </li>
              <li>
                <strong>Break down complex numerals:</strong> Split larger numbers into 
                thousands, hundreds, tens, and ones
              </li>
              <li>
                <strong>Look for patterns:</strong> Notice how similar numbers are formed 
                (IV, IX, XIV, XIX)
              </li>
              <li>
                <strong>Use mnemonic devices:</strong> Create memory aids like "I Value Xylophones 
                Like Cows Drink Milk" for I, V, X, L, C, D, M
              </li>
              <li>
                <strong>Practice regularly:</strong> Convert dates, ages, and page numbers you 
                encounter daily
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Interesting Facts About Roman Numerals
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                The Romans themselves had no standardized form - variations existed across 
                different regions and time periods
              </li>
              <li>
                There was no symbol for zero in Roman numerals - the concept of zero as a 
                number came much later
              </li>
              <li>
                Large numbers were sometimes indicated with a bar over the numeral, multiplying 
                it by 1000 (though this wasn't standardized)
              </li>
              <li>
                The subtractive notation (IV for 4) wasn't universally used until the Middle Ages
              </li>
              <li>
                Roman numerals made multiplication and division extremely difficult, which limited 
                mathematical advancement in Europe
              </li>
              <li>
                Some ancient inscriptions show creative combinations not used in the modern system
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Using This Converter
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our Roman numeral converter is designed to make conversions simple and educational:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Bidirectional conversion:</strong> Convert from Arabic to Roman or Roman 
                to Arabic with equal ease
              </li>
              <li>
                <strong>Step-by-step explanations:</strong> See exactly how each conversion is 
                performed, helping you learn the process
              </li>
              <li>
                <strong>Validation:</strong> The converter checks for valid Roman numeral patterns 
                and alerts you to errors
              </li>
              <li>
                <strong>Reference table:</strong> Quick-look table of common conversions for 
                instant reference
              </li>
              <li>
                <strong>Conversion history:</strong> Track your recent conversions for easy reference
              </li>
              <li>
                <strong>Range support:</strong> Handles all standard Roman numerals from 1 to 3999
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Conclusion
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              While Roman numerals may seem like a relic of the past, they remain an important 
              part of our cultural heritage and continue to serve specific purposes in modern life. 
              Understanding how to read and write them not only helps you interpret historical 
              documents and modern applications but also provides insight into the history of 
              mathematics and the evolution of number systems.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Whether you're trying to read the date on a building cornerstone, understand movie 
              sequel numbers, or simply want to add an elegant touch to a document, mastering 
              Roman numerals is a valuable skill that connects us to thousands of years of history.
            </p>
          </div>
        </section>
      </div>

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

