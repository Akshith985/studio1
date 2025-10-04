
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  MoreHorizontal,
  Newspaper,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { AddStockDialog } from './add-stock-dialog';
import { PriceAlertDialog } from './price-alert-dialog';
import { NewsSummaryDialog } from './news-summary-dialog';
import type { WatchlistItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StockWatchlistProps {
  watchlistData: WatchlistItem[];
  onAddStock: (ticker: string) => void;
  onRemoveStock: (ticker: string) => void;
}

export function StockWatchlist({ watchlistData, onAddStock, onRemoveStock }: StockWatchlistProps) {
  const [activeDialog, setActiveDialog] = React.useState<
    { type: 'alert' | 'news'; ticker: string } | undefined
  >();

  const getPriceAnimationClass = (stock: WatchlistItem) => {
    if (stock.lastPrice === undefined || stock.lastPrice === stock.price) return '';
    return stock.price > stock.lastPrice ? 'animate-price-up' : 'animate-price-down';
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>My Watchlist</CardTitle>
            <CardDescription>
              Monitor your favorite stocks in real-time.
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddStockDialog onAddStock={onAddStock} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Change</TableHead>
                <TableHead className="hidden md:table-cell text-right">Mkt Cap</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlistData.map(stock => (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    <div className="font-medium">{stock.ticker}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {stock.name}
                    </div>
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right tabular-nums',
                      getPriceAnimationClass(stock)
                    )}
                  >
                    ${stock.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right">
                    <div
                      className={cn(
                        'flex items-center justify-end gap-1 tabular-nums',
                        stock.change >= 0 ? 'text-positive' : 'text-negative'
                      )}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{stock.change.toFixed(2)}</span>
                      <Badge
                        variant={stock.change >= 0 ? 'default' : 'destructive'}
                        className={cn(
                          'w-[55px] justify-center',
                          stock.change >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        )}
                      >
                        {stock.changePercent.toFixed(2)}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right tabular-nums">
                    {stock.marketCap}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() =>
                            setActiveDialog({ type: 'news', ticker: stock.ticker })
                          }
                        >
                          <Newspaper className="mr-2 h-4 w-4" />
                          AI News Summary
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            setActiveDialog({ type: 'alert', ticker: stock.ticker })
                          }
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          Set Price Alert
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onRemoveStock(stock.ticker)} className="text-destructive">
                          Remove from list
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <PriceAlertDialog
        open={activeDialog?.type === 'alert'}
        onOpenChange={() => setActiveDialog(undefined)}
        ticker={activeDialog?.type === 'alert' ? activeDialog.ticker : ''}
      />
      <NewsSummaryDialog
        open={activeDialog?.type === 'news'}
        onOpenChange={() => setActiveDialog(undefined)}
        ticker={activeDialog?.type === 'news' ? activeDialog.ticker : ''}
      />
    </>
  );
}
