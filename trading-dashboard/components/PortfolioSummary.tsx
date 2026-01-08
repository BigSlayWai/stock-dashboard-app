"use client";

// This component shows the big hero section with overall portfolio stats
// Total value, cost, P&L, best/worst performers

import { PortfolioSummary as PortfolioSummaryType } from "@/types/stock";
import { formatCurrency, formatPercent } from "@/lib/calculations";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType;
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const isProfit = summary.totalPnL >= 0;

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <DollarSign className="h-7 w-7" />
          </div>
          Portfolio Overview
        </h2>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Portfolio Value */}
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-200" />
              <p className="text-blue-200 text-sm font-medium">Total Value</p>
            </div>
            <p className="text-3xl font-bold">
              {formatCurrency(summary.totalValue)}
            </p>
          </div>

          {/* Total Cost Basis */}
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-200" />
              <p className="text-blue-200 text-sm font-medium">Cost Basis</p>
            </div>
            <p className="text-2xl font-semibold">
              {formatCurrency(summary.totalCost)}
            </p>
          </div>

          {/* Total P&L (£) */}
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-2 mb-2">
              {isProfit ? (
                <TrendingUp className="h-5 w-5 text-green-300" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-300" />
              )}
              <p className="text-blue-200 text-sm font-medium">Total P&L</p>
            </div>
            <p
              className={`text-2xl font-bold ${isProfit ? "text-green-300" : "text-red-300"}`}
            >
              {formatCurrency(summary.totalPnL)}
            </p>
          </div>

          {/* Total Return (%) */}
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-200" />
              <p className="text-blue-200 text-sm font-medium">Return</p>
            </div>
            <p
              className={`text-2xl font-bold ${isProfit ? "text-green-300" : "text-red-300"}`}
            >
              {formatPercent(summary.totalPnLPercent)}
            </p>
          </div>
        </div>

        {/* Best & Worst Performers */}
        {(summary.bestPerformer || summary.worstPerformer) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/20">
            {/* Best Performer */}
            {summary.bestPerformer && (
              <div className="bg-green-500/20 backdrop-blur-sm p-5 rounded-xl border border-green-400/30 hover:bg-green-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  <p className="text-green-200 text-sm font-medium">
                    Best Performer
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">
                    {summary.bestPerformer.ticker}
                  </span>
                  <span className="text-green-300 font-semibold">
                    {formatPercent(summary.bestPerformer.pnlPercent)}
                  </span>
                </div>
              </div>
            )}

            {/* Worst Performer */}
            {summary.worstPerformer && (
              <div className="bg-red-500/20 backdrop-blur-sm p-5 rounded-xl border border-red-400/30 hover:bg-red-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-red-300" />
                  <p className="text-red-200 text-sm font-medium">
                    Worst Performer
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">
                    {summary.worstPerformer.ticker}
                  </span>
                  <span className="text-red-300 font-semibold">
                    {formatPercent(summary.worstPerformer.pnlPercent)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
