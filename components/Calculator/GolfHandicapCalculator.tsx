'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, Trash2, Plus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Round {
  id: string;
  date: string;
  courseName: string;
  courseRating: number;
  slopeRating: number;
  adjustedGrossScore: number;
  scoreDifferential: number;
}

interface HandicapResult {
  handicapIndex: number;
  averageDifferential: number;
  lowestDifferentials: number[];
  roundsUsed: number;
  totalRounds: number;
  improvement: number;
}

export default function GolfHandicapCalculator() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [result, setResult] = useState<HandicapResult | null>(null);
  
  // New round inputs
  const [courseName, setCourseName] = useState('');
  const [courseRating, setCourseRating] = useState('');
  const [slopeRating, setSlopeRating] = useState('113');
  const [adjustedGrossScore, setAdjustedGrossScore] = useState('');
  const [roundDate, setRoundDate] = useState(new Date().toISOString().split('T')[0]);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/golf-handicap-calculator',
    getShareParams: () => ({
      r: rounds.length.toString(),
    }),
    getShareText: () => {
      if (result) {
        return `My Golf Handicap Index: ${result.handicapIndex.toFixed(1)} based on ${result.totalRounds} rounds`;
      }
      return 'Calculate your golf handicap index using WHS/USGA standards!';
    },
  });

  // Load rounds from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('golfRounds');
    if (saved) {
      const parsed = JSON.parse(saved);
      setRounds(parsed.map((r: Round) => ({
        ...r,
        date: r.date,
      })));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (rounds.length > 0) {
      localStorage.setItem('golfRounds', JSON.stringify(rounds));
    }
  }, [rounds]);

  const calculateScoreDifferential = (score: number, rating: number, slope: number): number => {
    // Score Differential = (Adjusted Gross Score - Course Rating) × 113 / Slope Rating
    return ((score - rating) * 113) / slope;
  };

  const handleAddRound = () => {
    if (!courseName.trim()) {
      alert('Please enter course name.');
      return;
    }
    
    const rating = parseFloat(courseRating);
    const slope = parseFloat(slopeRating);
    const score = parseFloat(adjustedGrossScore);
    
    if (isNaN(rating) || rating < 60 || rating > 80) {
      alert('Course Rating must be between 60 and 80.');
      return;
    }
    
    if (isNaN(slope) || slope < 55 || slope > 155) {
      alert('Slope Rating must be between 55 and 155.');
      return;
    }
    
    if (isNaN(score) || score < 60 || score > 150) {
      alert('Adjusted Gross Score must be between 60 and 150.');
      return;
    }
    
    const differential = calculateScoreDifferential(score, rating, slope);
    
    const newRound: Round = {
      id: Date.now().toString(),
      date: roundDate,
      courseName: courseName.trim(),
      courseRating: rating,
      slopeRating: slope,
      adjustedGrossScore: score,
      scoreDifferential: differential,
    };
    
    setRounds(prev => [newRound, ...prev].slice(0, 20)); // Keep latest 20 rounds
    
    // Reset form
    setCourseName('');
    setCourseRating('');
    setSlopeRating('113');
    setAdjustedGrossScore('');
    setRoundDate(new Date().toISOString().split('T')[0]);
  };

  const handleDeleteRound = (id: string) => {
    if (confirm('Delete this round?')) {
      setRounds(prev => prev.filter(r => r.id !== id));
    }
  };

  const calculateHandicap = () => {
    if (rounds.length < 3) {
      alert('You need at least 3 rounds to calculate handicap index.');
      return;
    }
    
    // Sort by differential (lowest to highest)
    const sortedDiffs = [...rounds]
      .map(r => r.scoreDifferential)
      .sort((a, b) => a - b);
    
    // Determine how many lowest scores to use based on WHS rules
    let numToUse = 1;
    if (rounds.length >= 20) numToUse = 8;
    else if (rounds.length >= 19) numToUse = 7;
    else if (rounds.length >= 18) numToUse = 7;
    else if (rounds.length >= 17) numToUse = 6;
    else if (rounds.length >= 16) numToUse = 6;
    else if (rounds.length >= 15) numToUse = 6;
    else if (rounds.length >= 14) numToUse = 5;
    else if (rounds.length >= 13) numToUse = 5;
    else if (rounds.length >= 12) numToUse = 5;
    else if (rounds.length >= 11) numToUse = 4;
    else if (rounds.length >= 10) numToUse = 4;
    else if (rounds.length >= 9) numToUse = 3;
    else if (rounds.length >= 8) numToUse = 3;
    else if (rounds.length >= 7) numToUse = 2;
    else if (rounds.length >= 6) numToUse = 2;
    else if (rounds.length >= 5) numToUse = 1;
    else if (rounds.length >= 4) numToUse = 1;
    else numToUse = 1;
    
    const lowestDiffs = sortedDiffs.slice(0, numToUse);
    const avgDiff = lowestDiffs.reduce((sum, d) => sum + d, 0) / lowestDiffs.length;
    
    // Handicap Index = Average of lowest differentials
    const handicapIndex = avgDiff;
    
    // Calculate improvement (compare to 5 rounds ago if available)
    let improvement = 0;
    if (rounds.length >= 10) {
      const recentAvg = rounds.slice(0, 5).reduce((sum, r) => sum + r.scoreDifferential, 0) / 5;
      const olderAvg = rounds.slice(5, 10).reduce((sum, r) => sum + r.scoreDifferential, 0) / 5;
      improvement = olderAvg - recentAvg;
    }
    
    setResult({
      handicapIndex,
      averageDifferential: avgDiff,
      lowestDifferentials: lowestDiffs,
      roundsUsed: numToUse,
      totalRounds: rounds.length,
      improvement,
    });
  };

  const calculateCourseHandicap = (handicapIndex: number, slopeRating: number, courseRating: number, par: number): number => {
    // Course Handicap = Handicap Index × (Slope Rating / 113) + (Course Rating - Par)
    return Math.round(handicapIndex * (slopeRating / 113) + (courseRating - par));
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
      link.download = `golf-handicap-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Golf Handicap Results</title>
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

  // Prepare chart data
  const chartData = rounds.slice(0, 10).reverse().map((r, idx) => ({
    round: `R${rounds.length - idx}`,
    differential: parseFloat(r.scoreDifferential.toFixed(1)),
    score: r.adjustedGrossScore,
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Add New Round</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roundDate" className="text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </Label>
                <input
                  id="roundDate"
                  type="date"
                  value={roundDate}
                  onChange={(e) => setRoundDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseName" className="text-sm font-medium text-gray-700">
                  Course Name <span className="text-red-500">*</span>
                </Label>
                <input
                  id="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pebble Beach Golf Links"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseRating" className="text-sm font-medium text-gray-700">
                  Course Rating <span className="text-red-500">*</span>
                </Label>
                <input
                  id="courseRating"
                  type="number"
                  step="0.1"
                  value={courseRating}
                  onChange={(e) => setCourseRating(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="72.1"
                />
                <p className="text-xs text-gray-500">Found on scorecard (60-80)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slopeRating" className="text-sm font-medium text-gray-700">
                  Slope Rating <span className="text-red-500">*</span>
                </Label>
                <input
                  id="slopeRating"
                  type="number"
                  value={slopeRating}
                  onChange={(e) => setSlopeRating(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="113"
                />
                <p className="text-xs text-gray-500">Standard: 113 (55-155)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustedGrossScore" className="text-sm font-medium text-gray-700">
                  Adjusted Gross Score <span className="text-red-500">*</span>
                </Label>
                <input
                  id="adjustedGrossScore"
                  type="number"
                  value={adjustedGrossScore}
                  onChange={(e) => setAdjustedGrossScore(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="85"
                />
                <p className="text-xs text-gray-500">Your score for 18 holes</p>
              </div>

              <Button 
                onClick={handleAddRound}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Round
              </Button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">WHS Requirements:</h4>
                <ul className="text-xs text-blue-900 space-y-1">
                  <li>• Minimum 3 rounds needed</li>
                  <li>• Best with 20 recent rounds</li>
                  <li>• Uses 8 of 20 best scores</li>
                  <li>• Updates after each round</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {rounds.length >= 3 && (
            <Button 
              onClick={calculateHandicap}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Handicap ({rounds.length} rounds)
            </Button>
          )}
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {result ? (
            <>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Your Handicap Index</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Official Handicap Index</p>
                      <p className="text-5xl font-bold text-blue-700">{result.handicapIndex.toFixed(1)}</p>
                      {result.improvement !== 0 && (
                        <p className={`text-sm mt-2 ${result.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.improvement > 0 ? '↓' : '↑'} {Math.abs(result.improvement).toFixed(1)} from 5 rounds ago
                        </p>
                      )}
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Rounds Used</p>
                      <p className="text-2xl font-bold text-gray-900">{result.roundsUsed} / {result.totalRounds}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Avg Differential</p>
                      <p className="text-2xl font-bold text-gray-900">{result.averageDifferential.toFixed(1)}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Lowest Differentials Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.lowestDifferentials.map((diff, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {diff.toFixed(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Chart */}
              {chartData.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="differential" stroke="#1e40af" strokeWidth={2} name="Score Differential" />
                        <Line type="monotone" dataKey="score" stroke="#059669" strokeWidth={2} name="Gross Score" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Course Handicap Calculator */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Course Handicap Examples</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Your playing handicap varies by course difficulty:
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Easy Course (Slope 100)</p>
                        <p className="text-xs text-gray-600">Rating 68.5, Par 72</p>
                      </div>
                      <p className="text-xl font-bold text-blue-700">
                        {calculateCourseHandicap(result.handicapIndex, 100, 68.5, 72)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Average Course (Slope 113)</p>
                        <p className="text-xs text-gray-600">Rating 72.0, Par 72</p>
                      </div>
                      <p className="text-xl font-bold text-blue-700">
                        {calculateCourseHandicap(result.handicapIndex, 113, 72.0, 72)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Hard Course (Slope 135)</p>
                        <p className="text-xs text-gray-600">Rating 75.2, Par 72</p>
                      </div>
                      <p className="text-xl font-bold text-blue-700">
                        {calculateCourseHandicap(result.handicapIndex, 135, 75.2, 72)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">
                  {rounds.length === 0 && 'Add your rounds to start tracking your handicap'}
                  {rounds.length > 0 && rounds.length < 3 && `Add ${3 - rounds.length} more round(s) to calculate handicap (${rounds.length}/3)`}
                  {rounds.length >= 3 && 'Click Calculate Handicap to see your index'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Rounds History */}
      {rounds.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Round History ({rounds.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Course</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Rating</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Slope</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Score</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Differential</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rounds.map((round) => (
                  <tr key={round.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {new Date(round.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{round.courseName}</td>
                    <td className="px-4 py-3 text-sm text-center">{round.courseRating.toFixed(1)}</td>
                    <td className="px-4 py-3 text-sm text-center">{round.slopeRating}</td>
                    <td className="px-4 py-3 text-sm text-center font-semibold">{round.adjustedGrossScore}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`px-2 py-1 rounded ${
                        round.scoreDifferential < 10 ? 'bg-green-100 text-green-800' :
                        round.scoreDifferential < 20 ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {round.scoreDifferential.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        onClick={() => handleDeleteRound(round.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
        calculatorName="Golf Handicap Calculator"
      />
    </div>
  );
}

