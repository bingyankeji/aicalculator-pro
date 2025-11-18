'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Ruler, TrendingUp, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface HeightPrediction {
  predictedHeight: number;
  minHeight: number;
  maxHeight: number;
  unit: string;
}

const HeightCalculator = () => {
  const [calculatorMode, setCalculatorMode] = useState<'full' | 'simple'>('full');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'us'>('metric');
  
  // Child information
  const [childAge, setChildAge] = useState('5');
  const [childGender, setChildGender] = useState<'male' | 'female'>('male');
  const [childHeightFeet, setChildHeightFeet] = useState('3');
  const [childHeightInches, setChildHeightInches] = useState('8');
  const [childHeightCm, setChildHeightCm] = useState('112');
  const [childWeight, setChildWeight] = useState('18');
  
  // Parent heights
  const [motherHeightFeet, setMotherHeightFeet] = useState('5');
  const [motherHeightInches, setMotherHeightInches] = useState('5');
  const [motherHeightCm, setMotherHeightCm] = useState('164');
  const [fatherHeightFeet, setFatherHeightFeet] = useState('5');
  const [fatherHeightInches, setFatherHeightInches] = useState('10');
  const [fatherHeightCm, setFatherHeightCm] = useState('178');
  
  // Results
  const [prediction, setPrediction] = useState<HeightPrediction | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/height-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      if (prediction) {
        return `Height Calculator: Predicted adult height is ${prediction.predictedHeight.toFixed(1)} ${prediction.unit}`;
      }
      return 'Height Calculator - Predict future height based on parents\' heights';
    },
  });

  // Convert feet and inches to cm
  const feetAndInchesToCm = (feet: string, inches: string): number => {
    const feetNum = parseFloat(feet) || 0;
    const inchesNum = parseFloat(inches) || 0;
    // 1 foot = 30.48 cm, 1 inch = 2.54 cm
    return feetNum * 30.48 + inchesNum * 2.54;
  };

  // Convert cm to feet and inches
  const cmToFeetAndInches = (cm: number): { feet: number; inches: number } => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  // Format height display for US units
  const formatHeightDisplay = (value: number, unit: string): string => {
    if (unit === 'ft/in') {
      const feet = Math.floor(value);
      const inches = Math.round((value - feet) * 12);
      return `${feet}' ${inches}"`;
    }
    return value.toFixed(1);
  };

  // Height prediction formula (Tanner formula)
  const calculatePrediction = () => {
    let motherCm: number;
    let fatherCm: number;

    if (unitSystem === 'us') {
      motherCm = feetAndInchesToCm(motherHeightFeet, motherHeightInches);
      fatherCm = feetAndInchesToCm(fatherHeightFeet, fatherHeightInches);
    } else {
      motherCm = parseFloat(motherHeightCm) || 0;
      fatherCm = parseFloat(fatherHeightCm) || 0;
    }
    
    if (motherCm === 0 || fatherCm === 0) {
      return;
    }

    let predictedCm: number;
    
    if (childGender === 'male') {
      // Boy: (Mother's height + Father's height + 13) / 2
      predictedCm = (motherCm + fatherCm + 13) / 2;
    } else {
      // Girl: (Mother's height + Father's height - 13) / 2
      predictedCm = (motherCm + fatherCm - 13) / 2;
    }

    // ±10 cm range
    const minCm = predictedCm - 10;
    const maxCm = predictedCm + 10;

    if (unitSystem === 'us') {
      const predicted = cmToFeetAndInches(predictedCm);
      const min = cmToFeetAndInches(minCm);
      const max = cmToFeetAndInches(maxCm);
      
      setPrediction({
        predictedHeight: predicted.feet + predicted.inches / 12,
        minHeight: min.feet + min.inches / 12,
        maxHeight: max.feet + max.inches / 12,
        unit: 'ft/in',
      });
    } else {
      setPrediction({
        predictedHeight: predictedCm,
        minHeight: minCm,
        maxHeight: maxCm,
        unit: 'cm',
      });
    }
  };

  const handleClear = () => {
    setChildAge('5');
    setChildGender('male');
    setChildHeightFeet('3');
    setChildHeightInches('8');
    setChildHeightCm('112');
    setChildWeight('18');
    setMotherHeightFeet('5');
    setMotherHeightInches('5');
    setMotherHeightCm('164');
    setFatherHeightFeet('5');
    setFatherHeightInches('10');
    setFatherHeightCm('178');
    setPrediction(null);
  };

  // Handle save as image
  const handleSaveAsImage = async () => {
    if (!resultsRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `height-prediction-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Calculator Mode Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          <button
            onClick={() => {
              setCalculatorMode('full');
              handleClear();
            }}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              calculatorMode === 'full'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Full Calculator
          </button>
          <button
            onClick={() => {
              setCalculatorMode('simple');
              handleClear();
            }}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              calculatorMode === 'simple'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Parents Heights Only
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Calculator Input */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
            {/* Unit System Tabs */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                <button
                  onClick={() => setUnitSystem('us')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    unitSystem === 'us'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  US Units
                </button>
                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    unitSystem === 'metric'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Metric Units
                </button>
              </div>
            </div>

            <CardTitle className="text-lg font-semibold text-gray-900">
              {calculatorMode === 'full' ? 'Height Calculator' : 'Predicting Based on the Parents\' Heights Only'}
            </CardTitle>
            {calculatorMode === 'simple' && (
              <p className="text-sm text-gray-600 mt-2">
                This calculator uses the parents' height only. It can be used to predict the future heights of unborn children or very young infants.
              </p>
            )}
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {calculatorMode === 'full' && (
              <>
                {/* Child's Age */}
                <div className="space-y-2">
                  <Label htmlFor="childAge" className="text-sm font-medium text-gray-700">
                    Child's Age
                  </Label>
                  <Input
                    id="childAge"
                    type="number"
                    step="0.1"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Child's Gender */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Child's Gender</Label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={childGender === 'male'}
                        onChange={(e) => setChildGender(e.target.value as 'male' | 'female')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={childGender === 'female'}
                        onChange={(e) => setChildGender(e.target.value as 'male' | 'female')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">female</span>
                    </label>
                  </div>
                </div>

                {/* Child's Height */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Child's Height
                  </Label>
                  {unitSystem === 'us' ? (
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          type="number"
                          step="1"
                          value={childHeightFeet}
                          onChange={(e) => setChildHeightFeet(e.target.value)}
                          className="w-full pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          ft
                        </span>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          type="number"
                          step="0.5"
                          value={childHeightInches}
                          onChange={(e) => setChildHeightInches(e.target.value)}
                          className="w-full pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          in
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        value={childHeightCm}
                        onChange={(e) => setChildHeightCm(e.target.value)}
                        className="w-full pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        cm
                      </span>
                    </div>
                  )}
                </div>

                {/* Child's Weight */}
                <div className="space-y-2">
                  <Label htmlFor="childWeight" className="text-sm font-medium text-gray-700">
                    Child's Weight
                  </Label>
                  <div className="relative">
                    <Input
                      id="childWeight"
                      type="number"
                      step="0.1"
                      value={childWeight}
                      onChange={(e) => setChildWeight(e.target.value)}
                      className="w-full pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      {unitSystem === 'us' ? 'lbs' : 'kg'}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Mother's Height */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Mother's Height
              </Label>
              {unitSystem === 'us' ? (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      step="1"
                      value={motherHeightFeet}
                      onChange={(e) => setMotherHeightFeet(e.target.value)}
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ft
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      step="0.5"
                      value={motherHeightInches}
                      onChange={(e) => setMotherHeightInches(e.target.value)}
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      in
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={motherHeightCm}
                    onChange={(e) => setMotherHeightCm(e.target.value)}
                    className="w-full pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    cm
                  </span>
                </div>
              )}
            </div>

            {/* Father's Height */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Father's Height
              </Label>
              {unitSystem === 'us' ? (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      step="1"
                      value={fatherHeightFeet}
                      onChange={(e) => setFatherHeightFeet(e.target.value)}
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ft
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      step="0.5"
                      value={fatherHeightInches}
                      onChange={(e) => setFatherHeightInches(e.target.value)}
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      in
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={fatherHeightCm}
                    onChange={(e) => setFatherHeightCm(e.target.value)}
                    className="w-full pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    cm
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={calculatePrediction}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Calculate
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div>
          {prediction ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  Predicted Adult Height
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Main Prediction */}
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-blue-600 font-medium mb-2">Expected Height</div>
                  <div className="text-4xl font-bold text-blue-900">
                    {formatHeightDisplay(prediction.predictedHeight, prediction.unit)}
                  </div>
                  {prediction.unit === 'cm' && (
                    <div className="text-sm text-blue-600 mt-1">{prediction.unit}</div>
                  )}
                </div>

                {/* Height Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Minimum</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {formatHeightDisplay(prediction.minHeight, prediction.unit)}
                    </div>
                    {prediction.unit === 'cm' && (
                      <div className="text-xs text-gray-600">{prediction.unit}</div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Maximum</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {formatHeightDisplay(prediction.maxHeight, prediction.unit)}
                    </div>
                    {prediction.unit === 'cm' && (
                      <div className="text-xs text-gray-600">{prediction.unit}</div>
                    )}
                  </div>
                </div>

                {/* Information */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-medium mb-1">About This Prediction</p>
                      <p className="text-amber-800">
                        This calculation is based on the mid-parental height method. The actual height may vary by ±10 {prediction.unit} 
                        depending on various factors including nutrition, health, and genetics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Growth Tips */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Nutrition Tips</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Ensure adequate protein, calcium, and vitamin D intake for optimal growth.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Exercise Tips</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Regular physical activity, especially activities that stretch the body like swimming and basketball.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Sleep Tips</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Adequate sleep is crucial. Growth hormone is primarily released during deep sleep.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSaveAsImage}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save as Image
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Ruler className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter parent heights and click "Calculate"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </div>
  );
};

export default HeightCalculator;

