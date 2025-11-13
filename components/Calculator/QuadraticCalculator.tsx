'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, Sigma, Square, Share2 } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface QuadraticInputs {
  a: string;
  b: string;
  c: string;
}

interface QuadraticResult {
  discriminant: number; // b^2 - 4ac
  hasRealRoots: boolean;
  root1: string; // keep as string to support complex roots nicely
  root2: string;
  steps: string[];
  // Enhanced properties
  vertex: { x: number; y: number };
  axisOfSymmetry: number;
  opensUpward: boolean;
  yIntercept: number;
  factorizedForm?: string;
  vertexForm: string;
  minOrMax: 'minimum' | 'maximum';
  domainRange: {
    domain: string;
    range: string;
  };
}

function formatNumber(n: number, digits = 6): string {
  const v = Number.isFinite(n) ? n : 0;
  const s = v.toFixed(digits);
  // trim trailing zeros
  return s.replace(/\.0+$/, '').replace(/(\.[0-9]*?)0+$/, '$1');
}

export function QuadraticCalculator() {
  const [inputs, setInputs] = useState<QuadraticInputs>({ a: '1', b: '0', c: '0' });
  const [result, setResult] = useState<QuadraticResult | null>(null);

  // Smart examples with real-world applications
  const smartExamples = [
    {
      name: "Simple Parabola",
      description: "Basic quadratic with two real roots",
      coefficients: { a: '1', b: '0', c: '-4' },
      application: "Opens upward, crosses x-axis at ±2"
    },
    {
      name: "Projectile Motion",
      description: "Height of thrown ball: h = -16t² + 64t + 80",
      coefficients: { a: '-16', b: '64', c: '80' },
      application: "When does the ball hit the ground? (h = 0)"
    },
    {
      name: "Profit Optimization",
      description: "Profit function: P = -2x² + 100x - 800",
      coefficients: { a: '-2', b: '100', c: '-800' },
      application: "Find break-even points and maximum profit"
    },
    {
      name: "Perfect Square",
      description: "Discriminant = 0, one repeated root",
      coefficients: { a: '1', b: '-6', c: '9' },
      application: "Factorizes as (x - 3)²"
    },
    {
      name: "Complex Roots",
      description: "No real solutions, discriminant < 0",
      coefficients: { a: '1', b: '2', c: '5' },
      application: "Parabola doesn't cross x-axis"
    },
    {
      name: "Area Problem",
      description: "Rectangle area: A = x(20-x) = -x² + 20x",
      coefficients: { a: '-1', b: '20', c: '0' },
      application: "Find dimensions for maximum area"
    }
  ];

  const parse = (v: string): number | null => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  const compute = useMemo(() => {
    const a = parse(inputs.a);
    const b = parse(inputs.b);
    const c = parse(inputs.c);

    if (a === null || b === null || c === null || a === 0) return null;

    const D = b * b - 4 * a * c;
    const steps: string[] = [];
    steps.push(`Discriminant D = b^2 - 4ac = (${b})^2 - 4*${a}*${c} = ${formatNumber(D)}`);

    // Calculate vertex, axis of symmetry, and other properties
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    const vertex = { x: vertexX, y: vertexY };
    const axisOfSymmetry = vertexX;
    const opensUpward = a > 0;
    const yIntercept = c;
    const minOrMax = opensUpward ? 'minimum' : 'maximum';
    
    // Vertex form: a(x - h)² + k where (h,k) is vertex
    const h = vertexX;
    const k = vertexY;
    const vertexForm = `${formatNumber(a)}(x ${h >= 0 ? '-' : '+'} ${formatNumber(Math.abs(h))})² ${k >= 0 ? '+' : '-'} ${formatNumber(Math.abs(k))}`;
    
    // Domain and range
    const domain = "All real numbers (-∞, +∞)";
    const range = opensUpward 
      ? `[${formatNumber(vertexY)}, +∞)` 
      : `(-∞, ${formatNumber(vertexY)}]`;

    if (D > 0) {
      const sqrtD = Math.sqrt(D);
      const r1 = (-b + sqrtD) / (2 * a);
      const r2 = (-b - sqrtD) / (2 * a);
      steps.push(`Since D > 0, two distinct real roots:`);
      steps.push(`x₁ = (-b + √D) / (2a) = (${formatNumber(-b)} + ${formatNumber(sqrtD)}) / ${formatNumber(2 * a)} = ${formatNumber(r1)}`);
      steps.push(`x₂ = (-b - √D) / (2a) = (${formatNumber(-b)} - ${formatNumber(sqrtD)}) / ${formatNumber(2 * a)} = ${formatNumber(r2)}`);
      
      // Factorized form when we have real roots
      const factorizedForm = `${formatNumber(a)}(x - ${formatNumber(r1)})(x - ${formatNumber(r2)})`;
      
      return {
        discriminant: D,
        hasRealRoots: true,
        root1: formatNumber(r1),
        root2: formatNumber(r2),
        steps,
        vertex,
        axisOfSymmetry,
        opensUpward,
        yIntercept,
        factorizedForm,
        vertexForm,
        minOrMax,
        domainRange: { domain, range },
      } as QuadraticResult;
    }

    if (D === 0) {
      const r = -b / (2 * a);
      steps.push(`Since D = 0, one repeated real root:`);
      steps.push(`x = -b / (2a) = ${formatNumber(-b)} / ${formatNumber(2 * a)} = ${formatNumber(r)}`);
      
      // Factorized form for repeated root
      const factorizedForm = `${formatNumber(a)}(x - ${formatNumber(r)})²`;
      
      return {
        discriminant: D,
        hasRealRoots: true,
        root1: formatNumber(r),
        root2: formatNumber(r),
        steps,
        vertex,
        axisOfSymmetry,
        opensUpward,
        yIntercept,
        factorizedForm,
        vertexForm,
        minOrMax,
        domainRange: { domain, range },
      } as QuadraticResult;
    }

    // Complex roots
    const sqrtAbs = Math.sqrt(Math.abs(D));
    const real = -b / (2 * a);
    const imag = sqrtAbs / (2 * a);
    const root1 = `${formatNumber(real)} + ${formatNumber(imag)}i`;
    const root2 = `${formatNumber(real)} - ${formatNumber(imag)}i`;
    steps.push(`Since D < 0, two complex conjugate roots:`);
    steps.push(`x = (-b ± i√|D|) / (2a) with |D| = ${formatNumber(Math.abs(D))}`);
    steps.push(`x₁ = ${root1}`);
    steps.push(`x₂ = ${root2}`);

    return {
      discriminant: D,
      hasRealRoots: false,
      root1,
      root2,
      steps,
      vertex,
      axisOfSymmetry,
      opensUpward,
      yIntercept,
      vertexForm,
      minOrMax,
      domainRange: { domain, range },
    } as QuadraticResult;
  }, [inputs]);

  useEffect(() => {
    setResult(compute);
  }, [compute]);

  const update = (field: keyof QuadraticInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const clear = () => setInputs({ a: '', b: '', c: '' });

  const loadExample = (example: typeof smartExamples[0]) => {
    setInputs(example.coefficients);
  };

  // 分享
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/quadratic-formula-calculator',
    getShareParams: () => ({ a: inputs.a, b: inputs.b, c: inputs.c }),
    getShareText: () => (
      result
        ? `Quadratic: ${inputs.a}x^2 + ${inputs.b}x + ${inputs.c} = 0 | Roots: ${result.root1}, ${result.root2}`
        : 'Check out my quadratic equation result!'
    ),
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Quadratic Formula Calculator (ax² + bx + c = 0)
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">a</label>
            <input value={inputs.a} onChange={update('a')} type="number" step="any" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <p className="text-xs text-gray-500 mt-1">a ≠ 0</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">b</label>
            <input value={inputs.b} onChange={update('b')} type="number" step="any" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">c</label>
            <input value={inputs.c} onChange={update('c')} type="number" step="any" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={clear} className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">Clear</button>
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sigma className="w-5 h-5 text-green-600" /> Results
          </h4>
          {/* Main Results */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-700 font-medium mb-1">Discriminant (D)</div>
              <div className="text-2xl font-bold text-blue-900">{formatNumber(result.discriminant)}</div>
              <div className="text-xs text-blue-600 mt-1">
                {result.discriminant > 0 ? '2 real roots' : result.discriminant === 0 ? '1 repeated root' : '2 complex roots'}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-700 font-medium mb-1">Root 1 (x₁)</div>
              <div className="text-xl font-bold text-green-900 break-all">{result.root1}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-700 font-medium mb-1">Root 2 (x₂)</div>
              <div className="text-xl font-bold text-purple-900 break-all">{result.root2}</div>
            </div>
          </div>

          {/* Parabola Properties */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">📊 Parabola Properties</h5>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                <div className="text-sm text-teal-700 font-medium mb-1">Vertex</div>
                <div className="text-lg font-bold text-teal-900">
                  ({formatNumber(result.vertex.x)}, {formatNumber(result.vertex.y)})
                </div>
                <div className="text-xs text-teal-600">{result.minOrMax} point</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                <div className="text-sm text-indigo-700 font-medium mb-1">Axis of Symmetry</div>
                <div className="text-lg font-bold text-indigo-900">x = {formatNumber(result.axisOfSymmetry)}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                <div className="text-sm text-pink-700 font-medium mb-1">Opens</div>
                <div className="text-lg font-bold text-pink-900">{result.opensUpward ? '↑ Upward' : '↓ Downward'}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                <div className="text-sm text-amber-700 font-medium mb-1">Y-Intercept</div>
                <div className="text-lg font-bold text-amber-900">(0, {formatNumber(result.yIntercept)})</div>
              </div>
            </div>
          </div>

          {/* Different Forms */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">📝 Different Forms</h5>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Standard Form</div>
                <div className="text-lg font-mono text-gray-900">{inputs.a}x² + {inputs.b}x + {inputs.c} = 0</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Vertex Form</div>
                <div className="text-lg font-mono text-gray-900">{result.vertexForm} = 0</div>
              </div>
              {result.factorizedForm && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Factorized Form</div>
                  <div className="text-lg font-mono text-gray-900">{result.factorizedForm} = 0</div>
                </div>
              )}
            </div>
          </div>

          {/* Domain and Range */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">🎯 Domain & Range</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                <div className="text-sm text-cyan-700 font-medium mb-1">Domain</div>
                <div className="text-lg font-bold text-cyan-900">{result.domainRange.domain}</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
                <div className="text-sm text-emerald-700 font-medium mb-1">Range</div>
                <div className="text-lg font-bold text-emerald-900">{result.domainRange.range}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Square className="w-4 h-4 text-gray-700" /> Calculation Steps
            </h5>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              {result.steps.map((s, i) => (
                <li key={i} className="font-mono">{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Smart Examples - Positioned after results */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🎯 Try These Examples & Applications
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Click any example below to automatically load the coefficients and see real-world applications of quadratic equations.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {smartExamples.map((example, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer" 
              onClick={() => loadExample(example)}
            >
              <div className="font-semibold text-blue-900 mb-1">{example.name}</div>
              <div className="text-sm text-blue-700 mb-2">{example.description}</div>
              <div className="text-xs text-blue-600 font-mono mb-2 bg-white px-2 py-1 rounded">
                {example.coefficients.a}x² + {example.coefficients.b}x + {example.coefficients.c} = 0
              </div>
              <div className="text-xs text-blue-600">{example.application}</div>
            </div>
          ))}
        </div>
      </div>

      <ShareModal isOpen={showShareModal} onClose={closeShareModal} shareUrl={shareUrl} shareText={shareText} calculatorName="Quadratic Formula Calculator" />
    </div>
  );
}
