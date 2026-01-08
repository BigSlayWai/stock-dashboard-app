// This file handles saving/loading data from browser's localStorage
// localStorage = simple key-value storage built into browsers

import { Stock } from '@/types/stock';

const STORAGE_KEY = 'portfolio_stocks'; // The key we use to store data

/**
 * Load all stocks from localStorage
 * Returns empty array if nothing saved yet
 */
export function loadStocks(): Stock[] {
  // Check if we're in the browser (not during server-side rendering)
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    // If nothing stored yet, return empty array
    if (!data) {
      return [];
    }

    // Parse the JSON string back into array of Stock objects
    return JSON.parse(data) as Stock[];
  } catch (error) {
    console.error('Error loading stocks from localStorage:', error);
    return [];
  }
}

/**
 * Save stocks to localStorage
 * Converts array to JSON string and stores it
 */
export function saveStocks(stocks: Stock[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Convert array to JSON string and save
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
  } catch (error) {
    console.error('Error saving stocks to localStorage:', error);
  }
}

/**
 * Add a new stock to the saved list
 */
export function addStock(stock: Omit<Stock, 'id'>): Stock {
  // Generate unique ID using timestamp
  const newStock: Stock = {
    ...stock,
    id: Date.now().toString(),
  };

  // Load existing stocks, add new one, save back
  const stocks = loadStocks();
  stocks.push(newStock);
  saveStocks(stocks);

  return newStock;
}

/**
 * Remove a stock by ID
 */
export function removeStock(id: string): void {
  const stocks = loadStocks();
  const filtered = stocks.filter(stock => stock.id !== id);
  saveStocks(filtered);
}

/**
 * Clear all stocks (useful for testing or reset)
 */
export function clearAllStocks(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}
