'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Copy, Share2, Printer, Download, BookOpen, Clock, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ReadingStats {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordLength: number;
  readingTimes: {
    slow: number;
    average: number;
    fast: number;
  };
  speakingTime: number;
}

export default function ReadingTimeCalculator() {
  const [text, setText] = useState('');
  const [customSpeed, setCustomSpeed] = useState('250');
  const [result, setResult] = useState<ReadingStats | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/reading-time-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Reading Time: ${result.readingTimes.average} min for ${result.wordCount} words`
        : 'Calculate reading time for any text!',
  });

  const calculateStats = () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze.');
      return;
    }

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Character count
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;

    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraph count
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Average word length
    const totalChars = words.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength = wordCount > 0 ? totalChars / wordCount : 0;

    // Reading times (words per minute)
    const slowSpeed = 200; // Slow reader
    const averageSpeed = parseInt(customSpeed) || 250; // Average reader
    const fastSpeed = 300; // Fast reader

    const readingTimes = {
      slow: Math.ceil(wordCount / slowSpeed),
      average: Math.ceil(wordCount / averageSpeed),
      fast: Math.ceil(wordCount / fastSpeed),
    };

    // Speaking time (average speaking speed: 150 words per minute)
    const speakingTime = Math.ceil(wordCount / 150);

    setResult({
      wordCount,
      characterCount,
      characterCountNoSpaces,
      sentenceCount,
      paragraphCount,
      averageWordLength,
      readingTimes,
      speakingTime,
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
      link.download = `reading-time-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Reading Time Results</title>
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

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text" className="text-sm font-medium text-gray-700">
                  Enter or Paste Your Text <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={12}
                  placeholder="Paste your text here..."
                />
                <p className="text-xs text-gray-500">
                  Current: {text.trim().split(/\s+/).filter(w => w.length > 0).length} words
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customSpeed" className="text-sm font-medium text-gray-700">
                  Average Reading Speed (WPM) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="customSpeed"
                  type="number"
                  value={customSpeed}
                  onChange={(e) => setCustomSpeed(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="250"
                  min="50"
                  max="500"
                />
                <p className="text-xs text-gray-500">Default: 250 words per minute</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calculateStats}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>
                <Button 
                  onClick={handleClear}
                  variant="outline"
                  className="px-4 py-3 min-h-[44px]"
                >
                  Clear
                </Button>
              </div>

              {text && (
                <Button 
                  onClick={handleCopyText}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Text
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Reading Time Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Reading Times */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Estimated Reading Time
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Slow (200 WPM)</p>
                          <p className="text-2xl sm:text-3xl font-bold text-amber-700">
                            {result.readingTimes.slow} min
                          </p>
                        </div>
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Average ({customSpeed} WPM)</p>
                          <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                            {result.readingTimes.average} min
                          </p>
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Fast (300 WPM)</p>
                          <p className="text-2xl sm:text-3xl font-bold text-green-700">
                            {result.readingTimes.fast} min
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Speaking Time */}
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Speaking Time (150 WPM)</p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                        {result.speakingTime} min
                      </p>
                    </div>

                    {/* Text Statistics */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Text Statistics
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Words</p>
                          <p className="text-xl font-bold text-gray-900">{result.wordCount.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Characters</p>
                          <p className="text-xl font-bold text-gray-900">{result.characterCount.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Characters (No Spaces)</p>
                          <p className="text-xl font-bold text-gray-900">{result.characterCountNoSpaces.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Sentences</p>
                          <p className="text-xl font-bold text-gray-900">{result.sentenceCount.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Paragraphs</p>
                          <p className="text-xl font-bold text-gray-900">{result.paragraphCount.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Avg Word Length</p>
                          <p className="text-xl font-bold text-gray-900">{result.averageWordLength.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Recommended Use Cases:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• <strong>Silent Reading:</strong> {result.readingTimes.average} minutes</li>
                        <li>• <strong>Public Speaking:</strong> {result.speakingTime} minutes</li>
                        <li>• <strong>Audiobook Recording:</strong> {result.speakingTime} minutes</li>
                        <li>• <strong>Presentation:</strong> {Math.ceil(result.speakingTime * 1.2)} minutes (with pauses)</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Enter text and click Calculate to see results</p>
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
        calculatorName="Reading Time Calculator"
      />
    </div>
  );
}

