'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Plus, Minus, X, RefreshCw, AlertCircle, ChevronUp, ChevronDown, ArrowLeftRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type Matrix = number[][];

interface MatrixResult {
  operation: string;
  result: Matrix | number | null;
  steps?: string[];
  determinant?: number;
  rank?: number;
  trace?: number;
  eigenvalues?: number[];
  inverse?: Matrix;
  transpose?: Matrix;
  error?: string;
}

export default function MatrixCalculator() {
  const [rows1, setRows1] = useState(3);
  const [cols1, setCols1] = useState(3);
  const [rows2, setRows2] = useState(3);
  const [cols2, setCols2] = useState(3);
  
  const [matrix1, setMatrix1] = useState<Matrix>(Array(3).fill(0).map(() => Array(3).fill(0)));
  const [matrix2, setMatrix2] = useState<Matrix>(Array(3).fill(0).map(() => Array(3).fill(0)));
  
  const [power1, setPower1] = useState(2);
  const [power2, setPower2] = useState(2);
  
  const [result, setResult] = useState<MatrixResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/matrix-calculator',
    getShareParams: () => ({}),
    getShareText: () => 'Calculate matrix operations with ease!',
  });

  // Initialize matrices when dimensions change
  const updateMatrix1Size = (newRows: number, newCols: number) => {
    setRows1(newRows);
    setCols1(newCols);
    const newMatrix = Array(newRows).fill(0).map(() => Array(newCols).fill(0));
    // Copy existing values
    for (let i = 0; i < Math.min(newRows, matrix1.length); i++) {
      for (let j = 0; j < Math.min(newCols, matrix1[0]?.length || 0); j++) {
        newMatrix[i][j] = matrix1[i]?.[j] || 0;
      }
    }
    setMatrix1(newMatrix);
  };

  const updateMatrix2Size = (newRows: number, newCols: number) => {
    setRows2(newRows);
    setCols2(newCols);
    const newMatrix = Array(newRows).fill(0).map(() => Array(newCols).fill(0));
    // Copy existing values
    for (let i = 0; i < Math.min(newRows, matrix2.length); i++) {
      for (let j = 0; j < Math.min(newCols, matrix2[0]?.length || 0); j++) {
        newMatrix[i][j] = matrix2[i]?.[j] || 0;
      }
    }
    setMatrix2(newMatrix);
  };

  const updateMatrixValue = (matrixNum: 1 | 2, row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (matrixNum === 1) {
      const newMatrix = matrix1.map((r, i) => 
        i === row ? r.map((c, j) => j === col ? numValue : c) : r
      );
      setMatrix1(newMatrix);
    } else {
      const newMatrix = matrix2.map((r, i) => 
        i === row ? r.map((c, j) => j === col ? numValue : c) : r
      );
      setMatrix2(newMatrix);
    }
  };

  // Matrix operations
  const addMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions for addition');
    }
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions for subtraction');
    }
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a[0].length !== b.length) {
      throw new Error('Number of columns in Matrix A must equal number of rows in Matrix B');
    }
    const result: Matrix = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  const transposeMatrix = (matrix: Matrix): Matrix => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  };

  const calculateDeterminant = (matrix: Matrix): number => {
    const n = matrix.length;
    if (n !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate determinant');
    }
    
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    // Use LU decomposition for larger matrices
    const lu = getLUDecomposition(matrix);
    let det = 1;
    for (let i = 0; i < n; i++) {
      det *= lu.U[i][i];
    }
    return det * lu.swaps;
  };

  const getLUDecomposition = (matrix: Matrix): { L: Matrix; U: Matrix; swaps: number } => {
    const n = matrix.length;
    const L: Matrix = Array(n).fill(0).map(() => Array(n).fill(0));
    const U: Matrix = matrix.map(row => [...row]);
    let swaps = 1;

    for (let i = 0; i < n; i++) {
      L[i][i] = 1;
      
      // Partial pivoting
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(U[k][i]) > Math.abs(U[maxRow][i])) {
          maxRow = k;
        }
      }
      
      if (maxRow !== i) {
        [U[i], U[maxRow]] = [U[maxRow], U[i]];
        swaps *= -1;
      }

      for (let k = i + 1; k < n; k++) {
        const factor = U[k][i] / U[i][i];
        L[k][i] = factor;
        for (let j = i; j < n; j++) {
          U[k][j] -= factor * U[i][j];
        }
      }
    }

    return { L, U, swaps };
  };

  const calculateInverse = (matrix: Matrix): Matrix => {
    const n = matrix.length;
    if (n !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate inverse');
    }

    const det = calculateDeterminant(matrix);
    if (Math.abs(det) < 1e-10) {
      throw new Error('Matrix is singular (determinant = 0), inverse does not exist');
    }

    // Create augmented matrix [A | I]
    const augmented: Matrix = matrix.map((row, i) => [
      ...row,
      ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)
    ]);

    // Gauss-Jordan elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

      // Scale pivot row
      const pivot = augmented[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivot;
      }

      // Eliminate column
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
        }
      }
    }

    // Extract inverse from augmented matrix
    return augmented.map(row => row.slice(n));
  };

  const calculateRank = (matrix: Matrix): number => {
    const m = matrix.length;
    const n = matrix[0].length;
    const temp = matrix.map(row => [...row]);
    let rank = 0;

    for (let col = 0; col < n && rank < m; col++) {
      // Find pivot
      let i = rank;
      while (i < m && Math.abs(temp[i][col]) < 1e-10) i++;
      
      if (i === m) continue;
      
      [temp[rank], temp[i]] = [temp[i], temp[rank]];
      
      // Eliminate
      for (let j = rank + 1; j < m; j++) {
        const factor = temp[j][col] / temp[rank][col];
        for (let k = col; k < n; k++) {
          temp[j][k] -= factor * temp[rank][k];
        }
      }
      rank++;
    }

    return rank;
  };

  const calculateTrace = (matrix: Matrix): number => {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate trace');
    }
    return matrix.reduce((sum, row, i) => sum + row[i], 0);
  };

  const powerMatrix = (matrix: Matrix, power: number): Matrix => {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate power');
    }
    if (power < 0) {
      throw new Error('Power must be non-negative');
    }
    if (power === 0) {
      // Return identity matrix
      const n = matrix.length;
      return Array(n).fill(0).map((_, i) => 
        Array(n).fill(0).map((_, j) => i === j ? 1 : 0)
      );
    }
    if (power === 1) {
      return matrix.map(row => [...row]);
    }
    
    // Repeated multiplication
    let result = matrix.map(row => [...row]);
    for (let i = 1; i < power; i++) {
      result = multiplyMatrices(result, matrix);
    }
    return result;
  };

  const swapMatrices = () => {
    // Swap dimensions
    const tempRows = rows1;
    const tempCols = cols1;
    setRows1(rows2);
    setCols1(cols2);
    setRows2(tempRows);
    setCols2(tempCols);
    
    // Swap matrices
    const tempMatrix = matrix1.map(row => [...row]);
    setMatrix1(matrix2.map(row => [...row]));
    setMatrix2(tempMatrix);
  };

  // Operation handlers
  const handleOperation = (operation: string) => {
    setError('');
    try {
      let operationResult: MatrixResult;

      switch (operation) {
        case 'add':
          operationResult = {
            operation: 'Addition (A + B)',
            result: addMatrices(matrix1, matrix2),
          };
          break;

        case 'subtract':
          operationResult = {
            operation: 'Subtraction (A - B)',
            result: subtractMatrices(matrix1, matrix2),
          };
          break;

        case 'multiply':
          operationResult = {
            operation: 'Multiplication (A × B)',
            result: multiplyMatrices(matrix1, matrix2),
          };
          break;

        case 'transpose1':
          operationResult = {
            operation: 'Transpose of Matrix A',
            result: transposeMatrix(matrix1),
          };
          break;

        case 'transpose2':
          operationResult = {
            operation: 'Transpose of Matrix B',
            result: transposeMatrix(matrix2),
          };
          break;

        case 'determinant1':
          operationResult = {
            operation: 'Determinant of Matrix A',
            result: null,
            determinant: calculateDeterminant(matrix1),
          };
          break;

        case 'determinant2':
          operationResult = {
            operation: 'Determinant of Matrix B',
            result: null,
            determinant: calculateDeterminant(matrix2),
          };
          break;

        case 'inverse1':
          operationResult = {
            operation: 'Inverse of Matrix A',
            result: calculateInverse(matrix1),
          };
          break;

        case 'inverse2':
          operationResult = {
            operation: 'Inverse of Matrix B',
            result: calculateInverse(matrix2),
          };
          break;

        case 'rank1':
          operationResult = {
            operation: 'Rank of Matrix A',
            result: null,
            rank: calculateRank(matrix1),
          };
          break;

        case 'rank2':
          operationResult = {
            operation: 'Rank of Matrix B',
            result: null,
            rank: calculateRank(matrix2),
          };
          break;

        case 'trace1':
          operationResult = {
            operation: 'Trace of Matrix A',
            result: null,
            trace: calculateTrace(matrix1),
          };
          break;

        case 'trace2':
          operationResult = {
            operation: 'Trace of Matrix B',
            result: null,
            trace: calculateTrace(matrix2),
          };
          break;

        case 'power1':
          operationResult = {
            operation: `Matrix A to the power of ${power1}`,
            result: powerMatrix(matrix1, power1),
          };
          break;

        case 'power2':
          operationResult = {
            operation: `Matrix B to the power of ${power2}`,
            result: powerMatrix(matrix2, power2),
          };
          break;

        default:
          throw new Error('Unknown operation');
      }

      setResult(operationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // Quick preset matrices
  const setIdentityMatrix = (matrixNum: 1 | 2) => {
    const size = matrixNum === 1 ? rows1 : rows2;
    const identity = Array(size).fill(0).map((_, i) => 
      Array(size).fill(0).map((_, j) => i === j ? 1 : 0)
    );
    if (matrixNum === 1) {
      updateMatrix1Size(size, size);
      setMatrix1(identity);
    } else {
      updateMatrix2Size(size, size);
      setMatrix2(identity);
    }
  };

  const setZeroMatrix = (matrixNum: 1 | 2) => {
    const rows = matrixNum === 1 ? rows1 : rows2;
    const cols = matrixNum === 1 ? cols1 : cols2;
    const zero = Array(rows).fill(0).map(() => Array(cols).fill(0));
    if (matrixNum === 1) {
      setMatrix1(zero);
    } else {
      setMatrix2(zero);
    }
  };

  const randomMatrix = (matrixNum: 1 | 2) => {
    const rows = matrixNum === 1 ? rows1 : rows2;
    const cols = matrixNum === 1 ? cols1 : cols2;
    const random = Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => Math.floor(Math.random() * 20) - 10)
    );
    if (matrixNum === 1) {
      setMatrix1(random);
    } else {
      setMatrix2(random);
    }
  };

  // Render matrix
  const renderMatrix = (matrix: Matrix, title: string, withBrackets: boolean = true) => {
    const maxRows = Math.min(matrix.length, 10);
    const maxCols = Math.min(matrix[0]?.length || 0, 10);
    
    return (
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">{title}</p>
        <div className="inline-flex items-center">
          {withBrackets && <span className="text-4xl text-gray-400 mr-1">[</span>}
          <div className="grid gap-2" style={{ 
            gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${maxRows}, minmax(0, 1fr))`
          }}>
            {matrix.slice(0, maxRows).map((row, i) => 
              row.slice(0, maxCols).map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`flex items-center justify-center px-3 py-2 rounded border ${
                    val > 0 ? 'bg-blue-50 border-blue-200 text-blue-900' :
                    val < 0 ? 'bg-red-50 border-red-200 text-red-900' :
                    'bg-gray-50 border-gray-200 text-gray-600'
                  } font-mono text-sm font-semibold`}
                >
                  {val.toFixed(2)}
                </div>
              ))
            )}
          </div>
          {withBrackets && <span className="text-4xl text-gray-400 ml-1">]</span>}
        </div>
        {(matrix.length > 10 || matrix[0]?.length > 10) && (
          <p className="text-xs text-gray-500 mt-2">Showing first 10×10 elements</p>
        )}
      </div>
    );
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `matrix-calculation-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
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
            <head><title>Matrix Calculation Results</title>
              <style>body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print { body { padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imgData}" onload="window.print();"/></body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-6">
        {/* Matrix Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Matrix A */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Matrix A</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="text-xs font-semibold text-gray-700">Rows</Label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rows1}
                      onChange={(e) => updateMatrix1Size(parseInt(e.target.value) || 1, cols1)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-medium"
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => rows1 < 10 && updateMatrix1Size(rows1 + 1, cols1)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronUp className="h-3 w-3 text-gray-600" />
                      </button>
                      <button
                        onClick={() => rows1 > 1 && updateMatrix1Size(rows1 - 1, cols1)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronDown className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Label className="text-xs font-semibold text-gray-700">Columns</Label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={cols1}
                      onChange={(e) => updateMatrix1Size(rows1, parseInt(e.target.value) || 1)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-medium"
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => cols1 < 10 && updateMatrix1Size(rows1, cols1 + 1)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronUp className="h-3 w-3 text-gray-600" />
                      </button>
                      <button
                        onClick={() => cols1 > 1 && updateMatrix1Size(rows1, cols1 - 1)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronDown className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="inline-block">
                  {matrix1.map((row, i) => (
                    <div key={i} className="flex gap-1 mb-1">
                      {row.map((val, j) => (
                        <input
                          key={j}
                          type="number"
                          value={val}
                          onChange={(e) => updateMatrixValue(1, i, j, e.target.value)}
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                          step="0.1"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setZeroMatrix(1)} variant="outline" size="sm" className="text-xs">Clear</Button>
                  <Button onClick={() => setZeroMatrix(1)} variant="outline" size="sm" className="text-xs">All 0</Button>
                  <Button onClick={() => setIdentityMatrix(1)} variant="outline" size="sm" className="text-xs">All 1</Button>
                  <Button onClick={() => randomMatrix(1)} variant="outline" size="sm" className="text-xs">Random</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button onClick={() => handleOperation('transpose1')} variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" /> Transpose
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button onClick={() => handleOperation('power1')} variant="outline" size="sm" className="text-xs">
                      Power of
                    </Button>
                    <input
                      type="number"
                      value={power1}
                      onChange={(e) => setPower1(parseInt(e.target.value) || 2)}
                      className="w-12 px-1 py-1 border rounded text-xs text-center"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleOperation('determinant1')} variant="outline" size="sm" className="text-xs">
                    Determinant
                  </Button>
                  <Button onClick={() => handleOperation('inverse1')} variant="outline" size="sm" className="text-xs">
                    Inverse
                  </Button>
                  <Button onClick={() => handleOperation('rank1')} variant="outline" size="sm" className="text-xs">
                    Rank
                  </Button>
                  <Button onClick={() => handleOperation('trace1')} variant="outline" size="sm" className="text-xs">
                    Trace
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matrix B */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Matrix B</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="text-xs font-semibold text-gray-700">Rows</Label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rows2}
                      onChange={(e) => updateMatrix2Size(parseInt(e.target.value) || 1, cols2)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-medium"
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => rows2 < 10 && updateMatrix2Size(rows2 + 1, cols2)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronUp className="h-3 w-3 text-gray-600" />
                      </button>
                      <button
                        onClick={() => rows2 > 1 && updateMatrix2Size(rows2 - 1, cols2)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronDown className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Label className="text-xs font-semibold text-gray-700">Columns</Label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={cols2}
                      onChange={(e) => updateMatrix2Size(rows2, parseInt(e.target.value) || 1)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-medium"
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => cols2 < 10 && updateMatrix2Size(rows2, cols2 + 1)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronUp className="h-3 w-3 text-gray-600" />
                      </button>
                      <button
                        onClick={() => cols2 > 1 && updateMatrix2Size(rows2, cols2 - 1)}
                        className="p-0.5 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        <ChevronDown className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="inline-block">
                  {matrix2.map((row, i) => (
                    <div key={i} className="flex gap-1 mb-1">
                      {row.map((val, j) => (
                        <input
                          key={j}
                          type="number"
                          value={val}
                          onChange={(e) => updateMatrixValue(2, i, j, e.target.value)}
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                          step="0.1"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setZeroMatrix(2)} variant="outline" size="sm" className="text-xs">Clear</Button>
                  <Button onClick={() => setZeroMatrix(2)} variant="outline" size="sm" className="text-xs">All 0</Button>
                  <Button onClick={() => setIdentityMatrix(2)} variant="outline" size="sm" className="text-xs">All 1</Button>
                  <Button onClick={() => randomMatrix(2)} variant="outline" size="sm" className="text-xs">Random</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button onClick={() => handleOperation('transpose2')} variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" /> Transpose
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button onClick={() => handleOperation('power2')} variant="outline" size="sm" className="text-xs">
                      Power of
                    </Button>
                    <input
                      type="number"
                      value={power2}
                      onChange={(e) => setPower2(parseInt(e.target.value) || 2)}
                      className="w-12 px-1 py-1 border rounded text-xs text-center"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleOperation('determinant2')} variant="outline" size="sm" className="text-xs">
                    Determinant
                  </Button>
                  <Button onClick={() => handleOperation('inverse2')} variant="outline" size="sm" className="text-xs">
                    Inverse
                  </Button>
                  <Button onClick={() => handleOperation('rank2')} variant="outline" size="sm" className="text-xs">
                    Rank
                  </Button>
                  <Button onClick={() => handleOperation('trace2')} variant="outline" size="sm" className="text-xs">
                    Trace
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Binary Operations */}
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg text-gray-900">Matrix Operations</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {error && (
              <div className="flex items-start gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-center">
              <Button onClick={() => handleOperation('add')} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                <Plus className="h-4 w-4 mr-1" /> A + B
              </Button>
              <Button onClick={() => handleOperation('subtract')} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                <Minus className="h-4 w-4 mr-1" /> A - B
              </Button>
              <Button onClick={() => handleOperation('multiply')} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                <X className="h-4 w-4 mr-1" /> A × B
              </Button>
              <Button onClick={swapMatrices} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold">
                <ArrowLeftRight className="h-4 w-4 mr-1" /> A ↔ B
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div ref={resultRef}>
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg text-gray-900">
                  Result: {result.operation}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result.result && renderMatrix(result.result as Matrix, 'Result Matrix')}
                
                {result.determinant !== undefined && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">Determinant:</p>
                    <p className="text-3xl font-bold text-blue-900">{result.determinant.toFixed(6)}</p>
                  </div>
                )}

                {result.rank !== undefined && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">Rank:</p>
                    <p className="text-3xl font-bold text-gray-900">{result.rank}</p>
                  </div>
                )}

                {result.trace !== undefined && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">Trace (sum of diagonal elements):</p>
                    <p className="text-3xl font-bold text-blue-900">{result.trace.toFixed(6)}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <Button onClick={handleSaveAsImage} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Save Image
              </Button>
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Matrix Calculator"
      />
    </div>
  );
}

