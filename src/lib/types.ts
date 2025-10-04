
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

export type Quest = {
  id: number;
  title: string;
  description: string;
  xp: number;
  status: 'available' | 'completed';
};

export type Indicator = {
  type: 'SMA' | 'RSI' | 'Volume';
  period?: number;
};

export type ScreenerFilter = {
  indicator: 'price' | 'marketCap' | 'changePercent';
  condition: 'gt' | 'lt' | 'eq';
  value: string;
};
