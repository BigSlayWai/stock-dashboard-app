// This file contains all the math for profit/loss calculations
// P&L = Profit and Loss

import { Stock, StockWithPrice, PortfolioSummary } from '@/types/stock';

/**
 * Calculate P&L for a single stock
 *
 * Example:
 * Stock: AAPL, 10 shares, bought at £150
 * Current price: £180
 *
 * currentValue = 180 × 10 = £1,800
 * costBasis = 150 × 10 = £1,500
 * pnl = 1,800 - 1,500 = £300 profit
 * pnlPercent = (300 / 1,500) × 100 = 20% gain
 */
export function calculateStockPnL(stock: Stock, currentPrice: number): StockWithPrice {
  const currentValue = currentPrice * stock.quantity;
  const costBasis = stock.purchasePrice * stock.quantity;
  const pnl = currentValue - costBasis;
  const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;

  return {
    ...stock,
    currentPrice,
    currentValue,
    costBasis,
    pnl,
    pnlPercent,
  };
}

/**
 * Calculate portfolio-wide summary statistics
 *
 * Takes all stocks with their current prices and calculates:
 * - Total portfolio value
 * - Total cost (what you paid for everything)
 * - Total P&L (profit/loss across all stocks)
 * - Best and worst performing stocks
 */
export function calculatePortfolioSummary(stocks: StockWithPrice[]): PortfolioSummary {
  if (stocks.length === 0) {
    return {
      totalValue: 0,
      totalCost: 0,
      totalPnL: 0,
      totalPnLPercent: 0,
      bestPerformer: null,
      worstPerformer: null,
    };
  }

  // Sum up all values
  const totalValue = stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
  const totalCost = stocks.reduce((sum, stock) => sum + stock.costBasis, 0);
  const totalPnL = totalValue - totalCost;
  const totalPnLPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

  // Find best and worst performers by percentage gain/loss
  const sortedByPercent = [...stocks].sort((a, b) => b.pnlPercent - a.pnlPercent);
  const bestPerformer = sortedByPercent[0];
  const worstPerformer = sortedByPercent[sortedByPercent.length - 1];

  return {
    totalValue,
    totalCost,
    totalPnL,
    totalPnLPercent,
    bestPerformer,
    worstPerformer,
  };
}

/**
 * Format currency for display
 * Example: 1234.56 -> "£1,234.56"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

/**
 * Format percentage for display
 * Example: 12.3456 -> "+12.35%"
 */
export function formatPercent(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

/**
 * Calculate allocation percentages for pie chart
 * Returns each stock's percentage of total portfolio value
 */
export function calculateAllocations(stocks: StockWithPrice[]): Array<{ ticker: string; percentage: number; value: number }> {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.currentValue, 0);

  if (totalValue === 0) {
    return [];
  }

  return stocks.map(stock => ({
    ticker: stock.ticker,
    value: stock.currentValue,
    percentage: (stock.currentValue / totalValue) * 100,
  }));
}
