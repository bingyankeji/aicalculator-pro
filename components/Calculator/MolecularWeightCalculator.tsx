'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Search, BarChart3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Atomic weights (based on IUPAC 2021 standard atomic weights)
const ATOMIC_WEIGHTS: { [key: string]: number } = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 16.00,
  F: 19.00, Ne: 20.18, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.07,
  Cl: 35.45, Ar: 39.95, K: 39.10, Ca: 40.08, Sc: 44.96, Ti: 47.87, V: 50.94, Cr: 52.00,
  Mn: 54.94, Fe: 55.85, Co: 58.93, Ni: 58.69, Cu: 63.55, Zn: 65.38, Ga: 69.72, Ge: 72.63,
  As: 74.92, Se: 78.97, Br: 79.90, Kr: 83.80, Rb: 85.47, Sr: 87.62, Y: 88.91, Zr: 91.22,
  Nb: 92.91, Mo: 95.95, Tc: 98.00, Ru: 101.1, Rh: 102.9, Pd: 106.4, Ag: 107.9, Cd: 112.4,
  In: 114.8, Sn: 118.7, Sb: 121.8, Te: 127.6, I: 126.9, Xe: 131.3, Cs: 132.9, Ba: 137.3,
  La: 138.9, Ce: 140.1, Pr: 140.9, Nd: 144.2, Pm: 145.0, Sm: 150.4, Eu: 152.0, Gd: 157.3,
  Tb: 158.9, Dy: 162.5, Ho: 164.9, Er: 167.3, Tm: 168.9, Yb: 173.0, Lu: 175.0, Hf: 178.5,
  Ta: 180.9, W: 183.8, Re: 186.2, Os: 190.2, Ir: 192.2, Pt: 195.1, Au: 197.0, Hg: 200.6,
  Tl: 204.4, Pb: 207.2, Bi: 209.0, Po: 209.0, At: 210.0, Rn: 222.0, Fr: 223.0, Ra: 226.0,
  Ac: 227.0, Th: 232.0, Pa: 231.0, U: 238.0, Np: 237.0, Pu: 244.0, Am: 243.0, Cm: 247.0,
};

interface ElementCount {
  element: string;
  count: number;
  atomicWeight: number;
  totalWeight: number;
  percentage: number;
}

interface CommonCompound {
  name: string;
  formula: string;
  category: string;
  uses: string;
}

const COMMON_COMPOUNDS: CommonCompound[] = [
  { name: 'Water', formula: 'H2O', category: 'Simple', uses: 'Universal solvent' },
  { name: 'Carbon Dioxide', formula: 'CO2', category: 'Gas', uses: 'Photosynthesis, carbonation' },
  { name: 'Glucose', formula: 'C6H12O6', category: 'Organic', uses: 'Energy source, carbohydrate' },
  { name: 'Ethanol', formula: 'C2H5OH', category: 'Organic', uses: 'Alcohol, solvent' },
  { name: 'Sulfuric Acid', formula: 'H2SO4', category: 'Acid', uses: 'Industrial acid' },
  { name: 'Sodium Chloride', formula: 'NaCl', category: 'Salt', uses: 'Table salt' },
  { name: 'Calcium Carbonate', formula: 'CaCO3', category: 'Salt', uses: 'Limestone, antacid' },
  { name: 'Ammonia', formula: 'NH3', category: 'Base', uses: 'Fertilizer, cleaner' },
  { name: 'Methane', formula: 'CH4', category: 'Organic', uses: 'Natural gas, fuel' },
  { name: 'Acetic Acid', formula: 'CH3COOH', category: 'Acid', uses: 'Vinegar' },
  { name: 'Sodium Hydroxide', formula: 'NaOH', category: 'Base', uses: 'Lye, soap making' },
  { name: 'Hydrochloric Acid', formula: 'HCl', category: 'Acid', uses: 'Stomach acid, industrial' },
  { name: 'Hydrogen Peroxide', formula: 'H2O2', category: 'Oxidizer', uses: 'Disinfectant, bleaching' },
  { name: 'Aspirin', formula: 'C9H8O4', category: 'Organic', uses: 'Pain reliever, anti-inflammatory' },
  { name: 'Caffeine', formula: 'C8H10N4O2', category: 'Organic', uses: 'Stimulant' },
  { name: 'Sucrose', formula: 'C12H22O11', category: 'Organic', uses: 'Table sugar' },
  { name: 'Sodium Bicarbonate', formula: 'NaHCO3', category: 'Salt', uses: 'Baking soda, antacid' },
  { name: 'Magnesium Sulfate', formula: 'MgSO4', category: 'Salt', uses: 'Epsom salt' },
];

export default function MolecularWeightCalculator() {
  const [formula, setFormula] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<{
    molecularWeight: number;
    elements: ElementCount[];
    formula: string;
  } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/molecular-weight-calculator',
    getShareParams: () => ({
      f: formula,
    }),
    getShareText: () => {
      if (result) {
        return `Molecular weight of ${result.formula}: ${result.molecularWeight.toFixed(2)} g/mol`;
      }
      return 'Calculate molecular weight and elemental composition!';
    },
  });

  const parseFormula = (input: string): ElementCount[] => {
    const elements: { [key: string]: number } = {};
    
    // Remove spaces
    input = input.replace(/\s/g, '');
    
    // Handle parentheses recursively
    const expandParentheses = (str: string): string => {
      const parenRegex = /\(([^()]+)\)(\d*)/g;
      let hasParens = false;
      
      const expanded = str.replace(parenRegex, (match, inside, multiplier) => {
        hasParens = true;
        const mult = parseInt(multiplier) || 1;
        let result = '';
        const elementRegex = /([A-Z][a-z]?)(\d*)/g;
        inside.replace(elementRegex, (m: string, el: string, count: string) => {
          const c = (parseInt(count) || 1) * mult;
          result += el + c;
          return m;
        });
        return result;
      });
      
      return hasParens ? expandParentheses(expanded) : expanded;
    };
    
    const expandedFormula = expandParentheses(input);
    
    // Parse elements and counts
    const elementRegex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    
    while ((match = elementRegex.exec(expandedFormula)) !== null) {
      const element = match[1];
      const count = parseInt(match[2]) || 1;
      
      if (!ATOMIC_WEIGHTS[element]) {
        throw new Error(`Unknown element: ${element}`);
      }
      
      elements[element] = (elements[element] || 0) + count;
    }
    
    return Object.entries(elements).map(([element, count]) => ({
      element,
      count,
      atomicWeight: ATOMIC_WEIGHTS[element],
      totalWeight: ATOMIC_WEIGHTS[element] * count,
      percentage: 0, // Will be calculated after we know total weight
    }));
  };

  const handleCalculate = () => {
    if (!formula.trim()) {
      alert('Please enter a molecular formula.');
      return;
    }
    
    try {
      const elements = parseFormula(formula.trim());
      const totalWeight = elements.reduce((sum, el) => sum + el.totalWeight, 0);
      
      // Calculate percentages
      elements.forEach(el => {
        el.percentage = (el.totalWeight / totalWeight) * 100;
      });
      
      setResult({
        molecularWeight: totalWeight,
        elements: elements.sort((a, b) => b.percentage - a.percentage),
        formula: formula.trim(),
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}\n\nPlease check your formula. Examples: H2O, C6H12O6, Ca(OH)2`);
      }
    }
  };

  const handleLoadCompound = (compound: CommonCompound) => {
    setFormula(compound.formula);
    setSearchTerm('');
  };

  const filteredCompounds = COMMON_COMPOUNDS.filter(c => 
    searchTerm === '' ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `molecular-weight-${new Date().toISOString().split('T')[0]}.png`;
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
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Molecular Weight Calculation</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const CHART_COLORS = ['#1e40af', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2', '#db2777', '#65a30d'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Molecular Weight Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Formula Input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Molecular Formula <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
                  placeholder="H2O, C6H12O6, Ca(OH)2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCalculate();
                    }
                  }}
                />
                <p className="text-xs text-gray-500">
                  Examples: H2O (water), C6H12O6 (glucose), Ca(OH)2 (calcium hydroxide)
                </p>
              </div>

              <Button 
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Molecular Weight
              </Button>
            </CardContent>
          </Card>

          {/* Common Compounds */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Common Compounds</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Search compounds..."
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredCompounds.map((compound, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLoadCompound(compound)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{compound.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{compound.category}</span>
                    </div>
                    <div className="font-mono text-blue-700 text-sm mb-1">{compound.formula}</div>
                    <div className="text-xs text-gray-600">{compound.uses}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {result ? (
            <>
              {/* Molecular Weight */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Molecular Weight</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Formula: <span className="font-mono font-semibold text-gray-900">{result.formula}</span></p>
                    <p className="text-5xl font-bold text-blue-700 mb-2">{result.molecularWeight.toFixed(3)}</p>
                    <p className="text-lg text-gray-700">g/mol</p>
                  </div>
                </CardContent>
              </Card>

              {/* Elemental Composition */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Elemental Composition
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Element</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700">Count</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Atomic Weight</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Mass</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {result.elements.map((el, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold text-gray-900">{el.element}</td>
                            <td className="px-4 py-3 text-center">{el.count}</td>
                            <td className="px-4 py-3 text-right">{el.atomicWeight.toFixed(3)}</td>
                            <td className="px-4 py-3 text-right">{el.totalWeight.toFixed(3)}</td>
                            <td className="px-4 py-3 text-right font-semibold text-blue-700">{el.percentage.toFixed(2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                        <tr>
                          <td colSpan={3} className="px-4 py-3 font-bold text-gray-900">Total Molecular Weight:</td>
                          <td className="px-4 py-3 text-right font-bold text-blue-700">{result.molecularWeight.toFixed(3)}</td>
                          <td className="px-4 py-3 text-right font-bold">100.00%</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Pie Chart */}
                  {result.elements.length > 1 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Mass Distribution</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={result.elements}
                            dataKey="percentage"
                            nameKey="element"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ element, percentage }) => `${element}: ${percentage.toFixed(1)}%`}
                          >
                            {result.elements.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Molar Mass (SI)</p>
                      <p className="text-xl font-bold text-gray-900">{result.molecularWeight.toFixed(3)} g/mol</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Number of Elements</p>
                      <p className="text-xl font-bold text-gray-900">{result.elements.length}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Atoms</p>
                      <p className="text-xl font-bold text-gray-900">
                        {result.elements.reduce((sum, el) => sum + el.count, 0)}
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Heaviest Element</p>
                      <p className="text-xl font-bold text-gray-900">
                        {result.elements.reduce((max, el) => el.atomicWeight > max.atomicWeight ? el : max).element}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Stoichiometry Note</h4>
                    <p className="text-sm text-blue-800">
                      The molecular weight ({result.molecularWeight.toFixed(3)} g/mol) represents the mass of one mole 
                      (6.022 × 10²³ molecules) of {result.formula}. This is essential for converting between mass and 
                      moles in chemical calculations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">
                  Enter a molecular formula and click Calculate
                </p>
                <p className="text-sm text-gray-400">
                  Examples: H2O, C6H12O6, Ca(OH)2, H2SO4
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Molecular Weight Calculator"
      />
    </div>
  );
}

