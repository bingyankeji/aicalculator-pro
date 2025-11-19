'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, FileText, Plus, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface Test {
  id: string;
  name: string;
  totalQuestions: number;
  correctAnswers: number;
  weight: number;
}

interface TestResult {
  percentage: number;
  letterGrade: string;
  gpa: number;
  wrongAnswers: number;
  passFail: 'Pass' | 'Fail';
}

interface MultiTestResult {
  tests: Array<{
    name: string;
    percentage: number;
    letterGrade: string;
    weight: number;
  }>;
  weightedAverage: number;
  unweightedAverage: number;
  letterGrade: string;
  gpa: number;
}

export default function TestScoreCalculator() {
  const [mode, setMode] = useState<'single' | 'multiple'>('single');
  
  // Single test mode
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [passingGrade, setPassingGrade] = useState(60);
  const [useCurve, setUseCurve] = useState(false);
  const [curvePoints, setCurvePoints] = useState(5);
  
  // Multiple tests mode
  const [tests, setTests] = useState<Test[]>([
    { id: '1', name: 'Test 1', totalQuestions: 20, correctAnswers: 0, weight: 50 },
    { id: '2', name: 'Test 2', totalQuestions: 20, correctAnswers: 0, weight: 50 },
  ]);
  
  const [result, setResult] = useState<TestResult | null>(null);
  const [multiResult, setMultiResult] = useState<MultiTestResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/test-score-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Scored ${result.percentage.toFixed(1)}% (${result.letterGrade}) on test!`
        : 'Calculate your test score!',
  });

  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  };

  const getGPA = (percentage: number): number => {
    if (percentage >= 93) return 4.0;
    if (percentage >= 90) return 3.7;
    if (percentage >= 87) return 3.3;
    if (percentage >= 83) return 3.0;
    if (percentage >= 80) return 2.7;
    if (percentage >= 77) return 2.3;
    if (percentage >= 73) return 2.0;
    if (percentage >= 70) return 1.7;
    if (percentage >= 67) return 1.3;
    if (percentage >= 63) return 1.0;
    if (percentage >= 60) return 0.7;
    return 0.0;
  };

  const calculateSingleTest = () => {
    if (totalQuestions <= 0 || correctAnswers < 0 || correctAnswers > totalQuestions) {
      alert('Please enter valid values');
      return;
    }

    let percentage = (correctAnswers / totalQuestions) * 100;
    
    // Apply curve if enabled
    if (useCurve) {
      percentage = Math.min(100, percentage + curvePoints);
    }

    const wrongAnswers = totalQuestions - correctAnswers;
    const letterGrade = getLetterGrade(percentage);
    const gpa = getGPA(percentage);
    const passFail = percentage >= passingGrade ? 'Pass' : 'Fail';

    setResult({
      percentage,
      letterGrade,
      gpa,
      wrongAnswers,
      passFail,
    });
    setMultiResult(null);
  };

  const addTest = () => {
    setTests([...tests, {
      id: Date.now().toString(),
      name: `Test ${tests.length + 1}`,
      totalQuestions: 20,
      correctAnswers: 0,
      weight: 0,
    }]);
  };

  const removeTest = (id: string) => {
    if (tests.length > 1) {
      setTests(tests.filter(t => t.id !== id));
    }
  };

  const updateTest = (id: string, field: keyof Test, value: string | number) => {
    setTests(tests.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const calculateMultipleTests = () => {
    const totalWeight = tests.reduce((sum, t) => sum + t.weight, 0);
    
    if (Math.abs(totalWeight - 100) > 0.01) {
      alert(`Total weight must equal 100%. Current total: ${totalWeight}%`);
      return;
    }

    const testResults = tests.map(test => {
      const percentage = test.totalQuestions > 0 
        ? (test.correctAnswers / test.totalQuestions) * 100 
        : 0;
      return {
        name: test.name,
        percentage,
        letterGrade: getLetterGrade(percentage),
        weight: test.weight,
      };
    });

    const weightedAverage = testResults.reduce((sum, test) => 
      sum + (test.percentage * test.weight / 100), 0
    );

    const unweightedAverage = testResults.reduce((sum, test) => 
      sum + test.percentage, 0
    ) / testResults.length;

    setMultiResult({
      tests: testResults,
      weightedAverage,
      unweightedAverage,
      letterGrade: getLetterGrade(weightedAverage),
      gpa: getGPA(weightedAverage),
    });
    setResult(null);
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
      link.download = `test-score-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Test Score Results</title>
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
      {/* Mode Selection */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={() => setMode('single')}
          variant={mode === 'single' ? 'default' : 'outline'}
          className="min-w-[140px]"
        >
          Single Test
        </Button>
        <Button
          onClick={() => setMode('multiple')}
          variant={mode === 'multiple' ? 'default' : 'outline'}
          className="min-w-[140px]"
        >
          Multiple Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {mode === 'single' ? (
            // Single Test Mode
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Test Score Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totalQuestions" className="text-sm font-medium text-gray-700">
                    Total Questions
                  </Label>
                  <input
                    id="totalQuestions"
                    type="number"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correctAnswers" className="text-sm font-medium text-gray-700">
                    Correct Answers
                  </Label>
                  <input
                    id="correctAnswers"
                    type="number"
                    value={correctAnswers}
                    onChange={(e) => setCorrectAnswers(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max={totalQuestions}
                  />
                  <p className="text-xs text-gray-500">
                    Wrong answers: {totalQuestions - correctAnswers}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingGrade" className="text-sm font-medium text-gray-700">
                    Passing Grade (%)
                  </Label>
                  <input
                    id="passingGrade"
                    type="number"
                    value={passingGrade}
                    onChange={(e) => setPassingGrade(Math.max(0, Math.min(100, parseInt(e.target.value) || 60)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="pt-3 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useCurve" className="text-sm font-medium text-gray-700">
                      Apply Curve
                    </Label>
                    <input
                      id="useCurve"
                      type="checkbox"
                      checked={useCurve}
                      onChange={(e) => setUseCurve(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  {useCurve && (
                    <div className="space-y-2">
                      <Label htmlFor="curvePoints" className="text-sm font-medium text-gray-700">
                        Curve Points
                      </Label>
                      <input
                        id="curvePoints"
                        type="number"
                        value={curvePoints}
                        onChange={(e) => setCurvePoints(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="20"
                      />
                      <p className="text-xs text-gray-500">
                        Add {curvePoints} points to final score
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={calculateSingleTest}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Calculate Score
                </Button>

                {/* Quick Reference */}
                <div className="pt-3 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Reference</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>90-100% = A (Excellent)</p>
                    <p>80-89% = B (Good)</p>
                    <p>70-79% = C (Average)</p>
                    <p>60-69% = D (Below Average)</p>
                    <p>0-59% = F (Failing)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Multiple Tests Mode
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Multiple Tests Average
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Tests</Label>
                    <Button onClick={addTest} size="sm" variant="outline" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Test
                    </Button>
                  </div>

                  <div className="max-h-[500px] overflow-y-auto space-y-3">
                    {tests.map((test, index) => (
                      <div key={test.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={test.name}
                            onChange={(e) => updateTest(test.id, 'name', e.target.value)}
                            className="flex-1 px-2 py-1 text-sm font-semibold border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Test name"
                          />
                          {tests.length > 1 && (
                            <Button
                              onClick={() => removeTest(test.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs text-gray-600">Total Q</Label>
                            <input
                              type="number"
                              value={test.totalQuestions || ''}
                              onChange={(e) => updateTest(test.id, 'totalQuestions', parseInt(e.target.value) || 0)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="0"
                              min="1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Correct</Label>
                            <input
                              type="number"
                              value={test.correctAnswers || ''}
                              onChange={(e) => updateTest(test.id, 'correctAnswers', parseInt(e.target.value) || 0)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="0"
                              min="0"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Weight %</Label>
                            <input
                              type="number"
                              value={test.weight || ''}
                              onChange={(e) => updateTest(test.id, 'weight', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="0"
                              min="0"
                              max="100"
                            />
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">
                          Score: {test.totalQuestions > 0 ? ((test.correctAnswers / test.totalQuestions) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total Weight Indicator */}
                  <div className={`p-3 rounded-lg ${
                    Math.abs(tests.reduce((sum, t) => sum + t.weight, 0) - 100) < 0.01 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  } border`}>
                    <p className="text-sm font-semibold">
                      Total Weight: {tests.reduce((sum, t) => sum + t.weight, 0).toFixed(1)}%
                    </p>
                    {Math.abs(tests.reduce((sum, t) => sum + t.weight, 0) - 100) >= 0.01 && (
                      <p className="text-xs text-red-600 mt-1">Must equal 100%</p>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={calculateMultipleTests}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Calculate Average
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            // Single Test Results
            <div ref={resultRef}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Main Score */}
                    <div className={`${
                      result.passFail === 'Pass' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                    } border-2 rounded-lg p-6 text-center`}>
                      <p className="text-sm text-gray-600 mb-2">Your Score</p>
                      <p className="text-6xl font-bold mb-2" style={{ 
                        color: result.passFail === 'Pass' ? '#16a34a' : '#dc2626' 
                      }}>
                        {result.percentage.toFixed(1)}%
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 mb-1">
                        {result.letterGrade}
                      </p>
                      <p className="text-lg text-gray-700">
                        GPA: {result.gpa.toFixed(2)}
                      </p>
                      <div className={`mt-4 inline-block px-4 py-2 rounded-full font-semibold ${
                        result.passFail === 'Pass' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.passFail}
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Total Questions</p>
                        <p className="text-2xl font-bold text-blue-700">{totalQuestions}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Correct</p>
                        <p className="text-2xl font-bold text-green-700">{correctAnswers}</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Wrong</p>
                        <p className="text-2xl font-bold text-red-700">{result.wrongAnswers}</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Passing Grade</p>
                        <p className="text-2xl font-bold text-purple-700">{passingGrade}%</p>
                      </div>
                    </div>

                    {useCurve && (
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">📊 Curve Applied</h4>
                        <p className="text-sm text-gray-700">
                          Original score: {((correctAnswers / totalQuestions) * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-700">
                          Curve bonus: +{curvePoints} points
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          Final score: {result.percentage.toFixed(1)}%
                        </p>
                      </div>
                    )}

                    {/* Performance Analysis */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Performance Analysis</h3>
                      <div className="space-y-2">
                        {result.percentage >= 90 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-green-900">🎉 Excellent Performance!</p>
                            <p className="text-xs text-gray-700 mt-1">
                              You demonstrated outstanding mastery of the material. Keep up the great work!
                            </p>
                          </div>
                        )}
                        {result.percentage >= 70 && result.percentage < 90 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-blue-900">👍 Good Performance</p>
                            <p className="text-xs text-gray-700 mt-1">
                              You have a solid understanding. Review the questions you missed to improve further.
                            </p>
                          </div>
                        )}
                        {result.percentage >= passingGrade && result.percentage < 70 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-yellow-900">⚠️ Passing, But Room for Improvement</p>
                            <p className="text-xs text-gray-700 mt-1">
                              You passed, but consider reviewing the material more thoroughly for better retention.
                            </p>
                          </div>
                        )}
                        {result.percentage < passingGrade && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-red-900">📚 Needs Improvement</p>
                            <p className="text-xs text-gray-700 mt-1">
                              Consider reviewing the material, seeking help from your instructor, or forming a study group.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Grading Scale */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Grading Scale</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-center">
                          <span className="font-bold">A</span><br/>93-100%
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-center">
                          <span className="font-bold">B</span><br/>83-92%
                        </div>
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-center">
                          <span className="font-bold">C</span><br/>73-82%
                        </div>
                        <div className="p-2 bg-orange-50 border border-orange-200 rounded text-center">
                          <span className="font-bold">D</span><br/>60-72%
                        </div>
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-center">
                          <span className="font-bold">F</span><br/>0-59%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : multiResult ? (
            // Multiple Tests Results
            <div ref={resultRef}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Average Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Weighted Average */}
                    <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Weighted Average</p>
                      <p className="text-6xl font-bold text-blue-700 mb-2">
                        {multiResult.weightedAverage.toFixed(1)}%
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 mb-1">
                        {multiResult.letterGrade}
                      </p>
                      <p className="text-lg text-gray-700">
                        GPA: {multiResult.gpa.toFixed(2)}
                      </p>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Weighted Average</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {multiResult.weightedAverage.toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Unweighted Average</p>
                        <p className="text-2xl font-bold text-green-700">
                          {multiResult.unweightedAverage.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Individual Test Results */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Individual Test Scores</h3>
                      <div className="space-y-2">
                        {multiResult.tests.map((test, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">{test.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-gray-900">
                                {test.percentage.toFixed(1)}%
                              </span>
                              <span className="text-xs text-gray-600 ml-2">
                                ({test.letterGrade}, {test.weight}% weight)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Distribution */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Score Distribution</h3>
                      <div className="space-y-2">
                        {multiResult.tests.map((test, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{test.name}</span>
                              <span>{test.percentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${test.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {mode === 'single' 
                    ? 'Enter your test details to calculate your score'
                    : 'Enter multiple test scores to calculate weighted average'}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {mode === 'single'
                    ? 'Supports curve grading and custom passing grades'
                    : 'Make sure total weight equals 100%'}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {(result || multiResult) && (
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
        calculatorName="Test Score Calculator"
      />
    </div>
  );
}

