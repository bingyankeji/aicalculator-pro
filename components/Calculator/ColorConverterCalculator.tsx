'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Share2, Printer, Download, Palette, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  cmyk: { c: number; m: number; y: number; k: number };
  hsv: { h: number; s: number; v: number };
}

export default function ColorConverterCalculator() {
  const [color, setColor] = useState<ColorValues>({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
    cmyk: { c: 76, m: 47, y: 0, k: 4 },
    hsv: { h: 217, s: 76, v: 96 },
  });
  const [inputType, setInputType] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/color-converter',
    getShareParams: () => ({ c: color.hex.substring(1) }),
    getShareText: () => `Color: ${color.hex}`,
  });

  // RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  // HEX to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    if (k === 1) {
      c = m = y = 0;
    } else {
      c = Math.round(((c - k) / (1 - k)) * 100);
      m = Math.round(((m - k) / (1 - k)) * 100);
      y = Math.round(((y - k) / (1 - k)) * 100);
      k = Math.round(k * 100);
    }

    return { c, m, y, k };
  };

  // RGB to HSV
  const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  };

  const updateColor = (rgb: { r: number; g: number; b: number }) => {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl, cmyk, hsv });
  };

  const handleHexInput = (value: string) => {
    const rgb = hexToRgb(value);
    if (rgb) {
      updateColor(rgb);
    }
  };

  const handleRgbInput = (r: number, g: number, b: number) => {
    updateColor({ r, g, b });
  };

  const handleHslInput = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    updateColor(rgb);
  };

  const generateComplementary = () => {
    const h = (color.hsl.h + 180) % 360;
    const rgb = hslToRgb(h, color.hsl.s, color.hsl.l);
    updateColor(rgb);
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    updateColor({ r, g, b });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
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
      link.download = `color-${color.hex.substring(1)}-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Color Converter Results</title>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Palette className="h-5 w-5 text-blue-600" />
                Color Input
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Color Picker */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Color Picker</Label>
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => handleHexInput(e.target.value)}
                  className="w-full h-20 rounded-lg cursor-pointer border-2 border-gray-300"
                />
              </div>

              {/* Input Type Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Input Format</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => setInputType('hex')}
                    variant={inputType === 'hex' ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    HEX
                  </Button>
                  <Button
                    onClick={() => setInputType('rgb')}
                    variant={inputType === 'rgb' ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    RGB
                  </Button>
                  <Button
                    onClick={() => setInputType('hsl')}
                    variant={inputType === 'hsl' ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    HSL
                  </Button>
                </div>
              </div>

              {/* HEX Input */}
              {inputType === 'hex' && (
                <div className="space-y-2">
                  <Label htmlFor="hex" className="text-sm font-medium text-gray-700">HEX Value</Label>
                  <input
                    id="hex"
                    type="text"
                    value={color.hex}
                    onChange={(e) => handleHexInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#3B82F6"
                  />
                </div>
              )}

              {/* RGB Input */}
              {inputType === 'rgb' && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Red (0-255)</Label>
                    <input
                      type="number"
                      value={color.rgb.r}
                      onChange={(e) => handleRgbInput(parseInt(e.target.value) || 0, color.rgb.g, color.rgb.b)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min="0"
                      max="255"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Green (0-255)</Label>
                    <input
                      type="number"
                      value={color.rgb.g}
                      onChange={(e) => handleRgbInput(color.rgb.r, parseInt(e.target.value) || 0, color.rgb.b)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min="0"
                      max="255"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Blue (0-255)</Label>
                    <input
                      type="number"
                      value={color.rgb.b}
                      onChange={(e) => handleRgbInput(color.rgb.r, color.rgb.g, parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min="0"
                      max="255"
                    />
                  </div>
                </div>
              )}

              {/* HSL Input */}
              {inputType === 'hsl' && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Hue (0-360)</Label>
                    <input
                      type="number"
                      value={color.hsl.h}
                      onChange={(e) => handleHslInput(parseInt(e.target.value) || 0, color.hsl.s, color.hsl.l)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min="0"
                      max="360"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Saturation (0-100%)</Label>
                    <input
                      type="number"
                      value={color.hsl.s}
                      onChange={(e) => handleHslInput(color.hsl.h, parseInt(e.target.value) || 0, color.hsl.l)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Lightness (0-100%)</Label>
                    <input
                      type="number"
                      value={color.hsl.l}
                      onChange={(e) => handleHslInput(color.hsl.h, color.hsl.s, parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={generateRandomColor}
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Random
                </Button>
                <Button
                  onClick={generateComplementary}
                  variant="outline"
                  className="flex-1"
                >
                  Complementary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Palette className="h-5 w-5 text-blue-600" />
                  Color Values
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {/* Color Preview */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Color Preview</h3>
                  <div
                    className="w-full h-32 rounded-lg border-2 border-gray-300 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                </div>

                {/* Color Values */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Color Formats</h3>
                  
                  {/* HEX */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">HEX</p>
                        <p className="text-lg font-mono font-bold text-gray-900">{color.hex}</p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(color.hex, 'HEX')}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* RGB */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">RGB</p>
                        <p className="text-lg font-mono font-bold text-gray-900">
                          rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                        </p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, 'RGB')}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* HSL */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">HSL</p>
                        <p className="text-lg font-mono font-bold text-gray-900">
                          hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
                        </p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, 'HSL')}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* CMYK */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">CMYK</p>
                        <p className="text-lg font-mono font-bold text-gray-900">
                          cmyk({color.cmyk.c}%, {color.cmyk.m}%, {color.cmyk.y}%, {color.cmyk.k}%)
                        </p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(`cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`, 'CMYK')}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* HSV */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">HSV</p>
                        <p className="text-lg font-mono font-bold text-gray-900">
                          hsv({color.hsv.h}, {color.hsv.s}%, {color.hsv.v}%)
                        </p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(`hsv(${color.hsv.h}, ${color.hsv.s}%, ${color.hsv.v}%)`, 'HSV')}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
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
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Color Converter"
      />
    </div>
  );
}

