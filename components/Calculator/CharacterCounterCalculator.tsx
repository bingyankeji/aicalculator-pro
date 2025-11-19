'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Share2, Printer, Download, FileText, Hash, Type } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface TextStats {
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  averageWordLength: number;
  longestWord: string;
  socialMediaLimits: {
    twitter: { limit: number; remaining: number; percentage: number };
    facebook: { limit: number; remaining: number; percentage: number };
    instagram: { limit: number; remaining: number; percentage: number };
    linkedin: { limit: number; remaining: number; percentage: number };
    sms: { limit: number; remaining: number; percentage: number };
  };
}

export default function CharacterCounterCalculator() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<TextStats | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/character-counter',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Character Count: ${result.charactersWithSpaces} characters, ${result.words} words`
        : 'Count characters and words in your text!',
  });

  const calculateStats = (inputText: string) => {
    // Characters
    const charactersWithSpaces = inputText.length;
    const charactersWithoutSpaces = inputText.replace(/\s/g, '').length;

    // Words
    const wordsArray = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const words = wordsArray.length;

    // Sentences
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Paragraphs
    const paragraphs = inputText.split(/\n\n+/).filter(p => p.trim().length > 0).length;

    // Lines
    const lines = inputText.split(/\n/).length;

    // Average word length
    const totalChars = wordsArray.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength = words > 0 ? totalChars / words : 0;

    // Longest word
    const longestWord = wordsArray.reduce((longest, word) => 
      word.length > longest.length ? word : longest, ''
    );

    // Social media limits
    const socialMediaLimits = {
      twitter: {
        limit: 280,
        remaining: 280 - charactersWithSpaces,
        percentage: (charactersWithSpaces / 280) * 100,
      },
      facebook: {
        limit: 63206,
        remaining: 63206 - charactersWithSpaces,
        percentage: (charactersWithSpaces / 63206) * 100,
      },
      instagram: {
        limit: 2200,
        remaining: 2200 - charactersWithSpaces,
        percentage: (charactersWithSpaces / 2200) * 100,
      },
      linkedin: {
        limit: 3000,
        remaining: 3000 - charactersWithSpaces,
        percentage: (charactersWithSpaces / 3000) * 100,
      },
      sms: {
        limit: 160,
        remaining: 160 - charactersWithSpaces,
        percentage: (charactersWithSpaces / 160) * 100,
      },
    };

    setResult({
      charactersWithSpaces,
      charactersWithoutSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      averageWordLength,
      longestWord,
      socialMediaLimits,
    });
  };

  const handleTextChange = (value: string) => {
    setText(value);
    calculateStats(value);
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
      link.download = `character-count-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Character Counter Results</title>
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

  const handleCopyStats = () => {
    if (!result) return;
    const stats = `Characters (with spaces): ${result.charactersWithSpaces}\nCharacters (without spaces): ${result.charactersWithoutSpaces}\nWords: ${result.words}\nSentences: ${result.sentences}\nParagraphs: ${result.paragraphs}\nLines: ${result.lines}`;
    navigator.clipboard.writeText(stats);
    alert('Statistics copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Type className="h-5 w-5 text-blue-600" />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text" className="text-sm font-medium text-gray-700">
                  Enter or Paste Your Text
                </Label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={15}
                  placeholder="Start typing or paste your text here..."
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Real-time counting</span>
                  <span>{text.length} characters</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 py-3 min-h-[44px]"
                >
                  Clear All
                </Button>
                {text && (
                  <Button 
                    onClick={handleCopyText}
                    variant="outline"
                    className="flex-1 gap-2 py-3 min-h-[44px]"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Text
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Hash className="h-5 w-5 text-blue-600" />
                  Text Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Statistics */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Character & Word Count
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Characters (with spaces)</p>
                          <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                            {result.charactersWithSpaces.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Characters (no spaces)</p>
                          <p className="text-2xl sm:text-3xl font-bold text-indigo-700">
                            {result.charactersWithoutSpaces.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Words</p>
                          <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                            {result.words.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Statistics */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Additional Statistics</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Sentences</p>
                          <p className="text-xl font-bold text-gray-900">{result.sentences.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Paragraphs</p>
                          <p className="text-xl font-bold text-gray-900">{result.paragraphs.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Lines</p>
                          <p className="text-xl font-bold text-gray-900">{result.lines.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Avg Word Length</p>
                          <p className="text-xl font-bold text-gray-900">{result.averageWordLength.toFixed(1)}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:col-span-2">
                          <p className="text-xs text-gray-600 mb-1">Longest Word</p>
                          <p className="text-lg font-bold text-gray-900 truncate">{result.longestWord || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Limits */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Social Media Character Limits</h3>
                      <div className="space-y-3">
                        {Object.entries(result.socialMediaLimits).map(([platform, data]) => {
                          const isOverLimit = data.remaining < 0;
                          const platformNames: Record<string, string> = {
                            twitter: 'Twitter/X',
                            facebook: 'Facebook',
                            instagram: 'Instagram',
                            linkedin: 'LinkedIn',
                            sms: 'SMS',
                          };
                          
                          return (
                            <div key={platform} className="bg-white border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">
                                  {platformNames[platform]}
                                </span>
                                <span className={`text-sm font-semibold ${
                                  isOverLimit ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {isOverLimit ? `${Math.abs(data.remaining)} over` : `${data.remaining} left`}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${
                                    isOverLimit 
                                      ? 'bg-red-500' 
                                      : data.percentage > 80 
                                        ? 'bg-amber-500' 
                                        : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(data.percentage, 100)}%` }}
                                />
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-gray-500">
                                  {result.charactersWithSpaces.toLocaleString()} / {data.limit.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {data.percentage.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Copy Stats Button */}
                    <Button 
                      onClick={handleCopyStats}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Statistics
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Type className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Start typing to see real-time statistics</p>
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
        calculatorName="Character Counter"
      />
    </div>
  );
}

