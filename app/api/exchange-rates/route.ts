import { NextResponse } from 'next/server';

// Cache for exchange rates
let cachedRates: { rates: Record<string, number>; timestamp: number } | null = null;
const CACHE_DURATION = 86400000; // 24 hours in milliseconds (changed from 1 hour to daily updates)

// API Key from environment variable (for security)
// Create a .env.local file and add: EXCHANGE_RATE_API_KEY=your_key_here
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

// Fallback rates (as backup if API fails)
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

export async function GET() {
  try {
    // Check if cached rates are still valid
    if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        rates: cachedRates.rates,
        timestamp: cachedRates.timestamp,
        source: 'cache',
      });
    }

    // Fetch fresh rates from API
    // Using exchangerate-api.com (free tier: 1500 requests/month)
    // If API key is not set, use the free (limited) endpoint
    const apiUrl = API_KEY 
      ? `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
      : 'https://open.exchangerate-api.com/v6/latest/USD';
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    // Filter only the currencies we support
    const supportedCurrencies = Object.keys(fallbackRates);
    const filteredRates: Record<string, number> = {};
    
    supportedCurrencies.forEach((currency) => {
      if (data.rates && data.rates[currency]) {
        filteredRates[currency] = data.rates[currency];
      } else {
        // Use fallback if currency not in API response
        filteredRates[currency] = fallbackRates[currency];
      }
    });

    // Update cache
    cachedRates = {
      rates: filteredRates,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      rates: filteredRates,
      timestamp: cachedRates.timestamp,
      source: 'api',
    });
  } catch (error) {
    console.error('Exchange rate API error:', error);

    // Return fallback rates if API fails
    const timestamp = cachedRates?.timestamp || Date.now();
    return NextResponse.json({
      rates: cachedRates?.rates || fallbackRates,
      timestamp,
      source: 'fallback',
      error: 'Using fallback rates due to API error',
    });
  }
}

