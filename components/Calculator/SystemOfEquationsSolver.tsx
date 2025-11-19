'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, Info, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Select, SelectItem } from '@/components/ui/select';

type SystemSize = '2' | '3';
type SolutionType = 'unique' | 'infinite' | 'none';

interface Solution {
  type: SolutionType;
  variables: number[];
  steps: string[];
  matrices: number[][][]; // 记录每一步的矩阵状态
}

export default function SystemOfEquationsSolver() {
  const [systemSize, setSystemSize] = useState<SystemSize>('2');
  
  // 2x2 系统
  const [a2_1, setA2_1] = useState<string>('');
  const [b2_1, setB2_1] = useState<string>('');
  const [c2_1, setC2_1] = useState<string>('');
  const [a2_2, setA2_2] = useState<string>('');
  const [b2_2, setB2_2] = useState<string>('');
  const [c2_2, setC2_2] = useState<string>('');
  
  // 3x3 系统
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
    calculatorPath: '/system-of-equations-solver',
    getShareParams: () => ({}),
    getShareText: () => {
      return solution && solution.type === 'unique'
        ? `System Solution: ${solution.variables.map((v, i) => `${String.fromCharCode(120 + i)}=${v.toFixed(4)}`).join(', ')}`
        : 'Solve systems of equations!';
    },
  });

  // 高斯消元法求解
  const gaussElimination = (augmentedMatrix: number[][]): Solution => {
    const n = augmentedMatrix.length;
    const matrix = augmentedMatrix.map(row => [...row]); // 深拷贝
    const steps: string[] = [];
    const matrices: number[][][] = [];
    
    steps.push('Initial Augmented Matrix:');
    matrices.push(matrix.map(row => [...row]));

    // 前向消元
    for (let i = 0; i < n; i++) {
      // 找到主元（pivot）
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = k;
        }
      }

      // 交换行
      if (maxRow !== i) {
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        steps.push(`Row ${i + 1} ↔ Row ${maxRow + 1} (pivot selection)`);
        matrices.push(matrix.map(row => [...row]));
      }

      // 检查主元是否为0
      if (Math.abs(matrix[i][i]) < 1e-10) {
        return {
          type: 'none',
          variables: [],
          steps: ['System has no unique solution (determinant is zero)'],
          matrices: [augmentedMatrix],
        };
      }

      // 归一化主元行
      const pivot = matrix[i][i];
      if (Math.abs(pivot - 1) > 1e-10) {
        for (let j = i; j <= n; j++) {
          matrix[i][j] /= pivot;
        }
        steps.push(`R${i + 1} = R${i + 1} / ${pivot.toFixed(4)} (normalize pivot)`);
        matrices.push(matrix.map(row => [...row]));
      }

      // 消元
      for (let k = i + 1; k < n; k++) {
        const factor = matrix[k][i];
        if (Math.abs(factor) > 1e-10) {
          for (let j = i; j <= n; j++) {
            matrix[k][j] -= factor * matrix[i][j];
          }
          steps.push(`R${k + 1} = R${k + 1} - (${factor.toFixed(4)}) × R${i + 1}`);
          matrices.push(matrix.map(row => [...row]));
        }
      }
    }

    steps.push('Forward elimination complete. Upper triangular matrix formed.');

    // 回代
    const solution: number[] = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = matrix[i][n];
      for (let j = i + 1; j < n; j++) {
        solution[i] -= matrix[i][j] * solution[j];
      }
      steps.push(`${String.fromCharCode(120 + i)} = ${solution[i].toFixed(6)}`);
    }

    // 验证
    steps.push('');
    steps.push('Verification:');
    const originalMatrix = augmentedMatrix;
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += originalMatrix[i][j] * solution[j];
      }
      steps.push(`Equation ${i + 1}: ${sum.toFixed(6)} ≈ ${originalMatrix[i][n].toFixed(6)}`);
    }

    return {
      type: 'unique',
      variables: solution,
      steps,
      matrices,
    };
  };

  const solve2x2 = () => {
    const a1 = parseFloat(a2_1);
    const b1 = parseFloat(b2_1);
    const c1 = parseFloat(c2_1);
    const a2 = parseFloat(a2_2);
    const b2 = parseFloat(b2_2);
    const c2 = parseFloat(c2_2);

    if ([a1, b1, c1, a2, b2, c2].some(isNaN)) {
      alert('Please enter valid coefficients for all equations.');
      return;
    }

    const augmentedMatrix = [
      [a1, b1, c1],
      [a2, b2, c2],
    ];

    const result = gaussElimination(augmentedMatrix);
    setSolution(result);
  };

  const solve3x3 = () => {
    const coeffs = [
      parseFloat(a3_1), parseFloat(b3_1), parseFloat(c3_1), parseFloat(d3_1),
      parseFloat(a3_2), parseFloat(b3_2), parseFloat(c3_2), parseFloat(d3_2),
      parseFloat(a3_3), parseFloat(b3_3), parseFloat(c3_3), parseFloat(d3_3),
    ];

    if (coeffs.some(isNaN)) {
      alert('Please enter valid coefficients for all equations.');
      return;
    }

    const augmentedMatrix = [
      [coeffs[0], coeffs[1], coeffs[2], coeffs[3]],
      [coeffs[4], coeffs[5], coeffs[6], coeffs[7]],
      [coeffs[8], coeffs[9], coeffs[10], coeffs[11]],
    ];

    const result = gaussElimination(augmentedMatrix);
    setSolution(result);
  };

  const handleSolve = () => {
    if (systemSize === '2') {
      solve2x2();
    } else {
      solve3x3();
    }
  };

  const handleReset = () => {
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
      link.download = `system-solution-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>System of Equations Solution</title>
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

  // 渲染矩阵
  const renderMatrix = (matrix: number[][], highlight?: { row?: number; col?: number }) => {
    return (
      <div className="inline-flex flex-col bg-white border-2 border-blue-300 rounded-lg p-3 my-2">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((val, j) => {
              const isHighlight = highlight?.row === i || highlight?.col === j;
              const isAugmented = j === row.length - 1;
              return (
                <div key={j} className="flex items-center">
                  {isAugmented && j > 0 && (
                    <div className="w-px h-8 bg-blue-400 mx-1"></div>
                  )}
                  <div
                    className={`w-16 h-8 flex items-center justify-center text-sm font-mono rounded ${
                      isHighlight
                        ? 'bg-blue-100 text-blue-900 font-bold'
                        : 'text-gray-700'
                    }`}
                  >
                    {val.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 输入区域 */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-xl text-blue-900">System Size</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-blue-900">Select System Type</Label>
                <Select 
                  value={systemSize} 
                  onChange={(e) => setSystemSize(e.target.value as SystemSize)}
                  className="w-full border-blue-300"
                >
                  <SelectItem value="2">2×2 System (2 equations, 2 variables)</SelectItem>
                  <SelectItem value="3">3×3 System (3 equations, 3 variables)</SelectItem>
                </Select>
              </div>

              {systemSize === '2' && (
                <div className="space-y-4 pt-4 border-t border-blue-200">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-900 text-sm">Equation 1: ax + by = c</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={a2_1}
                        onChange={(e) => setA2_1(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="a"
                        step="any"
                      />
                      <input
                        type="number"
                        value={b2_1}
                        onChange={(e) => setB2_1(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="b"
                        step="any"
                      />
                      <input
                        type="number"
                        value={c2_1}
                        onChange={(e) => setC2_1(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="c"
                        step="any"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-900 text-sm">Equation 2: ax + by = c</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={a2_2}
                        onChange={(e) => setA2_2(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="a"
                        step="any"
                      />
                      <input
                        type="number"
                        value={b2_2}
                        onChange={(e) => setB2_2(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="b"
                        step="any"
                      />
                      <input
                        type="number"
                        value={c2_2}
                        onChange={(e) => setC2_2(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="c"
                        step="any"
                      />
                    </div>
                  </div>
                </div>
              )}

              {systemSize === '3' && (
                <div className="space-y-4 pt-4 border-t border-blue-200">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <h3 className="font-semibold text-blue-900 text-xs">Eq {i}: ax + by + cz = d</h3>
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="number"
                          value={i === 1 ? a3_1 : i === 2 ? a3_2 : a3_3}
                          onChange={(e) => {
                            if (i === 1) setA3_1(e.target.value);
                            else if (i === 2) setA3_2(e.target.value);
                            else setA3_3(e.target.value);
                          }}
                          className="w-full px-2 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-xs"
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
                          className="w-full px-2 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-xs"
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
                          className="w-full px-2 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-xs"
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
                          className="w-full px-2 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 text-xs"
                          placeholder="d"
                          step="any"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    This solver uses Gaussian Elimination with step-by-step matrix visualization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleSolve}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Solve System
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="px-6 py-3 min-h-[44px] border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* 结果区域 */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-xl text-blue-900">Solution & Process</CardTitle>
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
                    <div className="flex items-center gap-3 mb-3">
                      {solution.type === 'unique' && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                      {solution.type === 'infinite' && <AlertTriangle className="h-6 w-6 text-blue-600" />}
                      {solution.type === 'none' && <XCircle className="h-6 w-6 text-red-600" />}
                      <h3 className="text-lg font-semibold">
                        {solution.type === 'unique' && 'Unique Solution Found'}
                        {solution.type === 'infinite' && 'Infinite Solutions'}
                        {solution.type === 'none' && 'No Solution'}
                      </h3>
                    </div>

                    {solution.type === 'unique' && solution.variables.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                        {solution.variables.map((val, index) => (
                          <div key={index} className="bg-white border-2 border-green-300 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">{String.fromCharCode(120 + index)} =</p>
                            <p className="text-2xl font-bold text-blue-900">{val.toFixed(6)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 矩阵变换过程可视化 */}
                  {solution.matrices && solution.matrices.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Gaussian Elimination Process</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 overflow-x-auto">
                        <div className="space-y-4">
                          {solution.matrices.map((matrix, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                              <p className="text-sm font-semibold text-blue-900 mb-2">
                                Step {idx + 1}:
                              </p>
                              {renderMatrix(matrix)}
                              {solution.steps[idx] && (
                                <p className="text-xs text-gray-700 mt-1 ml-2">{solution.steps[idx]}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 详细步骤 */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Detailed Steps</h3>
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="space-y-1 font-mono text-xs text-gray-700">
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
                  <Calculator className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                  <p className="text-blue-600">Enter coefficients and click Solve System</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 操作按钮 */}
      {solution && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50">
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
        calculatorName="System of Equations Solver"
      />
    </div>
  );
}

