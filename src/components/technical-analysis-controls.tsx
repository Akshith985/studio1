
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import type { Indicator } from '@/lib/types';


interface ChartIndicatorsState {
  sma20: boolean;
  sma50: boolean;
  rsi: boolean;
  volume: boolean;
}
interface TechnicalAnalysisControlsProps {
  onUpdateIndicators: (indicators: Indicator[]) => void;
}

export function TechnicalAnalysisControls({ onUpdateIndicators }: TechnicalAnalysisControlsProps) {
    const [chartIndicators, setChartIndicators] = React.useState<ChartIndicatorsState>({
        sma20: false,
        sma50: false,
        rsi: false,
        volume: false,
    });
    
    const handleCheckboxChange = (id: keyof ChartIndicatorsState) => {
        setChartIndicators(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleUpdateChart = () => {
        const activeIndicators: Indicator[] = [];
        if (chartIndicators.sma20) activeIndicators.push({ type: 'SMA', period: 20 });
        if (chartIndicators.sma50) activeIndicators.push({ type: 'SMA', period: 50 });
        // Add other indicators here when implemented
        onUpdateIndicators(activeIndicators);
    };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Stock Screener</CardTitle>
          <CardDescription>
            Filter stocks based on technical indicators. (Coming Soon)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Indicator</Label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select Indicator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rsi">RSI</SelectItem>
                  <SelectItem value="sma">SMA (20)</SelectItem>
                  <SelectItem value="sma_50">SMA (50)</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gt">Greater Than</SelectItem>
                  <SelectItem value="lt">Less Than</SelectItem>
                  <SelectItem value="eq">Equal To</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input placeholder="e.g., 70" disabled />
            </div>
          </div>
          <Button disabled>Apply Filter</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Chart Indicators</CardTitle>
          <CardDescription>
            Select technical indicators to display on the chart.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="sma20" checked={chartIndicators.sma20} onCheckedChange={() => handleCheckboxChange('sma20')} />
                    <Label htmlFor="sma20">Simple Moving Average (20)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="sma50" checked={chartIndicators.sma50} onCheckedChange={() => handleCheckboxChange('sma50')} />
                    <Label htmlFor="sma50">Simple Moving Average (50)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="rsi" disabled />
                    <Label htmlFor="rsi" className="text-muted-foreground">Relative Strength Index (RSI)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="volume" disabled />
                    <Label htmlFor="volume" className="text-muted-foreground">Volume</Label>
                </div>
            </div>
            <Button onClick={handleUpdateChart}>Update Chart</Button>
        </CardContent>
      </Card>
    </div>
  );
}
