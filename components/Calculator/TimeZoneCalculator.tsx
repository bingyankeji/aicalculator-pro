'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, Clock, AlertCircle, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface TimeZoneInfo {
  name: string;
  label: string;
  offset: string;
  time: string;
}

interface TimeZoneData {
  zone: string;
  city: string;
}

const TimeZoneCalculator = () => {
  const [sourceZone, setSourceZone] = useState('America/New_York');
  const [sourceTime, setSourceTime] = useState('');
  const [targetZones, setTargetZones] = useState<string[]>([
    'America/Los_Angeles',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
  ]);
  const [results, setResults] = useState<TimeZoneInfo[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/time-zone-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      return 'Time Zone Calculator - Convert time between different time zones';
    },
  });

  // Major cities with their time zones
  const majorCities: TimeZoneData[] = [
    { zone: 'America/New_York', city: 'New York' },
    { zone: 'America/Los_Angeles', city: 'Los Angeles' },
    { zone: 'America/Chicago', city: 'Chicago' },
    { zone: 'America/Denver', city: 'Denver' },
    { zone: 'Europe/London', city: 'London' },
    { zone: 'Europe/Paris', city: 'Paris' },
    { zone: 'Europe/Berlin', city: 'Berlin' },
    { zone: 'Europe/Moscow', city: 'Moscow' },
    { zone: 'Asia/Tokyo', city: 'Tokyo' },
    { zone: 'Asia/Shanghai', city: 'Shanghai' },
    { zone: 'Asia/Hong_Kong', city: 'Hong Kong' },
    { zone: 'Asia/Singapore', city: 'Singapore' },
    { zone: 'Asia/Dubai', city: 'Dubai' },
    { zone: 'Australia/Sydney', city: 'Sydney' },
    { zone: 'Pacific/Auckland', city: 'Auckland' },
  ];

  // Initialize with current time
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setSourceTime(`${hours}:${minutes}`);
  }, []);

  // Get offset string for a timezone
  const getOffset = (timeZone: string, date: Date): string => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    });
    
    const parts = formatter.formatToParts(date);
    const offsetPart = parts.find(part => part.type === 'timeZoneName');
    return offsetPart?.value || '';
  };

  // Format time for display
  const formatTime = (date: Date, timeZone: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  // Get city name from timezone
  const getCityName = (zone: string): string => {
    const city = majorCities.find(c => c.zone === zone);
    if (city) return city.city;
    
    // Extract city name from zone string
    const parts = zone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  };

  // Calculate time zone conversions
  const calculateConversion = () => {
    if (!sourceTime) return;

    const [hours, minutes] = sourceTime.split(':').map(Number);
    const now = new Date();
    const sourceDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0
    );

    // Convert to UTC and then to target zones
    const utcTime = new Date(sourceDate.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const allZones = [sourceZone, ...targetZones];
    const conversions: TimeZoneInfo[] = allZones.map(zone => ({
      name: getCityName(zone),
      label: zone,
      offset: getOffset(zone, sourceDate),
      time: formatTime(sourceDate, zone),
    }));

    setResults(conversions);
  };

  const handleClear = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setSourceTime(`${hours}:${minutes}`);
    setResults([]);
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
      link.download = `time-zone-${new Date().getTime()}.png`;
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Input */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Time Zone Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Source Time Zone */}
            <div className="space-y-2">
              <Label htmlFor="sourceZone" className="text-sm font-medium text-gray-700">
                Source Time Zone
              </Label>
              <select
                id="sourceZone"
                value={sourceZone}
                onChange={(e) => setSourceZone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {majorCities.map((city) => (
                  <option key={city.zone} value={city.zone}>
                    {city.city} ({city.zone})
                  </option>
                ))}
              </select>
            </div>

            {/* Source Time */}
            <div className="space-y-2">
              <Label htmlFor="sourceTime" className="text-sm font-medium text-gray-700">
                Time
              </Label>
              <Input
                id="sourceTime"
                type="time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Target Time Zones */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Compare With (Select up to 4 zones)
              </Label>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((index) => (
                  <select
                    key={index}
                    value={targetZones[index] || ''}
                    onChange={(e) => {
                      const newTargets = [...targetZones];
                      newTargets[index] = e.target.value;
                      setTargetZones(newTargets.filter(Boolean));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Time Zone --</option>
                    {majorCities
                      .filter(city => city.zone !== sourceZone && !targetZones.slice(0, index).includes(city.zone))
                      .map((city) => (
                        <option key={city.zone} value={city.zone}>
                          {city.city} ({city.zone})
                        </option>
                      ))}
                  </select>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={calculateConversion}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Convert
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1"
              >
                Clear
              </Button>
            </div>

            {/* Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">About Time Zones</p>
                  <p className="text-gray-600">
                    Convert time between different time zones. Daylight saving time is automatically handled.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div>
          {results.length > 0 ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Time Zone Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Time Zone List */}
                {results.map((result, index) => (
                  <div
                    key={result.label}
                    className={`rounded-lg p-4 border ${
                      index === 0
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">
                          {result.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {result.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          UTC {result.offset}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {result.time}
                        </div>
                        {index === 0 && (
                          <div className="text-xs text-blue-600 mt-1">
                            Source
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Time Difference Info */}
                {results.length > 1 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      Time Differences from {results[0].name}
                    </div>
                    <div className="space-y-2">
                      {results.slice(1).map((result, index) => {
                        // Calculate hour difference
                        const sourceOffset = results[0].offset;
                        const targetOffset = result.offset;
                        
                        return (
                          <div key={result.label} className="flex justify-between text-sm">
                            <span className="text-gray-600">{result.name}:</span>
                            <span className="font-medium text-gray-900">
                              {targetOffset === sourceOffset ? 'Same time' : `${targetOffset} vs ${sourceOffset}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

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
                  <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                  <p className="text-gray-400 text-sm">
                    Select time zones and click "Convert" to see time comparisons
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

export default TimeZoneCalculator;

