
'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Stock } from '@/lib/types';
import { initialStocks } from '@/lib/data';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
};

interface StockChartProps {
    stocks: Stock[];
}

export function StockChart({ stocks }: StockChartProps) {
    const [selectedTicker, setSelectedTicker] = React.useState(stocks[0]?.ticker || '');
    
    const selectedStock = React.useMemo(() => {
        return stocks.find(s => s.ticker === selectedTicker) || stocks[0];
    }, [selectedTicker, stocks]);
    
    const [chartData, setChartData] = React.useState(() => {
        const initialPrice = selectedStock.price;
        const initialData = [];
        const now = new Date();
        for (let i = 59; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 1000);
            initialData.push({
                time: time.toLocaleTimeString(),
                price: initialPrice,
            });
        }
        return initialData;
    });

    React.useEffect(() => {
        const currentStock = stocks.find(s => s.ticker === selectedTicker) || stocks[0];
        setChartData(() => {
            const initialPrice = currentStock.price;
            const initialData = [];
            const now = new Date();
            for (let i = 59; i >= 0; i--) {
                const time = new Date(now.getTime() - i * 1000);
                initialData.push({
                    time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    price: initialPrice,
                });
            }
            return initialData;
        });
    }, [selectedTicker, stocks]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setChartData(currentData => {
                const lastDataPoint = currentData[currentData.length - 1];
                const changeFactor = (Math.random() - 0.5) * 0.01; // +/- 0.5%
                const newPrice = lastDataPoint.price * (1 + changeFactor);

                const newDataPoint = {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    price: parseFloat(newPrice.toFixed(2)),
                };
                
                const newData = [...currentData, newDataPoint];
                if (newData.length > 60) {
                    newData.shift();
                }
                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const yDomain = React.useMemo(() => {
        const prices = chartData.map(d => d.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const padding = (max - min) * 0.1;
        return [min - padding, max + padding];
    }, [chartData]);


    return (
        <Card>
            <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                    <CardTitle>{selectedTicker} Real-Time Price Chart</CardTitle>
                    <CardDescription>
                        Live price movement for the last minute.
                    </CardDescription>
                </div>
                <Select value={selectedTicker} onValueChange={setSelectedTicker}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select Stock" />
                    </SelectTrigger>
                    <SelectContent>
                        {stocks.map(stock => (
                            <SelectItem key={stock.ticker} value={stock.ticker}>
                                {stock.ticker}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0} />
                          </linearGradient>
                      </defs>
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
                        content={<ChartTooltipContent indicator="line" labelKey='price' nameKey='price' />}
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                      />
                      <Area
                          dataKey="price"
                          type="monotone"
                          fill="url(#colorPrice)"
                          stroke="var(--color-price)"
                          stackId="a"
                          dot={false}
                      />
                  </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
