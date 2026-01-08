// This file handles all API calls to Alpha Vantage
// Alpha Vantage provides free real-time stock price data

// Get API key from environment variable
// The API key is stored in .env.local file (not committed to git)
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || "demo";

const BASE_URL = "https://www.alphavantage.co/query";

/**
 * Fetch current price for a stock symbol
 *
 * Example: getCurrentPrice('AAPL') returns the current price of Apple stock
 *
 * API Response structure:
 * {
 *   "Global Quote": {
 *     "01. symbol": "AAPL",
 *     "05. price": "180.75",
 *     "09. change": "2.50",
 *     "10. change percent": "1.40%"
 *   }
 * }
 */
export async function getCurrentPrice(symbol: string): Promise<number> {
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Check for API errors
    if (data["Error Message"]) {
      throw new Error(`Invalid stock symbol: ${symbol}`);
    }

    if (data["Note"]) {
      // API rate limit hit (free tier = 500 calls/day, 5 calls/minute)
      throw new Error("API rate limit reached. Please wait a minute.");
    }

    // Extract price from response
    const quote = data["Global Quote"];
    if (!quote || !quote["05. price"]) {
      throw new Error(`No price data available for ${symbol}`);
    }

    return parseFloat(quote["05. price"]);
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    throw error;
  }
}

/**
 * Fetch prices for multiple stocks at once
 * Note: Be careful with rate limits (5 calls/minute on free tier)
 */
export async function getCurrentPrices(
  symbols: string[],
): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};

  // Fetch prices one by one (could be optimized with Promise.all, but watch rate limits)
  for (const symbol of symbols) {
    try {
      prices[symbol] = await getCurrentPrice(symbol);
      // Small delay to avoid hitting rate limit
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms delay between calls
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error);
      // If one fails, we still continue with others
      prices[symbol] = 0; // Default to 0 if fetch fails
    }
  }

  return prices;
}

/**
 * Search for stock symbols by company name
 * Example: searchSymbol('Apple') might return AAPL, AAPL.LON, etc.
 */
export async function searchSymbol(keywords: string): Promise<any[]> {
  try {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.bestMatches || [];
  } catch (error) {
    console.error("Error searching symbols:", error);
    return [];
  }
}
