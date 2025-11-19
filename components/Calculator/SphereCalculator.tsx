'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface Inputs {
  radius: string;
  diameter: string;
  volume: string;
  surfaceArea: string;
}

interface Result {
  radius: number;
  diameter: number;
  volume: number;
  surfaceArea: number;
  circumference: number;
}

export default function SphereCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    radius: '',
    diameter: '',
    volume: '',
    surfaceArea: '',
  });

  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/sphere-calculator',
    getShareParams: () => ({
      r: inputs.radius || '',
      d: inputs.diameter || '',
    }),
    getShareText: () => {
      return result
        ? `Sphere: radius=${result.radius.toFixed(2)}, volume=${result.volume.toFixed(2)}, surface area=${result.surfaceArea.toFixed(2)}`
        : 'Calculate sphere properties!';
    },
  });

  const handleInputChange = (field: keyof Inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    let radius = parseFloat(inputs.radius);
    const diameter = parseFloat(inputs.diameter);
    const volume = parseFloat(inputs.volume);
    const surfaceArea = parseFloat(inputs.surfaceArea);

    // 确定从哪个输入计算半径
    if (!isNaN(radius) && radius > 0) {
      // 已有半径，直接使用
    } else if (!isNaN(diameter) && diameter > 0) {
      radius = diameter / 2;
    } else if (!isNaN(volume) && volume > 0) {
      // V = (4/3)πr³  =>  r = ∛(3V/4π)
      radius = Math.cbrt((3 * volume) / (4 * Math.PI));
    } else if (!isNaN(surfaceArea) && surfaceArea > 0) {
      // A = 4πr²  =>  r = √(A/4π)
      radius = Math.sqrt(surfaceArea / (4 * Math.PI));
    } else {
      alert('Please provide at least one value (radius, diameter, volume, or surface area).');
      return;
    }

    // 计算所有属性
    const calculatedDiameter = radius * 2;
    const calculatedVolume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const calculatedSurfaceArea = 4 * Math.PI * Math.pow(radius, 2);
    const calculatedCircumference = 2 * Math.PI * radius;

    setResult({
      radius,
      diameter: calculatedDiameter,
      volume: calculatedVolume,
      surfaceArea: calculatedSurfaceArea,
      circumference: calculatedCircumference,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;

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
      link.download = `sphere-result-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current || !result) return;

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
              <title>Sphere Calculator Results</title>
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 输入区域 */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Sphere Inputs</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter any one value</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="radius" className="text-sm font-medium text-gray-700">
                  Radius (r) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="radius"
                  type="number"
                  value={inputs.radius}
                  onChange={(e) => handleInputChange('radius', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diameter" className="text-sm font-medium text-gray-700">
                  Diameter (d) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="diameter"
                  type="number"
                  value={inputs.diameter}
                  onChange={(e) => handleInputChange('diameter', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume" className="text-sm font-medium text-gray-700">
                  Volume (V) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="volume"
                  type="number"
                  value={inputs.volume}
                  onChange={(e) => handleInputChange('volume', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 523.6"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="surfaceArea" className="text-sm font-medium text-gray-700">
                  Surface Area (A) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="surfaceArea"
                  type="number"
                  value={inputs.surfaceArea}
                  onChange={(e) => handleInputChange('surfaceArea', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 314.16"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    Enter any one value. The calculator will compute all other properties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Sphere
          </Button>
        </div>

        {/* 结果区域 */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-6">
                  {/* 主要结果 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Radius (r):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-700">{result.radius.toFixed(4)}</p>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Diameter (d):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-700">{result.diameter.toFixed(4)}</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Volume (V):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-700">{result.volume.toFixed(4)}</p>
                      <p className="text-xs text-gray-500 mt-1">cubic units</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Surface Area (A):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-700">{result.surfaceArea.toFixed(4)}</p>
                      <p className="text-xs text-gray-500 mt-1">square units</p>
                    </div>
                  </div>

                  {/* 额外属性 */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Circumference:</h3>
                    <p className="text-xl font-bold text-gray-900">{result.circumference.toFixed(4)}</p>
                    <p className="text-xs text-gray-500 mt-1">units (great circle)</p>
                  </div>

                  {/* 3D可视化图形 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Representation</h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 flex justify-center">
                      <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full h-auto">
                        <defs>
                          {/* 球体渐变（立体感）*/}
                          <radialGradient id="sphereGradient" cx="35%" cy="35%">
                            <stop offset="0%" stopColor="#93C5FD" stopOpacity="1" />
                            <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
                          </radialGradient>
                          
                          {/* 阴影 */}
                          <ellipse id="shadow" cx="200" cy="330" rx="80" ry="15" fill="rgba(0,0,0,0.2)" />
                        </defs>
                        
                        {/* 阴影 */}
                        <use href="#shadow" />
                        
                        {/* 球体主体 */}
                        <circle 
                          cx="200" 
                          cy="200" 
                          r="120" 
                          fill="url(#sphereGradient)" 
                          stroke="#1E40AF" 
                          strokeWidth="2"
                        />
                        
                        {/* 赤道线（大圆）*/}
                        <ellipse 
                          cx="200" 
                          cy="200" 
                          rx="120" 
                          ry="30" 
                          fill="none" 
                          stroke="#60A5FA" 
                          strokeWidth="1.5" 
                          strokeDasharray="5,5"
                          opacity="0.6"
                        />
                        
                        {/* 经线（大圆）*/}
                        <ellipse 
                          cx="200" 
                          cy="200" 
                          rx="30" 
                          ry="120" 
                          fill="none" 
                          stroke="#60A5FA" 
                          strokeWidth="1.5" 
                          strokeDasharray="5,5"
                          opacity="0.6"
                        />
                        
                        {/* 半径线 */}
                        <line 
                          x1="200" 
                          y1="200" 
                          x2="320" 
                          y2="200" 
                          stroke="#EF4444" 
                          strokeWidth="2"
                          markerEnd="url(#arrowRed)"
                        />
                        
                        {/* 箭头定义 */}
                        <defs>
                          <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                          </marker>
                        </defs>
                        
                        {/* 中心点 */}
                        <circle cx="200" cy="200" r="4" fill="#1E40AF" />
                        
                        {/* 半径标注 */}
                        <text 
                          x="260" 
                          y="190" 
                          className="text-sm font-bold fill-red-700"
                        >
                          r = {result.radius.toFixed(2)}
                        </text>
                        
                        {/* 直径标注（水平） */}
                        <line 
                          x1="80" 
                          y1="340" 
                          x2="320" 
                          y2="340" 
                          stroke="#3B82F6" 
                          strokeWidth="2"
                        />
                        <line x1="80" y1="335" x2="80" y2="345" stroke="#3B82F6" strokeWidth="2" />
                        <line x1="320" y1="335" x2="320" y2="345" stroke="#3B82F6" strokeWidth="2" />
                        <text 
                          x="200" 
                          y="360" 
                          textAnchor="middle"
                          className="text-sm font-bold fill-blue-700"
                        >
                          d = {result.diameter.toFixed(2)}
                        </text>
                        
                        {/* 体积和表面积标注 */}
                        <text x="200" y="30" textAnchor="middle" className="text-xs font-semibold fill-green-700">
                          Volume = {result.volume.toFixed(2)}
                        </text>
                        <text x="200" y="45" textAnchor="middle" className="text-xs font-semibold fill-green-700">
                          Surface Area = {result.surfaceArea.toFixed(2)}
                        </text>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      3D representation of the sphere with radius and diameter labeled
                    </p>
                  </div>

                  {/* 公式 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3">Formulas Used</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• Volume: <span className="font-mono">V = (4/3)πr³</span></p>
                      <p>• Surface Area: <span className="font-mono">A = 4πr²</span></p>
                      <p>• Diameter: <span className="font-mono">d = 2r</span></p>
                      <p>• Circumference: <span className="font-mono">C = 2πr</span></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter any one value and click Calculate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 操作按钮 */}
      {result && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Calculator
          </Button>
        </div>
      )}

      {/* 分享模态框 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Sphere Calculator"
      />
    </div>
  );
}

