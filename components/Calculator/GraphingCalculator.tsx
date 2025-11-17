'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Save, Printer, RotateCcw, ZoomIn, ZoomOut, Move, Target } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { MathParser } from '@/lib/mathParser';
import html2canvas from 'html2canvas';

// Types for function and graph state
interface FunctionData {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  style: 'solid' | 'dashed' | 'dotted';
}

interface GraphSettings {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  gridSize: number;
  showGrid: boolean;
  showAxes: boolean;
  showLabels: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface AnalysisResult {
  function: string;
  domain: string;
  range: string;
  intercepts: {
    x: Point[];
    y: Point[];
  };
  extrema: {
    maxima: Point[];
    minima: Point[];
  };
  asymptotes: {
    vertical: number[];
    horizontal: number[];
    oblique: string[];
  };
  continuity: string;
  monotonicity: string[];
  concavity: string[];
  recommendations: string[];
}

export function GraphingCalculator() {
  // State management
  const [functions, setFunctions] = useState<FunctionData[]>([
    { id: '1', expression: '', color: '#3b82f6', visible: true, style: 'solid' }
  ]);
  
  const [currentFunction, setCurrentFunction] = useState('');
  const [graphSettings, setGraphSettings] = useState<GraphSettings>({
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
    gridSize: 1,
    showGrid: true,
    showAxes: true,
    showLabels: true,
  });

  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedTool, setSelectedTool] = useState<'pan' | 'zoom' | 'trace' | 'intersect'>('pan');
  const [tracePoint, setTracePoint] = useState<Point | null>(null);
  const [intersectionPoints, setIntersectionPoints] = useState<Point[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Canvas drawing functions
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const { xMin, xMax, yMin, yMax, showGrid, showAxes, showLabels, gridSize } = graphSettings;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Calculate scale factors
    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);

    // Helper functions for coordinate conversion
    const toCanvasX = (x: number) => (x - xMin) * xScale;
    const toCanvasY = (y: number) => height - (y - yMin) * yScale;
    const toMathX = (canvasX: number) => canvasX / xScale + xMin;
    const toMathY = (canvasY: number) => (height - canvasY) / yScale + yMin;

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([]);

      // Vertical grid lines
      for (let x = Math.ceil(xMin / gridSize) * gridSize; x <= xMax; x += gridSize) {
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = Math.ceil(yMin / gridSize) * gridSize; y <= yMax; y += gridSize) {
        const canvasY = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
      }
    }

    // Draw axes
    if (showAxes) {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);

      // X-axis
      if (yMin <= 0 && yMax >= 0) {
        const y0 = toCanvasY(0);
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(width, y0);
        ctx.stroke();

        // X-axis arrow
        ctx.beginPath();
        ctx.moveTo(width - 10, y0 - 5);
        ctx.lineTo(width, y0);
        ctx.lineTo(width - 10, y0 + 5);
        ctx.stroke();
      }

      // Y-axis
      if (xMin <= 0 && xMax >= 0) {
        const x0 = toCanvasX(0);
        ctx.beginPath();
        ctx.moveTo(x0, 0);
        ctx.lineTo(x0, height);
        ctx.stroke();

        // Y-axis arrow
        ctx.beginPath();
        ctx.moveTo(x0 - 5, 10);
        ctx.lineTo(x0, 0);
        ctx.lineTo(x0 + 5, 10);
        ctx.stroke();
      }
    }

    // Draw axis labels
    if (showLabels && showAxes) {
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // X-axis labels
      if (yMin <= 0 && yMax >= 0) {
        const y0 = toCanvasY(0);
        for (let x = Math.ceil(xMin / gridSize) * gridSize; x <= xMax; x += gridSize) {
          if (Math.abs(x) > 0.001) { // Skip zero
            const canvasX = toCanvasX(x);
            ctx.fillText(x.toFixed(1), canvasX, y0 + 15);
          }
        }
      }

      // Y-axis labels
      if (xMin <= 0 && xMax >= 0) {
        const x0 = toCanvasX(0);
        ctx.textAlign = 'right';
        for (let y = Math.ceil(yMin / gridSize) * gridSize; y <= yMax; y += gridSize) {
          if (Math.abs(y) > 0.001) { // Skip zero
            const canvasY = toCanvasY(y);
            ctx.fillText(y.toFixed(1), x0 - 5, canvasY);
          }
        }
      }
    }

    // Draw functions
    functions.forEach((func) => {
      if (!func.visible || !func.expression.trim()) return;

      try {
        const points = MathParser.generatePoints(func.expression, xMin, xMax, 2000);
        if (points.length === 0) return;

        ctx.strokeStyle = func.color;
        ctx.lineWidth = 2;
        
        // Set line style
        switch (func.style) {
          case 'dashed':
            ctx.setLineDash([5, 5]);
            break;
          case 'dotted':
            ctx.setLineDash([2, 3]);
            break;
          default:
            ctx.setLineDash([]);
        }

        ctx.beginPath();
        let pathStarted = false;

        for (let i = 0; i < points.length; i++) {
          const { x, y } = points[i];
          const canvasX = toCanvasX(x);
          const canvasY = toCanvasY(y);

          // Check if point is within canvas bounds (with some margin for smooth curves)
          if (canvasY >= -100 && canvasY <= height + 100) {
            if (!pathStarted) {
              ctx.moveTo(canvasX, canvasY);
              pathStarted = true;
            } else {
              // Check for discontinuities (large jumps in y values)
              const prevPoint = points[i - 1];
              if (prevPoint && Math.abs(y - prevPoint.y) > (yMax - yMin) * 0.1) {
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(canvasX, canvasY);
              } else {
                ctx.lineTo(canvasX, canvasY);
              }
            }
          } else if (pathStarted) {
            // End current path if point is out of bounds
            ctx.stroke();
            ctx.beginPath();
            pathStarted = false;
          }
        }

        if (pathStarted) {
          ctx.stroke();
        }
      } catch (error) {
        console.error('Error drawing function:', func.expression, error);
      }
    });

    // Draw trace point
    if (tracePoint) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(toCanvasX(tracePoint.x), toCanvasY(tracePoint.y), 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw intersection points
    intersectionPoints.forEach(point => {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(toCanvasX(point.x), toCanvasY(point.y), 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  // Effect to redraw graph when settings or functions change
  useEffect(() => {
    drawGraph();
  }, [functions, graphSettings, tracePoint, intersectionPoints]);

  // Canvas mouse event handlers
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    // Convert canvas coordinates to mathematical coordinates
    const { xMin, xMax, yMin, yMax } = graphSettings;
    const mathX = (canvasX / canvas.width) * (xMax - xMin) + xMin;
    const mathY = ((canvas.height - canvasY) / canvas.height) * (yMax - yMin) + yMin;

    if (selectedTool === 'trace') {
      // Find the closest function point for tracing
      let closestPoint: Point | null = null;
      let minDistance = Infinity;

      functions.forEach(func => {
        if (!func.visible || !func.expression.trim()) return;

        try {
          const y = MathParser.evaluate(func.expression, mathX);
          if (!isNaN(y) && isFinite(y)) {
            const distance = Math.abs(y - mathY);
            if (distance < minDistance) {
              minDistance = distance;
              closestPoint = { x: mathX, y };
            }
          }
        } catch (error) {
          // Ignore invalid functions
        }
      });

      if (closestPoint && minDistance < (yMax - yMin) * 0.1) {
        setTracePoint(closestPoint);
      }
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'trace') {
      // Show trace cursor
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = 'crosshair';
      }
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = 'default';
      }
    }
  };

  // Intelligent analysis function
  const analyzeFunction = async (expression: string) => {
    if (!expression.trim()) return;

    setIsCalculating(true);
    setErrorMessage('');

    try {
      const { xMin, xMax, yMin, yMax } = graphSettings;

      // Find critical points
      const criticalPoints = MathParser.findCriticalPoints(expression, xMin, xMax);
      
      // Find intercepts
      const xIntercepts = MathParser.findXIntercepts(expression, xMin, xMax);
      const yIntercept = MathParser.findYIntercept(expression);
      
      // Get domain restrictions
      const domainRestrictions = MathParser.getDomainRestrictions(expression);

      // Generate AI insights based on function type and behavior
      const recommendations = generateAIInsights(expression, criticalPoints, xIntercepts, yIntercept);

      // Determine function properties
      const analysis: AnalysisResult = {
        function: expression,
        domain: getDomainDescription(expression, domainRestrictions),
        range: getRangeDescription(expression, criticalPoints, yMin, yMax),
        intercepts: {
          x: xIntercepts,
          y: yIntercept ? [yIntercept] : [],
        },
        extrema: {
          maxima: criticalPoints.filter(p => p.type === 'max'),
          minima: criticalPoints.filter(p => p.type === 'min'),
        },
        asymptotes: {
          vertical: getVerticalAsymptotes(expression),
          horizontal: getHorizontalAsymptotes(expression),
          oblique: [],
        },
        continuity: getContinuityDescription(expression),
        monotonicity: [],
        concavity: [],
        recommendations,
      };

      setAnalysisResults([analysis]);
    } catch (error) {
      setErrorMessage('Error analyzing function. Please check your expression.');
      console.error('Analysis error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Helper functions for analysis
  const generateAIInsights = (
    expression: string, 
    criticalPoints: Array<{x: number, y: number, type: 'max' | 'min'}>,
    xIntercepts: Array<{x: number, y: number}>,
    yIntercept: {x: number, y: number} | null
  ): string[] => {
    const insights: string[] = [];
    const expr = expression.toLowerCase();

    // Function type identification
    if (expr.includes('x^2') || expr.includes('x**2')) {
      insights.push('This is a quadratic function (parabola). It has a characteristic U-shape or inverted U-shape.');
    } else if (expr.includes('sin(') || expr.includes('cos(')) {
      insights.push('This is a trigonometric function with periodic behavior. It repeats its pattern every 2π units.');
    } else if (expr.includes('log(') || expr.includes('ln(')) {
      insights.push('This is a logarithmic function. It grows slowly and has a vertical asymptote.');
    } else if (expr.includes('e^') || expr.includes('exp(')) {
      insights.push('This is an exponential function. It shows rapid growth or decay.');
    } else if (expr.includes('/x') || expr.includes('1/x')) {
      insights.push('This function has a rational form with potential discontinuities.');
    }

    // Critical points analysis
    if (criticalPoints.length > 0) {
      const maxima = criticalPoints.filter(p => p.type === 'max');
      const minima = criticalPoints.filter(p => p.type === 'min');
      
      if (maxima.length > 0) {
        insights.push(`Found ${maxima.length} local maximum point(s). These represent peaks in the function.`);
      }
      if (minima.length > 0) {
        insights.push(`Found ${minima.length} local minimum point(s). These represent valleys in the function.`);
      }
    } else {
      insights.push('No critical points found in the current viewing window. Try adjusting the range or check if the function is monotonic.');
    }

    // Intercepts analysis
    if (xIntercepts.length > 0) {
      insights.push(`The function crosses the x-axis at ${xIntercepts.length} point(s). These are the roots of the equation f(x) = 0.`);
    } else {
      insights.push('No x-intercepts found in the current range. The function may not cross the x-axis in this window.');
    }

    if (yIntercept) {
      if (Math.abs(yIntercept.y) < 0.001) {
        insights.push('The function passes through the origin (0,0).');
      } else {
        insights.push(`The y-intercept is at (0, ${yIntercept.y.toFixed(3)}). This is where the function crosses the y-axis.`);
      }
    }

    // Behavior insights
    if (expr.includes('abs(')) {
      insights.push('This function contains absolute value, creating sharp corners or V-shapes in the graph.');
    }

    if (expr.includes('sqrt(')) {
      insights.push('This function contains square root, which is only defined for non-negative values.');
    }

    // Practical applications
    if (expr.includes('x^2')) {
      insights.push('Quadratic functions model many real-world phenomena like projectile motion, profit optimization, and area problems.');
    } else if (expr.includes('sin(') || expr.includes('cos(')) {
      insights.push('Trigonometric functions are essential for modeling waves, oscillations, and circular motion.');
    } else if (expr.includes('e^')) {
      insights.push('Exponential functions model population growth, radioactive decay, and compound interest.');
    }

    return insights;
  };

  const getDomainDescription = (expression: string, restrictions: any): string => {
    const expr = expression.toLowerCase();
    
    if (expr.includes('sqrt(x)')) {
      return 'x ≥ 0 (due to square root)';
    } else if (expr.includes('log(x)') || expr.includes('ln(x)')) {
      return 'x > 0 (due to logarithm)';
    } else if (expr.includes('/x') || expr.includes('1/x')) {
      return 'x ≠ 0 (due to division by x)';
    } else if (expr.includes('tan(x)')) {
      return 'x ≠ π/2 + nπ (due to tangent asymptotes)';
    } else {
      return 'All real numbers (ℝ)';
    }
  };

  const getRangeDescription = (expression: string, criticalPoints: any[], yMin: number, yMax: number): string => {
    const expr = expression.toLowerCase();
    
    if (expr.includes('sin(') || expr.includes('cos(')) {
      return '[-1, 1] (for basic trig functions)';
    } else if (expr.includes('x^2') && !expr.includes('-x^2')) {
      return 'y ≥ 0 (upward parabola)';
    } else if (expr.includes('-x^2')) {
      return 'y ≤ 0 (downward parabola)';
    } else if (expr.includes('e^x')) {
      return 'y > 0 (exponential growth)';
    } else if (expr.includes('log(') || expr.includes('ln(')) {
      return 'All real numbers (ℝ)';
    } else {
      return `Approximately [${yMin.toFixed(1)}, ${yMax.toFixed(1)}] in current view`;
    }
  };

  const getContinuityDescription = (expression: string): string => {
    const expr = expression.toLowerCase();
    
    if (expr.includes('/x') || expr.includes('1/x')) {
      return 'Discontinuous at x = 0';
    } else if (expr.includes('tan(x)')) {
      return 'Discontinuous at x = π/2 + nπ';
    } else if (expr.includes('log(x)') || expr.includes('ln(x)')) {
      return 'Continuous for x > 0';
    } else {
      return 'Continuous everywhere in domain';
    }
  };

  const getVerticalAsymptotes = (expression: string): number[] => {
    const expr = expression.toLowerCase();
    
    if (expr.includes('/x') || expr.includes('1/x')) {
      return [0];
    } else if (expr.includes('tan(x)')) {
      return [-Math.PI/2, Math.PI/2, 3*Math.PI/2];
    }
    
    return [];
  };

  const getHorizontalAsymptotes = (expression: string): number[] => {
    const expr = expression.toLowerCase();
    
    if (expr.includes('1/x')) {
      return [0];
    } else if (expr.includes('e^(-x)')) {
      return [0];
    }
    
    return [];
  };

  // Auto-analyze when function changes
  useEffect(() => {
    const visibleFunctions = functions.filter(f => f.visible && f.expression.trim());
    if (visibleFunctions.length > 0 && visibleFunctions[0].expression !== currentFunction) {
      // Auto-analyze the first visible function
      setTimeout(() => {
        analyzeFunction(visibleFunctions[0].expression);
      }, 500);
    }
  }, [functions]);

  // Available colors for functions
  const functionColors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#f97316', // orange
    '#84cc16', // lime
  ];

  // Load from URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const func = params.get('f');
      const xmin = params.get('xmin');
      const xmax = params.get('xmax');
      const ymin = params.get('ymin');
      const ymax = params.get('ymax');

      if (func) {
        setCurrentFunction(decodeURIComponent(func));
        setFunctions([{ 
          id: '1', 
          expression: decodeURIComponent(func), 
          color: '#3b82f6', 
          visible: true, 
          style: 'solid' 
        }]);
      }

      if (xmin && xmax && ymin && ymax) {
        setGraphSettings(prev => ({
          ...prev,
          xMin: parseFloat(xmin),
          xMax: parseFloat(xmax),
          yMin: parseFloat(ymin),
          yMax: parseFloat(ymax),
        }));
      }
    }
  }, []);

  // Function management
  const addFunction = () => {
    const newId = (functions.length + 1).toString();
    const newColor = functionColors[functions.length % functionColors.length];
    setFunctions([...functions, {
      id: newId,
      expression: '',
      color: newColor,
      visible: true,
      style: 'solid'
    }]);
  };

  const updateFunction = (id: string, updates: Partial<FunctionData>) => {
    setFunctions(functions.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
  };

  const removeFunction = (id: string) => {
    if (functions.length > 1) {
      setFunctions(functions.filter(f => f.id !== id));
    }
  };

  // Graph settings management
  const resetView = () => {
    setGraphSettings({
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10,
      gridSize: 1,
      showGrid: true,
      showAxes: true,
      showLabels: true,
    });
  };

  const zoomIn = () => {
    const { xMin, xMax, yMin, yMax } = graphSettings;
    const xRange = (xMax - xMin) * 0.2;
    const yRange = (yMax - yMin) * 0.2;
    setGraphSettings({
      ...graphSettings,
      xMin: xMin + xRange,
      xMax: xMax - xRange,
      yMin: yMin + yRange,
      yMax: yMax - yRange,
    });
  };

  const zoomOut = () => {
    const { xMin, xMax, yMin, yMax } = graphSettings;
    const xRange = (xMax - xMin) * 0.25;
    const yRange = (yMax - yMin) * 0.25;
    setGraphSettings({
      ...graphSettings,
      xMin: xMin - xRange,
      xMax: xMax + xRange,
      yMin: yMin - yRange,
      yMax: yMax + yRange,
    });
  };

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/graphing-calculator',
    getShareParams: () => {
      const visibleFunctions = functions.filter(f => f.visible && f.expression);
      return {
        f: visibleFunctions.length > 0 ? encodeURIComponent(visibleFunctions[0].expression) : '',
        xmin: graphSettings.xMin.toString(),
        xmax: graphSettings.xMax.toString(),
        ymin: graphSettings.yMin.toString(),
        ymax: graphSettings.yMax.toString(),
      };
    },
    getShareText: () => {
      const visibleFunctions = functions.filter(f => f.visible && f.expression);
      return visibleFunctions.length > 0 
        ? `Check out this graph: f(x) = ${visibleFunctions[0].expression}`
        : 'Create and analyze mathematical graphs with our free graphing calculator!';
    },
  });

  // Export functionality
  const handleSaveImage = async () => {
    if (!containerRef.current) return;
    try {
      const canvas = await html2canvas(containerRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'graph-calculator-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!containerRef.current) return;
    try {
      const canvas = await html2canvas(containerRef.current, {
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
              <title>Graphing Calculator Results</title>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {/* Control Panel - Left Side */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6 sticky top-6">
            {/* Function Management */}
            <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Functions</h3>
                <button
                  onClick={addFunction}
                  className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  + Add
                </button>
              </div>

              {/* Function List */}
              <div className="space-y-3">
                {functions.map((func, index) => (
                  <div key={func.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded border-2"
                        style={{ backgroundColor: func.visible ? func.color : 'transparent', borderColor: func.color }}
                      />
                      <span className="text-sm font-medium">f{index + 1}(x) =</span>
                      <button
                        onClick={() => updateFunction(func.id, { visible: !func.visible })}
                        className={`text-xs px-2 py-1 rounded ${
                          func.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {func.visible ? 'ON' : 'OFF'}
                      </button>
                      {functions.length > 1 && (
                        <button
                          onClick={() => removeFunction(func.id)}
                          className="text-xs text-red-600 hover:text-red-800 ml-auto"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      value={func.expression}
                      onChange={(e) => updateFunction(func.id, { expression: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          // Trigger plot update
                          setCurrentFunction(func.expression);
                        }
                      }}
                      placeholder="e.g., x^2, sin(x), log(x)"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={func.style}
                        onChange={(e) => updateFunction(func.id, { style: e.target.value as 'solid' | 'dashed' | 'dotted' })}
                        className="text-xs border border-gray-300 rounded px-1 py-1"
                      >
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                      </select>
                      
                      <select
                        value={func.color}
                        onChange={(e) => updateFunction(func.id, { color: e.target.value })}
                        className="text-xs border border-gray-300 rounded px-1 py-1"
                      >
                        {functionColors.map(color => (
                          <option key={color} value={color} style={{ backgroundColor: color }}>
                            {color === '#3b82f6' ? 'Blue' : 
                             color === '#ef4444' ? 'Red' : 
                             color === '#10b981' ? 'Green' : 
                             color === '#f59e0b' ? 'Amber' : 
                             color === '#8b5cf6' ? 'Violet' : 
                             color === '#06b6d4' ? 'Cyan' : 
                             color === '#f97316' ? 'Orange' : 'Lime'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Examples */}
              <div className="border-t pt-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">Quick Examples:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {[
                    'x^2',
                    'sin(x)',
                    'cos(x)',
                    'log(x)',
                    'e^x',
                    'abs(x)',
                    'sqrt(x)',
                    '1/x'
                  ].map(example => (
                    <button
                      key={example}
                      onClick={() => {
                        const firstEmpty = functions.find(f => !f.expression);
                        if (firstEmpty) {
                          updateFunction(firstEmpty.id, { expression: example });
                        } else {
                          updateFunction(functions[0].id, { expression: example });
                        }
                      }}
                      className="text-left px-2 py-1 bg-gray-50 hover:bg-gray-100 rounded text-blue-600 hover:text-blue-800"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Graph Tools */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Graph Tools</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={zoomIn}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                  Zoom In
                </button>
                <button
                  onClick={zoomOut}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                  Zoom Out
                </button>
                <button
                  onClick={resetView}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={() => setSelectedTool(selectedTool === 'trace' ? 'pan' : 'trace')}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    selectedTool === 'trace' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Move className="w-4 h-4" />
                  Trace
                </button>
              </div>
            </div>

            {/* Graph Settings */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">View Settings</h3>
              
              {/* Axis Ranges */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">X Min</label>
                  <input
                    type="number"
                    value={graphSettings.xMin}
                    onChange={(e) => setGraphSettings({...graphSettings, xMin: parseFloat(e.target.value) || -10})}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">X Max</label>
                  <input
                    type="number"
                    value={graphSettings.xMax}
                    onChange={(e) => setGraphSettings({...graphSettings, xMax: parseFloat(e.target.value) || 10})}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Y Min</label>
                  <input
                    type="number"
                    value={graphSettings.yMin}
                    onChange={(e) => setGraphSettings({...graphSettings, yMin: parseFloat(e.target.value) || -10})}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Y Max</label>
                  <input
                    type="number"
                    value={graphSettings.yMax}
                    onChange={(e) => setGraphSettings({...graphSettings, yMax: parseFloat(e.target.value) || 10})}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Display Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={graphSettings.showGrid}
                    onChange={(e) => setGraphSettings({...graphSettings, showGrid: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Grid</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={graphSettings.showAxes}
                    onChange={(e) => setGraphSettings({...graphSettings, showAxes: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Axes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={graphSettings.showLabels}
                    onChange={(e) => setGraphSettings({...graphSettings, showLabels: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Labels</span>
                </label>
              </div>

              {/* Grid Size */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Grid Size</label>
                <select
                  value={graphSettings.gridSize}
                  onChange={(e) => setGraphSettings({...graphSettings, gridSize: parseFloat(e.target.value)})}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                >
                  <option value={0.1}>0.1</option>
                  <option value={0.5}>0.5</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Graph
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSaveImage}
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>

        {/* Graph Area - Right Side */}
        <div className="xl:col-span-3 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Graph Viewer */}
          <div ref={containerRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6">
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Graph Viewer</h3>
              <div className="text-xs sm:text-sm text-gray-500">
                Range: [{graphSettings.xMin}, {graphSettings.xMax}] × [{graphSettings.yMin}, {graphSettings.yMax}]
              </div>
            </div>

            {/* Canvas Container */}
            <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto"
                style={{ aspectRatio: '4/3' }}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
              />
              
              {/* Trace Point Display */}
              {tracePoint && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  ({tracePoint.x.toFixed(3)}, {tracePoint.y.toFixed(3)})
                </div>
              )}
            </div>

            {/* Graph Status */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-600">
              <div>
                Functions plotted: {functions.filter(f => f.visible && f.expression).length}
              </div>
              <div>
                Tool: {selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}
              </div>
            </div>
          </div>

          {/* Intelligent Analysis Panel */}
          {analysisResults.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-3 sm:p-4 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <span>🧠</span>
                AI Function Analysis
              </h3>

              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {analysisResults.map((analysis, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 sm:p-4 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      f{index + 1}(x) = {analysis.function}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {/* Mathematical Properties */}
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Domain:</span>
                          <span className="ml-2 text-sm text-gray-600">{analysis.domain}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Range:</span>
                          <span className="ml-2 text-sm text-gray-600">{analysis.range}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Continuity:</span>
                          <span className="ml-2 text-sm text-gray-600">{analysis.continuity}</span>
                        </div>
                      </div>

                      {/* Critical Points */}
                      <div className="space-y-3">
                        {analysis.intercepts.x.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">X-intercepts:</span>
                            <div className="ml-2 text-sm text-gray-600">
                              {analysis.intercepts.x.map((point, i) => (
                                <span key={i} className="inline-block mr-2">
                                  ({point.x.toFixed(3)}, 0)
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {analysis.intercepts.y.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Y-intercept:</span>
                            <span className="ml-2 text-sm text-gray-600">
                              (0, {analysis.intercepts.y[0].y.toFixed(3)})
                            </span>
                          </div>
                        )}

                        {(analysis.extrema.maxima.length > 0 || analysis.extrema.minima.length > 0) && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Extrema:</span>
                            <div className="ml-2 text-sm text-gray-600">
                              {analysis.extrema.maxima.map((point, i) => (
                                <div key={`max-${i}`} className="text-green-600">
                                  Max: ({point.x.toFixed(3)}, {point.y.toFixed(3)})
                                </div>
                              ))}
                              {analysis.extrema.minima.map((point, i) => (
                                <div key={`min-${i}`} className="text-red-600">
                                  Min: ({point.x.toFixed(3)}, {point.y.toFixed(3)})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    {analysis.recommendations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-2">💡 AI Insights:</h5>
                        <div className="space-y-1">
                          {analysis.recommendations.map((rec, i) => (
                            <div key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Analysis Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    const visibleFunctions = functions.filter(f => f.visible && f.expression.trim());
                    if (visibleFunctions.length > 0) {
                      analyzeFunction(visibleFunctions[0].expression);
                    }
                  }}
                  disabled={isCalculating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-sm"
                >
                  {isCalculating ? 'Analyzing...' : 'Refresh Analysis'}
                </button>
                <button
                  onClick={() => setAnalysisResults([])}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Clear Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Graphing Calculator"
      />
    </div>
  );
}
