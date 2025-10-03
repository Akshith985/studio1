
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
import { initialStocks } from '@/lib/data';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

interface StockChartProps {
    stocks: Stock[];
}

export function StockChart({ stocks }: StockChartProps) {
    
    const chartConfig = React.useMemo(() => {
        const config: any = {};
        stocks.forEach((stock, index) => {
            config[stock.ticker] = {
                label: stock.ticker,
                color: COLORS[index % COLORS.length],
            };
        });
        return config;
    }, [stocks]);
    
    const [chartData, setChartData] = React.useState(() => {
        const now = new Date();
        const initialData = [];
        const initialPrices: {[key: string]: number} = {};
        stocks.forEach(stock => {
            initialPrices[stock.ticker] = stock.price;
        });

        for (let i = 59; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 1000);
            const dataPoint: any = {
                time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            };
            stocks.forEach(stock => {
                dataPoint[stock.ticker] = initialPrices[stock.ticker];
            });
            initialData.push(dataPoint);
        }
        return initialData;
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setChartData(currentData => {
                const lastDataPoint = currentData[currentData.length - 1];
                const newDataPoint: any = {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                };

                stocks.forEach(stock => {
                    const changeFactor = (Math.random() - 0.5) * 0.01; // +/- 0.5%
                    const newPrice = lastDataPoint[stock.ticker] * (1 + changeFactor);
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
        const allPrices = chartData.flatMap(d => stocks.map(s => d[s.ticker]));
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
                      <CartesianGrid vertical={false} />
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
                        content={<ChartTooltipContent indicator="line" />}
                        formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]}
                      />
                      <Legend />
                      {stocks.map((stock, index) => (
                          <defs key={stock.ticker}>
                              <linearGradient id={`color${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                                  <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0} />
                              </linearGradient>
                          </defs>
                      ))}
                      {stocks.map((stock, index) => (
                        <Area
                          key={stock.ticker}
                          dataKey={stock.ticker}
                          type="monotone"
                          fill={`url(#color${stock.ticker})`}
                          stroke={COLORS[index % COLORS.length]}
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
