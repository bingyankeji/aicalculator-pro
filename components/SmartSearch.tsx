'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, Calculator } from 'lucide-react';
import { allCalculators } from '@/lib/calculatorData';

interface SmartSearchProps {
  enhanced?: boolean;
}

export function SmartSearch({ enhanced = false }: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof allCalculators>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuzzy search algorithm
  const fuzzySearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const words = term.split(/\s+/);
    
    const results = allCalculators
      .map(calc => {
        let score = 0;
        const nameLower = calc.name.toLowerCase();
        const keywordsLower = calc.keywords.map(k => k.toLowerCase());
        
        // Exact name match (highest priority)
        if (nameLower === term) {
          score += 1000;
        }
        // Name starts with term
        else if (nameLower.startsWith(term)) {
          score += 500;
        }
        // Name contains term
        else if (nameLower.includes(term)) {
          score += 200;
        }
        
        // Check each word
        words.forEach(word => {
          // Name contains word
          if (nameLower.includes(word)) {
            score += 100;
          }
          
          // Keyword exact match
          if (keywordsLower.some(k => k === word)) {
            score += 150;
          }
          
          // Keyword contains word
          keywordsLower.forEach(keyword => {
            if (keyword.includes(word)) {
              score += 50;
            }
            // Partial keyword match (fuzzy)
            else if (word.length >= 3) {
              let matches = 0;
              for (let i = 0; i < word.length - 1; i++) {
                if (keyword.includes(word.substring(i, i + 2))) {
                  matches++;
                }
              }
              if (matches >= 2) {
                score += 20;
              }
            }
          });
        });
        
        // Character-by-character fuzzy matching
        if (score === 0 && term.length >= 3) {
          const chars = term.split('');
          let lastIndex = -1;
          let matchCount = 0;
          
          chars.forEach(char => {
            const idx = nameLower.indexOf(char, lastIndex + 1);
            if (idx > lastIndex) {
              matchCount++;
              lastIndex = idx;
            }
          });
          
          if (matchCount >= Math.ceil(chars.length * 0.6)) {
            score += 30;
          }
        }
        
        return { ...calc, score };
      })
      .filter(calc => calc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setSuggestions(results);
  };

  useEffect(() => {
    fuzzySearch(query);
    setShowSuggestions(query.trim().length > 0);
    setSelectedIndex(-1);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        navigateTo(suggestions[selectedIndex].url);
      } else if (suggestions.length > 0) {
        navigateTo(suggestions[0].url);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const navigateTo = (url: string) => {
    setShowSuggestions(false);
    setQuery('');
    router.push(url);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = [];
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let lastIndex = 0;
    
    let index = lowerText.indexOf(lowerQuery, lastIndex);
    if (index !== -1) {
      parts.push(text.substring(lastIndex, index));
      parts.push(<mark key={index} className="bg-yellow-200">{text.substring(index, index + query.length)}</mark>);
      parts.push(text.substring(index + query.length));
      return <>{parts}</>;
    }
    
    return text;
  };

  return (
    <div ref={searchRef} className="relative">
      {!enhanced && (
        <label htmlFor="calculator-search" className="block text-sm font-bold text-gray-900 mb-3">
          Search
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          id="calculator-search"
          type="text"
          placeholder={enhanced ? "Search calculators... (e.g., mortgage, BMI, percentage)" : "e.g., mortgage, BMI, percentage..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          className={`w-full pr-12 text-base border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
            enhanced 
              ? 'px-4 py-4 text-lg rounded-xl shadow-sm' 
              : 'px-3 py-2 text-sm rounded-lg'
          }`}
          aria-label="Search calculators"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={showSuggestions}
        />
        <Search className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${
          enhanced ? 'w-6 h-6' : 'w-4 h-4'
        }`} />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className={`absolute z-50 w-full mt-2 bg-white border border-gray-200 shadow-xl max-h-96 overflow-y-auto ${
            enhanced ? 'rounded-xl' : 'rounded-lg'
          }`}
          role="listbox"
        >
          {suggestions.map((calc, index) => (
            <button
              key={calc.url}
              onClick={() => navigateTo(calc.url)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${
                selectedIndex === index ? 'bg-blue-50' : ''
              }`}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <span className="text-2xl flex-shrink-0">{calc.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {highlightMatch(calc.name, query)}
                </div>
                <div className="text-xs text-gray-500">
                  {calc.category}
                  {calc.keywords.length > 0 && (
                    <span className="ml-2 text-gray-400">
                      • {calc.keywords.slice(0, 3).join(', ')}
                    </span>
                  )}
                </div>
              </div>
              <Calculator className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className={`absolute z-50 w-full mt-2 bg-white border border-gray-200 shadow-xl p-4 ${
          enhanced ? 'rounded-xl' : 'rounded-lg'
        }`}>
          <div className="text-center text-gray-500 text-sm">
            <div className="text-2xl mb-2">🔍</div>
            <div>No calculators found for "{query}"</div>
            <div className="text-xs mt-1 text-gray-400">Try: mortgage, BMI, percentage, loan</div>
          </div>
        </div>
      )}

      {/* Search tips */}
      {!enhanced && !query && (
        <div className="mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1 flex-wrap">
            <TrendingUp className="w-3 h-3" />
            <span>Popular:</span>
            <button onClick={() => navigateTo('/mortgage-calculator')} className="text-blue-600 hover:text-blue-800 hover:underline">mortgage</button>
            <span>,</span>
            <button onClick={() => navigateTo('/bmi-calculator')} className="text-blue-600 hover:text-blue-800 hover:underline">BMI</button>
            <span>,</span>
            <button onClick={() => navigateTo('/loan-calculator')} className="text-blue-600 hover:text-blue-800 hover:underline">loan</button>
            <span>,</span>
            <button onClick={() => navigateTo('/percentage-calculator')} className="text-blue-600 hover:text-blue-800 hover:underline">percentage</button>
          </div>
        </div>
      )}
    </div>
  );
}

