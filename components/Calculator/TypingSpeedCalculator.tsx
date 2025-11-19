'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Keyboard, Timer, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface TestResult {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
}

const testTexts = {
  easy: "The quick brown fox jumps over the lazy dog. This is a simple typing test to measure your speed and accuracy. Keep typing to improve your skills.",
  medium: "Technology has revolutionized the way we communicate and work. Modern keyboards allow us to type faster than ever before, making digital communication seamless and efficient.",
  hard: "Proficiency in typing is an essential skill in today's digital workplace. Mastering keyboard shortcuts, touch typing techniques, and maintaining consistent accuracy can significantly enhance productivity.",
};

export default function TypingSpeedCalculator() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [testText, setTestText] = useState(testTexts.medium);
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [result, setResult] = useState<TestResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/typing-speed-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Typing Speed: ${result.wpm} WPM, ${result.accuracy}% accuracy`
        : 'Test your typing speed!',
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setUserInput('');
    setCurrentIndex(0);
    setTimeLeft(60);
    setResult(null);
    inputRef.current?.focus();
  };

  const resetTest = () => {
    setIsActive(false);
    setUserInput('');
    setCurrentIndex(0);
    setTimeLeft(60);
    setResult(null);
  };

  const finishTest = () => {
    setIsActive(false);
    calculateResults();
  };

  const calculateResults = () => {
    const timeElapsed = 60 - timeLeft;
    if (timeElapsed === 0) return;

    // Calculate words (assuming average word length of 5 characters)
    const wordsTyped = userInput.length / 5;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);

    // Calculate CPM
    const cpm = Math.round((userInput.length / timeElapsed) * 60);

    // Calculate accuracy
    let correctChars = 0;
    let errors = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === testText[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }
    const accuracy = userInput.length > 0 
      ? Math.round((correctChars / userInput.length) * 100) 
      : 0;

    setResult({
      wpm,
      cpm,
      accuracy,
      errors,
      timeElapsed,
    });
  };

  const handleInputChange = (value: string) => {
    if (!isActive) return;
    setUserInput(value);
    setCurrentIndex(value.length);
  };

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setTestText(testTexts[newDifficulty]);
    resetTest();
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) {
      return 'text-gray-400';
    }
    if (userInput[index] === testText[index]) {
      return 'text-green-600 bg-green-50';
    }
    return 'text-red-600 bg-red-50';
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
      link.download = `typing-speed-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Typing Speed Results</title>
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
      <div className="grid grid-cols-1 gap-6">
        {/* Controls */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <Keyboard className="h-5 w-5 text-blue-600" />
              Typing Speed Test
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {/* Difficulty Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Difficulty Level</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <Button
                    key={level}
                    onClick={() => handleDifficultyChange(level)}
                    variant={difficulty === level ? 'default' : 'outline'}
                    className="text-sm capitalize"
                    disabled={isActive}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Timer and Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{timeLeft}s</span>
              </div>
              <div className="text-sm text-gray-600">
                {isActive ? 'Test in Progress...' : result ? 'Test Completed' : 'Ready to Start'}
              </div>
            </div>

            {/* Test Text Display */}
            <div className="bg-white border-2 border-gray-300 rounded-lg p-4 min-h-[120px]">
              <p className="text-lg leading-relaxed font-mono">
                {testText.split('').map((char, index) => (
                  <span key={index} className={getCharacterClass(index)}>
                    {char}
                  </span>
                ))}
              </p>
            </div>

            {/* Input Area */}
            <div className="space-y-2">
              <Label htmlFor="typingInput" className="text-sm font-medium text-gray-700">
                Type here:
              </Label>
              <input
                ref={inputRef}
                id="typingInput"
                type="text"
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={!isActive}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg disabled:bg-gray-100"
                placeholder={isActive ? "Start typing..." : "Click 'Start Test' to begin"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isActive && !result && (
                <Button 
                  onClick={startTest}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <Timer className="h-5 w-5 mr-2" />
                  Start Test
                </Button>
              )}
              {isActive && (
                <>
                  <Button 
                    onClick={finishTest}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    Finish Test
                  </Button>
                  <Button 
                    onClick={resetTest}
                    variant="outline"
                    className="px-6 py-3 min-h-[44px]"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </>
              )}
              {result && (
                <Button 
                  onClick={resetTest}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Keyboard className="h-5 w-5 text-blue-600" />
                  Your Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-6">
                  {/* Main Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Words Per Minute</p>
                      <p className="text-3xl font-bold text-blue-700">{result.wpm}</p>
                      <p className="text-xs text-gray-500 mt-1">WPM</p>
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Characters Per Minute</p>
                      <p className="text-3xl font-bold text-purple-700">{result.cpm}</p>
                      <p className="text-xs text-gray-500 mt-1">CPM</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Accuracy</p>
                      <p className="text-3xl font-bold text-green-700">{result.accuracy}%</p>
                      <p className="text-xs text-gray-500 mt-1">Correct</p>
                    </div>
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Errors</p>
                      <p className="text-3xl font-bold text-red-700">{result.errors}</p>
                      <p className="text-xs text-gray-500 mt-1">Mistakes</p>
                    </div>
                  </div>

                  {/* Performance Rating */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Rating:</h4>
                    <p className="text-sm text-gray-700">
                      {result.wpm < 20 && "Beginner - Keep practicing to improve your speed!"}
                      {result.wpm >= 20 && result.wpm < 40 && "Average - You're doing well, practice more for better results!"}
                      {result.wpm >= 40 && result.wpm < 60 && "Good - Above average typing speed!"}
                      {result.wpm >= 60 && result.wpm < 80 && "Very Good - Excellent typing skills!"}
                      {result.wpm >= 80 && "Expert - Outstanding typing speed!"}
                    </p>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Tips to Improve:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Practice touch typing without looking at the keyboard</li>
                      <li>• Focus on accuracy first, then speed will follow</li>
                      <li>• Use proper finger placement on home row keys</li>
                      <li>• Take regular breaks to avoid fatigue</li>
                      <li>• Practice daily for consistent improvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        {result && (
          <div className="flex flex-wrap gap-3 justify-center print:hidden">
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

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Typing Speed Calculator"
      />
    </div>
  );
}

