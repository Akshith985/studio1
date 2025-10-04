import type { Stock, Quest } from "@/lib/types";

export const initialStocks: Stock[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 172.45,
    change: 2.15,
    changePercent: 1.26,
    marketCap: "2.81T",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    price: 135.89,
    change: -1.02,
    changePercent: -0.75,
    marketCap: "1.72T",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    price: 370.95,
    change: 1.55,
    changePercent: 0.42,
    marketCap: "2.75T",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    price: 145.18,
    change: -2.82,
    changePercent: -1.91,
    marketCap: "1.51T",
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: 245.01,
    change: 5.62,
    changePercent: 2.35,
    marketCap: "780.44B",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    price: 489.99,
    change: -8.11,
    changePercent: -1.63,
    marketCap: "1.21T",
  },
];

export const portfolioData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    value: 100000 + (i * 1000) + (Math.random() - 0.5) * 5000 * i,
  };
});

export const newsData = [
  {
    id: 1,
    title: "Global Markets Rally on Positive Economic Data",
    source: "Reuters",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Tech Stocks Surge as AI Optimism Continues",
    source: "Bloomberg",
    time: "3h ago",
  },
  {
    id: 3,
    title: "Fed Chair Signals Patience on Interest Rate Hikes",
    source: "Wall Street Journal",
    time: "5h ago",
  },
  {
    id: 4,
    title: "Oil Prices Fluctuate Amidst Supply Concerns",
    source: "Associated Press",
    time: "8h ago",
  },
  {
    id: 5,
    title: "New IPO sees strong debut on the stock market",
    source: "MarketWatch",
    time: "1d ago",
  },
];

export const initialQuests: Quest[] = [
  {
    id: 1,
    title: "The First Step: Add a Stock",
    description: "Every great investor starts with a single stock. Add your first stock to your watchlist to begin your journey.",
    xp: 25,
    status: 'available',
  },
  {
    id: 2,
    title: "Market Watcher: Diversify",
    description: "Don't put all your eggs in one basket. Add at least 3 different stocks to your watchlist.",
    xp: 50,
    status: 'available',
  },
    {
    id: 3,
    title: "News Hound: Get Informed",
    description: "Knowledge is power. Use the AI News Summary feature for one of your watched stocks.",
    xp: 75,
    status: 'available',
  }
];
