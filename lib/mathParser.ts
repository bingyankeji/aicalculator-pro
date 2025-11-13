// Mathematical expression parser and evaluator for graphing calculator

export class MathParser {
  private static readonly CONSTANTS: Record<string, number> = {
    pi: Math.PI,
    e: Math.E,
    π: Math.PI,
  };

  private static readonly FUNCTIONS: Record<string, (x: number) => number> = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    log: Math.log10,
    ln: Math.log,
    log10: Math.log10,
    log2: Math.log2,
    exp: Math.exp,
    sqrt: Math.sqrt,
    abs: Math.abs,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    sign: Math.sign,
  };

  /**
   * Parse and evaluate a mathematical expression
   */
  static evaluate(expression: string, x: number): number {
    try {
      // Clean and normalize the expression
      let expr = this.normalizeExpression(expression, x);
      
      // Handle special cases
      if (expr === '' || expr === 'x') return x;
      
      // Replace constants
      Object.entries(this.CONSTANTS).forEach(([name, value]) => {
        const regex = new RegExp(`\\b${name}\\b`, 'g');
        expr = expr.replace(regex, value.toString());
      });

      // Replace functions
      Object.entries(this.FUNCTIONS).forEach(([name, func]) => {
        const regex = new RegExp(`${name}\\(([^)]+)\\)`, 'g');
        expr = expr.replace(regex, (match, arg) => {
          const argValue = this.evaluateExpression(arg);
          return func(argValue).toString();
        });
      });

      // Evaluate the final expression
      return this.evaluateExpression(expr);
    } catch (error) {
      return NaN;
    }
  }

  /**
   * Normalize expression by replacing x with actual value and handling implicit multiplication
   */
  private static normalizeExpression(expression: string, x: number): string {
    let expr = expression.toLowerCase().trim();
    
    // Replace x with the actual value
    expr = expr.replace(/\bx\b/g, `(${x})`);
    
    // Handle implicit multiplication
    expr = expr.replace(/(\d+)(\()/g, '$1*$2'); // 2(x) -> 2*(x)
    expr = expr.replace(/(\))(\d+)/g, '$1*$2'); // (x)2 -> (x)*2
    expr = expr.replace(/(\))(\()/g, '$1*$2');  // (x)(y) -> (x)*(y)
    
    // Handle power notation
    expr = expr.replace(/\^/g, '**'); // x^2 -> x**2
    
    // Handle common mathematical notations
    expr = expr.replace(/(\d+)([a-z])/g, '$1*$2'); // 2x -> 2*x
    
    return expr;
  }

  /**
   * Safely evaluate a mathematical expression
   */
  private static evaluateExpression(expr: string): number {
    try {
      // Security: Only allow safe mathematical operations
      const safeExpr = expr.replace(/[^0-9+\-*/.() ]/g, '');
      
      // Use Function constructor for safe evaluation
      return new Function('return ' + safeExpr)();
    } catch {
      return NaN;
    }
  }

  /**
   * Check if an expression is valid
   */
  static isValidExpression(expression: string): boolean {
    try {
      // Test with a sample x value
      const result = this.evaluate(expression, 1);
      return !isNaN(result) && isFinite(result);
    } catch {
      return false;
    }
  }

  /**
   * Get function domain restrictions
   */
  static getDomainRestrictions(expression: string): { min?: number; max?: number; excludes?: number[] } {
    const expr = expression.toLowerCase();
    const restrictions: { min?: number; max?: number; excludes?: number[] } = {};

    // Square root domain: x >= 0
    if (expr.includes('sqrt(x)') || expr.includes('√(x)')) {
      restrictions.min = 0;
    }

    // Logarithm domain: x > 0
    if (expr.includes('log(x)') || expr.includes('ln(x)')) {
      restrictions.min = 0.0001; // Avoid x = 0
    }

    // Division by x: exclude x = 0
    if (expr.includes('/x') || expr.includes('1/x')) {
      restrictions.excludes = [0];
    }

    // Tangent: exclude odd multiples of π/2
    if (expr.includes('tan(x)')) {
      const excludes = [];
      for (let i = -10; i <= 10; i++) {
        if (i % 2 !== 0) {
          excludes.push((i * Math.PI) / 2);
        }
      }
      restrictions.excludes = excludes;
    }

    return restrictions;
  }

  /**
   * Find critical points (approximate)
   */
  static findCriticalPoints(expression: string, xMin: number, xMax: number): Array<{x: number, y: number, type: 'max' | 'min'}> {
    const points: Array<{x: number, y: number, type: 'max' | 'min'}> = [];
    const step = (xMax - xMin) / 1000;
    
    for (let x = xMin + step; x < xMax - step; x += step) {
      const y1 = this.evaluate(expression, x - step);
      const y2 = this.evaluate(expression, x);
      const y3 = this.evaluate(expression, x + step);
      
      if (!isNaN(y1) && !isNaN(y2) && !isNaN(y3)) {
        // Local maximum
        if (y2 > y1 && y2 > y3) {
          points.push({ x, y: y2, type: 'max' });
        }
        // Local minimum
        else if (y2 < y1 && y2 < y3) {
          points.push({ x, y: y2, type: 'min' });
        }
      }
    }
    
    return points;
  }

  /**
   * Find x-intercepts (zeros)
   */
  static findXIntercepts(expression: string, xMin: number, xMax: number): Array<{x: number, y: number}> {
    const intercepts: Array<{x: number, y: number}> = [];
    const step = (xMax - xMin) / 1000;
    
    for (let x = xMin; x < xMax - step; x += step) {
      const y1 = this.evaluate(expression, x);
      const y2 = this.evaluate(expression, x + step);
      
      if (!isNaN(y1) && !isNaN(y2)) {
        // Sign change indicates zero crossing
        if ((y1 > 0 && y2 < 0) || (y1 < 0 && y2 > 0)) {
          // Use bisection method for more accurate zero
          const zero = this.bisectionMethod(expression, x, x + step);
          if (zero !== null) {
            intercepts.push({ x: zero, y: 0 });
          }
        }
      }
    }
    
    return intercepts;
  }

  /**
   * Find y-intercept
   */
  static findYIntercept(expression: string): {x: number, y: number} | null {
    const y = this.evaluate(expression, 0);
    return !isNaN(y) && isFinite(y) ? { x: 0, y } : null;
  }

  /**
   * Bisection method for finding zeros
   */
  private static bisectionMethod(expression: string, a: number, b: number, tolerance = 1e-6): number | null {
    let fa = this.evaluate(expression, a);
    let fb = this.evaluate(expression, b);
    
    if (fa * fb > 0) return null; // No zero in interval
    
    for (let i = 0; i < 50; i++) {
      const c = (a + b) / 2;
      const fc = this.evaluate(expression, c);
      
      if (Math.abs(fc) < tolerance || (b - a) / 2 < tolerance) {
        return c;
      }
      
      if (fa * fc < 0) {
        b = c;
        fb = fc;
      } else {
        a = c;
        fa = fc;
      }
    }
    
    return (a + b) / 2;
  }

  /**
   * Generate function points for plotting
   */
  static generatePoints(expression: string, xMin: number, xMax: number, numPoints = 1000): Array<{x: number, y: number}> {
    const points: Array<{x: number, y: number}> = [];
    const step = (xMax - xMin) / numPoints;
    
    for (let x = xMin; x <= xMax; x += step) {
      const y = this.evaluate(expression, x);
      if (!isNaN(y) && isFinite(y)) {
        points.push({ x, y });
      }
    }
    
    return points;
  }
}
