import * as math from 'mathjs';

export interface Point {
  x: number;
  y: number;
}

export const evaluateFunction = (functionStr: string, x: number): number => {
  try {
    if (!functionStr.trim()) {
      return NaN;
    }
    // Sanitize the input to prevent injection attacks
    const sanitizedFunction = functionStr.replace(/[^x0-9+\-*/^()\s.,]/g, '');
    const scope = { x };
    const result = math.evaluate(sanitizedFunction, scope);
    return typeof result === 'number' ? result : NaN;
  } catch (error) {
    console.error('Error evaluating function:', error);
    return NaN;
  }
};

export const generatePoints = (
  functionStr: string,
  xRange: [number, number],
  numPoints: number = 1000
): Point[] => {
  try {
    if (!functionStr.trim()) {
      return [];
    }
    const [xMin, xMax] = xRange;
    const x = Array.from(
      { length: numPoints },
      (_, i) => xMin + (i * (xMax - xMin)) / (numPoints - 1)
    );
    const points = x.map((xi) => {
      const yi = evaluateFunction(functionStr, xi);
      return { x: xi, y: Number.isFinite(yi) ? yi : NaN };
    });
    
    // Filter out any NaN values to ensure the plot is continuous
    return points.filter(point => !Number.isNaN(point.y));
  } catch (error) {
    console.error('Error generating points:', error);
    return [];
  }
};

export const calculateIntegral = (
  functionStr: string,
  a: number,
  b: number,
  n: number = 100
): number => {
  try {
    if (!functionStr.trim()) {
      return NaN;
    }
    const dx = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = a + i * dx;
      const y = evaluateFunction(functionStr, x);
      if (!Number.isFinite(y)) {
        return NaN;
      }
      sum += y;
    }
    const integral = sum * dx;
    return Number.isFinite(integral) ? integral : NaN;
  } catch (error) {
    console.error('Error calculating integral:', error);
    return NaN;
  }
};

export const calculateDerivative = (
  functionStr: string,
  x: number,
  h: number = 0.0001
): number => {
  try {
    if (!functionStr.trim()) {
      return NaN;
    }
    const y1 = evaluateFunction(functionStr, x + h);
    const y2 = evaluateFunction(functionStr, x - h);
    const derivative = (y1 - y2) / (2 * h);
    return Number.isFinite(derivative) ? derivative : NaN;
  } catch (error) {
    console.error('Error calculating derivative:', error);
    return NaN;
  }
};

export const calculateArea = (
  functionStr: string,
  a: number,
  b: number,
  n: number = 100
): number => {
  try {
    if (!functionStr.trim()) {
      return NaN;
    }
    const dx = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = a + i * dx;
      const y = evaluateFunction(functionStr, x);
      if (!Number.isFinite(y)) {
        return NaN;
      }
      sum += Math.abs(y);
    }
    const area = sum * dx;
    return Number.isFinite(area) ? area : NaN;
  } catch (error) {
    console.error('Error calculating area:', error);
    return NaN;
  }
}; 