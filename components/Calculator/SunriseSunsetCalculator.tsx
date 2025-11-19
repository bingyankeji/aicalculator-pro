'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Sun, MapPin, Clock } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface SunTimes {
  date: Date;
  latitude: number;
  longitude: number;
  locationName: string;
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  dayLength: string;
  civilDawn: Date;
  civilDusk: Date;
  nauticalDawn: Date;
  nauticalDusk: Date;
  astronomicalDawn: Date;
  astronomicalDusk: Date;
  timezone: string;
}

export default function SunriseSunsetCalculator() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationName, setLocationName] = useState('');
  const [result, setResult] = useState<SunTimes | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Set default to today
  useEffect(() => {
    const today = new Date();
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
    setYear(today.getFullYear().toString());
  }, []);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/sunrise-sunset-calculator',
    getShareParams: () => ({
      m: month,
      d: day,
      y: year,
      lat: latitude,
      lng: longitude,
    }),
    getShareText: () => {
      return result
        ? `Sunrise at ${formatTime(result.sunrise)}, Sunset at ${formatTime(result.sunset)} in ${result.locationName || 'your location'}`
        : 'Calculate sunrise and sunset times for any location!';
    },
  });

  // Calculate Julian Day
  const getJulianDay = (date: Date): number => {
    const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
    const y = date.getFullYear() + 4800 - a;
    const m = (date.getMonth() + 1) + 12 * a - 3;
    
    let jd = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);
    jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    return jd + (date.getHours() - 12) / 24 + date.getMinutes() / 1440 + date.getSeconds() / 86400;
  };

  // Calculate sun position
  const calculateSunPosition = (jd: number, lat: number, lng: number) => {
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = (357.528 + 0.9856003 * n) % 360;
    const lambda = L + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180);
    const epsilon = 23.439 - 0.0000004 * n;
    
    const alpha = Math.atan2(Math.cos(epsilon * Math.PI / 180) * Math.sin(lambda * Math.PI / 180), Math.cos(lambda * Math.PI / 180)) * 180 / Math.PI;
    const delta = Math.asin(Math.sin(epsilon * Math.PI / 180) * Math.sin(lambda * Math.PI / 180)) * 180 / Math.PI;
    
    return { rightAscension: alpha, declination: delta };
  };

  // Calculate hour angle for given altitude
  const calculateHourAngle = (lat: number, dec: number, altitude: number): number => {
    const latRad = lat * Math.PI / 180;
    const decRad = dec * Math.PI / 180;
    const altRad = altitude * Math.PI / 180;
    
    const cosH = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    
    if (cosH > 1 || cosH < -1) {
      return NaN; // Sun doesn't rise or set
    }
    
    return Math.acos(cosH) * 180 / Math.PI;
  };

  // Calculate sun times
  const calculateSunTimes = (date: Date, lat: number, lng: number): Omit<SunTimes, 'locationName' | 'timezone'> => {
    const jd = getJulianDay(date);
    const { declination } = calculateSunPosition(jd, lat, lng);
    
    // Solar noon (when sun is highest)
    const solarNoonHour = 12 - lng / 15;
    const solarNoon = new Date(date);
    solarNoon.setHours(Math.floor(solarNoonHour));
    solarNoon.setMinutes((solarNoonHour % 1) * 60);
    solarNoon.setSeconds(0);
    
    // Sunrise/Sunset (altitude = -0.833 degrees, accounting for refraction and sun's diameter)
    const sunriseHA = calculateHourAngle(lat, declination, -0.833);
    const sunrise = new Date(solarNoon);
    sunrise.setMinutes(sunrise.getMinutes() - sunriseHA * 4);
    
    const sunset = new Date(solarNoon);
    sunset.setMinutes(sunset.getMinutes() + sunriseHA * 4);
    
    // Civil twilight (altitude = -6 degrees)
    const civilHA = calculateHourAngle(lat, declination, -6);
    const civilDawn = new Date(solarNoon);
    civilDawn.setMinutes(civilDawn.getMinutes() - civilHA * 4);
    
    const civilDusk = new Date(solarNoon);
    civilDusk.setMinutes(civilDusk.getMinutes() + civilHA * 4);
    
    // Nautical twilight (altitude = -12 degrees)
    const nauticalHA = calculateHourAngle(lat, declination, -12);
    const nauticalDawn = new Date(solarNoon);
    nauticalDawn.setMinutes(nauticalDawn.getMinutes() - nauticalHA * 4);
    
    const nauticalDusk = new Date(solarNoon);
    nauticalDusk.setMinutes(nauticalDusk.getMinutes() + nauticalHA * 4);
    
    // Astronomical twilight (altitude = -18 degrees)
    const astronomicalHA = calculateHourAngle(lat, declination, -18);
    const astronomicalDawn = new Date(solarNoon);
    astronomicalDawn.setMinutes(astronomicalDawn.getMinutes() - astronomicalHA * 4);
    
    const astronomicalDusk = new Date(solarNoon);
    astronomicalDusk.setMinutes(astronomicalDusk.getMinutes() + astronomicalHA * 4);
    
    // Calculate day length
    const dayLengthMinutes = (sunset.getTime() - sunrise.getTime()) / 60000;
    const hours = Math.floor(dayLengthMinutes / 60);
    const minutes = Math.floor(dayLengthMinutes % 60);
    const dayLength = `${hours}h ${minutes}m`;
    
    return {
      date,
      latitude: lat,
      longitude: lng,
      sunrise,
      sunset,
      solarNoon,
      dayLength,
      civilDawn,
      civilDusk,
      nauticalDawn,
      nauticalDusk,
      astronomicalDawn,
      astronomicalDusk,
    };
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimezone = (): string => {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset <= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const useCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
          setLocationName('Current Location');
        },
        (error) => {
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const setPresetLocation = (name: string, lat: number, lng: number) => {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
    setLocationName(name);
  };

  const calculate = () => {
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (!month || !day || !year || isNaN(m) || isNaN(d) || isNaN(y)) {
      alert('Please enter a complete date.');
      return;
    }

    if (m < 1 || m > 12) {
      alert('Please enter a valid month (1-12).');
      return;
    }

    if (d < 1 || d > 31) {
      alert('Please enter a valid day (1-31).');
      return;
    }

    if (y < 1900 || y > 2100) {
      alert('Please enter a year between 1900 and 2100.');
      return;
    }

    if (!latitude || !longitude || isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid latitude and longitude.');
      return;
    }

    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90 degrees.');
      return;
    }

    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180 degrees.');
      return;
    }

    const selectedDate = new Date(y, m - 1, d);
    const sunTimes = calculateSunTimes(selectedDate, lat, lng);
    const timezone = getTimezone();
    
    setResult({
      ...sunTimes,
      locationName: locationName || `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      timezone,
    });
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
      link.download = `sunrise-sunset-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Sunrise Sunset Results</title>
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

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const presetLocations = [
    { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
    { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
    { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
    { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Date
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="month" className="text-sm font-medium text-gray-700">
                  Month <span className="text-red-500">*</span>
                </Label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select month...</option>
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="day" className="text-sm font-medium text-gray-700">
                  Day <span className="text-red-500">*</span>
                </Label>
                <input
                  id="day"
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 15"
                  min="1"
                  max="31"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </Label>
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 2024"
                  min="1900"
                  max="2100"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locationName" className="text-sm font-medium text-gray-700">
                  Location Name (Optional)
                </Label>
                <input
                  id="locationName"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., New York"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-sm font-medium text-gray-700">
                  Latitude <span className="text-red-500">*</span>
                </Label>
                <input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 40.7128"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-sm font-medium text-gray-700">
                  Longitude <span className="text-red-500">*</span>
                </Label>
                <input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., -74.0060"
                />
              </div>

              <Button 
                onClick={useCurrentLocation}
                variant="outline"
                className="w-full"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Select:</p>
                <div className="grid grid-cols-2 gap-2">
                  {presetLocations.map((loc) => (
                    <Button
                      key={loc.name}
                      onClick={() => setPresetLocation(loc.name, loc.lat, loc.lng)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {loc.name.split(',')[0]}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Sun Times
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Sun Times
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Location & Date Info */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">📍 {result.locationName}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Date:</strong> {formatDate(result.date)}</p>
                        <p><strong>Coordinates:</strong> {result.latitude.toFixed(4)}°, {result.longitude.toFixed(4)}°</p>
                        <p><strong>Timezone:</strong> {result.timezone}</p>
                      </div>
                    </div>

                    {/* Main Sun Times */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-5 text-center">
                        <div className="text-4xl mb-2">🌅</div>
                        <h4 className="font-semibold text-orange-900 mb-1">Sunrise</h4>
                        <div className="text-2xl font-bold text-orange-700">{formatTime(result.sunrise)}</div>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-5 text-center">
                        <div className="text-4xl mb-2">☀️</div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Solar Noon</h4>
                        <div className="text-2xl font-bold text-yellow-700">{formatTime(result.solarNoon)}</div>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-red-200 rounded-lg p-5 text-center">
                        <div className="text-4xl mb-2">🌇</div>
                        <h4 className="font-semibold text-red-900 mb-1">Sunset</h4>
                        <div className="text-2xl font-bold text-red-700">{formatTime(result.sunset)}</div>
                      </div>
                    </div>

                    {/* Day Length */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-900 mb-2">☀️ Daylight Duration</h4>
                      <div className="text-3xl font-bold text-blue-700">{result.dayLength}</div>
                    </div>

                    {/* Twilight Times */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🌄</span>
                        Twilight Times
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="bg-indigo-50 rounded-lg p-4">
                          <h5 className="font-semibold text-indigo-900 mb-3">Civil Twilight</h5>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">Dawn</p>
                              <p className="font-semibold text-indigo-700">{formatTime(result.civilDawn)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Dusk</p>
                              <p className="font-semibold text-indigo-700">{formatTime(result.civilDusk)}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Sun is 6° below horizon. Sufficient light for outdoor activities.</p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-900 mb-3">Nautical Twilight</h5>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">Dawn</p>
                              <p className="font-semibold text-blue-700">{formatTime(result.nauticalDawn)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Dusk</p>
                              <p className="font-semibold text-blue-700">{formatTime(result.nauticalDusk)}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Sun is 12° below horizon. Horizon visible at sea.</p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                          <h5 className="font-semibold text-purple-900 mb-3">Astronomical Twilight</h5>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">Dawn</p>
                              <p className="font-semibold text-purple-700">{formatTime(result.astronomicalDawn)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Dusk</p>
                              <p className="font-semibold text-purple-700">{formatTime(result.astronomicalDusk)}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Sun is 18° below horizon. Sky is completely dark.</p>
                        </div>
                      </div>
                    </div>

                    {/* Visual Timeline */}
                    <div className="bg-gradient-to-r from-gray-900 via-orange-300 to-gray-900 rounded-lg p-6">
                      <h4 className="font-semibold text-white mb-4 text-center">Daily Sun Timeline</h4>
                      <div className="flex items-center justify-between text-center text-white text-xs">
                        <div className="flex-1">
                          <div className="text-2xl mb-1">🌃</div>
                          <div>Night</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">🌄</div>
                          <div>Dawn</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">🌅</div>
                          <div>Sunrise</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">☀️</div>
                          <div>Noon</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">🌇</div>
                          <div>Sunset</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">🌆</div>
                          <div>Dusk</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">🌃</div>
                          <div>Night</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Sun className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter date and location to calculate sun times</p>
                    <p className="text-sm mt-2">Discover sunrise, sunset, and twilight times for any location!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
            <Button 
              onClick={handleSaveAsImage} 
              variant="outline" 
              className="gap-2"
              disabled={!result}
            >
              <Download className="h-4 w-4" />
              Save as Image
            </Button>
            
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="gap-2"
              disabled={!result}
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
        calculatorName="Sunrise Sunset Calculator"
      />
    </div>
  );
}

