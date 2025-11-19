import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import MatrixCalculator from "@/components/Calculator/MatrixCalculator";
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
  title: "Matrix Calculator - Add, Multiply, Transpose, Determinant, Inverse | AICalculator",
  description: "Free matrix calculator for linear algebra. Calculate matrix addition, subtraction, multiplication, transpose, determinant, inverse, rank, and trace. Supports matrices up to 10x10 with step-by-step solutions.",
  keywords: [
    "matrix calculator",
    "matrix multiplication calculator",
    "matrix addition calculator",
    "determinant calculator",
    "matrix inverse calculator",
    "transpose matrix calculator",
    "matrix rank calculator",
    "matrix trace calculator",
    "linear algebra calculator",
    "matrix operations",
    "matrix math calculator",
    "2x2 matrix calculator",
    "3x3 matrix calculator",
    "matrix solver",
    "gauss jordan calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Matrix Calculator - Linear Algebra Operations",
    description: "Calculate matrix operations instantly: multiply, add, transpose, determinant, inverse, rank. Perfect for students and engineers.",
    type: "website",
    url: getUrl('/matrix-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('matrix'),
        width: 1200,
        height: 630,
        alt: 'Matrix Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrix Calculator",
    description: "Calculate matrix operations with ease. Add, multiply, transpose, determinant, inverse, and more.",
    images: [getOgImage('matrix')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/matrix-calculator'),
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

export default function MatrixCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/matrix-calculator'),
        "name": "Matrix Calculator",
        "url": getUrl('/matrix-calculator'),
        "description": "Free matrix calculator supporting operations up to 10x10 matrices including addition, subtraction, multiplication, transpose, determinant, inverse, rank, and trace calculations.",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Matrix addition and subtraction",
          "Matrix multiplication",
          "Matrix transpose",
          "Determinant calculation",
          "Matrix inverse",
          "Matrix rank",
          "Matrix trace",
          "Supports up to 10x10 matrices",
          "Color-coded results",
          "Quick presets (identity, zero, random)"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/matrix-calculator'),
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getUrl('/')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Math",
            "item": getUrl('/math')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Matrix Calculator",
            "item": getUrl('/matrix-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/matrix-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I multiply matrices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To multiply two matrices A and B, the number of columns in matrix A must equal the number of rows in matrix B. Each element in the resulting matrix is calculated by taking the dot product of the corresponding row from A and column from B. For example, if A is 2x3 and B is 3x2, the result will be 2x2. Our calculator handles this automatically and shows if matrices cannot be multiplied due to dimension mismatch."
            }
          },
          {
            "@type": "Question",
            "name": "What is a matrix determinant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The determinant is a scalar value that can be calculated from a square matrix. It provides important information about the matrix, such as whether it is invertible (determinant not equal to zero) and the volume scaling factor for linear transformations. For a 2x2 matrix [[a,b],[c,d]], the determinant is ad minus bc. Our calculator uses LU decomposition for larger matrices to ensure accuracy and efficiency."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find the inverse of a matrix?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The inverse of a matrix A (denoted A inverse) is a matrix that when multiplied by A gives the identity matrix. Only square matrices with non-zero determinants have inverses. Our calculator uses Gauss-Jordan elimination to find the inverse. If the determinant is zero, the matrix is singular and the calculator will display an error message indicating the inverse does not exist."
            }
          },
          {
            "@type": "Question",
            "name": "What is matrix rank?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The rank of a matrix is the maximum number of linearly independent rows or columns. It represents the dimension of the vector space spanned by the rows or columns. The rank is always less than or equal to the minimum of the number of rows and columns. A full rank matrix has rank equal to its smallest dimension. Our calculator uses row reduction to determine the rank."
            }
          },
          {
            "@type": "Question",
            "name": "What is the trace of a matrix?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The trace of a square matrix is the sum of all elements on the main diagonal (from top-left to bottom-right). It has useful properties in linear algebra: the trace of a sum equals the sum of traces, and the trace is invariant under change of basis. The trace equals the sum of eigenvalues. Our calculator computes this instantly for any square matrix."
            }
          },
          {
            "@type": "Question",
            "name": "Can I add matrices of different sizes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, matrix addition and subtraction require both matrices to have exactly the same dimensions. You can only add a 3x3 matrix to another 3x3 matrix, not to a 3x2 or 4x3 matrix. Each corresponding element is added together to produce the result. Our calculator will display an error if you attempt to add or subtract matrices with different dimensions."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/matrix-calculator'),
        "name": "How to Use the Matrix Calculator",
        "description": "Step-by-step guide to performing matrix operations.",
        "totalTime": "PT3M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Matrix Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Set Matrix Dimensions",
            "text": "Choose the number of rows and columns for Matrix A and Matrix B. You can create matrices from 1x1 up to 10x10.",
            "url": getStepUrl('/matrix-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Matrix Values",
            "text": "Type numbers into each cell of the matrix. You can also use quick presets like Identity (diagonal 1s), Zero (all 0s), or Random (random values).",
            "url": getStepUrl('/matrix-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Operation",
            "text": "Select the operation you want to perform: Add, Subtract, Multiply, Transpose, Determinant, Inverse, Rank, or Trace.",
            "url": getStepUrl('/matrix-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "The calculator instantly displays the result matrix with color-coding: green for positive values, red for negative values, and gray for zero.",
            "url": getStepUrl('/matrix-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Save or Share",
            "text": "Download your results as an image, print them, or share them using the provided buttons.",
            "url": getStepUrl('/matrix-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/matrix-calculator'),
        "headline": "Matrix Calculator - Complete Guide to Matrix Operations",
        "description": "Comprehensive guide to matrix calculations including addition, multiplication, determinant, inverse, and more.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "image": getOgImage('matrix'),
        "articleBody": "Matrix operations are fundamental to linear algebra and have applications in physics, computer graphics, data science, and engineering. This comprehensive guide covers all essential matrix operations including addition, multiplication, transpose, determinant, inverse, rank, and trace calculations with practical examples and applications."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">Matrix Calculator - Linear Algebra Operations Tool</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Matrix Calculator"
        calculatorUrl="/matrix-calculator"
      />

      <MatrixCalculator />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Matrix Operations</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">What You Will Learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✓ How to perform matrix addition, subtraction, and multiplication</li>
              <li>✓ Understanding transpose, determinant, and inverse</li>
              <li>✓ What matrix rank and trace represent</li>
              <li>✓ Practical applications of matrix operations</li>
              <li>✓ Common matrix properties and rules</li>
              <li>✓ Tips for solving matrix problems efficiently</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is a Matrix?</h3>
          
          <p className="text-gray-700 mb-4">
            A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and columns. Matrices are fundamental tools in linear algebra and have widespread applications in mathematics, physics, computer science, engineering, and data science. Each number in a matrix is called an element or entry.
          </p>

          <p className="text-gray-700 mb-4">
            A matrix is typically denoted by a capital letter (like A, B, or C) and its dimensions are expressed as rows × columns (m × n). For example, a 3×2 matrix has 3 rows and 2 columns, containing 6 elements total.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Basic Matrix Operations</h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Matrix Addition and Subtraction</h4>
          
          <p className="text-gray-700 mb-4">
            Matrices can be added or subtracted only if they have the same dimensions. To add or subtract matrices, simply add or subtract the corresponding elements.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Example: Adding 2×2 Matrices</h5>
            <div className="text-sm font-mono text-gray-800 space-y-2">
              <p>A = [[1, 2], [3, 4]]</p>
              <p>B = [[5, 6], [7, 8]]</p>
              <p className="mt-4 pt-4 border-t border-gray-300">A plus B = [[6, 8], [10, 12]]</p>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Matrix Multiplication</h4>
          
          <p className="text-gray-700 mb-4">
            Matrix multiplication is more complex. To multiply matrix A (m×n) by matrix B (p×q), the number of columns in A (n) must equal the number of rows in B (p). The resulting matrix will have dimensions m×q. Each element is computed as the dot product of a row from A and a column from B.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Example: Multiplying 2×3 by 3×2</h5>
            <div className="text-sm font-mono text-gray-800 space-y-2">
              <p>A (2×3) = [[1, 2, 3], [4, 5, 6]]</p>
              <p>B (3×2) = [[7, 8], [9, 10], [11, 12]]</p>
              <p className="mt-4 pt-4 border-t border-gray-300">A times B (2×2) = [[58, 64], [139, 154]]</p>
              <p className="text-xs text-gray-600 mt-2">Element [0,0] = 1 times 7 plus 2 times 9 plus 3 times 11 = 58</p>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Matrix Transpose</h4>
          
          <p className="text-gray-700 mb-4">
            The transpose of a matrix is obtained by flipping it over its diagonal, converting rows to columns and vice versa. If A is an m×n matrix, its transpose (denoted as A transpose or A with T superscript) is an n×m matrix.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Example: Transpose</h5>
            <div className="text-sm font-mono text-gray-800 space-y-2">
              <p>A = [[1, 2, 3], [4, 5, 6]]</p>
              <p className="mt-4 pt-4 border-t border-gray-300">A transpose = [[1, 4], [2, 5], [3, 6]]</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Matrix Properties</h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Determinant</h4>
          
          <p className="text-gray-700 mb-4">
            The determinant is a scalar value calculated from a square matrix that provides important information about the matrix. A non-zero determinant means the matrix is invertible. For a 2×2 matrix, det([[a,b],[c,d]]) = ad minus bc.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Matrix Inverse</h4>
          
          <p className="text-gray-700 mb-4">
            The inverse of matrix A (denoted A with minus 1 superscript) satisfies A times A inverse equals the identity matrix. Only square matrices with non-zero determinants have inverses. Finding the inverse is crucial for solving systems of linear equations.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Rank</h4>
          
          <p className="text-gray-700 mb-4">
            The rank of a matrix is the maximum number of linearly independent rows or columns. It represents the dimension of the vector space spanned by the matrix and is always less than or equal to the minimum of rows and columns.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Trace</h4>
          
          <p className="text-gray-700 mb-4">
            The trace is the sum of the diagonal elements of a square matrix. It has useful properties: trace(A plus B) equals trace(A) plus trace(B), and the trace equals the sum of eigenvalues.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Applications of Matrices</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">🎮 Computer Graphics</h4>
              <p className="text-sm text-gray-700">
                Matrices are used for transformations like rotation, scaling, and translation in 2D and 3D graphics. Every game and animation relies on matrix operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">📊 Data Science</h4>
              <p className="text-sm text-gray-700">
                Machine learning algorithms use matrices extensively for representing datasets, performing linear regression, and neural network computations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">⚡ Engineering</h4>
              <p className="text-sm text-gray-700">
                Structural analysis, electrical circuits, and control systems all use matrices to solve systems of equations and model complex systems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">🔬 Quantum Mechanics</h4>
              <p className="text-sm text-gray-700">
                Quantum states are represented as vectors and matrices (operators) describe physical observables and transformations in quantum systems.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Matrix Types</h3>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Identity Matrix:</strong> Square matrix with 1s on the diagonal and 0s elsewhere (acts like the number 1 in multiplication)</li>
            <li><strong>Zero Matrix:</strong> All elements are 0</li>
            <li><strong>Diagonal Matrix:</strong> Non-zero elements only on the diagonal</li>
            <li><strong>Symmetric Matrix:</strong> Equals its own transpose (A = A transpose)</li>
            <li><strong>Orthogonal Matrix:</strong> A times A transpose equals the identity matrix</li>
            <li><strong>Singular Matrix:</strong> Determinant equals 0, no inverse exists</li>
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I multiply matrices?</h3>
            <p className="text-gray-700">
              To multiply matrices, the number of columns in the first matrix must equal the number of rows in the second matrix. Each element in the result is the dot product of a row from the first matrix and a column from the second matrix. Our calculator handles this automatically and validates dimensions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a matrix determinant?</h3>
            <p className="text-gray-700">
              The determinant is a scalar value that indicates whether a square matrix is invertible. If the determinant is zero, the matrix is singular and has no inverse. The determinant also represents the volume scaling factor for linear transformations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I find the inverse of a matrix?</h3>
            <p className="text-gray-700">
              Only square matrices with non-zero determinants have inverses. Our calculator uses Gauss-Jordan elimination to find the inverse. If the matrix is singular (determinant = 0), an error message will be displayed.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is matrix rank?</h3>
            <p className="text-gray-700">
              The rank is the maximum number of linearly independent rows or columns. It represents the dimension of the vector space spanned by the matrix and is useful for determining solution uniqueness in linear systems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the trace of a matrix?</h3>
            <p className="text-gray-700">
              The trace is the sum of all diagonal elements in a square matrix. It has useful properties in linear algebra and equals the sum of the matrix eigenvalues.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I add matrices of different sizes?</h3>
            <p className="text-gray-700">
              No, matrix addition and subtraction require both matrices to have exactly the same dimensions. The calculator will display an error if you try to add or subtract matrices with different dimensions.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Math Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/prime-factorization-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-gray-900">Prime Factorization</h3>
            <p className="text-sm text-gray-600 mt-1">Factor numbers into primes</p>
          </Link>

          <Link
            href="/scientific-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Scientific Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Advanced calculations</p>
          </Link>

          <Link
            href="/percentage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages</p>
          </Link>

          <Link
            href="/fraction-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">¼</div>
            <h3 className="font-semibold text-gray-900">Fraction Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add, subtract fractions</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

