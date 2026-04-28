import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data["Error Message"]) {
      return NextResponse.json(
        { error: `Invalid stock symbol: ${symbol}` },
        { status: 400 }
      );
    }

    if (data["Note"]) {
      return NextResponse.json(
        { error: "API rate limit reached. Please wait a minute." },
        { status: 429 }
      );
    }

    const quote = data["Global Quote"];
    if (!quote || !quote["05. price"]) {
      return NextResponse.json(
        { error: `No price data available for ${symbol}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ price: parseFloat(quote["05. price"]) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stock price" }, { status: 500 });
  }
}
