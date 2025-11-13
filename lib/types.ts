/**
 * Calculator Types
 */

export type CalculatorType = 
  | 'basic'
  | 'bmi'
  | 'loan'
  | 'percentage'
  | 'calorie'
  | 'tax'
  | 'age'
  | 'mortgage'
  | 'retirement'
  | 'investment';

export type CalculatorCategory = 
  | 'financial'
  | 'health'
  | 'math'
  | 'date-time'
  | 'unit-converter'
  | 'other';

export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: CalculatorCategory;
  url: string;
  featured?: boolean;
}

export interface CalculationResult {
  value: number | string;
  details?: Record<string, any>;
  aiAnalysis?: string;
}

/**
 * AI Analysis Types
 */

export interface AIAnalysisRequest {
  calculatorType: CalculatorType;
  inputData: Record<string, any>;
  result: CalculationResult;
  language?: string;
}

export interface AIAnalysisResponse {
  analysis: string;
  suggestions: string[];
  warnings?: string[];
}

/**
 * User Types
 */

export interface User {
  id: string;
  email?: string;
  name?: string;
  language: string;
  createdAt: Date;
}

/**
 * Calculation History
 */

export interface CalculationHistory {
  id: string;
  userId?: string;
  calculatorType: CalculatorType;
  inputData: Record<string, any>;
  result: CalculationResult;
  aiAnalysis?: string;
  createdAt: Date;
}

