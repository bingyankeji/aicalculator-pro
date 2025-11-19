'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Share2, Printer, Download, Heart, Users } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface BloodTypeResult {
  possibleTypes: Array<{
    type: string;
    probability: number;
  }>;
  genetics: string;
  compatibility: {
    canReceiveFrom: string[];
    canDonateTo: string[];
  };
}

export default function BloodTypeCalculator() {
  const [parent1Type, setParent1Type] = useState('A');
  const [parent1Rh, setParent1Rh] = useState('+');
  const [parent2Type, setParent2Type] = useState('B');
  const [parent2Rh, setParent2Rh] = useState('+');
  const [result, setResult] = useState<BloodTypeResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/blood-type-calculator',
    getShareParams: () => ({
      p1: parent1Type + parent1Rh,
      p2: parent2Type + parent2Rh,
    }),
    getShareText: () => 
      result 
        ? `Blood Type Calculator: Parent 1 (${parent1Type}${parent1Rh}) + Parent 2 (${parent2Type}${parent2Rh})`
        : 'Calculate possible blood types for your children!',
  });

  const calculateBloodType = () => {
    // Convert blood types to alleles
    const getAlleles = (type: string): string[][] => {
      switch (type) {
        case 'A': return [['A', 'A'], ['A', 'O']];
        case 'B': return [['B', 'B'], ['B', 'O']];
        case 'AB': return [['A', 'B']];
        case 'O': return [['O', 'O']];
        default: return [['O', 'O']];
      }
    };

    const parent1Alleles = getAlleles(parent1Type);
    const parent2Alleles = getAlleles(parent2Type);

    // Calculate all possible combinations
    const combinations: { [key: string]: number } = {};
    let totalCombinations = 0;

    parent1Alleles.forEach(p1Pair => {
      parent2Alleles.forEach(p2Pair => {
        p1Pair.forEach(p1Allele => {
          p2Pair.forEach(p2Allele => {
            const alleles = [p1Allele, p2Allele].sort();
            let bloodType = '';
            
            if (alleles[0] === 'A' && alleles[1] === 'A') bloodType = 'A';
            else if (alleles[0] === 'A' && alleles[1] === 'B') bloodType = 'AB';
            else if (alleles[0] === 'A' && alleles[1] === 'O') bloodType = 'A';
            else if (alleles[0] === 'B' && alleles[1] === 'B') bloodType = 'B';
            else if (alleles[0] === 'B' && alleles[1] === 'O') bloodType = 'B';
            else if (alleles[0] === 'O' && alleles[1] === 'O') bloodType = 'O';

            combinations[bloodType] = (combinations[bloodType] || 0) + 1;
            totalCombinations++;
          });
        });
      });
    });

    // Calculate Rh factor
    const rhCombinations: { [key: string]: number } = {};
    const parent1RhAlleles = parent1Rh === '+' ? ['+', '+'] : ['-', '-'];
    const parent2RhAlleles = parent2Rh === '+' ? ['+', '+'] : ['-', '-'];

    parent1RhAlleles.forEach(rh1 => {
      parent2RhAlleles.forEach(rh2 => {
        const rhType = (rh1 === '+' || rh2 === '+') ? '+' : '-';
        rhCombinations[rhType] = (rhCombinations[rhType] || 0) + 1;
      });
    });

    const totalRhCombinations = Object.values(rhCombinations).reduce((a, b) => a + b, 0);

    // Combine blood type and Rh factor
    const possibleTypes: Array<{ type: string; probability: number }> = [];
    Object.entries(combinations).forEach(([type, count]) => {
      Object.entries(rhCombinations).forEach(([rh, rhCount]) => {
        const probability = (count / totalCombinations) * (rhCount / totalRhCombinations) * 100;
        possibleTypes.push({
          type: type + rh,
          probability: Math.round(probability * 100) / 100,
        });
      });
    });

    possibleTypes.sort((a, b) => b.probability - a.probability);

    // Get compatibility info for most likely type
    const mostLikelyType = possibleTypes[0].type;
    const compatibility = getCompatibility(mostLikelyType);

    setResult({
      possibleTypes,
      genetics: getGeneticsExplanation(parent1Type, parent2Type),
      compatibility,
    });
  };

  const getCompatibility = (bloodType: string) => {
    const compatibilityChart: { [key: string]: { canReceiveFrom: string[]; canDonateTo: string[] } } = {
      'O-': { canReceiveFrom: ['O-'], canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] },
      'O+': { canReceiveFrom: ['O-', 'O+'], canDonateTo: ['O+', 'A+', 'B+', 'AB+'] },
      'A-': { canReceiveFrom: ['O-', 'A-'], canDonateTo: ['A-', 'A+', 'AB-', 'AB+'] },
      'A+': { canReceiveFrom: ['O-', 'O+', 'A-', 'A+'], canDonateTo: ['A+', 'AB+'] },
      'B-': { canReceiveFrom: ['O-', 'B-'], canDonateTo: ['B-', 'B+', 'AB-', 'AB+'] },
      'B+': { canReceiveFrom: ['O-', 'O+', 'B-', 'B+'], canDonateTo: ['B+', 'AB+'] },
      'AB-': { canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'], canDonateTo: ['AB-', 'AB+'] },
      'AB+': { canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canDonateTo: ['AB+'] },
    };

    return compatibilityChart[bloodType] || { canReceiveFrom: [], canDonateTo: [] };
  };

  const getGeneticsExplanation = (type1: string, type2: string) => {
    return `Blood type is determined by alleles inherited from both parents. Type A and B are dominant over O. When both A and B are present, the result is AB. The Rh factor is also inherited, with Rh+ being dominant over Rh-.`;
  };

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
      link.download = `blood-type-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Blood Type Calculator Results</title>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Users className="h-5 w-5 text-blue-600" />
                Parents' Blood Types
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Parent 1 */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-900">Parent 1</Label>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Blood Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['A', 'B', 'AB', 'O'].map(type => (
                      <Button
                        key={type}
                        onClick={() => setParent1Type(type)}
                        variant={parent1Type === type ? 'default' : 'outline'}
                        className="text-sm"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Rh Factor</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setParent1Rh('+')}
                      variant={parent1Rh === '+' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Positive (+)
                    </Button>
                    <Button
                      onClick={() => setParent1Rh('-')}
                      variant={parent1Rh === '-' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Negative (-)
                    </Button>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Selected:</p>
                  <p className="text-2xl font-bold text-blue-700">{parent1Type}{parent1Rh}</p>
                </div>
              </div>

              {/* Parent 2 */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-900">Parent 2</Label>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Blood Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['A', 'B', 'AB', 'O'].map(type => (
                      <Button
                        key={type}
                        onClick={() => setParent2Type(type)}
                        variant={parent2Type === type ? 'default' : 'outline'}
                        className="text-sm"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Rh Factor</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setParent2Rh('+')}
                      variant={parent2Rh === '+' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Positive (+)
                    </Button>
                    <Button
                      onClick={() => setParent2Rh('-')}
                      variant={parent2Rh === '-' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Negative (-)
                    </Button>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Selected:</p>
                  <p className="text-2xl font-bold text-purple-700">{parent2Type}{parent2Rh}</p>
                </div>
              </div>

              <Button 
                onClick={calculateBloodType}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Calculate
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Possible Blood Types
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Possible Blood Types */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Child's Possible Blood Types</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {result.possibleTypes.map((item, index) => (
                          <div
                            key={index}
                            className={`rounded-lg p-4 text-center ${
                              index === 0
                                ? 'bg-blue-50 border-2 border-blue-500'
                                : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <p className="text-2xl font-bold text-gray-900 mb-1">{item.type}</p>
                            <p className="text-sm text-gray-600">{item.probability}%</p>
                            {index === 0 && (
                              <p className="text-xs text-blue-600 font-semibold mt-1">Most Likely</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Genetics Explanation */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Genetics Explanation</h4>
                      <p className="text-sm text-gray-700">{result.genetics}</p>
                    </div>

                    {/* Blood Compatibility */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Blood Compatibility (Most Likely Type: {result.possibleTypes[0].type})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Can Receive From:</h4>
                          <div className="flex flex-wrap gap-2">
                            {result.compatibility.canReceiveFrom.map(type => (
                              <span key={type} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Can Donate To:</h4>
                          <div className="flex flex-wrap gap-2">
                            {result.compatibility.canDonateTo.map(type => (
                              <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Universal Donor/Recipient Info */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Important Notes:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• <strong>O-</strong> is the universal donor (can donate to all blood types)</li>
                        <li>• <strong>AB+</strong> is the universal recipient (can receive from all blood types)</li>
                        <li>• Rh- individuals can only receive Rh- blood</li>
                        <li>• Rh+ individuals can receive both Rh+ and Rh- blood</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Select parents' blood types and click Calculate</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
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
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Blood Type Calculator"
      />
    </div>
  );
}

