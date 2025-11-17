'use client';

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Info, AlertCircle } from 'lucide-react';

type CalculationMode = 'single' | 'multiple';

interface SingleMeasurement {
  experimental: string;
  theoretical: string;
}

interface MultipleMeasurements {
  theoretical: string;
  measurements: string[];
}

interface ErrorResult {
  mode: CalculationMode;
  // Single measurement
  experimental?: number;
  theoretical?: number;
  absoluteError?: number;
  percentError?: number;
  relativeError?: number;
  // Multiple measurements
  measurements?: number[];
  average?: number;
  standardDeviation?: number;
  averageAbsoluteError?: number;
  averagePercentError?: number;
  errorRange?: { min: number; max: number };
  // Precision analysis
  precision?: 'excellent' | 'good' | 'acceptable' | 'poor' | 'unacceptable';
  accuracy?: string;
}

export default function PercentErrorCalculator() {
  const [mode, setMode] = useState<CalculationMode>('single');
  const [singleInputs, setSingleInputs] = useState<SingleMeasurement>({
    experimental: '',
    theoretical: '',
  });
  const [multipleInputs, setMultipleInputs] = useState<MultipleMeasurements>({
    theoretical: '',
    measurements: ['', '', ''],
  });
  const [result, setResult] = useState<ErrorResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSingleInputChange = (field: keyof SingleMeasurement, value: string) => {
    setSingleInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMultipleInputChange = (field: 'theoretical' | 'measurement', value: string, index?: number) => {
    if (field === 'theoretical') {
      setMultipleInputs(prev => ({ ...prev, theoretical: value }));
      if (errors.theoretical) {
        setErrors(prev => ({ ...prev, theoretical: '' }));
      }
    } else if (index !== undefined) {
      const newMeasurements = [...multipleInputs.measurements];
      newMeasurements[index] = value;
      setMultipleInputs(prev => ({ ...prev, measurements: newMeasurements }));
      if (errors[`measurement${index}`]) {
        setErrors(prev => ({ ...prev, [`measurement${index}`]: '' }));
      }
    }
  };

  const addMeasurement = () => {
    if (multipleInputs.measurements.length < 20) {
      setMultipleInputs(prev => ({
        ...prev,
        measurements: [...prev.measurements, ''],
      }));
    }
  };

  const removeMeasurement = (index: number) => {
    if (multipleInputs.measurements.length > 2) {
      const newMeasurements = multipleInputs.measurements.filter((_, i) => i !== index);
      setMultipleInputs(prev => ({ ...prev, measurements: newMeasurements }));
    }
  };

  const validateSingle = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    const exp = parseFloat(singleInputs.experimental);
    const theo = parseFloat(singleInputs.theoretical);

    if (!singleInputs.experimental || isNaN(exp)) {
      newErrors.experimental = 'Please enter a valid experimental value';
    }
    if (!singleInputs.theoretical || isNaN(theo)) {
      newErrors.theoretical = 'Please enter a valid theoretical value';
    }
    if (theo === 0 && !newErrors.theoretical) {
      newErrors.theoretical = 'Theoretical value cannot be zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMultiple = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    const theo = parseFloat(multipleInputs.theoretical);
    if (!multipleInputs.theoretical || isNaN(theo)) {
      newErrors.theoretical = 'Please enter a valid theoretical value';
    } else if (theo === 0) {
      newErrors.theoretical = 'Theoretical value cannot be zero';
    }

    const validMeasurements = multipleInputs.measurements.filter(m => m.trim() !== '');
    if (validMeasurements.length < 2) {
      newErrors.measurements = 'Please enter at least 2 measurements';
    } else {
      validMeasurements.forEach((m, i) => {
        if (isNaN(parseFloat(m))) {
          newErrors[`measurement${i}`] = 'Invalid value';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPrecisionLevel = (percentError: number): 'excellent' | 'good' | 'acceptable' | 'poor' | 'unacceptable' => {
    const absError = Math.abs(percentError);
    if (absError <= 1) return 'excellent';
    if (absError <= 5) return 'good';
    if (absError <= 10) return 'acceptable';
    if (absError <= 20) return 'poor';
    return 'unacceptable';
  };

  const getPrecisionColor = (precision: string): string => {
    switch (precision) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-300';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-300';
      case 'acceptable': return 'text-yellow-600 bg-yellow-50 border-yellow-300';
      case 'poor': return 'text-orange-600 bg-orange-50 border-orange-300';
      case 'unacceptable': return 'text-red-600 bg-red-50 border-red-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-300';
    }
  };

  const calculateSingle = () => {
    if (!validateSingle()) return;

    const experimental = parseFloat(singleInputs.experimental);
    const theoretical = parseFloat(singleInputs.theoretical);

    const absoluteError = experimental - theoretical;
    const percentError = (absoluteError / theoretical) * 100;
    const relativeError = Math.abs(absoluteError / theoretical);
    const precision = getPrecisionLevel(percentError);

    let accuracy = '';
    if (Math.abs(percentError) <= 1) {
      accuracy = 'Highly accurate measurement';
    } else if (Math.abs(percentError) <= 5) {
      accuracy = 'Good accuracy';
    } else if (Math.abs(percentError) <= 10) {
      accuracy = 'Acceptable accuracy for most applications';
    } else if (Math.abs(percentError) <= 20) {
      accuracy = 'Low accuracy - review measurement method';
    } else {
      accuracy = 'Very low accuracy - significant systematic error likely';
    }

    setResult({
      mode: 'single',
      experimental,
      theoretical,
      absoluteError,
      percentError,
      relativeError,
      precision,
      accuracy,
    });
  };

  const calculateMultiple = () => {
    if (!validateMultiple()) return;

    const theoretical = parseFloat(multipleInputs.theoretical);
    const measurements = multipleInputs.measurements
      .filter(m => m.trim() !== '')
      .map(m => parseFloat(m));

    // Calculate average
    const average = measurements.reduce((sum, m) => sum + m, 0) / measurements.length;

    // Calculate standard deviation
    const squaredDiffs = measurements.map(m => Math.pow(m - average, 2));
    const variance = squaredDiffs.reduce((sum, d) => sum + d, 0) / measurements.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate errors
    const absoluteError = average - theoretical;
    const percentError = (absoluteError / theoretical) * 100;

    // Calculate error range
    const errors = measurements.map(m => Math.abs(((m - theoretical) / theoretical) * 100));
    const errorRange = {
      min: Math.min(...errors),
      max: Math.max(...errors),
    };

    const precision = getPrecisionLevel(percentError);

    let accuracy = '';
    if (Math.abs(percentError) <= 1) {
      accuracy = 'Highly accurate measurements';
    } else if (Math.abs(percentError) <= 5) {
      accuracy = 'Good average accuracy';
    } else if (Math.abs(percentError) <= 10) {
      accuracy = 'Acceptable average accuracy';
    } else if (Math.abs(percentError) <= 20) {
      accuracy = 'Low average accuracy - review measurement procedure';
    } else {
      accuracy = 'Very low average accuracy - systematic error present';
    }

    setResult({
      mode: 'multiple',
      theoretical,
      measurements,
      average,
      standardDeviation,
      averageAbsoluteError: absoluteError,
      averagePercentError: percentError,
      errorRange,
      precision,
      accuracy,
    });
  };

  const calculate = () => {
    if (mode === 'single') {
      calculateSingle();
    } else {
      calculateMultiple();
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const url = `${baseUrl}/percent-error-calculator`;
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
    const text = 'Free Online Percent Error Calculator - Calculate measurement accuracy';
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
        url = `mailto:?subject=${encodeURIComponent('Percent Error Calculator')}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `percent-error-${new Date().toISOString().split('T')[0]}.png`;
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
      await new Promise(resolve => setTimeout(resolve, 100));
      
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
              <title>Percent Error Calculation</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Percent Error Calculation" /></body>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                Percent Error Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Calculation Mode */}
              <div className="space-y-2">
                <Label>Measurement Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode('single')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      mode === 'single'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Single Measurement
                  </button>
                  <button
                    onClick={() => setMode('multiple')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      mode === 'multiple'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Multiple Measurements
                  </button>
                </div>
              </div>

              {/* Single Measurement Inputs */}
              {mode === 'single' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="theoretical">Theoretical Value <span className="text-red-500">*</span></Label>
                    <input
                      id="theoretical"
                      type="number"
                      value={singleInputs.theoretical}
                      onChange={(e) => handleSingleInputChange('theoretical', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.theoretical ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="100"
                      step="any"
                    />
                    {errors.theoretical && <p className="text-sm text-red-600">{errors.theoretical}</p>}
                    <p className="text-xs text-gray-500">Expected or true value</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experimental">Experimental Value <span className="text-red-500">*</span></Label>
                    <input
                      id="experimental"
                      type="number"
                      value={singleInputs.experimental}
                      onChange={(e) => handleSingleInputChange('experimental', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.experimental ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="98.5"
                      step="any"
                    />
                    {errors.experimental && <p className="text-sm text-red-600">{errors.experimental}</p>}
                    <p className="text-xs text-gray-500">Measured or observed value</p>
                  </div>
                </>
              )}

              {/* Multiple Measurements Inputs */}
              {mode === 'multiple' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="theoretical-multi">Theoretical Value <span className="text-red-500">*</span></Label>
                    <input
                      id="theoretical-multi"
                      type="number"
                      value={multipleInputs.theoretical}
                      onChange={(e) => handleMultipleInputChange('theoretical', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.theoretical ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="100"
                      step="any"
                    />
                    {errors.theoretical && <p className="text-sm text-red-600">{errors.theoretical}</p>}
                    <p className="text-xs text-gray-500">Expected or true value</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Measurements <span className="text-red-500">*</span></Label>
                      <button
                        onClick={addMeasurement}
                        disabled={multipleInputs.measurements.length >= 20}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium disabled:text-gray-400"
                      >
                        + Add
                      </button>
                    </div>
                    {errors.measurements && <p className="text-sm text-red-600">{errors.measurements}</p>}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {multipleInputs.measurements.map((measurement, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="number"
                            value={measurement}
                            onChange={(e) => handleMultipleInputChange('measurement', e.target.value, index)}
                            className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                              errors[`measurement${index}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={`Measurement ${index + 1}`}
                            step="any"
                          />
                          {multipleInputs.measurements.length > 2 && (
                            <button
                              onClick={() => removeMeasurement(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Enter at least 2 measurements</p>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-purple-900">
                    <p className="font-semibold mb-1">Formula:</p>
                    <p className="font-mono text-xs bg-white px-2 py-1 rounded">
                      % Error = (|Experimental - Theoretical| / Theoretical) × 100%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Error
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Analysis Results</h2>
                  <p className="text-sm text-gray-600">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Single Measurement Results */}
                {result.mode === 'single' && result.percentError !== undefined && (
                  <>
                    <Card className={`shadow-lg border-2 ${getPrecisionColor(result.precision || '')}`}>
                      <CardContent className="p-8 text-center">
                        <TrendingUp className="h-16 w-16 mx-auto mb-4" style={{ color: 'currentColor' }} />
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Percent Error</h3>
                        <p className="text-6xl font-bold mb-2" style={{ color: 'currentColor' }}>
                          {Math.abs(result.percentError).toFixed(4)}%
                        </p>
                        <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
                          {result.precision}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="shadow-lg border-2 border-blue-200">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardTitle className="text-blue-900">Values</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Theoretical:</span>
                            <span className="font-bold text-gray-900">{result.theoretical}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Experimental:</span>
                            <span className="font-bold text-gray-900">{result.experimental}</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between items-center">
                            <span className="text-gray-600">Difference:</span>
                            <span className={`font-bold ${result.absoluteError && result.absoluteError > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {result.absoluteError && result.absoluteError > 0 ? '+' : ''}{result.absoluteError?.toFixed(4)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-2 border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                          <CardTitle className="text-purple-900">Error Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Absolute Error:</span>
                            <span className="font-bold text-gray-900">{result.absoluteError?.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Relative Error:</span>
                            <span className="font-bold text-gray-900">{result.relativeError?.toFixed(6)}</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between items-center">
                            <span className="text-gray-600">Percent Error:</span>
                            <span className="font-bold text-purple-600">{result.percentError?.toFixed(4)}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="shadow-lg border-2 border-gray-200">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <CardTitle className="flex items-center gap-2 text-gray-900">
                          <AlertCircle className="h-5 w-5" />
                          Accuracy Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-gray-700 text-lg">{result.accuracy}</p>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Multiple Measurements Results */}
                {result.mode === 'multiple' && result.measurements && (
                  <>
                    <Card className={`shadow-lg border-2 ${getPrecisionColor(result.precision || '')}`}>
                      <CardContent className="p-8 text-center">
                        <TrendingUp className="h-16 w-16 mx-auto mb-4" style={{ color: 'currentColor' }} />
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Average Percent Error</h3>
                        <p className="text-6xl font-bold mb-2" style={{ color: 'currentColor' }}>
                          {result.averagePercentError !== undefined ? Math.abs(result.averagePercentError).toFixed(4) : '0'}%
                        </p>
                        <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
                          {result.precision}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="shadow-lg border-2 border-blue-200">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardTitle className="text-blue-900">Measurement Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Theoretical:</span>
                            <span className="font-bold text-gray-900">{result.theoretical}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Average Measured:</span>
                            <span className="font-bold text-gray-900">{result.average?.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Std Deviation (σ):</span>
                            <span className="font-bold text-gray-900">{result.standardDeviation?.toFixed(4)}</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between items-center">
                            <span className="text-gray-600">Sample Size:</span>
                            <span className="font-bold text-gray-900">{result.measurements.length}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-2 border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                          <CardTitle className="text-purple-900">Error Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Absolute Error:</span>
                            <span className="font-bold text-gray-900">{result.averageAbsoluteError?.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Percent Error:</span>
                            <span className="font-bold text-purple-600">{result.averagePercentError?.toFixed(4)}%</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-600">Error Range:</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Min:</span>
                                <span className="font-mono">{result.errorRange?.min.toFixed(4)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Max:</span>
                                <span className="font-mono">{result.errorRange?.max.toFixed(4)}%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="shadow-lg border-2 border-gray-200">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <CardTitle className="text-gray-900">All Measurements</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {result.measurements.map((m, i) => {
                            const error = ((m - (result.theoretical || 0)) / (result.theoretical || 1)) * 100;
                            return (
                              <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1">#{i + 1}</div>
                                <div className="font-bold text-gray-900">{m.toFixed(4)}</div>
                                <div className={`text-xs ${error > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {error > 0 ? '+' : ''}{error.toFixed(2)}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-2 border-gray-200">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <CardTitle className="flex items-center gap-2 text-gray-900">
                          <AlertCircle className="h-5 w-5" />
                          Accuracy Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-gray-700 text-lg">{result.accuracy}</p>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Precision Guide */}
                <Card className="shadow-lg border-2 border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="text-indigo-900">Precision Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-24 px-2 py-1 bg-green-50 border border-green-300 rounded text-green-700 font-semibold text-center">
                          ≤ 1%
                        </div>
                        <span className="text-gray-700">Excellent - High precision measurement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 px-2 py-1 bg-blue-50 border border-blue-300 rounded text-blue-700 font-semibold text-center">
                          1-5%
                        </div>
                        <span className="text-gray-700">Good - Acceptable for most applications</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 px-2 py-1 bg-yellow-50 border border-yellow-300 rounded text-yellow-700 font-semibold text-center">
                          5-10%
                        </div>
                        <span className="text-gray-700">Acceptable - May need improvement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 px-2 py-1 bg-orange-50 border border-orange-300 rounded text-orange-700 font-semibold text-center">
                          10-20%
                        </div>
                        <span className="text-gray-700">Poor - Review measurement method</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 px-2 py-1 bg-red-50 border border-red-300 rounded text-red-700 font-semibold text-center">
                          &gt; 20%
                        </div>
                        <span className="text-gray-700">Unacceptable - Systematic error likely</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your values and click "Calculate Error" to analyze measurement accuracy</p>
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
              Share this percent error calculator with others.
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

