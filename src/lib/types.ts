export type Stock = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
};

export type WatchlistItem = Stock & {
  lastPrice?: number;
};

export type ChartDataPoint = {
    time: string;
    price: number;
};
