'use client';

import { useState, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface SequenceResult {
  type: string;
  formula: string;
  terms: number[];
  nthTerm: number;
  sum: number;
  sumFormula: string;
  convergence: string;
  properties: string[];
  applications: string[];
}

export default function NumberSequenceCalculator() {
  const [sequenceType, setSequenceType] = useState<'arithmetic' | 'geometric' | 'fibonacci'>('arithmetic');
  const [firstTerm, setFirstTerm] = useState('1');
  const [commonDiff, setCommonDiff] = useState('2');
  const [commonRatio, setCommonRatio] = useState('2');
  const [nTerms, setNTerms] = useState('20');
  const [findNth, setFindNth] = useState('10');
  
  const [result, setResult] = useState<SequenceResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/number-sequence-calculator',
    getShareParams: () => ({
      type: sequenceType,
      a1: firstTerm,
      n: nTerms,
    }),
    getShareText: () => {
      if (result) {
        return `${result.type}: Sum of ${nTerms} terms = ${result.sum}`;
      }
      return 'Calculate number sequences!';
    },
  });

  const calculate = () => {
    setError('');
    
    const a1 = parseFloat(firstTerm);
    const n = parseInt(nTerms);
    const nth = parseInt(findNth);
    
    if (isNaN(a1)) {
      setError('Please enter a valid first term');
      return;
    }
    
    if (!n || n < 1 || n > 100) {
      setError('Please enter number of terms (1-100)');
      return;
    }
    
    if (!nth || nth < 1 || nth > 100) {
      setError('Please enter which term to find (1-100)');
      return;
    }

    let terms: number[] = [];
    let nthTerm = 0;
    let sum = 0;
    let formula = '';
    let sumFormula = '';
    let convergence = '';
    let properties: string[] = [];
    let applications: string[] = [];
    let typeLabel = '';

    if (sequenceType === 'arithmetic') {
      const d = parseFloat(commonDiff);
      if (isNaN(d)) {
        setError('Please enter a valid common difference');
        return;
      }
      
      typeLabel = 'Arithmetic Sequence';
      formula = `aₙ = ${a1} + (n - 1) × ${d}`;
      sumFormula = `Sₙ = n/2 × [2a₁ + (n - 1)d] = n/2 × [${2 * a1} + (n - 1) × ${d}]`;
      
      // Generate terms
      for (let i = 0; i < n; i++) {
        terms.push(a1 + i * d);
      }
      
      // Calculate nth term
      nthTerm = a1 + (nth - 1) * d;
      
      // Calculate sum
      sum = (n / 2) * (2 * a1 + (n - 1) * d);
      
      // Convergence
      if (d === 0) {
        convergence = 'Constant sequence (neither converges nor diverges)';
      } else if (d > 0) {
        convergence = 'Diverges to +∞';
      } else {
        convergence = 'Diverges to -∞';
      }
      
      // Properties
      properties = [
        `Common difference: d = ${d}`,
        `Each term differs from the previous by ${d}`,
        `Linear growth pattern`,
        d === 0 ? 'Constant sequence' : d > 0 ? 'Increasing sequence' : 'Decreasing sequence',
      ];
      
      // Applications
      applications = [
        'Simple interest calculations',
        'Linear depreciation',
        'Uniform motion problems',
        'Evenly spaced time intervals',
        'Budget planning with fixed increments',
      ];
      
    } else if (sequenceType === 'geometric') {
      const r = parseFloat(commonRatio);
      if (isNaN(r)) {
        setError('Please enter a valid common ratio');
        return;
      }
      
      if (r === 0) {
        setError('Common ratio cannot be zero');
        return;
      }
      
      typeLabel = 'Geometric Sequence';
      formula = `aₙ = ${a1} × ${r}^(n-1)`;
      
      if (r === 1) {
        sumFormula = `Sₙ = n × a₁ = ${n} × ${a1}`;
      } else {
        sumFormula = `Sₙ = a₁ × (rⁿ - 1)/(r - 1) = ${a1} × (${r}^n - 1)/(${r} - 1)`;
      }
      
      // Generate terms
      for (let i = 0; i < n; i++) {
        terms.push(a1 * Math.pow(r, i));
      }
      
      // Calculate nth term
      nthTerm = a1 * Math.pow(r, nth - 1);
      
      // Calculate sum
      if (r === 1) {
        sum = n * a1;
      } else {
        sum = a1 * (Math.pow(r, n) - 1) / (r - 1);
      }
      
      // Convergence
      if (Math.abs(r) < 1) {
        convergence = `Converges to 0 (|r| < 1). Infinite sum = ${(a1 / (1 - r)).toFixed(4)}`;
      } else if (Math.abs(r) === 1) {
        convergence = r === 1 ? 'Does not converge (r = 1)' : 'Oscillates (r = -1)';
      } else {
        convergence = 'Diverges (|r| > 1)';
      }
      
      // Properties
      properties = [
        `Common ratio: r = ${r}`,
        `Each term is ${r} times the previous term`,
        r === 1 ? 'Constant sequence' : 'Exponential growth/decay',
        Math.abs(r) < 1 ? 'Converges to 0' : Math.abs(r) > 1 ? 'Diverges' : 'Oscillates or constant',
      ];
      
      // Applications
      applications = [
        'Compound interest and investment growth',
        'Population growth models',
        'Radioactive decay',
        'Viral spread (exponential growth)',
        'Computer algorithm analysis (divide & conquer)',
      ];
      
    } else { // fibonacci
      typeLabel = 'Fibonacci Sequence';
      formula = 'aₙ = aₙ₋₁ + aₙ₋₂ (for n ≥ 3), a₁ = 1, a₂ = 1';
      sumFormula = 'Sₙ = aₙ₊₂ - 1';
      
      // Generate Fibonacci sequence
      terms = [1, 1];
      for (let i = 2; i < n; i++) {
        terms.push(terms[i - 1] + terms[i - 2]);
      }
      
      // Trim if too many
      if (n === 1) terms = [1];
      
      // Calculate nth term
      if (nth === 1 || nth === 2) {
        nthTerm = 1;
      } else {
        let fib = [1, 1];
        for (let i = 2; i < nth; i++) {
          fib.push(fib[i - 1] + fib[i - 2]);
        }
        nthTerm = fib[nth - 1];
      }
      
      // Calculate sum (using formula Sn = F(n+2) - 1)
      let fibForSum = [1, 1];
      for (let i = 2; i <= n; i++) {
        fibForSum.push(fibForSum[i - 1] + fibForSum[i - 2]);
      }
      sum = terms.reduce((acc, val) => acc + val, 0);
      
      // Convergence
      const phi = (1 + Math.sqrt(5)) / 2;
      convergence = `Ratio of consecutive terms converges to Golden Ratio φ ≈ ${phi.toFixed(6)}`;
      
      // Properties
      properties = [
        'Each term is sum of previous two terms',
        `Ratio approaches Golden Ratio (φ ≈ ${phi.toFixed(4)})`,
        'Appears frequently in nature',
        'Related to Pascal\'s triangle',
      ];
      
      // Applications
      applications = [
        'Nature: flower petals, pine cones, shells',
        'Algorithm analysis (recursion complexity)',
        'Financial market analysis (Fibonacci retracements)',
        'Art and architecture (Golden Ratio)',
        'Computer science (dynamic programming examples)',
      ];
    }

    setResult({
      type: typeLabel,
      formula,
      terms,
      nthTerm,
      sum,
      sumFormula,
      convergence,
      properties,
      applications,
    });
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
      link.download = `number-sequence-${sequenceType}.png`;
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
            <head><title>Number Sequence - ${sequenceType}</title>
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

  // Chart data - regenerate on each result change to avoid stale references
  const sequenceChartData = result ? {
    labels: result.terms.map((_, i) => `n=${i + 1}`),
    datasets: [
      {
        label: 'Sequence Terms',
        data: result.terms,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  } : null;

  const sumChartData = result ? (() => {
    const cumulativeSums = result.terms.reduce((acc: number[], val, i) => {
      acc.push(i === 0 ? val : acc[i - 1] + val);
      return acc;
    }, []);
    
    return {
      labels: result.terms.map((_, i) => `S${i + 1}`),
      datasets: [
        {
          label: 'Cumulative Sum',
          data: cumulativeSums,
          backgroundColor: '#10b981',
          borderColor: '#059669',
          borderWidth: 1,
        },
      ],
    };
  })() : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Sequence Parameters</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sequence Type</Label>
                <select
                  value={sequenceType}
                  onChange={(e) => setSequenceType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="arithmetic">Arithmetic (Linear)</option>
                  <option value="geometric">Geometric (Exponential)</option>
                  <option value="fibonacci">Fibonacci</option>
                </select>
              </div>

              {sequenceType !== 'fibonacci' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstTerm" className="text-sm font-medium text-gray-700">
                      First Term (a₁) <span className="text-red-600">*</span>
                    </Label>
                    <input
                      id="firstTerm"
                      type="number"
                      value={firstTerm}
                      onChange={(e) => setFirstTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1"
                      step="any"
                    />
                  </div>

                  {sequenceType === 'arithmetic' && (
                    <div className="space-y-2">
                      <Label htmlFor="commonDiff" className="text-sm font-medium text-gray-700">
                        Common Difference (d) <span className="text-red-600">*</span>
                      </Label>
                      <input
                        id="commonDiff"
                        type="number"
                        value={commonDiff}
                        onChange={(e) => setCommonDiff(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2"
                        step="any"
                      />
                      <p className="text-xs text-gray-500">Difference between consecutive terms</p>
                    </div>
                  )}

                  {sequenceType === 'geometric' && (
                    <div className="space-y-2">
                      <Label htmlFor="commonRatio" className="text-sm font-medium text-gray-700">
                        Common Ratio (r) <span className="text-red-600">*</span>
                      </Label>
                      <input
                        id="commonRatio"
                        type="number"
                        value={commonRatio}
                        onChange={(e) => setCommonRatio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2"
                        step="any"
                      />
                      <p className="text-xs text-gray-500">Ratio between consecutive terms</p>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="nTerms" className="text-sm font-medium text-gray-700">
                  Number of Terms <span className="text-red-600">*</span>
                </Label>
                <input
                  id="nTerms"
                  type="number"
                  value={nTerms}
                  onChange={(e) => setNTerms(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                  min="1"
                  max="100"
                />
                <p className="text-xs text-gray-500">Generate 1-100 terms</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="findNth" className="text-sm font-medium text-gray-700">
                  Find Nth Term <span className="text-red-600">*</span>
                </Label>
                <input
                  id="findNth"
                  type="number"
                  value={findNth}
                  onChange={(e) => setFindNth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                  min="1"
                  max="100"
                />
                <p className="text-xs text-gray-500">Calculate specific term (1-100)</p>
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
                Calculate Sequence
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Overview */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b">
                  <CardTitle className="text-xl text-gray-900">{result.type}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Term #{findNth}</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {Math.abs(result.nthTerm) > 1e10 ? result.nthTerm.toExponential(2) : result.nthTerm.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">a₍{findNth}₎</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Sum of {nTerms} Terms</p>
                      <p className="text-3xl font-bold text-green-900">
                        {Math.abs(result.sum) > 1e10 ? result.sum.toExponential(2) : result.sum.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">S₍{nTerms}₎</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Terms Generated</p>
                      <p className="text-3xl font-bold text-gray-900">{result.terms.length}</p>
                      <p className="text-xs text-gray-600 mt-1">n = 1 to {result.terms.length}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">General Formula:</h4>
                      <p className="text-sm text-blue-800 font-mono">{result.formula}</p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-green-900 mb-1">Sum Formula:</h4>
                      <p className="text-sm text-green-800 font-mono">{result.sumFormula}</p>
                    </div>

                    <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">Convergence:</h4>
                      <p className="text-sm text-gray-800">{result.convergence}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sequence Visualization */}
              {sequenceChartData && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">📈 Sequence Visualization</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Line
                      key={`sequence-${nTerms}-${sequenceType}`}
                      data={sequenceChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          legend: { display: true, position: 'top' },
                          tooltip: { 
                            callbacks: {
                              label: (context) => {
                                const val = context.parsed.y;
                                return `aₙ = ${Math.abs(val) > 1e6 ? val.toExponential(2) : val.toLocaleString()}`;
                              }
                            }
                          },
                        },
                        scales: {
                          x: { title: { display: true, text: 'Term Position (n)' } },
                          y: { title: { display: true, text: 'Term Value (aₙ)' } },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Cumulative Sum Chart */}
              {sumChartData && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">📊 Cumulative Sum Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Bar
                      key={`sum-${nTerms}-${sequenceType}`}
                      data={sumChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          legend: { display: true, position: 'top' },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const val = context.parsed.y;
                                return `Sum = ${Math.abs(val) > 1e6 ? val.toExponential(2) : val.toLocaleString()}`;
                              }
                            }
                          },
                        },
                        scales: {
                          x: { title: { display: true, text: 'Sum of First n Terms' } },
                          y: { title: { display: true, text: 'Cumulative Sum (Sₙ)' } },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Sequence Terms Table */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">🔢 Sequence Terms</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
                    {result.terms.map((term, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 p-2 rounded text-center"
                      >
                        <p className="text-xs text-gray-600">a₍{idx + 1}₎</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {Math.abs(term) > 1e6 ? term.toExponential(1) : term.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Properties & Applications */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">💡 Properties & Applications</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">📚 Properties</h4>
                      <ul className="space-y-2">
                        {result.properties.map((prop, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
                            {prop}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">🎯 Real-World Applications</h4>
                      <ul className="space-y-2">
                        {result.applications.map((app, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-600">
                            {app}
                          </li>
                        ))}
                      </ul>
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
                <p className="text-lg">Configure sequence parameters and click Calculate</p>
                <p className="text-sm mt-2">Explore arithmetic, geometric, and Fibonacci sequences!</p>
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
        calculatorName="Number Sequence Calculator"
      />
    </div>
  );
}

