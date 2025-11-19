'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Area units to square meters
const AREA_UNITS = {
  'square meters': 1,
  'square feet': 0.092903,
};

// Length units to meters
const LENGTH_UNITS = {
  'meters': 1,
  'feet': 0.3048,
};

interface ACBTUInputs {
  size: string;
  sizeUnit: keyof typeof AREA_UNITS;
  ceilingHeight: string;
  heightUnit: keyof typeof LENGTH_UNITS;
  numPeople: string;
  roomType: string;
  insulation: string;
  sunExposure: string;
  climate: string;
}

interface GeneralBTUInputs {
  width: string;
  widthUnit: keyof typeof LENGTH_UNITS;
  length: string;
  lengthUnit: keyof typeof LENGTH_UNITS;
  ceilingHeight: string;
  heightUnit: keyof typeof LENGTH_UNITS;
  insulation: string;
  tempChange: string;
  tempUnit: string;
}

interface BTUResult {
  btuPerHour: number;
  tons: number;
  watts: number;
  recommendedCapacity: number;
  method: string;
  details: string[];
}

export default function BTUCalculator() {
  const [acInputs, setACInputs] = useState<ACBTUInputs>({
    size: '20',
    sizeUnit: 'square meters',
    ceilingHeight: '2.5',
    heightUnit: 'meters',
    numPeople: '2',
    roomType: 'Bedroom',
    insulation: 'Average',
    sunExposure: 'Average',
    climate: 'Moderate',
  });

  const [generalInputs, setGeneralInputs] = useState<GeneralBTUInputs>({
    width: '5',
    widthUnit: 'meters',
    length: '4',
    lengthUnit: 'meters',
    ceilingHeight: '2.5',
    heightUnit: 'meters',
    insulation: 'Normal',
    tempChange: '10',
    tempUnit: 'Celsius',
  });

  const [acResult, setACResult] = useState<BTUResult | null>(null);
  const [generalResult, setGeneralResult] = useState<BTUResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/btu-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      return "Calculate BTU requirements for air conditioning and heating with our BTU Calculator";
    },
  });

  const calculateACBTU = () => {
    const size = parseFloat(acInputs.size);
    const height = parseFloat(acInputs.ceilingHeight);
    const people = parseInt(acInputs.numPeople);

    if (isNaN(size) || isNaN(height) || isNaN(people) || size <= 0 || height <= 0 || people < 0) {
      alert('Please enter valid positive numbers for size, height, and number of people.');
      return;
    }

    // Convert to square meters and square feet
    const areaSqM = size * AREA_UNITS[acInputs.sizeUnit];
    const areaSqFt = areaSqM * 10.7639; // 1 m² = 10.7639 sq ft
    const heightM = height * LENGTH_UNITS[acInputs.heightUnit];
    
    // Base BTU calculation: standard is 20 BTU per square foot (approximately 215 BTU per square meter)
    // This is for standard 8-9 foot ceilings
    let baseBTU = areaSqFt * 20; // Base rate: 20 BTU per sq ft
    
    const details: string[] = [];
    details.push(`Base calculation: ${areaSqFt.toFixed(0)} sq ft × 20 BTU/sq ft = ${baseBTU.toFixed(0)} BTU/hr`);
    
    // Adjust for ceiling height
    if (heightM > 2.7) { // Over 9 feet
      const heightAdjustment = 1 + ((heightM - 2.7) * 0.15);
      baseBTU *= heightAdjustment;
      details.push(`Ceiling height adjustment (${heightM.toFixed(1)}m): ${heightAdjustment.toFixed(2)}x`);
    } else if (heightM < 2.4) { // Under 8 feet
      baseBTU *= 0.9;
      details.push(`Ceiling height adjustment (${heightM.toFixed(1)}m): 0.9x`);
    }

    // Add BTU for people (approximately 400 BTU per person)
    const peopleBTU = people * 400;
    baseBTU += peopleBTU;
    if (people > 0) {
      details.push(`People heat load: ${people} × 400 = ${peopleBTU} BTU/hr`);
    }

    // Room type adjustment
    const roomAdjustments: { [key: string]: number } = {
      'Bedroom': 1.0,
      'Living Room': 1.1,
      'Kitchen': 1.15,
      'Office': 1.05,
      'Dining Room': 1.0,
    };
    const roomFactor = roomAdjustments[acInputs.roomType] || 1.0;
    if (roomFactor !== 1.0) {
      details.push(`Room type adjustment: ${roomFactor}x`);
    }
    baseBTU *= roomFactor;

    // Insulation adjustment
    const insulationAdjustments: { [key: string]: number } = {
      'Poor': 1.25,
      'Average': 1.0,
      'Good': 0.85,
      'Excellent': 0.75,
    };
    const insulationFactor = insulationAdjustments[acInputs.insulation] || 1.0;
    if (insulationFactor !== 1.0) {
      details.push(`Insulation adjustment: ${insulationFactor}x`);
    }
    baseBTU *= insulationFactor;

    // Sun exposure adjustment
    const sunAdjustments: { [key: string]: number } = {
      'Low (Shaded)': 0.9,
      'Average': 1.0,
      'High (South/West facing)': 1.2,
    };
    const sunFactor = sunAdjustments[acInputs.sunExposure] || 1.0;
    if (sunFactor !== 1.0) {
      details.push(`Sun exposure adjustment: ${sunFactor}x`);
    }
    baseBTU *= sunFactor;

    // Climate adjustment
    const climateAdjustments: { [key: string]: number } = {
      'Cool': 0.85,
      'Moderate': 1.0,
      'Hot': 1.15,
      'Very Hot': 1.3,
    };
    const climateFactor = climateAdjustments[acInputs.climate] || 1.0;
    if (climateFactor !== 1.0) {
      details.push(`Climate adjustment: ${climateFactor}x`);
    }
    baseBTU *= climateFactor;

    // Add 10% safety margin
    const recommendedCapacity = baseBTU * 1.1;
    details.push(`Safety margin: +10%`);

    setACResult({
      btuPerHour: baseBTU,
      tons: baseBTU / 12000, // 1 ton = 12,000 BTU/hr
      watts: baseBTU * 0.293071, // 1 BTU/hr = 0.293071 watts
      recommendedCapacity,
      method: 'AC BTU Calculator',
      details,
    });
  };

  const calculateGeneralBTU = () => {
    const width = parseFloat(generalInputs.width);
    const length = parseFloat(generalInputs.length);
    const height = parseFloat(generalInputs.ceilingHeight);
    const tempChange = parseFloat(generalInputs.tempChange);

    if (isNaN(width) || isNaN(length) || isNaN(height) || isNaN(tempChange) || 
        width <= 0 || length <= 0 || height <= 0 || tempChange <= 0) {
      alert('Please enter valid positive numbers for all dimensions and temperature change.');
      return;
    }

    // Convert to meters
    const widthM = width * LENGTH_UNITS[generalInputs.widthUnit];
    const lengthM = length * LENGTH_UNITS[generalInputs.lengthUnit];
    const heightM = height * LENGTH_UNITS[generalInputs.heightUnit];
    
    // Calculate volume in cubic meters and cubic feet
    const volumeM3 = widthM * lengthM * heightM;
    const volumeCuFt = volumeM3 * 35.3147; // 1 m³ = 35.3147 cubic feet

    // Convert temperature change to Fahrenheit
    const tempChangeF = generalInputs.tempUnit === 'Fahrenheit' 
      ? tempChange 
      : (tempChange * 9 / 5); // Convert Celsius to Fahrenheit

    const details: string[] = [];
    details.push(`Room volume: ${widthM.toFixed(1)}m × ${lengthM.toFixed(1)}m × ${heightM.toFixed(1)}m = ${volumeM3.toFixed(1)} m³ (${volumeCuFt.toFixed(0)} cu ft)`);
    details.push(`Temperature change: ${tempChangeF.toFixed(1)}°F`);

    // Standard BTU calculation formula:
    // BTU = Volume (cubic feet) × Temperature Change (°F) × 0.133
    // This accounts for the specific heat capacity and density of air
    let baseBTU = volumeCuFt * tempChangeF * 0.133;
    details.push(`Base calculation: ${volumeCuFt.toFixed(0)} cu ft × ${tempChangeF.toFixed(1)}°F × 0.133 = ${baseBTU.toFixed(0)} BTU/hr`);

    // Insulation adjustment
    const insulationAdjustments: { [key: string]: number } = {
      'Poor': 1.25,
      'Normal': 1.0,
      'Good': 0.85,
      'Excellent': 0.7,
    };
    const insulationFactor = insulationAdjustments[generalInputs.insulation] || 1.0;
    if (insulationFactor !== 1.0) {
      details.push(`Insulation adjustment: ${insulationFactor}x`);
      baseBTU *= insulationFactor;
    }

    // Add 5% safety margin for general heating/cooling
    const recommendedCapacity = baseBTU * 1.05;
    details.push(`Recommended with 5% safety margin: ${recommendedCapacity.toFixed(0)} BTU/hr`);

    setGeneralResult({
      btuPerHour: baseBTU,
      tons: baseBTU / 12000,
      watts: baseBTU * 0.293071,
      recommendedCapacity,
      method: 'General Purpose BTU Calculator',
      details,
    });
  };

  const handleReset = () => {
    setACInputs({
      size: '20',
      sizeUnit: 'square meters',
      ceilingHeight: '2.5',
      heightUnit: 'meters',
      numPeople: '2',
      roomType: 'Bedroom',
      insulation: 'Average',
      sunExposure: 'Average',
      climate: 'Moderate',
    });
    setGeneralInputs({
      width: '5',
      widthUnit: 'meters',
      length: '4',
      lengthUnit: 'meters',
      ceilingHeight: '2.5',
      heightUnit: 'meters',
      insulation: 'Normal',
      tempChange: '10',
      tempUnit: 'Celsius',
    });
    setACResult(null);
    setGeneralResult(null);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
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
      link.download = `btu-calculator-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
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
            <head>
              <title>BTU Calculator Results</title>
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
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* AC BTU Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">AC BTU Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                Use this calculator to estimate the cooling needs of a typical room or house.
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Size:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={acInputs.size}
                    onChange={(e) => setACInputs(prev => ({ ...prev, size: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                    step="0.1"
                  />
                  <select
                    value={acInputs.sizeUnit}
                    onChange={(e) => setACInputs(prev => ({ ...prev, sizeUnit: e.target.value as keyof typeof AREA_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(AREA_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Room Ceiling Height:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={acInputs.ceilingHeight}
                    onChange={(e) => setACInputs(prev => ({ ...prev, ceilingHeight: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2.5"
                    step="0.1"
                  />
                  <select
                    value={acInputs.heightUnit}
                    onChange={(e) => setACInputs(prev => ({ ...prev, heightUnit: e.target.value as keyof typeof LENGTH_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(LENGTH_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Number of People Inside Regularly:</Label>
                <input
                  type="number"
                  value={acInputs.numPeople}
                  onChange={(e) => setACInputs(prev => ({ ...prev, numPeople: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Type:</Label>
                <select
                  value={acInputs.roomType}
                  onChange={(e) => setACInputs(prev => ({ ...prev, roomType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Office">Office</option>
                  <option value="Dining Room">Dining Room</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Insulation Condition:</Label>
                <select
                  value={acInputs.insulation}
                  onChange={(e) => setACInputs(prev => ({ ...prev, insulation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Poor">Poor</option>
                  <option value="Average">Average</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sun Exposure:</Label>
                <select
                  value={acInputs.sunExposure}
                  onChange={(e) => setACInputs(prev => ({ ...prev, sunExposure: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low (Shaded)">Low (Shaded)</option>
                  <option value="Average">Average</option>
                  <option value="High (South/West facing)">High (South/West facing)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Climate:</Label>
                <select
                  value={acInputs.climate}
                  onChange={(e) => setACInputs(prev => ({ ...prev, climate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Cool">Cool</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Hot">Hot</option>
                  <option value="Very Hot">Very Hot</option>
                </select>
              </div>

              <Button 
                onClick={calculateACBTU}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* General Purpose Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">General Purpose AC or Heating BTU Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                Calculate BTUs required to heat or cool an area based on desired temperature change.
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Room/House Width:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={generalInputs.width}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, width: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                    step="0.1"
                  />
                  <select
                    value={generalInputs.widthUnit}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, widthUnit: e.target.value as keyof typeof LENGTH_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(LENGTH_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Room/House Length:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={generalInputs.length}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, length: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="4"
                    step="0.1"
                  />
                  <select
                    value={generalInputs.lengthUnit}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, lengthUnit: e.target.value as keyof typeof LENGTH_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(LENGTH_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Ceiling Height:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={generalInputs.ceilingHeight}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, ceilingHeight: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2.5"
                    step="0.1"
                  />
                  <select
                    value={generalInputs.heightUnit}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, heightUnit: e.target.value as keyof typeof LENGTH_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(LENGTH_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Insulation Condition:</Label>
                <select
                  value={generalInputs.insulation}
                  onChange={(e) => setGeneralInputs(prev => ({ ...prev, insulation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Poor">Poor</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Desired Temperature Increase or Decrease:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={generalInputs.tempChange}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, tempChange: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                    step="0.5"
                  />
                  <select
                    value={generalInputs.tempUnit}
                    onChange={(e) => setGeneralInputs(prev => ({ ...prev, tempUnit: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Celsius">Celsius</option>
                    <option value="Fahrenheit">Fahrenheit</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500">
                  e.g., 10°C for warming, or 5°C for cooling
                </p>
              </div>

              <Button 
                onClick={calculateGeneralBTU}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <div ref={resultRef}>
            {(acResult || generalResult) ? (
              <div className="space-y-6">
                {/* AC BTU Result */}
                {acResult && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">AC Cooling Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                          <p className="text-xs text-gray-600 mb-1">Required Capacity:</p>
                          <p className="text-2xl font-bold text-blue-700">{acResult.btuPerHour.toFixed(0)}</p>
                          <p className="text-sm text-gray-700">BTU/hr</p>
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                          <p className="text-xs text-gray-600 mb-1">Recommended:</p>
                          <p className="text-2xl font-bold text-green-700">{acResult.recommendedCapacity.toFixed(0)}</p>
                          <p className="text-sm text-gray-700">BTU/hr</p>
                        </div>
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
                          <p className="text-xs text-gray-600 mb-1">Cooling Tons:</p>
                          <p className="text-2xl font-bold text-purple-700">{acResult.tons.toFixed(2)}</p>
                          <p className="text-sm text-gray-700">tons</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          {acResult.details.map((detail, idx) => (
                            <p key={idx}>• {detail}</p>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Alternative Units</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Power (Watts):</span>
                            <span className="font-semibold text-gray-900">{acResult.watts.toFixed(0)} W</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Power (Kilowatts):</span>
                            <span className="font-semibold text-gray-900">{(acResult.watts / 1000).toFixed(2)} kW</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Recommendation:</strong> Choose an AC unit with at least {acResult.recommendedCapacity.toFixed(0)} BTU/hr capacity ({acResult.tons.toFixed(2)} tons) for optimal cooling performance.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* General BTU Result */}
                {generalResult && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Heating/Cooling Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
                          <p className="text-xs text-gray-600 mb-1">Required Capacity:</p>
                          <p className="text-2xl font-bold text-orange-700">{generalResult.btuPerHour.toFixed(0)}</p>
                          <p className="text-sm text-gray-700">BTU/hr</p>
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                          <p className="text-xs text-gray-600 mb-1">Recommended:</p>
                          <p className="text-2xl font-bold text-green-700">{generalResult.recommendedCapacity.toFixed(0)}</p>
                          <p className="text-sm text-gray-700">BTU/hr</p>
                        </div>
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
                          <p className="text-xs text-gray-600 mb-1">Power Required:</p>
                          <p className="text-2xl font-bold text-purple-700">{(generalResult.watts / 1000).toFixed(2)}</p>
                          <p className="text-sm text-gray-700">kW</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          {generalResult.details.map((detail, idx) => (
                            <p key={idx}>• {detail}</p>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> This calculation is based on the desired temperature change. For heating, select a system with at least {generalResult.recommendedCapacity.toFixed(0)} BTU/hr capacity.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">❄️</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Use either calculator to estimate your heating or cooling needs
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          {(acResult || generalResult) && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Results
              </Button>
              
              <Button 
                onClick={handleShare} 
                variant="outline" 
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Calculator
              </Button>
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
        calculatorName="BTU Calculator"
      />
    </div>
  );
}

