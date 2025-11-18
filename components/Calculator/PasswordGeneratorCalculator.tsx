'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Copy, RefreshCw, Shield, Clock, Zap, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

const PasswordGeneratorCalculator = () => {
  // Password generation options
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [customInclude, setCustomInclude] = useState('');
  const [customExclude, setCustomExclude] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // Generated passwords and analysis
  const [passwords, setPasswords] = useState<string[]>([]);
  const [selectedPassword, setSelectedPassword] = useState('');
  const [strength, setStrength] = useState<{
    score: number;
    level: string;
    color: string;
    crackTime: string;
  } | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/password-generator',
    getShareParams: () => ({}),
    getShareText: () => {
      if (!selectedPassword) return 'Check out this Password Generator!';
      return `Generated a ${selectedPassword.length}-character password with strength: ${strength?.level || 'Unknown'}`;
    },
  });

  // Character sets
  const getCharacterSet = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Add custom characters
    if (customInclude) {
      charset += customInclude;
    }
    
    // Remove similar characters if option is enabled
    if (excludeSimilar) {
      charset = charset.replace(/[0OoIl1]/g, '');
    }
    
    // Remove custom excluded characters
    if (customExclude) {
      const excludeChars = customExclude.split('');
      excludeChars.forEach(char => {
        charset = charset.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
      });
    }
    
    // Remove duplicates
    charset = [...new Set(charset)].join('');
    
    return charset;
  };

  // Generate password
  const generatePassword = (len: number) => {
    const charset = getCharacterSet();
    
    if (charset.length === 0) {
      return '';
    }
    
    let password = '';
    const array = new Uint8Array(len);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < len; i++) {
      password += charset[array[i] % charset.length];
    }
    
    return password;
  };

  // Calculate password strength
  const calculateStrength = (password: string) => {
    if (!password) return null;
    
    let score = 0;
    const len = password.length;
    
    // Length score
    if (len >= 8) score += 1;
    if (len >= 12) score += 1;
    if (len >= 16) score += 1;
    if (len >= 20) score += 1;
    
    // Character variety score
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Entropy calculation for crack time
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
    
    const entropy = len * Math.log2(charsetSize);
    const combinations = Math.pow(charsetSize, len);
    
    // Estimate crack time (assuming 1 billion attempts per second)
    const secondsToCrack = combinations / 1e9;
    
    let crackTime = '';
    if (secondsToCrack < 1) {
      crackTime = 'Instant';
    } else if (secondsToCrack < 60) {
      crackTime = `${Math.round(secondsToCrack)} seconds`;
    } else if (secondsToCrack < 3600) {
      crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
      crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
      crackTime = `${Math.round(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 31536000 * 1000) {
      crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
    } else if (secondsToCrack < 31536000 * 1000000) {
      crackTime = `${Math.round(secondsToCrack / (31536000 * 1000))} thousand years`;
    } else if (secondsToCrack < 31536000 * 1000000000) {
      crackTime = `${Math.round(secondsToCrack / (31536000 * 1000000))} million years`;
    } else {
      crackTime = 'Virtually unbreakable';
    }
    
    // Determine level and color
    let level = '';
    let color = '';
    
    if (score <= 2) {
      level = 'Weak';
      color = 'text-red-600';
    } else if (score <= 4) {
      level = 'Fair';
      color = 'text-orange-600';
    } else if (score <= 6) {
      level = 'Good';
      color = 'text-yellow-600';
    } else if (score <= 7) {
      level = 'Strong';
      color = 'text-green-600';
    } else {
      level = 'Very Strong';
      color = 'text-emerald-600';
    }
    
    return { score, level, color, crackTime };
  };

  // Handle generate button
  const handleGenerate = () => {
    const validLength = Math.max(4, Math.min(128, length));
    const validQuantity = Math.max(1, Math.min(10, quantity));
    
    const newPasswords: string[] = [];
    
    for (let i = 0; i < validQuantity; i++) {
      const pwd = generatePassword(validLength);
      if (pwd) {
        newPasswords.push(pwd);
      }
    }
    
    if (newPasswords.length > 0) {
      setPasswords(newPasswords);
      setSelectedPassword(newPasswords[0]);
      setStrength(calculateStrength(newPasswords[0]));
    }
  };

  // Copy to clipboard
  const handleCopy = async (password: string, index: number) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle print
  const handlePrint = () => {
    if (resultRef.current) {
      const printContent = resultRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Password Generator Results</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .password { font-family: 'Courier New', monospace; font-size: 16px; margin: 10px 0; }
              </style>
            </head>
            <body>
              <h1>Generated Passwords</h1>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Settings */}
        <div className="space-y-6">
          {/* Password Length */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Password Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium">Length: {length} characters</Label>
                </div>
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Number of Passwords</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Character Types */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg text-gray-800">Character Types</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="uppercase" className="text-sm cursor-pointer">
                  Uppercase Letters (A-Z)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="lowercase" className="text-sm cursor-pointer">
                  Lowercase Letters (a-z)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="numbers" className="text-sm cursor-pointer">
                  Numbers (0-9)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="symbols" className="text-sm cursor-pointer">
                  Symbols (!@#$%^&*...)
                </label>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="excludeSimilar"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="excludeSimilar" className="text-sm cursor-pointer">
                    Exclude Similar Characters (0, O, I, l, 1)
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Rules */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
              <CardTitle className="text-lg text-gray-800">Custom Rules</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Include Characters</Label>
                <Input
                  type="text"
                  placeholder="e.g., @#$"
                  value={customInclude}
                  onChange={(e) => setCustomInclude(e.target.value)}
                  className="w-full font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">Add custom characters to include</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Exclude Characters</Label>
                <Input
                  type="text"
                  placeholder="e.g., 0O1l"
                  value={customExclude}
                  onChange={(e) => setCustomExclude(e.target.value)}
                  className="w-full font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">Characters to exclude from password</p>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold shadow-lg"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Generate Password{quantity > 1 ? 's' : ''}
          </Button>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Generated Password{passwords.length > 1 ? 's' : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6" ref={resultRef}>
              {passwords.length > 0 ? (
                <div className="space-y-3">
                  {passwords.map((pwd, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedPassword === pwd
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedPassword(pwd);
                        setStrength(calculateStrength(pwd));
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <code className="flex-1 text-sm sm:text-base break-all font-mono">
                          {pwd}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(pwd, index);
                          }}
                          className="shrink-0"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Password Generated Yet</p>
                  <p className="text-gray-400 text-sm">
                    Configure your settings and click "Generate Password"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Strength Analysis */}
          {strength && selectedPassword && (
            <Card className="shadow-lg border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-lg text-gray-800">Password Strength Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Strength:</span>
                    <span className={`text-lg font-bold ${strength.color}`}>{strength.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        strength.score <= 2
                          ? 'bg-red-600'
                          : strength.score <= 4
                          ? 'bg-orange-600'
                          : strength.score <= 6
                          ? 'bg-yellow-600'
                          : strength.score <= 7
                          ? 'bg-green-600'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${(strength.score / 8) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Estimated Crack Time</p>
                    <p className="text-lg font-bold text-blue-600">{strength.crackTime}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on 1 billion attempts per second
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-2">Security Tips:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Never reuse passwords across different sites</li>
                        <li>Use a password manager to store passwords securely</li>
                        <li>Enable two-factor authentication when available</li>
                        <li>Change passwords regularly for sensitive accounts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {passwords.length > 0 && (
            <div className="flex gap-3">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
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
      />
    </div>
  );
};

export default PasswordGeneratorCalculator;

