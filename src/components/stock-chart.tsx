
'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
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
import { Stock, Indicator } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const chartColors = {
  '--chart-1': 'hsl(var(--chart-1))',
  '--chart-2': 'hsl(var(--chart-2))',
  '--chart-3': 'hsl(var(--chart-3))',
  '--chart-4': 'hsl(var(--chart-4))',
  '--chart-5': 'hsl(var(--chart-5))',
};

const indicatorColors = ['#ff7300', '#387908', '#f83245', '#9724a1'];

type ChartData = (Record<string, string | number> & { time: string })[];
interface StockChartProps {
    stocks: Stock[];
    indicators: Indicator[];
    chartData: ChartData;
}

export function StockChart({ stocks, indicators, chartData }: StockChartProps) {
    
    const chartConfig = React.useMemo(() => {
        const config: any = {};
        stocks.forEach((stock, index) => {
            const chartColorKey = `--chart-${(index % 5) + 1}` as keyof typeof chartColors;
            config[stock.ticker] = {
                label: stock.ticker,
                color: chartColors[chartColorKey],
            };
        });
        indicators.forEach((indicator, index) => {
            if(indicator.type === 'SMA') {
                stocks.forEach(stock => {
                    const key = `${stock.ticker}_SMA_${indicator.period}`;
                    config[key] = {
                        label: `${stock.ticker} SMA(${indicator.period})`,
                        color: indicatorColors[index % indicatorColors.length],
                    };
                });
            }
        });
        return config;
    }, [stocks, indicators]);
    
    const processedChartData = React.useMemo(() => {
        let dataWithIndicators = [...chartData];

        indicators.forEach(indicator => {
            if (indicator.type === 'SMA' && indicator.period) {
                stocks.forEach(stock => {
                    const smaValues: (number|null)[] = [];
                    for(let i=0; i < dataWithIndicators.length; i++) {
                        if (i < indicator.period - 1) {
                            smaValues.push(null);
                        } else {
                            const window = dataWithIndicators.slice(i - indicator.period + 1, i + 1);
                            const sum = window.reduce((acc, point) => acc + (point[stock.ticker] as number || 0), 0);
                            smaValues.push(parseFloat((sum / indicator.period).toFixed(2)));
                        }
                    }
                    dataWithIndicators = dataWithIndicators.map((d, i) => ({
                        ...d,
                        [`${stock.ticker}_SMA_${indicator.period}`]: smaValues[i]
                    }));
                });
            }
        });

        return dataWithIndicators;
    }, [chartData, indicators, stocks]);

    const yDomain = React.useMemo(() => {
        if (processedChartData.length === 0) return ['auto', 'auto'];
        const allPrices = processedChartData.flatMap(d => stocks.map(s => d[s.ticker])).filter(p => p !== undefined && p !== null) as number[];
        if (allPrices.length === 0) return ['auto', 'auto'];
        const min = Math.min(...allPrices);
        const max = Math.max(...allPrices);
        const padding = (max - min) * 0.1;
        return [Math.max(0, min - padding), max + padding];
    }, [processedChartData, stocks]);


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
                  <AreaChart data={processedChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <defs>
                        {stocks.map((stock, index) => {
                            const chartColorKey = `--chart-${(index % 5) + 1}` as keyof typeof chartColors;
                            return (
                               <linearGradient key={stock.ticker} id={`fill-${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor={chartColors[chartColorKey]} stopOpacity={0.8} />
                                 <stop offset="95%" stopColor={chartColors[chartColorKey]} stopOpacity={0.1} />
                               </linearGradient>
                            )
                        })}
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
                            formatter={(value, name) => {
                                const config = chartConfig[name as string];
                                if (!config) return null;
                                return (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: config.color}}></div>
                                    <span className="font-medium">{config.label}</span>
                                    <span className="text-muted-foreground text-sm font-mono">${Number(value).toFixed(2)}</span>
                                </div>
                            )}}
                        />}
                      />
                      <Legend />
                      {stocks.map((stock, index) => {
                        const chartColorKey = `--chart-${(index % 5) + 1}` as keyof typeof chartColors;
                        return (
                            <Area
                            key={stock.ticker}
                            dataKey={stock.ticker}
                            type="monotone"
                            fill={`url(#fill-${stock.ticker})`}
                            stroke={chartColors[chartColorKey]}
                            strokeWidth={2}
                            stackId={stock.ticker}
                            dot={false}
                            />
                        )
                      })}
                      {indicators.map(indicator => {
                        if (indicator.type === 'SMA') {
                            return stocks.map(stock => {
                                const dataKey = `${stock.ticker}_SMA_${indicator.period}`;
                                if (!chartConfig[dataKey]) return null;
                                return (
                                    <Line
                                        key={dataKey}
                                        dataKey={dataKey}
                                        type="monotone"
                                        stroke={chartConfig[dataKey].color}
                                        strokeWidth={2}
                                        dot={false}
                                        name={chartConfig[dataKey].label}
                                    />
                                );
                            });
                        }
                        return null;
                      })}
                  </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
