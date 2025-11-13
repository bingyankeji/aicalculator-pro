'use client';

import { useState, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

type CalculationMode = 'what-percent' | 'percent-of' | 'percent-change' | 'find-whole' | 'percent-difference';

interface PercentageInputs {
  mode: CalculationMode;
  value1: number;
  value2: number;
  isIncrease: boolean; // for percent-change mode
}

interface CalculationResult {
  mode: CalculationMode;
  result: number;
  explanation: string;
  formula: string;
  examples: string[];
}

export function PercentageCalculator() {
  const [inputs, setInputs] = useState<PercentageInputs>({
    mode: 'percent-of',
    value1: 25,
    value2: 100,
    isIncrease: true,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-calculate on mount and when inputs change
  useEffect(() => {
    calculatePercentage();
  }, []);

  // Load from URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('m') as CalculationMode;
      const v1 = params.get('v1');
      const v2 = params.get('v2');
      const inc = params.get('inc');

      if (mode && v1 && v2) {
        const customInputs: PercentageInputs = {
          mode: mode,
          value1: parseFloat(v1),
          value2: parseFloat(v2),
          isIncrease: inc === 'true',
        };
        setInputs(customInputs);
        calculatePercentageWithInputs(customInputs);
      }
    }
  }, []);

  const calculatePercentageWithInputs = (customInputs: PercentageInputs) => {
    const { mode, value1, value2, isIncrease } = customInputs;

    let calculatedResult: number;
    let explanation: string;
    let formula: string;
    let examples: string[];

    if (mode === 'what-percent') {
      // What percent of value2 is value1?
      calculatedResult = (value1 / value2) * 100;
      explanation = `${value1} is ${calculatedResult.toFixed(2)}% of ${value2}`;
      formula = `(${value1} ÷ ${value2}) × 100 = ${calculatedResult.toFixed(2)}%`;
      examples = [
        `25 is 25% of 100`,
        `50 is 50% of 100`,
        `75 is 75% of 100`,
      ];
    } else if (mode === 'percent-of') {
      // What is value1% of value2?
      calculatedResult = (value1 / 100) * value2;
      explanation = `${value1}% of ${value2} is ${calculatedResult.toFixed(2)}`;
      formula = `(${value1} ÷ 100) × ${value2} = ${calculatedResult.toFixed(2)}`;
      examples = [
        `20% of 100 is 20`,
        `50% of 200 is 100`,
        `15% of 300 is 45`,
      ];
    } else if (mode === 'find-whole') {
      // value1 is value2% of what?
      calculatedResult = (value1 / value2) * 100;
      explanation = `${value1} is ${value2}% of ${calculatedResult.toFixed(2)}`;
      formula = `${value1} ÷ (${value2} ÷ 100) = ${calculatedResult.toFixed(2)}`;
      examples = [
        `25 is 25% of 100`,
        `50 is 25% of 200`,
        `75 is 50% of 150`,
      ];
    } else if (mode === 'percent-difference') {
      // Percentage difference between value1 and value2
      const difference = Math.abs(value1 - value2);
      const average = (value1 + value2) / 2;
      calculatedResult = (difference / average) * 100;
      explanation = `The percentage difference between ${value1} and ${value2} is ${calculatedResult.toFixed(2)}%`;
      formula = `|${value1} - ${value2}| ÷ ((${value1} + ${value2}) ÷ 2) × 100 = ${calculatedResult.toFixed(2)}%`;
      examples = [
        `Difference between 100 and 120 is 18.18%`,
        `Difference between 50 and 75 is 40%`,
        `Difference between 200 and 180 is 10.53%`,
      ];
    } else {
      // Increase/Decrease value1 by value2%
      const change = (value2 / 100) * value1;
      calculatedResult = isIncrease ? value1 + change : value1 - change;
      const action = isIncrease ? 'increased' : 'decreased';
      explanation = `${value1} ${action} by ${value2}% is ${calculatedResult.toFixed(2)}`;
      formula = `${value1} ${isIncrease ? '+' : '-'} (${value1} × ${value2} ÷ 100) = ${calculatedResult.toFixed(2)}`;
      examples = [
        isIncrease ? `100 increased by 20% is 120` : `100 decreased by 20% is 80`,
        isIncrease ? `200 increased by 50% is 300` : `200 decreased by 50% is 100`,
        isIncrease ? `50 increased by 10% is 55` : `50 decreased by 10% is 45`,
      ];
    }

    setResult({
      mode,
      result: calculatedResult,
      explanation,
      formula,
      examples,
    });
  };

  const calculatePercentage = () => {
    calculatePercentageWithInputs(inputs);
  };

  const handleShare = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const url = `${baseUrl}/percentage-calculator?m=${inputs.mode}&v1=${inputs.value1}&v2=${inputs.value2}&inc=${inputs.isIncrease}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const text = `Check out this percentage calculation: ${result?.explanation}`;
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('Percentage Calculation')}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `percentage-calculation-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imageUrl = canvas.toDataURL('image/png', 1.0);
      const printWindow = window.open('', '_blank');

      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Percentage Calculation Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Percentage Calculation Report" /></body>
          </html>
        `);
        printWindow.document.close();

        const img = printWindow.document.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => {
              printWindow.print();
            }, 250);
          };
        }
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const getModeLabel = (mode: CalculationMode): string => {
    switch (mode) {
      case 'what-percent':
        return 'What percent of Y is X?';
      case 'percent-of':
        return 'What is X% of Y?';
      case 'find-whole':
        return 'X is Y% of what?';
      case 'percent-difference':
        return 'Percentage Difference between X and Y';
      case 'percent-change':
        return 'Increase/Decrease X by Y%';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Side - All Calculators (3 columns) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Calculator 1: Percentage Calculator in Common Phrases */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Percentage Calculator in Common Phrases</h3>
              <button
                onClick={() => {
                  (document.getElementById('phrase-1-val1') as HTMLInputElement).value = '25';
                  (document.getElementById('phrase-1-val2') as HTMLInputElement).value = '100';
                  (document.getElementById('phrase-2-val1') as HTMLInputElement).value = '25';
                  (document.getElementById('phrase-2-val2') as HTMLInputElement).value = '100';
                  (document.getElementById('phrase-3-val1') as HTMLInputElement).value = '25';
                  (document.getElementById('phrase-3-val2') as HTMLInputElement).value = '25';
                  setResult(null);
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-700">what is</span>
                <input
                  type="number"
                  defaultValue={25}
                  className="w-20 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                  id="phrase-1-val1"
                />
                <span className="text-gray-700">% of</span>
                <input
                  type="number"
                  defaultValue={100}
                  className="w-24 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                  id="phrase-1-val2"
                />
                <button
                  onClick={() => {
                    const v1 = parseFloat((document.getElementById('phrase-1-val1') as HTMLInputElement).value) || 0;
                    const v2 = parseFloat((document.getElementById('phrase-1-val2') as HTMLInputElement).value) || 0;
                    const newInputs = { ...inputs, mode: 'percent-of' as CalculationMode, value1: v1, value2: v2 };
                    setInputs(newInputs);
                    calculatePercentageWithInputs(newInputs);
                  }}
                  className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-sm"
                >
                  Calculate
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <input
                  type="number"
                  defaultValue={25}
                  className="w-20 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                  id="phrase-2-val1"
                />
                <span className="text-gray-700">is what % of</span>
                <input
                  type="number"
                  defaultValue={100}
                  className="w-24 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                  id="phrase-2-val2"
                />
                <button
                  onClick={() => {
                    const v1 = parseFloat((document.getElementById('phrase-2-val1') as HTMLInputElement).value) || 0;
                    const v2 = parseFloat((document.getElementById('phrase-2-val2') as HTMLInputElement).value) || 0;
                    const newInputs = { ...inputs, mode: 'what-percent' as CalculationMode, value1: v1, value2: v2 };
                    setInputs(newInputs);
                    calculatePercentageWithInputs(newInputs);
                  }}
                  className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-sm"
                >
                  Calculate
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <input
                  type="number"
                  defaultValue={25}
                  className="w-20 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                  id="phrase-3-val1"
                />
                <span className="text-gray-700">is</span>
                <input
                  type="number"
                  defaultValue={25}
                  className="w-20 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                  id="phrase-3-val2"
                />
                <span className="text-gray-700">% of what</span>
                <button
                  onClick={() => {
                    const v1 = parseFloat((document.getElementById('phrase-3-val1') as HTMLInputElement).value) || 0;
                    const v2 = parseFloat((document.getElementById('phrase-3-val2') as HTMLInputElement).value) || 0;
                    const newInputs = { ...inputs, mode: 'find-whole' as CalculationMode, value1: v1, value2: v2 };
                    setInputs(newInputs);
                    calculatePercentageWithInputs(newInputs);
                  }}
                  className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-sm"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          {/* Calculator 2: Percentage Difference */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Percentage Difference Calculator</h3>
              <button
                onClick={() => {
                  (document.getElementById('diff-val1') as HTMLInputElement).value = '100';
                  (document.getElementById('diff-val2') as HTMLInputElement).value = '120';
                  setResult(null);
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <label className="text-gray-700 font-medium w-16">Value 1</label>
                <input
                  type="number"
                  defaultValue={100}
                  className="flex-1 px-3 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                  id="diff-val1"
                />
              </div>
              <div className="flex items-center gap-3 text-sm">
                <label className="text-gray-700 font-medium w-16">Value 2</label>
                <input
                  type="number"
                  defaultValue={120}
                  className="flex-1 px-3 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                  id="diff-val2"
                />
              </div>
              <button
                onClick={() => {
                  const v1 = parseFloat((document.getElementById('diff-val1') as HTMLInputElement).value) || 0;
                  const v2 = parseFloat((document.getElementById('diff-val2') as HTMLInputElement).value) || 0;
                  const newInputs = { ...inputs, mode: 'percent-difference' as CalculationMode, value1: v1, value2: v2 };
                  setInputs(newInputs);
                  calculatePercentageWithInputs(newInputs);
                }}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-sm"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Calculator 3: Percentage Change */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Percentage Change Calculator</h3>
              <button
                onClick={() => {
                  (document.getElementById('change-val1') as HTMLInputElement).value = '100';
                  (document.getElementById('change-val2') as HTMLInputElement).value = '20';
                  (document.getElementById('change-operation') as HTMLSelectElement).value = 'increase';
                  setResult(null);
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <input
                type="number"
                defaultValue={100}
                className="w-24 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                id="change-val1"
              />
              <select
                id="change-operation"
                className="px-3 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              >
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
              </select>
              <input
                type="number"
                defaultValue={20}
                className="w-20 px-2 py-1.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
                id="change-val2"
              />
              <span className="text-gray-700">%</span>
              <button
                onClick={() => {
                  const v1 = parseFloat((document.getElementById('change-val1') as HTMLInputElement).value) || 0;
                  const v2 = parseFloat((document.getElementById('change-val2') as HTMLInputElement).value) || 0;
                  const op = (document.getElementById('change-operation') as HTMLSelectElement).value;
                  const newInputs = { ...inputs, mode: 'percent-change' as CalculationMode, value1: v1, value2: v2, isIncrease: op === 'increase' };
                  setInputs(newInputs);
                  calculatePercentageWithInputs(newInputs);
                }}
                className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-sm"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Results Panel (2 columns) */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6 space-y-4">
              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap justify-between">
                <button
                  onClick={() => {
                    // Clear all inputs
                    (document.getElementById('phrase-1-val1') as HTMLInputElement).value = '25';
                    (document.getElementById('phrase-1-val2') as HTMLInputElement).value = '100';
                    (document.getElementById('phrase-2-val1') as HTMLInputElement).value = '25';
                    (document.getElementById('phrase-2-val2') as HTMLInputElement).value = '100';
                    (document.getElementById('phrase-3-val1') as HTMLInputElement).value = '25';
                    (document.getElementById('phrase-3-val2') as HTMLInputElement).value = '25';
                    (document.getElementById('diff-val1') as HTMLInputElement).value = '100';
                    (document.getElementById('diff-val2') as HTMLInputElement).value = '120';
                    (document.getElementById('change-val1') as HTMLInputElement).value = '100';
                    (document.getElementById('change-val2') as HTMLInputElement).value = '20';
                    (document.getElementById('change-operation') as HTMLSelectElement).value = 'increase';
                    setResult(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </button>
                <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                </div>
              </div>

              {/* Result Content */}
              <div ref={resultRef} className="space-y-4 bg-white p-8 rounded-xl shadow-lg">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Percentage Calculation Result</h3>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Main Result */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
                  <div className="text-sm font-medium opacity-90 mb-2">
                    {getModeLabel(result.mode)}
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {(inputs.mode === 'what-percent' || inputs.mode === 'percent-difference') 
                      ? `${result.result.toFixed(2)}%` 
                      : result.result.toFixed(2)}
                  </div>
                  <div className="text-sm opacity-90">
                    {result.explanation}
                  </div>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📐</span>
                    Formula
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-900">
                    {result.formula}
                  </div>
                </div>

                {/* Examples */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span>
                    Examples
                  </h4>
                  <ul className="space-y-2">
                    {result.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span className="text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🔢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Results Will Appear Here</h3>
              <p className="text-gray-600">
                Select any calculator on the left, enter values, and click Calculate to see instant results.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Share Calculation</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Share this calculation with others. They'll see your inputs and results automatically.
            </p>

            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {copySuccess ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialShare('facebook')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                onClick={() => handleSocialShare('twitter')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>
              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={() => handleSocialShare('email')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

