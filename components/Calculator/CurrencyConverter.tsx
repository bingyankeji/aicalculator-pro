'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Share2, Printer, Download, TrendingUp } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface ExchangeRateResponse {
  rates: Record<string, number>;
  timestamp: number;
  source: 'api' | 'cache' | 'fallback';
  error?: string;
}

// Fallback rates (used if API fails)
const fallbackRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CNY: 7.24,
  INR: 83.12,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  SEK: 10.42,
  NZD: 1.65,
  MXN: 17.08,
  SGD: 1.34,
  HKD: 7.83,
  NOK: 10.68,
  KRW: 1316.50,
  TRY: 28.95,
  RUB: 91.50,
  BRL: 4.97,
  ZAR: 18.42,
};

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
];

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<string>('100');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(fallbackRates);
  const [ratesTimestamp, setRatesTimestamp] = useState<number>(Date.now());
  const [ratesSource, setRatesSource] = useState<'api' | 'cache' | 'fallback'>('fallback');
  const [loading, setLoading] = useState<boolean>(true);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/currency-converter',
    getShareParams: () => ({
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    }),
    getShareText: () =>
      convertedAmount
        ? `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency} (Rate: ${exchangeRate.toFixed(4)})`
        : 'Check out this Currency Converter!',
  });

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/exchange-rates');
        const data: ExchangeRateResponse = await response.json();
        
        setExchangeRates(data.rates);
        setRatesTimestamp(data.timestamp);
        setRatesSource(data.source);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Use fallback rates
        setExchangeRates(fallbackRates);
        setRatesSource('fallback');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Calculate conversion
  useEffect(() => {
    if (!amount || isNaN(parseFloat(amount))) {
      setConvertedAmount('');
      setExchangeRate(0);
      return;
    }

    const amountValue = parseFloat(amount);
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (!fromRate || !toRate) {
      setConvertedAmount('');
      setExchangeRate(0);
      return;
    }

    // Convert to USD first, then to target currency
    const usdAmount = amountValue / fromRate;
    const result = usdAmount * toRate;
    const rate = toRate / fromRate;

    setConvertedAmount(result.toFixed(2));
    setExchangeRate(rate);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Load from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const from = params.get('from');
      const to = params.get('to');
      const amt = params.get('amount');

      if (from && exchangeRates[from]) setFromCurrency(from);
      if (to && exchangeRates[to]) setToCurrency(to);
      if (amt) setAmount(amt);
    }
  }, []);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('currency-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = `currency-conversion-${fromCurrency}-to-${toCurrency}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyData = currencies.find((c) => c.code === toCurrency);

  // Quick conversion amounts
  const quickAmounts = [1, 10, 50, 100, 500, 1000, 5000, 10000];

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Exchange Rate Status Banner */}
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {loading ? (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Loading exchange rates...</span>
              </>
            ) : (
              <>
                <div className={`w-2 h-2 rounded-full ${
                  ratesSource === 'api' ? 'bg-green-500' : 
                  ratesSource === 'cache' ? 'bg-blue-500' : 
                  'bg-orange-500'
                }`}></div>
                <span className="text-gray-700">
                  Rates updated: <strong>{formatTimestamp(ratesTimestamp)}</strong>
                  {ratesSource === 'fallback' && ' (Using backup rates)'}
                </span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {ratesSource === 'api' ? '🟢 Live' : ratesSource === 'cache' ? '🔵 Cached' : '🟠 Backup'}
          </span>
        </div>
      </div>

      {/* Converter */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Convert Currency</h2>

          <div className="space-y-4">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  {fromCurrencyData?.symbol}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                title="Swap currencies"
              >
                <ArrowLeftRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Amounts</label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    amount === quickAmount.toString()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {quickAmount >= 1000 ? `${quickAmount / 1000}K` : quickAmount}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Result */}
        <div>
          <div id="currency-result" className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Conversion Result
            </h3>

            {convertedAmount ? (
              <div className="space-y-4">
                {/* Main Result */}
                <div className="bg-white rounded-lg p-6 border-2 border-green-300">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">You Send</div>
                    <div className="text-2xl font-bold text-gray-900 mb-4">
                      {fromCurrencyData?.flag} {fromCurrencyData?.symbol}
                      {parseFloat(amount).toLocaleString()} {fromCurrency}
                    </div>

                    <div className="text-3xl text-green-600 mb-4">=</div>

                    <div className="text-sm text-gray-600 mb-2">They Receive</div>
                    <div className="text-3xl font-bold text-green-600">
                      {toCurrencyData?.flag} {toCurrencyData?.symbol}
                      {parseFloat(convertedAmount).toLocaleString()} {toCurrency}
                    </div>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Exchange Rate</div>
                  <div className="text-lg font-bold text-gray-900">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    1 {toCurrency} = {(1 / exchangeRate).toFixed(4)} {fromCurrency}
                  </div>
                </div>

                {/* Rate Comparison */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm font-medium text-blue-900 mb-2">💡 Important Notice</div>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>• Exchange rates update daily and are for reference only</p>
                    <p>• Actual rates from banks/services may include fees (3-5% markup typical)</p>
                    <p>• Always confirm the final rate before completing a transaction</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Enter an amount to see the conversion</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {convertedAmount && (
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button
                onClick={handleSaveImage}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Save</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Print</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popular Currency Pairs */}
      {convertedAmount && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {amount} {fromCurrency} in Popular Currencies
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currencies.slice(0, 12).map((currency) => {
              if (currency.code === fromCurrency) return null;

              const fromRate = exchangeRates[fromCurrency];
              const toRate = exchangeRates[currency.code];
              const usdAmount = parseFloat(amount) / fromRate;
              const result = usdAmount * toRate;

              return (
                <div
                  key={currency.code}
                  className={`p-3 rounded-lg border ${
                    currency.code === toCurrency
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-sm text-gray-600">
                    {currency.flag} {currency.code}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {currency.symbol}
                    {result.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Currency Converter"
      />
    </div>
  );
}

