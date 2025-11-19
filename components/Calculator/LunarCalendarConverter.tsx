'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Calendar, ArrowLeftRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  yearGanZhi: string;
  monthGanZhi: string;
  dayGanZhi: string;
  zodiacAnimal: string;
  solarTerm: string;
  festival: string;
  lunarMonthName: string;
  lunarDayName: string;
}

export default function LunarCalendarConverter() {
  const [conversionType, setConversionType] = useState<'solar-to-lunar' | 'lunar-to-solar'>('solar-to-lunar');
  const [solarMonth, setSolarMonth] = useState('');
  const [solarDay, setSolarDay] = useState('');
  const [solarYear, setSolarYear] = useState('');
  const [lunarMonth, setLunarMonth] = useState('');
  const [lunarDay, setLunarDay] = useState('');
  const [lunarYear, setLunarYear] = useState('');
  const [isLeapMonth, setIsLeapMonth] = useState(false);
  const [result, setResult] = useState<LunarDate | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Set default to today
  useEffect(() => {
    const today = new Date();
    setSolarMonth((today.getMonth() + 1).toString());
    setSolarDay(today.getDate().toString());
    setSolarYear(today.getFullYear().toString());
  }, []);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/lunar-calendar-converter',
    getShareParams: () => ({
      type: conversionType,
      m: solarMonth,
      d: solarDay,
      y: solarYear,
    }),
    getShareText: () => {
      return 'Convert between Solar and Lunar calendar dates!';
    },
  });

  // Simplified lunar calendar data (1900-2100)
  // In a real implementation, you would use a comprehensive lunar calendar library
  const getChineseZodiac = (year: number): string => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const chineseAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const index = (year - 4) % 12;
    return `${animals[index]} (${chineseAnimals[index]})`;
  };

  const getHeavenlyStem = (year: number): string => {
    const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    return stems[(year - 4) % 10];
  };

  const getEarthlyBranch = (year: number): string => {
    const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    return branches[(year - 4) % 12];
  };

  const getGanZhi = (year: number): string => {
    return getHeavenlyStem(year) + getEarthlyBranch(year);
  };

  const getLunarMonthName = (month: number, isLeap: boolean): string => {
    const months = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
    return (isLeap ? '闰' : '') + months[month - 1];
  };

  const getLunarDayName = (day: number): string => {
    const days = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    return days[day - 1] || '';
  };

  const getSolarTerm = (month: number, day: number): string => {
    // Simplified solar term calculation
    const solarTerms: { [key: string]: string } = {
      '1-5': '小寒', '1-20': '大寒',
      '2-4': '立春', '2-19': '雨水',
      '3-6': '惊蛰', '3-21': '春分',
      '4-5': '清明', '4-20': '谷雨',
      '5-6': '立夏', '5-21': '小满',
      '6-6': '芒种', '6-21': '夏至',
      '7-7': '小暑', '7-23': '大暑',
      '8-8': '立秋', '8-23': '处暑',
      '9-8': '白露', '9-23': '秋分',
      '10-8': '寒露', '10-23': '霜降',
      '11-7': '立冬', '11-22': '小雪',
      '12-7': '大雪', '12-22': '冬至',
    };
    
    const key = `${month}-${day}`;
    return solarTerms[key] || '';
  };

  const getFestival = (month: number, day: number, isLunar: boolean): string => {
    if (isLunar) {
      const lunarFestivals: { [key: string]: string } = {
        '1-1': '春节 (Spring Festival)',
        '1-15': '元宵节 (Lantern Festival)',
        '2-2': '龙抬头',
        '5-5': '端午节 (Dragon Boat Festival)',
        '7-7': '七夕节 (Qixi Festival)',
        '7-15': '中元节',
        '8-15': '中秋节 (Mid-Autumn Festival)',
        '9-9': '重阳节 (Double Ninth Festival)',
        '12-8': '腊八节',
        '12-23': '小年',
      };
      return lunarFestivals[`${month}-${day}`] || '';
    } else {
      const solarFestivals: { [key: string]: string } = {
        '1-1': '元旦 (New Year\'s Day)',
        '2-14': '情人节 (Valentine\'s Day)',
        '3-8': '妇女节 (Women\'s Day)',
        '4-4': '清明节 (Tomb Sweeping Day)',
        '5-1': '劳动节 (Labor Day)',
        '6-1': '儿童节 (Children\'s Day)',
        '10-1': '国庆节 (National Day)',
        '12-25': '圣诞节 (Christmas)',
      };
      return solarFestivals[`${month}-${day}`] || '';
    }
  };

  // Simplified lunar calendar conversion
  // Note: This is a simplified implementation. For accurate conversion,
  // you should use a proper lunar calendar library
  const solarToLunar = (year: number, month: number, day: number): LunarDate => {
    // This is a simplified approximation
    // In reality, you need accurate lunar calendar data tables
    const baseDate = new Date(year, 0, 1);
    const targetDate = new Date(year, month - 1, day);
    const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));
    
    // Approximate lunar month and day (simplified)
    const lunarMonth = Math.floor(daysDiff / 29.5) + 1;
    const lunarDay = (daysDiff % 29) + 1;
    const lunarYear = lunarMonth > 12 ? year + 1 : year;
    
    return {
      year: lunarYear,
      month: lunarMonth > 12 ? lunarMonth - 12 : lunarMonth,
      day: lunarDay,
      isLeapMonth: false,
      yearGanZhi: getGanZhi(lunarYear),
      monthGanZhi: getGanZhi(lunarYear) + '月',
      dayGanZhi: getGanZhi(lunarYear) + '日',
      zodiacAnimal: getChineseZodiac(lunarYear),
      solarTerm: getSolarTerm(month, day),
      festival: getFestival(lunarMonth > 12 ? lunarMonth - 12 : lunarMonth, lunarDay, true),
      lunarMonthName: getLunarMonthName(lunarMonth > 12 ? lunarMonth - 12 : lunarMonth, false),
      lunarDayName: getLunarDayName(lunarDay),
    };
  };

  const lunarToSolar = (year: number, month: number, day: number, isLeap: boolean): LunarDate => {
    // Simplified reverse conversion
    const approxDays = (month - 1) * 29.5 + day;
    const solarDate = new Date(year, 0, 1);
    solarDate.setDate(solarDate.getDate() + approxDays);
    
    return {
      year: solarDate.getFullYear(),
      month: solarDate.getMonth() + 1,
      day: solarDate.getDate(),
      isLeapMonth: isLeap,
      yearGanZhi: getGanZhi(year),
      monthGanZhi: getGanZhi(year) + '月',
      dayGanZhi: getGanZhi(year) + '日',
      zodiacAnimal: getChineseZodiac(year),
      solarTerm: getSolarTerm(solarDate.getMonth() + 1, solarDate.getDate()),
      festival: getFestival(month, day, true),
      lunarMonthName: getLunarMonthName(month, isLeap),
      lunarDayName: getLunarDayName(day),
    };
  };

  const calculate = () => {
    if (conversionType === 'solar-to-lunar') {
      const m = parseInt(solarMonth);
      const d = parseInt(solarDay);
      const y = parseInt(solarYear);

      if (!solarMonth || !solarDay || !solarYear || isNaN(m) || isNaN(d) || isNaN(y)) {
        alert('Please enter a complete solar date.');
        return;
      }

      if (m < 1 || m > 12 || d < 1 || d > 31) {
        alert('Please enter a valid date.');
        return;
      }

      if (y < 1900 || y > 2100) {
        alert('Year must be between 1900 and 2100.');
        return;
      }

      const lunarDate = solarToLunar(y, m, d);
      setResult(lunarDate);
    } else {
      const m = parseInt(lunarMonth);
      const d = parseInt(lunarDay);
      const y = parseInt(lunarYear);

      if (!lunarMonth || !lunarDay || !lunarYear || isNaN(m) || isNaN(d) || isNaN(y)) {
        alert('Please enter a complete lunar date.');
        return;
      }

      if (m < 1 || m > 12 || d < 1 || d > 30) {
        alert('Please enter a valid lunar date.');
        return;
      }

      if (y < 1900 || y > 2100) {
        alert('Year must be between 1900 and 2100.');
        return;
      }

      const solarDate = lunarToSolar(y, m, d, isLeapMonth);
      setResult(solarDate);
    }
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
      link.download = `lunar-calendar-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Lunar Calendar Results</title>
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
    { value: '1', label: 'January (一月)' },
    { value: '2', label: 'February (二月)' },
    { value: '3', label: 'March (三月)' },
    { value: '4', label: 'April (四月)' },
    { value: '5', label: 'May (五月)' },
    { value: '6', label: 'June (六月)' },
    { value: '7', label: 'July (七月)' },
    { value: '8', label: 'August (八月)' },
    { value: '9', label: 'September (九月)' },
    { value: '10', label: 'October (十月)' },
    { value: '11', label: 'November (十一月)' },
    { value: '12', label: 'December (十二月)' },
  ];

  const lunarMonths = [
    { value: '1', label: '正月 (1st)' },
    { value: '2', label: '二月 (2nd)' },
    { value: '3', label: '三月 (3rd)' },
    { value: '4', label: '四月 (4th)' },
    { value: '5', label: '五月 (5th)' },
    { value: '6', label: '六月 (6th)' },
    { value: '7', label: '七月 (7th)' },
    { value: '8', label: '八月 (8th)' },
    { value: '9', label: '九月 (9th)' },
    { value: '10', label: '十月 (10th)' },
    { value: '11', label: '冬月 (11th)' },
    { value: '12', label: '腊月 (12th)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Conversion Type Selector */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5" />
                Conversion Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setConversionType('solar-to-lunar')}
                  variant={conversionType === 'solar-to-lunar' ? 'default' : 'outline'}
                  className={conversionType === 'solar-to-lunar' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Solar → Lunar
                </Button>
                <Button
                  onClick={() => setConversionType('lunar-to-solar')}
                  variant={conversionType === 'lunar-to-solar' ? 'default' : 'outline'}
                  className={conversionType === 'lunar-to-solar' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Lunar → Solar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Input Form */}
          {conversionType === 'solar-to-lunar' ? (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Solar Calendar Date
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="solarMonth" className="text-sm font-medium text-gray-700">
                    Month <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="solarMonth"
                    value={solarMonth}
                    onChange={(e) => setSolarMonth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select month...</option>
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solarDay" className="text-sm font-medium text-gray-700">
                    Day <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="solarDay"
                    type="number"
                    value={solarDay}
                    onChange={(e) => setSolarDay(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 15"
                    min="1"
                    max="31"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solarYear" className="text-sm font-medium text-gray-700">
                    Year <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="solarYear"
                    type="number"
                    value={solarYear}
                    onChange={(e) => setSolarYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 2024"
                    min="1900"
                    max="2100"
                  />
                </div>

                <Button 
                  onClick={calculate}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Convert to Lunar
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Lunar Calendar Date
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lunarMonth" className="text-sm font-medium text-gray-700">
                    Month <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="lunarMonth"
                    value={lunarMonth}
                    onChange={(e) => setLunarMonth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select month...</option>
                    {lunarMonths.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lunarDay" className="text-sm font-medium text-gray-700">
                    Day <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="lunarDay"
                    type="number"
                    value={lunarDay}
                    onChange={(e) => setLunarDay(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 15"
                    min="1"
                    max="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lunarYear" className="text-sm font-medium text-gray-700">
                    Year <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="lunarYear"
                    type="number"
                    value={lunarYear}
                    onChange={(e) => setLunarYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 2024"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isLeapMonth"
                    checked={isLeapMonth}
                    onChange={(e) => setIsLeapMonth(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <Label htmlFor="isLeapMonth" className="text-sm text-gray-700">
                    Leap Month (闰月)
                  </Label>
                </div>

                <Button 
                  onClick={calculate}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Convert to Solar
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold text-yellow-900 mb-2">📝 Note</p>
            <p>This calculator uses simplified conversion algorithms. For precise historical dates or important events, please consult authoritative lunar calendar sources.</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Conversion Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="text-center bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl p-8 border-2 border-red-200">
                      <div className="text-6xl mb-4">🏮</div>
                      {conversionType === 'solar-to-lunar' ? (
                        <>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Lunar Calendar Date</h3>
                          <div className="text-4xl font-bold text-red-700 mb-2">
                            {result.lunarMonthName} {result.lunarDayName}
                          </div>
                          <div className="text-xl text-gray-700">
                            {result.yearGanZhi}年 ({result.zodiacAnimal})
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Solar Calendar Date</h3>
                          <div className="text-4xl font-bold text-red-700 mb-2">
                            {result.year}-{result.month.toString().padStart(2, '0')}-{result.day.toString().padStart(2, '0')}
                          </div>
                          <div className="text-xl text-gray-700">
                            {new Date(result.year, result.month - 1, result.day).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Detailed Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-4">📅 Detailed Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Year (天干地支)</p>
                          <p className="font-semibold text-gray-900">{result.yearGanZhi}年</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Zodiac Animal (生肖)</p>
                          <p className="font-semibold text-gray-900">{result.zodiacAnimal}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Lunar Month</p>
                          <p className="font-semibold text-gray-900">{result.lunarMonthName}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Lunar Day</p>
                          <p className="font-semibold text-gray-900">{result.lunarDayName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Solar Term */}
                    {result.solarTerm && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <span>🌱</span>
                          Solar Term (节气)
                        </h4>
                        <p className="text-lg font-semibold text-green-700">{result.solarTerm}</p>
                        <p className="text-xs text-gray-600 mt-2">
                          One of the 24 solar terms in the traditional Chinese calendar
                        </p>
                      </div>
                    )}

                    {/* Festival */}
                    {result.festival && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                          <span>🎊</span>
                          Festival (节日)
                        </h4>
                        <p className="text-lg font-semibold text-red-700">{result.festival}</p>
                      </div>
                    )}

                    {/* Both Dates */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-blue-900 mb-4">🔄 Complete Conversion</h4>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Solar Calendar (公历)</p>
                          <p className="font-semibold text-gray-900">
                            {result.year}年{result.month}月{result.day}日
                          </p>
                        </div>
                        <div className="text-center text-gray-400">⇅</div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Lunar Calendar (农历)</p>
                          <p className="font-semibold text-gray-900">
                            {result.yearGanZhi}年 {result.lunarMonthName}{result.lunarDayName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                      <h4 className="font-semibold text-purple-900 mb-3">ℹ️ About the Lunar Calendar</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        The Chinese lunar calendar is a lunisolar calendar that incorporates elements of both lunar and solar calendars. 
                        It has been used for thousands of years to determine traditional festivals, agricultural activities, and auspicious dates.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter a date to convert</p>
                    <p className="text-sm mt-2">Convert between Solar and Lunar calendar dates!</p>
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
        calculatorName="Lunar Calendar Converter"
      />
    </div>
  );
}

