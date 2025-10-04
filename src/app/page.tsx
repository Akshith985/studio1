
'use client';

import * as React from 'react';
import { initialStocks, initialQuests } from '@/lib/data';
import { PlayerHeader } from '@/components/player-header';
import { WorldMap } from '@/components/world-map';
import { BottomNavBar } from '@/components/bottom-nav-bar';
import { QuestBoard } from '@/components/quest-board';
import { StockWatchlist } from '@/components/stock-watchlist';
import { StockChart } from '@/components/stock-chart';
import { TechnicalAnalysisControls } from '@/components/technical-analysis-controls';
import type { Indicator, ScreenerFilter, Stock, WatchlistItem } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStockName } from '@/lib/utils';
import { NewsWatchView } from '@/components/news-watch-view';
import { SplashScreen } from '@/components/splash-screen';
import { WelcomeDialog } from '@/components/welcome-dialog';
import Image from 'next/image';

type ActiveView = 'home' | 'quests' | 'market' | 'newswatch';
type ChartData = (Record<string, string | number> & { time: string })[];

const generateInitialChartData = (stocks: Stock[]): ChartData => {
  const now = new Date();
  const data: ChartData = [];
  const prices: { [key: string]: number } = {};
  stocks.forEach(stock => {
    prices[stock.ticker] = stock.price;
  });

  for (let i = 59; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 1000);
    const dataPoint: Record<string, string | number> & { time: string } = {
      time: time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    stocks.forEach(stock => {
      const changeFactor = (Math.random() - 0.5) * 0.01;
      prices[stock.ticker] *= 1 + changeFactor;
      if (i===59) {
          prices[stock.ticker] = stock.price;
      }
      dataPoint[stock.ticker] = parseFloat(prices[stock.ticker].toFixed(2));
    });
    data.push(dataPoint);
  }
  return data;
};

export default function Home() {
  const [activeView, setActiveView] = React.useState<ActiveView>('home');
  const [indicators, setIndicators] = React.useState<Indicator[]>([]);
  const [filters, setFilters] = React.useState<ScreenerFilter[]>([]);
  const [showSplash, setShowSplash] = React.useState(true);
  const [showWelcome, setShowWelcome] = React.useState(false);

  const [watchlist, setWatchlist] = React.useState<WatchlistItem[]>(() =>
    initialStocks.map(s => ({ ...s, lastPrice: s.price }))
  );
  
  const [chartData, setChartData] = React.useState<ChartData>(() =>
    generateInitialChartData(initialStocks)
  );

  React.useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      // Check if the user has seen the welcome message before
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowWelcome(true);
        localStorage.setItem('hasSeenWelcome', 'true');
      }
    }, 2500);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleAddStock = (ticker: string) => {
    if (watchlist.find(s => s.ticker.toUpperCase() === ticker.toUpperCase())) {
      return;
    }
    const newPrice = parseFloat((Math.random() * 500 + 20).toFixed(2));
    const newStock: WatchlistItem = {
      ticker: ticker.toUpperCase(),
      name: getStockName(ticker),
      price: newPrice,
      change: 0,
      changePercent: 0,
      marketCap: 'N/A',
      lastPrice: newPrice,
    };
    
    // Add new stock to watchlist
    setWatchlist(prev => [...prev, newStock]);

    // Add initial data for the new stock to the chart
    setChartData(prevData => {
        const newData = [...prevData];
        newData.forEach(dataPoint => {
            dataPoint[newStock.ticker] = newStock.price * (1 + (Math.random() - 0.5) * 0.05);
        });
        return newData;
    });
  };
  
  const handleRemoveStock = (ticker: string) => {
    setWatchlist(prev => prev.filter(stock => stock.ticker !== ticker));
  };


  React.useEffect(() => {
    const interval = setInterval(() => {
      // Update watchlist
      const newWatchlist = watchlist.map(stock => {
        const changeFactor = (Math.random() - 0.5) * 0.02; // -1% to +1% change
        const newPrice = stock.price * (1 + changeFactor);
        const originalPrice = stock.price / (1 + stock.changePercent / 100);
        const change = newPrice - originalPrice;
        const changePercent = (change / originalPrice) * 100;
        return {
          ...stock,
          lastPrice: stock.price,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2)),
        };
      });
      setWatchlist(newWatchlist);

      // Update chart data
      setChartData(currentData => {
        if (newWatchlist.length === 0) return [];
        
        const newDataPoint: Record<string, string | number> & { time: string } = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

        newWatchlist.forEach(stock => {
          newDataPoint[stock.ticker] = stock.price;
        });
        
        const newData = [...currentData, newDataPoint];
        if (newData.length > 60) {
          newData.shift();
        }
        return newData;
      });

    }, 1500);

    return () => clearInterval(interval);
  }, [watchlist]);


  const filteredStocks = React.useMemo(() => {
    if (filters.length === 0) {
      return watchlist;
    }
    return watchlist.filter(stock => {
      return filters.every(filter => {
        if (filter.indicator === 'price') {
          const price = stock.price;
          const value = parseFloat(filter.value);
          if (filter.condition === 'gt') return price > value;
          if (filter.condition === 'lt') return price < value;
          if (filter.condition === 'eq') return price === value;
        }
        // Add other filter logic here
        return true;
      });
    });
  }, [watchlist, filters]);


  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Image
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXlweGhyZjNkZm02YXQ2NGZnMDJvbXA4YWMxMmlpYnJhOXc4cjZnMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/8WiVcu7MerGtarBGGU/giphy.gif"
              alt="Welcome GIF"
              width={200}
              height={200}
              unoptimized
            />
            <WorldMap />
          </div>
        );
      case 'quests':
        return (
          <div className="p-4">
            <QuestBoard initialQuests={initialQuests} />
          </div>
        );
      case 'market':
        return (
          <div className="p-4 space-y-4">
            <Tabs defaultValue="chart">
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value="chart">Stock Chart</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="mt-4">
                <StockChart stocks={filteredStocks} indicators={indicators} chartData={chartData} />
              </TabsContent>
              <TabsContent value="watchlist" className="mt-4">
                <StockWatchlist 
                  watchlistData={filteredStocks} 
                  onAddStock={handleAddStock}
                  onRemoveStock={handleRemoveStock}
                />
              </TabsContent>
              <TabsContent value="analysis" className="mt-4">
                <TechnicalAnalysisControls 
                  onUpdateIndicators={setIndicators}
                  onUpdateFilters={setFilters}
                />
              </TabsContent>
            </Tabs>
          </div>
        );
      case 'newswatch':
        return <NewsWatchView />;
      default:
        return <WorldMap />;
    }
  };
  
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <PlayerHeader />
      <main className="flex-1 overflow-y-auto pb-20">{renderContent()}</main>
      <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
       <WelcomeDialog open={showWelcome} onOpenChange={setShowWelcome} />
    </div>
  );
}
