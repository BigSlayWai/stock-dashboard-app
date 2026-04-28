import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

export async function GET(request: NextRequest) {
  const keywords = request.nextUrl.searchParams.get("keywords");

  if (!keywords) {
    return NextResponse.json({ error: "Keywords are required" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keywords)}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({ matches: data.bestMatches || [] });
  } catch {
    return NextResponse.json({ error: "Failed to search symbols" }, { status: 500 });
  }
}
