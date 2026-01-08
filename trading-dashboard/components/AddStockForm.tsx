'use client';

// This component is a form to add stocks to your portfolio
// It's marked 'use client' because it uses React state and events

import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Validate inputs
    if (!ticker || !quantity || !purchasePrice) {
      alert('Please fill in all fields');
      return;
    }

    // Convert strings to numbers
    const qty = parseFloat(quantity);
    const price = parseFloat(purchasePrice);

    // Validate numbers
    if (isNaN(qty) || qty <= 0) {
      alert('Quantity must be a positive number');
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert('Purchase price must be a positive number');
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
    setTicker('');
    setQuantity('');
    setPurchasePrice('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Stock</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ticker Input */}
        <div>
          <label htmlFor="ticker" className="block text-sm font-medium text-gray-700 mb-1">
            Stock Ticker
          </label>
          <input
            id="ticker"
            type="text"
            placeholder="e.g., AAPL"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Stock symbol (e.g., AAPL for Apple)</p>
        </div>

        {/* Quantity Input */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            step="0.01"
            placeholder="e.g., 10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Number of shares</p>
        </div>

        {/* Purchase Price Input */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Price (£)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            placeholder="e.g., 150.00"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Price per share when purchased</p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add to Portfolio
        </Button>
      </form>
    </div>
  );
}
