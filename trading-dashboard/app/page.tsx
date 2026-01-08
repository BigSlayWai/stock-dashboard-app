"use client";

// Main Dashboard Page
// This is where everything comes together!

import { useState, useEffect } from "react";
import { Stock, StockWithPrice } from "@/types/stock";
import {
  loadStocks,
  saveStocks,
  addStock as addStockToStorage,
  removeStock as removeStockFromStorage,
} from "@/lib/storage";
import { getCurrentPrice } from "@/lib/stockApi";
import {
  calculateStockPnL,
  calculatePortfolioSummary,
} from "@/lib/calculations";
import { AddStockForm } from "@/components/AddStockForm";
import { StockCard } from "@/components/StockCard";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { AllocationChart } from "@/components/AllocationChart";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // State for stocks and their prices
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stocksWithPrices, setStocksWithPrices] = useState<StockWithPrice[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load stocks from localStorage when component mounts
  useEffect(() => {
    const savedStocks = loadStocks();
    setStocks(savedStocks);
    setLoading(false);
  }, []);

  // Fetch prices whenever stocks change
  useEffect(() => {
    if (stocks.length === 0) {
      setStocksWithPrices([]);
      return;
    }

    fetchAllPrices();
  }, [stocks]);

  // Function to fetch prices for all stocks
  const fetchAllPrices = async () => {
    setRefreshing(true);
    const updatedStocks: StockWithPrice[] = [];

    for (const stock of stocks) {
      try {
        const currentPrice = await getCurrentPrice(stock.ticker);
        const stockWithPrice = calculateStockPnL(stock, currentPrice);
        updatedStocks.push(stockWithPrice);

        // Small delay to avoid hitting rate limits
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Failed to fetch price for ${stock.ticker}:`, error);
        // If fetch fails, use purchase price as fallback
        const stockWithPrice = calculateStockPnL(stock, stock.purchasePrice);
        updatedStocks.push(stockWithPrice);
      }
    }

    setStocksWithPrices(updatedStocks);
    setRefreshing(false);
  };

  // Handle adding a new stock
  const handleAddStock = (stockData: {
    ticker: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
  }) => {
    const newStock = addStockToStorage(stockData);
    setStocks([...stocks, newStock]);
  };

  // Handle removing a stock
  const handleRemoveStock = (id: string) => {
    removeStockFromStorage(id);
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  // Calculate portfolio summary
  const portfolioSummary = calculatePortfolioSummary(stocksWithPrices);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stock Portfolio Tracker
            </h1>
            <p className="text-gray-600 mt-2">
              Track your investments in real-time
            </p>
          </div>

          {stocks.length > 0 && (
            <Button
              onClick={fetchAllPrices}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh Prices"}
            </Button>
          )}
        </div>

        {/* Portfolio Summary - Show only if we have stocks */}
        {stocksWithPrices.length > 0 && (
          <div className="mb-8">
            <PortfolioSummary summary={portfolioSummary} />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stock Cards */}
          <div className="lg:col-span-2">
            {stocksWithPrices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stocks.map((stock) => (
                  <StockCard
                    key={stock.id}
                    stock={stock}
                    onRemove={handleRemoveStock}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-16 rounded-2xl shadow-xl border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Start Your Portfolio
                </h3>
                <p className="text-gray-500 text-lg mb-2">
                  No stocks in your portfolio yet
                </p>
                <p className="text-gray-400 text-sm">
                  Add your first stock using the form on the right →
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Add Stock Form & Chart */}
          <div className="space-y-6">
            <AddStockForm onAddStock={handleAddStock} />

            {stocksWithPrices.length > 0 && (
              <AllocationChart stocks={stocksWithPrices} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
