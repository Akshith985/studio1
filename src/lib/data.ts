import type { Stock } from "@/lib/types";

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
