"use client";

import React, { useState } from "react";
import { Calculator, Plus, Trash2, Download, Printer, Share2, X } from "lucide-react";

interface Assignment {
  id: string;
  name: string;
  grade: number;
  weight: number;
}

interface GradeResult {
  weightedAverage: number;
  letterGrade: string;
  gpa: number;
  totalPoints: number;
  totalWeight: number;
  status: 'excellent' | 'good' | 'average' | 'below-average' | 'failing';
}

export function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Homework', grade: 85, weight: 20 },
    { id: '2', name: 'Midterm Exam', grade: 78, weight: 30 },
    { id: '3', name: 'Final Exam', grade: 0, weight: 50 },
  ]);
  
  const [newAssignment, setNewAssignment] = useState({
    name: '',
    grade: 0,
    weight: 0,
  });
  
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const addAssignment = () => {
    if (newAssignment.name && newAssignment.weight > 0) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        name: newAssignment.name,
        grade: newAssignment.grade,
        weight: newAssignment.weight,
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ name: '', grade: 0, weight: 0 });
    }
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string | number) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const calculateGrade = () => {
    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    
    if (totalWeight === 0) {
      alert("Total weight cannot be 0%");
      return;
    }

    const weightedSum = assignments.reduce((sum, a) => sum + (a.grade * a.weight / 100), 0);
    const weightedAverage = (weightedSum / totalWeight) * 100;
    
    const letterGrade = getLetterGrade(weightedAverage);
    const gpa = getGPA(weightedAverage);
    const status = getStatus(weightedAverage);

    setResult({
      weightedAverage,
      letterGrade,
      gpa,
      totalPoints: weightedSum,
      totalWeight,
      status,
    });
  };

  const getLetterGrade = (score: number): string => {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 63) return 'D';
    if (score >= 60) return 'D-';
    return 'F';
  };

  const getGPA = (score: number): number => {
    if (score >= 97) return 4.0;
    if (score >= 93) return 4.0;
    if (score >= 90) return 3.7;
    if (score >= 87) return 3.3;
    if (score >= 83) return 3.0;
    if (score >= 80) return 2.7;
    if (score >= 77) return 2.3;
    if (score >= 73) return 2.0;
    if (score >= 70) return 1.7;
    if (score >= 67) return 1.3;
    if (score >= 63) return 1.0;
    if (score >= 60) return 0.7;
    return 0.0;
  };

  const getStatus = (score: number): GradeResult['status'] => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    if (score >= 60) return 'below-average';
    return 'failing';
  };

  const getStatusColor = (status: GradeResult['status']): string => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'average': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'below-average': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'failing': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusText = (status: GradeResult['status']): string => {
    switch (status) {
      case 'excellent': return 'Excellent Performance';
      case 'good': return 'Good Performance';
      case 'average': return 'Average Performance';
      case 'below-average': return 'Below Average Performance';
      case 'failing': return 'Failing Grade';
    }
  };

  const getRecommendations = (status: GradeResult['status'], score: number): string[] => {
    switch (status) {
      case 'excellent':
        return [
          'Keep up the excellent work!',
          'Consider helping classmates who are struggling',
          'Maintain your study habits and time management',
          'Explore advanced topics to challenge yourself',
        ];
      case 'good':
        return [
          'You\'re doing well! A little more effort can push you to excellence',
          'Review materials regularly to maintain consistency',
          'Participate actively in class discussions',
          'Seek feedback from instructors on areas to improve',
        ];
      case 'average':
        return [
          'Focus on understanding concepts rather than memorization',
          'Create a study schedule and stick to it',
          'Form study groups with classmates',
          'Don\'t hesitate to ask questions during class',
          'Utilize office hours for additional help',
        ];
      case 'below-average':
        return [
          'Identify specific topics you\'re struggling with',
          'Seek help from instructors or tutoring services immediately',
          'Dedicate more time to studying and homework',
          'Review previous assignments to identify patterns',
          'Consider reducing extracurricular activities temporarily',
        ];
      case 'failing':
        return [
          'Meet with your instructor as soon as possible',
          'Explore tutoring options or academic support services',
          'Assess if you need to drop the course (check deadlines)',
          'Identify any personal issues affecting your performance',
          'Create a recovery plan with specific, achievable goals',
        ];
    }
  };

  const clearAll = () => {
    setAssignments([{ id: '1', name: 'Assignment', grade: 0, weight: 0 }]);
    setResult(null);
  };

  const saveAsImage = async () => {
    const element = document.getElementById('grade-result');
    if (!element) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'grade-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    const params = new URLSearchParams();
    assignments.forEach((a, i) => {
      params.set(`a${i}n`, a.name);
      params.set(`a${i}g`, a.grade.toString());
      params.set(`a${i}w`, a.weight.toString());
    });
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const shareToSocial = (platform: string) => {
    if (!result) return;
    
    const text = `My Grade: ${result.weightedAverage.toFixed(2)}% (${result.letterGrade}, GPA: ${result.gpa.toFixed(2)})`;
    const url = window.location.href;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent('Grade Calculation')}&body=${encodeURIComponent(text + '\n\n' + url)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // Load from URL parameters on mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadedAssignments: Assignment[] = [];
    
    let i = 0;
    while (params.has(`a${i}n`)) {
      const name = params.get(`a${i}n`)!;
      const grade = parseFloat(params.get(`a${i}g`) || '0');
      const weight = parseFloat(params.get(`a${i}w`) || '0');
      
      loadedAssignments.push({
        id: `${i}`,
        name,
        grade,
        weight,
      });
      i++;
    }
    
    if (loadedAssignments.length > 0) {
      setAssignments(loadedAssignments);
      setTimeout(() => {
        calculateGrade();
      }, 100);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignments List */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Assignments & Grades</h3>
            
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-gray-700 pb-2 border-b">
                <div className="col-span-5">Assignment Name</div>
                <div className="col-span-3">Grade (%)</div>
                <div className="col-span-3">Weight (%)</div>
                <div className="col-span-1"></div>
              </div>

              {/* Assignment Rows */}
              {assignments.map((assignment) => (
                <div key={assignment.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={assignment.name}
                    onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                    className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Assignment name"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={assignment.grade}
                    onChange={(e) => updateAssignment(assignment.id, 'grade', parseFloat(e.target.value) || 0)}
                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(assignment.id, 'weight', parseFloat(e.target.value) || 0)}
                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <button
                    onClick={() => removeAssignment(assignment.id)}
                    className="col-span-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add New Assignment */}
              <div className="grid grid-cols-12 gap-2 items-center pt-4 border-t">
                <input
                  type="text"
                  value={newAssignment.name}
                  onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
                  className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="New assignment name"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={newAssignment.grade || ''}
                  onChange={(e) => setNewAssignment({ ...newAssignment, grade: parseFloat(e.target.value) || 0 })}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Grade"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={newAssignment.weight || ''}
                  onChange={(e) => setNewAssignment({ ...newAssignment, weight: parseFloat(e.target.value) || 0 })}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Weight"
                />
                <button
                  onClick={addAssignment}
                  className="col-span-1 p-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors"
                  title="Add"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={calculateGrade}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium"
              >
                Calculate Grade
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-md font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-1 space-y-6">
          {result && (
            <>
              <div id="grade-result" className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Grade</h3>
                
                {/* Weighted Average */}
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-purple-600 mb-2">
                    {result.weightedAverage.toFixed(2)}%
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {result.letterGrade}
                  </div>
                  <div className="text-lg text-gray-600 mt-2">
                    GPA: {result.gpa.toFixed(2)}
                  </div>
                </div>

                {/* Status */}
                <div className={`p-4 rounded-lg border-2 text-center font-semibold mb-4 ${getStatusColor(result.status)}`}>
                  {getStatusText(result.status)}
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Weight:</span>
                    <span className="font-semibold text-gray-900">{result.totalWeight.toFixed(1)}%</span>
                  </div>
                  {result.totalWeight !== 100 && (
                    <div className="text-orange-600 text-xs bg-orange-50 p-2 rounded">
                      ⚠️ Total weight is not 100%
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={saveAsImage}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-3">💡 Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {getRecommendations(result.status, result.weightedAverage).map((rec, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Share Your Grade</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">
              Share your grade calculation with friends or save the link for later
            </p>

            <div className="space-y-3">
              <button
                onClick={copyShareLink}
                className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                📋 Copy Link
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareToSocial('facebook')}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareToSocial('twitter')}
                  className="px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
                >
                  Twitter
                </button>
                <button
                  onClick={() => shareToSocial('whatsapp')}
                  className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => shareToSocial('email')}
                  className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
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

