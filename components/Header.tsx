'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="text-xl font-bold text-gray-900">AICalculator.pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/calculators#financial" className="text-gray-700 hover:text-blue-600 font-medium transition">
              💰 Financial
            </Link>
            <Link href="/calculators#health" className="text-gray-700 hover:text-blue-600 font-medium transition">
              🏥 Health
            </Link>
            <Link href="/calculators#math" className="text-gray-700 hover:text-blue-600 font-medium transition">
              📐 Math
            </Link>
            <Link href="/calculators#other" className="text-gray-700 hover:text-blue-600 font-medium transition">
              🔧 Other
            </Link>
            <Link href="/calculators" className="text-gray-700 hover:text-blue-600 font-medium transition border-l pl-6 ml-6 border-gray-200">
              All Tools
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              <Link 
                href="/calculators#financial" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                💰 Financial Calculators
              </Link>
              <Link 
                href="/calculators#health" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏥 Health & Fitness
              </Link>
              <Link 
                href="/calculators#math" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                📐 Math Calculators
              </Link>
              <Link 
                href="/calculators#other" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔧 Other Tools
              </Link>
              <Link 
                href="/calculators" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold border-t border-gray-200 mt-2 pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                View All Calculators
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

