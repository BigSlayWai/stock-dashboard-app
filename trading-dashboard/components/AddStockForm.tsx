"use client";

// This component is a form to add stocks to your portfolio
// It's marked 'use client' because it uses React state and events

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AddStockFormProps {
  onAddStock: (stock: {
    ticker: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
  }) => void;
}

export function AddStockForm({ onAddStock }: AddStockFormProps) {
  // State to track form inputs
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Validate inputs
    if (!ticker || !quantity || !purchasePrice) {
      alert("Please fill in all fields");
      return;
    }

    // Convert strings to numbers
    const qty = parseFloat(quantity);
    const price = parseFloat(purchasePrice);

    // Validate numbers
    if (isNaN(qty) || qty <= 0) {
      alert("Quantity must be a positive number");
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert("Purchase price must be a positive number");
      return;
    }

    // Call the parent component's function to add the stock
    onAddStock({
      ticker: ticker.toUpperCase().trim(), // Convert to uppercase, remove whitespace
      quantity: qty,
      purchasePrice: price,
      purchaseDate: new Date().toISOString(), // Current date/time
    });

    // Clear the form
    setTicker("");
    setQuantity("");
    setPurchasePrice("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Add Stock</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ticker Input */}
        <div>
          <label
            htmlFor="ticker"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stock Ticker
          </label>
          <input
            id="ticker"
            type="text"
            placeholder="e.g., AAPL"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Stock symbol (e.g., AAPL for Apple)
          </p>
        </div>

        {/* Quantity Input */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            step="0.01"
            placeholder="e.g., 10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Number of shares</p>
        </div>

        {/* Purchase Price Input */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Purchase Price (£)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            placeholder="e.g., 150.00"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Price per share when purchased
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 shadow-md hover:shadow-lg transition-all"
        >
          Add to Portfolio
        </Button>
      </form>
    </div>
  );
}
