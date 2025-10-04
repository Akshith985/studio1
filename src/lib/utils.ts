import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { initialStocks } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const stockNameMap: { [key: string]: string } = {
  ...initialStocks.reduce((acc, stock) => {
    acc[stock.ticker] = stock.name;
    return acc;
  }, {} as { [key: string]: string }),
  // Add more well-known stocks here
  'NFLX': 'Netflix, Inc.',
  'META': 'Meta Platforms, Inc.',
  'BABA': 'Alibaba Group Holding Limited',
  'JPM': 'JPMorgan Chase & Co.',
  'V': 'Visa Inc.',
  'WMT': 'Walmart Inc.',
  'PG': 'Procter & Gamble Company',
  'JNJ': 'Johnson & Johnson',
  'DIS': 'The Walt Disney Company',
  'PYPL': 'PayPal Holdings, Inc.',
  'ADBE': 'Adobe Inc.',
  'CRM': 'Salesforce, Inc.',
  'ORCL': 'Oracle Corporation',
  'INTC': 'Intel Corporation',
  'CSCO': 'Cisco Systems, Inc.',
  'PFE': 'Pfizer Inc.',
  'KO': 'The Coca-Cola Company',
  'PEP': 'PepsiCo, Inc.',
  'MCD': 'McDonald\'s Corporation',
  'NKE': 'NIKE, Inc.',
};


export function getStockName(ticker: string): string {
  return stockNameMap[ticker.toUpperCase()] || ticker.toUpperCase();
}
