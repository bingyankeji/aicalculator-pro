'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Trash2, Target, TrendingUp, Share2, Save, Printer, AlertCircle } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  gradePoints: number;
}

interface GPAResult {
  currentGPA: number;
  totalCredits: number;
  totalGradePoints: number;
  letterGrade: string;
  academicStanding: string;
  qualityPoints: number;
}

const gradeScales = {
  '4.0': [
    { grade: 'A+', points: 4.0, range: '97-100%' },
    { grade: 'A', points: 4.0, range: '93-96%' },
    { grade: 'A-', points: 3.7, range: '90-92%' },
    { grade: 'B+', points: 3.3, range: '87-89%' },
    { grade: 'B', points: 3.0, range: '83-86%' },
    { grade: 'B-', points: 2.7, range: '80-82%' },
    { grade: 'C+', points: 2.3, range: '77-79%' },
    { grade: 'C', points: 2.0, range: '73-76%' },
    { grade: 'C-', points: 1.7, range: '70-72%' },
    { grade: 'D+', points: 1.3, range: '67-69%' },
    { grade: 'D', points: 1.0, range: '63-66%' },
    { grade: 'D-', points: 0.7, range: '60-62%' },
    { grade: 'F', points: 0.0, range: '0-59%' },
  ],
  '5.0': [
    { grade: 'A+', points: 5.0, range: '97-100%' },
    { grade: 'A', points: 5.0, range: '93-96%' },
    { grade: 'A-', points: 4.7, range: '90-92%' },
    { grade: 'B+', points: 4.3, range: '87-89%' },
    { grade: 'B', points: 4.0, range: '83-86%' },
    { grade: 'B-', points: 3.7, range: '80-82%' },
    { grade: 'C+', points: 3.3, range: '77-79%' },
    { grade: 'C', points: 3.0, range: '73-76%' },
    { grade: 'C-', points: 2.7, range: '70-72%' },
    { grade: 'D+', points: 2.3, range: '67-69%' },
    { grade: 'D', points: 2.0, range: '63-66%' },
    { grade: 'D-', points: 1.7, range: '60-62%' },
    { grade: 'F', points: 0.0, range: '0-59%' },
  ],
};

export function GPACalculator() {
  const [scale, setScale] = useState<'4.0' | '5.0'>('4.0');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Math 101', grade: 'A', credits: 3, gradePoints: 4.0 },
    { id: '2', name: 'English 101', grade: 'B+', credits: 3, gradePoints: 3.3 },
    { id: '3', name: 'History 101', grade: 'A-', credits: 3, gradePoints: 3.7 },
  ]);
  const [result, setResult] = useState<GPAResult | null>(null);
  
  // Target GPA calculator
  const [showTargetGPA, setShowTargetGPA] = useState(false);
  const [targetGPA, setTargetGPA] = useState(3.5);
  const [additionalCredits, setAdditionalCredits] = useState(12);
  const [requiredGPA, setRequiredGPA] = useState<number | null>(null);

  const getGradePoints = (grade: string): number => {
    const gradeData = gradeScales[scale].find(g => g.grade === grade);
    return gradeData ? gradeData.points : 0;
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      grade: 'A',
      credits: 3,
      gradePoints: getGradePoints('A'),
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        const updated = { ...course, [field]: value };
        if (field === 'grade') {
          updated.gradePoints = getGradePoints(value);
        }
        return updated;
      }
      return course;
    }));
  };

  const calculateGPA = () => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = courses.reduce((sum, course) => sum + (course.gradePoints * course.credits), 0);
    const currentGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    // Determine letter grade
    let letterGrade = 'F';
    const maxScale = scale === '4.0' ? 4.0 : 5.0;
    if (currentGPA >= maxScale * 0.93) letterGrade = 'A';
    else if (currentGPA >= maxScale * 0.90) letterGrade = 'A-';
    else if (currentGPA >= maxScale * 0.87) letterGrade = 'B+';
    else if (currentGPA >= maxScale * 0.83) letterGrade = 'B';
    else if (currentGPA >= maxScale * 0.80) letterGrade = 'B-';
    else if (currentGPA >= maxScale * 0.77) letterGrade = 'C+';
    else if (currentGPA >= maxScale * 0.73) letterGrade = 'C';
    else if (currentGPA >= maxScale * 0.70) letterGrade = 'C-';
    else if (currentGPA >= maxScale * 0.67) letterGrade = 'D+';
    else if (currentGPA >= maxScale * 0.60) letterGrade = 'D';

    // Academic standing
    let academicStanding = 'Academic Probation';
    const thresholds = scale === '4.0' 
      ? { excellent: 3.7, good: 3.3, satisfactory: 3.0, poor: 2.0 }
      : { excellent: 4.7, good: 4.3, satisfactory: 4.0, poor: 3.0 };
    
    if (currentGPA >= thresholds.excellent) academicStanding = 'Excellent (Dean\'s List)';
    else if (currentGPA >= thresholds.good) academicStanding = 'Good Standing';
    else if (currentGPA >= thresholds.satisfactory) academicStanding = 'Satisfactory';
    else if (currentGPA >= thresholds.poor) academicStanding = 'Fair';

    setResult({
      currentGPA,
      totalCredits,
      totalGradePoints,
      letterGrade,
      academicStanding,
      qualityPoints: totalGradePoints,
    });
  };

  // Calculate required GPA for target
  const calculateRequiredGPA = () => {
    if (!result) return;
    
    const currentPoints = result.totalGradePoints;
    const currentCredits = result.totalCredits;
    const targetPoints = targetGPA * (currentCredits + additionalCredits);
    const requiredPoints = targetPoints - currentPoints;
    const required = additionalCredits > 0 ? requiredPoints / additionalCredits : 0;
    
    setRequiredGPA(Math.max(0, Math.min(required, scale === '4.0' ? 4.0 : 5.0)));
  };

  useEffect(() => {
    calculateGPA();
  }, [courses, scale]);

  useEffect(() => {
    if (showTargetGPA && result) {
      calculateRequiredGPA();
    }
  }, [targetGPA, additionalCredits, result, showTargetGPA]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/gpa-calculator',
    getShareParams: () => {
      const params: any = { s: scale };
      courses.forEach((course, index) => {
        params[`c${index}n`] = course.name;
        params[`c${index}g`] = course.grade;
        params[`c${index}cr`] = course.credits.toString();
      });
      return params;
    },
    getShareText: () =>
      result
        ? `My GPA: ${result.currentGPA.toFixed(2)} (${result.letterGrade}) | ${result.totalCredits} Credits | ${result.academicStanding}`
        : 'Check out my GPA calculation!',
  });

  // Save as image
  const handleSaveImage = async () => {
    const element = document.getElementById('gpa-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'gpa-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  const maxScale = scale === '4.0' ? 4.0 : 5.0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Scale Selector */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-600" />
          GPA Scale
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => setScale('4.0')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              scale === '4.0'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            4.0 Scale (US Standard)
          </button>
          <button
            onClick={() => setScale('5.0')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              scale === '5.0'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            5.0 Scale (Weighted)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Courses Input - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Your Courses</h3>
              <button
                onClick={addCourse}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </button>
            </div>

            <div className="space-y-4">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
                <div className="col-span-4">Course Name</div>
                <div className="col-span-3">Grade</div>
                <div className="col-span-3">Credits</div>
                <div className="col-span-2">Points</div>
              </div>

              {/* Course Rows */}
              {courses.map((course) => (
                <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Course name"
                    />
                  </div>
                  <div className="col-span-3">
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-semibold"
                    >
                      {gradeScales[scale].map((g) => (
                        <option key={g.grade} value={g.grade}>
                          {g.grade} ({g.points})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={course.credits || ''}
                      onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      min="0"
                      max="12"
                      step="0.5"
                    />
                  </div>
                  <div className="col-span-1 text-center font-semibold text-purple-600">
                    {(course.gradePoints * course.credits).toFixed(1)}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700">Total Credits:</span>
                <span className="font-bold text-purple-600">
                  {courses.reduce((sum, c) => sum + c.credits, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Grade Scale Reference */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{scale} Grade Scale</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {gradeScales[scale].map((g) => (
                <div key={g.grade} className="flex justify-between bg-white rounded px-3 py-2">
                  <span className="font-semibold">{g.grade}</span>
                  <span className="text-gray-600">{g.points} pts</span>
                  <span className="text-gray-500">{g.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="gpa-result" className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg border border-purple-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Your GPA
                </h3>

                {/* GPA Value */}
                <div className="bg-white rounded-lg p-6 mb-4 border border-purple-200 text-center">
                  <div className="text-sm text-gray-600 mb-2">Cumulative GPA</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-2 break-all">
                    {result.currentGPA.toFixed(2)}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {result.letterGrade} Grade
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Out of {maxScale.toFixed(1)}
                  </div>
                </div>

                {/* Academic Standing */}
                <div className={`rounded-lg p-4 mb-4 ${
                  result.academicStanding.includes('Excellent') 
                    ? 'bg-green-100 border border-green-300'
                    : result.academicStanding.includes('Good')
                    ? 'bg-blue-100 border border-blue-300'
                    : result.academicStanding.includes('Satisfactory')
                    ? 'bg-yellow-100 border border-yellow-300'
                    : 'bg-red-100 border border-red-300'
                }`}>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Academic Standing</div>
                  <div className="font-bold text-gray-900">{result.academicStanding}</div>
                </div>

                {/* Statistics */}
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Credits:</span>
                      <span className="font-bold">{result.totalCredits}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quality Points:</span>
                      <span className="font-bold">{result.qualityPoints.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Scholarship Eligibility */}
                <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <div className="text-sm font-semibold text-gray-900 mb-2">💰 Scholarship Eligibility</div>
                  <div className="space-y-2 text-xs text-gray-700">
                    {result.currentGPA >= maxScale * 0.90 && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Eligible for academic scholarships</span>
                      </div>
                    )}
                    {result.currentGPA >= maxScale * 0.875 && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Dean's List qualified</span>
                      </div>
                    )}
                    {result.currentGPA >= maxScale * 0.75 && (
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>Good academic standing</span>
                      </div>
                    )}
                    {result.currentGPA < maxScale * 0.50 && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>Academic improvement needed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Target GPA Calculator */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <button
                  onClick={() => setShowTargetGPA(!showTargetGPA)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    Target GPA Calculator
                  </h3>
                  <span className="text-gray-400">{showTargetGPA ? '▼' : '▶'}</span>
                </button>

                {showTargetGPA && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target GPA
                      </label>
                      <input
                        type="number"
                        value={targetGPA}
                        onChange={(e) => setTargetGPA(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.1"
                        min="0"
                        max={maxScale}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Credits
                      </label>
                      <input
                        type="number"
                        value={additionalCredits}
                        onChange={(e) => setAdditionalCredits(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        max="30"
                      />
                    </div>

                    {requiredGPA !== null && (
                      <div className={`rounded-lg p-4 ${
                        requiredGPA > maxScale 
                          ? 'bg-red-100 border border-red-300'
                          : requiredGPA > maxScale * 0.90
                          ? 'bg-orange-100 border border-orange-300'
                          : 'bg-green-100 border border-green-300'
                      }`}>
                        <div className="text-sm text-gray-700 mb-2">
                          To reach <strong>{targetGPA.toFixed(2)} GPA</strong>, you need:
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-all">
                          {requiredGPA.toFixed(2)} GPA
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          In the next {additionalCredits} credits
                        </div>
                        {requiredGPA > maxScale && (
                          <div className="mt-3 text-sm text-red-700 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>
                              This target is mathematically impossible to achieve with {additionalCredits} credits. 
                              Try increasing credits or lowering target GPA.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share GPA
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="GPA Calculator"
      />
    </div>
  );
}

