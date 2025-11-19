'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, Info, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Select, SelectItem } from '@/components/ui/select';

type InequalityType = 'linear' | 'quadratic' | 'absolute';
type InequalitySign = '<' | '<=' | '>' | '>=';

interface Solution {
  type: 'single-interval' | 'two-intervals' | 'all-real' | 'no-solution';
  intervals: { start: number | null; end: number | null; includeStart: boolean; includeEnd: boolean }[];
  steps: string[];
  intervalNotation: string;
}

export default function InequalitySolver() {
  const [inequalityType, setInequalityType] = useState<InequalityType>('linear');
  const [sign, setSign] = useState<InequalitySign>('>');
  
  // 线性不等式 ax + b [sign] 0
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  
  // 二次不等式 ax² + bx + c [sign] 0
  const [a2, setA2] = useState<string>('');
  const [b2, setB2] = useState<string>('');
  const [c2, setC2] = useState<string>('');
  
  // 绝对值不等式 |ax + b| [sign] c
  const [aAbs, setAAbs] = useState<string>('');
  const [bAbs, setBAbs] = useState<string>('');
  const [cAbs, setCAbs] = useState<string>('');

  const [solution, setSolution] = useState<Solution | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/inequality-solver',
    getShareParams: () => ({}),
    getShareText: () => {
      return solution
        ? `Inequality Solution: ${solution.intervalNotation}`
        : 'Solve inequalities with visual number line!';
    },
  });

  // 解一元线性不等式
  const solveLinear = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);

    if (isNaN(aNum) || isNaN(bNum)) {
      alert('Please enter valid coefficients.');
      return;
    }

    const steps: string[] = [];
    steps.push(`Inequality: ${aNum}x + ${bNum} ${sign} 0`);

    if (aNum === 0) {
      if ((sign === '>' && bNum > 0) || (sign === '>=' && bNum >= 0) ||
          (sign === '<' && bNum < 0) || (sign === '<=' && bNum <= 0)) {
        steps.push('True for all x (always satisfied)');
        setSolution({
          type: 'all-real',
          intervals: [{ start: null, end: null, includeStart: false, includeEnd: false }],
          steps,
          intervalNotation: '(-∞, +∞)',
        });
      } else {
        steps.push('False for all x (never satisfied)');
        setSolution({
          type: 'no-solution',
          intervals: [],
          steps,
          intervalNotation: '∅ (no solution)',
        });
      }
      return;
    }

    // ax + b [sign] 0  =>  ax [sign] -b  =>  x [sign] -b/a
    steps.push(`Subtract ${bNum} from both sides: ${aNum}x ${sign} ${-bNum}`);
    
    const critical = -bNum / aNum;
    
    if (aNum > 0) {
      steps.push(`Divide by ${aNum}: x ${sign} ${critical.toFixed(4)}`);
      
      if (sign === '>') {
        steps.push(`Solution: x > ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: critical, end: null, includeStart: false, includeEnd: false }],
          steps,
          intervalNotation: `(${critical.toFixed(4)}, +∞)`,
        });
      } else if (sign === '>=') {
        steps.push(`Solution: x ≥ ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: critical, end: null, includeStart: true, includeEnd: false }],
          steps,
          intervalNotation: `[${critical.toFixed(4)}, +∞)`,
        });
      } else if (sign === '<') {
        steps.push(`Solution: x < ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: null, end: critical, includeStart: false, includeEnd: false }],
          steps,
          intervalNotation: `(-∞, ${critical.toFixed(4)})`,
        });
      } else {
        steps.push(`Solution: x ≤ ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: null, end: critical, includeStart: false, includeEnd: true }],
          steps,
          intervalNotation: `(-∞, ${critical.toFixed(4)}]`,
        });
      }
    } else {
      // a < 0: 不等号方向改变
      const flippedSign = sign === '>' ? '<' : sign === '>=' ? '<=' : sign === '<' ? '>' : '>=';
      steps.push(`Divide by ${aNum} (flip sign): x ${flippedSign} ${critical.toFixed(4)}`);
      
      if (flippedSign === '>') {
        steps.push(`Solution: x > ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: critical, end: null, includeStart: false, includeEnd: false }],
          steps,
          intervalNotation: `(${critical.toFixed(4)}, +∞)`,
        });
      } else if (flippedSign === '>=') {
        steps.push(`Solution: x ≥ ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: critical, end: null, includeStart: true, includeEnd: false }],
          steps,
          intervalNotation: `[${critical.toFixed(4)}, +∞)`,
        });
      } else if (flippedSign === '<') {
        steps.push(`Solution: x < ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: null, end: critical, includeStart: false, includeEnd: false }],
          steps,
          intervalNotation: `(-∞, ${critical.toFixed(4)})`,
        });
      } else {
        steps.push(`Solution: x ≤ ${critical.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: null, end: critical, includeStart: false, includeEnd: true }],
          steps,
          intervalNotation: `(-∞, ${critical.toFixed(4)}]`,
        });
      }
    }
  };

  // 解二次不等式
  const solveQuadratic = () => {
    const aNum = parseFloat(a2);
    const bNum = parseFloat(b2);
    const cNum = parseFloat(c2);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      alert('Please enter valid coefficients.');
      return;
    }

    if (aNum === 0) {
      alert('Coefficient a cannot be zero for quadratic inequality.');
      return;
    }

    const steps: string[] = [];
    steps.push(`Inequality: ${aNum}x² + ${bNum}x + ${cNum} ${sign} 0`);

    // 计算判别式
    const discriminant = bNum * bNum - 4 * aNum * cNum;
    steps.push(`Discriminant Δ = b² - 4ac = ${bNum}² - 4(${aNum})(${cNum}) = ${discriminant.toFixed(4)}`);

    if (discriminant < 0) {
      // 无实根
      steps.push('No real roots (Δ < 0)');
      
      if ((aNum > 0 && (sign === '>' || sign === '>=')) ||
          (aNum < 0 && (sign === '<' || sign === '<='))) {
        steps.push('Parabola always above/below x-axis: solution is all real numbers');
        setSolution({
          type: 'all-real',
          intervals: [{ start: null, end: null, includeStart: false, includeEnd: false }],
          steps,
          intervalNotation: '(-∞, +∞)',
        });
      } else {
        steps.push('Parabola never satisfies inequality: no solution');
        setSolution({
          type: 'no-solution',
          intervals: [],
          steps,
          intervalNotation: '∅ (no solution)',
        });
      }
      return;
    }

    // 计算根
    const x1 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
    const x2 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
    const root1 = Math.min(x1, x2);
    const root2 = Math.max(x1, x2);

    if (discriminant === 0) {
      steps.push(`One root: x = ${root1.toFixed(4)}`);
    } else {
      steps.push(`Two roots: x₁ = ${root1.toFixed(4)}, x₂ = ${root2.toFixed(4)}`);
    }

    // 判断解集
    if (aNum > 0) {
      // 开口向上
      steps.push('Parabola opens upward (a > 0)');
      
      if (sign === '>' || sign === '>=') {
        const include = sign === '>=';
        steps.push(`Solution: x < ${root1.toFixed(4)} or x > ${root2.toFixed(4)}`);
        setSolution({
          type: 'two-intervals',
          intervals: [
            { start: null, end: root1, includeStart: false, includeEnd: include },
            { start: root2, end: null, includeStart: include, includeEnd: false },
          ],
          steps,
          intervalNotation: `(-∞, ${root1.toFixed(4)}${include ? ']' : ')'} ∪ ${include ? '[' : '('}${root2.toFixed(4)}, +∞)`,
        });
      } else {
        const include = sign === '<=';
        steps.push(`Solution: ${root1.toFixed(4)} < x < ${root2.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: root1, end: root2, includeStart: include, includeEnd: include }],
          steps,
          intervalNotation: `${include ? '[' : '('}${root1.toFixed(4)}, ${root2.toFixed(4)}${include ? ']' : ')'}`,
        });
      }
    } else {
      // 开口向下
      steps.push('Parabola opens downward (a < 0)');
      
      if (sign === '<' || sign === '<=') {
        const include = sign === '<=';
        steps.push(`Solution: x < ${root1.toFixed(4)} or x > ${root2.toFixed(4)}`);
        setSolution({
          type: 'two-intervals',
          intervals: [
            { start: null, end: root1, includeStart: false, includeEnd: include },
            { start: root2, end: null, includeStart: include, includeEnd: false },
          ],
          steps,
          intervalNotation: `(-∞, ${root1.toFixed(4)}${include ? ']' : ')'} ∪ ${include ? '[' : '('}${root2.toFixed(4)}, +∞)`,
        });
      } else {
        const include = sign === '>=';
        steps.push(`Solution: ${root1.toFixed(4)} < x < ${root2.toFixed(4)}`);
        setSolution({
          type: 'single-interval',
          intervals: [{ start: root1, end: root2, includeStart: include, includeEnd: include }],
          steps,
          intervalNotation: `${include ? '[' : '('}${root1.toFixed(4)}, ${root2.toFixed(4)}${include ? ']' : ')'}`,
        });
      }
    }
  };

  // 解绝对值不等式
  const solveAbsolute = () => {
    const aNum = parseFloat(aAbs);
    const bNum = parseFloat(bAbs);
    const cNum = parseFloat(cAbs);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      alert('Please enter valid coefficients.');
      return;
    }

    if (cNum < 0) {
      alert('Right side must be non-negative for absolute value inequality.');
      return;
    }

    const steps: string[] = [];
    steps.push(`Inequality: |${aNum}x + ${bNum}| ${sign} ${cNum}`);

    if (sign === '<' || sign === '<=') {
      // |expr| < c  =>  -c < expr < c
      const left = (-cNum - bNum) / aNum;
      const right = (cNum - bNum) / aNum;
      const bound1 = Math.min(left, right);
      const bound2 = Math.max(left, right);
      
      steps.push(`Equivalent to: -${cNum} ${sign} ${aNum}x + ${bNum} ${sign} ${cNum}`);
      steps.push(`Solve: ${bound1.toFixed(4)} ${sign} x ${sign} ${bound2.toFixed(4)}`);
      
      const include = sign === '<=';
      setSolution({
        type: 'single-interval',
        intervals: [{ start: bound1, end: bound2, includeStart: include, includeEnd: include }],
        steps,
        intervalNotation: `${include ? '[' : '('}${bound1.toFixed(4)}, ${bound2.toFixed(4)}${include ? ']' : ')'}`,
      });
    } else {
      // |expr| > c  =>  expr < -c or expr > c
      const left = (-cNum - bNum) / aNum;
      const right = (cNum - bNum) / aNum;
      const bound1 = Math.min(left, right);
      const bound2 = Math.max(left, right);
      
      steps.push(`Equivalent to: ${aNum}x + ${bNum} < -${cNum} or ${aNum}x + ${bNum} > ${cNum}`);
      steps.push(`Solve: x < ${bound1.toFixed(4)} or x > ${bound2.toFixed(4)}`);
      
      const include = sign === '>=';
      setSolution({
        type: 'two-intervals',
        intervals: [
          { start: null, end: bound1, includeStart: false, includeEnd: include },
          { start: bound2, end: null, includeStart: include, includeEnd: false },
        ],
        steps,
        intervalNotation: `(-∞, ${bound1.toFixed(4)}${include ? ']' : ')'} ∪ ${include ? '[' : '('}${bound2.toFixed(4)}, +∞)`,
      });
    }
  };

  const handleSolve = () => {
    if (inequalityType === 'linear') {
      solveLinear();
    } else if (inequalityType === 'quadratic') {
      solveQuadratic();
    } else {
      solveAbsolute();
    }
  };

  const handleReset = () => {
    setA('');
    setB('');
    setA2('');
    setB2('');
    setC2('');
    setAAbs('');
    setBAbs('');
    setCAbs('');
    setSolution(null);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !solution) return;

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
      link.download = `inequality-solution-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // 渲染数轴
  const renderNumberLine = () => {
    if (!solution || solution.type === 'no-solution') return null;

    const svgWidth = 600;
    const svgHeight = 120;
    const lineY = 60;
    const lineStart = 50;
    const lineEnd = 550;

    // 确定数轴范围
    let minVal = -10;
    let maxVal = 10;

    if (solution.type !== 'all-real') {
      const allPoints: number[] = [];
      solution.intervals.forEach(interval => {
        if (interval.start !== null) allPoints.push(interval.start);
        if (interval.end !== null) allPoints.push(interval.end);
      });

      if (allPoints.length > 0) {
        const min = Math.min(...allPoints);
        const max = Math.max(...allPoints);
        const range = max - min || 10;
        minVal = min - range * 0.3;
        maxVal = max + range * 0.3;
      }
    }

    const scale = (lineEnd - lineStart) / (maxVal - minVal);
    const toX = (val: number) => lineStart + (val - minVal) * scale;

    return (
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="max-w-full h-auto">
        {/* 数轴线 */}
        <line x1={lineStart} y1={lineY} x2={lineEnd} y2={lineY} stroke="#10B981" strokeWidth="3" />
        
        {/* 箭头 */}
        <polygon points={`${lineEnd},${lineY} ${lineEnd - 10},${lineY - 5} ${lineEnd - 10},${lineY + 5}`} fill="#10B981" />
        
        {/* 刻度和标签 */}
        {Array.from({ length: 11 }, (_, i) => {
          const val = minVal + (maxVal - minVal) * (i / 10);
          const x = toX(val);
          return (
            <g key={i}>
              <line x1={x} y1={lineY - 5} x2={x} y2={lineY + 5} stroke="#10B981" strokeWidth="1.5" />
              <text x={x} y={lineY + 20} textAnchor="middle" className="text-xs fill-gray-600">
                {val.toFixed(1)}
              </text>
            </g>
          );
        })}
        
        {/* 解集区间 */}
        {solution.type === 'all-real' && (
          <line x1={lineStart} y1={lineY} x2={lineEnd} y2={lineY} stroke="#10B981" strokeWidth="8" opacity="0.5" />
        )}
        
        {solution.intervals.map((interval, idx) => {
          const start = interval.start !== null ? toX(interval.start) : lineStart;
          const end = interval.end !== null ? toX(interval.end) : lineEnd;
          
          return (
            <g key={idx}>
              {/* 区间线 */}
              <line x1={start} y1={lineY} x2={end} y2={lineY} stroke="#10B981" strokeWidth="8" opacity="0.6" />
              
              {/* 端点 */}
              {interval.start !== null && (
                interval.includeStart ? (
                  <circle cx={toX(interval.start)} cy={lineY} r="5" fill="#10B981" stroke="#fff" strokeWidth="2" />
                ) : (
                  <circle cx={toX(interval.start)} cy={lineY} r="5" fill="#fff" stroke="#10B981" strokeWidth="2" />
                )
              )}
              
              {interval.end !== null && (
                interval.includeEnd ? (
                  <circle cx={toX(interval.end)} cy={lineY} r="5" fill="#10B981" stroke="#fff" strokeWidth="2" />
                ) : (
                  <circle cx={toX(interval.end)} cy={lineY} r="5" fill="#fff" stroke="#10B981" strokeWidth="2" />
                )
              )}
              
              {/* 箭头（无穷端） */}
              {interval.start === null && (
                <polygon points={`${lineStart + 5},${lineY} ${lineStart + 15},${lineY - 5} ${lineStart + 15},${lineY + 5}`} fill="#10B981" />
              )}
              {interval.end === null && (
                <polygon points={`${lineEnd - 5},${lineY} ${lineEnd - 15},${lineY - 5} ${lineEnd - 15},${lineY + 5}`} fill="#10B981" />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 输入区域 */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-xl text-green-900">Inequality Type</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-900">Select Type</Label>
                <Select 
                  value={inequalityType} 
                  onChange={(e) => setInequalityType(e.target.value as InequalityType)}
                  className="w-full border-green-300"
                >
                  <SelectItem value="linear">Linear (ax + b)</SelectItem>
                  <SelectItem value="quadratic">Quadratic (ax² + bx + c)</SelectItem>
                  <SelectItem value="absolute">Absolute Value (|ax + b|)</SelectItem>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-900">Inequality Sign</Label>
                <Select 
                  value={sign} 
                  onChange={(e) => setSign(e.target.value as InequalitySign)}
                  className="w-full border-green-300"
                >
                  <SelectItem value="<">&lt; (less than)</SelectItem>
                  <SelectItem value="<=">≤ (less than or equal)</SelectItem>
                  <SelectItem value=">">&gt; (greater than)</SelectItem>
                  <SelectItem value=">=">&gt;= (greater than or equal)</SelectItem>
                </Select>
              </div>

              {inequalityType === 'linear' && (
                <div className="space-y-4 pt-4 border-t border-green-200">
                  <h3 className="font-semibold text-green-900 text-sm">ax + b {sign} 0</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-green-800">Coefficient a</Label>
                      <input
                        type="number"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="a"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-green-800">Constant b</Label>
                      <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="b"
                        step="any"
                      />
                    </div>
                  </div>
                </div>
              )}

              {inequalityType === 'quadratic' && (
                <div className="space-y-4 pt-4 border-t border-green-200">
                  <h3 className="font-semibold text-green-900 text-sm">ax² + bx + c {sign} 0</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs text-green-800">a</Label>
                      <input
                        type="number"
                        value={a2}
                        onChange={(e) => setA2(e.target.value)}
                        className="w-full px-2 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="a"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-green-800">b</Label>
                      <input
                        type="number"
                        value={b2}
                        onChange={(e) => setB2(e.target.value)}
                        className="w-full px-2 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="b"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-green-800">c</Label>
                      <input
                        type="number"
                        value={c2}
                        onChange={(e) => setC2(e.target.value)}
                        className="w-full px-2 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="c"
                        step="any"
                      />
                    </div>
                  </div>
                </div>
              )}

              {inequalityType === 'absolute' && (
                <div className="space-y-4 pt-4 border-t border-green-200">
                  <h3 className="font-semibold text-green-900 text-sm">|ax + b| {sign} c</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs text-green-800">a</Label>
                      <input
                        type="number"
                        value={aAbs}
                        onChange={(e) => setAAbs(e.target.value)}
                        className="w-full px-2 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="a"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-green-800">b</Label>
                      <input
                        type="number"
                        value={bAbs}
                        onChange={(e) => setBAbs(e.target.value)}
                        className="w-full px-2 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="b"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-green-800">c</Label>
                      <input
                        type="number"
                        value={cAbs}
                        onChange={(e) => setCAbs(e.target.value)}
                        className="w-full px-2 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="c"
                        step="any"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-green-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-700">
                    Enter coefficients and select inequality sign. Solution will be shown on number line.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleSolve}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Solve
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="px-6 py-3 min-h-[44px] border-green-300 text-green-700 hover:bg-green-50"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* 结果区域 */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-xl text-green-900">Solution</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {solution ? (
                <div className="space-y-6">
                  {/* 解集表示 */}
                  <div className={`border-2 rounded-lg p-4 ${
                    solution.type === 'no-solution' ? 'bg-red-50 border-red-300' :
                    solution.type === 'all-real' ? 'bg-blue-50 border-blue-300' :
                    'bg-green-50 border-green-300'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      {solution.type === 'no-solution' ? (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      ) : (
                        <Info className="h-6 w-6 text-green-600" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-900">Interval Notation</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-900 font-mono">{solution.intervalNotation}</p>
                  </div>

                  {/* 数轴可视化 */}
                  {solution.type !== 'no-solution' && (
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Number Line</h3>
                      <div className="bg-white border border-green-200 rounded-lg p-6 overflow-x-auto">
                        {renderNumberLine()}
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <span>Closed endpoint (included)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-white"></div>
                          <span>Open endpoint (excluded)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 详细步骤 */}
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Solution Steps</h3>
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <div className="space-y-1 font-mono text-sm text-gray-700">
                        {solution.steps.map((step, index) => (
                          <div key={index}>
                            <p>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-green-300 mx-auto mb-4" />
                  <p className="text-green-600">Enter coefficients and click Solve</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 操作按钮 */}
      {solution && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2 border-green-300 text-green-700 hover:bg-green-50">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2 border-green-300 text-green-700 hover:bg-green-50">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2 border-green-300 text-green-700 hover:bg-green-50">
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
        calculatorName="Inequality Solver"
      />
    </div>
  );
}

