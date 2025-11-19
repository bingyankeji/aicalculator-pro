'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Wifi, Clock, Globe, Server } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Data unit conversion factors (all in bits)
const DATA_UNITS = {
  bits: { name: 'bits (b)', factor: 1 },
  bytes: { name: 'bytes (B)', factor: 8 },
  kilobits: { name: 'kilobits (Kb)', factor: 1000 },
  kilobytes: { name: 'kilobytes (KB)', factor: 8000 },
  megabits: { name: 'megabits (Mb)', factor: 1000000 },
  megabytes: { name: 'megabytes (MB)', factor: 8000000 },
  gigabits: { name: 'gigabits (Gb)', factor: 1000000000 },
  gigabytes: { name: 'gigabytes (GB)', factor: 8000000000 },
  terabytes: { name: 'terabytes (TB)', factor: 8000000000000 },
};

// Bandwidth units (all in bits per second)
const BANDWIDTH_UNITS = {
  'bps': { name: 'bit/s', factor: 1 },
  'Kbps': { name: 'Kbit/s', factor: 1000 },
  'Mbps': { name: 'Mbit/s', factor: 1000000 },
  'Gbps': { name: 'Gbit/s', factor: 1000000000 },
  'KBps': { name: 'KB/s', factor: 8000 },
  'MBps': { name: 'MB/s', factor: 8000000 },
};

interface BandwidthInputs {
  // Data Unit Converter
  dataValue: string;
  dataUnit: keyof typeof DATA_UNITS;
  targetDataUnit: keyof typeof DATA_UNITS;

  // Download/Upload Time
  fileSize: string;
  fileSizeUnit: keyof typeof DATA_UNITS;
  bandwidth: string;
  bandwidthUnit: keyof typeof BANDWIDTH_UNITS;

  // Website Bandwidth
  pageViews: string;
  pageViewsPeriod: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  avgPageSize: string;
  pageSizeUnit: keyof typeof DATA_UNITS;
  redundancyFactor: string;

  // Hosting Bandwidth Converter
  monthlyUsage: string;
  monthlyUsageUnit: keyof typeof DATA_UNITS;
  hostingBandwidthUnit: keyof typeof BANDWIDTH_UNITS;
}

interface BandwidthResult {
  // Data Unit Converter
  convertedData?: number;
  allDataUnits?: Array<{ unit: string; value: string }>;

  // Download/Upload Time
  downloadSeconds?: number;
  downloadFormatted?: string;
  downloadSpeed?: {
    bytesPerSecond: number;
    kbPerSecond: number;
    mbPerSecond: number;
  };

  // Website Bandwidth
  dailyBandwidth?: number;
  monthlyBandwidth?: number;
  recommendedBandwidth?: number;
  bandwidthBreakdown?: {
    rawTraffic: number;
    withRedundancy: number;
    peakTraffic: number;
    avgBandwidthRaw: number;
    avgBandwidthWithRedundancy: number;
  };

  // Hosting Bandwidth Converter
  requiredBandwidth?: number;
  peakBandwidth?: number;
}

export default function BandwidthCalculator() {
  const [inputs, setInputs] = useState<BandwidthInputs>({
    dataValue: '',
    dataUnit: 'megabytes',
    targetDataUnit: 'gigabytes',
    fileSize: '',
    fileSizeUnit: 'megabytes',
    bandwidth: '',
    bandwidthUnit: 'Mbps',
    pageViews: '',
    pageViewsPeriod: 'day',
    avgPageSize: '',
    pageSizeUnit: 'kilobytes',
    redundancyFactor: '2',
    monthlyUsage: '',
    monthlyUsageUnit: 'gigabytes',
    hostingBandwidthUnit: 'Mbps',
  });

  const [result, setResult] = useState<BandwidthResult | null>(null);
  const [activeTab, setActiveTab] = useState('converter');
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/bandwidth-calculator',
    getShareParams: () => ({
      t: activeTab,
      v: inputs.dataValue,
      f: inputs.fileSize,
      b: inputs.bandwidth,
    }),
    getShareText: () => {
      return "Calculate bandwidth, download times, and data usage with our Bandwidth Calculator";
    },
  });

  const handleInputChange = (field: keyof BandwidthInputs, value: string | 'day' | 'month') => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  // Data Unit Converter
  const calculateDataConversion = () => {
    const value = parseFloat(inputs.dataValue);
    if (isNaN(value) || value < 0) {
      alert('Please enter a valid data value.');
      return;
    }

    // Convert to bits
    const bits = value * DATA_UNITS[inputs.dataUnit].factor;
    
    // Convert to target unit
    const converted = bits / DATA_UNITS[inputs.targetDataUnit].factor;

    // Calculate all units for display
    const allUnits = Object.entries(DATA_UNITS).map(([key, unit]) => ({
      unit: unit.name,
      value: (bits / unit.factor).toFixed(6).replace(/\.?0+$/, ''),
    }));

    setResult({
      convertedData: converted,
      allDataUnits: allUnits,
    });
  };

  // Download/Upload Time Calculator
  const calculateDownloadTime = () => {
    const fileSize = parseFloat(inputs.fileSize);
    const bandwidth = parseFloat(inputs.bandwidth);

    if (isNaN(fileSize) || fileSize <= 0) {
      alert('Please enter a valid file size.');
      return;
    }
    if (isNaN(bandwidth) || bandwidth <= 0) {
      alert('Please enter a valid bandwidth.');
      return;
    }

    // Convert file size to bits
    const fileSizeBits = fileSize * DATA_UNITS[inputs.fileSizeUnit].factor;
    
    // Convert bandwidth to bits per second
    const bandwidthBps = bandwidth * BANDWIDTH_UNITS[inputs.bandwidthUnit].factor;

    // Calculate time in seconds
    const seconds = fileSizeBits / bandwidthBps;

    // Format time
    let formatted = '';
    if (seconds < 60) {
      formatted = `${seconds.toFixed(2)} seconds`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      formatted = `${minutes} minute${minutes !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      formatted = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      formatted = `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
    }

    setResult({
      downloadSeconds: seconds,
      downloadFormatted: formatted,
      downloadSpeed: {
        bytesPerSecond: bandwidthBps / 8,
        kbPerSecond: bandwidthBps / 8000,
        mbPerSecond: bandwidthBps / 8000000,
      },
    });
  };

  // Website Bandwidth Calculator
  const calculateWebsiteBandwidth = () => {
    const pageViews = parseFloat(inputs.pageViews);
    const avgPageSize = parseFloat(inputs.avgPageSize);
    const redundancyFactor = parseFloat(inputs.redundancyFactor);

    if (isNaN(pageViews) || pageViews <= 0) {
      alert('Please enter valid page views.');
      return;
    }
    if (isNaN(avgPageSize) || avgPageSize <= 0) {
      alert('Please enter valid average page size.');
      return;
    }
    if (isNaN(redundancyFactor) || redundancyFactor < 1) {
      alert('Please enter a valid redundancy factor (minimum 1).');
      return;
    }

    // Convert page size to bytes
    const pageSizeBytes = (avgPageSize * DATA_UNITS[inputs.pageSizeUnit].factor) / 8;

    // Convert page views to daily based on period
    let dailyPageViews = 0;
    switch (inputs.pageViewsPeriod) {
      case 'second':
        dailyPageViews = pageViews * 86400; // 60 * 60 * 24
        break;
      case 'minute':
        dailyPageViews = pageViews * 1440; // 60 * 24
        break;
      case 'hour':
        dailyPageViews = pageViews * 24;
        break;
      case 'day':
        dailyPageViews = pageViews;
        break;
      case 'week':
        dailyPageViews = pageViews / 7;
        break;
      case 'month':
        dailyPageViews = pageViews / 30.44; // Use average month
        break;
      case 'year':
        dailyPageViews = pageViews / 365;
        break;
    }
    const monthlyPageViews = dailyPageViews * 30.44; // Use average month for consistency

    // Calculate raw bandwidth
    const dailyBytes = dailyPageViews * pageSizeBytes;
    const monthlyBytes = monthlyPageViews * pageSizeBytes;

    // Apply redundancy factor
    const dailyWithRedundancy = dailyBytes * redundancyFactor;
    const monthlyWithRedundancy = monthlyBytes * redundancyFactor;

    // Calculate average bandwidth (without redundancy)
    const avgBytesPerSecondRaw = dailyBytes / 86400;
    const avgMbpsRaw = (avgBytesPerSecondRaw * 8) / 1000000;

    // Calculate average bandwidth (with redundancy)
    const avgBytesPerSecond = dailyWithRedundancy / 86400;
    const avgMbps = (avgBytesPerSecond * 8) / 1000000;

    // Calculate peak bandwidth (3x average with redundancy)
    const peakBytesPerSecond = avgBytesPerSecond * 3;
    const peakMbps = (peakBytesPerSecond * 8) / 1000000;

    setResult({
      dailyBandwidth: dailyWithRedundancy / 1000000000, // GB
      monthlyBandwidth: monthlyWithRedundancy / 1000000000, // GB
      recommendedBandwidth: avgMbps, // Changed to average bandwidth with redundancy
      bandwidthBreakdown: {
        rawTraffic: monthlyBytes / 1000000000,
        withRedundancy: monthlyWithRedundancy / 1000000000,
        peakTraffic: peakMbps,
        avgBandwidthRaw: avgMbpsRaw,
        avgBandwidthWithRedundancy: avgMbps,
      },
    });
  };

  // Hosting Bandwidth Converter
  const calculateHostingBandwidth = () => {
    const monthlyUsage = parseFloat(inputs.monthlyUsage);

    if (isNaN(monthlyUsage) || monthlyUsage <= 0) {
      alert('Please enter valid monthly usage.');
      return;
    }

    // Convert to bytes
    const monthlyBytes = (monthlyUsage * DATA_UNITS[inputs.monthlyUsageUnit].factor) / 8;

    // Calculate average bandwidth (bytes per second)
    // Use average days per month (365/12 = 30.44) to match industry standard
    const secondsInMonth = (365 / 12) * 24 * 60 * 60; // 2,630,016 seconds
    const avgBytesPerSecond = monthlyBytes / secondsInMonth;

    // Calculate peak bandwidth (assume 3x average)
    const peakBytesPerSecond = avgBytesPerSecond * 3;

    // Convert to requested unit
    const avgBandwidth = (avgBytesPerSecond * 8) / BANDWIDTH_UNITS[inputs.hostingBandwidthUnit].factor;
    const peakBandwidth = (peakBytesPerSecond * 8) / BANDWIDTH_UNITS[inputs.hostingBandwidthUnit].factor;

    setResult({
      requiredBandwidth: avgBandwidth,
      peakBandwidth: peakBandwidth,
    });
  };

  const handleCalculate = () => {
    switch (activeTab) {
      case 'converter':
        calculateDataConversion();
        break;
      case 'time':
        calculateDownloadTime();
        break;
      case 'website':
        calculateWebsiteBandwidth();
        break;
      case 'hosting':
        calculateHostingBandwidth();
        break;
    }
  };

  const handleReset = () => {
    setInputs({
      dataValue: '',
      dataUnit: 'megabytes',
      targetDataUnit: 'gigabytes',
      fileSize: '',
      fileSizeUnit: 'megabytes',
      bandwidth: '',
      bandwidthUnit: 'Mbps',
      pageViews: '',
      pageViewsPeriod: 'day',
      avgPageSize: '',
      pageSizeUnit: 'kilobytes',
      redundancyFactor: '2',
      monthlyUsage: '',
      monthlyUsageUnit: 'gigabytes',
      hostingBandwidthUnit: 'Mbps',
    });
    setResult(null);
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
      link.download = `bandwidth-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Bandwidth Calculator Results</title>
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
          <TabsTrigger value="converter" className="gap-2">
            <Wifi className="h-4 w-4" />
            <span className="hidden sm:inline">Data Converter</span>
            <span className="sm:hidden">Convert</span>
          </TabsTrigger>
          <TabsTrigger value="time" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Download Time</span>
            <span className="sm:hidden">Time</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Website Bandwidth</span>
            <span className="sm:hidden">Website</span>
          </TabsTrigger>
          <TabsTrigger value="hosting" className="gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden sm:inline">Hosting Converter</span>
            <span className="sm:hidden">Hosting</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6">
            <TabsContent value="converter" className="mt-0">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Data Unit Converter</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Convert between different units of data size
                  </p>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Value</Label>
                    <input
                      type="number"
                      value={inputs.dataValue}
                      onChange={(e) => handleInputChange('dataValue', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500"
                      step="0.01"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">From Unit</Label>
                    <select
                      value={inputs.dataUnit}
                      onChange={(e) => handleInputChange('dataUnit', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(DATA_UNITS).map(([key, unit]) => (
                        <option key={key} value={key}>{unit.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="text-center text-gray-400 text-2xl">↓</div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">To Unit</Label>
                    <select
                      value={inputs.targetDataUnit}
                      onChange={(e) => handleInputChange('targetDataUnit', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(DATA_UNITS).map(([key, unit]) => (
                        <option key={key} value={key}>{unit.name}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="time" className="mt-0">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Download/Upload Time Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Calculate how long it takes to download or upload files
                  </p>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">File Size</Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.fileSize}
                        onChange={(e) => handleInputChange('fileSize', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="500"
                        step="0.01"
                      />
                      <select
                        value={inputs.fileSizeUnit}
                        onChange={(e) => handleInputChange('fileSizeUnit', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.entries(DATA_UNITS).map(([key, unit]) => (
                          <option key={key} value={key}>{unit.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Bandwidth</Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.bandwidth}
                        onChange={(e) => handleInputChange('bandwidth', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5"
                        step="0.01"
                      />
                      <select
                        value={inputs.bandwidthUnit}
                        onChange={(e) => handleInputChange('bandwidthUnit', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.entries(BANDWIDTH_UNITS).map(([key, unit]) => (
                          <option key={key} value={key}>{unit.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="website" className="mt-0">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Website Bandwidth Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Estimate bandwidth needs for your website
                  </p>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Page Views</Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.pageViews}
                        onChange={(e) => handleInputChange('pageViews', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5000"
                        step="1"
                      />
                      <select
                        value={inputs.pageViewsPeriod}
                        onChange={(e) => handleInputChange('pageViewsPeriod', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="second">Per Second</option>
                        <option value="minute">Per Minute</option>
                        <option value="hour">Per Hour</option>
                        <option value="day">Per Day</option>
                        <option value="week">Per Week</option>
                        <option value="month">Per Month</option>
                        <option value="year">Per Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Average Page Size</Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.avgPageSize}
                        onChange={(e) => handleInputChange('avgPageSize', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="500"
                        step="0.01"
                      />
                      <select
                        value={inputs.pageSizeUnit}
                        onChange={(e) => handleInputChange('pageSizeUnit', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.entries(DATA_UNITS).filter(([key]) => 
                          ['kilobytes', 'megabytes'].includes(key)
                        ).map(([key, unit]) => (
                          <option key={key} value={key}>{unit.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Redundancy Factor</Label>
                    <input
                      type="number"
                      value={inputs.redundancyFactor}
                      onChange={(e) => handleInputChange('redundancyFactor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2"
                      step="0.1"
                      min="1"
                    />
                    <p className="text-xs text-gray-500">
                      Accounts for bot traffic, failed requests, and overhead (typically 1.5-3x)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hosting" className="mt-0">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Hosting Bandwidth Converter</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Convert monthly data usage to required bandwidth
                  </p>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Monthly Usage</Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.monthlyUsage}
                        onChange={(e) => handleInputChange('monthlyUsage', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1000"
                        step="0.01"
                      />
                      <select
                        value={inputs.monthlyUsageUnit}
                        onChange={(e) => handleInputChange('monthlyUsageUnit', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.entries(DATA_UNITS).filter(([key]) => 
                          ['megabytes', 'gigabytes', 'terabytes'].includes(key)
                        ).map(([key, unit]) => (
                          <option key={key} value={key}>{unit.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <div className="text-sm text-gray-600 mb-2">is equivalent to</div>
                    <div className="text-2xl text-gray-400">↓</div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Bandwidth Unit</Label>
                    <select
                      value={inputs.hostingBandwidthUnit}
                      onChange={(e) => handleInputChange('hostingBandwidthUnit', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(BANDWIDTH_UNITS).map(([key, unit]) => (
                        <option key={key} value={key}>{unit.name}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calculate & Reset Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleCalculate}
                className="flex-1 bg-green-600 hover:bg-green-700 gap-2 py-6 text-lg"
              >
                <Calculator className="h-5 w-5" />
                Calculate
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="gap-2 py-6"
              >
                <RotateCcw className="h-5 w-5" />
                Clear
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-3 space-y-6">
            <div ref={resultRef}>
              {result ? (
                <>
                  {/* Data Unit Converter Results */}
                  {activeTab === 'converter' && result.convertedData !== undefined && (
                    <>
                      <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardTitle className="text-xl text-gray-900">Conversion Result</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-2">{inputs.dataValue} {DATA_UNITS[inputs.dataUnit].name} =</p>
                            <p className="text-4xl font-bold text-blue-700 break-all">
                              {result.convertedData.toFixed(6).replace(/\.?0+$/, '')}
                            </p>
                            <p className="text-lg text-gray-700 mt-2">{DATA_UNITS[inputs.targetDataUnit].name}</p>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Unit Conversions</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {result.allDataUnits?.map((item, idx) => (
                              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">{item.unit}</span>
                                  <span className="font-semibold text-gray-900 break-all">{item.value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {/* Download Time Results */}
                  {activeTab === 'time' && result.downloadSeconds !== undefined && (
                    <>
                      <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardTitle className="text-xl text-gray-900">Transfer Time</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-2">Time Required</p>
                            <p className="text-3xl font-bold text-green-700">
                              {result.downloadFormatted}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              ({result.downloadSeconds.toFixed(2)} seconds)
                            </p>
                          </div>

                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Transfer Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">File Size:</span>
                                <span className="font-semibold text-gray-900">
                                  {inputs.fileSize} {DATA_UNITS[inputs.fileSizeUnit].name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bandwidth:</span>
                                <span className="font-semibold text-gray-900">
                                  {inputs.bandwidth} {BANDWIDTH_UNITS[inputs.bandwidthUnit].name}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Download Speed</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bytes/second:</span>
                                <span className="font-semibold text-blue-700">
                                  {result.downloadSpeed?.bytesPerSecond.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">KB/second:</span>
                                <span className="font-semibold text-blue-700">
                                  {result.downloadSpeed?.kbPerSecond.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">MB/second:</span>
                                <span className="font-semibold text-blue-700">
                                  {result.downloadSpeed?.mbPerSecond.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {/* Website Bandwidth Results */}
                  {activeTab === 'website' && result.monthlyBandwidth !== undefined && (
                    <>
                      <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardTitle className="text-xl text-gray-900">Website Bandwidth Requirements</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                            <p className="text-sm text-gray-600 mb-2">Average Bandwidth Needed</p>
                            <p className="text-4xl font-bold text-blue-700">
                              {result.recommendedBandwidth?.toFixed(2)} Mbps
                            </p>
                            <p className="text-xs text-gray-500 mt-2">With redundancy factor of {inputs.redundancyFactor}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                              <p className="text-xs text-gray-600 mb-1">Daily Bandwidth</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {result.dailyBandwidth?.toFixed(2)} GB
                              </p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                              <p className="text-xs text-gray-600 mb-1">Monthly Bandwidth</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {result.monthlyBandwidth?.toFixed(2)} GB
                              </p>
                            </div>
                          </div>

                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Input Summary</h4>
                            <div className="space-y-2 text-sm text-gray-700 mb-4 pb-4 border-b border-gray-200">
                              <p><strong>Page Views:</strong> {inputs.pageViews} per {inputs.pageViewsPeriod}</p>
                              <p><strong>Average Page Size:</strong> {inputs.avgPageSize} {DATA_UNITS[inputs.pageSizeUnit].name}</p>
                              <p><strong>Redundancy Factor:</strong> {inputs.redundancyFactor}×</p>
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-3">Bandwidth Breakdown</h4>
                            <div className="space-y-3 text-sm">
                              <div className="pb-3 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-gray-700 font-medium">Actual bandwidth needed:</span>
                                  <span className="font-bold text-gray-900">
                                    {result.bandwidthBreakdown?.avgBandwidthRaw.toFixed(8)} Mbps
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 text-xs">Or</span>
                                  <span className="text-gray-600">
                                    {result.bandwidthBreakdown?.rawTraffic.toFixed(5)} GB per month
                                  </span>
                                </div>
                              </div>
                              
                              <div className="pb-3 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-gray-700 font-medium">With redundancy factor of {inputs.redundancyFactor}:</span>
                                  <span className="font-bold text-blue-700">
                                    {result.bandwidthBreakdown?.avgBandwidthWithRedundancy.toFixed(8)} Mbps
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 text-xs">Or</span>
                                  <span className="text-gray-600">
                                    {result.bandwidthBreakdown?.withRedundancy.toFixed(5)} GB per month
                                  </span>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700 font-medium">Peak Traffic (3× average):</span>
                                  <span className="font-bold text-orange-600">
                                    {result.bandwidthBreakdown?.peakTraffic.toFixed(2)} Mbps
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Recommended for handling traffic spikes
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {/* Hosting Bandwidth Results */}
                  {activeTab === 'hosting' && result.requiredBandwidth !== undefined && (
                    <>
                      <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardTitle className="text-xl text-gray-900">Hosting Bandwidth Requirements</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                            <p className="text-sm text-gray-600 mb-2">Average Bandwidth Required</p>
                            <p className="text-4xl font-bold text-blue-700">
                              {result.requiredBandwidth.toFixed(2)}
                            </p>
                            <p className="text-lg text-gray-700 mt-2">
                              {BANDWIDTH_UNITS[inputs.hostingBandwidthUnit].name}
                            </p>
                          </div>

                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                            <p className="text-sm text-gray-600 mb-2">Peak Bandwidth (3× average)</p>
                            <p className="text-3xl font-bold text-orange-700">
                              {result.peakBandwidth?.toFixed(2)}
                            </p>
                            <p className="text-lg text-gray-700 mt-2">
                              {BANDWIDTH_UNITS[inputs.hostingBandwidthUnit].name}
                            </p>
                          </div>

                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                              <p><strong>Monthly Usage:</strong> {inputs.monthlyUsage} {DATA_UNITS[inputs.monthlyUsageUnit].name}</p>
                              <p><strong>Days in month:</strong> 30.44 (average)</p>
                              <p><strong>Seconds per month:</strong> {((365 / 12) * 24 * 60 * 60).toLocaleString()}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                Average bandwidth represents continuous transfer rate over the month.
                                Peak bandwidth accounts for traffic spikes (typically 3× average).
                                Using average days per month (365÷12) for more accurate calculation.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </>
              ) : (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Wifi className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No results yet</p>
                    <p className="text-gray-400 text-sm">
                      Select a calculator type and enter values to see results
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            {result && (
              <div className="flex flex-wrap gap-3 justify-center print:hidden">
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
      </Tabs>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Bandwidth Calculator"
      />
    </div>
  );
}

