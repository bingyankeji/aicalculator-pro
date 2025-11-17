'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Info } from 'lucide-react';

type CalculationMode = 'simplify' | 'scale' | 'solve' | 'golden' | 'convert';

interface RatioInputs {
  mode: CalculationMode;
  // Simplify mode
  value1: string;
  value2: string;
  // Scale mode
  scaleFactor: string;
  scaleType: 'multiply' | 'divide';
  // Solve mode (a:b = c:x)
  a: string;
  b: string;
  c: string;
  // Golden ratio
  goldenValue: string;
  goldenType: 'width' | 'height';
}

interface RatioResult {
  mode: CalculationMode;
  // Simplify
  simplified?: { num1: number; num2: number; gcd: number };
  original?: { num1: number; num2: number };
  // Scale
  scaled?: { num1: number; num2: number };
  // Solve
  solved?: { x: number };
  // Golden
  golden?: { width: number; height: number };
  // Convert
  percentage?: { value1Percent: number; value2Percent: number };
  decimal?: number;
}

export default function RatioCalculatorNew() {
  const [inputs, setInputs] = useState<RatioInputs>({
    mode: 'simplify',
    value1: '',
    value2: '',
    scaleFactor: '2',
    scaleType: 'multiply',
    a: '',
    b: '',
    c: '',
    goldenValue: '',
    goldenType: 'width',
  });

  const [result, setResult] = useState<RatioResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof RatioInputs, value: string | 'multiply' | 'divide' | 'width' | 'height') => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (inputs.mode === 'simplify' || inputs.mode === 'scale' || inputs.mode === 'convert') {
      const v1 = parseFloat(inputs.value1);
      const v2 = parseFloat(inputs.value2);
      
      if (!inputs.value1 || isNaN(v1) || v1 <= 0) {
        newErrors.value1 = 'Please enter a positive number';
      }
      if (!inputs.value2 || isNaN(v2) || v2 <= 0) {
        newErrors.value2 = 'Please enter a positive number';
      }

      if (inputs.mode === 'scale') {
        const factor = parseFloat(inputs.scaleFactor);
        if (!inputs.scaleFactor || isNaN(factor) || factor <= 0) {
          newErrors.scaleFactor = 'Please enter a positive scale factor';
        }
      }
    }

    if (inputs.mode === 'solve') {
      const a = parseFloat(inputs.a);
      const b = parseFloat(inputs.b);
      const c = parseFloat(inputs.c);
      
      if (!inputs.a || isNaN(a) || a <= 0) {
        newErrors.a = 'Please enter a positive number';
      }
      if (!inputs.b || isNaN(b) || b <= 0) {
        newErrors.b = 'Please enter a positive number';
      }
      if (!inputs.c || isNaN(c) || c <= 0) {
        newErrors.c = 'Please enter a positive number';
      }
    }

    if (inputs.mode === 'golden') {
      const val = parseFloat(inputs.goldenValue);
      if (!inputs.goldenValue || isNaN(val) || val <= 0) {
        newErrors.goldenValue = 'Please enter a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;

    let resultData: RatioResult = { mode: inputs.mode };

    switch (inputs.mode) {
      case 'simplify': {
        const num1 = parseFloat(inputs.value1);
        const num2 = parseFloat(inputs.value2);
        const divisor = gcd(Math.round(num1 * 1000), Math.round(num2 * 1000));
        const simplified1 = Math.round((num1 * 1000) / divisor);
        const simplified2 = Math.round((num2 * 1000) / divisor);
        
        resultData.original = { num1, num2 };
        resultData.simplified = { num1: simplified1, num2: simplified2, gcd: divisor };
        
        // Also calculate percentage
        const total = num1 + num2;
        resultData.percentage = {
          value1Percent: (num1 / total) * 100,
          value2Percent: (num2 / total) * 100,
        };
        break;
      }

      case 'scale': {
        const num1 = parseFloat(inputs.value1);
        const num2 = parseFloat(inputs.value2);
        const factor = parseFloat(inputs.scaleFactor);
        
        resultData.original = { num1, num2 };
        if (inputs.scaleType === 'multiply') {
          resultData.scaled = { num1: num1 * factor, num2: num2 * factor };
        } else {
          resultData.scaled = { num1: num1 / factor, num2: num2 / factor };
        }
        break;
      }

      case 'solve': {
        // Solve a:b = c:x  →  x = (b × c) / a
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        const c = parseFloat(inputs.c);
        const x = (b * c) / a;
        
        resultData.solved = { x };
        break;
      }

      case 'golden': {
        const PHI = 1.618033988749895; // Golden ratio
        const value = parseFloat(inputs.goldenValue);
        
        if (inputs.goldenType === 'width') {
          resultData.golden = { width: value, height: value / PHI };
        } else {
          resultData.golden = { width: value * PHI, height: value };
        }
        break;
      }

      case 'convert': {
        const num1 = parseFloat(inputs.value1);
        const num2 = parseFloat(inputs.value2);
        const total = num1 + num2;
        
        resultData.original = { num1, num2 };
        resultData.percentage = {
          value1Percent: (num1 / total) * 100,
          value2Percent: (num2 / total) * 100,
        };
        resultData.decimal = num1 / num2;
        break;
      }
    }

    setResult(resultData);
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const url = `${baseUrl}/ratio-calculator`;
    setShareUrl(url);
    setShowShareModal(true);
    setCopySuccess(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link. Please copy manually.');
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'email') => {
    const text = 'Free Online Ratio Calculator - Simplify, scale, and solve ratios';
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('Ratio Calculator')}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `ratio-calculation-${new Date().toISOString().split('T')[0]}.png`;
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imageUrl = canvas.toDataURL('image/png', 1.0);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Ratio Calculation</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Ratio Calculation" /></body>
          </html>
        `);
        printWindow.document.close();
        
        const img = printWindow.document.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => printWindow.print(), 250);
          };
        }
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const renderInputSection = () => {
    switch (inputs.mode) {
      case 'simplify':
      case 'convert':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value1">First Value <span className="text-red-500">*</span></Label>
                <input
                  id="value1"
                  type="number"
                  value={inputs.value1}
                  onChange={(e) => handleInputChange('value1', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.value1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="12"
                  step="any"
                />
                {errors.value1 && <p className="text-sm text-red-600">{errors.value1}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="value2">Second Value <span className="text-red-500">*</span></Label>
                <input
                  id="value2"
                  type="number"
                  value={inputs.value2}
                  onChange={(e) => handleInputChange('value2', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.value2 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="8"
                  step="any"
                />
                {errors.value2 && <p className="text-sm text-red-600">{errors.value2}</p>}
              </div>
            </div>
          </>
        );

      case 'scale':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="value1">First Value <span className="text-red-500">*</span></Label>
                <input
                  id="value1"
                  type="number"
                  value={inputs.value1}
                  onChange={(e) => handleInputChange('value1', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.value1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="3"
                  step="any"
                />
                {errors.value1 && <p className="text-sm text-red-600">{errors.value1}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="value2">Second Value <span className="text-red-500">*</span></Label>
                <input
                  id="value2"
                  type="number"
                  value={inputs.value2}
                  onChange={(e) => handleInputChange('value2', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.value2 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="2"
                  step="any"
                />
                {errors.value2 && <p className="text-sm text-red-600">{errors.value2}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Scale Operation</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleInputChange('scaleType', 'multiply')}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    inputs.scaleType === 'multiply'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Multiply ×
                </button>
                <button
                  onClick={() => handleInputChange('scaleType', 'divide')}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    inputs.scaleType === 'divide'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Divide ÷
                </button>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="scaleFactor">Scale Factor <span className="text-red-500">*</span></Label>
              <input
                id="scaleFactor"
                type="number"
                value={inputs.scaleFactor}
                onChange={(e) => handleInputChange('scaleFactor', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.scaleFactor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2"
                step="any"
              />
              {errors.scaleFactor && <p className="text-sm text-red-600">{errors.scaleFactor}</p>}
            </div>
          </>
        );

      case 'solve':
        return (
          <>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Solve for x in the proportion: a : b = c : x</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="a">a <span className="text-red-500">*</span></Label>
                  <input
                    id="a"
                    type="number"
                    value={inputs.a}
                    onChange={(e) => handleInputChange('a', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.a ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="3"
                    step="any"
                  />
                  {errors.a && <p className="text-sm text-red-600">{errors.a}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="b">b <span className="text-red-500">*</span></Label>
                  <input
                    id="b"
                    type="number"
                    value={inputs.b}
                    onChange={(e) => handleInputChange('b', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.b ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="4"
                    step="any"
                  />
                  {errors.b && <p className="text-sm text-red-600">{errors.b}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="c">c <span className="text-red-500">*</span></Label>
                  <input
                    id="c"
                    type="number"
                    value={inputs.c}
                    onChange={(e) => handleInputChange('c', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.c ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="6"
                    step="any"
                  />
                  {errors.c && <p className="text-sm text-red-600">{errors.c}</p>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-lg font-mono">
                  {inputs.a || 'a'} : {inputs.b || 'b'} = {inputs.c || 'c'} : <span className="text-blue-600 font-bold">x</span>
                </p>
              </div>
            </div>
          </>
        );

      case 'golden':
        return (
          <>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-yellow-900">
                  <strong>Golden Ratio (φ):</strong> 1.618033... — Used in art, architecture, and design for aesthetically pleasing proportions.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Known Dimension</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('goldenType', 'width')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      inputs.goldenType === 'width'
                        ? 'border-yellow-600 bg-yellow-50 text-yellow-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Width
                  </button>
                  <button
                    onClick={() => handleInputChange('goldenType', 'height')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      inputs.goldenType === 'height'
                        ? 'border-yellow-600 bg-yellow-50 text-yellow-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Height
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goldenValue">{inputs.goldenType === 'width' ? 'Width' : 'Height'} <span className="text-red-500">*</span></Label>
                <input
                  id="goldenValue"
                  type="number"
                  value={inputs.goldenValue}
                  onChange={(e) => handleInputChange('goldenValue', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                    errors.goldenValue ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1000"
                  step="any"
                />
                {errors.goldenValue && <p className="text-sm text-red-600">{errors.goldenValue}</p>}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Ratio Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Calculation Mode */}
              <div className="space-y-2">
                <Label>Calculation Type</Label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleInputChange('mode', 'simplify')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.mode === 'simplify'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Simplify Ratio
                  </button>
                  <button
                    onClick={() => handleInputChange('mode', 'scale')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.mode === 'scale'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Scale Ratio
                  </button>
                  <button
                    onClick={() => handleInputChange('mode', 'solve')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.mode === 'solve'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Solve Proportion
                  </button>
                  <button
                    onClick={() => handleInputChange('mode', 'golden')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.mode === 'golden'
                        ? 'border-yellow-600 bg-yellow-50 text-yellow-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Golden Ratio
                  </button>
                  <button
                    onClick={() => handleInputChange('mode', 'convert')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.mode === 'convert'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Convert to %
                  </button>
                </div>
              </div>

              {/* Dynamic Input Fields */}
              {renderInputSection()}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    {inputs.mode === 'simplify' && <p><strong>Simplify:</strong> Reduce a ratio to its lowest terms.</p>}
                    {inputs.mode === 'scale' && <p><strong>Scale:</strong> Multiply or divide both parts of a ratio by the same factor.</p>}
                    {inputs.mode === 'solve' && <p><strong>Solve:</strong> Find the missing value in a proportion.</p>}
                    {inputs.mode === 'golden' && <p><strong>Golden Ratio:</strong> φ ≈ 1.618, found in nature, art, and architecture.</p>}
                    {inputs.mode === 'convert' && <p><strong>Convert:</strong> Express ratio as percentages and decimal.</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {result ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Export & Share Buttons */}
              <div className="flex gap-3 justify-end mb-4 flex-wrap">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium text-sm sm:text-base min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium text-sm sm:text-base min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Save
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium text-sm sm:text-base min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>

              {/* Result Content */}
              <div ref={resultRef} className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Ratio Calculation Results</h2>
                  <p className="text-sm text-gray-600">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Simplify Results */}
                {result.mode === 'simplify' && result.simplified && result.original && (
                  <>
                    <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardContent className="p-8 text-center">
                        <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Simplified Ratio</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Original:</p>
                            <p className="text-3xl font-bold text-gray-900">
                              {result.original.num1} : {result.original.num2}
                            </p>
                          </div>
                          <div className="text-4xl text-blue-600">↓</div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Simplified:</p>
                            <p className="text-4xl font-bold text-blue-600">
                              {result.simplified.num1} : {result.simplified.num2}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {result.percentage && (
                      <Card className="shadow-lg border-2 border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                          <CardTitle className="text-purple-900">As Percentages</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">First Value</p>
                              <p className="text-2xl font-bold text-purple-600">{result.percentage.value1Percent.toFixed(2)}%</p>
                            </div>
                            <div className="text-center p-4 bg-pink-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">Second Value</p>
                              <p className="text-2xl font-bold text-pink-600">{result.percentage.value2Percent.toFixed(2)}%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}

                {/* Scale Results */}
                {result.mode === 'scale' && result.scaled && result.original && (
                  <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-8 text-center">
                      <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Scaled Ratio</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Original:</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {result.original.num1} : {result.original.num2}
                          </p>
                        </div>
                        <div className="text-4xl text-green-600">
                          {inputs.scaleType === 'multiply' ? '×' : '÷'} {inputs.scaleFactor}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Result:</p>
                          <p className="text-4xl font-bold text-green-600">
                            {result.scaled.num1} : {result.scaled.num2}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Solve Results */}
                {result.mode === 'solve' && result.solved && (
                  <Card className="shadow-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                    <CardContent className="p-8 text-center">
                      <Calculator className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Solution</h3>
                      <div className="space-y-4">
                        <p className="text-2xl font-mono text-gray-900">
                          {inputs.a} : {inputs.b} = {inputs.c} : <span className="text-orange-600 font-bold">x</span>
                        </p>
                        <div className="text-4xl text-orange-600">↓</div>
                        <div className="bg-white rounded-lg p-6 border-2 border-orange-300">
                          <p className="text-sm text-gray-600 mb-2">x =</p>
                          <p className="text-5xl font-bold text-orange-600">{result.solved.x.toFixed(4)}</p>
                        </div>
                        <div className="text-left bg-gray-50 rounded-lg p-4 mt-4">
                          <p className="text-sm font-semibold text-gray-900 mb-2">Calculation:</p>
                          <p className="text-sm text-gray-700 font-mono">
                            x = (b × c) / a<br />
                            x = ({inputs.b} × {inputs.c}) / {inputs.a}<br />
                            x = {result.solved.x.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Golden Ratio Results */}
                {result.mode === 'golden' && result.golden && (
                  <Card className="shadow-lg border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
                    <CardContent className="p-8 text-center">
                      <div className="text-6xl mb-4">φ</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Golden Ratio Dimensions</h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-6 border-2 border-yellow-300">
                            <p className="text-sm text-gray-600 mb-2">Width</p>
                            <p className="text-3xl font-bold text-yellow-600">{result.golden.width.toFixed(2)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-6 border-2 border-amber-300">
                            <p className="text-sm text-gray-600 mb-2">Height</p>
                            <p className="text-3xl font-bold text-amber-600">{result.golden.height.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="bg-yellow-100 rounded-lg p-4">
                          <p className="text-sm text-yellow-900">
                            <strong>Ratio:</strong> {result.golden.width.toFixed(2)} : {result.golden.height.toFixed(2)} ≈ 1.618 : 1
                          </p>
                        </div>
                        <div className="aspect-[1.618/1] bg-gradient-to-br from-yellow-200 to-amber-200 rounded-lg border-4 border-yellow-600 flex items-center justify-center">
                          <p className="text-sm font-semibold text-yellow-900">Golden Rectangle</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Convert Results */}
                {result.mode === 'convert' && result.percentage && result.original && (
                  <>
                    <Card className="shadow-lg border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
                      <CardContent className="p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ratio Conversions</h3>
                        <div className="space-y-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Original Ratio:</p>
                            <p className="text-4xl font-bold text-gray-900">
                              {result.original.num1} : {result.original.num2}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-6 border-2 border-indigo-300">
                              <p className="text-sm text-gray-600 mb-2">First Value</p>
                              <p className="text-3xl font-bold text-indigo-600">{result.percentage.value1Percent.toFixed(2)}%</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 border-2 border-purple-300">
                              <p className="text-sm text-gray-600 mb-2">Second Value</p>
                              <p className="text-3xl font-bold text-purple-600">{result.percentage.value2Percent.toFixed(2)}%</p>
                            </div>
                          </div>

                          {result.decimal !== undefined && (
                            <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
                              <p className="text-sm text-gray-600 mb-2">As Decimal:</p>
                              <p className="text-3xl font-bold text-blue-600">{result.decimal.toFixed(6)}</p>
                              <p className="text-xs text-gray-500 mt-2">({result.original.num1} ÷ {result.original.num2})</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Select a calculation type, enter your values, and click "Calculate" to see the results</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Share Calculator</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4 text-sm">
              Share this ratio calculator with others.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Share Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copySuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copySuccess ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 text-xs mt-2 font-medium">✓ Link copied to clipboard!</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Share via</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleSocialShare('email')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

