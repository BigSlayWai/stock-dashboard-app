export async function getCurrentPrice(symbol: string): Promise<number> {
  const response = await fetch(`/api/stock/price?symbol=${encodeURIComponent(symbol)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Failed to fetch price for ${symbol}`);
  }

  return data.price;
}

export async function getCurrentPrices(
  symbols: string[],
): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};

  for (const symbol of symbols) {
    try {
      prices[symbol] = await getCurrentPrice(symbol);
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error);
      prices[symbol] = 0;
    }
  }

  return prices;
}

export async function searchSymbol(keywords: string): Promise<unknown[]> {
  const response = await fetch(
    `/api/stock/search?keywords=${encodeURIComponent(keywords)}`,
  );
  const data = await response.json();

  if (!response.ok) {
    return [];
  }

  return data.matches;
}
