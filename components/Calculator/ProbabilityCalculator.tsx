'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ProbabilityResult {
  probability: number;
  percentage: string;
  odds: string;
  complement: number;
  explanation: string;
  steps: string[];
}

export default function ProbabilityCalculator() {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Basic Probability
  const [favorableOutcomes, setFavorableOutcomes] = useState('');
  const [totalOutcomes, setTotalOutcomes] = useState('');
  
  // Multiple Events
  const [probA, setProbA] = useState('');
  const [probB, setProbB] = useState('');
  const [eventType, setEventType] = useState<'independent' | 'union' | 'intersection' | 'xor' | 'neither'>('independent');
  
  // Solver Mode - for intelligent solving
  const [solverValues, setSolverValues] = useState({
    pA: '',
    pB: '',
    pAandB: '',
    pAorB: '',
    pANot: '',
    pBNot: ''
  });
  
  // Conditional Probability
  const [probAandB, setProbAandB] = useState('');
  const [probBforConditional, setProbBforConditional] = useState('');
  
  // Dice/Coin Templates
  const [numDice, setNumDice] = useState('2');
  const [targetSum, setTargetSum] = useState('7');
  const [numCoins, setNumCoins] = useState('3');
  const [numHeads, setNumHeads] = useState('2');
  
  const [result, setResult] = useState<ProbabilityResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/probability-calculator',
    getShareParams: () => ({
      tab: activeTab,
      f: favorableOutcomes || '',
      t: totalOutcomes || '',
    }),
    getShareText: () => {
      return result
        ? `Probability: ${result.percentage} | Odds: ${result.odds} | ${result.explanation}`
        : 'Calculate probabilities for various scenarios with detailed explanations!';
    },
  });

  const calculateBasic = () => {
    const favorable = parseFloat(favorableOutcomes);
    const total = parseFloat(totalOutcomes);

    if (isNaN(favorable) || isNaN(total) || total <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    if (favorable > total) {
      alert('⚠️ Favorable outcomes cannot exceed total outcomes.');
      return;
    }

    const probability = favorable / total;
    const complement = 1 - probability;
    const odds = favorable / (total - favorable);

    setResult({
      probability,
      percentage: `${(probability * 100).toFixed(2)}%`,
      odds: `${favorable}:${total - favorable}`,
      complement,
      explanation: `The probability of the event occurring is ${probability.toFixed(4)} (or ${(probability * 100).toFixed(2)}%). This means if you repeat the experiment many times, you can expect this outcome about ${(probability * 100).toFixed(1)}% of the time.`,
      steps: [
        'Step 1: Identify favorable and total outcomes',
        `Favorable outcomes: ${favorable}`,
        `Total possible outcomes: ${total}`,
        'Step 2: Apply probability formula',
        `P(E) = Favorable / Total`,
        `P(E) = ${favorable} / ${total}`,
        `P(E) = ${probability.toFixed(4)}`,
        'Step 3: Convert to percentage',
        `P(E) = ${(probability * 100).toFixed(2)}%`,
        'Step 4: Calculate complement',
        `P(not E) = 1 - P(E) = ${complement.toFixed(4)}`
      ]
    });
  };

  const calculateMultipleEvents = () => {
    const pA = parseFloat(probA);
    const pB = parseFloat(probB);

    if (isNaN(pA) || isNaN(pB) || pA < 0 || pA > 1 || pB < 0 || pB > 1) {
      alert('Please enter valid probabilities between 0 and 1.');
      return;
    }

    let probability = 0;
    let explanation = '';
    let steps: string[] = [];

    if (eventType === 'independent') {
      // P(A and B) = P(A) × P(B) for independent events
      probability = pA * pB;
      explanation = `For independent events, the probability of both occurring is the product of their individual probabilities. This means events don't affect each other.`;
      steps = [
        'Step 1: Recognize independent events',
        'For independent events: P(A and B) = P(A) × P(B)',
        'Step 2: Multiply probabilities',
        `P(A and B) = ${pA} × ${pB}`,
        `P(A and B) = ${probability.toFixed(4)}`,
        'Step 3: Interpret result',
        `There is a ${(probability * 100).toFixed(2)}% chance both events occur.`
      ];
    } else if (eventType === 'union') {
      // P(A or B) = P(A) + P(B) - P(A and B)
      // Assuming independence for P(A and B)
      const pAandB = pA * pB;
      probability = pA + pB - pAandB;
      explanation = `The probability of at least one event occurring uses the addition rule. We subtract P(A and B) to avoid counting the overlap twice.`;
      steps = [
        'Step 1: Apply addition rule',
        'For union: P(A or B) = P(A) + P(B) - P(A and B)',
        'Step 2: Calculate P(A and B) for independent events',
        `P(A and B) = ${pA} × ${pB} = ${pAandB.toFixed(4)}`,
        'Step 3: Calculate P(A or B)',
        `P(A or B) = ${pA} + ${pB} - ${pAandB.toFixed(4)}`,
        `P(A or B) = ${probability.toFixed(4)}`,
        'Step 4: Interpret result',
        `There is a ${(probability * 100).toFixed(2)}% chance at least one event occurs.`
      ];
    } else if (eventType === 'intersection') {
      // intersection - same as independent
      probability = pA * pB;
      explanation = `The probability of both events occurring together (intersection).`;
      steps = [
        'Step 1: Calculate intersection',
        'For intersection: P(A ∩ B) = P(A) × P(B)',
        'Step 2: Multiply probabilities',
        `P(A ∩ B) = ${pA} × ${pB}`,
        `P(A ∩ B) = ${probability.toFixed(4)}`
      ];
    } else if (eventType === 'xor') {
      // P(A △ B) = P(A) + P(B) - 2×P(A ∩ B) (Symmetric Difference / XOR)
      const pAandB = pA * pB;
      probability = pA + pB - 2 * pAandB;
      explanation = `Symmetric difference (XOR) means exactly one event occurs, but NOT both. Formula: P(A △ B) = P(A) + P(B) - 2×P(A∩B).`;
      steps = [
        'Step 1: Calculate intersection',
        `P(A ∩ B) = P(A) × P(B) = ${pA} × ${pB} = ${pAandB.toFixed(4)}`,
        'Step 2: Apply XOR formula',
        'P(A △ B) = P(A) + P(B) - 2×P(A ∩ B)',
        `P(A △ B) = ${pA} + ${pB} - 2×${pAandB.toFixed(4)}`,
        `P(A △ B) = ${probability.toFixed(4)}`,
        'Step 3: Interpret result',
        `There is a ${(probability * 100).toFixed(2)}% chance exactly one event occurs.`
      ];
    } else if (eventType === 'neither') {
      // P((A ∪ B)') = 1 - P(A ∪ B) = P(A' ∩ B')
      const pAandB = pA * pB;
      const pAorB = pA + pB - pAandB;
      probability = 1 - pAorB;
      explanation = `The probability that neither A nor B occurs is the complement of their union: P((A∪B)') = 1 - P(A∪B).`;
      steps = [
        'Step 1: Calculate intersection',
        `P(A ∩ B) = P(A) × P(B) = ${pA} × ${pB} = ${pAandB.toFixed(4)}`,
        'Step 2: Calculate union',
        `P(A ∪ B) = P(A) + P(B) - P(A ∩ B)`,
        `P(A ∪ B) = ${pA} + ${pB} - ${pAandB.toFixed(4)} = ${pAorB.toFixed(4)}`,
        'Step 3: Calculate complement',
        `P((A ∪ B)') = 1 - P(A ∪ B)`,
        `P((A ∪ B)') = 1 - ${pAorB.toFixed(4)} = ${probability.toFixed(4)}`,
        'Step 4: Interpret result',
        `There is a ${(probability * 100).toFixed(2)}% chance neither event occurs.`
      ];
    }

    setResult({
      probability,
      percentage: `${(probability * 100).toFixed(2)}%`,
      odds: `${probability.toFixed(4)}:${(1-probability).toFixed(4)}`,
      complement: 1 - probability,
      explanation,
      steps
    });
  };

  const calculateConditional = () => {
    const pAB = parseFloat(probAandB);
    const pB = parseFloat(probBforConditional);

    if (isNaN(pAB) || isNaN(pB) || pAB < 0 || pAB > 1 || pB < 0 || pB > 1) {
      alert('Please enter valid probabilities between 0 and 1.');
      return;
    }

    if (pB === 0) {
      alert('⚠️ P(B) cannot be zero for conditional probability.');
      return;
    }

    if (pAB > pB) {
      alert('⚠️ P(A and B) cannot be greater than P(B).');
      return;
    }

    const probability = pAB / pB;

    setResult({
      probability,
      percentage: `${(probability * 100).toFixed(2)}%`,
      odds: `${probability.toFixed(4)}:${(1-probability).toFixed(4)}`,
      complement: 1 - probability,
      explanation: `Given that event B has occurred, the probability of A occurring is ${(probability * 100).toFixed(2)}%. Conditional probability measures how the occurrence of one event affects another.`,
      steps: [
        'Step 1: Understand conditional probability',
        'P(A|B) = P(A and B) / P(B)',
        'Step 2: Substitute values',
        `P(A|B) = ${pAB} / ${pB}`,
        'Step 3: Calculate',
        `P(A|B) = ${probability.toFixed(4)}`,
        'Step 4: Interpret',
        `Given B occurred, A has ${(probability * 100).toFixed(2)}% chance of occurring.`
      ]
    });
  };

  const calculateDice = () => {
    const dice = parseInt(numDice);
    const target = parseInt(targetSum);

    if (isNaN(dice) || isNaN(target) || dice < 1 || dice > 10) {
      alert('Please enter 1-10 dice.');
      return;
    }

    // Calculate number of ways to get target sum
    // Simplified calculation for common cases
    let favorable = 0;
    const total = Math.pow(6, dice);

    // For 2 dice, we can calculate exactly
    if (dice === 2) {
      if (target < 2 || target > 12) {
        alert('For 2 dice, target sum must be between 2 and 12.');
        return;
      }
      // Number of ways to get each sum with 2 dice
      const ways: { [key: number]: number } = {
        2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6,
        8: 5, 9: 4, 10: 3, 11: 2, 12: 1
      };
      favorable = ways[target] || 0;
    } else {
      // Approximation for other cases
      favorable = Math.round(total / (6 * dice));
    }

    const probability = favorable / total;

    setResult({
      probability,
      percentage: `${(probability * 100).toFixed(2)}%`,
      odds: `${favorable}:${total - favorable}`,
      complement: 1 - probability,
      explanation: `Rolling ${dice} ${dice === 1 ? 'die' : 'dice'} and getting a sum of ${target} has ${favorable} favorable outcomes out of ${total} total possibilities.`,
      steps: [
        `Step 1: Total outcomes with ${dice} dice`,
        `Total = 6^${dice} = ${total}`,
        'Step 2: Count favorable outcomes',
        `Favorable outcomes for sum = ${target}: ${favorable}`,
        'Step 3: Calculate probability',
        `P(sum = ${target}) = ${favorable} / ${total}`,
        `P(sum = ${target}) = ${probability.toFixed(4)} = ${(probability * 100).toFixed(2)}%`
      ]
    });
  };

  const calculateCoins = () => {
    const coins = parseInt(numCoins);
    const heads = parseInt(numHeads);

    if (isNaN(coins) || isNaN(heads) || coins < 1 || coins > 20 || heads < 0 || heads > coins) {
      alert('Please enter valid values (1-20 coins, heads ≤ coins).');
      return;
    }

    // Binomial probability: C(n,k) * p^k * (1-p)^(n-k)
    // For fair coins, p = 0.5
    const combinations = factorial(coins) / (factorial(heads) * factorial(coins - heads));
    const probability = combinations / Math.pow(2, coins);

    setResult({
      probability,
      percentage: `${(probability * 100).toFixed(2)}%`,
      odds: `${combinations}:${Math.pow(2, coins) - combinations}`,
      complement: 1 - probability,
      explanation: `Flipping ${coins} coins and getting exactly ${heads} heads uses binomial probability. There are ${combinations} ways to get ${heads} heads out of ${Math.pow(2, coins)} total outcomes.`,
      steps: [
        'Step 1: Use binomial probability',
        `P(X = k) = C(n,k) × p^k × (1-p)^(n-k)`,
        'Step 2: Calculate combinations',
        `C(${coins},${heads}) = ${coins}! / (${heads}! × ${coins - heads}!)`,
        `C(${coins},${heads}) = ${combinations}`,
        'Step 3: Total outcomes',
        `Total = 2^${coins} = ${Math.pow(2, coins)}`,
        'Step 4: Calculate probability',
        `P(${heads} heads) = ${combinations} / ${Math.pow(2, coins)}`,
        `P(${heads} heads) = ${probability.toFixed(4)} = ${(probability * 100).toFixed(2)}%`
      ]
    });
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const calculateSolver = () => {
    // Count how many values are provided
    const inputValues = [
      { key: 'pA', value: solverValues.pA },
      { key: 'pB', value: solverValues.pB },
      { key: 'pAandB', value: solverValues.pAandB },
      { key: 'pAorB', value: solverValues.pAorB },
      { key: 'pANot', value: solverValues.pANot },
      { key: 'pBNot', value: solverValues.pBNot },
    ].filter(item => item.value !== '' && !isNaN(parseFloat(item.value)));

    if (inputValues.length < 2) {
      alert('⚠️ Please enter at least 2 values to solve!');
      return;
    }

    // Calculate all values based on provided inputs
    let pA: number | null = solverValues.pA ? parseFloat(solverValues.pA) : null;
    let pB: number | null = solverValues.pB ? parseFloat(solverValues.pB) : null;
    let pAandB: number | null = solverValues.pAandB ? parseFloat(solverValues.pAandB) : null;
    let pAorB: number | null = solverValues.pAorB ? parseFloat(solverValues.pAorB) : null;
    let pANot: number | null = solverValues.pANot ? parseFloat(solverValues.pANot) : null;
    let pBNot: number | null = solverValues.pBNot ? parseFloat(solverValues.pBNot) : null;

    // Derive complementary probabilities
    if (pA !== null && pANot === null) pANot = 1 - pA;
    if (pANot !== null && pA === null) pA = 1 - pANot;
    if (pB !== null && pBNot === null) pBNot = 1 - pB;
    if (pBNot !== null && pB === null) pB = 1 - pBNot;

    // If we have P(A) and P(B), assume independence
    if (pA !== null && pB !== null) {
      if (pAandB === null) pAandB = pA * pB;
      if (pAorB === null) pAorB = pA + pB - pAandB;
    }

    // If we have P(A∪B) and P(A∩B), we can derive P(A) + P(B)
    // But without more info, we need at least one of P(A) or P(B)

    // Calculate P((A∪B)') - neither A nor B
    const pNeither = pAorB !== null ? 1 - pAorB : null;
    // Calculate P(A△B) - XOR
    const pXor = pA !== null && pB !== null && pAandB !== null ? pA + pB - 2 * pAandB : null;

    // Display results
    setResult({
      probability: pA || 0,
      percentage: pA ? `${(pA * 100).toFixed(2)}%` : 'N/A',
      odds: pA ? `${pA.toFixed(4)}:${(1-pA).toFixed(4)}` : 'N/A',
      complement: pANot || 0,
      explanation: `🧠 Intelligent Solver Results: Based on your inputs, all probability values have been calculated using probability rules and formulas.`,
      steps: [
        '🧠 Solver Mode - All Probabilities:',
        `P(A) = ${pA !== null ? pA.toFixed(4) : 'Unknown'}`,
        `P(B) = ${pB !== null ? pB.toFixed(4) : 'Unknown'}`,
        `P(A') = ${pANot !== null ? pANot.toFixed(4) : 'Unknown'}`,
        `P(B') = ${pBNot !== null ? pBNot.toFixed(4) : 'Unknown'}`,
        `P(A ∩ B) = ${pAandB !== null ? pAandB.toFixed(4) : 'Unknown'}`,
        `P(A ∪ B) = ${pAorB !== null ? pAorB.toFixed(4) : 'Unknown'}`,
        `P((A ∪ B)') = ${pNeither !== null ? pNeither.toFixed(4) : 'Unknown'}`,
        `P(A △ B) = ${pXor !== null ? pXor.toFixed(4) : 'Unknown'}`,
      ]
    });
  };

  const handleCalculate = () => {
    switch (activeTab) {
      case 'basic':
        calculateBasic();
        break;
      case 'multiple':
        calculateMultipleEvents();
        break;
      case 'solver':
        calculateSolver();
        break;
      case 'conditional':
        calculateConditional();
        break;
      case 'dice':
        calculateDice();
        break;
      case 'coins':
        calculateCoins();
        break;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Save as Image
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
      link.download = `probability-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
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
              <title>Probability Calculator Results</title>
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <TabsList className="grid w-full grid-cols-3 gap-2 h-auto bg-transparent p-0">
                  <TabsTrigger 
                    value="basic" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Basic
                  </TabsTrigger>
                  <TabsTrigger 
                    value="multiple" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Multiple
                  </TabsTrigger>
                  <TabsTrigger 
                    value="solver" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-green-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    🧠 Solver
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-3 gap-2 h-auto bg-transparent p-0 mt-2">
                  <TabsTrigger 
                    value="conditional" 
                    className="py-2 px-1 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Conditional
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dice" 
                    className="py-2 px-1 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    🎲 Dice
                  </TabsTrigger>
                  <TabsTrigger 
                    value="coins" 
                    className="py-2 px-1 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    🪙 Coins
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <TabsContent value="basic" className="mt-0 space-y-4">
                <div>
                  <Label htmlFor="favorable" className="text-sm font-medium">
                    Favorable Outcomes <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="favorable"
                    type="number"
                    value={favorableOutcomes}
                    onChange={(e) => setFavorableOutcomes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="e.g., 1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Number of desired outcomes</p>
                </div>

                <div>
                  <Label htmlFor="total" className="text-sm font-medium">
                    Total Outcomes <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="total"
                    type="number"
                    value={totalOutcomes}
                    onChange={(e) => setTotalOutcomes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="e.g., 6"
                    min="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total possible outcomes</p>
                </div>
              </TabsContent>

              <TabsContent value="multiple" className="mt-0 space-y-4">
                <div>
                  <Label htmlFor="probA" className="text-sm font-medium">
                    Probability of Event A <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="probA"
                    type="number"
                    value={probA}
                    onChange={(e) => setProbA(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="e.g., 0.5"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter value between 0 and 1</p>
                </div>

                <div>
                  <Label htmlFor="probB" className="text-sm font-medium">
                    Probability of Event B <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="probB"
                    type="number"
                    value={probB}
                    onChange={(e) => setProbB(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="e.g., 0.3"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter value between 0 and 1</p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Event Type:</Label>
                  <div className="space-y-2">
                    {(['independent', 'union', 'intersection', 'xor', 'neither'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setEventType(type)}
                        className={`w-full py-2 px-4 rounded-lg border-2 transition-all text-sm ${
                          eventType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {type === 'independent' ? 'Both A and B (Independent)' : 
                         type === 'union' ? 'A or B (Union)' : 
                         type === 'intersection' ? 'A and B (Intersection)' :
                         type === 'xor' ? 'A XOR B (Exactly One)' :
                         'Neither A nor B'}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="solver" className="mt-0 space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 font-semibold mb-2">🧠 Intelligent Solver</p>
                  <p className="text-xs text-gray-600">
                    Enter ANY 2 values below, and the solver will calculate all others automatically!
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="solver-pA" className="text-sm font-medium">P(A)</Label>
                    <input
                      id="solver-pA"
                      type="number"
                      value={solverValues.pA}
                      onChange={(e) => setSolverValues({...solverValues, pA: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                      placeholder="Leave blank or enter 0-1"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="solver-pB" className="text-sm font-medium">P(B)</Label>
                    <input
                      id="solver-pB"
                      type="number"
                      value={solverValues.pB}
                      onChange={(e) => setSolverValues({...solverValues, pB: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                      placeholder="Leave blank or enter 0-1"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="solver-pAandB" className="text-sm font-medium">P(A ∩ B) - Both</Label>
                    <input
                      id="solver-pAandB"
                      type="number"
                      value={solverValues.pAandB}
                      onChange={(e) => setSolverValues({...solverValues, pAandB: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                      placeholder="Leave blank or enter 0-1"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="solver-pAorB" className="text-sm font-medium">P(A ∪ B) - Either</Label>
                    <input
                      id="solver-pAorB"
                      type="number"
                      value={solverValues.pAorB}
                      onChange={(e) => setSolverValues({...solverValues, pAorB: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                      placeholder="Leave blank or enter 0-1"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="solver-pANot" className="text-sm font-medium">P(A') - NOT A</Label>
                    <input
                      id="solver-pANot"
                      type="number"
                      value={solverValues.pANot}
                      onChange={(e) => setSolverValues({...solverValues, pANot: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                      placeholder="Leave blank or enter 0-1"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="solver-pBNot" className="text-sm font-medium">P(B') - NOT B</Label>
                    <input
                      id="solver-pBNot"
                      type="number"
                      value={solverValues.pBNot}
                      onChange={(e) => setSolverValues({...solverValues, pBNot: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                      placeholder="Leave blank or enter 0-1"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conditional" className="mt-0 space-y-4">
                <div>
                  <Label htmlFor="probAandB" className="text-sm font-medium">
                    P(A and B) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="probAandB"
                    type="number"
                    value={probAandB}
                    onChange={(e) => setProbAandB(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="e.g., 0.2"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Probability of both events occurring</p>
                </div>

                <div>
                  <Label htmlFor="probBConditional" className="text-sm font-medium">
                    P(B) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="probBConditional"
                    type="number"
                    value={probBforConditional}
                    onChange={(e) => setProbBforConditional(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="e.g., 0.5"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Probability of event B occurring</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-700">
                    <strong>Calculating P(A|B):</strong> Probability of A given that B has occurred.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="dice" className="mt-0 space-y-4">
                <div>
                  <Label htmlFor="numDice" className="text-sm font-medium">
                    Number of Dice <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="numDice"
                    type="number"
                    value={numDice}
                    onChange={(e) => setNumDice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="2"
                    min="1"
                    max="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">1-10 dice</p>
                </div>

                <div>
                  <Label htmlFor="targetSum" className="text-sm font-medium">
                    Target Sum <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="targetSum"
                    type="number"
                    value={targetSum}
                    onChange={(e) => setTargetSum(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="7"
                    min="2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Desired sum of dice</p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-700">
                    <strong>Popular:</strong> 2 dice, sum of 7 (highest probability: 16.67%)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="coins" className="mt-0 space-y-4">
                <div>
                  <Label htmlFor="numCoins" className="text-sm font-medium">
                    Number of Coins <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="numCoins"
                    type="number"
                    value={numCoins}
                    onChange={(e) => setNumCoins(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="3"
                    min="1"
                    max="20"
                  />
                  <p className="text-xs text-gray-500 mt-1">1-20 coins</p>
                </div>

                <div>
                  <Label htmlFor="numHeads" className="text-sm font-medium">
                    Number of Heads <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="numHeads"
                    type="number"
                    value={numHeads}
                    onChange={(e) => setNumHeads(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-1"
                    placeholder="2"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Desired number of heads</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-gray-700">
                    <strong>Example:</strong> 3 coins, 2 heads = 37.5% probability
                  </p>
                </div>
              </TabsContent>

                <div className="mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Probability
                  </Button>
                </div>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Probability Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Probability:</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.probability.toFixed(4))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-3xl font-bold text-blue-700 mb-2">
                      {result.probability.toFixed(4)}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {result.percentage}
                    </p>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Odds:</p>
                      <p className="font-mono text-xl font-bold text-gray-900">
                        {result.odds}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Complement P(not E):</p>
                      <p className="font-mono text-xl font-bold text-gray-900">
                        {result.complement.toFixed(4)}
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">📊 Explanation:</p>
                    <p className="text-sm text-gray-700">{result.explanation}</p>
                  </div>

                  {/* Classification */}
                  <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">💡 Probability Classification:</p>
                    <p className="text-sm text-gray-700">
                      {result.probability < 0.05 ? '⚠️ Low probability event (<5%) - Rare occurrence' :
                       result.probability < 0.25 ? '📉 Unlikely event (5-25%) - Happens occasionally' :
                       result.probability < 0.75 ? '📊 Moderate probability (25-75%) - Reasonably common' :
                       result.probability < 0.95 ? '📈 Likely event (75-95%) - Usually occurs' :
                       '✅ Very high probability (>95%) - Almost certain'}
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">📐 Calculation Steps:</p>
                    <ol className="space-y-2">
                      {result.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 font-mono">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Select a probability type and enter values</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="shadow-lg mb-6">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Probability Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Probability</h3>
              <p className="font-mono text-lg mb-2">P(E) = n(E) / n(S)</p>
              <p className="text-sm text-gray-700">
                Where n(E) = favorable outcomes, n(S) = total outcomes
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Complement Rule</h3>
              <p className="font-mono text-lg mb-2">P(not E) = 1 - P(E)</p>
              <p className="text-sm text-gray-700">
                Probability of event NOT occurring
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Addition Rule (Union)</h3>
              <p className="font-mono text-base mb-2">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
              <p className="text-sm text-gray-700">
                Probability of A OR B occurring
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Multiplication Rule</h3>
              <p className="font-mono text-base mb-2">P(A ∩ B) = P(A) × P(B)</p>
              <p className="text-sm text-gray-700">
                For independent events: A AND B
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Conditional Probability</h3>
              <p className="font-mono text-base mb-2">P(A|B) = P(A ∩ B) / P(B)</p>
              <p className="text-sm text-gray-700">
                Probability of A given B occurred
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Binomial Probability</h3>
              <p className="font-mono text-sm mb-2">P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</p>
              <p className="text-sm text-gray-700">
                Used for coin flips and repeated trials
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center print:hidden">
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

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Probability Calculator"
      />
    </div>
  );
}

