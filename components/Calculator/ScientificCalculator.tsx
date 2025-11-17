'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Delete } from 'lucide-react';

type AngleMode = 'deg' | 'rad';

interface HistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape' || e.key?.toLowerCase() === 'c') {
        handleClear();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, expression]);

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleFunction = (func: string) => {
    try {
      const value = parseFloat(display);
      let result: number;

      switch (func) {
        case 'sin':
          result = angleMode === 'deg' ? Math.sin(value * Math.PI / 180) : Math.sin(value);
          break;
        case 'cos':
          result = angleMode === 'deg' ? Math.cos(value * Math.PI / 180) : Math.cos(value);
          break;
        case 'tan':
          result = angleMode === 'deg' ? Math.tan(value * Math.PI / 180) : Math.tan(value);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case '1/x':
          result = 1 / value;
          break;
        case 'x^2':
          result = value * value;
          break;
        case 'x^3':
          result = value * value * value;
          break;
        case 'e^x':
          result = Math.exp(value);
          break;
        case '10^x':
          result = Math.pow(10, value);
          break;
        case 'abs':
          result = Math.abs(value);
          break;
        case 'factorial':
          result = factorial(value);
          break;
        default:
          return;
      }

      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        setDisplay(formatResult(result));
      }
    } catch {
      setDisplay('Error');
    }
  };

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleConstant = (constant: string) => {
    switch (constant) {
      case 'pi':
        setDisplay(Math.PI.toString());
        break;
      case 'e':
        setDisplay(Math.E.toString());
        break;
    }
  };

  const handleEquals = () => {
    try {
      const fullExpression = expression + display;
      if (!fullExpression.trim()) return;

      // Simple evaluation (you might want to use a more robust parser)
      const result = eval(fullExpression);
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formattedResult = formatResult(result);
        setDisplay(formattedResult);
        
        // Add to history
        const historyItem: HistoryItem = {
          expression: fullExpression,
          result: formattedResult,
          timestamp: Date.now(),
        };
        setHistory([historyItem, ...history].slice(0, 20)); // Keep last 20
        setExpression('');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.000001 && num !== 0) {
      return num.toExponential(6);
    } else if (Math.abs(num) > 999999999) {
      return num.toExponential(6);
    } else {
      const rounded = Math.round(num * 1000000000) / 1000000000;
      return rounded.toString();
    }
  };

  const handleMemory = (action: string) => {
    const value = parseFloat(display);
    if (isNaN(value)) return;

    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        break;
      case 'M+':
        setMemory(memory + value);
        break;
      case 'M-':
        setMemory(memory - value);
        break;
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-4 md:p-6">
        
        {/* Display */}
        <div className="bg-gray-950 rounded-xl p-3 sm:p-4 mb-4">
          {expression && (
            <div className="text-gray-400 text-sm mb-1 font-mono">{expression}</div>
          )}
          <div className="text-white text-right text-2xl sm:text-3xl md:text-4xl font-bold font-mono break-all">
            {display}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-gray-500 text-xs">
              {angleMode === 'deg' ? 'DEG' : 'RAD'} | M: {memory !== 0 ? memory.toString() : '0'}
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="bg-gray-800 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-semibold text-sm">History</h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-red-400 text-xs hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No calculations yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => setDisplay(item.result)}
                    className="bg-gray-700 rounded px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <div className="text-gray-300 text-xs font-mono">{item.expression}</div>
                    <div className="text-white text-sm font-mono">= {item.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Calculator Buttons */}
        <div className="grid grid-cols-6 gap-2">
          
          {/* Row 1: Mode & Memory */}
          <button
            onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
            className="col-span-1 px-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            {angleMode === 'deg' ? 'DEG' : 'RAD'}
          </button>
          <button
            onClick={() => handleMemory('MC')}
            className="col-span-1 px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold text-sm transition-colors"
          >
            MC
          </button>
          <button
            onClick={() => handleMemory('MR')}
            className="col-span-1 px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold text-sm transition-colors"
          >
            MR
          </button>
          <button
            onClick={() => handleMemory('M+')}
            className="col-span-1 px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold text-sm transition-colors"
          >
            M+
          </button>
          <button
            onClick={() => handleMemory('M-')}
            className="col-span-1 px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold text-sm transition-colors"
          >
            M-
          </button>
          <button
            onClick={handleClear}
            className="col-span-1 px-2 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden md:inline">C</span>
          </button>

          {/* Row 2: Trigonometric functions */}
          <button onClick={() => handleFunction('sin')} className="px-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
            sin
          </button>
          <button onClick={() => handleFunction('cos')} className="px-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
            cos
          </button>
          <button onClick={() => handleFunction('tan')} className="px-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
            tan
          </button>
          <button onClick={() => handleFunction('log')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            log
          </button>
          <button onClick={() => handleFunction('ln')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            ln
          </button>
          <button
            onClick={handleBackspace}
            className="px-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-colors flex items-center justify-center"
          >
            <Delete className="w-4 h-4" />
          </button>

          {/* Row 3: Power & Root */}
          <button onClick={() => handleFunction('x^2')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            x²
          </button>
          <button onClick={() => handleFunction('x^3')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            x³
          </button>
          <button onClick={() => handleFunction('sqrt')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            √x
          </button>
          <button onClick={() => handleFunction('1/x')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            1/x
          </button>
          <button onClick={() => handleFunction('factorial')} className="px-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            n!
          </button>
          <button onClick={() => handleOperator('/')} className="px-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xl transition-colors">
            ÷
          </button>

          {/* Row 4: Numbers 7-9 */}
          <button onClick={() => handleNumber('7')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            7
          </button>
          <button onClick={() => handleNumber('8')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            8
          </button>
          <button onClick={() => handleNumber('9')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            9
          </button>
          <button onClick={() => handleFunction('e^x')} className="px-2 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
            eˣ
          </button>
          <button onClick={() => handleFunction('10^x')} className="px-2 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
            10ˣ
          </button>
          <button onClick={() => handleOperator('*')} className="px-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xl transition-colors">
            ×
          </button>

          {/* Row 5: Numbers 4-6 */}
          <button onClick={() => handleNumber('4')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            4
          </button>
          <button onClick={() => handleNumber('5')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            5
          </button>
          <button onClick={() => handleNumber('6')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            6
          </button>
          <button onClick={() => handleConstant('pi')} className="px-2 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
            π
          </button>
          <button onClick={() => handleConstant('e')} className="px-2 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
            e
          </button>
          <button onClick={() => handleOperator('-')} className="px-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xl transition-colors">
            −
          </button>

          {/* Row 6: Numbers 1-3 */}
          <button onClick={() => handleNumber('1')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            1
          </button>
          <button onClick={() => handleNumber('2')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            2
          </button>
          <button onClick={() => handleNumber('3')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            3
          </button>
          <button onClick={() => handleFunction('abs')} className="px-2 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
            |x|
          </button>
          <button onClick={() => handleOperator('%')} className="px-2 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xl transition-colors">
            %
          </button>
          <button onClick={() => handleOperator('+')} className="px-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xl transition-colors">
            +
          </button>

          {/* Row 7: Zero and Equals */}
          <button onClick={() => handleNumber('0')} className="col-span-2 px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            0
          </button>
          <button onClick={handleDecimal} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            .
          </button>
          <button onClick={() => handleNumber('00')} className="px-2 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl transition-colors">
            00
          </button>
          <button onClick={handleEquals} className="col-span-2 px-2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-xl transition-colors">
            =
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-gray-400 text-xs">
          <p>Keyboard supported: 0-9, +, -, *, /, Enter, Esc, Backspace</p>
        </div>
      </div>
    </div>
  );
}

