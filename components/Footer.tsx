import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="text-lg font-bold text-white">AICalculator.pro</span>
            </div>
            <p className="text-sm mb-4">
              Free online calculators with AI-powered analysis. Get instant results with step-by-step explanations and professional insights.
            </p>
            <p className="text-xs text-gray-400">
              Better than Google calculator with 80+ specialized tools for finance, health, math, and more.
            </p>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mortgage-calculator" className="hover:text-white transition">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/bmi-calculator" className="hover:text-white transition">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/loan-calculator" className="hover:text-white transition">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/percentage-calculator" className="hover:text-white transition">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tax-calculator" className="hover:text-white transition">
                  Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-blue-400 transition font-medium">
                  View All Calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculator Categories */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Calculator Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculators#financial" className="hover:text-white transition">
                  💰 Financial Calculators
                </Link>
              </li>
              <li>
                <Link href="/calculators#health" className="hover:text-white transition">
                  🏥 Health & Fitness
                </Link>
              </li>
              <li>
                <Link href="/calculators#math" className="hover:text-white transition">
                  📐 Math Calculators
                </Link>
              </li>
              <li>
                <Link href="/calculators#other" className="hover:text-white transition">
                  🔧 Other Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {currentYear} AICalculator.pro. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4 text-xs text-gray-400">
              <span>Made with ❤️ for better calculations</span>
              <span>•</span>
              <span>AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

