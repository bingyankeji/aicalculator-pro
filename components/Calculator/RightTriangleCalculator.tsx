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
  sideA: string;
  sideB: string;
  sideC: string;
  angleA: string;
  angleB: string;
}

interface Result {
  sideA: number;
  sideB: number;
  sideC: number;
  angleA: number;
  angleB: number;
  area: number;
  perimeter: number;
  altitude: number;
  inradius: number;
  circumradius: number;
}

export default function RightTriangleCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    sideA: '',
    sideB: '',
    sideC: '',
    angleA: '',
    angleB: '',
  });

  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/right-triangle-calculator',
    getShareParams: () => ({
      a: inputs.sideA || '',
      b: inputs.sideB || '',
      c: inputs.sideC || '',
    }),
    getShareText: () => {
      return result
        ? `Right Triangle: a=${result.sideA.toFixed(2)}, b=${result.sideB.toFixed(2)}, c=${result.sideC.toFixed(2)}, Area=${result.area.toFixed(2)}`
        : 'Calculate right triangle properties!';
    },
  });

  const handleInputChange = (field: keyof Inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    let a = parseFloat(inputs.sideA);
    let b = parseFloat(inputs.sideB);
    let c = parseFloat(inputs.sideC);
    let angleADeg = parseFloat(inputs.angleA);
    let angleBDeg = parseFloat(inputs.angleB);

    // 转换角度为弧度
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    // 验证输入
    const validInputs = [
      !isNaN(a) && a > 0,
      !isNaN(b) && b > 0,
      !isNaN(c) && c > 0,
      !isNaN(angleADeg) && angleADeg > 0 && angleADeg < 90,
      !isNaN(angleBDeg) && angleBDeg > 0 && angleBDeg < 90,
    ].filter(Boolean).length;

    if (validInputs < 2) {
      alert('Please provide at least 2 known values (sides or angles).');
      return;
    }

    // 计算未知边和角
    // 情况1：已知两条边
    if (!isNaN(a) && !isNaN(b) && isNaN(c)) {
      c = Math.sqrt(a * a + b * b);
      angleADeg = toDeg(Math.atan(a / b));
      angleBDeg = 90 - angleADeg;
    } else if (!isNaN(a) && isNaN(b) && !isNaN(c)) {
      if (c <= a) {
        alert('Hypotenuse (c) must be greater than leg (a).');
        return;
      }
      b = Math.sqrt(c * c - a * a);
      angleADeg = toDeg(Math.asin(a / c));
      angleBDeg = 90 - angleADeg;
    } else if (isNaN(a) && !isNaN(b) && !isNaN(c)) {
      if (c <= b) {
        alert('Hypotenuse (c) must be greater than leg (b).');
        return;
      }
      a = Math.sqrt(c * c - b * b);
      angleADeg = toDeg(Math.asin(a / c));
      angleBDeg = 90 - angleADeg;
    }
    // 情况2：已知一边一角
    else if (!isNaN(a) && !isNaN(angleADeg) && isNaN(b) && isNaN(c)) {
      angleBDeg = 90 - angleADeg;
      b = a / Math.tan(toRad(angleADeg));
      c = a / Math.sin(toRad(angleADeg));
    } else if (!isNaN(b) && !isNaN(angleBDeg) && isNaN(a) && isNaN(c)) {
      angleADeg = 90 - angleBDeg;
      a = b / Math.tan(toRad(angleBDeg));
      c = b / Math.sin(toRad(angleBDeg));
    } else if (!isNaN(c) && !isNaN(angleADeg) && isNaN(a) && isNaN(b)) {
      angleBDeg = 90 - angleADeg;
      a = c * Math.sin(toRad(angleADeg));
      b = c * Math.cos(toRad(angleADeg));
    }
    // 情况3：已知三条边（验证是否为直角三角形）
    else if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
      const pythagorean = Math.abs(a * a + b * b - c * c);
      if (pythagorean > 0.01) {
        alert('The given sides do not form a right triangle (Pythagorean theorem not satisfied).');
        return;
      }
      angleADeg = toDeg(Math.asin(a / c));
      angleBDeg = 90 - angleADeg;
    }

    // 计算其他属性
    const area = (a * b) / 2;
    const perimeter = a + b + c;
    const altitude = (a * b) / c; // 斜边上的高
    const inradius = (a + b - c) / 2; // 内切圆半径
    const circumradius = c / 2; // 外接圆半径（直角三角形外接圆半径 = 斜边/2）

    setResult({
      sideA: a,
      sideB: b,
      sideC: c,
      angleA: angleADeg,
      angleB: angleBDeg,
      area,
      perimeter,
      altitude,
      inradius,
      circumradius,
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
      link.download = `right-triangle-result-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Right Triangle Results</title>
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
              <CardTitle className="text-xl text-gray-900">Triangle Inputs</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter at least 2 known values</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sideA" className="text-sm font-medium text-gray-700">
                  Side a (opposite to angle A) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="sideA"
                  type="number"
                  value={inputs.sideA}
                  onChange={(e) => handleInputChange('sideA', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 3"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sideB" className="text-sm font-medium text-gray-700">
                  Side b (opposite to angle B) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="sideB"
                  type="number"
                  value={inputs.sideB}
                  onChange={(e) => handleInputChange('sideB', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sideC" className="text-sm font-medium text-gray-700">
                  Side c (hypotenuse) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="sideC"
                  type="number"
                  value={inputs.sideC}
                  onChange={(e) => handleInputChange('sideC', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="angleA" className="text-sm font-medium text-gray-700">
                  Angle A (degrees) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="angleA"
                  type="number"
                  value={inputs.angleA}
                  onChange={(e) => handleInputChange('angleA', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 37"
                  step="0.1"
                  min="0"
                  max="90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="angleB" className="text-sm font-medium text-gray-700">
                  Angle B (degrees) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="angleB"
                  type="number"
                  value={inputs.angleB}
                  onChange={(e) => handleInputChange('angleB', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 53"
                  step="0.1"
                  min="0"
                  max="90"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    The right angle (90°) is at vertex C. Angle A + Angle B = 90°.
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
            Calculate Triangle
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
                  {/* 边长结果 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sides</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Side a:</p>
                        <p className="text-2xl font-bold text-blue-700">{result.sideA.toFixed(4)}</p>
                      </div>
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Side b:</p>
                        <p className="text-2xl font-bold text-blue-700">{result.sideB.toFixed(4)}</p>
                      </div>
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Hypotenuse c:</p>
                        <p className="text-2xl font-bold text-green-700">{result.sideC.toFixed(4)}</p>
                      </div>
                    </div>
                  </div>

                  {/* 角度结果 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Angles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Angle A:</p>
                        <p className="text-2xl font-bold text-gray-900">{result.angleA.toFixed(2)}°</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Angle B:</p>
                        <p className="text-2xl font-bold text-gray-900">{result.angleB.toFixed(2)}°</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Angle C:</p>
                        <p className="text-2xl font-bold text-gray-900">90.00°</p>
                        <p className="text-xs text-green-600 mt-1">Right angle</p>
                      </div>
                    </div>
                  </div>

                  {/* 其他属性 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Properties</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Area:</p>
                        <p className="text-xl font-semibold text-gray-900">{result.area.toFixed(4)}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Perimeter:</p>
                        <p className="text-xl font-semibold text-gray-900">{result.perimeter.toFixed(4)}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Altitude (to hypotenuse):</p>
                        <p className="text-xl font-semibold text-gray-900">{result.altitude.toFixed(4)}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Inradius:</p>
                        <p className="text-xl font-semibold text-gray-900">{result.inradius.toFixed(4)}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Circumradius:</p>
                        <p className="text-xl font-semibold text-gray-900">{result.circumradius.toFixed(4)}</p>
                      </div>
                    </div>
                  </div>

                  {/* 可视化图形 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Representation</h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 flex justify-center">
                      <svg width="400" height="300" viewBox="0 0 400 300" className="max-w-full h-auto">
                        {/* 定义箭头标记 */}
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                          </marker>
                        </defs>
                        
                        {/* 计算三角形坐标 */}
                        {(() => {
                          // 缩放因子，使三角形适应画布
                          const scale = Math.min(200 / Math.max(result.sideA, result.sideB, result.sideC), 200 / result.sideC);
                          const scaledA = result.sideA * scale;
                          const scaledB = result.sideB * scale;
                          
                          // 三角形顶点坐标（C在左下角，直角）
                          const C = { x: 100, y: 230 };
                          const A = { x: 100 + scaledB, y: 230 };
                          const B = { x: 100, y: 230 - scaledA };
                          
                          return (
                            <>
                              {/* 三角形 */}
                              <path
                                d={`M ${C.x} ${C.y} L ${A.x} ${A.y} L ${B.x} ${B.y} Z`}
                                fill="rgba(59, 130, 246, 0.1)"
                                stroke="#3B82F6"
                                strokeWidth="2"
                              />
                              
                              {/* 直角标记 */}
                              <path
                                d={`M ${C.x} ${C.y - 15} L ${C.x + 15} ${C.y - 15} L ${C.x + 15} ${C.y}`}
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="1.5"
                              />
                              
                              {/* 边标注 */}
                              {/* 边 a (CB) */}
                              <text
                                x={C.x - 25}
                                y={(C.y + B.y) / 2 + 5}
                                className="text-sm font-semibold fill-blue-700"
                              >
                                a = {result.sideA.toFixed(2)}
                              </text>
                              
                              {/* 边 b (CA) */}
                              <text
                                x={(C.x + A.x) / 2}
                                y={C.y + 25}
                                className="text-sm font-semibold fill-blue-700"
                              >
                                b = {result.sideB.toFixed(2)}
                              </text>
                              
                              {/* 边 c (AB) - 斜边 */}
                              <text
                                x={(A.x + B.x) / 2 + 15}
                                y={(A.y + B.y) / 2}
                                className="text-sm font-semibold fill-green-700"
                              >
                                c = {result.sideC.toFixed(2)}
                              </text>
                              
                              {/* 角度标注 */}
                              {/* 角 A */}
                              <text
                                x={A.x - 35}
                                y={A.y - 10}
                                className="text-xs font-medium fill-gray-700"
                              >
                                ∠A = {result.angleA.toFixed(1)}°
                              </text>
                              
                              {/* 角 B */}
                              <text
                                x={B.x - 15}
                                y={B.y + 15}
                                className="text-xs font-medium fill-gray-700"
                              >
                                ∠B = {result.angleB.toFixed(1)}°
                              </text>
                              
                              {/* 角 C (90°) */}
                              <text
                                x={C.x + 20}
                                y={C.y - 5}
                                className="text-xs font-medium fill-red-700"
                              >
                                ∠C = 90°
                              </text>
                              
                              {/* 顶点标记 */}
                              <circle cx={C.x} cy={C.y} r="3" fill="#EF4444" />
                              <circle cx={A.x} cy={A.y} r="3" fill="#3B82F6" />
                              <circle cx={B.x} cy={B.y} r="3" fill="#3B82F6" />
                              
                              {/* 顶点字母 */}
                              <text x={C.x - 8} y={C.y + 20} className="text-sm font-bold fill-red-700">C</text>
                              <text x={A.x + 8} y={A.y + 20} className="text-sm font-bold fill-blue-700">A</text>
                              <text x={B.x - 15} y={B.y - 5} className="text-sm font-bold fill-blue-700">B</text>
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Interactive diagram showing the right triangle with all sides and angles labeled
                    </p>
                  </div>

                  {/* 验证 */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Pythagorean Theorem Verification</h4>
                    <p className="text-sm text-green-700">
                      a² + b² = c²
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      {result.sideA.toFixed(4)}² + {result.sideB.toFixed(4)}² = {result.sideC.toFixed(4)}²
                    </p>
                    <p className="text-sm text-green-700">
                      {(result.sideA ** 2).toFixed(4)} + {(result.sideB ** 2).toFixed(4)} = {(result.sideC ** 2).toFixed(4)} ✓
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter at least 2 known values and click Calculate</p>
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
        calculatorName="Right Triangle Calculator"
      />
    </div>
  );
}

