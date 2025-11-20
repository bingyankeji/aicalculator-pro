import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { GraphingCalculator } from '@/components/Calculator/GraphingCalculator';
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Graphing Calculator - Free Online Function Plotter & Graph Maker | AICalculator',
  description: 'Free online graphing calculator to plot functions, solve equations, and analyze graphs. Advanced function plotter with zoom, trace, and multiple function support. Perfect for students, teachers, and professionals.',
  keywords: [
    'graphing calculator',
    'function plotter',
    'graph maker',
    'online graphing calculator',
    'plot functions online',
    'function grapher',
    'mathematical graphing tool',
    'equation plotter',
    'graph functions',
    'scientific graphing calculator',
    'free graphing calculator',
    'function plotting tool',
    'mathematical graphs',
    'algebra graphing',
    'calculus graphing',
    'trigonometry graphs',
    'polynomial graphing',
    'linear function plotter',
    'quadratic function grapher',
    'exponential function plotter',
    'logarithmic function grapher',
    'graph analysis tool',
    'function domain range',
    'graph intersection points',
    'function derivatives',
    'graph zoom trace',
  ],
  openGraph: {
    title: 'Free Graphing Calculator - Plot Functions & Analyze Graphs Online',
    description: 'Advanced online graphing calculator with function plotting, equation solving, and graph analysis. Free tool for students and professionals.',
    type: 'website',
    url: getUrl('/graphing-calculator'),
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphing Calculator - Function Plotter & Graph Maker',
    description: 'Free online graphing calculator to plot functions, solve equations, and analyze mathematical graphs.',
    site: '@AICalculator',
  },
  alternates: {
    canonical: getUrl('/graphing-calculator'),
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getUrl('/graphing-calculator') + '#webapp',
      name: 'Graphing Calculator',
      description: 'Free online graphing calculator to plot functions, solve equations, and analyze graphs with advanced features.',
      url: getUrl('/graphing-calculator'),
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Function plotting',
        'Multiple function support',
        'Graph zoom and pan',
        'Trace functionality',
        'Intersection points',
        'Domain and range analysis',
        'Derivative plotting',
        'Equation solving',
        'Graph export',
        'Mobile responsive',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getUrl('/graphing-calculator') + '#breadcrumb',
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
          name: 'Math & Numbers',
          item: getUrl('/math-calculators'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Graphing Calculator',
          item: getUrl('/graphing-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getUrl('/graphing-calculator') + '#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I plot a function on the graphing calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enter your function in the input field using standard mathematical notation (e.g., x^2, sin(x), log(x)). The calculator supports polynomials, trigonometric functions, exponentials, logarithms, and more. Click "Plot" or press Enter to graph the function.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of functions can I graph?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can graph linear functions (y = mx + b), quadratic functions (y = ax^2 + bx + c), polynomial functions, trigonometric functions (sin, cos, tan), exponential functions (e^x, a^x), logarithmic functions (log, ln), absolute value functions, and piecewise functions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I find intersection points between functions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Plot multiple functions on the same graph, then use the intersection tool or trace feature to find where the functions cross. The calculator will automatically detect and highlight intersection points with precise coordinates.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I zoom and pan the graph?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Use the zoom controls to zoom in/out, or use mouse wheel scrolling. Click and drag to pan around the graph. You can also set custom viewing windows by specifying x and y axis ranges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I trace points on a function?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the trace tool to move along a function and see exact coordinates. Click on any point on the graph or use arrow keys to move the trace cursor. The coordinates will be displayed in real-time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I plot derivatives and integrals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Enter derivative notation like d/dx(x^2) or use the derivative tool. For integrals, use integral notation or the area calculation feature to find definite integrals between specified bounds.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I save or export my graphs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the export feature to save your graph as a PNG image or print it. You can also share a link to your graph with specific functions and viewing settings preserved.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between this and other graphing calculators?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our graphing calculator includes AI-powered analysis that provides insights about function behavior, critical points, asymptotes, and mathematical properties. It also offers advanced features like multiple function comparison and intelligent suggestions.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getUrl('/graphing-calculator') + '#howto',
      name: 'How to Use the Graphing Calculator',
      description: 'Step-by-step guide to plotting and analyzing functions with our online graphing calculator.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Your Function',
          text: 'Type your mathematical function in the input field using standard notation (e.g., x^2 + 2*x - 1, sin(x), log(x)).',
        },
        {
          '@type': 'HowToStep',
          name: 'Adjust Graph Settings',
          text: 'Set your preferred viewing window by adjusting the x and y axis ranges, or use auto-scale for optimal viewing.',
        },
        {
          '@type': 'HowToStep',
          name: 'Plot the Function',
          text: 'Click the "Plot" button or press Enter to generate the graph. The function will be plotted with a smooth curve.',
        },
        {
          '@type': 'HowToStep',
          name: 'Analyze the Graph',
          text: 'Use trace, zoom, and analysis tools to explore function properties like intercepts, extrema, and asymptotes.',
        },
        {
          '@type': 'HowToStep',
          name: 'Export or Share',
          text: 'Save your graph as an image, print it, or share a link with your specific function and settings.',
        },
      ],
    },
  ],
};

export default function GraphingCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Graphing Calculator"
        calculatorUrl="/graphing-calculator"
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="sr-only">Graphing Calculator - Free Online Function Plotter & Graph Maker</h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Graphing Calculator</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Free online graphing calculator to plot functions, solve equations, and analyze graphs. 
              Advanced function plotter with zoom, trace, and intelligent analysis features.
            </p>
          </div>
        </div>
      </header>

      {/* Main Calculator */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <GraphingCalculator />
        </div>
      </section>

      {/* Educational Content Area (Required! Minimum 1500 words) */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* H2 Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Graphing Calculators and Function Analysis
            </h2>

            {/* Content Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: Core Concepts */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-600">What is a Graphing Calculator?</h3>
                <p className="text-gray-700 mb-4">
                  A graphing calculator is a powerful mathematical tool that can plot functions, solve equations, 
                  and analyze mathematical relationships visually. Unlike basic calculators that only perform 
                  arithmetic operations, graphing calculators can handle complex mathematical expressions and 
                  display their graphical representations.
                </p>
                <p className="text-gray-700">
                  Modern online graphing calculators like ours offer advanced features including multiple function 
                  plotting, zoom controls, trace functionality, and intelligent analysis that helps students and 
                  professionals understand mathematical concepts more deeply.
                </p>
              </div>

              {/* Card 2: Function Types */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-green-600">Types of Functions You Can Graph</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Linear Functions</h4>
                    <p className="text-sm text-gray-600">y = mx + b (straight lines)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quadratic Functions</h4>
                    <p className="text-sm text-gray-600">y = ax² + bx + c (parabolas)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Trigonometric Functions</h4>
                    <p className="text-sm text-gray-600">sin(x), cos(x), tan(x) (periodic waves)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Exponential Functions</h4>
                    <p className="text-sm text-gray-600">y = aˣ (growth/decay curves)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Logarithmic Functions</h4>
                    <p className="text-sm text-gray-600">y = log(x) (inverse of exponential)</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Key Features */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-600">Advanced Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Multiple Functions:</strong> Plot up to 8 functions simultaneously with different colors and styles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Interactive Tools:</strong> Zoom, pan, trace points, and find intersections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>AI Analysis:</strong> Automatic detection of critical points, domain, range, and asymptotes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Customization:</strong> Adjustable viewing windows, grid settings, and axis labels</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Applications */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Real-World Applications</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <h4 className="font-semibold">Education</h4>
                    <p className="text-sm">Visualize mathematical concepts in algebra, calculus, and trigonometry courses</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Engineering</h4>
                    <p className="text-sm">Analyze signal processing, control systems, and optimization problems</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Science</h4>
                    <p className="text-sm">Model physical phenomena, population dynamics, and experimental data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Finance</h4>
                    <p className="text-sm">Visualize compound interest, investment growth, and risk analysis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Guide Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to Function Graphing</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-600">Getting Started</h4>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Step 1: Enter Your Function</strong><br/>
                      Type your mathematical expression using standard notation. For example, enter "x^2" for x squared, 
                      "sin(x)" for sine function, or "log(x)" for logarithm. Our parser supports all common mathematical 
                      functions and operations.
                    </p>
                    <p>
                      <strong>Step 2: Adjust the Viewing Window</strong><br/>
                      Set appropriate x and y ranges to see your function clearly. For polynomial functions, try -10 to 10. 
                      For trigonometric functions, consider -2π to 2π for x-axis to see complete cycles.
                    </p>
                    <p>
                      <strong>Step 3: Use Interactive Tools</strong><br/>
                      Click the trace button to explore specific points on your function. Use zoom controls to examine 
                      details or get a broader view of the function's behavior.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-green-600">Advanced Techniques</h4>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Multiple Function Comparison</strong><br/>
                      Add multiple functions to compare their behavior. This is particularly useful for understanding 
                      transformations, such as comparing y = x² with y = x² + 3 or y = (x-2)².
                    </p>
                    <p>
                      <strong>Finding Critical Points</strong><br/>
                      Our AI analysis automatically identifies maximum and minimum points, x-intercepts (zeros), 
                      and y-intercepts. These points are crucial for understanding function behavior and solving 
                      optimization problems.
                    </p>
                    <p>
                      <strong>Domain and Range Analysis</strong><br/>
                      The intelligent analysis feature determines the domain (valid x-values) and range (possible y-values) 
                      of your function, helping you understand its mathematical properties and limitations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mathematical Concepts Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Mathematical Concepts</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-600">Function Transformations</h4>
                  <p className="text-gray-700 mb-3">
                    Understanding how functions transform is crucial for graphing. Here are the main types:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold">Vertical Shifts</h5>
                      <p className="text-sm text-gray-600">f(x) + k moves the graph up (k &gt; 0) or down (k &lt; 0)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold">Horizontal Shifts</h5>
                      <p className="text-sm text-gray-600">f(x - h) moves the graph right (h &gt; 0) or left (h &lt; 0)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold">Vertical Scaling</h5>
                      <p className="text-sm text-gray-600">a·f(x) stretches (|a| &gt; 1) or compresses (|a| &lt; 1) vertically</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold">Reflections</h5>
                      <p className="text-sm text-gray-600">-f(x) reflects over x-axis, f(-x) reflects over y-axis</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-red-600">Asymptotes and Discontinuities</h4>
                  <p className="text-gray-700 mb-3">
                    Some functions have asymptotes (lines the graph approaches but never touches) or points where 
                    they're undefined:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Vertical Asymptotes:</strong> Occur where the denominator equals zero (e.g., x = 0 for f(x) = 1/x)</li>
                    <li><strong>Horizontal Asymptotes:</strong> Describe end behavior as x approaches ±∞</li>
                    <li><strong>Removable Discontinuities:</strong> "Holes" in the graph where a point is missing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section (Required!) */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I enter complex mathematical expressions?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Use standard mathematical notation: x^2 for x squared, sqrt(x) for square root, sin(x) for sine, 
                      log(x) for base-10 logarithm, ln(x) for natural logarithm, and e^x for exponential. 
                      Parentheses are important for grouping: sin(2*x) is different from 2*sin(x).
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What makes this graphing calculator different from others?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Our calculator features AI-powered analysis that automatically identifies critical points, 
                      calculates domain and range, detects asymptotes, and provides educational insights about 
                      function behavior. It also supports multiple functions with customizable colors and styles, 
                      making it perfect for comparing different mathematical relationships.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I save or share my graphs?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! You can save your graphs as PNG images, print them directly, or share them via social media. 
                      The share feature creates a unique URL that preserves your function and viewing settings, 
                      making it easy to collaborate with classmates or colleagues.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate are the critical point calculations?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Our algorithm uses numerical methods with high precision to find critical points, zeros, and 
                      intersections. While not as precise as symbolic computation, the results are accurate to 
                      several decimal places and suitable for most educational and professional applications.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Is this calculator suitable for calculus students?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Absolutely! The calculator is perfect for visualizing derivatives, integrals, and limits. 
                      You can plot a function and its derivative simultaneously to understand their relationship, 
                      or use the trace feature to explore function behavior at specific points. The AI analysis 
                      helps identify important calculus concepts like extrema and inflection points.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What should I do if my function doesn't appear on the graph?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      First, check your function syntax and ensure it's mathematically valid. Then, adjust the 
                      viewing window - your function might be outside the current range. Try using the "Reset" 
                      button to return to the default view, or manually set appropriate x and y ranges based on 
                      your function type.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I use this calculator on my mobile device?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Our graphing calculator is fully responsive and optimized for mobile devices. 
                      The interface adapts to smaller screens while maintaining full functionality. 
                      Touch gestures work intuitively for zooming and panning, making it convenient to use 
                      on smartphones and tablets.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I find where two functions intersect?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Plot both functions on the same graph using different colors. Intersection points will be 
                      automatically detected and highlighted in green. You can also use the trace tool to explore 
                      points near intersections for more precise coordinates. This feature is particularly useful 
                      for solving systems of equations graphically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links (Required!) */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/scientific-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Scientific Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Advanced mathematical operations and functions</p>
                </Link>
                <Link
                  href="/quadratic-formula-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Quadratic Formula Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Solve quadratic equations step by step</p>
                </Link>
                <Link
                  href="/area-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Area Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate area of various geometric shapes</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
