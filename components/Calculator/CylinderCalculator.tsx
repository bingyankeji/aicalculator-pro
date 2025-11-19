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
  height: string;
  volume: string;
  surfaceArea: string;
  innerRadius: string; // 空心圆柱的内半径
}

interface Result {
  radius: number;
  height: number;
  volume: number;
  surfaceArea: number;
  lateralArea: number;
  baseArea: number;
  innerRadius?: number;
  isHollow: boolean;
}

export default function CylinderCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    radius: '',
    height: '',
    volume: '',
    surfaceArea: '',
    innerRadius: '',
  });

  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/cylinder-calculator',
    getShareParams: () => ({
      r: inputs.radius || '',
      h: inputs.height || '',
    }),
    getShareText: () => {
      return result
        ? `Cylinder: radius=${result.radius.toFixed(2)}, height=${result.height.toFixed(2)}, volume=${result.volume.toFixed(2)}`
        : 'Calculate cylinder properties!';
    },
  });

  const handleInputChange = (field: keyof Inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    let radius = parseFloat(inputs.radius);
    let height = parseFloat(inputs.height);
    const volume = parseFloat(inputs.volume);
    const surfaceArea = parseFloat(inputs.surfaceArea);
    const innerRadius = parseFloat(inputs.innerRadius);
    const isHollow = !isNaN(innerRadius) && innerRadius > 0;

    // 验证空心圆柱的内半径
    if (isHollow && !isNaN(radius) && innerRadius >= radius) {
      alert('Inner radius must be smaller than outer radius!');
      return;
    }

    // 根据已知值计算半径和高度
    if (!isNaN(radius) && !isNaN(height)) {
      // 已有半径和高度
    } else if (!isNaN(radius) && !isNaN(volume)) {
      // 已知半径和体积，求高度
      // V = πr²h  =>  h = V/(πr²)
      if (isHollow) {
        height = volume / (Math.PI * (radius * radius - innerRadius * innerRadius));
      } else {
        height = volume / (Math.PI * radius * radius);
      }
    } else if (!isNaN(height) && !isNaN(volume)) {
      // 已知高度和体积，求半径
      // V = πr²h  =>  r = √(V/(πh))
      if (isHollow) {
        alert('Cannot calculate radius from volume alone for hollow cylinders. Please provide the radius.');
        return;
      }
      radius = Math.sqrt(volume / (Math.PI * height));
    } else if (!isNaN(radius) && !isNaN(surfaceArea)) {
      // 已知半径和表面积，求高度
      // A = 2πr² + 2πrh  =>  h = (A - 2πr²)/(2πr)
      if (isHollow) {
        alert('Surface area calculation for hollow cylinders requires both radius and height.');
        return;
      }
      height = (surfaceArea - 2 * Math.PI * radius * radius) / (2 * Math.PI * radius);
    } else {
      alert('Please provide at least radius and height, or radius and volume, or height and volume.');
      return;
    }

    // 验证结果
    if (radius <= 0 || height <= 0 || isNaN(radius) || isNaN(height)) {
      alert('Invalid input values. Please check your inputs.');
      return;
    }

    // 计算所有属性
    let calculatedVolume: number;
    let calculatedSurfaceArea: number;
    let lateralArea: number;
    let baseArea: number;

    if (isHollow) {
      // 空心圆柱
      const outerBaseArea = Math.PI * radius * radius;
      const innerBaseArea = Math.PI * innerRadius * innerRadius;
      baseArea = outerBaseArea - innerBaseArea;
      calculatedVolume = baseArea * height;
      
      // 表面积 = 2个环形底面 + 外侧面 + 内侧面
      const outerLateralArea = 2 * Math.PI * radius * height;
      const innerLateralArea = 2 * Math.PI * innerRadius * height;
      lateralArea = outerLateralArea + innerLateralArea;
      calculatedSurfaceArea = 2 * baseArea + lateralArea;
    } else {
      // 实心圆柱
      baseArea = Math.PI * radius * radius;
      calculatedVolume = baseArea * height;
      lateralArea = 2 * Math.PI * radius * height;
      calculatedSurfaceArea = 2 * baseArea + lateralArea;
    }

    setResult({
      radius,
      height,
      volume: calculatedVolume,
      surfaceArea: calculatedSurfaceArea,
      lateralArea,
      baseArea,
      innerRadius: isHollow ? innerRadius : undefined,
      isHollow,
    });
  };

  const handleReset = () => {
    setInputs({
      radius: '',
      height: '',
      volume: '',
      surfaceArea: '',
      innerRadius: '',
    });
    setResult(null);
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
      link.download = `cylinder-result-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Cylinder Calculator Results</title>
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
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Cylinder Inputs</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter dimensions</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="radius" className="text-sm font-medium text-gray-700">
                  Radius (r) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="radius"
                  type="number"
                  value={inputs.radius}
                  onChange={(e) => handleInputChange('radius', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 5"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                  Height (h) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="height"
                  type="number"
                  value={inputs.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 10"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Hollow Cylinder (Optional)</h4>
                <div className="space-y-2">
                  <Label htmlFor="innerRadius" className="text-sm font-medium text-gray-700">
                    Inner Radius (r<sub>i</sub>) <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="innerRadius"
                    type="number"
                    value={inputs.innerRadius}
                    onChange={(e) => handleInputChange('innerRadius', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 3"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-purple-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-purple-700">
                    Enter radius and height for basic calculation. Add inner radius for hollow cylinder (pipe/tube).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={calculate}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="px-6 py-3 min-h-[44px]"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* 结果区域 */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-6">
                  {/* 主要结果 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Radius (r):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-700">{result.radius.toFixed(4)}</p>
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Height (h):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-700">{result.height.toFixed(4)}</p>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Base Area:</h3>
                      <p className="text-xl font-bold text-gray-900">{result.baseArea.toFixed(4)}</p>
                      <p className="text-xs text-gray-500 mt-1">square units (one base)</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Lateral Area:</h3>
                      <p className="text-xl font-bold text-gray-900">{result.lateralArea.toFixed(4)}</p>
                      <p className="text-xs text-gray-500 mt-1">square units</p>
                    </div>
                  </div>

                  {result.isHollow && result.innerRadius && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Hollow Cylinder</h4>
                      <p className="text-sm text-orange-800">
                        Inner Radius: <span className="font-mono font-bold">{result.innerRadius.toFixed(4)}</span>
                      </p>
                      <p className="text-sm text-orange-800 mt-1">
                        Wall Thickness: <span className="font-mono font-bold">{(result.radius - result.innerRadius).toFixed(4)}</span>
                      </p>
                    </div>
                  )}

                  {/* 3D可视化图形 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Representation</h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 flex justify-center">
                      <svg width="400" height="450" viewBox="0 0 400 450" className="max-w-full h-auto">
                        <defs>
                          {/* 圆柱体渐变（立体感）*/}
                          <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#A855F7" stopOpacity="1" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
                          </linearGradient>
                          
                          {/* 顶部椭圆渐变 */}
                          <radialGradient id="topEllipseGradient" cx="50%" cy="30%">
                            <stop offset="0%" stopColor="#E9D5FF" />
                            <stop offset="100%" stopColor="#C084FC" />
                          </radialGradient>
                          
                          {/* 底部椭圆渐变 */}
                          <radialGradient id="bottomEllipseGradient" cx="50%" cy="30%">
                            <stop offset="0%" stopColor="#DDD6FE" />
                            <stop offset="100%" stopColor="#A78BFA" />
                          </radialGradient>
                          
                          {/* 空心部分渐变 */}
                          <radialGradient id="hollowGradient" cx="50%" cy="50%">
                            <stop offset="0%" stopColor="#1F2937" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#374151" stopOpacity="0.2" />
                          </radialGradient>
                        </defs>
                        
                        {(() => {
                          // 计算缩放和位置
                          const maxDimension = Math.max(result.radius * 2, result.height);
                          const scale = Math.min(120 / maxDimension, 60);
                          const scaledRadius = result.radius * scale;
                          const scaledHeight = result.height * scale;
                          const scaledInnerRadius = result.innerRadius ? result.innerRadius * scale : 0;
                          
                          const centerX = 200;
                          const topY = 100;
                          const bottomY = topY + scaledHeight;
                          const ellipseRy = scaledRadius * 0.3; // 椭圆的短半径（透视效果）
                          
                          return (
                            <>
                              {/* 底部椭圆 */}
                              <ellipse
                                cx={centerX}
                                cy={bottomY}
                                rx={scaledRadius}
                                ry={ellipseRy}
                                fill="url(#bottomEllipseGradient)"
                                stroke="#7C3AED"
                                strokeWidth="2"
                              />
                              
                              {/* 空心圆柱的底部内圆 */}
                              {result.isHollow && scaledInnerRadius > 0 && (
                                <ellipse
                                  cx={centerX}
                                  cy={bottomY}
                                  rx={scaledInnerRadius}
                                  ry={scaledInnerRadius * 0.3}
                                  fill="url(#hollowGradient)"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                />
                              )}
                              
                              {/* 圆柱侧面 */}
                              <path
                                d={`
                                  M ${centerX - scaledRadius} ${topY}
                                  L ${centerX - scaledRadius} ${bottomY}
                                  A ${scaledRadius} ${ellipseRy} 0 0 0 ${centerX + scaledRadius} ${bottomY}
                                  L ${centerX + scaledRadius} ${topY}
                                `}
                                fill="url(#cylinderGradient)"
                                stroke="#7C3AED"
                                strokeWidth="2"
                              />
                              
                              {/* 空心圆柱的侧面内壁 */}
                              {result.isHollow && scaledInnerRadius > 0 && (
                                <>
                                  {/* 左侧内壁 */}
                                  <line
                                    x1={centerX - scaledInnerRadius}
                                    y1={topY}
                                    x2={centerX - scaledInnerRadius}
                                    y2={bottomY}
                                    stroke="#6B7280"
                                    strokeWidth="1.5"
                                    strokeDasharray="3,3"
                                  />
                                  {/* 右侧内壁 */}
                                  <line
                                    x1={centerX + scaledInnerRadius}
                                    y1={topY}
                                    x2={centerX + scaledInnerRadius}
                                    y2={bottomY}
                                    stroke="#6B7280"
                                    strokeWidth="1.5"
                                    strokeDasharray="3,3"
                                  />
                                </>
                              )}
                              
                              {/* 顶部椭圆 */}
                              <ellipse
                                cx={centerX}
                                cy={topY}
                                rx={scaledRadius}
                                ry={ellipseRy}
                                fill="url(#topEllipseGradient)"
                                stroke="#7C3AED"
                                strokeWidth="2"
                              />
                              
                              {/* 空心圆柱的顶部内圆 */}
                              {result.isHollow && scaledInnerRadius > 0 && (
                                <ellipse
                                  cx={centerX}
                                  cy={topY}
                                  rx={scaledInnerRadius}
                                  ry={scaledInnerRadius * 0.3}
                                  fill="url(#hollowGradient)"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                />
                              )}
                              
                              {/* 半径标注（顶部） */}
                              <line
                                x1={centerX}
                                y1={topY}
                                x2={centerX + scaledRadius}
                                y2={topY}
                                stroke="#EF4444"
                                strokeWidth="2"
                              />
                              <circle cx={centerX} cy={topY} r="3" fill="#EF4444" />
                              <circle cx={centerX + scaledRadius} cy={topY} r="3" fill="#EF4444" />
                              <text
                                x={centerX + scaledRadius / 2}
                                y={topY - 10}
                                textAnchor="middle"
                                className="text-sm font-bold fill-red-700"
                              >
                                r = {result.radius.toFixed(2)}
                              </text>
                              
                              {/* 内半径标注（如果是空心） */}
                              {result.isHollow && scaledInnerRadius > 0 && result.innerRadius && (
                                <>
                                  <line
                                    x1={centerX}
                                    y1={topY}
                                    x2={centerX + scaledInnerRadius}
                                    y2={topY}
                                    stroke="#F59E0B"
                                    strokeWidth="2"
                                  />
                                  <text
                                    x={centerX + scaledInnerRadius / 2}
                                    y={topY + 20}
                                    textAnchor="middle"
                                    className="text-xs font-bold fill-orange-700"
                                  >
                                    r<tspan baselineShift="sub" fontSize="0.7em">i</tspan> = {result.innerRadius.toFixed(2)}
                                  </text>
                                </>
                              )}
                              
                              {/* 高度标注（右侧） */}
                              <line
                                x1={centerX + scaledRadius + 30}
                                y1={topY}
                                x2={centerX + scaledRadius + 30}
                                y2={bottomY}
                                stroke="#3B82F6"
                                strokeWidth="2"
                              />
                              <line
                                x1={centerX + scaledRadius + 25}
                                y1={topY}
                                x2={centerX + scaledRadius + 35}
                                y2={topY}
                                stroke="#3B82F6"
                                strokeWidth="2"
                              />
                              <line
                                x1={centerX + scaledRadius + 25}
                                y1={bottomY}
                                x2={centerX + scaledRadius + 35}
                                y2={bottomY}
                                stroke="#3B82F6"
                                strokeWidth="2"
                              />
                              <text
                                x={centerX + scaledRadius + 50}
                                y={(topY + bottomY) / 2 + 5}
                                textAnchor="start"
                                className="text-sm font-bold fill-blue-700"
                              >
                                h = {result.height.toFixed(2)}
                              </text>
                              
                              {/* 体积和表面积标注 */}
                              <text x={centerX} y={bottomY + 50} textAnchor="middle" className="text-xs font-semibold fill-green-700">
                                Volume = {result.volume.toFixed(2)}
                              </text>
                              <text x={centerX} y={bottomY + 70} textAnchor="middle" className="text-xs font-semibold fill-green-700">
                                Surface Area = {result.surfaceArea.toFixed(2)}
                              </text>
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      3D representation of the {result.isHollow ? 'hollow ' : ''}cylinder with dimensions labeled
                    </p>
                  </div>

                  {/* 公式 */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-3">Formulas Used</h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      {result.isHollow ? (
                        <>
                          <p>• Volume: <span className="font-mono">V = π(r² - r<sub>i</sub>²)h</span></p>
                          <p>• Surface Area: <span className="font-mono">A = 2π(r² - r<sub>i</sub>²) + 2πrh + 2πr<sub>i</sub>h</span></p>
                        </>
                      ) : (
                        <>
                          <p>• Volume: <span className="font-mono">V = πr²h</span></p>
                          <p>• Surface Area: <span className="font-mono">A = 2πr² + 2πrh</span></p>
                          <p>• Lateral Area: <span className="font-mono">A<sub>lateral</sub> = 2πrh</span></p>
                          <p>• Base Area: <span className="font-mono">A<sub>base</sub> = πr²</span></p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter radius and height, then click Calculate</p>
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
        calculatorName="Cylinder Calculator"
      />
    </div>
  );
}

