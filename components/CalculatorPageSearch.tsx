'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp } from 'lucide-react';

interface Calculator {
  name: string;
  url: string;
  keywords?: string[];
  category?: string;
  icon?: string;
}

interface CalculatorPageSearchProps {
  calculators: Calculator[];
  onSearchResults: (results: Calculator[]) => void;
  placeholder?: string;
}

export function CalculatorPageSearch({ 
  calculators, 
  onSearchResults,
  placeholder = "Search calculators... (e.g., mortgage, BMI, percentage)"
}: CalculatorPageSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Calculator[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuzzy search algorithm
  const fuzzySearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      onSearchResults(calculators);
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const words = term.split(/\s+/);
    
    const results = calculators
      .map(calc => {
        let score = 0;
        const nameLower = calc.name.toLowerCase();
        const keywordsLower = calc.keywords?.map(k => k.toLowerCase()) || [];
        
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
      .sort((a, b) => b.score - a.score);

    // Update parent component with filtered results
    onSearchResults(results);
    
    // Show top 8 suggestions in dropdown
    setSuggestions(results.slice(0, 8));
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
        // Scroll to calculator in list
        const calcElement = document.querySelector(`a[href="${suggestions[selectedIndex].url}"]`);
        if (calcElement) {
          calcElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          calcElement.classList.add('ring-2', 'ring-blue-500');
          setTimeout(() => {
            calcElement.classList.remove('ring-2', 'ring-blue-500');
          }, 2000);
        }
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
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

  const scrollToCalculator = (url: string) => {
    const calcElement = document.querySelector(`a[href="${url}"]`);
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      calcElement.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
      setTimeout(() => {
        calcElement.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
      }, 2000);
    }
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          className="w-full px-6 py-4 pr-12 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
          aria-label="Search calculators"
          aria-autocomplete="list"
          aria-controls="search-suggestions-page"
          aria-expanded={showSuggestions}
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions-page"
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto"
          role="listbox"
        >
          <div className="p-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
            💡 <strong>Tip:</strong> Click to scroll to calculator, or press Enter
          </div>
          {suggestions.map((calc, index) => (
            <button
              key={calc.url}
              onClick={() => scrollToCalculator(calc.url)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${
                selectedIndex === index ? 'bg-blue-50' : ''
              }`}
              role="option"
              aria-selected={selectedIndex === index}
            >
              {calc.icon && <span className="text-2xl flex-shrink-0">{calc.icon}</span>}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {highlightMatch(calc.name, query)}
                </div>
                {calc.category && (
                  <div className="text-xs text-gray-500">
                    {calc.category}
                    {calc.keywords && calc.keywords.length > 0 && (
                      <span className="ml-2 text-gray-400">
                        • {calc.keywords.slice(0, 3).join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Scroll to →
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-6">
          <div className="text-center text-gray-500">
            <div className="text-3xl mb-2">🔍</div>
            <div className="font-medium">No calculators found for "{query}"</div>
            <div className="text-xs mt-2 text-gray-400">Try: mortgage, BMI, percentage, loan, tax</div>
          </div>
        </div>
      )}

      {/* Search tips */}
      {!query && (
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>Try: mortgage, BMI, salary, retirement, percentage</span>
        </div>
      )}

      {/* Results count */}
      {query && (
        <div className="mt-2 text-sm text-gray-600">
          {suggestions.length > 0 ? (
            <span>Found <strong className="text-blue-600">{suggestions.length}</strong> calculator{suggestions.length !== 1 ? 's' : ''}</span>
          ) : (
            <span className="text-red-600">No matches found</span>
          )}
        </div>
      )}
    </div>
  );
}

