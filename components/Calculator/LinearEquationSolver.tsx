'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, Info, CheckCircle2, XCircle, Infinity } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Select, SelectItem } from '@/components/ui/select';

type EquationType = '1' | '2' | '3';
type SolutionType = 'unique' | 'infinite' | 'none';

interface Solution {
  type: SolutionType;
  x?: number;
  y?: number;
  z?: number;
  steps: string[];
  graphData?: {
    slope?: number;
    yIntercept?: number;
    xIntercept?: number;
  };
}

export default function LinearEquationSolver() {
  const [equationType, setEquationType] = useState<EquationType>('1');
  
  // 一元方程 ax + b = 0
  const [a1, setA1] = useState<string>('');
  const [b1, setB1] = useState<string>('');
  
  // 二元方程组
  const [a2_1, setA2_1] = useState<string>('');
  const [b2_1, setB2_1] = useState<string>('');
  const [c2_1, setC2_1] = useState<string>('');
  const [a2_2, setA2_2] = useState<string>('');
  const [b2_2, setB2_2] = useState<string>('');
  const [c2_2, setC2_2] = useState<string>('');
  
  // 三元方程组
  const [a3_1, setA3_1] = useState<string>('');
  const [b3_1, setB3_1] = useState<string>('');
  const [c3_1, setC3_1] = useState<string>('');
  const [d3_1, setD3_1] = useState<string>('');
  const [a3_2, setA3_2] = useState<string>('');
  const [b3_2, setB3_2] = useState<string>('');
  const [c3_2, setC3_2] = useState<string>('');
  const [d3_2, setD3_2] = useState<string>('');
  const [a3_3, setA3_3] = useState<string>('');
  const [b3_3, setB3_3] = useState<string>('');
  const [c3_3, setC3_3] = useState<string>('');
  const [d3_3, setD3_3] = useState<string>('');

  const [solution, setSolution] = useState<Solution | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/linear-equation-solver',
    getShareParams: () => ({}),
    getShareText: () => {
      return solution && solution.type === 'unique'
        ? `Linear Equation Solution: x=${solution.x?.toFixed(4)}`
        : 'Solve linear equations instantly!';
    },
  });

  const solve1Variable = () => {
    const a = parseFloat(a1);
    const b = parseFloat(b1);

    if (isNaN(a) || isNaN(b)) {
      alert('Please enter valid coefficients.');
      return;
    }

    const steps: string[] = [];
    steps.push(`Equation: ${a}x + ${b} = 0`);

    if (a === 0) {
      if (b === 0) {
        steps.push('0 = 0 (always true)');
        steps.push('Infinite solutions: any value of x');
        setSolution({ type: 'infinite', steps });
      } else {
        steps.push(`${b} = 0 (contradiction)`);
        steps.push('No solution exists');
        setSolution({ type: 'none', steps });
      }
      return;
    }

    steps.push(`Subtract ${b} from both sides: ${a}x = ${-b}`);
    steps.push(`Divide by ${a}: x = ${-b}/${a}`);
    const x = -b / a;
    steps.push(`Solution: x = ${x.toFixed(4)}`);

    setSolution({
      type: 'unique',
      x,
      steps,
      graphData: {
        slope: -a,
        yIntercept: b,
        xIntercept: x,
      },
    });
  };

  const solve2Variables = () => {
    const a1 = parseFloat(a2_1);
    const b1 = parseFloat(b2_1);
    const c1 = parseFloat(c2_1);
    const a2 = parseFloat(a2_2);
    const b2 = parseFloat(b2_2);
    const c2 = parseFloat(c2_2);

    if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2)) {
      alert('Please enter valid coefficients for both equations.');
      return;
    }

    const steps: string[] = [];
    steps.push(`Equation 1: ${a1}x + ${b1}y = ${c1}`);
    steps.push(`Equation 2: ${a2}x + ${b2}y = ${c2}`);
    steps.push('');
    steps.push('Using Cramer\'s Rule:');

    // 计算行列式
    const det = a1 * b2 - a2 * b1;
    steps.push(`Determinant D = (${a1})(${b2}) - (${a2})(${b1}) = ${det}`);

    if (Math.abs(det) < 1e-10) {
      // 检查是否平行或重合
      const ratio1 = a2 !== 0 ? a1 / a2 : null;
      const ratio2 = b2 !== 0 ? b1 / b2 : null;
      const ratio3 = c2 !== 0 ? c1 / c2 : null;

      if (ratio1 !== null && ratio2 !== null && Math.abs(ratio1 - ratio2) < 1e-10) {
        if (ratio3 !== null && Math.abs(ratio1 - ratio3) < 1e-10) {
          steps.push('Lines are identical: infinite solutions');
          setSolution({ type: 'infinite', steps });
        } else {
          steps.push('Lines are parallel: no solution');
          setSolution({ type: 'none', steps });
        }
      } else {
        steps.push('Lines are parallel: no solution');
        setSolution({ type: 'none', steps });
      }
      return;
    }

    const detX = c1 * b2 - c2 * b1;
    const detY = a1 * c2 - a2 * c1;

    steps.push(`Dx = (${c1})(${b2}) - (${c2})(${b1}) = ${detX}`);
    steps.push(`Dy = (${a1})(${c2}) - (${a2})(${c1}) = ${detY}`);

    const x = detX / det;
    const y = detY / det;

    steps.push('');
    steps.push(`x = Dx / D = ${detX} / ${det} = ${x.toFixed(4)}`);
    steps.push(`y = Dy / D = ${detY} / ${det} = ${y.toFixed(4)}`);
    steps.push('');
    steps.push('Verification:');
    steps.push(`Eq1: ${a1}(${x.toFixed(4)}) + ${b1}(${y.toFixed(4)}) = ${(a1 * x + b1 * y).toFixed(4)} ≈ ${c1}`);
    steps.push(`Eq2: ${a2}(${x.toFixed(4)}) + ${b2}(${y.toFixed(4)}) = ${(a2 * x + b2 * y).toFixed(4)} ≈ ${c2}`);

    setSolution({ type: 'unique', x, y, steps });
  };

  const solve3Variables = () => {
    const a1 = parseFloat(a3_1);
    const b1 = parseFloat(b3_1);
    const c1 = parseFloat(c3_1);
    const d1 = parseFloat(d3_1);
    const a2 = parseFloat(a3_2);
    const b2 = parseFloat(b3_2);
    const c2 = parseFloat(c3_2);
    const d2 = parseFloat(d3_2);
    const a3 = parseFloat(a3_3);
    const b3 = parseFloat(b3_3);
    const c3 = parseFloat(c3_3);
    const d3 = parseFloat(d3_3);

    if ([a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3].some(isNaN)) {
      alert('Please enter valid coefficients for all three equations.');
      return;
    }

    const steps: string[] = [];
    steps.push(`Equation 1: ${a1}x + ${b1}y + ${c1}z = ${d1}`);
    steps.push(`Equation 2: ${a2}x + ${b2}y + ${c2}z = ${d2}`);
    steps.push(`Equation 3: ${a3}x + ${b3}y + ${c3}z = ${d3}`);
    steps.push('');
    steps.push('Using Cramer\'s Rule:');

    // 计算主行列式 D
    const det = a1 * (b2 * c3 - b3 * c2) - b1 * (a2 * c3 - a3 * c2) + c1 * (a2 * b3 - a3 * b2);
    steps.push(`Determinant D = ${det.toFixed(4)}`);

    if (Math.abs(det) < 1e-10) {
      steps.push('Determinant is zero: system has no unique solution');
      setSolution({ type: 'none', steps });
      return;
    }

    // 计算 Dx, Dy, Dz
    const detX = d1 * (b2 * c3 - b3 * c2) - b1 * (d2 * c3 - d3 * c2) + c1 * (d2 * b3 - d3 * b2);
    const detY = a1 * (d2 * c3 - d3 * c2) - d1 * (a2 * c3 - a3 * c2) + c1 * (a2 * d3 - a3 * d2);
    const detZ = a1 * (b2 * d3 - b3 * d2) - b1 * (a2 * d3 - a3 * d2) + d1 * (a2 * b3 - a3 * b2);

    steps.push(`Dx = ${detX.toFixed(4)}`);
    steps.push(`Dy = ${detY.toFixed(4)}`);
    steps.push(`Dz = ${detZ.toFixed(4)}`);

    const x = detX / det;
    const y = detY / det;
    const z = detZ / det;

    steps.push('');
    steps.push(`x = Dx / D = ${x.toFixed(4)}`);
    steps.push(`y = Dy / D = ${y.toFixed(4)}`);
    steps.push(`z = Dz / D = ${z.toFixed(4)}`);
    steps.push('');
    steps.push('Verification:');
    steps.push(`Eq1: ${(a1 * x + b1 * y + c1 * z).toFixed(4)} ≈ ${d1}`);
    steps.push(`Eq2: ${(a2 * x + b2 * y + c2 * z).toFixed(4)} ≈ ${d2}`);
    steps.push(`Eq3: ${(a3 * x + b3 * y + c3 * z).toFixed(4)} ≈ ${d3}`);

    setSolution({ type: 'unique', x, y, z, steps });
  };

  const handleSolve = () => {
    if (equationType === '1') {
      solve1Variable();
    } else if (equationType === '2') {
      solve2Variables();
    } else {
      solve3Variables();
    }
  };

  const handleReset = () => {
    setA1('');
    setB1('');
    setA2_1('');
    setB2_1('');
    setC2_1('');
    setA2_2('');
    setB2_2('');
    setC2_2('');
    setA3_1('');
    setB3_1('');
    setC3_1('');
    setD3_1('');
    setA3_2('');
    setB3_2('');
    setC3_2('');
    setD3_2('');
    setA3_3('');
    setB3_3('');
    setC3_3('');
    setD3_3('');
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
      link.download = `linear-equation-solution-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current || !solution) return;

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
              <title>Linear Equation Solution</title>
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
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
              <CardTitle className="text-xl text-slate-900">Equation Type</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Select System Type</Label>
                <Select 
                  value={equationType} 
                  onChange={(e) => setEquationType(e.target.value as EquationType)}
                  className="w-full border-slate-300"
                >
                  <SelectItem value="1">One Variable (ax + b = 0)</SelectItem>
                  <SelectItem value="2">Two Variables (2×2 System)</SelectItem>
                  <SelectItem value="3">Three Variables (3×3 System)</SelectItem>
                </Select>
              </div>

              {equationType === '1' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900">ax + b = 0</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-slate-600">Coefficient a</Label>
                      <input
                        type="number"
                        value={a1}
                        onChange={(e) => setA1(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="a"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-600">Constant b</Label>
                      <input
                        type="number"
                        value={b1}
                        onChange={(e) => setB1(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="b"
                        step="any"
                      />
                    </div>
                  </div>
                </div>
              )}

              {equationType === '2' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900">Equation 1: ax + by = c</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={a2_1}
                        onChange={(e) => setA2_1(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500"
                        placeholder="a"
                        step="any"
                      />
                      <input
                        type="number"
                        value={b2_1}
                        onChange={(e) => setB2_1(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500"
                        placeholder="b"
                        step="any"
                      />
                      <input
                        type="number"
                        value={c2_1}
                        onChange={(e) => setC2_1(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500"
                        placeholder="c"
                        step="any"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900">Equation 2: ax + by = c</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={a2_2}
                        onChange={(e) => setA2_2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500"
                        placeholder="a"
                        step="any"
                      />
                      <input
                        type="number"
                        value={b2_2}
                        onChange={(e) => setB2_2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500"
                        placeholder="b"
                        step="any"
                      />
                      <input
                        type="number"
                        value={c2_2}
                        onChange={(e) => setC2_2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500"
                        placeholder="c"
                        step="any"
                      />
                    </div>
                  </div>
                </div>
              )}

              {equationType === '3' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <h3 className="font-semibold text-slate-900 text-sm">Equation {i}: ax + by + cz = d</h3>
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="number"
                          value={i === 1 ? a3_1 : i === 2 ? a3_2 : a3_3}
                          onChange={(e) => {
                            if (i === 1) setA3_1(e.target.value);
                            else if (i === 2) setA3_2(e.target.value);
                            else setA3_3(e.target.value);
                          }}
                          className="w-full px-2 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 text-sm"
                          placeholder="a"
                          step="any"
                        />
                        <input
                          type="number"
                          value={i === 1 ? b3_1 : i === 2 ? b3_2 : b3_3}
                          onChange={(e) => {
                            if (i === 1) setB3_1(e.target.value);
                            else if (i === 2) setB3_2(e.target.value);
                            else setB3_3(e.target.value);
                          }}
                          className="w-full px-2 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 text-sm"
                          placeholder="b"
                          step="any"
                        />
                        <input
                          type="number"
                          value={i === 1 ? c3_1 : i === 2 ? c3_2 : c3_3}
                          onChange={(e) => {
                            if (i === 1) setC3_1(e.target.value);
                            else if (i === 2) setC3_2(e.target.value);
                            else setC3_3(e.target.value);
                          }}
                          className="w-full px-2 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 text-sm"
                          placeholder="c"
                          step="any"
                        />
                        <input
                          type="number"
                          value={i === 1 ? d3_1 : i === 2 ? d3_2 : d3_3}
                          onChange={(e) => {
                            if (i === 1) setD3_1(e.target.value);
                            else if (i === 2) setD3_2(e.target.value);
                            else setD3_3(e.target.value);
                          }}
                          className="w-full px-2 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 text-sm"
                          placeholder="d"
                          step="any"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600">
                    Enter coefficients for your equations. The solver uses Cramer's Rule for systems of equations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleSolve}
              className="flex-1 bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Solve
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="px-6 py-3 min-h-[44px] border-slate-300"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* 结果区域 */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
              <CardTitle className="text-xl text-slate-900">Solution</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {solution ? (
                <div className="space-y-6">
                  {/* 解的状态 */}
                  <div className={`border-2 rounded-lg p-4 ${
                    solution.type === 'unique' ? 'bg-green-50 border-green-300' :
                    solution.type === 'infinite' ? 'bg-blue-50 border-blue-300' :
                    'bg-red-50 border-red-300'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      {solution.type === 'unique' && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                      {solution.type === 'infinite' && <Infinity className="h-6 w-6 text-blue-600" />}
                      {solution.type === 'none' && <XCircle className="h-6 w-6 text-red-600" />}
                      <h3 className="text-lg font-semibold">
                        {solution.type === 'unique' && 'Unique Solution Found'}
                        {solution.type === 'infinite' && 'Infinite Solutions'}
                        {solution.type === 'none' && 'No Solution'}
                      </h3>
                    </div>

                    {solution.type === 'unique' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        {solution.x !== undefined && (
                          <div className="bg-white border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-slate-600 mb-1">x =</p>
                            <p className="text-2xl font-bold text-slate-900">{solution.x.toFixed(6)}</p>
                          </div>
                        )}
                        {solution.y !== undefined && (
                          <div className="bg-white border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-slate-600 mb-1">y =</p>
                            <p className="text-2xl font-bold text-slate-900">{solution.y.toFixed(6)}</p>
                          </div>
                        )}
                        {solution.z !== undefined && (
                          <div className="bg-white border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-slate-600 mb-1">z =</p>
                            <p className="text-2xl font-bold text-slate-900">{solution.z.toFixed(6)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 图形表示（仅一元方程） */}
                  {equationType === '1' && solution.type === 'unique' && solution.graphData && solution.x !== undefined && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Graphical Representation</h3>
                      <div className="bg-white border border-slate-200 rounded-lg p-6">
                        <svg width="500" height="300" viewBox="0 0 500 300" className="max-w-full h-auto">
                          <defs>
                            <marker id="arrowhead-axis" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                            </marker>
                          </defs>
                          
                          {/* 坐标轴 */}
                          <line x1="50" y1="150" x2="450" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-axis)" />
                          <line x1="250" y1="270" x2="250" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-axis)" />
                          
                          {/* 标签 */}
                          <text x="460" y="145" className="text-sm fill-slate-600">x</text>
                          <text x="255" y="25" className="text-sm fill-slate-600">y</text>
                          <text x="245" y="170" className="text-xs fill-slate-500">0</text>
                          
                          {/* 绘制直线 y = -ax - b */}
                          {(() => {
                            const a = parseFloat(a1);
                            const b = parseFloat(b1);
                            const x1 = -5;
                            const x2 = 5;
                            const y1 = -a * x1 - b;
                            const y2 = -a * x2 - b;
                            
                            // 转换坐标
                            const scale = 30;
                            const sx1 = 250 + x1 * scale;
                            const sy1 = 150 - y1 * scale;
                            const sx2 = 250 + x2 * scale;
                            const sy2 = 150 - y2 * scale;
                            
                            return (
                              <>
                                <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke="#3b82f6" strokeWidth="3" />
                                
                                {/* 解的点 */}
                                <circle
                                  cx={250 + solution.x! * scale}
                                  cy={150}
                                  r="6"
                                  fill="#ef4444"
                                  stroke="#fff"
                                  strokeWidth="2"
                                />
                                
                                {/* 解的标注 */}
                                <line
                                  x1={250 + solution.x! * scale}
                                  y1={150}
                                  x2={250 + solution.x! * scale}
                                  y2={160}
                                  stroke="#ef4444"
                                  strokeWidth="2"
                                />
                                <text
                                  x={250 + solution.x! * scale}
                                  y={180}
                                  textAnchor="middle"
                                  className="text-sm font-bold fill-red-600"
                                >
                                  x = {solution.x!.toFixed(2)}
                                </text>
                                
                                {/* 方程标签 */}
                                <text x="60" y="50" className="text-sm font-semibold fill-blue-600">
                                  {a}x + {b} = 0
                                </text>
                              </>
                            );
                          })()}
                        </svg>
                        <p className="text-xs text-slate-500 text-center mt-2">
                          Graph showing where the line y = {parseFloat(a1)}x + {parseFloat(b1)} intersects the x-axis
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 图形表示（二元方程组） */}
                  {equationType === '2' && solution.type === 'unique' && solution.x !== undefined && solution.y !== undefined && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Graphical Representation</h3>
                      <div className="bg-white border border-slate-200 rounded-lg p-6">
                        <svg width="500" height="500" viewBox="0 0 500 500" className="max-w-full h-auto">
                          <defs>
                            <marker id="arrowhead-2d" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                            </marker>
                          </defs>
                          
                          {/* 网格 */}
                          {Array.from({ length: 11 }, (_, i) => {
                            const pos = 50 + i * 40;
                            return (
                              <g key={i}>
                                <line x1={pos} y1="50" x2={pos} y2="450" stroke="#e2e8f0" strokeWidth="1" />
                                <line x1="50" y1={pos} x2="450" y2={pos} stroke="#e2e8f0" strokeWidth="1" />
                              </g>
                            );
                          })}
                          
                          {/* 坐标轴 */}
                          <line x1="50" y1="250" x2="450" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-2d)" />
                          <line x1="250" y1="450" x2="250" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-2d)" />
                          
                          {/* 标签 */}
                          <text x="460" y="245" className="text-sm fill-slate-600 font-semibold">x</text>
                          <text x="255" y="45" className="text-sm fill-slate-600 font-semibold">y</text>
                          
                          {/* 绘制两条直线 */}
                          {(() => {
                            const a1 = parseFloat(a2_1);
                            const b1 = parseFloat(b2_1);
                            const c1 = parseFloat(c2_1);
                            const a2 = parseFloat(a2_2);
                            const b2 = parseFloat(b2_2);
                            const c2 = parseFloat(c2_2);
                            
                            const scale = 40;
                            
                            // 直线1: a1*x + b1*y = c1 => y = (c1 - a1*x) / b1
                            const getY1 = (x: number) => b1 !== 0 ? (c1 - a1 * x) / b1 : 0;
                            const x1Start = -5;
                            const x1End = 5;
                            
                            // 直线2: a2*x + b2*y = c2 => y = (c2 - a2*x) / b2
                            const getY2 = (x: number) => b2 !== 0 ? (c2 - a2 * x) / b2 : 0;
                            
                            return (
                              <>
                                {/* 直线1 */}
                                <line
                                  x1={250 + x1Start * scale}
                                  y1={250 - getY1(x1Start) * scale}
                                  x2={250 + x1End * scale}
                                  y2={250 - getY1(x1End) * scale}
                                  stroke="#3b82f6"
                                  strokeWidth="3"
                                />
                                
                                {/* 直线2 */}
                                <line
                                  x1={250 + x1Start * scale}
                                  y1={250 - getY2(x1Start) * scale}
                                  x2={250 + x1End * scale}
                                  y2={250 - getY2(x1End) * scale}
                                  stroke="#10b981"
                                  strokeWidth="3"
                                />
                                
                                {/* 交点 */}
                                <circle
                                  cx={250 + solution.x! * scale}
                                  cy={250 - solution.y! * scale}
                                  r="8"
                                  fill="#ef4444"
                                  stroke="#fff"
                                  strokeWidth="3"
                                />
                                
                                {/* 交点标注 */}
                                <text
                                  x={250 + solution.x! * scale + 15}
                                  y={250 - solution.y! * scale - 10}
                                  className="text-sm font-bold fill-red-600"
                                >
                                  ({solution.x!.toFixed(2)}, {solution.y!.toFixed(2)})
                                </text>
                                
                                {/* 方程标签 */}
                                <g>
                                  <rect x="60" y="60" width="180" height="50" fill="white" opacity="0.9" stroke="#cbd5e1" strokeWidth="1" rx="4" />
                                  <line x1="70" y1="75" x2="100" y2="75" stroke="#3b82f6" strokeWidth="3" />
                                  <text x="110" y="80" className="text-xs fill-slate-700">
                                    {a1}x + {b1}y = {c1}
                                  </text>
                                  <line x1="70" y1="95" x2="100" y2="95" stroke="#10b981" strokeWidth="3" />
                                  <text x="110" y="100" className="text-xs fill-slate-700">
                                    {a2}x + {b2}y = {c2}
                                  </text>
                                </g>
                              </>
                            );
                          })()}
                        </svg>
                        <p className="text-xs text-slate-500 text-center mt-2">
                          Graph showing the intersection point of the two lines
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 详细步骤 */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Solution Steps</h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="space-y-2 font-mono text-sm text-slate-700">
                        {solution.steps.map((step, index) => (
                          <div key={index} className={step === '' ? 'h-2' : ''}>
                            {step && <p>{step}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Enter coefficients and click Solve</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 操作按钮 */}
      {solution && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2 border-slate-300">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2 border-slate-300">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2 border-slate-300">
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
        calculatorName="Linear Equation Solver"
      />
    </div>
  );
}

