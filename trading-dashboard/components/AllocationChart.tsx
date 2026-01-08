"use client";

// This component shows a pie chart of portfolio allocation
// Each stock's percentage of total portfolio value

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { StockWithPrice } from "@/types/stock";
import { formatCurrency } from "@/lib/calculations";

interface AllocationChartProps {
  stocks: StockWithPrice[];
}

// Colors for the pie chart slices
const COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#84CC16", // lime
];

export function AllocationChart({ stocks }: AllocationChartProps) {
  // Calculate total value
  const totalValue = stocks.reduce((sum, stock) => sum + stock.currentValue, 0);

  // Prepare data for the chart
  // Each stock gets: name, value, and percentage
  const chartData = stocks.map((stock) => ({
    name: stock.ticker,
    value: stock.currentValue,
    percentage:
      totalValue > 0 ? ((stock.currentValue / totalValue) * 100).toFixed(1) : 0,
  }));

  // Custom label to show percentage on the chart
  const renderLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  // Custom tooltip to show detailed info on hover
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Value: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-600">
            Allocation: {payload[0].payload.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (stocks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Portfolio Allocation
        </h3>
        <p className="text-gray-500 text-center py-8">No stocks to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Portfolio Allocation
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* List view of allocations */}
      <div className="mt-4 space-y-2">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-600">{item.percentage}%</span>
              <span className="text-gray-400 ml-2">
                ({formatCurrency(item.value)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
