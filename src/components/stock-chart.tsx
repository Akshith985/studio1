
'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Stock } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const chartColors = {
  '--chart-1': 'hsl(var(--chart-1))',
  '--chart-2': 'hsl(var(--chart-2))',
  '--chart-3': 'hsl(var(--chart-3))',
  '--chart-4': 'hsl(var(--chart-4))',
  '--chart-5': 'hsl(var(--chart-5))',
};

interface StockChartProps {
    stocks: Stock[];
}

export function StockChart({ stocks }: StockChartProps) {
    
    const chartConfig = React.useMemo(() => {
        const config: any = {};
        stocks.forEach((stock, index) => {
            const chartColorKey = `--chart-${(index % 5) + 1}` as keyof typeof chartColors;
            config[stock.ticker] = {
                label: stock.ticker,
                color: chartColors[chartColorKey],
            };
        });
        return config;
    }, [stocks]);
    
    const [chartData, setChartData] = React.useState(() => {
      const now = new Date();
      const initialData: any[] = [];

      const prices: { [key: string]: number } = {};
      stocks.forEach(stock => {
        prices[stock.ticker] = stock.price;
      });

      for (let i = 59; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 1000);
        const dataPoint: any = {
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
        stocks.forEach(stock => {
          const changeFactor = (Math.random() - 0.5) * 0.01;
          prices[stock.ticker] *= (1 + changeFactor);
          dataPoint[stock.ticker] = parseFloat(prices[stock.ticker].toFixed(2));
        });
        initialData.push(dataPoint);
      }
      return initialData;
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setChartData(currentData => {
                if (currentData.length === 0) return [];
                const lastDataPoint = currentData[currentData.length - 1];
                const newDataPoint: any = {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                };

                stocks.forEach(stock => {
                    const changeFactor = (Math.random() - 0.5) * 0.01;
                    const lastPrice = lastDataPoint[stock.ticker] ?? stock.price;
                    const newPrice = lastPrice * (1 + changeFactor);
                    newDataPoint[stock.ticker] = parseFloat(newPrice.toFixed(2));
                });
                
                const newData = [...currentData, newDataPoint];
                if (newData.length > 60) {
                    newData.shift();
                }
                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [stocks]);

    const yDomain = React.useMemo(() => {
        if (chartData.length === 0) return ['auto', 'auto'];
        const allPrices = chartData.flatMap(d => stocks.map(s => d[s.ticker])).filter(p => p !== undefined);
        if (allPrices.length === 0) return ['auto', 'auto'];
        const min = Math.min(...allPrices);
        const max = Math.max(...allPrices);
        const padding = (max - min) * 0.1;
        return [Math.max(0, min - padding), max + padding];
    }, [chartData, stocks]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-Time Stock Prices</CardTitle>
                <CardDescription>
                    Live price movement for selected stocks over the last minute.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <defs>
                        {Object.keys(chartConfig).map((key) => (
                           <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor={chartConfig[key].color} stopOpacity={0.8} />
                             <stop offset="95%" stopColor={chartConfig[key].color} stopOpacity={0.1} />
                           </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                      <XAxis
                          dataKey="time"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickCount={6}
                      />
                      <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          domain={yDomain}
                          tickFormatter={(value) => `$${Number(value).toFixed(2)}`}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent 
                            indicator="line" 
                            labelClassName="font-bold text-lg"
                            formatter={(value, name) => (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: chartConfig[name as string]?.color}}></div>
                                    <span className="font-medium">{name}</span>
                                    <span className="text-muted-foreground text-sm font-mono">${Number(value).toFixed(2)}</span>
                                </div>
                            )}
                        />}
                      />
                      <Legend />
                      {stocks.map((stock) => (
                        <Area
                          key={stock.ticker}
                          dataKey={stock.ticker}
                          type="monotone"
                          fill={`url(#fill-${stock.ticker})`}
                          stroke={chartConfig[stock.ticker].color}
                          strokeWidth={2}
                          stackId={stock.ticker}
                          dot={false}
                        />
                      ))}
                  </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
