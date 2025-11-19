'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, GraduationCap, Plus, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface Assignment {
  id: string;
  name: string;
  grade: number;
  weight: number;
}

interface GradeResult {
  currentGrade: number;
  finalExamWeight: number;
  neededScore: number;
  letterGrade: string;
  gpa: number;
  isPossible: boolean;
  maxPossibleGrade: number;
}

export default function FinalGradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Homework', grade: 0, weight: 20 },
    { id: '2', name: 'Midterm', grade: 0, weight: 30 },
  ]);
  const [finalExamWeight, setFinalExamWeight] = useState(50);
  const [desiredGrade, setDesiredGrade] = useState(90);
  const [result, setResult] = useState<GradeResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/final-grade-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Need ${result.neededScore.toFixed(1)}% on final to get ${desiredGrade}%`
        : 'Calculate your final grade!',
  });

  const addAssignment = () => {
    setAssignments([...assignments, {
      id: Date.now().toString(),
      name: `Assignment ${assignments.length + 1}`,
      grade: 0,
      weight: 10,
    }]);
  };

  const removeAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string | number) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

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

  const calculateGrade = () => {
    // Validate total weight
    const totalAssignmentWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    const totalWeight = totalAssignmentWeight + finalExamWeight;

    if (Math.abs(totalWeight - 100) > 0.01) {
      alert(`Total weight must equal 100%. Current total: ${totalWeight}%`);
      return;
    }

    // Calculate current grade (without final)
    const currentWeightedSum = assignments.reduce((sum, a) => sum + (a.grade * a.weight / 100), 0);
    const currentGrade = currentWeightedSum;

    // Calculate needed score on final
    // Formula: desiredGrade = currentGrade + (finalScore * finalWeight / 100)
    // Solving for finalScore: finalScore = (desiredGrade - currentGrade) / (finalWeight / 100)
    const neededScore = (desiredGrade - currentGrade) / (finalExamWeight / 100);

    // Calculate max possible grade (if get 100 on final)
    const maxPossibleGrade = currentGrade + (100 * finalExamWeight / 100);

    const isPossible = neededScore <= 100;

    setResult({
      currentGrade,
      finalExamWeight,
      neededScore: Math.max(0, neededScore),
      letterGrade: getLetterGrade(desiredGrade),
      gpa: getGPA(desiredGrade),
      isPossible,
      maxPossibleGrade,
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
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `final-grade-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Final Grade Calculation</title>
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

  const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0) + finalExamWeight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Final Grade Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Assignments */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Current Grades</Label>
                  <Button onClick={addAssignment} size="sm" variant="outline" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>

                {assignments.map((assignment, index) => (
                  <div key={assignment.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={assignment.name}
                        onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                        className="flex-1 px-2 py-1 text-sm font-semibold border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        placeholder="Assignment name"
                      />
                      {assignments.length > 1 && (
                        <Button
                          onClick={() => removeAssignment(assignment.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-gray-600">Grade (%)</Label>
                        <input
                          type="number"
                          value={assignment.grade || ''}
                          onChange={(e) => updateAssignment(assignment.id, 'grade', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Weight (%)</Label>
                        <input
                          type="number"
                          value={assignment.weight || ''}
                          onChange={(e) => updateAssignment(assignment.id, 'weight', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Exam */}
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <div>
                  <Label htmlFor="finalWeight" className="text-sm font-medium text-gray-700">
                    Final Exam Weight (%)
                  </Label>
                  <input
                    id="finalWeight"
                    type="number"
                    value={finalExamWeight}
                    onChange={(e) => setFinalExamWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>

                <div>
                  <Label htmlFor="desiredGrade" className="text-sm font-medium text-gray-700">
                    Desired Final Grade (%)
                  </Label>
                  <input
                    id="desiredGrade"
                    type="number"
                    value={desiredGrade}
                    onChange={(e) => setDesiredGrade(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                {/* Total Weight Indicator */}
                <div className={`p-3 rounded-lg ${Math.abs(totalWeight - 100) < 0.01 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                  <p className="text-sm font-semibold">
                    Total Weight: {totalWeight.toFixed(1)}%
                  </p>
                  {Math.abs(totalWeight - 100) >= 0.01 && (
                    <p className="text-xs text-red-600 mt-1">
                      Must equal 100%
                    </p>
                  )}
                </div>
              </div>

              <Button 
                onClick={calculateGrade}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Calculate Required Score
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            <div ref={resultRef}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Grade Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Current Grade */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Standing</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">Current Grade</p>
                          <p className="text-3xl font-bold text-blue-700">{result.currentGrade.toFixed(2)}%</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {getLetterGrade(result.currentGrade)} ({getGPA(result.currentGrade).toFixed(2)} GPA)
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Max Possible Grade</p>
                          <p className="text-3xl font-bold text-green-700">{result.maxPossibleGrade.toFixed(2)}%</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {getLetterGrade(result.maxPossibleGrade)} ({getGPA(result.maxPossibleGrade).toFixed(2)} GPA)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Required Score */}
                    <div className={`${result.isPossible ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-2 rounded-lg p-6 text-center`}>
                      <p className="text-sm text-gray-600 mb-2">
                        To achieve {desiredGrade}% ({result.letterGrade} / {result.gpa.toFixed(2)} GPA)
                      </p>
                      <p className="text-5xl font-bold mb-2" style={{ color: result.isPossible ? '#16a34a' : '#dc2626' }}>
                        {result.neededScore.toFixed(1)}%
                      </p>
                      <p className="text-lg font-semibold">
                        {result.isPossible 
                          ? `You need ${result.neededScore.toFixed(1)}% on your final exam`
                          : 'This grade is not achievable'}
                      </p>
                      {!result.isPossible && (
                        <p className="text-sm text-red-600 mt-2">
                          Maximum possible grade: {result.maxPossibleGrade.toFixed(1)}%
                        </p>
                      )}
                    </div>

                    {/* Grade Breakdown */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Grade Breakdown</h3>
                      <div className="space-y-2">
                        {assignments.map((assignment) => (
                          <div key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">{assignment.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-gray-900">{assignment.grade}%</span>
                              <span className="text-xs text-gray-500 ml-2">({assignment.weight}% weight)</span>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                          <span className="text-sm font-semibold text-gray-900">Final Exam</span>
                          <div className="text-right">
                            <span className="text-sm font-bold text-blue-700">
                              {result.isPossible ? `${result.neededScore.toFixed(1)}%` : 'N/A'}
                            </span>
                            <span className="text-xs text-gray-600 ml-2">({result.finalExamWeight}% weight)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grading Scale */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Grading Scale Reference</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2 bg-green-50 border border-green-200 rounded">
                          <span className="font-bold">A:</span> 93-100% (4.0)
                        </div>
                        <div className="p-2 bg-green-50 border border-green-200 rounded">
                          <span className="font-bold">A-:</span> 90-92% (3.7)
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                          <span className="font-bold">B+:</span> 87-89% (3.3)
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                          <span className="font-bold">B:</span> 83-86% (3.0)
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                          <span className="font-bold">B-:</span> 80-82% (2.7)
                        </div>
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <span className="font-bold">C+:</span> 77-79% (2.3)
                        </div>
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <span className="font-bold">C:</span> 73-76% (2.0)
                        </div>
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <span className="font-bold">C-:</span> 70-72% (1.7)
                        </div>
                        <div className="p-2 bg-orange-50 border border-orange-200 rounded">
                          <span className="font-bold">D:</span> 60-69% (1.0)
                        </div>
                        <div className="p-2 bg-red-50 border border-red-200 rounded">
                          <span className="font-bold">F:</span> 0-59% (0.0)
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Study Tips</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Start studying early - don't cram the night before</li>
                        <li>• Focus on topics with the highest weight</li>
                        <li>• Review past exams and homework for patterns</li>
                        <li>• Form study groups with classmates</li>
                        <li>• Get enough sleep before the exam</li>
                        {result.isPossible && result.neededScore > 90 && (
                          <li className="text-orange-600 font-semibold">
                            • You need a high score - dedicate extra study time!
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter your grades to calculate required final exam score</p>
                <p className="text-gray-400 text-sm mt-2">Make sure total weight equals 100%</p>
              </CardContent>
            </Card>
          )}

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
        calculatorName="Final Grade Calculator"
      />
    </div>
  );
}

