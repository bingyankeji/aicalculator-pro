'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Play, SkipForward, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface DivisionStep {
  position: number;
  digit: string;
  partial: string;
  multiply: string;
  subtract: string;
  remainder: string;
  description: string;
}

interface DivisionResult {
  quotient: string;
  remainder: string;
  isExact: boolean;
  steps: DivisionStep[];
  dividend: string;
  divisor: string;
  mixedFraction: string;
  decimalResult: string;
}

export default function LongDivisionCalculator() {
  const [dividend, setDividend] = useState('1234');
  const [divisor, setDivisor] = useState('12');
  const [result, setResult] = useState<DivisionResult | null>(null);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/long-division-calculator',
    getShareParams: () => ({
      dividend,
      divisor,
    }),
    getShareText: () => {
      if (result) {
        return `${dividend} ÷ ${divisor} = ${result.quotient}${result.remainder !== '0' ? ` R ${result.remainder}` : ''}`;
      }
      return 'Calculate long division with step-by-step solution!';
    },
  });

  const performLongDivision = (dividendStr: string, divisorStr: string): DivisionResult => {
    const steps: DivisionStep[] = [];
    let quotient = '';
    let currentDividend = '';
    let position = 0;
    
    const dividendInt = parseInt(dividendStr);
    const divisorInt = parseInt(divisorStr);
    
    // Process each digit of dividend
    for (let i = 0; i < dividendStr.length; i++) {
      currentDividend += dividendStr[i];
      const currentNum = parseInt(currentDividend);
      
      // Calculate how many times divisor goes into current number
      const quotientDigit = Math.floor(currentNum / divisorInt);
      quotient += quotientDigit.toString();
      
      // Calculate product and remainder
      const product = quotientDigit * divisorInt;
      const remainder = currentNum - product;
      
      steps.push({
        position: i,
        digit: dividendStr[i],
        partial: currentDividend,
        multiply: product.toString(),
        subtract: remainder.toString(),
        remainder: remainder.toString(),
        description: `Bring down ${dividendStr[i]}. ${currentNum} ÷ ${divisorInt} = ${quotientDigit}. ${divisorInt} × ${quotientDigit} = ${product}. ${currentNum} - ${product} = ${remainder}.`
      });
      
      // Update current dividend to remainder
      currentDividend = remainder === 0 ? '' : remainder.toString();
    }
    
    // Remove leading zeros from quotient
    quotient = quotient.replace(/^0+/, '') || '0';
    
    const finalRemainder = currentDividend || '0';
    
    // Calculate mixed fraction
    const remainderNum = parseInt(finalRemainder);
    const mixedFraction = remainderNum === 0 
      ? quotient 
      : `${quotient} ${remainderNum}/${divisorInt}`;
    
    // Calculate decimal result (up to 10 decimal places)
    const decimalResult = (dividendInt / divisorInt).toFixed(10).replace(/\.?0+$/, '');
    
    return {
      quotient,
      remainder: finalRemainder,
      isExact: finalRemainder === '0',
      steps,
      dividend: dividendStr,
      divisor: divisorStr,
      mixedFraction,
      decimalResult,
    };
  };

  const calculate = () => {
    setError('');
    setCurrentStep(0);
    setShowAnimation(false);
    
    const dividendNum = parseFloat(dividend);
    const divisorNum = parseFloat(divisor);
    
    if (!dividend || isNaN(dividendNum) || dividendNum < 0) {
      setError('Please enter a valid dividend (non-negative number)');
      return;
    }
    
    if (!divisor || isNaN(divisorNum) || divisorNum === 0) {
      setError('Please enter a valid divisor (cannot be zero)');
      return;
    }
    
    if (divisorNum < 0) {
      setError('Divisor must be positive for long division');
      return;
    }
    
    // For simplicity, only support integer division
    if (!Number.isInteger(dividendNum) || !Number.isInteger(divisorNum)) {
      setError('Please enter whole numbers (decimal division coming soon)');
      return;
    }
    
    if (dividendNum > 999999999 || divisorNum > 999999) {
      setError('Numbers too large. Maximum: dividend 999,999,999, divisor 999,999');
      return;
    }
    
    const divisionResult = performLongDivision(dividend, divisor);
    setResult(divisionResult);
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
      link.download = `long-division-${dividend}-div-${divisor}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
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
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Long Division: ${dividend} ÷ ${divisor}</title>
              <style>body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print { body { padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imgData}" onload="window.print();"/></body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  const startAnimation = () => {
    setShowAnimation(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (result && currentStep < result.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const showAllSteps = () => {
    if (result) {
      setCurrentStep(result.steps.length - 1);
      setShowAnimation(true);
    }
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setShowAnimation(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Division Problem</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dividend" className="text-sm font-medium text-gray-700">
                  Dividend (被除数) <span className="text-red-600">*</span>
                </Label>
                <input
                  id="dividend"
                  type="number"
                  value={dividend}
                  onChange={(e) => setDividend(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500">The number being divided</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="divisor" className="text-sm font-medium text-gray-700">
                  Divisor (除数) <span className="text-red-600">*</span>
                </Label>
                <input
                  id="divisor"
                  type="number"
                  value={divisor}
                  onChange={(e) => setDivisor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12"
                  min="1"
                  step="1"
                />
                <p className="text-xs text-gray-500">The number dividing into the dividend</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-semibold mb-2">Division Formula:</p>
                <p className="text-sm text-blue-800 font-mono">
                  Dividend ÷ Divisor = Quotient + Remainder
                </p>
                <p className="text-xs text-blue-700 mt-2">
                  Example: 17 ÷ 5 = 3 R 2
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                onClick={calculate}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Answer Overview */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b">
                  <CardTitle className="text-xl text-gray-900">Answer</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Result</h3>
                    
                    {/* Multiple representations */}
                    <div className="space-y-3">
                      {/* With Remainder */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 w-32">With Remainder:</span>
                        <span className="font-mono text-xl font-bold text-gray-900">
                          {result.dividend}/{result.divisor} = {result.quotient} R{result.remainder}
                        </span>
                      </div>

                      {/* Mixed Fraction */}
                      {result.remainder !== '0' && (
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 w-32">Mixed Fraction:</span>
                          <span className="font-mono text-xl font-bold text-gray-900">
                            = {result.mixedFraction.split(' ')[0]}{' '}
                            <span className="inline-flex flex-col text-base leading-none align-middle mx-1">
                              <span className="border-b border-gray-900 px-1">{result.remainder}</span>
                              <span className="px-1">{result.divisor}</span>
                            </span>
                          </span>
                        </div>
                      )}

                      {/* Decimal */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 w-32">Decimal:</span>
                        <span className="font-mono text-xl font-bold text-gray-900">
                          = {result.decimalResult}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Quotient = <strong>{result.quotient}</strong></span>
                        <span className="text-gray-700">Remainder = <strong>{result.remainder}</strong></span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step-by-Step Solution */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-gray-900">📝 Step-by-Step Solution</CardTitle>
                    <div className="flex gap-2">
                      <Button onClick={startAnimation} variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                      <Button onClick={nextStep} variant="outline" size="sm" disabled={!showAnimation || currentStep >= result.steps.length - 1}>
                        <SkipForward className="h-4 w-4 mr-1" />
                        Next
                      </Button>
                      <Button onClick={showAllSteps} variant="outline" size="sm">
                        Show All
                      </Button>
                      <Button onClick={resetAnimation} variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Long Division Display */}
                  <div className="bg-white border border-gray-300 rounded-lg p-8 mb-6 overflow-x-auto">
                    <div className="font-mono">
                      {/* Traditional Long Division Format */}
                      <div className="flex justify-center">
                        <div className="inline-block text-left">
                          {/* Quotient */}
                          <div className="text-center mb-2">
                            <span className="text-2xl font-bold text-gray-900 tracking-wider">
                              {showAnimation ? result.quotient.substring(0, currentStep + 1).padEnd(result.dividend.length, '_') : result.quotient}
                            </span>
                            <span className="text-lg text-gray-600 ml-2">
                              R{showAnimation && currentStep < result.steps.length - 1 ? '_' : result.remainder}
                            </span>
                          </div>
                          
                          {/* Division bracket */}
                          <div className="flex items-start gap-1 border-b-2 border-gray-900">
                            <span className="text-xl pr-2 border-r-2 border-gray-900">{result.divisor}</span>
                            <span className="text-xl pl-2">{result.dividend}</span>
                          </div>
                          
                          {/* Detailed steps */}
                          {showAnimation && currentStep === result.steps.length - 1 && (
                            <div className="mt-4 text-base space-y-1">
                              {result.steps.map((step, idx) => (
                                <div key={idx}>
                                  {idx > 0 && <div className="text-gray-400 ml-4">↓ bring down {step.digit}</div>}
                                  <div className="ml-4">
                                    <div className="text-gray-700">{step.partial}</div>
                                    <div className="border-b border-gray-400">- {step.multiply}</div>
                                    <div className="text-gray-900 font-semibold">{step.subtract === '0' && idx < result.steps.length - 1 ? '0' : step.subtract}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All Steps List */}
                  {showAnimation && currentStep === result.steps.length - 1 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Complete Solution:</h4>
                      {result.steps.map((step, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">{step.description}</p>
                              <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-gray-600">Current:</p>
                                  <p className="font-mono font-semibold">{step.partial}</p>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <p className="text-gray-600">Multiply:</p>
                                  <p className="font-mono font-semibold">{step.multiply}</p>
                                </div>
                                <div className="bg-green-50 p-2 rounded">
                                  <p className="text-gray-600">Subtract:</p>
                                  <p className="font-mono font-semibold">{step.subtract}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-gray-600">Remainder:</p>
                                  <p className="font-mono font-semibold">{step.remainder}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Educational Tips */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">💡 Long Division Tips</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">📚 Steps to Remember:</h4>
                      <ol className="space-y-2 list-decimal list-inside">
                        <li className="text-sm text-gray-700">
                          <strong>Divide</strong>: How many times does divisor go into current number?
                        </li>
                        <li className="text-sm text-gray-700">
                          <strong>Multiply</strong>: Multiply divisor by quotient digit
                        </li>
                        <li className="text-sm text-gray-700">
                          <strong>Subtract</strong>: Subtract product from current number
                        </li>
                        <li className="text-sm text-gray-700">
                          <strong>Bring Down</strong>: Bring down next digit
                        </li>
                        <li className="text-sm text-gray-700">
                          <strong>Repeat</strong>: Continue until all digits are used
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">✓ Check Your Answer:</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">Verification formula:</p>
                        <p className="font-mono text-sm text-blue-900 mb-3">
                          (Quotient × Divisor) + Remainder = Dividend
                        </p>
                        <p className="font-mono text-sm text-green-900">
                          ({result.quotient} × {result.divisor}) + {result.remainder} = {
                            parseInt(result.quotient) * parseInt(result.divisor) + parseInt(result.remainder)
                          } ✓
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={handleSaveAsImage} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Save Image
                </Button>
                <Button onClick={handlePrint} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ) : (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter dividend and divisor to start</p>
                <p className="text-sm mt-2">See step-by-step long division solution!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Long Division Calculator"
      />
    </div>
  );
}

