// This file defines the "shape" of our data
// Think of it as a contract: every stock MUST have these fields

export interface Stock {
  id: string;              // Unique ID (we'll use timestamp)
  ticker: string;          // Stock symbol like "AAPL" or "GOOGL"
  quantity: number;        // How many shares you own
  purchasePrice: number;   // Price per share when you bought (in £)
  purchaseDate: string;    // When you bought it (ISO date string)
}

// This extends Stock with calculated fields we get from API + math
export interface StockWithPrice extends Stock {
  currentPrice: number;    // Live price from Alpha Vantage API
  currentValue: number;    // currentPrice × quantity = what it's worth now
  costBasis: number;       // purchasePrice × quantity = what you paid total
  pnl: number;            // Profit/Loss in £ (currentValue - costBasis)
  pnlPercent: number;     // Profit/Loss as % ((pnl / costBasis) × 100)
}

// Summary stats for entire portfolio
export interface PortfolioSummary {
  totalValue: number;      // Sum of all stock current values
  totalCost: number;       // Sum of all stock cost bases
  totalPnL: number;        // Total profit/loss across all stocks
  totalPnLPercent: number; // Overall portfolio return %
  bestPerformer: StockWithPrice | null;  // Stock with highest % gain
  worstPerformer: StockWithPrice | null; // Stock with lowest % gain (or biggest loss)
}
