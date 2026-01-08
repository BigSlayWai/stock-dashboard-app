"use client";

// This component displays a single stock with all its info
// Shows: ticker, quantity, prices, and P&L calculations

import { useEffect, useState } from "react";
import { Stock } from "@/types/stock";
import { getCurrentPrice } from "@/lib/stockApi";
import { calculateStockPnL } from "@/lib/calculations";
import { formatCurrency, formatPercent } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, TrendingDown, X } from "lucide-react";

interface StockCardProps {
  stock: Stock;
  onRemove: (id: string) => void;
}

export function StockCard({ stock, onRemove }: StockCardProps) {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current price when component mounts
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        setError(null);
        const price = await getCurrentPrice(stock.ticker);
        setCurrentPrice(price);
      } catch (err) {
        console.error(`Error fetching price for ${stock.ticker}:`, err);
        setError("Failed to fetch price");
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [stock.ticker]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || currentPrice === null) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{stock.ticker}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(stock.id)}
            className="text-red-600 hover:text-red-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  // Calculate P&L
  const stockWithPrice = calculateStockPnL(stock, currentPrice);
  const isProfit = stockWithPrice.pnl >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {stock.ticker}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {stock.quantity} shares
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(stock.id)}
          className="text-gray-400 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Price Info */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Price:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(currentPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Purchase Price:</span>
          <span className="text-gray-700">
            {formatCurrency(stock.purchasePrice)}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Value:</span>
            <span className="font-semibold text-gray-800">
              {formatCurrency(stockWithPrice.currentValue)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Cost Basis:</span>
          <span className="text-gray-700">
            {formatCurrency(stockWithPrice.costBasis)}
          </span>
        </div>
      </div>

      {/* P&L Section */}
      <div
        className={`border-t pt-4 ${isProfit ? "bg-green-50" : "bg-red-50"} -mx-6 px-6 -mb-6 pb-6 rounded-b-lg`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isProfit ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className="text-sm font-medium text-gray-700">P&L:</span>
          </div>
          <div className="text-right">
            <div
              className={`text-lg font-bold ${isProfit ? "text-green-700" : "text-red-700"}`}
            >
              {formatCurrency(stockWithPrice.pnl)}
            </div>
            <div
              className={`text-sm ${isProfit ? "text-green-600" : "text-red-600"}`}
            >
              {formatPercent(stockWithPrice.pnlPercent)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
