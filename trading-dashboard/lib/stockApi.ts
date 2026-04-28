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
  const results = await Promise.allSettled(symbols.map(getCurrentPrice));

  return Object.fromEntries(
    symbols.map((symbol, i) => {
      const result = results[i];
      return [symbol, result.status === "fulfilled" ? result.value : 0];
    }),
  );
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
