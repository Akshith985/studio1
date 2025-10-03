
'use client';

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

export function TechnicalAnalysisControls() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Stock Screener</CardTitle>
          <CardDescription>
            Filter stocks based on technical indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Indicator</Label>
              <Select>
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
              <Select>
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
              <Input placeholder="e.g., 70" />
            </div>
          </div>
          <Button>Apply Filter</Button>
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
                    <Checkbox id="sma20" />
                    <Label htmlFor="sma20">Simple Moving Average (20)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="sma50" />
                    <Label htmlFor="sma50">Simple Moving Average (50)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="rsi" />
                    <Label htmlFor="rsi">Relative Strength Index (RSI)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="volume" />
                    <Label htmlFor="volume">Volume</Label>
                </div>
            </div>
            <Button>Update Chart</Button>
        </CardContent>
      </Card>
    </div>
  );
}
