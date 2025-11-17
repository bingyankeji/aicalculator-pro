'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface SlopeResult {
  slope: number | string;
  isVertical: boolean;
  isHorizontal: boolean;
  angle: number;
  percentGrade: number;
  slopeIntercept: string;
  pointSlope: string;
  generalForm: string;
  category: string;
  recommendation: string;
}

export default function SlopeCalculator() {
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [result, setResult] = useState<SlopeResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/slope-calculator',
    getShareParams: () => ({
      x1: x1 || '',
      y1: y1 || '',
      x2: x2 || '',
      y2: y2 || '',
    }),
    getShareText: () => {
      return result
        ? `Slope Calculator: Points (${x1}, ${y1}) to (${x2}, ${y2}) | Slope: ${result.slope} | Angle: ${result.angle.toFixed(2)}° | Grade: ${result.percentGrade.toFixed(1)}%`
        : 'Calculate slope, angle, and equation forms from two points!';
    },
  });

  const calculateSlope = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    // 验证输入
    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      alert('Please enter valid numbers for all coordinates.');
      return;
    }

    // 检查两点是否重合
    if (x1Val === x2Val && y1Val === y2Val) {
      alert('⚠️ The two points are identical. Cannot calculate slope for coincident points.');
      return;
    }

    const dx = x2Val - x1Val;
    const dy = y2Val - y1Val;

    // 检查是否为垂直线
    const isVertical = dx === 0;
    const isHorizontal = dy === 0;

    let slope: number | string;
    let angle: number;
    let percentGrade: number;

    if (isVertical) {
      slope = 'Undefined';
      angle = 90;
      percentGrade = Infinity;
    } else {
      slope = dy / dx;
      angle = Math.atan(slope) * (180 / Math.PI);
      percentGrade = Math.abs(slope) * 100;
    }

    // 计算 y-intercept (b) for y = mx + b
    let yIntercept = 0;
    let slopeIntercept = '';
    if (!isVertical) {
      yIntercept = y1Val - (slope as number) * x1Val;
      const slopeStr = typeof slope === 'number' ? slope.toFixed(4) : slope;
      const interceptStr = yIntercept >= 0 ? `+ ${yIntercept.toFixed(4)}` : `- ${Math.abs(yIntercept).toFixed(4)}`;
      slopeIntercept = `y = ${slopeStr}x ${interceptStr}`;
    } else {
      slopeIntercept = `x = ${x1Val}`;
    }

    // 点斜式: y - y₁ = m(x - x₁)
    let pointSlope = '';
    if (!isVertical) {
      const slopeStr = typeof slope === 'number' ? slope.toFixed(4) : slope;
      pointSlope = `y - ${y1Val} = ${slopeStr}(x - ${x1Val})`;
    } else {
      pointSlope = `x = ${x1Val}`;
    }

    // 一般式: Ax + By + C = 0
    let generalForm = '';
    if (!isVertical) {
      // dy(x) - dx(y) + (dx*y1 - dy*x1) = 0
      // 简化为整数系数
      const A = dy;
      const B = -dx;
      const C = dx * y1Val - dy * x1Val;
      generalForm = `${A.toFixed(0)}x ${B >= 0 ? '+' : ''} ${B.toFixed(0)}y ${C >= 0 ? '+' : ''} ${C.toFixed(0)} = 0`;
    } else {
      generalForm = `x - ${x1Val} = 0`;
    }

    // 坡度分类和建议
    let category = '';
    let recommendation = '';
    
    if (isVertical) {
      category = 'Vertical Line';
      recommendation = 'Perfect for walls, cliffs, or any vertical structure. Not suitable for walking or vehicle traffic.';
    } else if (isHorizontal) {
      category = 'Horizontal Line (0% grade)';
      recommendation = 'Perfect flat surface. Ideal for wheelchair access, parking lots, and foundation slabs.';
    } else {
      const absPercent = Math.abs(percentGrade);
      if (absPercent < 5) {
        category = 'Gentle Slope (0-5%)';
        recommendation = 'Perfect for pedestrian walkways, bike paths, and accessible ramps. Meets ADA requirements for wheelchair access.';
      } else if (absPercent < 15) {
        category = 'Moderate Slope (5-15%)';
        recommendation = 'Suitable for driveways, bike trails, and hiking paths. May require handrails for pedestrian safety.';
      } else if (absPercent < 30) {
        category = 'Steep Slope (15-30%)';
        recommendation = 'Suitable for ski slopes (beginner to intermediate), mountain roads with switchbacks. Requires anti-slip surfaces and drainage systems.';
      } else {
        category = 'Very Steep (>30%)';
        recommendation = 'Extreme terrain requiring stairs, cable cars, or specialized equipment. Ideal for advanced ski slopes, climbing walls, or rock faces.';
      }
    }

    setResult({
      slope,
      isVertical,
      isHorizontal,
      angle,
      percentGrade,
      slopeIntercept,
      pointSlope,
      generalForm,
      category,
      recommendation
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Save as Image
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
      link.download = `slope-calculator-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
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
              <title>Slope Calculator Results</title>
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Enter Coordinates</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Input two points to calculate slope</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Point 1 */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-700">Point 1 (x₁, y₁) <span className="text-red-500">*</span></p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="x1" className="text-xs">x₁</Label>
                    <input
                      id="x1"
                      type="number"
                      value={x1}
                      onChange={(e) => setX1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <Label htmlFor="y1" className="text-xs">y₁</Label>
                    <input
                      id="y1"
                      type="number"
                      value={y1}
                      onChange={(e) => setY1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      step="any"
                    />
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-700">Point 2 (x₂, y₂) <span className="text-red-500">*</span></p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="x2" className="text-xs">x₂</Label>
                    <input
                      id="x2"
                      type="number"
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <Label htmlFor="y2" className="text-xs">y₂</Label>
                    <input
                      id="y2"
                      type="number"
                      value={y2}
                      onChange={(e) => setY2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      step="any"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={calculateSlope}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Slope
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Slope Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Slope (m):</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-3xl font-bold text-blue-700">
                      {typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope}
                    </p>
                  </div>

                  {/* Category and Recommendation */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">📊 Slope Category:</p>
                    <p className="font-semibold text-lg text-green-700 mb-3">{result.category}</p>
                    <p className="text-sm font-semibold text-gray-900 mb-2">💡 Recommendation:</p>
                    <p className="text-sm text-gray-700">{result.recommendation}</p>
                  </div>

                  {/* Additional Measurements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {!result.isVertical && (
                      <>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <p className="text-xs text-gray-600 mb-1">Angle:</p>
                          <p className="font-mono text-xl font-bold text-gray-900">
                            {result.angle.toFixed(2)}°
                          </p>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <p className="text-xs text-gray-600 mb-1">Percent Grade:</p>
                          <p className="font-mono text-xl font-bold text-gray-900">
                            {result.percentGrade.toFixed(2)}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Interactive Graph Visualization */}
                  <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-4">📊 Interactive Graph:</p>
                    <SlopeGraph 
                      x1={parseFloat(x1)} 
                      y1={parseFloat(y1)} 
                      x2={parseFloat(x2)} 
                      y2={parseFloat(y2)}
                      slope={result.slope}
                      angle={result.angle}
                    />
                  </div>

                  {/* Line Equations */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Slope-Intercept Form:</p>
                      <p className="font-mono text-base text-gray-900">{result.slopeIntercept}</p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Point-Slope Form:</p>
                      <p className="font-mono text-base text-gray-900">{result.pointSlope}</p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">General Form:</p>
                      <p className="font-mono text-base text-gray-900">{result.generalForm}</p>
                    </div>
                  </div>

                  {/* Formula and Steps */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">📐 Calculation Steps:</p>
                    <div className="space-y-2 text-sm font-mono text-gray-700">
                      <p>1. Slope Formula: m = (y₂ - y₁) / (x₂ - x₁)</p>
                      <p>2. m = ({y2} - {y1}) / ({x2} - {x1})</p>
                      <p>3. m = {parseFloat(y2) - parseFloat(y1)} / {parseFloat(x2) - parseFloat(x1)}</p>
                      <p>4. m = {typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope}</p>
                      {!result.isVertical && (
                        <>
                          <p className="mt-3">5. Angle: θ = arctan(m) = {result.angle.toFixed(2)}°</p>
                          <p>6. Percent Grade: {result.percentGrade.toFixed(2)}%</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter coordinates and click Calculate</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="shadow-lg mb-6">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Slope Formulas & Concepts</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Slope Formula</h3>
              <p className="font-mono text-xl mb-3">m = (y₂ - y₁) / (x₂ - x₁)</p>
              <p className="text-sm text-gray-700">
                The slope represents the rate of change in y relative to x. Also known as "rise over run."
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Slope Types</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Positive slope: Line rises left to right</li>
                <li>• Negative slope: Line falls left to right</li>
                <li>• Zero slope: Horizontal line (m = 0)</li>
                <li>• Undefined slope: Vertical line (Δx = 0)</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Parallel & Perpendicular Lines</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Parallel lines:</strong> m₁ = m₂ (same slope)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Perpendicular lines:</strong> m₁ × m₂ = -1 (negative reciprocals)
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Angle Conversion</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Slope to Angle:</strong> θ = arctan(m)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Percent Grade:</strong> Grade% = m × 100%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
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

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Slope Calculator"
      />
    </div>
  );
}

// SlopeGraph Component - Interactive Visualization
interface SlopeGraphProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  slope: number | string;
  angle: number;
}

function SlopeGraph({ x1, y1, x2, y2, slope, angle }: SlopeGraphProps) {
  // SVG dimensions
  const width = 600;
  const height = 400;
  const padding = 60;
  
  // Calculate coordinate ranges
  const xMin = Math.min(x1, x2, 0) - 2;
  const xMax = Math.max(x1, x2, 0) + 2;
  const yMin = Math.min(y1, y2, 0) - 2;
  const yMax = Math.max(y1, y2, 0) + 2;
  
  // Scale functions to convert data coordinates to SVG coordinates
  const xScale = (x: number) => {
    return padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  };
  
  const yScale = (y: number) => {
    return height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
  };
  
  // Calculate screen coordinates
  const sx1 = xScale(x1);
  const sy1 = yScale(y1);
  const sx2 = xScale(x2);
  const sy2 = yScale(y2);
  
  // Calculate grid lines
  const xGridCount = Math.ceil(xMax - xMin);
  const yGridCount = Math.ceil(yMax - yMin);
  
  // Calculate Δx and Δy
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  return (
    <div className="w-full overflow-x-auto">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto bg-gray-50 rounded-lg border border-gray-200"
        style={{ minHeight: '300px', maxHeight: '500px' }}
      >
        {/* Grid lines */}
        <g className="grid-lines" stroke="#e5e7eb" strokeWidth="1">
          {Array.from({ length: xGridCount + 1 }).map((_, i) => {
            const x = xMin + i;
            const sx = xScale(x);
            return (
              <line key={`vgrid-${i}`} x1={sx} y1={padding} x2={sx} y2={height - padding} />
            );
          })}
          {Array.from({ length: yGridCount + 1 }).map((_, i) => {
            const y = yMin + i;
            const sy = yScale(y);
            return (
              <line key={`hgrid-${i}`} x1={padding} y1={sy} x2={width - padding} y2={sy} />
            );
          })}
        </g>
        
        {/* Axes */}
        <g className="axes" stroke="#374151" strokeWidth="2">
          {/* X-axis */}
          <line x1={padding} y1={yScale(0)} x2={width - padding} y2={yScale(0)} />
          {/* Y-axis */}
          <line x1={xScale(0)} y1={padding} x2={xScale(0)} y2={height - padding} />
          {/* Arrow heads for axes */}
          <polygon points={`${width - padding},${yScale(0)} ${width - padding - 8},${yScale(0) - 5} ${width - padding - 8},${yScale(0) + 5}`} fill="#374151" />
          <polygon points={`${xScale(0)},${padding} ${xScale(0) - 5},${padding + 8} ${xScale(0) + 5},${padding + 8}`} fill="#374151" />
        </g>
        
        {/* Axis labels */}
        <text x={width - padding + 15} y={yScale(0) + 5} fontSize="14" fontWeight="bold" fill="#374151">x</text>
        <text x={xScale(0) + 5} y={padding - 10} fontSize="14" fontWeight="bold" fill="#374151">y</text>
        
        {/* Grid labels */}
        {Array.from({ length: xGridCount + 1 }).map((_, i) => {
          const x = xMin + i;
          if (x === 0) return null;
          const sx = xScale(x);
          return (
            <text key={`xlabel-${i}`} x={sx} y={yScale(0) + 20} fontSize="11" textAnchor="middle" fill="#6b7280">
              {x}
            </text>
          );
        })}
        {Array.from({ length: yGridCount + 1 }).map((_, i) => {
          const y = yMin + i;
          if (y === 0) return null;
          const sy = yScale(y);
          return (
            <text key={`ylabel-${i}`} x={xScale(0) - 10} y={sy + 4} fontSize="11" textAnchor="end" fill="#6b7280">
              {y}
            </text>
          );
        })}
        
        {/* Δx horizontal line (dotted) */}
        <line 
          x1={sx1} 
          y1={sy1} 
          x2={sx2} 
          y2={sy1} 
          stroke="#3b82f6" 
          strokeWidth="2" 
          strokeDasharray="5,5"
        />
        
        {/* Δy vertical line (dotted) */}
        <line 
          x1={sx2} 
          y1={sy1} 
          x2={sx2} 
          y2={sy2} 
          stroke="#3b82f6" 
          strokeWidth="2" 
          strokeDasharray="5,5"
        />
        
        {/* Δx label */}
        <text 
          x={(sx1 + sx2) / 2} 
          y={sy1 + (sy1 < sy2 ? -10 : 20)} 
          fontSize="14" 
          fontWeight="bold" 
          fill="#3b82f6" 
          textAnchor="middle"
        >
          Δx = {dx.toFixed(2)}
        </text>
        
        {/* Δy label */}
        <text 
          x={sx2 + (sx2 > sx1 ? 30 : -30)} 
          y={(sy1 + sy2) / 2} 
          fontSize="14" 
          fontWeight="bold" 
          fill="#3b82f6" 
          textAnchor={sx2 > sx1 ? 'start' : 'end'}
        >
          Δy = {dy.toFixed(2)}
        </text>
        
        {/* Main line connecting the two points */}
        <line 
          x1={sx1} 
          y1={sy1} 
          x2={sx2} 
          y2={sy2} 
          stroke="#dc2626" 
          strokeWidth="3"
        />
        
        {/* Extended line (dashed) */}
        {typeof slope === 'number' && (
          <>
            <line 
              x1={padding} 
              y1={yScale(y1 + slope * (xMin - x1))} 
              x2={sx1} 
              y2={sy1} 
              stroke="#dc2626" 
              strokeWidth="2" 
              strokeDasharray="4,4"
              opacity="0.5"
            />
            <line 
              x1={sx2} 
              y1={sy2} 
              x2={width - padding} 
              y2={yScale(y2 + slope * (xMax - x2))} 
              stroke="#dc2626" 
              strokeWidth="2" 
              strokeDasharray="4,4"
              opacity="0.5"
            />
          </>
        )}
        
        {/* Angle arc */}
        {typeof slope === 'number' && slope !== 0 && (
          <>
            <path
              d={`M ${sx1 + 40} ${sy1} A 40 40 0 0 ${dy > 0 ? 1 : 0} ${sx1 + 40 * Math.cos(angle * Math.PI / 180)} ${sy1 - 40 * Math.sin(angle * Math.PI / 180)}`}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <text
              x={sx1 + 50}
              y={sy1 - (dy > 0 ? 10 : -20)}
              fontSize="13"
              fontWeight="bold"
              fill="#16a34a"
            >
              θ = {angle.toFixed(1)}°
            </text>
          </>
        )}
        
        {/* Point 1 */}
        <circle cx={sx1} cy={sy1} r="6" fill="#2563eb" stroke="white" strokeWidth="2" />
        <text 
          x={sx1} 
          y={sy1 - 15} 
          fontSize="13" 
          fontWeight="bold" 
          fill="#2563eb" 
          textAnchor="middle"
        >
          ({x1}, {y1})
        </text>
        
        {/* Point 2 */}
        <circle cx={sx2} cy={sy2} r="6" fill="#dc2626" stroke="white" strokeWidth="2" />
        <text 
          x={sx2} 
          y={sy2 - 15} 
          fontSize="13" 
          fontWeight="bold" 
          fill="#dc2626" 
          textAnchor="middle"
        >
          ({x2}, {y2})
        </text>
        
        {/* Distance label */}
        <text 
          x={(sx1 + sx2) / 2} 
          y={(sy1 + sy2) / 2 - 10} 
          fontSize="12" 
          fontWeight="bold" 
          fill="#dc2626" 
          textAnchor="middle"
          className="bg-white"
        >
          d = {Math.sqrt(dx * dx + dy * dy).toFixed(2)}
        </text>
      </svg>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>
          <span className="text-gray-700">Point 1 (x₁, y₁)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span className="text-gray-700">Point 2 (x₂, y₂)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-600"></div>
          <span className="text-gray-700">Slope Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-blue-500 border-dashed border-t-2"></div>
          <span className="text-gray-700">Δx & Δy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-green-600"></div>
          <span className="text-gray-700">Angle θ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-gray-400"></div>
          <span className="text-gray-700">Axes & Grid</span>
        </div>
      </div>
    </div>
  );
}

